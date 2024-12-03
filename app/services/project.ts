export const getProjectDataById = async (id: string) => {
  const response = await fetch(
    `https://automotiveplace.vercel.app/api/project/get-project?id=${id}`
  );
  console.log(await response.json(), "res");
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result = await response.json();
  console.log(result, "result");
  return result;
};
