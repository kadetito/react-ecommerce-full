import React, { useEffect, useState } from "react";
import { size } from "lodash";
import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { isFavoriteAPI } from "Services/FavoritosService";
import useAuth from "hooks/useAuth";
import LoaderSpinner from "@/components/LoaderSpinner";
import classNames from "classnames";

export default function ArticuloDetalle({ item }) {
  const { auth, logout } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      if (item.articulo) {
        const response = await isFavoriteAPI(
          auth.idUser,
          item.articulo._id,
          logout
        );
        if (size(response) > 0) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    })();
  }, [item]);

  const pDescontado =
    item.articulo?.price -
    Math.floor(item.articulo?.price * item.articulo?.discount) / 100;
  const precioDescontado = pDescontado.toString().slice(0, 5);

  const addFavorite = () => {
    console.log("add");
  };

  const deleteFavorite = () => {
    console.log("delete");
  };

  return (
    item.articulo && (
      <div className="container articulo__global">
        <div className="row mt-5 mb-5">
          <div className="col-12">
            <div className="row mt-5 mb-5">
              <div class="col-12 col-sm-12 col-md-4 col-xl-4 text-center">
                <img src={item.articulo.poster} alt={item.articulo.nombre} />
              </div>
              <div class="col-12 col-sm-12 col-md-8 col-xl-8">
                <div className="d-flex justify-content-between align-items-end">
                  <h2>{item.articulo.nombre}</h2>
                  <span>
                    <FontAwesomeIcon
                      className={classNames({ like: isFavorite })}
                      size="sx"
                      icon={isFavorite ? faHeart : farHeart}
                      onClick={isFavorite ? deleteFavorite : addFavorite}
                    />
                    {isFavorite ? <>Juego favorito</> : <>Marcar favorito</>}
                  </span>
                </div>

                <div className="d-flex justify-content-start">
                  <div className="price">{precioDescontado.trim()}€</div>
                  <div className="ms-3 discount">
                    {!item.articulo.discount ? (
                      <span />
                    ) : (
                      <>
                        <span className="tachado">{item.articulo.price}€</span>
                        <span>- {item.articulo.discount}%</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <p
                    dangerouslySetInnerHTML={{ __html: item.articulo.summary }}
                  />
                </div>

                <div className="d-flex justify-content-start">
                  <div>
                    <BotonPositivo type="submit" textButton="Comprar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
