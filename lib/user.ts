export const getUserId = async () => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user_data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};
