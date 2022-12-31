import {IPath} from "../types/types";

export const host: string = "http://localhost:8080"
export const auth_host: string = "http://localhost:9000"

export const navigation: IPath[] = [
    { name: 'Каталог', href: '/store'},
    { name: 'Идеи подарков', href: '/ideas'},
    { name: 'Контакты', href: '/contacts'},
    { name: 'Юридическая информация', href: '/law-info'},
]