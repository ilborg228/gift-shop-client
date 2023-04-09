import React, {useContext, useEffect, useState} from 'react';
import {IOrder} from "../utils/types";
import {orderStatuses, pageSize} from "../utils/constants";
import {fetchOrders, updateOrderStatus} from "../utils/api";
import Pagination from "./ui/Pagination";

const OrdersList = () => {

    const [orders, setOrders] = useState<IOrder[]>([])
    const [page, setPage] = useState<number>(0)
    const [countOrders, setCountOrders] = useState<number>(0)


    function canIncrementPage(): boolean {
        return countOrders>pageSize*(page+1)
    }

    useEffect(()=> {
        reload()
    },[page])

    function reload() {
        fetchOrders(page, pageSize, setOrders, setCountOrders).then(r => console.log(orders))
    }

    return (
        <div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Номер заказа
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Дата создания заказа
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Адрес доставки
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Список товаров
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Статус
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {orders.map(order=>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{order.orderCreation}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {order.address}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {order.products.map(p=>
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {p.name}
                                                    </p>
                                                )}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <select
                                                    defaultValue={orderStatuses.find(s=>order.statusId === s.id)?.id}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        updateOrderStatus(order.id, parseInt(e.target.value))//.then(r => reload())
                                            }}>
                                                <option disabled={true} value={0}>Выберите статус</option>
                                                {orderStatuses.map((status) => (
                                                    <option
                                                        key={status.id}
                                                        value={status.id}>
                                                        {status.name}
                                                    </option>))}
                                            </select>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination canIncrementPage={canIncrementPage()}  page={page} setPage={setPage}/>
        </div>
    );
};

export default OrdersList;