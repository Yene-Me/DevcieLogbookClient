"use strict";
var device_log_model_ts_1 = require('./device-log.model.ts');
var DeviceLog = (function () {
    function DeviceLog() {
    }
    DeviceLog.prototype.onSave = function (device, user) {
        this.deviceModel = new device_log_model_ts_1.default(device.$key, "1", "out", new Date);
        console.log("DeviceLog", device, this.deviceModel);
    };
    DeviceLog.prototype.getAllDeviceLogs = function () {
        return [];
    };
    DeviceLog.prototype.getDeviceLogById = function (id) {
        return "";
    };
    return DeviceLog;
}());
exports.DeviceLog = DeviceLog;
//# sourceMappingURL=device-log.components.js.map