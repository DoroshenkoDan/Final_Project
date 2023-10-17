import React from "react";
import styles from "../AllProductsPage/AllProductsPage.module.scss";
import logoHeader from '../../components/AllProductsContainer/img/AllProducts.png'
import AllProductsContainer from "../../components/AllProductsContainer";
import FilterProductContainer from "../../components/AllProductsContainer/FilterProductContainer";

export default function AllProductsPage() {
   return (
      <>
         <img
            style={{ width: "100%", height: "209px" }}
            className="header__logo"
            src={logoHeader}
            alt="AllProducts"
         />
         <div className={styles["products-container"]}>
            <FilterProductContainer/>
            <AllProductsContainer/>
         </div>
      </>
   )
}

