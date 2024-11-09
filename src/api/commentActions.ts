import axiosInstance from "./axiosInstance";

export const addComment = async (exhibitId: number, commentText: string) => {
  const response = await axiosInstance.post(
    `/api/exhibits/${exhibitId}/comments`,
    {
      text: commentText,
    }
  );
  return response;
};

export const deleteComment = async (exhibitId: number) => {
  await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments`);
};
