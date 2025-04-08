import { forwardRef, useImperativeHandle, useRef } from "react";

interface SectionProps {
    parent?: string;
    blockPrefix: string;
    sectionLevel: string;
    modifier?: string;
    status?: boolean;
    sectionStyle?: any;
    wrapperStyle?: any;
    contentStyle?: any;
    headerChildren?: React.ReactNode;
    contentChildren?: React.ReactNode;
    footerChildren?: React.ReactNode;
}

export interface SectionRef {
    sectionRef: HTMLElement | null;
}

const Section = forwardRef<SectionRef, SectionProps>(
    (
        {
            parent,
            blockPrefix,
            sectionLevel,
            modifier,
            status,
            sectionStyle,
            wrapperStyle,
            contentStyle,
            headerChildren,
            contentChildren,
            footerChildren,
        },
        ref,
    ) => {
        const sectionRef = useRef<HTMLElement>(null);

        useImperativeHandle(ref, () => ({
            sectionRef: sectionRef.current,
        }));

        return (
            <section
                ref={sectionRef}
                className={`section--${sectionLevel} ${status ? `active` : ``} ${modifier ? `${blockPrefix}-section--${modifier} ${parent ? `${parent}__${blockPrefix}--${modifier}` : ""}` : `${blockPrefix}-section ${parent ? `${parent}__${blockPrefix}` : ""}`}`}
                style={sectionStyle ? sectionStyle : undefined}
            >
                <div
                    className={`section--${sectionLevel}__wrapper ${modifier ? `${blockPrefix}-section--${modifier}__wrapper` : `${blockPrefix}-section__wrapper`}`}
                    style={wrapperStyle ? wrapperStyle : undefined}
                >
                    {headerChildren && headerChildren}
                    {contentChildren && (
                        <div
                            className={`section--${sectionLevel}__content ${modifier ? `${blockPrefix}-section--${modifier}__content` : `${blockPrefix}-section__content`}`}
                            style={contentStyle ? contentStyle : undefined}
                        >
                            {contentChildren}
                        </div>
                    )}
                    {footerChildren && footerChildren}
                </div>
            </section>
        );
    },
);

export default Section;
