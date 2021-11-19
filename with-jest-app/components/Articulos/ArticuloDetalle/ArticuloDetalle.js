import React from "react";
import { size } from "lodash";

export default function ArticuloDetalle({ item }) {
  return item.articulo ? (
    <div className="container articulo__global">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div class="col-12 col-sm-12 col-md-4 col-xl-4">
              <img src={item.articulo.poster} alt={item.articulo.nombre} />
            </div>
            <div class="col-12 col-sm-12 col-md-8 col-xl-8">
              {item.articulo.nombre}
              {item.articulo.price} - {item.articulo.discount}
              {item.articulo.summary}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Cargando</p>
  );
}
