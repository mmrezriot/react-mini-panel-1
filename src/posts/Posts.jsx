import React, { useEffect, useState } from "react";
import style from "../style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [mainPosts, setMainPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setMainPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    useTitle("مدیریت پست ها");


  const handleSearch = (e) => {
     setPosts(
      mainPosts.filter((post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    console.log(e.target.value);
   
  };

  const handleDelete = (id) => {
     const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "آیا از حذف این پست مطمئن هستید؟",
        text: "در صورت حذف، این عملیات قابل بازگشت نیست!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله، حذف شود!",
        cancelButtonText: "   خیر، منصرف شدم!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
              if (res.status === 200) {
                setPosts(posts.filter((post) => post.id !== id));
              } else {
                Swal.fire({
                  title: "خطا!",
                  text: "مشکلی در حذف پست پیش آمد، لطفا دوباره تلاش کنید.",
                  icon: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });

          swalWithBootstrapButtons.fire({
            title: " حذف شد! ",
            text: " حرکتان با موفقیت انجام شد. ",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "انصراف داده شد",
            text: "لغو عملیات حذف",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
      <h4 className="text-center">مدیریت پست ها</h4>
      <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
        <div className="form-group col-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control shadow"
            placeholder="جستجو"
            onChange={handleSearch}
          />
        </div>
        <div className="col-2 text-start px-0">
          <Link to="/posts/add" state={"fromUsersPage"}>
            <button className="btn btn-success">
              <i className="fas fa-plus text-light"></i>
            </button>
          </Link>
        </div>
      </div>
      {posts.length > 0 ? (
        <table className="table bg-light shadow">
          <thead>
            <tr>
              <th>id</th>
              <th>id کاربری</th>
              <th>عنوان</th>
              <th>محتوا</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <i
                    className="fas fa-edit text-warning mx-2 pointer"
                    onClick={() => {
                      return navigate(`/posts/add/${post.id}`);
                    }}
                  ></i>
                  <i
                    className="fas fa-trash text-danger mx-2 pointer"
                    onClick={() => handleDelete(post.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">لطفا صبر نمایید</div>
      )}
    </div>
  );
};

export default Posts;
