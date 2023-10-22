import React from 'react'
import ProductsContainer from '../components/ProductsContainer'
import ItStarted from '../components/ItStarted'
import MainImages from '../components/MainImage'
import Advantages from '../components/AdvantagesSection/index'


export default function HomePage() {


    return (
        <>
            <MainImages/>
            <Advantages/>
            <ProductsContainer/>
            <ItStarted/>
        </>
    )
}
