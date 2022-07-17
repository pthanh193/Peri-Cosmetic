import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
        <div className="py-2">
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2> <b> Peri Cosmetic</b></h2>
                                <div className="contact-info">
                                    <p><i className="fa fas fa-map-marker-alt"></i>142 Đường 3/2, Ninh Kiều, Cần Thơ</p>
                                    <p><i className="fa fa-envelope"></i>pericosmetic@gmail.com</p>
                                    <p><i className="fa fa-phone"></i> 0398969684</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2> <b> Giờ mở cửa</b></h2>
                                <ul> 
                                    <p><i className="fa fa-clock"></i> Từ 8:00 đến 22:00 giờ </p>
                                    <p><i className="fa fa-calendar"></i> Tất cả các ngày trong tuần 
                                    (kể cả các ngày lễ, ngày Tết) </p>

                                    
                                </ul>
                            </div>
                        </div>  

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2> <b> Hỗ trợ khách hàng </b></h2>
                                <ul>
                                    <li><a href="">Hướng dẫn đặt hàng</a></li>
                                    <li><a href="">Chính sách thanh toán</a></li>
                                    <li><a href="">Chính sách đổi trả</a></li>
                                    <li><a href="">Chính sách bảo mật</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2> <b> Theo dõi mình tại </b></h2>
                                    <div className="social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                    </div>
                            </div>
                            <div style={{ margin: "10px auto", color: "black", fontSize: "14px" }}>
                                Copyright &#169; 2022 Peri Cosmetic. <br/> All rights reserved.
                            </div>
                        </div>                   
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
};

export default Footer;
