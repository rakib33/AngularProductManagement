var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var HttpDataService = /** @class */ (function () {
    function HttpDataService(_http) {
        this._http = _http;
    }
    HttpDataService.prototype.get = function (url, paramObj) {
        if (paramObj != undefined && paramObj != null) {
            //let params = new HttpParams();
            //Object.keys(paramObj).forEach(function (key) {
            //    params = params.append(key, paramObj[key]);
            //});
            //return this._http.get(url, params);
            //Since Angular 5.0.0-beta.6
            return this._http.get(url, { params: paramObj });
        }
        else {
            return this._http.get(url);
        }
    };
    HttpDataService.prototype.getWithoutCache = function (url, paramObj) {
        var headers = new HttpHeaders()
            .set('Cache-Control', 'no-cache')
            .set('Pragma', 'no-cache')
            .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
        if (paramObj != undefined && paramObj != null) {
            //let params = new HttpParams();
            //Object.keys(paramObj).forEach(function (key) {
            //    params = params.append(key, paramObj[key]);
            //});
            //return this._http.get(url, params);
            //Since Angular 5.0.0-beta.6
            return this._http.get(url, { params: paramObj, headers: headers });
        }
        else {
            return this._http.get(url, { headers: headers });
        }
    };
    HttpDataService.prototype.post = function (url, model) {
        var body;
        if (typeof model === 'string' || model instanceof String) {
            body = model;
        }
        else {
            body = JSON.stringify(model);
        }
        //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(url, body, { headers: headers });
    };
    HttpDataService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(url + id, body, { headers: headers });
    };
    HttpDataService.prototype.delete = function (url, id) {
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(url + id, { headers: headers });
    };
    HttpDataService.prototype.parseErrorMessage = function (err) {
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            //console.log('An error occurred:', err.error.message);  
            return err.error.message;
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            return err.error;
        }
    };
    var _a;
    HttpDataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object])
    ], HttpDataService);
    return HttpDataService;
}());
export { HttpDataService };
//# sourceMappingURL=http-data.service.js.map