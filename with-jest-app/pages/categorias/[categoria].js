import BasicLayout from "layouts/BasicLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getArticulosByCatAPI,
  getTotalArticlesByCatAPI,
} from "Services/ArticuloService";
import { map, size } from "lodash";
import ListaArticulos from "@/components/Articulos/ListaArticulos";
import LoaderSpinner from "@/components/LoaderSpinner";
import Paginador from "@/components/Paginador";

/**
 *
 *
 *
 *   TODO reparar el paginador, no funciona bien, revisar backend endpoint
 *
 *
 *
 *
 */
const limitPerPage = 6;
export default function Categoria() {
  const { query } = useRouter();
  const [articulos, setArticulos] = useState(null);
  const [totalArticulos, setTotalArticulos] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) {
      return 0;
    } else {
      return currentPages * limitPerPage - limitPerPage;
    }
  };
  console.log("Apgoina actual", getStartItem());
  useEffect(() => {
    (async () => {
      if (query.categoria) {
        const response = await getArticulosByCatAPI(
          query.categoria,
          limitPerPage,
          getStartItem()
        );
        setArticulos(response.articulos);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      if (query.categoria) {
        const response = await getTotalArticlesByCatAPI(query.categoria);
        setTotalArticulos(response.total);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="categorias__global">
      {!articulos && <LoaderSpinner />}
      {articulos && size(articulos) === 0 && (
        <ListaArticulos nohaynada={true} />
      )}
      {size(articulos) > 0 && (
        <ListaArticulos articulos={articulos} nohaynada={false} />
      )}

      {totalArticulos ? (
        <Paginador
          totalArticulos={totalArticulos}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
