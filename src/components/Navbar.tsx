import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import {navigation} from "../constants/constants";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context";

const Navbar = () => {

    const {userId, setUserId} = useContext(AuthContext)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function genLoginButton() {
        if (userId === 0)
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
                    <button
                        onClick={()=>{setUserId(0)}}
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
                                    <a href={'/'} className="group">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    /></a>
                                    <a href={'/'} className="group">
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    /></a>
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
    )
}

export default Navbar