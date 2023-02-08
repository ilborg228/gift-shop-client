import React, {Fragment, useContext, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {XIcon} from "@heroicons/react/solid";
import {IOrder} from "../utils/types";
import {AuthContext} from "../context";
import {fetchOrders, removeFromOrder, submitOrder} from "../utils/api";

interface CartProps {
    openCart: boolean
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Cart: React.FC<CartProps> = ({openCart, setOpenCart})  => {

    function calculateSubtotal(): number | undefined {
        return order?.products.map(p => p.price).reduce((partialSum, a) => a + partialSum)
    }

    const [address, setAddress] = useState('')
    const [order, setOrder] = useState<IOrder>()
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        fetchOrders(user?.id, setOrder)
    },[openCart])

    return (
        <Transition.Root show={openCart} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpenCart}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Корзина</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpenCart(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            {order == undefined ?
                                                <div className="flex justify-center text-base font-medium text-gray-900 mt-10">
                                                    <p>Ваш заказ не найден! Вы можете добавить товар в корзину</p>
                                                </div>
                                                : <div></div>
                                            }

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {order?.products.map((product) => (
                                                            <li key={product.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={product.imageUrl}
                                                                        alt={"alt"}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href={"/products/"+product.id}>{product.name}</a>
                                                                            </h3>
                                                                            <p className="ml-4">{product.price}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">{""}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">Qty {1}</p>

                                                                        <div className="flex">
                                                                            <button
                                                                                onClick={()=>{removeFromOrder(product.id, order, setOrder)}}
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                Убрать
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div>
                                                <label htmlFor="email-address" className="sr-only">
                                                    Ваш адресс:
                                                </label>
                                                <input  onChange={event=>{setAddress(event.target.value)}}
                                                        id="address"
                                                        name="address"
                                                        type="address"
                                                        autoComplete="address"
                                                        required
                                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Ваш адрес:"
                                                />
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Промежуточный итог</p>
                                                <p>{calculateSubtotal()}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Стоимость доставки будет подсчитанна позже и сообщена дополнительно.</p>
                                            <div className="mt-6">
                                                <button
                                                    onClick={() => {submitOrder(order?.id, address, user?.id, setOrder)}}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Создать заказ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Cart;
