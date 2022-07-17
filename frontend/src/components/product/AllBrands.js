import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Brand from "./Brand";

import { getBrands } from "../../actions/brandActions";
import MetaData from "../layouts/MetaData";
const AllBrands = () => {
  const dispatch = useDispatch();

  const { brands } = useSelector((state) => state.brands);
  
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <Fragment>
        <MetaData title={"Tất cả thương hiệu"}/>
      <div   className="row mt-2" >
        <h1  className="mt-3 ml-5" >Tất cả thương hiệu  </h1>
        <div className="row ml-3 mr-3 mb-3">
          {brands &&
            brands.map((br) => (
              <Brand key={br._id} brand={br} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AllBrands;
