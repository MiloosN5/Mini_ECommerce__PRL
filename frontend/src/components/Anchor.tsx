import { NavLink } from "react-router-dom";

interface AnchorProps {
    parent?: string;
    URL: string;
    orientation: string;
    mode?: string;
    modifier?: string;
    hasLink?: boolean;
    children?: React.ReactNode;
}

const Anchor = ({
    parent,
    URL,
    orientation,
    mode,
    modifier,
    hasLink = false,
    children,
}: AnchorProps) => {
    const className = `anchor anchor--${orientation} 
    ${modifier ? `anchor--${modifier}` : ""} 
    ${mode ? `anchor--${mode}` : ""} 
    ${parent ? `${modifier ? `${parent}__anchor--${modifier}` : `${parent}__anchor`}` : ""}`.trim();

    return hasLink ? (
        <NavLink className={className} to={`${URL}`}>
            {children}
        </NavLink>
    ) : (
        <a className={className} href={URL}>
            {children}
        </a>
    );
};

export default Anchor;
