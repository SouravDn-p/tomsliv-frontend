import { baseApi } from "@/redux/hooks/baseApi";
import { FileUploadResponse } from "@/redux/types/FileUpload.Type";

export const fileUploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<FileUploadResponse, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append("files", file);

                return {
                    url: "/upload",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { useUploadFileMutation } = fileUploadApi;
