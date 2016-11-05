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
var device_log_component_1 = require('../deviceRecord/device-log.component');
var angularfire2_1 = require('angularfire2');
require('../../../public/css/styles.css');
require('../../../public/css/bootstrap.css');
var DevicesComponent = (function () {
    function DevicesComponent(af) {
        this.name = "Camden";
        this.devices = af.database.list('/devices');
    }
    DevicesComponent.prototype.ngOnInit = function () {
        this.deviceLog = new device_log_component_1.DeviceLog();
    };
    DevicesComponent.prototype.onSelect = function (device) {
        this.selectDevice = device;
    };
    //update device log as return
    DevicesComponent.prototype.onReturn = function (device) {
        console.log(device);
        this.devices.update(device, { inUseBy: "" });
        this.deviceLog.onSave(device, "", "in");
    };
    //update device log as borrowed
    DevicesComponent.prototype.onBorrow = function (device) {
        console.log(device);
        this.devices.update(device, { inUseBy: "Yene" });
        this.deviceLog.onSave(device, "", "out");
    };
    DevicesComponent = __decorate([
        core_1.Component({
            selector: 'my-devices',
            templateUrl: '../app.component.html',
            styleUrls: ['../app.component.css'],
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], DevicesComponent);
    return DevicesComponent;
}());
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map