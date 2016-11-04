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
var device_service_1 = require('../device.service');
var device_model_1 = require('./device_model');
require('../../../public/css/styles.css');
require('../../../public/css/bootstrap.css');
var AddDevicesComponent = (function () {
    function AddDevicesComponent(deviceService) {
        this.deviceService = deviceService;
        this.name = "Add New Device";
        this.submitted = false;
        this.active = true;
    }
    AddDevicesComponent.prototype.ngOnInit = function () {
        this.getDevices();
        this.deviceInfo();
    };
    AddDevicesComponent.prototype.getDevices = function () {
        this.devices = this.deviceService.getDevices();
    };
    AddDevicesComponent.prototype.onSelect = function (device) {
        this.selectDevice = device;
    };
    AddDevicesComponent.prototype.deviceInfo = function () {
        var client = new ClientJS();
        this.browserData = client.getBrowserData();
        this.currentResolution = client.getCurrentResolution();
        this.device = new device_model_1.DeviceModel(this.browserData.os.name, this.browserData.os.version, this.browserData.device.model, this.browserData.device.type, this.browserData.device.vendor, this.currentResolution, this.browserData.ua);
    };
    AddDevicesComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log(this.device);
    };
    Object.defineProperty(AddDevicesComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.device);
        },
        enumerable: true,
        configurable: true
    });
    AddDevicesComponent = __decorate([
        core_1.Component({
            selector: 'add-devices',
            templateUrl: './add-device.component.html',
            styleUrls: ['./add-device.component.css'],
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], AddDevicesComponent);
    return AddDevicesComponent;
}());
exports.AddDevicesComponent = AddDevicesComponent;
//# sourceMappingURL=add_device.js.map