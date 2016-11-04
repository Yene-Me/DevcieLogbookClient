"use strict";
var DeviceModel = (function () {
    function DeviceModel(device_os, device_version, device_model, device_type, device_vendor, device_resolution, device_userAgent) {
        this.device_os = device_os;
        this.device_version = device_version;
        this.device_model = device_model;
        this.device_type = device_type;
        this.device_vendor = device_vendor;
        this.device_resolution = device_resolution;
        this.device_userAgent = device_userAgent;
    }
    return DeviceModel;
}());
exports.DeviceModel = DeviceModel;
//# sourceMappingURL=device_model.js.map