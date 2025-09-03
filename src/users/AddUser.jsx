import React from 'react';
import style from '../style.module.css'
import { Link, useParams } from 'react-router-dom';

const AddUser = ()=>{
    const {userId} = useParams();
    
    return (
<div className={`${style.item_content} mt-5 p-4 container-fluid`}>
    <h4 className="text-center mb-4">
        {userId ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
    </h4>
    <form  className="row g-3">
    <div className="col-md-6">
        <label className="form-label">نام</label>
        <input
        type="text"
        className="form-control"
        name="firstName"
        placeholder="نام"
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
        required
        />
    </div>
    <div className="col-12 text-center mt-4">
        <button type="submit" className="btn btn-success mx-2">
        ایجاد
        </button>
        <Link to="/users">
        <button
        type="button"
        className="btn btn-secondary mx-2"
        >
        انصراف
        </button>
        </Link>
    </div>
    </form>
</div>

    )
}

export default AddUser;