import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import swal from "sweetalert"
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allUsers ,clearErrors, deleteUser } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";


const UserList = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
  
    const { loading, error, users } = useSelector((state) => state.allUsers);
    const { isDeleted } = useSelector((state) => state.user);
    
    useEffect(() => {
      dispatch(allUsers());
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isDeleted) { 
        history.push("/admin/users");
        dispatch({ type: DELETE_USER_RESET });
      }
    }, [dispatch, alert, error, history, isDeleted]);
  
  
    const setUsers = () => {
      const data = {
        columns: [
          {
            label: "Mã thành viên",
            field: "id",
            sort: "asc",
          },
          {
            label: "Tên",
            field: "name",
            sort: "asc",
          },
          {
            label: "Email",
            field: "email",
            sort: "asc",
          },
          {
            label: "Vai trò",
            field: "role",
            sort: "asc",
          },
          {
            label: "",
            field: "actions",
          },
        ],
        rows: [],
      }
  
      users.forEach(user=> {
          data.rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            actions: 
              <Fragment>
                <button  className="btn btn-danger py-1 ml-2"
                onClick={() => deleteUserHandler(user._id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </Fragment>
          });
        });
  
      return data;
    };

    const deleteUserHandler = (id) => {

        swal({
          title: "Bạn có chắc chắn không?",
          text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
          icon: "warning",
          buttons: ["Hủy", "Xóa"],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            dispatch(deleteUser(id));
            swal("Xóa thành viên thành công.", {
              icon: "success",
            });
          } else {
            swal("Thành viên chưa được xóa.");
          }
        });
      };
    return(
        <Fragment>
            <MetaData title={'Admin - Thành viên'}/>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar/>
                </div>
            

                <div className='col-12 col-md-10' >
                    <Fragment>
                        <h2 className='my-5'>Tất cả thành viên</h2>

                        {loading ? <Loader/> : (
                            <MDBDataTableV5 
                                data={setUsers()}
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
    )
}

export default UserList
