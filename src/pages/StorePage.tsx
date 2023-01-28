import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ICategory} from "../types/types";
import {host} from "../constants/constants";
import CategoryCard from "../components/CategoryCard";
import {useNavigate, useParams} from "react-router-dom";


const StorePage = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [categories, setCategories] = useState<ICategory[]>([])

    async function fetchCategories() {
        try {
            await axios
                .get<ICategory[]>(host + "/categories", {
                    params:{
                        "parent_id": id,
                        "page_size": 100
                    }
                }).then((response)=>setCategories(response.data))
        } catch (ex) {
            alert(ex)
        }
    }
    useEffect(()=> {
        fetchCategories()
    },[id])

    return (
        <div>
            <div className="max-w-2xl my-6 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="mb-5 text-center text-5xl font-bold tracking-tight text-gray-900">Все категории:</h1>
                <button className='text-blue-400 text-left text-xl ml-6' onClick={() => navigate(-1)}>&lt;Назад</button>
                <hr className="m-5"/>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {categories.map((category) => (
                        <CategoryCard category={category}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StorePage;