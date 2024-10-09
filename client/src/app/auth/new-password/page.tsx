import { NewPasswordForm } from "~/components/auth/newPasswordForm";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
}
