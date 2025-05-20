import { getValidToken } from "@/lib/getValidToken";

// createAnIdea
export const createProject = async (formData: FormData): Promise<any> => {
  const token = await getValidToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};


export const getAllProject = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSpecificProject = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};