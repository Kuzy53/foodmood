import React, { useState } from 'react';
import s from './ChangePaymentMethod.module.scss';

interface CardData {
    id: number;
    type: string;
    cardType: string;
    last4: string;
}

interface ChangePaymentMethodProps {
    card: CardData | null;
    onSave: (card: CardData) => void;
    onCancel: () => void;
}

const ChangePaymentMethod: React.FC<ChangePaymentMethodProps> = ({ card, onSave, onCancel }) => {

    const [formData, setFormData] = useState({
        cardNumber: card ? `**** **** **** ${card.last4}` : '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
        cardType: card ? card.cardType : 'Debit',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (card) {
            onSave({
                ...card,
                cardType: formData.cardType,

            });
        } else {

            onSave({
                id: Math.floor(Math.random() * 1000),
                type: formData.cardNumber.startsWith('4') ? 'Visa' : 'MasterCard',
                cardType: formData.cardType,
                last4: formData.cardNumber.slice(-4),
            });
        }
    };

    return (
        <div className={s.changePaymentMethod}>
            <div className={s.header}>
                <button className={s.backButton} onClick={onCancel}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='8'
                        height='14'
                        fill='none'
                        viewBox='0 0 8 14'
                    >
                        <path
                            stroke='#000'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M7 1 1 7l6 6'
                        ></path>
                    </svg>
                </button>
                <h2 className={s.title}>{card ? 'Change payment method' : 'Add payment method'}</h2>
            </div>

            <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.formWrapper}>
                    <div className={s.formGroup}>

                        <input
                            type="text"
                            id="cardholderName"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleChange}
                            placeholder="Name on card"
                        />
                    </div>
                    <div className={s.formGroup}>

                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="Card number"

                        />
                    </div>



                    <div className={s.formRow}>
                        <div className={s.formGroup}>

                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                            />
                        </div>

                        <div className={s.formGroup}>

                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="CVV"
                            />
                        </div>
                    </div>
                </div>

                <div className={s.formActions}>
                    <button type="submit" className={s.saveButton}>
                        Save
                    </button>
                    <button type="button" className={s.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    );
};

export default ChangePaymentMethod; 