import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/auth";

export const DashboardRoute = () => {
  const logout = useLogout();

  return (
    <div>
      <h1>Dashboard Page</h1>

      <Button onClick={() => logout.mutate()}>Logout</Button>
    </div>
  );
};
