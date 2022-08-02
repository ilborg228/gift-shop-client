export interface IPath {
    name: string,
    href: string,
}

export interface IProduct {
    id: number,
    imgSource: string,
    name: string,
    price: number,
    categoryId: number
}

export interface IProductDetails extends IProduct{
    height: number,
    description: string
}

export interface ICategory {
    categoryName: string,
    imgSource: string,
    id: number
}

export interface IComment {
    id: number,
    text: string
    productId: number
    creation: Date,
    scoreValue: string
}
