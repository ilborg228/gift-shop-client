import {IPath} from "./types";

const domain: string = "http://192.168.0.107"
export const host: string = domain + ":8080"
export const auth_host: string = domain + ":9000"

export const ROLE_ADMIN = 'ADMIN'

export const navigation: IPath[] = [
    { name: 'Каталог', href: '/store'},
    //{ name: 'Идеи подарков', href: '/ideas'},
    //{ name: 'Контакты', href: '/contacts'},
    { name: 'О программе', href: '/law-info'},
]

export const pageSize = 16

export const orderStatuses = [
    {id: 1, name: 'Создан'},
    {id: 2, name: 'Подтвержден'},
    {id: 3, name: 'Доставлен'},
    {id: 4, name: 'Отменен'}
]

export const slides = [
    {
        url: 'http://localhost:8080/images/1.jpg',
    },
    {
        url: 'http://localhost:8080/images/2.jpg',
    },
    {
        url: 'http://localhost:8080/images/3.jpg',
    },
    {
        url: 'http://localhost:8080/images/4.jpg',
    },
    {
        url: 'http://localhost:8080/images/5.jpg',
    },
    {
        url: 'http://localhost:8080/images/6.jpg',
    }
];