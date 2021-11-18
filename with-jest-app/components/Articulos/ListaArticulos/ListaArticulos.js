import React from "react";
import { size, map } from "lodash";
import Link from "next/link";

export default function ListaArticulos(props) {
  const { articulos, nohaynada } = props;

  return (
    <div className="articulos__global container mt-5">
      <div className="row">
        <div className="col-12 titular-general">
          <h2>Novedades</h2>
        </div>
      </div>
      <div className="row">
        {nohaynada ? (
          <div className="row">
            <div className="height_articulo-noresults col-12 text-center">
              No hay artículos en esta categoría
            </div>
          </div>
        ) : (
          <>
            {map(articulos, (articulo) => (
              <Articulo articulo={articulo} nohaynada={nohaynada} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Articulo(props) {
  const { articulo, nohaynada } = props;
  const pDescontado =
    articulo.price - Math.floor(articulo.price * articulo.discount) / 100;
  const precioDescontado = pDescontado.toString().slice(0, 5);

  return (
    <div key={articulo.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
      <Link href={`/${articulo.url}`}>
        <a className="linkcard">
          <div className="card text-left">
            <div className="cover-img">
              <img
                className="card-imagen"
                src={articulo.poster}
                alt={articulo.nombre}
              />
            </div>
            <div className="card-body">
              <div class="overallContainer">
                <h4>
                  <span class="ellipsis">{articulo.nombre}...</span>
                </h4>
              </div>
              <div className="card-text d-flex justify-content-between align-items center">
                <div className="price">{precioDescontado.trim()}€</div>
                <div className="discount">
                  {!articulo.discount ? (
                    <span />
                  ) : (
                    <>
                      <span className="tachado">{articulo.price}€</span>
                      <span>- {articulo.discount}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
