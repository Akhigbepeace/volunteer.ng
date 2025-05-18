export type Role = "volunteer" | "organization";

type SelectRoleProp = {
  userId: string | null;
  role: Role;
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

export { handleSelectRole };
