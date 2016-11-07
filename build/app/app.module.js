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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var routing_1 = require('./routing');
var device_detail_component_1 = require('./devices/detailDevice/device-detail.component');
var devices_component_1 = require('./devices/listDevice/devices.component');
var login_component_1 = require('./auth/login/login.component');
var add_device_1 = require('../app/devices/addDevice/add_device');
var http_1 = require('@angular/http');
var angularfire2_1 = require("angularfire2");
var material_1 = require('@angular/material');
var authGaurd_1 = require('./authGaurd');
// Must export the config
exports.firebaseConfig = {
    apiKey: "AIzaSyDzexd0WYSFaGeoJiolu3qNCSBLOjc3k9s",
    authDomain: "devicecupboard.firebaseapp.com",
    databaseURL: "https://devicecupboard.firebaseio.com",
    storageBucket: "devicecupboard.appspot.com",
    messagingSenderId: "76395876829"
};
var myFirebaseAuthConfig = {
    provider: angularfire2_1.AuthProviders.Password,
    method: angularfire2_1.AuthMethods.Password
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                routing_1.routing,
                http_1.HttpModule,
                angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig, myFirebaseAuthConfig),
                material_1.MaterialModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                device_detail_component_1.DeviceDetailComponent,
                devices_component_1.DevicesComponent,
                login_component_1.LoginComponent,
                add_device_1.AddDevicesComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [authGaurd_1.AuthGuard]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map