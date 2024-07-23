import NextAuth, { User, NextAuthConfig } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
 
export const BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
    providers: [
        MicrosoftEntraID({
        clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
        tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      })
    ],
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)