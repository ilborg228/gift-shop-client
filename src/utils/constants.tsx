import {IPath} from "./types";

export const host: string = "http://localhost:8080"
export const auth_host: string = "http://localhost:9000"

export const ROLE_ADMIN = 'ADMIN'

export const navigation: IPath[] = [
    { name: 'Каталог', href: '/store'},
    //{ name: 'Идеи подарков', href: '/ideas'},
    //{ name: 'Контакты', href: '/contacts'},
    { name: 'О программе', href: '/law-info'},
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