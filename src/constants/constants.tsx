import {IPath} from "../types/types";

export const host: string = "http://localhost:8080"

export const navigation: IPath[] = [
    { name: 'Каталог', href: '/store', current: false },
    { name: 'Идеи подарков', href: '/ideas', current: false },
    { name: 'Контакты', href: '/contacts', current: false },
    { name: 'Юридическая информация', href: '/lawinfo', current: false },
]