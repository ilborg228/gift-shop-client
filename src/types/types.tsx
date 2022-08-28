export interface IPath {
    name: string,
    href: string,
}

export interface IProduct {
    id: number,
    name: string,
    price: number,
    categoryId: number
}

export interface IProductDetails extends IProduct{
    height: number,
    description: string,
    images: IImage[]
}

export interface ICategory {
    categoryName: string,
    imgSource: string,
    id: number,
    child: ICategory
}

export interface IComment {
    id: number,
    text: string
    productId: number
    creation: Date,
    scoreValue: string
}

export interface IImage {
    imgSource: string,
    primaryImage: boolean
}
