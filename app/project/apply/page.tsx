import ProjectApplication from "@/app/component/suspense/apply";
import React, { Suspense } from "react";

const ProjectApplyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectApplication />
    </Suspense>
  );
};

export default ProjectApplyPage;
