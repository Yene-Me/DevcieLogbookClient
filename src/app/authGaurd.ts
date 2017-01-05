import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {FirebaseAuth, FirebaseAuthState} from "angularfire2";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: FirebaseAuth, private router: Router) {
    }

    canActivate(): any {
      
        this.auth.subscribe((data:any) => {

            if(!data)
            {
                this.router.navigate(['/login']);
                return false;
            }
        });
        return true;
    }
}