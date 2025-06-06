// ProductCard.tsx
import React from "react";
import styles from "./ProductCard.module.scss";
import Minus1 from "/Minus1.svg";
import Plus1 from "/Plus1.svg";

export interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  photo: string;
  description: string;
  category: string;
  nutrition: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
  options: Array<{
    title: string;
    type: string;
    choices: Array<{ name: string; price: number }>;
  }>;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  addToCart: (productId: string, quantity: number) => void;
  onSelect: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  addToCart,
  onSelect,
}) => {
  const handleIncrement = () => addToCart(product.id, quantity + 1);
  const handleDecrement = () => addToCart(product.id, quantity - 1);

  return (
    <div
      className={styles["product-card"]}
      onClick={() => onSelect(product.id)}
    >
      <img src={product.photo} alt={product.name} className={styles.image} />
      <div className={styles.info_container}>
        <p className={styles.price}>${product.price}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.weight}>{product.description}</p>
        <div className={styles.controls}>
          {quantity > 0 ? (
            <div className={styles.counter}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement();
                }}
              >
                <img src={Minus1} alt="minus" />
              </button>
              <span>{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement();
                }}
              >
                <img src={Plus1} alt="plus" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleIncrement();
              }}
              className={styles.addButton}
            >
              <img src={Plus1} alt="plus" style={{ width: 18, height: 18 }} />
              &nbsp;Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
