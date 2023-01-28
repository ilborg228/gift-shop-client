import ProductCard from "../components/ProductCard";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {IProduct, IProductList} from "../types/types";
import Pagination from "../components/Pagination";
import {host} from "../constants/constants";
import {useNavigate, useParams} from "react-router-dom";

interface ProductListProps{
}

const ProductList: React.FC<ProductListProps> = ({}) => {

    const {id} = useParams()
    const navigate = useNavigate()


    const pageSize = 16
    const [page, setPage] = useState<number>(0)

    const [countProducts, setCountProducts] = useState<number>(0)
    const [products, setProducts] = useState<IProduct[]>([])
    const [categoryName, setCategoryName] = useState<string>()

    async function fetchProducts() {
        try {
            const response = await axios
                .get<IProductList>(host + "/categories/"+id+"/products", {
                    params:{
                        "order_by":"ID",
                        "page": page,
                        "page_size": pageSize
                    }})
            setProducts(response.data.products)
            setCountProducts(response.data.count)
            setCategoryName(response.data.categoryName)
        } catch (ex) {
            alert(ex)
        }
    }

    function canIncrementPage(): boolean {
        return countProducts>pageSize*(page+1)
    }

    useEffect(()=> {
        fetchProducts()
    },[page])

    return (
        <div className="bg-white">
            <div className="max-w-2xl my-6 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="mb-5 text-center text-5xl font-bold tracking-tight text-gray-900">{categoryName}</h1>
                <button className='text-blue-400 text-left text-xl ml-6' onClick={() => navigate(-1)}>&lt;Назад</button>
                <hr className="m-5"/>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard product={product}/>
                    ))}
                </div>
            </div>
            <Pagination canIncrementPage={canIncrementPage()}  page={page} setPage={setPage}/>
        </div>
    )
}

export default ProductList