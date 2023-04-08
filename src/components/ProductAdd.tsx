import React, {useEffect, useState} from 'react';
import {addProduct, fetchAllCategories, fetchCategories} from "../utils/api";
import {ICategory} from "../utils/types";

const ProductAdd = () => {

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [categoryId, setCategoryId] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(()=> {
        fetchAllCategories(setCategories).then(()=>console.log(categories))
    },[])

    const options = categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.categoryName}
        </option>))

    return (
        <div>

            <div className="m-5 md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Название товара
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                onChange={(event)=>setName(event.target.value)}
                                                type="text"
                                                name="company-website"
                                                id="company-website"
                                                className="block w-full flex-1 rounded-l-md rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Цена
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-xl text-gray-500">
                                          ₽
                                        </span>
                                            <input
                                                onChange={(event)=>setPrice(event.target.value)}
                                                type="text"
                                                name="company-website"
                                                id="company-website"
                                                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Описание
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                          onChange={(event)=>setDescription(event.target.value)}
                                          id="about"
                                          name="about"
                                          rows={3}
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          placeholder=""
                                          defaultValue={''}
                                      />
                                    </div>
                                </div>

                                <label>
                                    Название категории
                                        <select value={categoryId}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(e) => setCategoryId(parseInt(e.target.value))}>
                                            <option value={0}>Выберите категорию</option>
                                            {options}
                                        </select>
                                </label>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    onClick={event=>{event.preventDefault(); addProduct(name, description, price, categoryId)}}
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;