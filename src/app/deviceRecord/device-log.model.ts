export default class DeviceLogModel {
    constructor(
        public device_id: string,
        public user_id:string,
        public device_status: string,
        public time: Date
    ) {  }
}
