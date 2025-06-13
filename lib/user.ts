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
  role: Role;
};

type OnboardingProps = {
  volunteer?: VolunteerOnboardingData;
  organization?: OrganizationOnboardingForm;
};

const getUser = async () => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();

  return res as User;
};

const handleSelectRole = async (props: SelectRoleProp) => {
  const { role } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-type`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const handleVolunteerOnboarding = async (props: OnboardingProps) => {
  const { volunteer } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-data`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        volunteer,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const handleOrganizationOnboarding = async (props: OnboardingProps) => {
  const { organization } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-data`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
