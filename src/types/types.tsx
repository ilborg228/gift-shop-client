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
}

export interface IProductDetails extends IProduct{
    height: number
    description: string
    images: string[]
}

export interface ICategory {
    categoryName: string
    imageUrl: string
    id: number
    parentId: number
}

export interface IComment {
    id: number
    text: string
    productId: number
    creation: Date
    scoreValue: number
}
