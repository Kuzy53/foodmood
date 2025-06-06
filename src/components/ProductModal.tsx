/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useGetDishByIdQuery } from "../app/api/dishesApi";
import styles from "./ProductModal.module.scss";
import Minus1 from "/Minus1.svg";
import Plus1 from "/Plus1.svg";
import X from "/X.svg";

interface ProductModalProps {
  dishId: string;
  isOpen: boolean;
  onClose: () => void;
  addToCart: (
    productId: string,
    quantity: number,
    selectedOptions: { [key: string]: string[] },
    totalPrice: number
  ) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  dishId,
  isOpen,
  onClose,
  addToCart,
}) => {
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

  const { data, error, isLoading } = useGetDishByIdQuery(dishId);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      const calculateTotalPrice = () => {
        let optionsPrice = 0;

        if (data.modifierSet?.modifiers) {
          data.modifierSet.modifiers.forEach((mod) => {
            if (selectedOptions[mod.name]?.includes(mod.name)) {
              optionsPrice += mod.price || 0;
            }
          });
        }

        if (selectedOptions["variation"] && data.modifierSet?.variations) {
          data.modifierSet.variations.forEach((varn) => {
            if (selectedOptions["variation"].includes(varn.name)) {
              optionsPrice += varn.price || 0;
            }
          });
        }

        setTotalPrice((data.price + optionsPrice) * quantity);
      };

      calculateTotalPrice();
    }
  }, [selectedOptions, quantity, data]);

  const handleAddToCart = () => {
    if (data) {
      addToCart(data.id, quantity, selectedOptions, totalPrice);
      onClose();
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleOptionChange = (
    optionTitle: string,
    choice: string,
    isCheckbox: boolean
  ) => {
    setSelectedOptions((prev) => {
      if (isCheckbox) {
        const selectedChoices = prev[optionTitle] || [];
        return {
          ...prev,
          [optionTitle]: selectedChoices.includes(choice)
            ? selectedChoices.filter((c) => c !== choice)
            : [...selectedChoices, choice],
        };
      } else {
        return { ...prev, [optionTitle]: [choice] };
      }
    });
  };

  if (error) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.emptyMessage}>Data upload error</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.emptyMessage}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.emptyMessage}>No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__flex}>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={X} alt="" />
          </button>
          <h2 className={styles.details__title}>{data.name}</h2>
          <img src={data.photo} alt={data.name} className={styles.image} />
          <div className={styles.details}>
            <p className={styles.price}>${totalPrice.toFixed(2)}</p>
            <p className={styles.details__description}>{data.description}</p>
            {data.modifierSet?.variations &&
              data.modifierSet.variations.length > 0 && (
                <div className={styles.options}>
                  <h3>Choose</h3>
                  {data.modifierSet.variations.map((varn, idx) => (
                    <label key={idx} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="variation"
                        value={varn.name}
                        checked={
                          selectedOptions["variation"]?.includes(varn.name) ||
                          false
                        }
                        onChange={() =>
                          handleOptionChange("variation", varn.name, false)
                        }
                      />
                      {varn.name}
                    </label>
                  ))}
                </div>
              )}
            {data.modifierSet?.modifiers &&
              data.modifierSet.modifiers.length > 0 && (
                <div className={styles.options}>
                  <h3>Add extra</h3>
                  {data.modifierSet.modifiers.map((mod, idx) => (
                    <label key={idx} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name={mod.name}
                        value={mod.name}
                        checked={
                          selectedOptions[mod.name]?.includes(mod.name) || false
                        }
                        onChange={() =>
                          handleOptionChange(mod.name, mod.name, true)
                        }
                      />
                      {mod.name} {mod.price > 0 && `+${mod.price}$`}
                    </label>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <div className={styles.quantity}>
          <button onClick={() => handleQuantityChange(-1)}>
            <img src={Minus1} alt="minus1" />
          </button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>
            <img src={Plus1} alt="Plus1" />
          </button>
        </div>
        <button className={styles.addButton} onClick={handleAddToCart}>
          Add to order
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
