// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayModal from "../components/PayModal";
import styles from "./CartPage.module.scss";
import None from "/None.svg";

interface CartPageProps {
  cartItems: Array<{
    id: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    weight: number;
  }>;
  updateCartItem: (id: string, quantity: number, price: number) => void;
  clearCart: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  updateCartItem,
  clearCart,
}) => {
  const navigate = useNavigate();
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.cartPage}>
      {isModalOpen && (
        <PayModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      <div className={`${styles.header} ${styles.container}`}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>
        <h2 className={styles.title}>Take your mood</h2>
        <button className={styles.clearButton} onClick={clearCart}>
          <img src="/Pomoika.svg" alt="Clear Cart" />
        </button>
      </div>
      <div className={`${styles.cart__list} ${styles.container}`}>
        {cartItems.length === 0 ? (
          <div className={styles.cart__none}>
            <img src={None} alt="None" />
            <p className={styles.empty}>Your cart is currently empty</p>
          </div>
        ) : (
          <ul className={styles.cartItems}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.cart__flex}>
                  <img src={item.photo} alt={item.name} />
                  <div className={styles.details}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <div className={styles.cart__flex}>
                      <p className={styles.price}>${item.price}</p>
                      <p className={styles.weight}>{item.weight}g</p>
                    </div>
                  </div>
                </div>
                <div className={styles.controls}>
                  <button
                    onClick={() =>
                      updateCartItem(item.id, item.quantity - 1, 0, item.price)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartItem(item.id, item.quantity + 1, 0, item.price)
                    }
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className={styles.total}>
          <p>${totalPrice}</p>
          <button
            className={styles.orderButton}
            onClick={() => {
              console.log("lkjhgf");
              handleOpenModal();
            }}
          >
            Send an order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
