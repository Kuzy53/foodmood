// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchDishesQuery } from "../app/api/dishesApi";
import Cart from "../components/Cart";
import Header from "../components/Header";
import MainHeader from "../components/mainHeader/MainHeader";
import Menu from "../components/Menu";
import PayModal from "../components/PayModal";
import ProductList from "../components/ProductList";
import ProductModal from "../components/ProductModal";
import PromotionsCarousel from "../components/PromotionsCarousel";
import "./MainPage.css";
import None from "/None.svg";

const MainPage: React.FC = ({
  groupedProducts,
  cartItems,
  addToCart,
  clearCart,
  data,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");

  const [payOpen, setPayOpen] = useState(false);
  const handlePaymentOpen = () => setPayOpen(true);
  const handlePaymentClose = () => setPayOpen(false);

  const [isSearchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults, isFetching } = useSearchDishesQuery(searchTerm, {
    skip: !isSearchActive || !searchTerm,
  });

  const [size, setSize] = useState<number | false>(false);
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 1185 && window.innerWidth < 1440) {
        setSize(window.innerWidth - 612);
      } else {
        setSize(false);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleSearchClick = () => setSearchActive(true);
  const handleSearchClose = () => {
    setSearchActive(false);
    setSearchTerm("");
  };
  const handleSearchInput = (value: string) => setSearchTerm(value);

  const handleSelect = (id: string) => {
    navigate(`?productId=${id}`);
  };
  const handleModalClose = () => navigate(-1);

  return (
    <>
      <div className={`app ${isSearchActive ? "reverse" : ""}`}>
        {/* <div className='app_container'> */}
        <MainHeader />
        {/* <div className={`mobile__header ${isSearchActive ? 'hidden' : ''}`}>
        <Header openingTime={data?.payload?.restaurant?.workingHours[0]?.startTime} closingTime={data?.payload?.restaurant?.workingHours[0]?.endTime} name={data?.payload?.restaurant?.name} avgCookingTime={data?.payload?.restaurant?.avgCookingTime} description={data?.payload?.restaurant?.description}/>
      </div> */}
        <div
          className={`${
            isSearchActive && window.innerWidth <= 1185 ? "hidden" : "menu__fix"
          }`}
        >
          <Menu
            categories={data?.payload.restaurant.menu.categories || []}
            onMenuClick={handleSearchClose} // Передаем функцию закрытия поиска
          />
        </div>
        <main className={`main`}>
          <div
            className={"main_container"}
            style={{
              width: size ? size : "",
            }}
          >
            <div
              className={`desctop__header ${isSearchActive ? "hidden" : ""}`}
            >
              <Header />
            </div>
            <div
              className={`category__container ${
                isSearchActive ? "hidden" : ""
              }`}
            ></div>
            <div className={`category_main`}>
              <PromotionsCarousel />
              {groupedProducts ? (
                Object.entries(groupedProducts).map(([category, products]) => (
                  <section key={category} id={category}>
                    <h2 className="category__title">{category}</h2>
                    <ProductList
                      products={products}
                      cartItems={cartItems}
                      addToCart={addToCart}
                      onSelect={handleSelect}
                    />
                  </section>
                ))
              ) : (
                <>
                  <div className="cart__none">
                    <img src={None} alt="None" />
                    <p className="empty">There are no dishes here yet</p>
                  </div>
                </>
              )}
            </div>
            {isSearchActive && searchTerm && (
              <div className="search-results">
                {isFetching ? (
                  <div className="result__null">
                    <p>Loading...</p>
                  </div>
                ) : searchResults === null ? (
                  <div className="result__null">
                    <img src={None} alt="None" />
                    <p>Oops, nothing found</p>
                  </div>
                ) : (
                  searchResults?.map(({ name, items }) => (
                    <section key={name} id={name}>
                      <h2 className="category__title">{name}</h2>
                      <ProductList
                        products={items}
                        cartItems={cartItems}
                        addToCart={addToCart}
                        onSelect={handleSelect}
                      />
                    </section>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
        <Cart
          cartItems={cartItems}
          updateCartItem={addToCart}
          clearCart={clearCart}
          onSearchClick={handleSearchClick}
          onSearchClose={handleSearchClose}
          isSearchActive={isSearchActive}
          onSearchInput={handleSearchInput}
          onPaymentOpen={handlePaymentOpen}
        />

        {productId && (
          <ProductModal
            dishId={productId}
            isOpen={true}
            onClose={handleModalClose}
            addToCart={addToCart}
          />
        )}

        <PayModal
          isOpen={payOpen}
          onClose={handlePaymentClose}
          cartItems={cartItems}
          updateCartItem={addToCart}
          address={data?.payload?.restaurant.address}
        />
      </div>
    </>
  );
};

export default MainPage;
