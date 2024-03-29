import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import {navigation, ROLE_ADMIN, ROLE_GUEST} from "../utils/constants";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext, AuthFlag} from "../context";
import Cookies from "universal-cookie";
import Cart from "./Cart";
import {IUser} from "../utils/types";

const Navbar = () => {

    const cookies = new Cookies();
    const {user, setUser} = useContext<AuthFlag>(AuthContext)
    const [openCart, setOpenCart] = useState(false)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function showAdminButton() {
        if (user !== undefined) {
            console.log(user)
            if (user.role === ROLE_ADMIN)
                return (
                    <Link
                        key={'Панель администратора'}
                        to={'/admin'}
                        className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                    >
                        {'Панель администратора'}
                    </Link>
                )
            else if (user.role === ROLE_GUEST)
                return (
                    <Link
                        key={'Личный кабинет'}
                        to={'/lk'}
                        className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                    >
                        {'Личный кабинет'}
                    </Link>
                )
        }
    }

    function genLoginButton() {
        if (user === undefined || user.id === undefined || user.id === '0')
            return (
                <div>
                    <Link
                        to="/login"
                        className={classNames(
                            'text-gray-300  hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                    >
                        Войти
                    </Link>
                    <Link
                        to="/registration"
                        className={classNames(
                            'bg-gray-700 text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                    >
                        Зарегистрироваться
                    </Link>
                </div>
            )
        else
            return (
                <div>
                    <Cart openCart={openCart} setOpenCart={setOpenCart}/>
                    <button className={classNames(
                        'text-gray-300  hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                    )} onClick={() => {
                        setOpenCart(!openCart)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            cookies.set("user", null, { path: '/' })
                            const defUser: IUser = {
                                id: '0',
                                username: '',
                                role: ''
                            }
                            setUser(defUser)
                        }}
                        className={classNames(
                            'text-gray-300  hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                    >
                        Выйти
                    </button>
                </div>
            )
    }

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link to={'/'} className="group">
                                        <img
                                            className="block lg:hidden h-8 w-auto"
                                            src={process.env.PUBLIC_URL + "/logo.svg"}
                                            alt="Workflow"
                                        /></Link>
                                        <Link to={'/'} className="group">
                                        <img
                                            className="hidden lg:block h-8 w-auto"
                                            src={process.env.PUBLIC_URL + "/logo.svg"}
                                            alt="Workflow"
                                        /></Link>
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                            {showAdminButton()}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {genLoginButton()}
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default Navbar