import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Head } from "../seo/head";
import { PATHS } from "@/app/paths";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = {
    data: null,
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(PATHS.app.root, {
        replace: true,
      });
    }
  }, [user.data, navigate]);

  return (
    <>
      <Head title={title} />
      <div className="max-w-lg mx-auto mt-4 shadow-md p-4">
        <h1 className="text-lg font-semibold mb-4">{title}</h1>
        {children}
      </div>
    </>
  );
};
