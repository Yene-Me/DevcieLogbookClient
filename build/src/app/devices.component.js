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
var device_service_1 = require('./device.service');
require('../../public/css/styles.css');
require('../../public/css/bootstrap.css');
var DevicesComponent = (function () {
    function DevicesComponent(deviceService) {
        this.deviceService = deviceService;
        this.name = "Camden";
    }
    DevicesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    DevicesComponent.prototype.getHeroes = function () {
        this.devices = this.deviceService.getHeroes();
    };
    DevicesComponent.prototype.onSelect = function (device) {
        this.selectDevice = device;
    };
    DevicesComponent = __decorate([
        core_1.Component({
            selector: 'my-devices',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], DevicesComponent);
    return DevicesComponent;
}());
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map