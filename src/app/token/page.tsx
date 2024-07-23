import { auth } from "@/auth";

export default async function ServerPage() {
    const session = await auth();
    const me = await fetch("https://graph.microsoft.com/v1.0/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session?.accessToken}`
        }
    }).then((res) => res.json());


    return(
        <main>
            <h1 className="text-3xl font-bold">Server Page</h1>
        
        </main>
    )
}
