import React from "react";
import { Link } from "react-router-dom";

const Brand = ({ brand }) => {
  return (
    <div key={brand._id} className={`col-sm-12 col-md-6 col-lg-3 my-3`}>
      <div className="card p-3 rounded">
        <img src={brand.image.url} alt="" className="card-img-top mx-auto"/>
        <h5 className=" text-center card-title">
        <Link to={`/brands/${brand._id}`} >{brand.name} </Link>
        </h5>
     </div>
    </div>
  );
};

export default Brand;
