import {IPath} from "../types/types";

export const host: string = "http://localhost:8080"

export const navigation: IPath[] = [
    { name: 'Каталог', href: '/store'},
    { name: 'Идеи подарков', href: '/ideas'},
    { name: 'Контакты', href: '/contacts'},
    { name: 'Юридическая информация', href: '/law-info'},
    { name: 'Информация о товаре', href: '/product/:id'},
    { name: 'Отзывы', href: '/comments/:productId'},
]