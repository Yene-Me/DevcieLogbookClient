"use strict";
var DeviceLog = (function () {
    function DeviceLog() {
    }
    DeviceLog.prototype.onSave = function (device, user) {
        console.log("DeviceLog", device);
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
//# sourceMappingURL=device-log.js.map