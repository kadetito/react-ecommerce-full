import { createContext } from "react";
import { authFetch } from "utils/Fetch";
import { getToken } from "Services/TokenService";
import { size } from "lodash";

const vari = createContext(process.env.NEXT_PUBLIC_URL_PATH);
const BASE_PATH = vari._currentValue;

export async function isFavoriteAPI(idUser, idArticulo, logout) {
  try {
    const user = `user=${idUser}`;
    const articulo = `articulo=${idArticulo}`;
    const url = `${BASE_PATH}/api/favoritos?${user}&${articulo}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    return null;
  }
}

export async function addFavoriteAPI(idUser, idArticulo, logout) {
  try {
    const toke = getToken();
    const dataFound = await isFavoriteAPI(idUser, idArticulo, logout);
    if (size(dataFound) > 0 || !dataFound) {
      return "el articulo ya esta en favoritos";
    } else {
      const url = `${BASE_PATH}/api/createfavorito?${user}&${articulo}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": toke,
        },
        body: JSON.stringify({ user: idUser, articulo: idArticulo }),
      };
      const result = await authFetch(url, params, logout);
    }
  } catch (error) {
    return null;
  }
}

export async function getArticulosByCatAPI(categoria, limit, start) {
  try {
    const categ = `${categoria}`;
    const limitItems = `limit=${limit}`;
    const sortItems = `sort=published_at:des`;
    const pageItems = `page=${start}`;

    const url = `${BASE_PATH}/api/articulos/${categ}?${pageItems}&${limitItems}&${sortItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getTotalArticlesByCatAPI(categoria) {
  try {
    const url = `${BASE_PATH}/api/articulos/count/articles/${categoria}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    return null;
  }
}

export async function getArticulobyURLandIDAPI(path) {
  try {
    const url = `${BASE_PATH}/api/articulos/detail/${path}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    return null;
  }
}
