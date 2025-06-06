//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDishesQuery } from "../app/api/dishesApi";
import styles from "./Header.module.scss";
import Map from "/Map.svg";

const MAX_DESCRIPTION_LENGTH_DESKTOP = 120; // Максимальное количество символов для десктопа
const MAX_DESCRIPTION_LENGTH_MOBILE = 90; // Максимальное количество символов для телефона

interface HeadersProps {
  openingTime: string;
  closingTime: string;
  name: string;
  avgCookingTime: string;
  description: string;
}

const Header: React.FC<HeadersProps> = ({
  openingTime,
  closingTime,
  name,
  avgCookingTime,
  description,
}) => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [maxDescriptionLength, setMaxDescriptionLength] = useState(
    MAX_DESCRIPTION_LENGTH_DESKTOP
  ); // Устанавливаем начальное значение для десктопа
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data, error, isLoading } = useGetDishesQuery(restaurantId);
  const [photo, setPhoto] = useState("");
  const [descriptionText, setDescriptionText] = useState();
  // console.log(descriptionText)

  // Обрезанный текст для показа по умолчанию

  useEffect(() => {
    setDescriptionText(data?.payload?.restaurant?.description);
    setPhoto(data?.payload?.restaurant?.photo);
  }, [data]);

  const truncatedDescription =
    descriptionText?.length > maxDescriptionLength
      ? descriptionText.slice(0, maxDescriptionLength)
      : descriptionText;

  //   console.log(data?.payload?.restaurant?.workingHours[0]?.startTime)
  //   console.log(closingTime)

  //   useLayoutEffect(() => {
  //   // Определяем количество символов в зависимости от ширины экрана
  //   const updateMaxDescriptionLength = () => {
  //     if (window.innerWidth < 768) { // Ширина для мобильных устройств
  //       setMaxDescriptionLength(MAX_DESCRIPTION_LENGTH_MOBILE);
  //     } else { // Для десктопов
  //       setMaxDescriptionLength(MAX_DESCRIPTION_LENGTH_DESKTOP);
  //     }
  //   };

  //   // При монтировании компонента устанавливаем длину текста
  //   updateMaxDescriptionLength();

  //   // Добавляем обработчик изменения размера экрана
  //   window.addEventListener('resize', updateMaxDescriptionLength);

  //   return () => {
  //     window.removeEventListener('resize', updateMaxDescriptionLength);
  //   };
  // }, []);

  // useLayoutEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 220) {
  //       setIsCollapsed(true);
  //     } else {
  //       setIsCollapsed(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const toggleDescription = () => {
  //   setIsDescriptionExpanded(!isDescriptionExpanded);
  // };

  function formatTime(dateString: string | number | Date) {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? " PM" : " AM";

    hours = hours % 12 || 12;

    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

    return dateString ? `${hours}:${minutesFormatted}${ampm}` : null;
  }

  const formattedOpeningTime = formatTime(
    data?.payload?.restaurant?.workingHours[0]?.startTime
  );
  const formattedClosingTime = formatTime(
    data?.payload?.restaurant?.workingHours[0]?.endTime
  );

  const [size, setSize] = useState("");

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1185 && window.innerWidth < 1440) {
      setSize(window.innerWidth - 612);
    } else {
      setSize(false);
    }
  });

  useEffect(() => {
    if (window.innerWidth > 1185 && window.innerWidth < 1440) {
      setSize(window.innerWidth - 612);
    } else {
      setSize(false);
    }
  }, []);

  return (
    <header
      className={`${styles.header}`}
      // style={photo ? {backgroundImage: `url(${photo})`} : {backgroundImage: ''}}>
      style={{ width: size ? size : "", backgroundImage: `url(${photo})` }}
    >
      <h1>{data?.payload?.restaurant?.name}</h1>
      {/* {!isCollapsed && ( */}
      <div className={styles.header__details}>
        {/* <div className={styles.header__details__item}>
            <img src={Star} alt="Star" />
            <h2>4.5</h2>
          </div> */}
        <div className={styles.header__details__item}>
          <img src={Map} alt="" />
          <h2>{data?.payload?.restaurant?.address}</h2>
        </div>
        <div className={styles.header__details__item}>
          <h2>
            Takeaway from {formattedOpeningTime}{" "}
            {formattedOpeningTime ? "-" : ""} {formattedClosingTime}
          </h2>
        </div>
      </div>
      {/* )} */}
      {/* {!isCollapsed && ( */}
      {/* <div className={styles.descriptionContainer}>
          <p className={isDescriptionExpanded ? styles.expanded : styles.collapsed}>
            {isDescriptionExpanded ? descriptionText : truncatedDescription}
            {!isDescriptionExpanded && descriptionText?.length > maxDescriptionLength && (
              <span className={styles.expandLink} onClick={toggleDescription}>... All description</span>
            )}
                      {isDescriptionExpanded && (
            <button className={styles.collapseButton} onClick={toggleDescription}>Collapse description</button>
          )}
          </p>

        </div> */}
      {/* )} */}
    </header>
  );
};

export default Header;
