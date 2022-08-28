import React, {useEffect, useState} from 'react';
import {IImage, IProductDetails} from "../types/types";
import axios from "axios";
import {host} from "../constants/constants";
import {useParams} from "react-router-dom";
import {StarIcon} from "@heroicons/react/solid";

interface ProductDetailsProps {

}

const ProductDetails: React.FC<ProductDetailsProps> = () => {

    const {id} = useParams()
    const [product, setProduct] = useState<IProductDetails>({
        categoryId: 0,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi asperiores cum debitis dolor, dolorem doloremque eum explicabo facilis id ipsum molestiae, nam odio optio quam reiciendis soluta vero voluptatibus?",
        height: 0,
        id: 0,
        name: "Lorem ipsum",
        price: 0,
        images: []
    })
    const reviews = {average: 4, totalCount: 117}

    useEffect(()=> {
        fetchProductDetails()

    },[])

    async function fetchProductDetails() {
        try {
            const response = await axios.get<IProductDetails>(host + "/product/"+id)
            setProduct(response.data)
        }catch (e) {
            alert(e)
        }
    }

    async function fetchProductImages() {
        try {
            const response = await axios.get<IImage[]>(host + "/product/"+id)
            product.images = response.data
        }catch (e) {
            alert(e)
        }
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="flex flex-row mx-20 my-10">
            <div className="basis-1/2">
                <div id="carouselExampleIndicators" className="carousel slide relative" data-bs-ride="carousel">
                    <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner relative w-full overflow-hidden">
                        <div className="carousel-item active float-left w-full">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                                className="block w-full"
                                alt="Wild Landscape"
                            />
                        </div>
                        <div className="carousel-item float-left w-full">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                                className="block w-full"
                                alt="Camera"
                            />
                        </div>
                        <div className="carousel-item float-left w-full">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                                className="block w-full"
                                alt="Exotic Fruits"
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon inline-block bg-no-repeat"
                              aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon inline-block bg-no-repeat"
                              aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="basis-1/2  mx-20 ">
                <div className="flex flex-row flex-wrap justify-between">
                    <h1 className="text-3xl text-gray-700">{product.name}</h1>
                    <h3 className="text-2xl text-gray-700">{product.price} ₽</h3>
                </div>
                {/* Reviews */}
                <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                        <a href={"#"} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {reviews.totalCount} reviews
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;