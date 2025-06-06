export interface RegistrationRequest {
	identifier: string;
	name: string;
	role?: string;
	is_agree_with_mailing: boolean;
}

export interface RegistrationResponse {
	message?: string;
}

export interface ConfirmRequest {
	identifier: string;
	submit_code: string;
}

export interface ConfirmResponse {
	message?: string;
}

export interface ResendCodeRequest {
	identifier: string;
}

export interface ResendCodeResponse {
	message?: string;
}

export interface LoginRequest {
	identity: string;
}

export interface LoginResponse {
	message?: string;
}

export interface ConfirmLoginRequest {
	email: string;
	code: string;
}

export interface ConfirmLoginResponse {
	payload?: {
		token?: string;
	};
	response?: {
		message?: string;
		status?: number;
	};
}

export interface User {
	id: string;
	name: string;
	second_name: string | null;
	surname: string;
	email: string;
	phone: string;
	photo: string;
	role: string;
	is_verified: boolean;
	google_id: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	is_agree_with_mailing: boolean;
}

export interface UserResponse {
	response: {
		status: number;
	};
	payload: {
		user: User;
	};
	subscription: null;
}
