import "isomorphic-fetch"; // or import the fetch polyfill you installed
import { Client } from "@microsoft/microsoft-graph-client";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async ({ auth }) => {
    Client.init({});
    const data = await fetch("https://api.fabric.microsoft.com/v1/workspaces/8986808f-6c68-4a91-b3c4-1a38bfa8d7e1/graphqlapis/0c5175ba-3eb0-4e16-ba31-120722369a4b/graphql", {
        headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
        },
    }).then((res) => res.json());

    return NextResponse.json(data);
}
);