import { OrganizationOnboardingForm } from "@/app/onboarding/org/page";
import { VolunteerOnboardingData } from "@/app/onboarding/volunteer/page";

export type Role = "volunteer" | "organization";

type User = {
  displayName: string;
  email: string;
  image: string;
  role: "organization" | "volunteer";
};

type SelectRoleProp = {
  userId: string | null;
  role: Role;
};

type OnboardingProps = {
  userId: string;
  volunteer?: VolunteerOnboardingData;
  organization?: OrganizationOnboardingForm;
};

const getUser = async (userId: string) => {
  console.log(userId, "userID in req");
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      userId: String(userId),
    },
  });

  const res = await apiRes.json();

  return res as User;
};

const handleSelectRole = async (props: SelectRoleProp) => {
  const { userId, role } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-type`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        role,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const handleVolunteerOnboarding = async (props: OnboardingProps) => {
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

const handleOrganizationOnboarding = async (props: OnboardingProps) => {
  const { userId, organization } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        organization,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

export {
  getUser,
  handleSelectRole,
  handleVolunteerOnboarding,
  handleOrganizationOnboarding,
};

export type { User };
