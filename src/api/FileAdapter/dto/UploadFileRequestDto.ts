export interface UploadFileRequestDto {
    path: string;
    contents: string;
    overwrite: boolean;
}