import React, {useContext} from 'react';
import {IProduct} from "../types/types";
import {AuthContext} from "../context";

interface ProductCardProps{
    product:IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {

    const {userId} = useContext(AuthContext)
    console.log(userId)

    return (
        <div>
            <a key={product.id} href={'/products/'+product.id} className="group" onClick={()=>{}}>
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} ₽</p>
            </a>
        </div>
    );
};

export default ProductCard;