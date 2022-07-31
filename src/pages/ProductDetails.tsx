import React, {useEffect, useState} from 'react';
import {IProduct, IProductDetails} from "../types/types";
import axios from "axios";
import {host} from "../constants/constants";
import {useParams} from "react-router-dom";

interface ProductDetailsProps {

}

const ProductDetails: React.FC<ProductDetailsProps> = () => {

    const {id} = useParams()
    const [product, setProduct] = useState<IProductDetails>({
        categoryId: 0,
        description: "",
        height: 0,
        id: 0,
        imgSource: "",
        name: "",
        price: 0
    })

    useEffect(()=> {
        fetchProducts()
    },[])

    async function fetchProducts() {
        try {
            const response = await axios.get<IProductDetails>(host + "/product/"+id)
            setProduct(response.data)
        }catch (e) {
            alert(e)
        }
    }

    return (
        <div>

        </div>
    );
};

export default ProductDetails;