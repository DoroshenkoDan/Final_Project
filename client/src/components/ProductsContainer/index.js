import React, { useEffect, useState } from "react";
import styles from "./ProductsContainer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/reducers/productsReducers";
import PropTypes from "prop-types";

export default function ProductsContainer({ category, id }) {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.products.data);
    const catalog = useSelector((state) => state.catalog.data);
    const [productsContainerArray, setProductsContainerArray] = useState([]);

    const [propsStatus, setPropsStatus] = useState(false)

    function getProducts() {
        dispatch(fetchProducts());
    }
    useEffect(() => {
        getProducts();
        if (category) {
            setPropsStatus(true)
        } else {
            setPropsStatus(false)
        }
    }, []);


    if (propsStatus) {
        useEffect(() => {
            findCeramicsObjects(list, category, id)
            console.log("id");
        }, [list]);

        function findCeramicsObjects(data, categories, idToExclude) {
            const ceramicsObjects = data.filter(item => item.categories === categories && item.id !== idToExclude);
            if (ceramicsObjects.length <= 4) {
                return ceramicsObjects;
            }
            const randomIndexes = [];
            while (randomIndexes.length < 4) {
                const randomIndex = Math.floor(Math.random() * ceramicsObjects.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            setProductsContainerArray([...randomIndexes.map(index => ceramicsObjects[index])]);
        }


    } else {
        useEffect(() => {
            getRandomObjects(list, productsContainerArray);
        }, [list]);

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getRandomObjects(sourceArray, resultArray) {
            const sourceCopy = [...sourceArray];
            while (resultArray.length < 4 && sourceCopy.length > 0) {
                const randomIndex = getRandomInt(0, sourceCopy.length - 1);
                const randomObject = sourceCopy[randomIndex];

                if (!resultArray.some((item) => item.categories === randomObject.categories)) {
                    resultArray.push(randomObject);
                }

                sourceCopy.splice(randomIndex, 1);
            }

            setProductsContainerArray([...resultArray]);
        }
    }



    function isLink(str) {
        return str.startsWith("http://") || str.startsWith("https://");
    }

    return (<>

        <div className={styles["products-container-container"]}>
            {category ? (
                <h2 className={styles["products-container-tittle"]}>You might also like</h2>
            ) : null}
            <div className={styles["products-container"]}>
                {productsContainerArray.map((product, index) => (
                    <div className={styles["products-container-item"]} key={index}>
                        <img src={isLink(product.imageUrls) ? product.imageUrls : `${product.imageUrls}`} className={styles["products-container-item-img"]} />
                        <p className={styles["products-container-item-name"]}>{product.name}</p>
                        <p className={styles["products-container-item-price"]}>${product.currentPrice}</p>
                    </div>
                ))}
            </div>
            <button className={styles["products-container-btn"]}>View collection</button>
        </div>
    </>
    );
}


ProductsContainer.propTypes = {
    category: PropTypes.string,
    id: PropTypes.string,
};