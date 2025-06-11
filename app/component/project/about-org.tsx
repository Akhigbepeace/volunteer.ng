import { Project } from "@/data/project";
import { IoLogoAppleAr } from "react-icons/io5";

type AboutOrgProps = {
  project: Project;
};

const AboutOrg = ({ project }: AboutOrgProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left/Main Content */}
        <div className="md:col-span-2 p-6">
          <h2 className="text-2xl font-bold text-primary">About the org</h2>

          <p className="text-gray-700 mt-1">{project.orgName}</p>

          {/* Causes */}
          {project.causes?.length > 0 && (
            <>
              <h3 className="text-md font-bold text-gray-800 mt-4">Causes</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.causes.map((cause) => (
                  <span
                    key={cause}
                    className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-lg"
                  >
                    {cause}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Posted By */}
          <h3 className="text-md font-bold text-gray-800 mt-4">Posted by</h3>
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-900 font-bold">
              {project.orgName
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">{project.orgName}</p>
              <p className="text-sm text-gray-600">Organization Admin</p>
            </div>
          </div>

          {/* Mission */}
          <h3 className="text-md font-bold text-gray-800 mt-4">Our mission</h3>
          <p className="text-gray-700 mt-2">
            {project.description || "No mission provided."}
          </p>

          {/* What we do */}
          {project.requirements && project.requirements?.length > 0 && (
            <>
              <h3 className="text-md font-bold text-gray-800 mt-4">
                What we do
              </h3>
              <p className="text-gray-700 mt-2">
                {project.requirements.join(" - ")}
              </p>
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">✨ Fun Fact</h3>
          <p className="text-gray-700 mt-3">
            Our volunteers enjoy meaningful impact and gain real-world
            experience through {project.heading.toLowerCase()}. We’re just{" "}
            <span className="font-bold">5 minutes</span> from a landmark!
          </p>
          <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            More about the org
          </button>

          {/* Sponsor */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 text-sm">
              Our project is sponsored by:
            </p>
            <div className="flex justify-center mt-3">
              <IoLogoAppleAr size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOrg;
