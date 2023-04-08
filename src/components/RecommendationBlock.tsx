import React, {useEffect, useState} from 'react';
import ProductCard from "./ui/ProductCard";
import {IProduct} from "../utils/types";
import {fetchProducts} from "../utils/api";

const RecommendationBlock = () => {

    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(()=> {
        reload()
    },[])

    function reload() {
        fetchProducts(setProducts)
    }

    return (
        <div className="mx-36">
            <h1 className="mt-6 text-left text-3xl font-bold tracking-tight text-gray-900">Мы рекомендуем:</h1>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                {products.map((product) => (
                    <ProductCard product={product} reload={reload}/>
                ))}
            </div>
        </div>
    );
};

export default RecommendationBlock;