export const UnknownIcon = ({ color }: { color: string }) => {
  return (
    <svg
      className="image--unknownIcon"
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 128 128"
      id="unknown-file"
    >
      <path
        fill="transparent"
        stroke={color}
        strokeWidth="6"
        d="M35 35C35 30.0294 39.0294 26 44 26H74.0785C75.9108 26 77.6701 26.7184 78.9786 28.0011L88.0509 36.8939L91.1244 40.1967C92.3299 41.4921 93 43.1959 93 44.9654V93C93 97.9706 88.9706 102 84 102H44C39.0294 102 35 97.9706 35 93V35Z"
      ></path>
      <path
        fill="transparent"
        stroke={color}
        strokeWidth="6"
        d="M76 27V41C76 42.6569 77.3431 44 79 44H93"
      ></path>
      <path
        fill={color}
        d="M66 82.5C66 83.8807 64.8807 85 63.5 85C62.1193 85 61 83.8807 61 82.5C61 81.1193 62.1193 80 63.5 80C64.8807 80 66 81.1193 66 82.5Z"
      ></path>
      <path
        fill="transparent"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="6"
        d="M57 62.5854C57 58.9484 59.9101 56 63.5 56C67.0899 56 70 58.9484 70 62.5854C70 64.8085 68.9126 66.7744 67.2474 67.9668C65.4512 69.253 63.5 70.9616 63.5 73.1707V74"
      ></path>
    </svg>
  );
};
