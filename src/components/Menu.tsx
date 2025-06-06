import React, { useEffect, useRef, useState } from "react";
import styles from "./Menu.module.scss";

interface MenuProps {
  categories: Array<{ id: number; name: string }>;
  onMenuClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ categories, onMenuClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.name || null
  );
  const menuRef = useRef<HTMLUListElement>(null);
  const isScrolling = useRef(false); // Флаг для отслеживания состояния скролла

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return; // Игнорируем скролл, если он вызван нашим кодом

      const middleOfScreen = window.innerHeight / 2;

      categories.forEach((category) => {
        const element = document.getElementById(category.name);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < middleOfScreen && rect.bottom > middleOfScreen) {
            setActiveCategory(category.name);
          }
        }
      });

      setIsCollapsed(window.scrollY > 220);
    };

    const mainContainer = document.querySelector(".main_container");
    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [categories]);

  useEffect(() => {
    const scrollToActiveCategory = () => {
      const menuElement = menuRef.current;
      const activeElement = menuElement?.querySelector(`.${styles.active}`);

      if (activeElement && menuElement) {
        const activeOffsetLeft = (activeElement as any).offsetLeft;
        const activeWidth = (activeElement as any).offsetWidth;
        const menuScrollLeft = menuElement.scrollLeft;
        const menuWidth = menuElement.clientWidth;

        // Если активный элемент выходит за левую границу
        if (activeOffsetLeft < menuScrollLeft) {
          menuElement.scrollTo({
            left: activeOffsetLeft - 20,
            behavior: "smooth",
          });
        }
        // Если активный элемент выходит за правую границу
        else if (activeOffsetLeft + activeWidth > menuScrollLeft + menuWidth) {
          const scrollTo = activeOffsetLeft + activeWidth - menuWidth + 20;
          menuElement.scrollTo({
            left: scrollTo,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToActiveCategory();
  }, [activeCategory]);

  const handleClick = (categoryName: string, e: React.MouseEvent) => {
    e.preventDefault(); // Полностью отключаем стандартное поведение якорной ссылки

    if (isScrolling.current) return; // Игнорируем клик, если скролл уже выполняется

    const element = document.getElementById(categoryName);
    if (element) {
      const con = document.querySelector(".main_container");
      const headerOffset = document.querySelector("header")?.offsetHeight || 0;
      const y =
        element.getBoundingClientRect().top + window.scrollY - headerOffset;

      if (con) {
        isScrolling.current = true; // Устанавливаем флаг скролла
        con.scrollTo({ top: y, behavior: "smooth" });

        // Сбрасываем флаг скролла после завершения анимации
        setTimeout(() => {
          isScrolling.current = false;
        }, 500); // 500ms - примерное время анимации скролла
      }

      setActiveCategory(categoryName);
      onMenuClick();
    }
  };

  return (
    <div
      className={`${styles.menu} ${isCollapsed ? styles.collapsed : ""}`}
      ref={menuRef as any}
    >
      <h1 className={styles.categories_h1}>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.name}
            className={activeCategory === category.name ? styles.active : ""}
            onClick={(e) => handleClick(category.name, e)}
          >
            <a href={`#${category.name}`} onClick={(e) => e.preventDefault()}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
