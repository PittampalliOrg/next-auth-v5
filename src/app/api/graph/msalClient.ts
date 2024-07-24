import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "d9593e50-9bc9-438b-8e8a-50af69660f1e",
        authority: "https://login.microsoftonline.com/0c4da9c5-40ea-4e7d-9c7a-e7308d4f8e38",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
    system: {
        allowNativeBroker: false, // Disables WAM Broker
    }
};


export const msalInstance = new PublicClientApplication(msalConfig);
