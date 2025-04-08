import { useState, useEffect, useRef } from "react";

export const useHeightObserver = <T extends HTMLElement>() => {
  const imageRef = useRef<T | null>(null);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const newImageHeight = imageRef.current.offsetHeight;
        if (newImageHeight) {
          setImageHeight(newImageHeight);
        }
      }
    };

    const observer = new ResizeObserver(updateDimensions);
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { imageRef, imageHeight };
};
