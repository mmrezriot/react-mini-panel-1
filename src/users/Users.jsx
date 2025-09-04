import React, { use, useEffect , useState } from 'react';
import style from '../style.module.css'
import { Link , useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';


const Users = ()=>{
    const navigate = useNavigate();
    const [users , setUsers] = useState([]);


    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res=>{
            setUsers(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    const handleDelete = (id)=>{
        const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "آیا از حذف این کاربر مطمئن هستید؟",
  text: "در صورت حذف، این عملیات قابل بازگشت نیست!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "بله، حذف شود!",
  cancelButtonText: "   خیر، منصرف شدم!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: " حذف شد! ",
      text: " حرکتان با موفقیت انجام شد. ",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "انصراف داده شد",
      text: "لغو عملیات حذف",
      icon: "error"
    });
  }
});
    }

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center">مدیریت کاربران</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="جستجو"/>
                </div>
                <div className="col-2 text-start px-0">
                    <Link to="/users/add" state={'fromUsersPage'}>
                    <button className="btn btn-success">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                    </Link>
                </div>
            </div>
           {users.length > 0 ? (<table className="table bg-light shadow">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>نام</th>
                        <th>نام کاربری</th>
                        <th>ایمیل</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                  { users.map(user=>( <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <i className="fas fa-edit text-warning mx-2 pointer" onClick={
                                ()=>{
                                    return navigate('/users/add/1' , {state: 'userId: 1'});
                                }
                            }></i>
                            <i className="fas fa-trash text-danger mx-2 pointer" onClick={()=>handleDelete(1)}></i>
                        </td>
                    </tr>))}
                   
                </tbody>
            </table>) : (
            <div className="alert alert-info text-center">
لطفا صبر نمایید 
            </div>
              )}
        </div>
    )
}

export default Users;
