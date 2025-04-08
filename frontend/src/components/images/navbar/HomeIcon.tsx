const HomeIcon = ({ color }: { color: string }) => {
  return (
    <svg
      className="image--homeIcon"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 112.07"
      white-space="preserve"
    >
      <g>
        <path
          fill="transparent"
          stroke={color}
          strokeWidth={6}
          className="st0"
          d="M61.44,0L0,60.18l14.99,7.87L61.04,19.7l46.85,48.36l14.99-7.87L61.44,0L61.44,0z M18.26,69.63L18.26,69.63 L61.5,26.38l43.11,43.25h0v0v42.43H73.12V82.09H49.49v29.97H18.26V69.63L18.26,69.63L18.26,69.63z"
        />
      </g>
    </svg>
  );
};

export default HomeIcon;
