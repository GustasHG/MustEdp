export interface ApiAdapterInterface {
    fetch: <T>(uri: string, init?: RequestInit) => Promise<T>
}

export class ApiAdapter implements ApiAdapterInterface {
    _url: string;
    public constructor() {
        this._url = "http://172.20.74.21:4042";
        // this._url = "http://localhost:4041";
    }

    public async fetch<T>(uri: string, init?: RequestInit): Promise<T> {
        const request = await fetch(`${this._url}${uri}`, init);
        if (!request.ok) {
            throw new Error(request.statusText);
        }
        const response = await request.json();
        if (response?.message && response?.statusCode) {
            throw new Error(response.message);
        }
        return response;
    }
}