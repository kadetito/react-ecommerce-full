import { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getLastArticulosAPI } from "Services/ArticuloService";
import { size } from "lodash";
import LoaderSpinner from "@/components/LoaderSpinner";
import ListaArticulos from "@/components/Articulos/ListaArticulos";

export default function Home() {
  const [articulos, setArticulos] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastArticulosAPI(6);

      if (size(response.articulos) > 0) {
        setArticulos(response.articulos);
      } else {
        setArticulos([]);
      }
    })();
  }, []);

  return (
    <>
      <BasicLayout className="home__global">
        {!articulos && <LoaderSpinner>Cargando artículos</LoaderSpinner>}
        {articulos && size(articulos) === 0 && <h3>No hay artículos nuevos</h3>}
        {size(articulos) > 0 && <ListaArticulos articulos={articulos} />}
      </BasicLayout>
    </>
  );
}
