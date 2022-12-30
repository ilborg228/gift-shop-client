import React, {useEffect, useState} from 'react';
import {IComment, IProductDetails} from "../types/types";
import axios from "axios";
import {host} from "../constants/constants";
import {useParams} from "react-router-dom";
import {StarIcon} from "@heroicons/react/solid";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

interface ProductDetailsProps {

}

const ProductDetails: React.FC<ProductDetailsProps> = () => {

    const {id} = useParams()
    const [product, setProduct] = useState<IProductDetails>()
    const [comments, setComments] = useState<IComment[]>([])
    const reviews = {average: 4, totalCount: 117}

    useEffect(()=> {
        fetchProductDetails()
    })
    useEffect(()=> {
        fetchComments()
    },[])

    async function fetchProductDetails() {
        try {
            await axios
                .get<IProductDetails>(host + "/products/" + id)
                .then((response)=>setProduct(response.data))
        } catch (ex) {
            alert(ex)
        }
    }

    async function fetchComments() {
        try {
            await axios
                .get<IComment[]>(host + "/products/" + id + "/comments")
                .then((response)=> {
                    setComments(response.data)
                    console.log(response.data)
                })
        } catch (ex) {
            alert(ex)
        }
    }

    async function submitComment(text: string, scoreValue: string) {
        try {
            await axios
                .post(host + "/comments",
                    {
                        text: text,
                        productId: product?.id,
                        scoreValue: scoreValue
                    })
                .then(()=>fetchComments())
        } catch (ex) {
            alert(ex)
        }
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function genImgBlock(imageUrl: string | undefined) {
        if (imageUrl !== undefined)
            return (
                <div className="basis-1/2 mx-5">
                    <img
                        src={imageUrl}
                        className="block w-full"
                        alt="primary"
                    />
                </div>
            )
    }

    return (
        <div className="flex flex-row mx-20 my-10">
            <div className="basis-1/2">
                <img
                    src={product?.imageUrl}
                    className="block w-full"
                    alt="primary"
                />
                <div className="flex flex-row my-10">
                    {genImgBlock(product?.images[0])}
                    {genImgBlock(product?.images[1])}
                </div>
            </div>
            <div className="basis-1/2  mx-20 ">
                <div className="flex flex-row flex-wrap justify-between">
                    <h1 className="text-3xl text-gray-700">{product?.name}</h1>
                    <h3 className="text-2xl text-gray-700">{product?.price} ₽</h3>
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
                        <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {reviews.totalCount} reviews
                        </p>
                    </div>
                </div>
                <hr className="mx-5 my-5"/>

                <h1 className="text-3xl text-gray-700">Описание</h1>
                <p className="my-5 text-gray-500">{product?.description}</p>

                <button
                    type="submit"
                    className="my-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Добавить в корзину
                </button>

                <h1 className="text-3xl text-gray-700 my-5">Комментарии</h1>

                <CommentForm onCreate={submitComment}/>

                {comments.length > 0 ? comments.map((comment) => (
                    <Comment comment={comment}/>
                )) : <p className="my-5 text-gray-500">На данный момент комментариев нет. Вы можете быть первым!</p>}

            </div>

        </div>
    );
};

export default ProductDetails;