const AppleProductImage = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="image--appleProduct"
      viewBox="0 0 118.99 140"
      width="140"
      height="118.99"
      id="apple"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M113.87 55.4c-14-26.6-49-14.06-49-14.06L59.5 42.86l-5.38-1.52s-35-12.54-49 14.06 21.9 105.81 54.38 76C92 161.21 127.9 82 113.87 55.4zM48.93 12.66c8.79 5.07 14.72 13.4 10.57 30.2M95.63 6.32S94 21.44 84.68 26.15 62 23.39 62 23.39 63.67 8.27 73 3.56 95.63 6.32 95.63 6.32z"
      ></path>
    </svg>
  );
};

export default AppleProductImage;
