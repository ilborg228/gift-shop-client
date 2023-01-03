import ProductCard from "../components/ProductCard";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {IProduct} from "../types/types";
import Pagination from "../components/Pagination";
import {host} from "../constants/constants";

interface ProductListProps{
    categoryId: number,
    categoryName: string
}

const ProductList: React.FC<ProductListProps> = ({categoryId, categoryName}) => {

    const [page, setPage] = useState<number>(0)
    const [products, setProducts] = useState<IProduct[]>([])

    async function fetchProducts() {
        try {
            const response = await axios
                .get<IProduct[]>(host + "/categories/"+categoryId+"/products", {
                    params:{
                        "order_by":"ID",
                        "page": page
                    }})
            setProducts(response.data)
        }catch (e) {
            alert(e)
        }
    }

    useEffect(()=> {
        fetchProducts()
    },[page])

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">{categoryName}</h1>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard product={product}/>
                    ))}
                </div>
            </div>
            <Pagination  page={page} setPage={setPage}/>
        </div>
    )
}

export default ProductList