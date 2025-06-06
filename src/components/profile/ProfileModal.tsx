import React, { useState } from 'react';
import PersonalTab from './PersonalTab';
import OrdersTab from './OrdersTab';
import PaymentTab from './PaymentTab';
import SecurityTab from './SecurityTab';
import OrderDetailsComponent, { OrderDetails } from './OrderDetails';
import s from './ProfileModal.module.scss';

interface ProfileModalProps {
    opened: boolean;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ opened, onClose }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);

    if (!opened) return null;

    const handleClose = () => {

        setActiveTab('personal');
        setSelectedOrder(null);

        onClose();
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);

        setSelectedOrder(null);
    };

    const handleSelectOrder = (order: OrderDetails) => {
        setSelectedOrder(order);
    };

    const handleBackToOrders = () => {
        setSelectedOrder(null);
    };


    const isOrderDetailsView = activeTab === 'orders' && selectedOrder !== null;

    const renderTabContent = () => {

        switch (activeTab) {
            case 'personal':
                return <PersonalTab />;
            case 'orders':
                return <OrdersTab onSelectOrder={handleSelectOrder} />;
            case 'payment':
                return <PaymentTab />;
            case 'security':
                return <SecurityTab />;
            default:
                return <PersonalTab />;
        }
    };

    return (
        <div className={s.modalOverlay} onClick={handleClose}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                {isOrderDetailsView ? (

                    <div className={s.orderDetailsContainer}>

                        <OrderDetailsComponent order={selectedOrder} onBack={handleBackToOrders} onClose={handleClose} />
                    </div>
                ) : (

                    <>
                        <div className={s.modalHeader}>
                            <h2 className={s.modalTitle}>Profile</h2>
                            <button className={s.closeButton} onClick={handleClose}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        stroke='#000'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M18 6 6 18M6 6l12 12'
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div className={s.tabsContainer}>
                            <div className={s.tabsList}>
                                <button
                                    className={`${s.tabButton} ${activeTab === 'personal' ? s.active : ''}`}
                                    onClick={() => handleTabClick('personal')}
                                >
                                    Personal
                                </button>
                                <button
                                    className={`${s.tabButton} ${activeTab === 'orders' ? s.active : ''}`}
                                    onClick={() => handleTabClick('orders')}
                                >
                                    Orders
                                </button>
                                <button
                                    className={`${s.tabButton} ${activeTab === 'payment' ? s.active : ''}`}
                                    onClick={() => handleTabClick('payment')}
                                >
                                    Payment
                                </button>
                                <button
                                    className={`${s.tabButton} ${activeTab === 'security' ? s.active : ''}`}
                                    onClick={() => handleTabClick('security')}
                                >
                                    Security
                                </button>
                            </div>

                            <div className={s.tabContent}>
                                {renderTabContent()}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileModal; 