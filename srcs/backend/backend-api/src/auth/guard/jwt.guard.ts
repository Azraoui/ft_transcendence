// import {
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ExtractJwt } from 'passport-jwt';
// import { Request } from 'express';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     private readonly request: Request;
//     constructor(private readonly authService: AuthService) {
//         super();
//     }
//     async canActivate(context: ExecutionContext) {
//         const request = context.switchToHttp().getRequest();
//         const response = context.switchToHttp().getResponse();
//         const token = ExtractJwt.fromAuthHeaderAsBearerToken()(
//             context.switchToHttp().getRequest(),
//         );
//         if (await this.authService.isInvalidToken(token)) return false;
//         try {
//             await this.toCanActive(context);
//         } catch (TokenExpiredError) {
//             const result = await this.authService.refreshToken(
//                 request,
//                 response,
//             );
//             if (result) {
//                 request.headers['Authorization'] = `Bearer ${result.token}`;
//                 return await this.toCanActive(context);
//             }
//             return await this.toCanActive(context);
//         }
//     }

//     async toCanActive(context: ExecutionContext): Promise<boolean> {
//         return <Promise<boolean>>super.canActivate(context);
//     }

//     handleRequest(err: any, user: any, info: Error) {
//         if (err || !user) {
//             throw err || new UnauthorizedException();
//         }
//         return user;
//     }
// }