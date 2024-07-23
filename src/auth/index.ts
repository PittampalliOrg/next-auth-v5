import NextAuth, { User, NextAuthConfig } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
 
export const BASE_PATH = '/api/auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      return {
        ...session,
        accessToken: token.accessToken as string
      }
    }
  }
})
