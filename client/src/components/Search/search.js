import React, { useRef, useState } from "react";
import "./search.scss"
import axios from "axios";
import { HOST } from "../Token";

const DEBOUNCE_THRESHOLD = 500;

export default function Search() {
    // const [searchListStatus, setSearchListStatus] = useState(false)
    const [searchList, setSearchList] = useState([])
    async function sendSearchRequest(query) {
        const searchPhrases = {
            query: query,
        }

        axios
            .post(HOST + "/products/search", searchPhrases)
            .then((response) => {
                setSearchList(response.data)
                console.log("SearchResponse", searchList);
            })
            .catch((err) => {
                console.log('Create request', err)
            })
    }


    const timeoutHandler = useRef(null);

    const handleChange = (event) => {
        if (timeoutHandler.current) {
            clearTimeout(timeoutHandler.current);
        }
        timeoutHandler.current = setTimeout(() => {
            if (event.target.value === "") {
                setSearchList([])
                console.log("empty", event.target.value);
            } else {
                sendSearchRequest(event.target.value)
                console.log(event.target.value);
            }

        }, DEBOUNCE_THRESHOLD);
    };

    return (
        <form className="search-container">
            <input id="search-box" className="search-box" onChange={handleChange} />
            <div className="search-list-container">
                {searchList.map((e) => {
                    return <div className="search-result-item" key={e.id}>
                        <img src={e.imageUrls} />
                        <div className="search-item-description-container">
                            <p>{e.name}</p>
                            <p>{e.currentPrice}$</p>
                        </div>
                    </div>

                })}
            </div>
        </form>
    )

}