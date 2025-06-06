// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import ProductCard, { Product } from "./ProductCard";
import styles from "./ProductList.module.scss";

interface CartItem {
  id: string;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  onSelect: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products = [],
  cartItems,
  addToCart,
  onSelect,
}) => {
  return (
    <div className={styles["product-list"]}>
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cartItem ? cartItem.quantity : 0}
            addToCart={addToCart}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
