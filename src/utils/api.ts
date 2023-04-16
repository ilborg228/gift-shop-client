import axios, {AxiosError} from 'axios'
import {
    ICategory,
    IComment,
    ICommentSummary,
    IError,
    IOrder, IOrderList,
    IProduct,
    IProductDetails, IProductImage,
    IProductList,
    IUser
} from './types'
import {auth_host, host} from './constants'
import {Dispatch, SetStateAction} from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export async function fetchOrder(userId: number | undefined, setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    await axios
        .get<IOrder>(host + '/orders/' + userId)
        .then((response) => {
            setOrder(response.data)
        })//.catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function updateOrderStatus(orderId: number, statusId: number) {
    await axios
        .patch(host + '/orders/' + orderId + '?statusId=' + statusId)
        .then((response) => {
            alert('Статус заказа успешно обновлен')
        }).catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchOrders(page: number, pageSize: number,
                                  setOrders: Dispatch<SetStateAction<IOrder[]>>,
                                  setCountProducts: Dispatch<SetStateAction<number>>) {
    await axios
        .get<IOrderList>(host + '/orders',{
        params:{
                'page': page,
                'page_size': pageSize
        }})
        .then((response) => {
            setOrders(response.data.orders)
            setCountProducts(response.data.count)
        }).catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchProductId(productName: string | undefined, setProductId: Dispatch<SetStateAction<number | undefined>>) {
    await axios
        .get<number>(host + '/products?name=' + productName, {
            headers: {
                'produce-view' : 'PRODUCT_BY_NAME'
            }
        })
        .then((response) => {
            setProductId(response.data)
        }).catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchCategoryByName(name: string, setCategory: Dispatch<SetStateAction<ICategory | undefined>>) {
    await axios
        .get<ICategory>(host + '/categories?name=' + name, {
            headers: {
                'produce-view' : 'CATEGORY_BY_NAME'
            }
        })
        .then((response) => {
            setCategory(response.data)
        }).catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function removeFromOrder(productId: number, order: IOrder,
                                      setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    await axios
        .delete<IOrder>(host + '/orders/' + order?.id + '/products/' + productId)
        .then((response) => setOrder(response.data))
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function deleteProduct(productId: number) {
    await axios
        .delete(host + '/products/' + productId)
        .then(() => alert('Товар успешно удален'))
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function deleteCategory(categoryId: number) {
    await axios
        .delete(host + '/categories/' + categoryId)
        .then(() => alert('Категория успешно удалена'))
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function submitOrder(id: number | undefined, address: string, userId: number | undefined,
                                  setOrder: Dispatch<SetStateAction<IOrder | undefined>>) {
    const data = {
        id: id,
        address: address
    }

    await axios
        .post(host + '/orders/submit', data)
        .then(()=> {
            setOrder(undefined)
            alert('Ваш заказ создан, а корзина очищена')
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function submitCategory(name: string, parentId: number | undefined, file: File) {
    const data = {
        categoryName: name,
        parentId: parentId
    }

    await axios
        .post<ICategory>(host + '/categories', data)
        .then((response)=> {
            submitCategoryImage(file, response.data.id)
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function submitCategoryImage(file: File, categoryId: number) {
    let formData = new FormData()
    formData.append('file', file)
    await axios
        .post(host + '/categories/' + categoryId + '/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => alert('Категория создана'))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function submitImage(productId: number, file: File, primary: boolean) {
    let formData = new FormData()
    formData.append('file', file)
    await axios
        .post<IProductImage>(host + '/products/' + productId + '/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=> {
            let imageId = response.data.id
            if (primary) {
                makePrimary(productId, imageId)
            }
            alert('Изображение загруженно')
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function makePrimary(productId: number, imageId: number | undefined) {
    await axios
        .patch(host + '/products/' + productId + '/images/' + imageId)
        .then()
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchProductList(id: string | undefined, page: number, pageSize: number,
                                       orderBy: string, orderByType: string,
                                       setProducts: Dispatch<SetStateAction<IProduct[]>>,
                                       setCountProducts: Dispatch<SetStateAction<number>>,
                                       setCategoryName: Dispatch<SetStateAction<string | undefined>>) {
    await axios
        .get<IProductList>(host + '/categories/'+id+'/products', {
            params:{
                'page': page,
                'page_size': pageSize,
                'order_by': orderBy,
                'order_by_type': orderByType
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
        .get<IProductDetails>(host + '/products/' + id)
        .then((response)=>setProduct(response.data))
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchComments(id: string | undefined, setComments: Dispatch<SetStateAction<IComment[]>>) {
    await axios
        .get<IComment[]>(host + '/products/' + id + '/comments')
        .then((response)=> {setComments(response.data)})
        .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function addToCart(userId: number | undefined, id: string | undefined) {
    const data = {
        userId: userId,
        products: [
            {
                id: id
            }
        ]
    }

    await axios
        .post(host + '/orders', data)
        .then(()=>alert('Товар добавлен в корзину'))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function registration(email: string, password: string, setUser: (user: IUser) => void) {
    await axios.post(auth_host + '/auth/token', {
        username: email,
        password: password,
        grantType: 'registration'
    }).then(res => {
        alert('Вы успешно зарегистрировались')
        cookies.set('user', res.data, { path: '/' })
        setUser(res.data)
    }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function login(email: string, password: string, setUser: (user: IUser) => void) {
    await axios
        .post(auth_host + '/auth/token', {
            username: email,
            password: password,
            grantType: 'login'
        }).then(res => {
            alert('Вы успешно вошли в свой аккаунт')
            cookies.set('user', res.data, { path: '/' })
            setUser(res.data)
        }).catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchCategories(id: string | undefined,
                                      setCategories: Dispatch<SetStateAction<ICategory[]>>) {
    await axios
        .get<ICategory[]>(host + '/categories', {
            params:{
                'parent_id': id,
                'page_size': 100
            }
        }).then((response) => setCategories(response.data))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchAllCategories(setCategories: Dispatch<SetStateAction<ICategory[]>>) {
    await axios
        .get<ICategory[]>(host + '/categories', {
            params:{
                'page_size': 100,
                'all': true
            }
        }).then((response) => setCategories(response.data))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchCategory(id: string | undefined,
                                      setCategory: Dispatch<SetStateAction<ICategory | undefined>>) {
    if (id === undefined) return
    await axios
        .get<ICategory>(host + '/categories/' + id)
        .then((response) => setCategory(response.data))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function fetchProducts(setProducts: Dispatch<SetStateAction<IProduct[]>>) {
        await axios
            .get<IProduct[]>(host + '/products')
            .then((response) => setProducts(response.data))
            .catch((er: AxiosError<IError>)=>alert(er.response?.data.error))
}

export async function fetchProductsCommentSummary (productId: string | undefined, setCommentSummary: Dispatch<SetStateAction<ICommentSummary>>) {
    await axios.get<ICommentSummary>(host + '/products/'+ productId +'/comments', {
        headers: {
            'produce-view' : 'COMMENTS_SUMMARY'
        }
    }).then((response) => setCommentSummary(response.data))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}

export async function addProduct(name: string, description: string, price: string, categoryId: number) {
    const data = {
        name: name,
        description: description,
        price: price,
        categoryId: categoryId
    }

    await axios
        .post(host + '/products', data)
        .then(()=>alert('Товар успешно создан'))
        .catch((er: AxiosError<IError>) => alert(er.response?.data.error))
}