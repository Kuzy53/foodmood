// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from "react";
import styles from "./cartModal.module.scss";
import Krestic from "/krestic.svg";
import Minus1 from "/Minus1.svg";
import Plus1 from "/Plus1.svg";

const CartModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cartItems;
  updateCartItem;
  onPaymentOpen: () => void;
}> = ({ isOpen, onClose, cartItems, updateCartItem, onPaymentOpen }) => {
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    const appElement = document.body;

    if (isOpen) {
      appElement?.classList.add("modal-open");
    } else {
      appElement?.classList.remove("modal-open");
    }
    return () => {
      appElement?.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;
  if (!cartItems) return <>Load ....</>;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.cart__container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Cart</h2>
            <button className={styles.clearButton} onClick={onClose}>
              <img src={Krestic} alt="Clear Cart" />
            </button>
          </div>
          {cartItems?.length === 0 ? (
            <div className={styles.cart__none}>
              <img src={None} alt="None" />
              <p className={styles.empty}>Your cart is currently empty</p>
            </div>
          ) : (
            <ul className={styles.items}>
              {cartItems?.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.item__flex}>
                    <img src={item.photo} alt="" />
                    <div className={styles.details}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <div className={styles.details__flex}>
                        <p className={styles.price}>{item.price}$</p>
                      </div>
                      <div className={styles.controls}>
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.id,
                              item.quantity - 1,
                              0,
                              item.price
                            )
                          }
                        >
                          <img src={Minus1} alt="minus1" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.id,
                              item.quantity + 1,
                              0,
                              item.price
                            )
                          }
                        >
                          <img src={Plus1} alt="minus1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <p>{totalPrice}$</p>
        <button
          className={styles.orderButton}
          onClick={() => {
            onClose();
            onPaymentOpen();
          }}
        >
          Send an order
        </button>
      </div>
    </div>
    // </div>
  );
};

export default CartModal;
