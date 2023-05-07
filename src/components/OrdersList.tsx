import React, {useContext, useEffect, useState} from 'react';
import {IOrder} from "../utils/types";
import {orderStatuses} from "../utils/constants";
import {fetchOrders, fetchOrdersForUser, updateOrderStatus} from "../utils/api";
import Pagination from "./ui/Pagination";

interface OrdersListProps {
    userId?: number
}

const OrdersList: React.FC<OrdersListProps> = ({userId}) => {

    const [orders, setOrders] = useState<IOrder[]>([])
    const [page, setPage] = useState<number>(0)
    const [filterStatusId, setFilterStatusId] = useState<number>(0)
    const [countOrders, setCountOrders] = useState<number>(0)
    const pageSize = 6

    function canIncrementPage(): boolean {
        return countOrders>pageSize*(page+1)
    }

    useEffect(()=> {
        reload()
    },[page, filterStatusId])

    function reload() {
        if (userId)
            fetchOrdersForUser(userId, filterStatusId, page, pageSize, setOrders, setCountOrders).then(r => console.log(orders))
        else
            fetchOrders(filterStatusId, page, pageSize, setOrders, setCountOrders).then(r => console.log(orders))
    }

    return (
        <div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <div
                            style={{float: "right", marginBottom: "10px"}}>
                            <select
                                defaultValue={0}
                                className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => {
                                    setPage(0)
                                    setFilterStatusId(parseInt(e.target.value))
                                }}>
                                <option value={0}>Выберите статус</option>
                                {orderStatuses.map((status) => (
                                    <option
                                        key={status.id}
                                        value={status.id}>
                                        {status.name}
                                    </option>))}
                            </select>
                        </div>
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
                                                        {p.name};
                                                    </p>
                                                )}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {userId === undefined ? <select
                                                disabled={order.statusId === 3 || order.statusId === 4}
                                                value={order.statusId}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    updateOrderStatus(order.id, parseInt(e.target.value)).then(r => reload())
                                                }}>
                                                <option disabled={true} value={0}>Выберите статус</option>
                                                {orderStatuses.map((status) => (
                                                    <option
                                                        key={status.id}
                                                        value={status.id}>
                                                        {status.name}
                                                    </option>))}
                                            </select>:

                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {orderStatuses.find(os => os.id === order.statusId)?.name}
                                                </p>
                                            }
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