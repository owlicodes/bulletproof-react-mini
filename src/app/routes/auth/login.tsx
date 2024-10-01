import { PATHS } from "@/app/paths";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="Login to your account">
      <LoginForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : PATHS.app.root}`, {
            replace: true,
          })
        }
      />
      <div className="mt-4 text-center">
        <Link
          to={`${PATHS.auth.register}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
          className="text-blue-500 hover:underline"
        >
          Register instead.
        </Link>
      </div>
    </AuthLayout>
  );
};
