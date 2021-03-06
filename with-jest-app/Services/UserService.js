import { createContext } from "react";
import { authFetch } from "utils/Fetch";
import { getToken } from "Services/TokenService";
import jwtDecode from "jwt-decode";

const vari = createContext(process.env.NEXT_PUBLIC_URL_PATH);
const BASE_PATH = vari._currentValue;

export async function registroUsuarioAPI(formData) {
  try {
    const url = `${BASE_PATH}/api/usuarios`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("ERROR", error);
    return;
  }
}

/**
 * LOGIN
 *
 */
export async function loginUsuarioAPI(formData) {
  try {
    const url = `${BASE_PATH}/api/login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("ERROR", error);
    return;
  }
}

export async function resetPasswordAPI(email) {
  try {
    //TODO enviar email para cambiar contraseña en el servidor
  } catch (error) {
    return null;
  }
}

export async function getMeAPI(logout) {
  try {
    const toke = getToken();
    if (toke) {
      const uid = jwtDecode(toke).uid;
      const url = `${BASE_PATH}/api/usuarios/${uid}`;
      const result = await authFetch(url, null, logout);
      return result ? result : null;
    } else {
      return;
    }
  } catch (error) {
    return null;
  }
}

export async function updateUserAPI(idUser, data, logout) {
  try {
    const toke = getToken();
    const url = `${BASE_PATH}/api/usuarios/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateEmailAPI(idUser, data, logout) {
  try {
    const toke = getToken();
    const url = `${BASE_PATH}/api/usuarios/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updatePasswordAPI(idUser, password, logout) {
  try {
    const toke = getToken();
    const url = `${BASE_PATH}/api/usuarios/updp/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": toke,
      },
      body: JSON.stringify({ password: password }),
    };
    console.log(params);
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
