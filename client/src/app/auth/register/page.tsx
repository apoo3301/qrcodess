import { RegisterForm } from "~/components/auth/registerForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />;
    </Suspense>
  );
}
