interface NavProps {
  modifier?: string;
  children?: React.ReactNode;
  parent?: string;
}

const Nav = ({ modifier, children, parent }: NavProps) => {
  return (
    <nav
      className={`nav ${modifier ? `nav--${modifier}` : ``} ${parent ? `${parent}__nav` : ``}`}
    >
      {children}
    </nav>
  );
};

export default Nav;
