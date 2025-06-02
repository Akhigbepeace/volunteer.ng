import { Suspense } from "react";
import ExploreContent from "../component/suspense/explore-content";

const Explore = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
};

export default Explore;
