import jwtDecode from "jwt-decode";
import { getToken, hasExpiredToken } from "Services/TokenService";

export async function authFetch(url, params, logout) {
  const token = getToken();

  if (!token) {
    //user no lkogeado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //token expirado
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          "x-token": `${token}`,
        },
      };

      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
