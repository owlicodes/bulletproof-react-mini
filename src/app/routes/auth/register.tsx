import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { AuthLayout } from "@/components/layouts/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";
import { PATHS } from "@/app/paths";

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="Register your account">
      <RegisterForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : PATHS.app.root}`, {
            replace: true,
          })
        }
      />
      <div className="mt-4 text-center">
        <Link
          to={`${PATHS.auth.login}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
          className="text-blue-500 hover:underline"
        >
          Login instead.
        </Link>
      </div>
    </AuthLayout>
  );
};
