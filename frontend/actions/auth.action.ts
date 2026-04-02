import { AUTH_CRED } from "@/utils/constants";
import Cookie from "js-cookie";

export const createAuthCookie = async (token: string) => {
  Cookie.set(AUTH_CRED, token);
};

export const deleteAuthCookie = async () => {
  // Cookie.delete("userAuth");
  Cookie.remove(AUTH_CRED);
};
