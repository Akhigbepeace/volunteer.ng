"use client";
import { RiUserCommunityLine } from "react-icons/ri";
import { GoOrganization } from "react-icons/go";
import { handleSelectRole, Role } from "@/lib/user";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const Join = () => {
  const router = useRouter();
  const cookies = new Cookies();

  const user = cookies.get("user");
  const userId = user?.id;

  console.log("Join User", user);

  const handleRoleSelection = async (role: Role) => {
    try {
      if (!userId) return;

      const data = await handleSelectRole({
        userId,
        role,
      });

      if (data.status.email !== "") {
        if (role === "volunteer") {
          router.push("/onboarding/volunteer");
        } else {
          router.push("/onboarding/org");
        }
      }
    } catch (error) {
      console.log("Error selecting role:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="text-center mt-12">
        <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
        <p className="text-gray-600 mt-2">
          Join a community of people who care as much as you do
        </p>
      </div>

      <div className="w-full bg-tertiary mt-8 p-10 rounded-lg">
        <h2 className="text-xl font-bold text-center">
          Which type of account would you like?
        </h2>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => handleRoleSelection("volunteer")}
            className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-6 w-full md:w-1/2 cursor-pointer hover:shadow-md transition"
          >
            <RiUserCommunityLine size={80} />
            <h1 className="text-3xl font-semibold text-gray-900 mt-3">
              Volunteer
            </h1>
            <p className="text-gray-600 text-center mt-1">
              I&apos;m a professional looking to volunteer
            </p>
          </button>

          <button
            onClick={() => handleRoleSelection("organization")}
            className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-6 w-full md:w-1/2 cursor-pointer hover:shadow-md transition"
          >
            <GoOrganization size={80} />
            <h1 className="text-3xl font-semibold text-gray-900 mt-3">
              Organization
            </h1>
            <p className="text-gray-600 text-center mt-1">
              My organization is looking for volunteers
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
