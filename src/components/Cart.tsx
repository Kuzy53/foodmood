/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from "react";
import styles from "./Cart.module.scss";
import CartModal from "./cartModal/cartModal";
import Minus1 from "/Minus1.svg";
import None from "/None.svg";
import Plus1 from "/Plus1.svg";
import Pomoika from "/Pomoika.svg";

interface CartItem {
  id: number;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  weight: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateCartItem: (id: number, quantity: number, price: number) => void;
  clearCart: () => void;
  onSearchClick: () => void;
  onSearchClose: () => void;
  isSearchActive: boolean;
  onSearchInput: (value: string) => void;
  /** Новый проп для открытия модалки оплаты */
  onPaymentOpen: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateCartItem,
  clearCart,
  onSearchClick,
  onSearchClose,
  isSearchActive,
  onSearchInput,
  onPaymentOpen,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div
      className={`${styles.main__contaier} ${
        isSearchActive && window.innerWidth <= 1185
          ? styles.searchContainer
          : ""
      }`}
    >
      <div className={styles.cart}>
        <div className={styles.cart__container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Cart</h2>
            <button className={styles.clearButton} onClick={clearCart}>
              <img src={Pomoika} alt="Clear Cart" />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <div className={styles.cart__none}>
              <img src={None} alt="None" />
              <p className={styles.empty}>Your cart is currently empty</p>
            </div>
          ) : (
            <ul className={styles.items}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.item__flex}>
                    <img src={item.photo} alt="" />
                    <div className={styles.details}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p className={styles.price}>{item.price}$</p>
                      <div className={styles.controls}>
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.quantity - 1, 0)
                          }
                        >
                          <img src={Minus1} alt="minus" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.quantity + 1, 0)
                          }
                        >
                          <img src={Plus1} alt="plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div
            className={styles.total}
            onClick={() => {
              if (window.innerWidth <= 1185) {
                handleOpenModal();
              } else {
                onPaymentOpen();
              }
            }}
          >
            <p>{totalPrice}$</p>
            <button className={styles.orderButton}>Send an order</button>
          </div>
        )}
      </div>

      {/* Модалка корзины на мобильном */}
      {isModalOpen && (
        <CartModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cartItems={cartItems}
          updateCartItem={updateCartItem}
          onPaymentOpen={() => {
            handleCloseModal();
            onPaymentOpen();
          }}
        />
      )}
    </div>
  );
};

export default Cart;
