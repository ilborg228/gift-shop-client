import axios from "axios";
import {ICategory, IComment, IOrder, IProduct, IProductDetails, IProductList} from "./types";
import {auth_host, host} from "./constants";
import {Dispatch, SetStateAction, useContext} from "react";
import Cookies from "universal-cookie";
import {AuthContext} from "../context";


const cookies = new Cookies();

export async function fetchOrders(userId: number, setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    try {
        await axios
            .get<IOrder>(host + "/orders?userId=" + userId)
            .then((response) => {
                console.log(response.data)
                setOrder(response.data)
            })
    } catch (ex) {
        setOrder(undefined)
    }
}

export async function removeFromOrder(productId: number, order: IOrder,
                                      setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    try {
        await axios
            .delete<IOrder>(host + "/orders/" + order?.id + "/products/" + productId)
            .then((response) => setOrder(response.data))
    } catch (ex) {
        alert(ex)
    }
}

export async function submitOrder(id: number | undefined, address: string, userId: number,
                                  setOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>) {
    try {
        const data = {
            id: id,
            address: address
        }

        await axios
            .post(host + "/orders/submit", data)
            .then(()=> {
                fetchOrders(userId, setOrder)
                alert('Ваш заказ отпрвлен, а корзина очищена')
            })
    } catch (ex) {
        alert(ex)
    }
}

export async function fetchProductList(id: string | undefined, page: number, pageSize: number,
                                       setProducts: Dispatch<SetStateAction<IProduct[]>>,
                                       setCountProducts: Dispatch<SetStateAction<number>>,
                                       setCategoryName: Dispatch<SetStateAction<string | undefined>>) {
    try {
        const response = await axios
            .get<IProductList>(host + "/categories/"+id+"/products", {
                params:{
                    "order_by":"ID",
                    "page": page,
                    "page_size": pageSize
                }})
        setProducts(response.data.products)
        setCountProducts(response.data.count)
        setCategoryName(response.data.categoryName)
    } catch (ex) {
        alert(ex)
    }
}

export async function fetchProductDetails(id: string | undefined,
                                          setProduct: Dispatch<SetStateAction<IProductDetails | undefined>>) {
    try {
        await axios
            .get<IProductDetails>(host + "/products/" + id)
            .then((response)=>setProduct(response.data))
    } catch (ex) {
        alert(ex)
    }
}

export async function fetchComments(id: string | undefined, setComments: Dispatch<SetStateAction<IComment[]>>) {
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

export async function addToCart(userId: number, id: string | undefined) {
    try {
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
    } catch (ex) {
        alert(ex)
    }
}

export async function registration(email: string, password: string, setUserId: (userId: number) => void) {
    try {
        await axios.post(auth_host + "/auth/token", {
            username: email,
            password: password,
            grantType: 'registration'
        }).then(res => {
            alert('Вы успешно зарегистрировались')
            cookies.set("userId", res.data.id, { path: '/' })
            setUserId(res.data.id)
        }).catch(reason => alert(reason.response.data.error))
    } catch (ex) {
        alert(ex)
    }
}

export async function login(email: string, password: string, setUserId: (userId: number) => void) {
    try {
        await axios
            .post(auth_host + "/auth/token", {
                username: email,
                password: password,
                grantType: 'login'
            }).then(res => {
                alert('Вы успешно вошли в свой аккаунт')
                cookies.set("userId", res.data.id, { path: '/' })
                setUserId(res.data.id)
            }).catch(reason => alert(reason.response.data.error))
    } catch (ex) {
        alert(ex)
    }
}

export async function fetchCategories(id: string | undefined,
                                      setCategories: (value: (((prevState: ICategory[]) => ICategory[]) | ICategory[])) => void) {
    try {
        await axios
            .get<ICategory[]>(host + "/categories", {
                params:{
                    "parent_id": id,
                    "page_size": 100
                }
            }).then((response)=>setCategories(response.data))
    } catch (ex) {
        alert(ex)
    }
}

export async function fetchProducts(setProducts: (value: (((prevState: IProduct[]) => IProduct[]) | IProduct[])) => void) {
    try {
        const response = await axios
            .get<IProduct[]>(host + "/products")
        setProducts(response.data)
    }catch (ex) {
        alert(ex)
    }
}