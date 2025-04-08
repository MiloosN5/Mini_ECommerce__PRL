// / <reference types="vite-plugin-svgr/client" />

// react
import { useEffect, useRef } from "react";

// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

// components
import HeroImage from "../components/images/decorations/HeroImage";
import Section from "../components/Section";
import Header from "../components/Header";
import Anchor from "../components/Anchor";
import ColorPicker from "../components/ColorPicker";

// services
import { darkenHex, getComplementaryHex } from "../services/colorService";

const HeroSection = () => {
    const { pickedColor } = useAppSelector((state: RootState) => state.color);
    const comColor = getComplementaryHex(pickedColor);
    const darkerColor = darkenHex(comColor, 30);

    const heroDiv1 = useRef<HTMLDivElement | null>(null);
    const heroDiv2 = useRef<HTMLDivElement | null>(null);
    const heroDiv3 = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const refs = [heroDiv1, heroDiv2, heroDiv3];
        const timers: number[] = [];

        for (let i = 0; i < refs.length; i++) {
            if (!refs[i].current) continue;
            const timer = setTimeout(
                () => {
                    refs[i].current!.style.maxWidth = "100%";
                },
                (i + 1) * 1000,
            );
            timers.push(timer);
        }

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, []);

    return (
        <Section
            blockPrefix="hero"
            sectionLevel="level1"
            headerChildren={
                <Header
                    parent="hero-section"
                    blockPrefix="hero"
                    sectionLevel="level1"
                    level={1}
                    title="mini E-commerce"
                    visibleTitle={true}
                    headingStyle={{
                        backgroundImage: `linear-gradient(135deg, ${comColor}, ${darkerColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    <HeroImage />
                </Header>
            }
            contentChildren={
                <div className="hero-container">
                    <p className="hero-section__description">
                        You can now conveniently order the products you need online — quick,
                        easy, and hassle-free!
                    </p>
                    <Section
                        parent="hero-section"
                        blockPrefix="CTA"
                        sectionLevel="level2"
                        headerChildren={
                            <Header
                                parent="CTA-section"
                                blockPrefix="CTA"
                                sectionLevel="level2"
                                level={2}
                                title="CTA"
                                visibleTitle={false}
                            />
                        }
                        contentChildren={
                            <div className="CTA-container">
                                <div className="CTA-section__action" ref={heroDiv1}>
                                    <span className="CTA-section__actionTitle">
                                        Browse our product range and choose what suits you best!
                                    </span>
                                    <FaArrowRightLong color={comColor} />{" "}
                                    <Anchor
                                        URL={`/products`}
                                        mode="invert"
                                        orientation="col"
                                        hasLink={true}
                                        parent="CTA-section"
                                        modifier="actionBtn"
                                    >
                                        <span>Click</span>
                                    </Anchor>
                                </div>
                                <div className="CTA-section__action" ref={heroDiv2}>
                                    <span className="CTA-section__actionTitle">
                                        Add new products to our catalog!
                                    </span>{" "}
                                    <FaArrowRightLong color={comColor} />
                                    <Anchor
                                        URL={`/products/add`}
                                        mode="invert"
                                        orientation="col"
                                        hasLink={true}
                                        parent="CTA-section"
                                        modifier="actionBtn"
                                    >
                                        <span>Click</span>
                                    </Anchor>
                                </div>
                                <div className="CTA-section__action" ref={heroDiv3}>
                                    <ColorPicker
                                        label="Select your preferred background color"
                                        labelClass="CTA-section__actionTitle"
                                        hasArrow={true}
                                    />
                                </div>
                            </div>
                        }
                    />
                </div>
            }
        />
    );
};

export default HeroSection;
