"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const vulcain_corejs_1 = require("vulcain-corejs");
const express = require("express");
const Path = require("path");
const bodyParser = require('body-parser');
let ExpressAdapter = class ExpressAdapter extends vulcain_corejs_1.ServerAdapter {
    constructor() {
        super();
        this.express = express();
    }
    startAsync(port, callback) {
        this.initializeRoutes(this.express);
        this.express.listen(port, callback);
    }
    initializeRoutes(express) {
        express.use(bodyParser.urlencoded({ extended: true }));
        express.use(bodyParser.json());
        // Actions and query
        // POST/GET /api/...
        let url = Path.join(vulcain_corejs_1.Conventions.instance.defaultUrlprefix, ":verb/:id?");
        express.get(url, (req, res) => {
            super.processVulcainRequest(req, res, req.body);
        });
        url = Path.join(vulcain_corejs_1.Conventions.instance.defaultUrlprefix, ":verb");
        express.post(url, (req, res) => {
            super.processVulcainRequest(req, res, req.body);
        });
    }
    registerRoute(verb, path, handler) {
        this.express[verb](path, (req, res) => {
            let result = handler(super.createRequest(req));
            super.sendResponse(res, result);
        });
    }
    registerNativeRoute(verb, path, handler) {
        this.express[verb](path, handler);
    }
};
ExpressAdapter = __decorate([
    vulcain_corejs_1.Injectable(vulcain_corejs_1.LifeTime.Singleton, vulcain_corejs_1.DefaultServiceNames.ServerAdapter),
    __metadata("design:paramtypes", [])
], ExpressAdapter);
exports.ExpressAdapter = ExpressAdapter;
//# sourceMappingURL=index.js.map