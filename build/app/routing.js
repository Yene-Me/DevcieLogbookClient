"use strict";
var router_1 = require('@angular/router');
var devices_component_1 = require('./devices/listDevice/devices.component');
var login_component_1 = require('./auth/login/login.component');
var add_device_1 = require('../app/devices/addDevice/add_device');
var authGaurd_1 = require('./authGaurd');
var appRoutes = [
    {
        path: '',
        redirectTo: '/devices',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'devices',
        component: devices_component_1.DevicesComponent,
        canActivate: [authGaurd_1.AuthGuard]
    },
    {
        path: 'add',
        component: add_device_1.AddDevicesComponent,
        canActivate: [authGaurd_1.AuthGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=routing.js.map