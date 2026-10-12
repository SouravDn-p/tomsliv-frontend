export type UploadedFile = {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: string; // "document" | "video" | "image" | etc.
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
};

export type FileUploadData = {
    files: UploadedFile[];
    count: number;
};

export type FileUploadResponse = {
    success: boolean;
    message: string;
    data: FileUploadData;
};
