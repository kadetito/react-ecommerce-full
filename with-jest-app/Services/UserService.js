import { createContext } from "react";

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
