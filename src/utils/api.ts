import axios, {AxiosError} from "axios";
import {ICategory, IComment, IError, IOrder, IProduct, IProductDetails, IProductList} from "./types";
import {auth_host, host} from "./constants";
import {Dispatch, SetStateAction} from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export async function fetchOrders(userId: number, setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    await axios
        .get<IOrder>(host + "/orders?userId=" + userId)
        .then((response) => {
            setOrder(response.data)
        }).catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function removeFromOrder(productId: number, order: IOrder,
                                      setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    await axios
        .delete<IOrder>(host + "/orders/" + order?.id + "/products/" + productId)
        .then((response) => setOrder(response.data))
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function submitOrder(id: number | undefined, address: string, userId: number,
                                  setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    const data = {
        id: id,
        address: address
    }

    await axios
        .post(host + "/orders/submit", data)
        .then(()=> {
            fetchOrders(userId, setOrder)
            alert('Ваш заказ отпрвлен, а корзина очищена')
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchProductList(id: string | undefined, page: number, pageSize: number,
                                       setProducts: Dispatch<SetStateAction<IProduct[]>>,
                                       setCountProducts: Dispatch<SetStateAction<number>>,
                                       setCategoryName: Dispatch<SetStateAction<string | undefined>>) {
    await axios
        .get<IProductList>(host + "/categories/"+id+"/products", {
            params:{
                "order_by":"ID",
                "page": page,
                "page_size": pageSize
            }
        }).then((response)=>{
            setProducts(response.data.products)
            setCountProducts(response.data.count)
            setCategoryName(response.data.categoryName)
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchProductDetails(id: string | undefined,
                                          setProduct: Dispatch<SetStateAction<IProductDetails | undefined>>) {
    await axios
        .get<IProductDetails>(host + "/products/" + id)
        .then((response)=>setProduct(response.data))
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchComments(id: string | undefined, setComments: Dispatch<SetStateAction<IComment[]>>) {
    await axios
        .get<IComment[]>(host + "/products/" + id + "/comments")
        .then((response)=> {
            setComments(response.data)
            console.log(response.data)
        }).catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function addToCart(userId: number, id: string | undefined) {
    const data = {
        userId: userId,
        products: [
            {
                id: id
            }
        ]
    }

    await axios
        .post(host + "/orders", data)
        .then(()=>alert('Товар добавлен в корзину'))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function registration(email: string, password: string, setUserId: (userId: number) => void) {
    await axios.post(auth_host + "/auth/token", {
        username: email,
        password: password,
        grantType: 'registration'
    }).then(res => {
        alert('Вы успешно зарегистрировались')
        cookies.set("userId", res.data.id, { path: '/' })
        setUserId(res.data.id)
    }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function login(email: string, password: string, setUserId: (userId: number) => void) {
    await axios
        .post(auth_host + "/auth/token", {
            username: email,
            password: password,
            grantType: 'login'
        }).then(res => {
            alert('Вы успешно вошли в свой аккаунт')
            cookies.set("userId", res.data.id, { path: '/' })
            setUserId(res.data.id)
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchCategories(id: string | undefined,
                                      setCategories: Dispatch<SetStateAction<ICategory[]>>) {
    await axios
        .get<ICategory[]>(host + "/categories", {
            params:{
                "parent_id": id,
                "page_size": 100
            }
        }).then((response) => setCategories(response.data))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchCategory(id: string | undefined,
                                      setCategory: Dispatch<SetStateAction<ICategory | undefined>>) {
    if (id === undefined) return
    await axios
        .get<ICategory>(host + "/categories/" + id)
        .then((response) => setCategory(response.data))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchProducts(setProducts: (value: (((prevState: IProduct[]) => IProduct[]) | IProduct[])) => void) {
        await axios
            .get<IProduct[]>(host + "/products")
            .then((response) => setProducts(response.data))
            .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}