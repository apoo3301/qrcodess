import { NewVerificationForm } from "~/components/auth/newVerificationForm";
import { Suspense } from "react";

export default function NewVerification() {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
}
