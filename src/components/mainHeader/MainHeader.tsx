import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import s from "./MainHeader.module.scss";
import Logo from "/Logo.svg";
import LogoText from "/LogoText.svg";
import ArrowDown from "/ArrowDown.svg";
import Logout from "/logout.svg";
import { clearUser } from "../../app/slices/authSlice";
import ProfileModal from "../profile/ProfileModal";

const MainHeader: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.auth.user);
	const [opened, setOpened] = useState(false);
	const [profileModalOpened, setProfileModalOpened] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	console.log(user);

	const handleLogout = () => {
		dispatch(clearUser());
		navigate("/login");
	};

	const openProfileModal = () => {
		setOpened(false);
		setProfileModalOpened(true);
	};

	const handleProfileClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		openProfileModal();
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpened(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<section className={s.MainHeader}>
			{/* Логотип */}
			<div className={s.logo}>
				<img src={Logo} alt="Logo" />
				<img src={LogoText} alt="LogoText" />
			</div>

			{/* Поиск */}
			<div className={s.search}>
				<input
					type="text"
					disabled
					placeholder="Search"
					style={{
						backgroundImage: "url(/Search.svg)",
						backgroundRepeat: "no-repeat",
						paddingLeft: "30px",
						backgroundPosition: "left 10px center",
						cursor: "pointer",
					}}
				/>
			</div>

			{user ? (
				<div className={s.profile_container} ref={menuRef} onClick={() => setOpened((o) => !o)}>
					<div className={s.avatar + ""}>{user.photo ? <img src={user.photo} alt="User" /> : user.name.charAt(0).toUpperCase()}</div>
					<div className={s.arrow}>
						<img
							src={ArrowDown}
							alt="ArrowDown"
							style={{
								transform: opened ? "rotate(180deg)" : "rotate(0deg)",
							}}
						/>
					</div>

					<div className={`${s.menu} ${opened ? s.open : ""}`}>
						<div className={s.menu__wrapper}>
							<div className={s.item + " " + s.profile} onClick={handleProfileClick}>
								<div className={s.avatar}>{user.photo ? <img src={user.photo} alt="User" /> : user.name.charAt(0).toUpperCase()}</div>

								<div className={s.profile__info}>
									<div className={s.label}>Profile</div>
									<div className={s.text}>
										{user.name} {user.surname}
									</div>
								</div>
								<div className={s.arrow}>
									<img src={ArrowDown} alt="ArrowRight" />
								</div>
							</div>
							<div className={s.item + " " + s.language}>
								<div className={s.language__info}>
									<div className={s.label}>Language</div>
									<div className={s.text}>English</div>
								</div>
								<div className={s.arrow}>
									<img src={ArrowDown} alt="ArrowDown" />
								</div>
							</div>
							<div className={s.item + " " + s.logout} onClick={handleLogout}>
								<img src={Logout} alt="Logout" />
								<div className={s.text}>Log out</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Button color="#97cf60" onClick={() => navigate("/login")}>
					Login
				</Button>
			)}

			{user && <ProfileModal opened={profileModalOpened} onClose={() => setProfileModalOpened(false)} />}
		</section>
	);
};

export default MainHeader;
