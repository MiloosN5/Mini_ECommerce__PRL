// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// components
import Section from "../components/Section";
import Header from "../components/Header";
import AuthenticationImage from "../components/images/decorations/AuthenticationImage";
import SignupForm from "../features/auth/SignupForm";

// services
import { darkenHex, getComplementaryHex } from "../services/colorService";

const SignupSection = () => {
    const { pickedColor } = useAppSelector((state: RootState) => state.color);
    const comColor = getComplementaryHex(pickedColor);
    const darkerColor = darkenHex(comColor, 30);

    return (
        <Section
            blockPrefix="signup"
            sectionLevel="level1"
            headerChildren={
                <Header
                    parent="signup-section"
                    blockPrefix="signup"
                    sectionLevel="level1"
                    level={2}
                    title="Signup"
                    visibleTitle={true}
                    headingStyle={{
                        backgroundImage: `linear-gradient(135deg, ${comColor}, ${darkerColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    <AuthenticationImage text="SIGNUP" />
                </Header>
            }
            contentChildren={<SignupForm />}
        />
    );
};

export default SignupSection;
