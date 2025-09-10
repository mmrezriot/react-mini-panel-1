import React from 'react';
import style from '../style.module.css'
import Conter from './conter';
import useTitle from '../../hooks/useTitle';

const Gallery = ()=>{
      useTitle("مدیریت گالری");

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center">مدیریت گالری ها</h4>
            <Conter/>
        </div>
    )
}

export default Gallery;
