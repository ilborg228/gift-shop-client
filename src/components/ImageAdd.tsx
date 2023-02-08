import React from 'react';
import {addProduct} from "../utils/api";
import ImageInput from "./ImageInput";

const ImageAdd = () => {
    return (
        <div>
            <div className="m-5 md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                <ImageInput/>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        onClick={event=>{event.preventDefault(); }}
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ImageAdd;