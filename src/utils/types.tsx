export interface IError {
    code: number
    error: string
    description: string
}

export interface IPath {
    name: string
    href: string
}

export interface IProduct {
    id: number
    name: string
    price: number
    categoryId: number
    imageUrl: string
}

export interface IProductList {
    products: Array<IProduct>
    count: number
    categoryName: string
}

export interface IOrderList {
    orders: Array<IOrder>
    count: number
}

export interface IProductDetails extends IProduct{
    inStock: boolean
    description: string
    images: string[]
}

export interface ICategory {
    categoryName: string
    imageUrl: string
    id: number
    parentId: number
    hasChild: boolean
}

export interface IComment {
    id: number
    text: string
    productId: number
    creation: Date
    scoreValue: number
}

export interface ICommentSummary {
    averageScore: number
    count: number
}

export interface IOrder {
    id: number
    products: Array<IProduct>
    userId: number
    orderCreation: string
    address: string
    statusId: number
}

export interface IUser {
    id: string | undefined,
    username: string | undefined
    role: string | undefined
}

export interface IProductImage {
    id: number,
    imageUrl: string,
    primaryImage: boolean,
    product: IProductDetails
}