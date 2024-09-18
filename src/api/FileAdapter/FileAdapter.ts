import { UploadFileRequestDto } from "./dto/UploadFileRequestDto";
import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";

export interface FileAdapterInterface {
    upload: (payload: UploadFileRequestDto) => Promise<{}>
}

export class FileAdapter implements FileAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async upload(payload: UploadFileRequestDto): Promise<{}> {
        return await this._adapter.fetch(
            "/databricks/file",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(payload)
            }
        );
    }
}