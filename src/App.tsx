import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router, useParams } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import MainPage from "./pages/MainPage";
import { useGetDishesQuery } from "./app/api/dishesApi";
import Registration from "./pages/registration/registration";
import Login from "./pages/login/Login";

import { Loader } from "@mantine/core";
import { useFetchUserQuery } from "./app/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./app/slices/authSlice";

interface CartItem {
	id: string;
	name: string;
	price: number;
	weight: number;
	quantity: number;
	photo: string;
}

interface Product {
	id: string;
	name: string;
	price: number;
	weight: number;
	photo: string;
	description: string;
	isAvailable: boolean;
	category: string;
}

interface Category {
	name: string;
	items: Product[];
}




const App: React.FC = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");

	const { isLoading, refetch: fetchUser } = useFetchUserQuery(undefined, {
		skip: !token,
	});

	useEffect(() => {
		if (token) {
			fetchUser()
				.unwrap()
				.then((user) => {
					console.log(user);
					dispatch(setCredentials({ user: user.payload.user, token }));
				})
				.catch(() => {
					console.error("Error fetching user");
					localStorage.removeItem("token");
				});
		}
	}, []);

	return (
		<Router>
			{isLoading && (
				<div className="loader">
					<Loader color="#A7C944" size="xl" type="dots" />
				</div>
			)}

			<Routes>
				<Route path="/:restaurantId/*" element={<AppWithParams />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
};

const AppWithParams: React.FC = () => {
	const { restaurantId } = useParams<{ restaurantId: string }>();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const { data, error, isLoading } = useGetDishesQuery(restaurantId || '', {
		skip: !restaurantId
	});

	useEffect(() => {
		if (error) {
			console.error("Error fetching dishes:", error);
		}
	}, [error]);

	useEffect(() => {
		if (!restaurantId) return;

		localStorage.setItem("restaurant_id", restaurantId);
	}, [restaurantId]);

	const clearCart = () => {
		setCartItems([]);
	};

	const addToCart = (productId: string, quantity: number) => {
		if (!data) return;

		let foundProduct: Product | undefined;

		data.payload.restaurant.menu.categories.forEach((category: Category) => {
			const product = category?.items?.find((item) => item.id === productId);
			if (product) {
				foundProduct = product;
			}
		});

		if (!foundProduct) return;

		// Создаем локальную копию, явно объявленную как Product
		const product: Product = foundProduct;

		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === productId);

			if (quantity <= 0) {
				return prevItems.filter((item) => item.id !== productId);
			}

			if (existingItem) {
				return prevItems.map((item) => (item.id === productId ? { ...item, quantity, price: product.price } : item));
			}

			return [
				...prevItems,
				{
					id: product.id,
					photo: product.photo,
					name: product.name,
					price: product.price,
					weight: product.weight,
					quantity,
				},
			];
		});
	};

	const groupedProducts = data
		? data.payload?.restaurant?.menu?.categories?.reduce((acc: Record<string, Product[]>, category: Category) => {
			acc[category.name] = category.items;
			return acc;
		}, {})
		: {};

	return (
		<Routes>
			<Route path="/" element={React.createElement(MainPage as any, {
				groupedProducts,
				cartItems,
				addToCart,
				clearCart,
				isLoading,
				data
			})} />
			<Route path="/cart" element={React.createElement(CartPage as any, {
				cartItems,
				updateCartItem: addToCart,
				clearCart
			})} />
		</Routes>
	);
};

export default App;
