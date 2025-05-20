import { getValidToken } from "@/lib/getValidToken";

export const createBlog = async (formData: FormData): Promise<any> => {
  const token = await getValidToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

export const getAllBlog = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs`,
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

export const getSpecificBlog = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`,
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