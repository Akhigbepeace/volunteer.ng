import { VolunteerOnboardingData } from "@/app/onboarding/volunteer/page";

export type Role = "volunteer" | "organization";

type SelectRoleProp = {
  userId: string | null;
  role: Role;
};

type VolunteerOnboardingProp = {
  userId: string;
  volunteer: VolunteerOnboardingData;
};

const handleSelectRole = async (props: SelectRoleProp) => {
  const { userId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-type`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        volunteer: "",
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const handleVolunteerOnboarding = async (props: VolunteerOnboardingProp) => {
  const { userId, volunteer } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        volunteer,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

export { handleSelectRole, handleVolunteerOnboarding };
