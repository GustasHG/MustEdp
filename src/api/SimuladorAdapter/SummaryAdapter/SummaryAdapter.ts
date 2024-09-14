import { ApiAdapterInterface } from "@/api/ApiAdapter/ApiAdapter";
import { GetSummaryDataDto } from "./dto/GetSummaryDataDto";
import { SummaryFilterDto } from "./dto/SummaryFilterDto";
import { SummaryData } from "./SummaryData";

export interface ISummaryAdapter {
    /**
     * @async
     * @param {SummaryFilterDto} filter 
     * @returns {Promise<SummaryData[]>}
     * @throws {Error}
     */
    get(filter: SummaryFilterDto): Promise<SummaryData[]>;
}


export class SummaryAdapter implements ISummaryAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SummaryFilterDto): Promise<SummaryData[]> {
        const data: GetSummaryDataDto = await this._adapter.fetch(
            "/summary",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ...filter })
            }
        );
        return data.summary;
    }
}


