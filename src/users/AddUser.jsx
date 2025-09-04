import React, { useState } from "react";
import style from "../style.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddUser = () => {
  const { userId } = useParams();
  const params = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const handleAddUser = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", data)
      .then((res) => {
        Swal.fire({
          title: "کاربر ایجاد شد.",
          icon: "success",
          draggable: true,
        });
        setTimeout(() => {
          navigate("/users");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
      <h4 className="text-center mb-4">
        {userId ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      </h4>
      <form onSubmit={handleAddUser} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">نام</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="نام"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">نام خانوادگی</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="نام خانوادگی"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">شماره موبایل</label>
          <input
            type="tel"
            className="form-control"
            name="mobile"
            placeholder="09xxxxxxxxx"
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">ایمیل</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="example@email.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-success mx-2">
            ایجاد
          </button>
          <Link to="/users">
            <button type="button" className="btn btn-secondary mx-2">
              انصراف
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
