import { OrganizationOnboardingForm } from "@/app/onboarding/org/page";
import { VolunteerOnboardingData } from "@/app/onboarding/volunteer/page";
import Cookies from "universal-cookie";

export type Role = "volunteer" | "organization";

type User = {
  displayName: string;
  email: string;
  image: string;
  role: Role;
};

type SelectRoleProp = {
  role: Role;
};

type OnboardingProps = {
  volunteer?: VolunteerOnboardingData;
  organization?: OrganizationOnboardingForm;
};

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const cookies = new Cookies();
  return cookies.get("authToken") || null;
};

// Helper function to create authenticated headers
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const getUser = async () => {
  const token = getAuthToken();

  if (!token) return;

  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    headers: getAuthHeaders(),
  });

  if (!apiRes.ok) {
    throw new Error(`Failed to fetch user: ${apiRes.status}`);
  }

  const res = await apiRes.json();
  return res as User;
};

const handleSelectRole = async (props: SelectRoleProp) => {
  const { role } = props;
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-type`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        role,
      }),
    }
  );

  if (!apiRes.ok) {
    throw new Error(`Failed to save user role: ${apiRes.status}`);
  }

  const res = await apiRes.json();
  return res;
};

const handleVolunteerOnboarding = async (props: OnboardingProps) => {
  const { volunteer } = props;
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-data`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        volunteer,
      }),
    }
  );

  if (!apiRes.ok) {
    throw new Error(`Failed to save volunteer data: ${apiRes.status}`);
  }

  const res = await apiRes.json();
  return res;
};

const handleOrganizationOnboarding = async (props: OnboardingProps) => {
  const { organization } = props;
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-user-data`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        organization,
      }),
    }
  );

  if (!apiRes.ok) {
    throw new Error(`Failed to save organization data: ${apiRes.status}`);
  }

  const res = await apiRes.json();
  return res;
};

export {
  getUser,
  handleSelectRole,
  handleVolunteerOnboarding,
  handleOrganizationOnboarding,
  getAuthToken,
};

export type { User };
