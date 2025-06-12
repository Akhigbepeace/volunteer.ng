import React, { Suspense } from "react";
import SelectRole from "@/app/component/suspense/join";

const Join = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectRole />
    </Suspense>
  );
};

export default Join;
