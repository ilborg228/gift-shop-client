import React, {useEffect, useState} from 'react';
import {ICategory} from "../utils/types";
import CategoryCard from "../components/ui/CategoryCard";
import {useNavigate, useParams} from "react-router-dom";
import {fetchCategories, fetchCategory} from "../utils/api";


const StorePage = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [parentCategory, setParentCategory] = useState<ICategory>()

    useEffect(()=> {
        reload()
    },[id])
    useEffect(() => {
        fetchCategory(id, setParentCategory)
    }, [id])

    function reload() {
        fetchCategories(id, setCategories)
    }

    return (
        <div>
            <div className="max-w-2xl my-6 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="mb-5 text-center text-5xl font-bold tracking-tight text-gray-900">
                    {id === undefined ? 'Все категории:' : parentCategory?.categoryName}
                </h1>
                <button className='text-blue-400 text-left text-xl ml-6' onClick={() => navigate(-1)}>&lt;Назад</button>
                <hr className="m-5"/>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {categories.map((category) => (
                        <CategoryCard category={category} reload={reload}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StorePage;