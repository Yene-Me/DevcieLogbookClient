"use strict";
var DeviceLogModel = (function () {
    function DeviceLogModel(device_id, user_id, device_status, time) {
        this.device_id = device_id;
        this.user_id = user_id;
        this.device_status = device_status;
        this.time = time;
    }
    return DeviceLogModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeviceLogModel;
//# sourceMappingURL=device-log.model.js.map