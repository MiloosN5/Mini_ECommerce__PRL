const CartIcon = ({ color }: { color: string }) => {
  return (
    <svg
      id="Layer_1"
      className="image--cartIcon"
      data-name="Layer 1"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 106.53 122.88"
    >
      <title>shopping-bag</title>
      <path d="M4.93,30.34H27.41V25.76a25.77,25.77,0,0,1,51.53,0v4.58H101.6a4.91,4.91,0,0,1,3.47,1.45h0a4.9,4.9,0,0,1,1.44,3.48v69.9a17.75,17.75,0,0,1-17.7,17.7H17.7A17.75,17.75,0,0,1,0,105.18V35.28A4.91,4.91,0,0,1,1.45,31.8h0a4.91,4.91,0,0,1,3.47-1.45Zm28.76,0h39V25.76a19.49,19.49,0,0,0-39,0v4.58Zm-6.28,13V36.62H6.28v62h94V36.62H78.94v6.76a6.48,6.48,0,1,1-6.28-.12V36.62h-39v6.71a6.48,6.48,0,1,1-6.28,0Z" />
    </svg>
  );
};

export default CartIcon;
