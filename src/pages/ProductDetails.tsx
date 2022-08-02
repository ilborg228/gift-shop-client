import React, {useEffect, useState} from 'react';
import {IProduct, IProductDetails} from "../types/types";
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
        imgSource: "https://sun9-25.userapi.com/impg/QMxCirEPwpaa940l5l5ARcJj3wY4o2POyP2ntQ/8tg4qTsix7o.jpg?size=1440x1920&quality=95&sign=82ff8ac0bd798ad8db4a990ca07b913b&type=album",
        name: "Lorem ipsum",
        price: 0
    })
    const reviews = {average: 4, totalCount: 117}

    useEffect(()=> {
        //fetchProducts()
    },[])

    async function fetchProducts() {
        try {
            const response = await axios.get<IProductDetails>(host + "/product/"+id)
            setProduct(response.data)
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
                <img
                    src={product.imgSource}
                    className="w-64 md:w-auto rounded-3xl"
                    alt=""
                />
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