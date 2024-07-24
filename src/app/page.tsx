import { auth } from "@/auth";

import AuthButton from "./AuthButton.server";
import { NavMenu } from "@/components/NavMenu";

export default async function Home() {
  const session = await auth();

  return (
    <>
    <AuthButton />
    </>
  );
}
