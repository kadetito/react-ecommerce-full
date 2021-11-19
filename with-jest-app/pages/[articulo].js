import ArticuloDetalle from "@/components/Articulos/ArticuloDetalle";
import LoaderSpinner from "@/components/LoaderSpinner";
import { queryAllByAltText } from "@testing-library/dom";
import BasicLayout from "layouts/BasicLayout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getArticulobyURLandIDAPI } from "Services/ArticuloService";

export default function Articulo() {
  const [articulo, setArticulo] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getArticulobyURLandIDAPI(query.articulo);
      setArticulo(response);
    })();
  }, [query]);

  if (!articulo) return <LoaderSpinner />;
  return (
    <BasicLayout>
      <ArticuloDetalle item={articulo} />
    </BasicLayout>
  );
}
