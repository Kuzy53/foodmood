import React from 'react';
import s from './OrderDetails.module.scss';

interface Product {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image?: string;
}

export interface OrderDetails {
    id: string;
    title: string;
    date: string;
    total: string;
    address: string;
    products: Product[];
}

interface OrderDetailsProps {
    order: OrderDetails;
    onBack: () => void;
    onClose: () => void;
}

const OrderDetailsComponent: React.FC<OrderDetailsProps> = ({ order, onBack, onClose }) => {
    return (
        <div className={s.orderDetails}>
            <div className={s.header}>

                <button className={s.backButton} onClick={onBack}>
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
                            d='m15 6-6 6 6 6'
                        ></path>
                    </svg>
                </button>
                <h2 className={s.title}>My order</h2>
                <button className={s.closeButton} onClick={onClose}>
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
            <div className={s.container}>
                <div className={s.addressSection}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='27'
                        fill='none'
                        viewBox='0 0 25 27'
                        className={s.addressIcon}
                    >
                        <path
                            stroke='#000'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M12.5 15.666c1.726 0 3.125-1.455 3.125-3.25s-1.399-3.25-3.125-3.25-3.125 1.455-3.125 3.25 1.4 3.25 3.125 3.25'
                        ></path>
                        <path
                            stroke='#000'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m18.393 18.545-4.42 4.596c-.39.406-.92.634-1.472.634a2.04 2.04 0 0 1-1.473-.634l-4.42-4.596a8.8 8.8 0 0 1-2.28-4.438A9 9 0 0 1 4.8 9.1a8.6 8.6 0 0 1 3.07-3.89 8.1 8.1 0 0 1 4.63-1.46c1.648 0 3.259.508 4.629 1.46A8.6 8.6 0 0 1 20.2 9.1a9 9 0 0 1 .474 5.007 8.8 8.8 0 0 1-2.281 4.438'
                        ></path>
                    </svg>
                    <div className={s.address}>Address name st. 25</div>
                    <div className={s.distance}>5 miles</div>
                </div>

                <div className={s.mapSection}>
                    <div className={s.map}>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188820.50261609565!2d-70.9700245!3d42.3143655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2z0JHQvtGB0YLQvtC9LCDQnNCw0YHRgdCw0YfRg9GB0LXRgtGBLCDQodCo0JA!5e0!3m2!1sru!2sca!4v1740937474270!5m2!1sru!2sca" width="100%" height="263" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div className={s.productsSection}>
                <div className={s.container}>
                    <h3 className={s.sectionTitle}>Selected items</h3>
                    <div className={s.productsList}>
                        {order.products.map((product) => (
                            <div key={product.id} className={s.productItem}>
                                <div className={s.productImage}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} />
                                    ) : (
                                        <div className={s.imagePlaceholder} />
                                    )}
                                </div>
                                <div className={s.productInfo}>
                                    <div className={s.productName}>{product.name}</div>
                                    <div className={s.productPrice}>{product.price}</div>
                                    <div className={s.productQuantity}>x{product.quantity}</div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.orderSummary}>
                    <div className={s.container}>
                        <div className={s.orderTotal}>
                            <span>Total:</span>
                            <span>{order.total}</span>
                        </div>
                        <div className={s.orderDate}>
                            <span>Order date:</span>
                            <span>{order.date}</span>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default OrderDetailsComponent; 