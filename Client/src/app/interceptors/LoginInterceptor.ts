import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.log('requet intercepteur', req);
        return next.handle(req);
    }
}
export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass : LoginInterceptor,
    multi : true,
};

