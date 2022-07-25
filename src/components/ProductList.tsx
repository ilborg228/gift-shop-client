import Product from "./Product";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {host} from "../index";
import {IProduct} from "../types/types";
import Pagination from "./Pagination";

interface ProductListProps{

}

const ProductList: React.FC<ProductListProps> = () => {

    let page: number = 0

    const [products, setProducts] = useState<IProduct[]>([])

    async function fetchProducts() {
        try {
            const response = await axios
                .get<IProduct[]>(host + "/categories/1/products", {
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
    },[])

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <Product product={product}/>
                    ))}
                </div>
            </div>
            <Pagination/>
        </div>
    )
}

export default ProductList