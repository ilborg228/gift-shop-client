import React, {useContext} from 'react';
import {IProduct} from "../utils/types";
import {AuthContext} from "../context";
import {Link} from "react-router-dom";
import {deleteProduct} from "../utils/api";
import {ROLE_ADMIN} from "../utils/constants";

interface ProductCardProps{
    product:IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {

    const {user} = useContext(AuthContext)

    function showAdminButtons() {
        if (user !== undefined && user.role === ROLE_ADMIN)
            return(
                <button
                    disabled={false}
                    onClick={() => {
                        if (window.confirm('Вы уверены что хотите удалить товар?'))
                            deleteProduct(product.id)
                    }}
                    type="submit"
                    className="my-3 disabled:bg-indigo-100 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </button>
            )
    }

    return (
        <div>
            <Link key={product.id} to={'/products/'+product.id} className="group" onClick={()=>{}}>
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} ₽</p>
            </Link>
            {showAdminButtons()}
        </div>
    );
};

export default ProductCard;