import { createContext } from "react";
import { authFetch } from "utils/Fetch";
import { getToken } from "Services/TokenService";

const vari = createContext(process.env.NEXT_PUBLIC_URL_PATH);
const BASE_PATH = vari._currentValue;

export async function getCategoriasAPI() {
  try {
    const url = `${BASE_PATH}/api/categorias`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    return null;
  }
}
