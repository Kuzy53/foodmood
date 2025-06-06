import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	RegistrationResponse,
	RegistrationRequest,
	ConfirmResponse,
	ConfirmRequest,
	LoginResponse,
	LoginRequest,
	ConfirmLoginResponse,
	ConfirmLoginRequest,
	UserResponse,
	ResendCodeResponse,
	ResendCodeRequest,
} from "../types/auth";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://dev.foodmood.menu/api/v1",
		credentials: "include",
	}),
	endpoints: (builder) => ({
		register: builder.mutation<RegistrationResponse, RegistrationRequest>({
			query: (body) => ({
				url: "/auth/registration",
				method: "POST",
				body,
			}),
		}),
		confirm: builder.mutation<ConfirmResponse, ConfirmRequest>({
			query: (body) => ({
				url: "/auth/registration/confirm",
				method: "POST",
				body,
			}),
		}),
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		confirmLogin: builder.mutation<ConfirmLoginResponse, ConfirmLoginRequest>({
			query: (body) => ({
				url: "/auth/login/confirm",
				method: "POST",
				body,
			}),
		}),
		fetchUser: builder.query<UserResponse, void>({
			query: () => ({
				url: "/users/me",
				method: "GET",
			}),
		}),
		resendCode: builder.mutation<ResendCodeResponse, ResendCodeRequest>({
			query: (body) => ({
				url: "/auth/resendCode",
				method: "POST",
				body,
			}),
		}),
	}),
});

// Экспортируем хуки, которые будем использовать в компонентах
export const { useRegisterMutation, useConfirmMutation, useResendCodeMutation, useLoginMutation, useConfirmLoginMutation, useFetchUserQuery } = authApi;
