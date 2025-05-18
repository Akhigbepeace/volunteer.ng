type SelectRoleProp = {
  userId: string | null;
  role: string;
};

const getUserId = async () => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user_data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};

const handleSelectRole = async (props: SelectRoleProp) => {
  const { userId, role } = props;

  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user_data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      role,
    }),
  });

  const res = await apiRes.json();
  return res;
};

export { getUserId, handleSelectRole };
