import React from "react";
import Logotipo from "../Logotipo";
import Sitemap from "../Sitemap";

export default function Footer() {
  return (
    <div className="footer__global">
      <div className="footer__up">
        <div className="row">
          <div className="footer__up-left col-md-12 ">
            <div>
              <div>
                <Logotipo size="150" />
              </div>
            </div>
          </div>
          <div className="footer__up-right col-md-12 ">
            <div>
              <div>
                <Sitemap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
