import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { JobRunResponseDto } from "./dto/JobRunResponseDto";
import { JobRunRequestDto } from "./dto/JobRunRequestDto";

export interface JobAdapterInterface {

}

export class JobAdapter implements JobAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async run(payload: JobRunRequestDto): Promise<JobRunResponseDto> {
        return await this._adapter.fetch(
            "/databricks/job/run",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(payload)
            }
        );
    }
}