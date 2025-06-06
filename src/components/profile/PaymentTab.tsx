import React, { useState } from 'react';
import s from './PaymentTab.module.scss';
import ChangePaymentMethod from './ChangePaymentMethod';

// Интерфейс для карты
interface CardData {
    id: number;
    type: string;
    cardType: string;
    last4: string;
}

// Мок-данные карт
const mockCards = [
    { id: 1, type: 'Visa', cardType: "Debit", last4: '4242', },
    { id: 2, type: 'MasterCard', cardType: "Credit", last4: '5678', },
];

const PaymentTab: React.FC = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    const [cards, setCards] = useState<CardData[]>(mockCards);
    // Состояние для отслеживания ID карты, для которой показывается подтверждение удаления
    const [cardToDelete, setCardToDelete] = useState<number | null>(null);

    const handleDeleteCard = (id: number) => {
        // Вместо немедленного удаления, устанавливаем ID карты для подтверждения удаления
        setCardToDelete(id);
    };

    const confirmDelete = () => {
        // Фактическое удаление карты после подтверждения
        if (cardToDelete !== null) {
            setCards(cards.filter(card => card.id !== cardToDelete));
            // Сбрасываем ID карты для удаления
            setCardToDelete(null);
        }
    };

    const cancelDelete = () => {
        // Отмена удаления
        setCardToDelete(null);
    };

    const handleEditCard = (card: CardData) => {
        setSelectedCard(card);
        setIsEditMode(true);
    };

    const handleAddNewCard = () => {
        setSelectedCard(null);
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setSelectedCard(null);
    };

    const handleSaveCard = (updatedCard: CardData) => {
        if (selectedCard) {
            setCards(cards.map(card =>
                card.id === updatedCard.id ? updatedCard : card
            ));
        } else {
            setCards([...cards, updatedCard]);
        }
        setIsEditMode(false);
        setSelectedCard(null);
    };

    if (isEditMode) {
        return (
            <ChangePaymentMethod
                card={selectedCard}
                onSave={handleSaveCard}
                onCancel={handleCancelEdit}
            />
        );
    }

    return (
        <div className={s.paymentTab}>
            {cards.length === 0 && <div className={s.empty}>No cards</div>}
            <div className={s.cardsList}>
                {cards.map((card) => (
                    <div key={card.id} className={s.cardItem}>


                        {cardToDelete === card.id ? (
                            <div className={s.confirmDelete}>
                                <div className={s.confirmText}>Are you sure?</div>
                                <div className={s.buttons}>
                                    <button className={s.outline} onClick={cancelDelete}>No</button>
                                    <button className={s.fill} onClick={confirmDelete}>Yes</button>

                                </div>
                            </div>
                        ) : (<> <div className={s.cardIcon}>
                            <img src={`/${card.type.toLowerCase()}.svg`} alt={card.type} />
                        </div>
                            <div className={s.cardInfo}>
                                <div className={s.name}>{card.type}</div>
                                <div className={s.info}>{card.cardType} ****{card.last4}</div>
                            </div>

                            <div className={s.buttons}>
                                <button className={s.outline} onClick={() => handleEditCard(card)}>Edit</button>
                                <button className={s.fill} onClick={() => handleDeleteCard(card.id)}>Delete</button>
                            </div></>
                        )}
                    </div>
                ))}
            </div>

            <button className={s.addCardButton} onClick={handleAddNewCard}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='26'
                    fill='none'
                    viewBox='0 0 26 26'
                >
                    <path
                        stroke='#fff'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 5.417v15.167M5.417 13h15.167'
                    ></path>
                </svg>  Add payment method
            </button>
        </div>
    );
};

export default PaymentTab; 