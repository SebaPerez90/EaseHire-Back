import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
import { Observable } from 'rxjs';

//!CHEQUEAR ESTA FUNCION QUE NO ESTÁ SIENDO UTILIZADA EN EL MODULO NI EXPORTADA
// function validate(request: Request) {
//   const authHeader = request.headers.authorization;

//   const auth = authHeader.split(' ')[1];

//   const [email, password] = auth.split(':');

//   if (!email || !password) return false;
//   return true;
// }

@Injectable()
export class userGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[0];

    if (!token) throw new UnauthorizedException('No se envio token');

    const secret = process.env.JWT_SECRET;

    const user = this.jwtService.verify(token, { secret });

    if (!user) throw new UnauthorizedException('Error al validar token');
    user.exp = new Date(user.exp * 1000);

    request.user = user;
    return true;
  }
}
