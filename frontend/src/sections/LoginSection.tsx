// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// components
import AuthenticationImage from "../components/images/decorations/AuthenticationImage";
import LoginForm from "../features/auth/LoginForm";
import Section from "../components/Section";
import Header from "../components/Header";

// services
import { darkenHex, getComplementaryHex } from "../services/colorService";

const LoginSection = () => {
    const { pickedColor } = useAppSelector((state: RootState) => state.color);
    const comColor = getComplementaryHex(pickedColor);
    const darkerColor = darkenHex(comColor, 30);

    return (
        <Section
            blockPrefix="login"
            sectionLevel="level1"
            headerChildren={
                <Header
                    parent="login-section"
                    blockPrefix="login"
                    sectionLevel="level1"
                    level={2}
                    title="Login"
                    visibleTitle={true}
                    headingStyle={{
                        backgroundImage: `linear-gradient(135deg, ${comColor}, ${darkerColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    <AuthenticationImage text="LOGIN" />
                </Header>
            }
            contentChildren={<LoginForm />}
        />
    );
};

export default LoginSection;
