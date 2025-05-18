<<<<<<< HEAD
type SelectRoleProp = {
  userId: string | null;
  role: string;
};

const getUserId = async () => {
=======
export const getUserId = async () => {
>>>>>>> 8bf0bf70aea28be2c1677d0cbadee319e19bb860
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user_data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};
<<<<<<< HEAD

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
=======
>>>>>>> 8bf0bf70aea28be2c1677d0cbadee319e19bb860
