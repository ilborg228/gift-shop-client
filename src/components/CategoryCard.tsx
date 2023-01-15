import React, {useContext} from 'react';
import {ICategory} from "../types/types";
import {AuthContext} from "../context";
import {Link} from "react-router-dom";

interface CategoryCardProps {
    category: ICategory
}

const CategoryCard: React.FC<CategoryCardProps>= ({category}) => {

    const {userId} = useContext(AuthContext)

    return (
        <div>
            <Link key={category.id} to={'/store/'+category.id} className="group" onClick={()=>{}}>
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        src={category.imageUrl}
                        alt={category.categoryName}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-2xl text-gray-700">{category.categoryName}</h3>
            </Link>
        </div>
    );
};

export default CategoryCard;