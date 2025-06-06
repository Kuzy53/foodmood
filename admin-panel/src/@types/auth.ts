export type SignInCredential = {
  email: string
  password: string
}

export type ForgotPasswordReq = {
  email: string
}

export interface SignInResponse {
  id: string
  fullName: string
  authority:[]
  phoneNumber: string
  email: string
  access_token: string
}

export interface ResponseInfoObject {
  status: 'success' | 'failed';
  error_code?: number;
  message?: string;
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
  name: string
  email: string
  phone: string
  password: string
}

export interface User {
  id: string;                 // UUID пользователя
  name: string;               // Имя пользователя
  second_name: string | null; // Отчество пользователя, может быть null
  surname: string;            // Фамилия пользователя
  email: string;              // Email пользователя
  phone: string;              // Номер телефона пользователя
  photo: string;              // Фото пользователя, URL
  role: string;               // Роль пользователя (например, "developer")
  is_verified: boolean;       // Признак верификации пользователя
  google_id: string | null;   // ID Google-аккаунта, может быть null
  created_at: string;         // Дата создания (ISO формат)
  updated_at: string;         // Дата последнего обновления (ISO формат)
  deleted_at: string | null;  // Дата удаления, если есть, иначе null
}

