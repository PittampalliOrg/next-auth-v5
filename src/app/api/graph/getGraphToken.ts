// utils/getGraphToken.ts
import { msalInstance } from "./authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { getSession } from "next-auth/react";

export const getGraphToken = async () => {
  const session = await getSession();
  if (!session) throw new Error("No active session");

  const account = msalInstance.getAllAccounts()[0];
  if (!account) throw new Error("No active account");

  const request = {
    scopes: ["https://graph.microsoft.com/.default"],
    account,
  };

  try {
    const response = await msalInstance.acquireTokenSilent(request);
    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const response = await msalInstance.acquireTokenPopup(request);
      return response.accessToken;
    } else {
      throw error;
    }
  }
};
