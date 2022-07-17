import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'

const ListOrders = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    function format(n, currency) {
        return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + currency;
      }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Mã đơn hàng',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Số sản phẩm',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Tổng tiền',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Trạng thái',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: '',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice && format(order.totalPrice, "đ")}`,
                status: order.orderStatus && String(order.orderStatus).includes('Giao hàng thành công')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }

    return (
        <Fragment>

            <MetaData title={'Đơn hàng'} />

            <h1 className="my-5">Đơn mua</h1>

            {loading ? <Loader /> : (
                <MDBDataTableV5
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                    searchTop
                    searchBottom={false}
                    entriesLabel="Hiển thị"
                    entries={10}
                    noRecordsFoundLabel="Không có dữ liệu để hiển thị"
                    searchLabel="Tìm kiếm"
                />
            )}

        </Fragment>
    )
}

export default ListOrders