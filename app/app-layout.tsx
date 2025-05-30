"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "@/context/user-context";
import { ReactNode } from "react";

type AppLayoutProp = { children: ReactNode };

const AppLayout = ({ children }: AppLayoutProp) => {
  const pathname = usePathname();

  const hiddenRoutes = ["/", "/404"];
  const shouldHideLayout = hiddenRoutes.includes(pathname);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <UserProvider>
        {!shouldHideLayout && <Navbar />}

        {children}

        {!shouldHideLayout && <Footer />}
      </UserProvider>
    </GoogleOAuthProvider>
  );
};

export default AppLayout;
