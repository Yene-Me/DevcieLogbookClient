"use strict";
var router_1 = require('@angular/router');
var devices_component_1 = require('./devices/devices.component');
var add_device_1 = require('../app/devices/addDevice/add_device');
var appRoutes = [
    {
        path: 'devices',
        component: devices_component_1.DevicesComponent
    },
    {
        path: 'add_devices',
        component: add_device_1.AddDevicesComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=routing.js.map