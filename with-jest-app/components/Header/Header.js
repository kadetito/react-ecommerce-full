import React from "react";
import Logotipo from "../Logotipo";
import MenuUsuario from "../MenuUsuario";
import NavBar from "../NavBar";

export default function Header() {
  return (
    <div className="header__global">
      <div className="header__up">
        <div className="row">
          <div className="header__up-left col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">
            <div>
              <div>
                <Logotipo />
              </div>
            </div>
          </div>
          <div className="header__up-right col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2">
            <div>
              <div>
                <MenuUsuario />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <NavBar />
      </div>
    </div>
  );
}
