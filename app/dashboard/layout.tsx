import React, { ReactNode } from "react";
// import Navbar from "../component/navbar";
import Footer from "../component/footer";

type DashboardLayoutProp = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProp) => {
  return (
    <>
      {/* <Navbar /> */}

      {children}

      <Footer />
    </>
  );
};

export default DashboardLayout;
