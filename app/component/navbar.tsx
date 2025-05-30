import React, { Suspense } from "react";
import NavbarContent from "./suspense/navbar";

const Navbar = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
