import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async ({ auth }) => {
    const data = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
        headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
        },
    }).then((res) => res.json());

    return NextResponse.json(data);
}
);