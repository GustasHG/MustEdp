export interface IMustApiAdapter {
    fetch: <T>(uri: string, init?: RequestInit) => Promise<T>
}


export class MustApiAdapter implements IMustApiAdapter {
    _url: string;
    public constructor() {
        // this._url = "http://172.20.74.21:4042";
        this._url = "http://localhost:4042";
    }

    public async fetch<T>(uri: string, init?: RequestInit): Promise<T> {
        const request = await fetch(`${this._url}${uri}`, init);
        return await request.json();
    }
}