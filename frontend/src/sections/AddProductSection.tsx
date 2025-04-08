// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// components
import Section from "../components/Section";
import Header from "../components/Header";
import AddProductImage from "../components/images/decorations/AddProductImage";
import AddProductForm from "../features/products/AddProductForm";

// services
import { darkenHex, getComplementaryHex } from "../services/colorService";

const AddProductSection = () => {
    const { pickedColor } = useAppSelector((state: RootState) => state.color);
    const comColor = getComplementaryHex(pickedColor);
    const darkerColor = darkenHex(comColor, 30);

    return (
        <Section
            blockPrefix="addProduct"
            sectionLevel="level1"
            headerChildren={
                <Header
                    parent="addProduct-section"
                    blockPrefix="addProduct"
                    sectionLevel="level1"
                    level={2}
                    title="Add Product"
                    visibleTitle={true}
                    headingStyle={{
                        backgroundImage: `linear-gradient(135deg, ${comColor}, ${darkerColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    <AddProductImage />
                </Header>
            }
            contentChildren={<AddProductForm />}
        />
    );
};

export default AddProductSection;
