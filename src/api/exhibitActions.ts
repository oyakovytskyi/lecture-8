import axiosInstance from "./axiosInstance";

export const fetchExhibits = async (page: number, limit: number) => {
  const response = await axiosInstance.get(
    `/api/exhibits?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const fetchMyExhibits = async (page: number, limit: number) => {
  const response = await axiosInstance.get(
    `/api/exhibits/my-posts?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const addExhibit = async (formData: FormData) => {
  return await axiosInstance.post("/api/exhibits", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteExhibit = async (exhibitId: number) => {
  return axiosInstance.delete(`/api/exhibits/${exhibitId}`);
};

export const fetchExhibitById = async (id: number) => {
  const response = await axiosInstance.get(`/api/exhibits/post/${id}`);
  return response.data;
};
