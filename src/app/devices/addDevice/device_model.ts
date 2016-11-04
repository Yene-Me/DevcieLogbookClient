export class DeviceModel {
    constructor(
        public device_os: string,
        public device_version: string,
        public device_model: string,
        public device_type: string,
        public device_vendor:string,
        public device_resolution:string,
        public device_userAgent:string
    ) {  }
}