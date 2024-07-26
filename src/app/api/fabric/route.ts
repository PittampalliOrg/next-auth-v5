import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';


const msal = require('@azure/msal-node');
const cca = new msal.ConfidentialClientApplication(config);

const loginRequest = {
    scopes: ["https://analysis.windows.net/powerbi/api/.default"]
};

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphqlData, setGraphqlData] = useState(null);
  const [display, setDisplay] = useState(false);

  function RequestGraphQL() {
      // Silently acquires an access token which is then attached to a request for GraphQL data
      instance
          .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
          })
          .then((response) => {
              callGraphQL(response.accessToken).then((response) => setGraphqlData(response));
          });
  }

export const GET = auth(async ({ auth }) => {
    const query = `query {
        rms {
          items {
            manager_displayName
          }
        }
      }`;

    const data = await fetch("https://api.fabric.microsoft.com/v1/workspaces/8986808f-6c68-4a91-b3c4-1a38bfa8d7e1/graphqlapis/0c5175ba-3eb0-4e16-ba31-120722369a4b/graphql", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify({
            query: query
        })
    }).then((res) => res.json());

    return NextResponse.json(data);
}
);