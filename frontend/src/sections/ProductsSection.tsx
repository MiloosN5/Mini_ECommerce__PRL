// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

// components
import Section from "../components/Section";
import Header from "../components/Header";
import Products from "../features/products/Products";
import ProductsImage from "../components/images/decorations/ProductsImage";
import Anchor from "../components/Anchor";

// services
import { darkenHex, getComplementaryHex } from "../services/colorService";

const ProductsSection = () => {
  const { pickedColor } = useAppSelector((state: RootState) => state.color);
  const comColor = getComplementaryHex(pickedColor);
  const darkerColor = darkenHex(comColor, 30);
  const { items } = useAppSelector((state: RootState) => state.products);

  return (
    <Section
      blockPrefix="products"
      sectionLevel="level1"
      headerChildren={
        <Header
          parent="products-section"
          blockPrefix="products"
          sectionLevel="level1"
          level={2}
          title="Products"
          visibleTitle={true}
          headingStyle={{
            backgroundImage: `linear-gradient(135deg, ${comColor}, ${darkerColor})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <ProductsImage />
        </Header>
      }
      contentChildren={
        <>
          {items && items.length > 0 ? (
            <Products />
          ) : (
            <div className="products-section__empty">
              <p>No products available</p>
            </div>
          )}
          <Section
            parent="products-section"
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
                <div className="CTA-section__action">
                  <span className="CTA-section__actionTitle">
                    Want to add a new product?
                  </span>
                  <FaArrowRightLong color={comColor} />{" "}
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
              </div>
            }
          />
        </>
      }
    />
  );
};

export default ProductsSection;
