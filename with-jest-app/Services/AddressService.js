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

export async function deleteAddressesAPI(idAddress, logout) {
  try {
    const toke = getToken();
    const url = `${BASE_PATH}/api/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateAddressesAPI(idAddress, address, logout) {
  try {
    const toke = getToken();
    const url = `${BASE_PATH}/api/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
      body: JSON.stringify(address),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
