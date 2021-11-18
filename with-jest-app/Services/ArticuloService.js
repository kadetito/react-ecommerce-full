import { createContext } from "react";
import { authFetch } from "utils/Fetch";
import { getToken } from "Services/TokenService";

const vari = createContext(process.env.NEXT_PUBLIC_URL_PATH);
const BASE_PATH = vari._currentValue;

export async function getLastArticulosAPI(limit) {
  try {
    const limitItems = `limit=${limit}`;
    const sortItems = `sort=published_at:des`;
    const pageItems = `page=1`;

    const url = `${BASE_PATH}/api/articulos?${pageItems}&${limitItems}&${sortItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
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
