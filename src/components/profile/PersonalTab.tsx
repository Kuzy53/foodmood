import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import s from './PersonalTab.module.scss';


const PersonalTab: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(user?.photo || null);
    const [fullName, setFullName] = useState(user ? `${user.name} ${user.surname}` : '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');

    // Обработчик загрузки изображения
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setAvatarFile(file);

        // Создаем предпросмотр загруженного изображения
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь можно добавить логику сохранения данных
        console.log('Сохранение данных:', { fullName, email, phone, avatarFile });
    };

    return (
        <div className={s.personalTab}>
            <form onSubmit={handleSubmit}>
                {/* Блок аватара с загрузкой изображения */}
                <div className={s.avatarSection}>
                    <div className={s.avatarWrapper}>
                        {previewImage ? (
                            <img src={previewImage} alt="Аватар пользователя" className={s.avatar} />
                        ) : (
                            <div className={s.avatarPlaceholder}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : ''}
                            </div>
                        )}
                    </div>

                    <div className={s.fileInputWrapper}>
                        <label htmlFor="avatarUpload" className={s.fileInputLabel}>
                            Upload photo
                        </label>
                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className={s.fileInput}
                        />
                    </div>
                </div>

                {/* Поля формы */}
                <div className={s.formField}>
                    <label htmlFor="fullName" className={s.label}>Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        className={s.input}
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className={s.formField}>
                    <label htmlFor="email" className={s.label}>E-mail</label>
                    <input
                        id="email"
                        type="email"
                        className={s.input}
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={`${s.formField} ${s.lastField}`}>
                    <label htmlFor="phone" className={s.label}>Phone number</label>
                    <input
                        id="phone"
                        type="tel"
                        pattern="\d*"
                        className={s.input}
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className={s.formActions}>
                    <button type="submit" className={s.submitButton}>
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalTab; 