import { useLogout } from "@/lib/auth";
import { Button } from "../ui/button";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const logout = useLogout();

  return (
    <div className="min-h-screen w-full">
      <header className="h-[50px] bg-blue-950 flex items-center justify-between text-white px-8">
        <h1 className="font-semibold text-lg">Bulletproof React Mini</h1>

        <Button onClick={() => logout.mutate({})} variant="secondary">
          Logout
        </Button>
      </header>
      <main className="min-h-[calc(100vh-50px)] max-w-3xl mx-auto pt-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
