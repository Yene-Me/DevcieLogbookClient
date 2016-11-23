import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';


@Injectable()
export class NFCService {
    tag:FirebaseObjectObservable<any>;
    listOfTags:FirebaseListObservable<any>;


    constructor(private af:AngularFire) {
    }

    getTagByID(id:string):FirebaseObjectObservable<any> {
        return this.af.database.object('/tags/' + id);
    }

    getAssociateId(id:string, callBack:any):void {
        this.listOfTags = this.af.database.list('/tags');

        this.listOfTags.subscribe((tagsData:any)=> {
            for (let item in tagsData) {

                if (id === tagsData[item]['associateId']) {
                    callBack(tagsData[item]);
                }
            }
        });


    }

    registerTag(tagId:string, objectId:string):void {

        this.tag = this.getTagByID(tagId);

        this.tag.subscribe((data)=> {
            if (data == null) {
                console.log("This is new tag")
            }
            else if (data.associateId == objectId) {
                console.log("has be associated with device or user")
            }
            else if (data.associateId != objectId) {
                this.tag.set({associateId: objectId})

            }

        })
    }

    unregisterTag(tagId:string) {
        this.tag = this.getTagByID(tagId);

        this.tag.subscribe((data)=> {
            if (data.associateId) {
                this.tag.set({associateId: ""})
            }
        })
    }


}