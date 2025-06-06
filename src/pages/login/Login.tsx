import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import s from "./Login.module.scss";
import CodeConfirmation from "../../components/CodeConfirmation";
// import Fb from '/fb.svg';
import Googl from "/googl.svg";
// import Apl from '/apl.svg';

import { useLoginMutation, useConfirmLoginMutation, useResendCodeMutation, useFetchUserQuery } from "../../app/api/authApi";

import MobilePhone from "../../components/MobilePhone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/slices/authSlice";

type Method = "email" | "phone";

interface ILoginForm {
	email: string;
	phone: string;
}

const Login = () => {
	const [method, setMethod] = useState<Method>("email");
	const [step, setStep] = useState<"form" | "confirmation">("form");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, { isLoading: isLoginLoading, isError: isLoginError, error: loginError }] = useLoginMutation();

	const [confirmLogin, { isLoading: isConfirmLoading, isError: isConfirmError, error: confirmError }] = useConfirmLoginMutation();
	const { refetch: fetchUser } = useFetchUserQuery();
	const [resendCode] = useResendCodeMutation();

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
		getValues,
	} = useForm<ILoginForm>({
		mode: "onSubmit",
		defaultValues: {
			email: "",
			phone: "",
		},
	});

	const handleMethodChange = (newMethod: Method) => {
		if (step === "form") {
			setMethod(newMethod);
		}
	};

	const onSubmitForm = async () => {
		const { email, phone } = getValues();
		const identity = method === "email" ? email : phone;

		try {
			await login({ identity }).unwrap();
			setStep("confirmation");
		} catch (err) {
			console.error("Login error:", err);
		}
	};

	const handleConfirmCode = async (code: string) => {
		const { email, phone } = getValues();
		const identity = method === "email" ? email : phone;

		try {
			const res = await confirmLogin({ email: identity, code }).unwrap();

			const token = res?.payload?.token;
			if (!token) throw new Error("Token not found in response");

			localStorage.setItem("token", token);

			await fetchUser()
				.unwrap()
				.then((user) => {
					console.log(user);
					dispatch(setCredentials({ user: user.payload.user, token }));
					const restorantId = localStorage.getItem("restaurant_id");
					if (restorantId) {
						navigate(`/${restorantId}`);
					} else {
						navigate("/");
					}
				})
				.catch(() => {
					console.error("Error fetching user");
					localStorage.removeItem("token");
				});
		} catch (err) {
			console.error("Confirm login error:", err);
		}
	};

	const handleResendCode = async () => {
		const { email, phone } = getValues();
		const identity = method === "email" ? email : phone;

		try {
			await resendCode({ identifier: identity }).unwrap();
			console.log("Resend code success");
		} catch (err) {
			console.error("Resend code error:", err);
		}
	};

	const getMessageFromError = (errorObj: unknown): string | undefined => {
		if (errorObj && typeof errorObj === "object" && "data" in errorObj && (errorObj as any).data && typeof (errorObj as any).data.message === "string") {
			return (errorObj as any).data.message;
		}
		return undefined;
	};

	const loginErrorMessage = getMessageFromError(loginError);
	const confirmErrorMessage = getMessageFromError(confirmError);

	const { email, phone } = getValues();
	const displayText = method === "email" ? `The password has been sent to ${email}` : `The verification code has been sent to ${phone}`;

	const didntGetText = method === "email" ? `Didn't get the password?` : `Didn't get the code?`;

	return (
		<div className={s.container}>
			<div className={s.header}>
				<h1 className={s.h1}>Profile</h1>
			</div>

			<div className={s.login}>
				<h2 className={s.title}>Login to your account</h2>
				<div className={s.toggleWrapper}>
					<button type="button" className={`${s.toggleButton} ${method === "email" ? s.active : ""}`} onClick={() => handleMethodChange("email")} disabled={step === "confirmation"}>
						Email
					</button>
					<button type="button" className={`${s.toggleButton} ${method === "phone" ? s.active : ""}`} onClick={() => handleMethodChange("phone")} disabled={step === "confirmation"}>
						Phone Number
					</button>
				</div>

				{step === "form" && (
					<form className={s.form} onSubmit={handleSubmit(onSubmitForm)}>
						<div className={s.formGroup}>
							{method === "email" ? (
								<>
									<input
										type="email"
										id="email"
										placeholder="Email"
										className={`${s.input} ${errors.email ? s.inputError : ""}`}
										{...register("email", {
											required: "Please enter your email",
										})}
									/>
									{errors.email && <p className={s.errorText}>{errors.email.message}</p>}
								</>
							) : (
								<>
									<Controller
										name="phone"
										control={control}
										rules={{
											required: "Please enter your phone",
										}}
										render={({ field, fieldState }) => <MobilePhone value={field.value} onChange={field.onChange} touched={!!fieldState.error} error={fieldState.error?.message} />}
									/>
								</>
							)}
						</div>

						{isLoginError && loginErrorMessage && (
							<div className={s.errorText} style={{ marginBottom: "10px" }}>
								{loginErrorMessage}
							</div>
						)}

						<button type="submit" className={s.submitButton} disabled={isLoginLoading}>
							{isLoginLoading ? "Loading..." : method === "email" ? "Send Password" : "Send Code"}
						</button>

						<button
							type="button"
							className={s.registerButton}
							onClick={() => {
								navigate("/registration");
							}}
						>
							Register
						</button>
					</form>
				)}

				{step === "confirmation" && (
					<CodeConfirmation
						displayText={displayText}
						didntGetText={didntGetText}
						codeLength={4}
						confirmButtonText="Confirm"
						resendButtonText="Resend Code"
						onConfirm={(code) => handleConfirmCode(code)}
						onResend={() => handleResendCode()}
						isConfirmLoading={isConfirmLoading}
						errorMessage={isConfirmError ? confirmErrorMessage || "Invalid code." : undefined}
						isResendTimerActive={true}
						initialResendTime={59}
					/>
				)}

				<div className={s.socialWrapper}>
					<div className={s.divider}>
						<span>or sign up with</span>
					</div>
					<div className={s.socialIcons}>
						{/* <button className={s.socialBtn}>
                  <img src={Fb} alt="fb" />
                </button> */}

						<button
							className={s.socialBtn}
							onClick={() => {
								window.location.href = "https://dev.foodmood.menu/api/v1/auth/google/";
							}}
						>
							<img src={Googl} alt="google" />
						</button>
						{/* <button className={s.socialBtn}>
                  <img src={Apl} alt="apple" />
                </button> */}
					</div>
				</div>

				<div className={s.footerText}>
					Not register yet ?{" "}
					<a
						href="#"
						onClick={() => {
							navigate("/registration");
						}}
					>
						Create Account
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
