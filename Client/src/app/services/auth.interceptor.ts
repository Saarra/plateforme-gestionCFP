import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization:  'Bearer ' + accessToken
            }
        });
        return next.handle(req);
    }
}
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true,
};
