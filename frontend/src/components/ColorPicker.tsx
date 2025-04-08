// redux
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setColor } from "../features/color/colorSlice";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

// services
import { getComplementaryHex } from "../services/colorService";

interface ColorPickerProps {
    label: string;
    labelClass?: string;
    hasArrow?: boolean;
}

const ColorPicker = ({ label, labelClass, hasArrow }: ColorPickerProps) => {
    const { pickedColor } = useAppSelector((state) => state.color);
    const comColor = getComplementaryHex(pickedColor);
    const dispatch = useAppDispatch();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setColor(e.target.value));
    };

    return (
        <>
            <label className={`${labelClass ? `${labelClass}` : ``}`}>{label}</label>
            {hasArrow && <FaArrowRightLong color={comColor} />}
            <input
                type="color"
                onChange={handleChange}
                value={pickedColor || "#000000"}
            />
        </>
    );
};

export default ColorPicker;
