import { auth } from "@/auth";

interface User {
    "@odata.context": string;
    "@microsoft.graph.tips": string;
    businessPhones: string[];
    displayName: string;
    givenName: string;
    jobTitle: string | null;
    mail: string;
    mobilePhone: string;
    officeLocation: string | null;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
    id: string;
  }
  

export default async function ServerPage() {
    const session = await auth();
    const me: User = await fetch("https://graph.microsoft.com/v1.0/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session?.accessToken}`
        }
    }).then((res) => res.json());


    return(
        <main>
            <h1 className="text-3xl font-bold">Server Page</h1>
            <p>{JSON.stringify(me)}</p>
        
        </main>
    )
}
