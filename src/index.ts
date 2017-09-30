import { Injectable, LifeTime, DefaultServiceNames, Conventions, ServerAdapter, HttpRequest, HttpResponse } from 'vulcain-corejs';
import * as express from 'express';
import * as Path from 'path';
const bodyParser = require('body-parser');

@Injectable(LifeTime.Singleton, DefaultServiceNames.ServerAdapter)
export class ExpressAdapter extends ServerAdapter {

    protected express;

    constructor() {
        super();
        this.express = express();
    }

    startAsync(port: number, callback: (err) => void) {
        this.initializeRoutes(this.express );
        this.express.listen(port, callback);
    }

    protected initializeRoutes(express) {
        express.use(bodyParser.urlencoded({ extended: true }));
        express.use(bodyParser.json());

        // Actions and query
        // POST/GET /api/...
        let url = Path.join(Conventions.instance.defaultUrlprefix, ":verb/:id?");
        express.get(url, (req, res) => {
            super.processVulcainRequest(req, res, req.body);
        });

        url = Path.join(Conventions.instance.defaultUrlprefix, ":verb");
        express.post(url, (req, res) => {
            super.processVulcainRequest(req, res, req.body);
        });
    }

    registerRoute(verb: string, path: string, handler: (request: HttpRequest) => HttpResponse) {
        this.express[verb](path, (req: express.Request, res) => {
            let result = handler(super.createRequest(req));
            super.sendResponse(res, result);
        });
    }

    registerNativeRoute(verb: string, path: string, handler: (request: express.Request, res: express.Response) => void) {
        this.express[verb](path, handler);
    }
}
