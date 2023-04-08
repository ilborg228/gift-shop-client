import ProductCard from "../components/ui/ProductCard";
import React, {useEffect, useState} from "react";
import {IProduct} from "../utils/types";
import Pagination from "../components/ui/Pagination";
import {useNavigate, useParams} from "react-router-dom";
import {fetchProductList} from "../utils/api";

interface ProductListProps{
}

const ProductList: React.FC<ProductListProps> = ({}) => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [orderBy, setOrderBy] = useState<string>("ID")
    const [orderByType, setOrderByType] = useState<string>("ASC")

    const pageSize = 16
    const [page, setPage] = useState<number>(0)

    const [countProducts, setCountProducts] = useState<number>(0)
    const [products, setProducts] = useState<IProduct[]>([])
    const [categoryName, setCategoryName] = useState<string>()

    function canIncrementPage(): boolean {
        return countProducts>pageSize*(page+1)
    }

    useEffect(()=> {
        reload()
    },[page, orderBy, orderByType])

    function reload() {
        fetchProductList(id, page, pageSize, orderBy, orderByType, setProducts, setCountProducts, setCategoryName)
    }

    return (
        <div className="bg-white">
            <div className="max-w-2xl my-6 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="mb-5 text-center text-5xl font-bold tracking-tight text-gray-900">{categoryName}</h1>
                <div className="flex flex-row flex-wrap justify-between">
                    <button className='text-blue-400 text-left text-xl ml-6' onClick={() => navigate(-1)}>&lt;Назад</button>
                    <div className="flex flex-row flex-wrap justify-between">
                        <select
                            onChange={event => setOrderBy(event.target.value)}
                            className="mx-6 w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled={true} selected>Сортировка</option>
                            <option value="NAME">Имени</option>
                            <option value="PRICE">Цене</option>
                            <option value="VIEWS">Просмотрам</option>
                        </select>
                        <select
                            onChange={event => setOrderByType(event.target.value)}
                            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="ASC">Возрастанию</option>
                            <option value="DESC">Убыванию</option>
                        </select>
                    </div>
                </div>

                <hr className="m-5"/>
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard product={product} reload={reload}/>
                    ))}
                </div>
            </div>
            <Pagination canIncrementPage={canIncrementPage()}  page={page} setPage={setPage}/>
        </div>
    )
}

export default ProductList