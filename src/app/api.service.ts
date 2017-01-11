export abstract class APIService {

    private _url: string = 'http://localhost:3030/';

    get url(): string {
        return this._url;
    }

}