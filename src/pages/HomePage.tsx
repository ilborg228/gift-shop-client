import React, {useEffect, useState} from 'react';
import ImageSlider from "../components/ImageSlider";
import {IProduct} from "../types/types";
import axios from "axios";
import {host} from "../constants/constants";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

    const [products, setProducts] = useState<IProduct[]>([])

    async function fetchProducts() {
        try {
            const response = await axios
                .get<IProduct[]>(host + "/products")
            setProducts(response.data)
        }catch (e) {
            alert(e)
        }
    }

    useEffect(()=> {
        fetchProducts()
    },[])

    return (
        <div>
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Добро пожаловать в наш магазин!</h1>
            <ImageSlider/>
            <div className="mx-36">
                <h1 className="mt-6 text-left text-3xl font-bold tracking-tight text-gray-900">Мы рекомендуем:</h1>
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;