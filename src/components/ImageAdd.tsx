import React, {useState} from 'react';
import {addProduct, fetchProductId, makePrimary, submitImage} from "../utils/api";
import ImageInput from "./ImageInput";
import Toggle from "./ui/Toggle";

const ImageAdd = () => {

    const [productId, setProductId] = useState<number>()
    const [file, setFile] = useState<File | null>()
    const [primary, setPrimary] = useState(false);
    const [name, setName] = useState('');

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

                                <ImageInput onChange={(event) => setFile(event.currentTarget.files?.item(0))}/>
                                <Toggle enabled={primary} setEnabled={setPrimary}/>
                            </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        onClick={
                                            event=>{
                                                event.preventDefault();
                                                fetchProductId(name, setProductId)
                                                if (productId) {
                                                    if (file) {
                                                        submitImage(productId, file, primary)
                                                    }
                                                }
                                            }
                                        }
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

export default ImageAdd;