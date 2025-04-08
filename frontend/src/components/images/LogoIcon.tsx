import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store/store";
import { darkenHex, getComplementaryHex } from "../../services/colorService";

const Logo = () => {
    const { pickedColor } = useAppSelector((state: RootState) => state.color);
    const comColor = getComplementaryHex(pickedColor);

    return (
        <svg
            className="image--logoIcon"
            width="183"
            height="183"
            viewBox="0 0 183 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                        className="start"
                        offset="0%"
                        stopColor={darkenHex(comColor, 20) || "#000000"}
                    />
                    <stop
                        className="end"
                        offset="100%"
                        stopColor={comColor || "#000000"}
                    />
                </linearGradient>
            </defs>
            <circle
                cx="91.5"
                cy="91.5"
                r="88.5"
                fill="transparent"
                stroke="url(#gradient-stroke)"
                strokeWidth="6"
            />
            <g clipPath="url(#clip0_1_4)">
                <path
                    d="M92.5 64.86L97.87 63.34C97.87 63.34 132.87 50.8 146.87 77.4C160.9 104 125 183.21 92.5 153.4C60.02 183.21 24.12 104 38.12 77.4C52.12 50.8 87.12 63.34 87.12 63.34L92.5 64.86ZM92.5 64.86C96.65 48.06 90.72 39.73 81.93 34.66M128.63 28.32C128.63 28.32 127 43.44 117.68 48.15C108.36 52.86 95 45.39 95 45.39C95 45.39 96.67 30.27 106 25.56C115.33 20.85 128.63 28.32 128.63 28.32Z"
                    stroke="url(#gradient-stroke)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M93.76 90.52V97.48H111.36V110.84H93.76V118.84H113.76V133H76V76.36H113.76V90.52H93.76Z"
                    fill="url(#gradient-stroke)"
                />
            </g>
            <defs>
                <clipPath id="clip0_1_4">
                    <rect
                        width="118.99"
                        height="140"
                        fill="transparent"
                        transform="translate(33 22)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Logo;
