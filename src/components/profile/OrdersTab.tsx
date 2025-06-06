import React from 'react';
import s from './OrdersTab.module.scss';
import Arrow from "/ArrowDown.svg";
import { OrderDetails } from './OrderDetails';

// Расширенные мок-данные для заказов
const mockOrders = [
    {
        id: '1001',
        title: 'Sushi Bar',
        date: '04.16.2024',
        total: '$48.15',
        address: '123 Main St, New York, NY 10001',
        products: [
            { id: 1, name: 'California Roll', price: '$12.50', quantity: 2 },
            { id: 2, name: 'Salmon Nigiri', price: '$8.75', quantity: 1 },
            { id: 3, name: 'Miso Soup', price: '$4.50', quantity: 2 }
        ]
    },
    {
        id: '1002',
        title: 'Italian Bistro',
        date: '04.17.2024',
        total: '$36.50',
        address: '456 Park Ave, New York, NY 10022',
        products: [
            { id: 1, name: 'Margherita Pizza', price: '$18.00', quantity: 1 },
            { id: 2, name: 'Spaghetti Carbonara', price: '$15.50', quantity: 1 },
            { id: 3, name: 'Garlic Bread', price: '$3.00', quantity: 1 }
        ]
    },
    {
        id: '1003',
        title: 'French Patisserie',
        date: '04.19.2024',
        total: '$24.00',
        address: '789 Broadway, New York, NY 10003',
        products: [
            { id: 1, name: 'Croissant', price: '$3.50', quantity: 2 },
            { id: 2, name: 'Eclair', price: '$4.75', quantity: 2 },
            { id: 3, name: 'Cafe Latte', price: '$3.75', quantity: 2 }
        ]
    },
    {
        id: '1004',
        title: 'Mexican Cantina',
        date: '04.21.2024',
        total: '$22.30',
        address: '567 West End Ave, New York, NY 10024',
        products: [
            { id: 1, name: 'Chicken Tacos', price: '$9.75', quantity: 1 },
            { id: 2, name: 'Guacamole', price: '$4.50', quantity: 1 },
            { id: 3, name: 'Churros', price: '$4.25', quantity: 2 }
        ]
    },
];

interface OrdersTabProps {
    onSelectOrder: (order: OrderDetails) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ onSelectOrder }) => {
    const handleOrderClick = (order: OrderDetails) => {
        onSelectOrder(order);
    };

    return (
        <div className={s.ordersTab}>
            {mockOrders.length > 0 ? (
                mockOrders.map((order) => (
                    <div
                        className={s.order}
                        key={order.id}
                        onClick={() => handleOrderClick(order)}
                    >
                        <div className={s.orderWrapper}>
                            <div className={s.orderTitle}>
                                {order.title}
                            </div>
                            <div className={s.orderDate}>
                                {order.date}
                            </div>
                        </div>
                        <div className={s.orderTotal}>
                            {order.total}
                        </div>
                        <div className={s.orderArrow}>
                            <img src={Arrow} alt="Arrow" />
                        </div>
                    </div>
                ))
            ) : (
                <div className={s.emptyState}>
                    You have no orders yet
                </div>
            )}
        </div>
    );
};

export default OrdersTab; 