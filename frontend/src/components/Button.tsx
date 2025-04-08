import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store/store";

interface ButtonProps {
    parent?: string;
    orientation: string;
    mode?: string;
    modifier?: string;
    handleClick?: (
        event: React.MouseEvent<HTMLButtonElement>,
        item?: any,
    ) => void;
    item?: any;
    isDisabled?: boolean;
    children?: React.ReactNode;
}

const Button = ({
    parent,
    orientation,
    mode,
    modifier,
    handleClick,
    item,
    isDisabled,
    children,
}: ButtonProps) => {
    const status = useAppSelector((state: RootState) => state.products.status);
    console.log("disabled?", isDisabled);

    const className = `button button--${orientation} 
    ${modifier ? `button--${modifier}` : ""} 
    ${mode ? `button--${mode}` : ""} 
    ${parent ? `${modifier ? `${parent}__button--${modifier}` : `${parent}__button`}` : ""}`.trim();

    return (
        <button
            disabled={isDisabled || status === "loading"}
            className={className}
            onClick={(event) => handleClick?.(event, item)}
        >
            {children}
        </button>
    );
};

export default Button;
