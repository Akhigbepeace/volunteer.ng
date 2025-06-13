const handleUserLogout = async () => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};

export { handleUserLogout };
