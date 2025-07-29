'use client';

import { useUserSetup } from "@/app/utils/auth-utils";

export default function UserSetupWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will ensure the user is created in Firestore when they sign in
  useUserSetup();

  return <>{children}</>;
}
