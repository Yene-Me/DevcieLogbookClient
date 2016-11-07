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
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var core_2 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(af, router) {
        this.af = af;
        this.router = router;
        this.title = 'Device List';
    }
    AppComponent.prototype.logout = function () {
        this.af.auth.logout();
        this.router.navigateByUrl('login');
    };
    AppComponent = __decorate([
        core_2.NgModule({
            imports: [material_1.MaterialModule.forRoot()]
        }),
        core_1.Component({
            selector: 'my-app',
            templateUrl: './dashboard.html'
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map