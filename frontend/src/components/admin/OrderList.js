import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import swal from "sweetalert"
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allOrders ,clearErrors, deleteOrder} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({history}) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);
  
  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) { 
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, history , isDeleted]);

  function format(n, currency) {
    return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + currency;
  }

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Mã đơn hàng",
          field: "id",
          sort: "asc",
        },
        {
          label: "Số lượng sản phẩm",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Tổng tiền",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Trạng thái",
          field: "status",
          sort: "asc",
        },
        {
          label: "",
          field: "actions",
        },
      ],
      rows: [],
    }

    orders.forEach(order=> {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderItems.length,
          amount: `${order.totalPrice && format(order.totalPrice, "đ")}`,
          status: order.orderStatus && String(order.orderStatus).includes('Giao hàng thành công')
            ?<p style={{ color: 'green' }}>{order.orderStatus}</p>
            :<p style={{ color: 'red' }}>{order.orderStatus}</p>,      
          actions: 
            <Fragment>
               <Link to={`/admin/order/${order._id}`} 
                className="py-1 btn btn-primary" style={{paddingRight: "8px"}}>
                        <i className="fa fa-eye"></i>
                </Link>
              <button  className="btn btn-danger py-1 ml-2"
                onClick={()=> deleteOrderHandler(order._id)} >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
        });
      });

    return data;
  };

  const deleteOrderHandler = (id) => {

    swal({
      title: "Bạn có chắc chắn không?",
      text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteOrder(id));
        swal("Xóa đơn hàng thành công.", {
          icon: "success",
        });
      } else {
        swal("Đơn hàng chưa được xóa.");
      }
    });
  };

  return (
    <Fragment>
    <MetaData title={'Admin - Đơn hàng'}/>
    <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
    

        <div className='col-12 col-md-10' >
            <Fragment>
                <h2 className='my-5'>Tất cả đơn hàng</h2>

                {loading ? <Loader/> : (
                    <MDBDataTableV5 
                        data={setOrders()}
                        className='px-3'
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
        </div>
    </div>
</Fragment>
  );
};

export default OrderList;
