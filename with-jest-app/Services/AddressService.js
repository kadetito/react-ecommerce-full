import { createContext } from "react";
import { authFetch } from "utils/Fetch";
import { getToken } from "Services/TokenService";
import jwtDecode from "jwt-decode";

const vari = createContext(process.env.NEXT_PUBLIC_URL_PATH);
const BASE_PATH = vari._currentValue;

export async function newAddressAPI(address, idUser, logout) {
  try {
    const toke = getToken();
    const url = `${BASE_PATH}/api/addresses/${idUser}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.error("ERROR", error);
    return;
  }
}

export async function getAddressesAPI(idUser, logout) {
  try {
    const toke = getToken();
    console.log("UEUEUE", idUser);
    const url = `${BASE_PATH}/api/addresses/${idUser}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
}
