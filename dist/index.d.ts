import { ServerAdapter, HttpRequest, HttpResponse } from 'vulcain-corejs';
import * as express from 'express';
export declare class ExpressAdapter extends ServerAdapter {
    protected express: any;
    constructor();
    startAsync(port: number, callback: (err) => void): void;
    protected initializeRoutes(express: any): void;
    registerRoute(verb: string, path: string, handler: (request: HttpRequest) => HttpResponse): void;
    registerNativeRoute(verb: string, path: string, handler: (request: express.Request, res: express.Response) => void): void;
}
