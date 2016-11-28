import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {FirebaseAuth, FirebaseAuthState} from "angularfire2";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: FirebaseAuth, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        return this.auth.take(1)
            .map((authState: FirebaseAuthState) => !!authState)
            .do(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                }
            });
    }
}