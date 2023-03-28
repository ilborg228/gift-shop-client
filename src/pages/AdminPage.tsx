import React, {useState} from 'react';
import ProductAdd from "../components/ProductAdd";
import CategoryAdd from "../components/CategoryAdd";
import ImageAdd from "../components/ProductImageAdd";

enum State {
    PRODUCT_ADD, PRODUCT_IMAGE_ADD, CATEGORY_ADD
}
const AdminPage = () => {

    const [state, setState] = useState<State>(State.PRODUCT_ADD)

    function getForm() {
        if (state == State.PRODUCT_ADD) {
            return <ProductAdd/>
        } else if (state == State.PRODUCT_IMAGE_ADD) {
            return <ImageAdd/>
        } else if (state == State.CATEGORY_ADD) {
            return <CategoryAdd/>
        }
    }

    return (
        <div>
            <button
                onClick = {() => {
                    setState(State.PRODUCT_ADD)
                }}
                type="submit"
                className="m-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Добавить товар
            </button>
            <button
                onClick = {() => {
                    setState(State.PRODUCT_IMAGE_ADD)
                }}
                type="submit"
                className="m-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Добавить картинку для товара
            </button>
            <button
                onClick = {() => {
                    setState(State.CATEGORY_ADD)
                }}
                type="submit"
                className="m-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Добавить категорию
            </button>
            {getForm()}
        </div>
    );
};

export default AdminPage;