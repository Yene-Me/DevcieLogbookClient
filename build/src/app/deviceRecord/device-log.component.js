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
var device_log_model_ts_1 = require('./device-log.model.ts');
var DeviceLog = (function () {
    function DeviceLog() {
    }
    DeviceLog.prototype.onSave = function (device, user, status) {
        this.deviceModel = new device_log_model_ts_1.default(device.$key, "1", status, new Date);
        console.log("DeviceLog", device, this.deviceModel);
    };
    DeviceLog.prototype.getAllDeviceLogs = function () {
        return [];
    };
    DeviceLog.prototype.getDeviceLogById = function (id) {
        return "";
    };
    DeviceLog = __decorate([
        core_1.Component({
            selector: 'my-device-log',
        }), 
        __metadata('design:paramtypes', [])
    ], DeviceLog);
    return DeviceLog;
}());
exports.DeviceLog = DeviceLog;
//# sourceMappingURL=device-log.component.js.map