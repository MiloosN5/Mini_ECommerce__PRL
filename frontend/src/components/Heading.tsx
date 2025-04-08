import React from "react";

interface HeadingProps {
    level: number;
    title?: any;
    visibleTitle: boolean;
    style?: any;
}

const Heading = ({
    level,
    title = "default",
    visibleTitle,
    style,
}: HeadingProps) => {
    const Tag = `h${level}`;

    return (
        <>
            {React.createElement(
                Tag,
                {
                    className: visibleTitle ? "" : "sr-only",
                    style: style,
                },
                title,
            )}
        </>
    );
};

export default Heading;
