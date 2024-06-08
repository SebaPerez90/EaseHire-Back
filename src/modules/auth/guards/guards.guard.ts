import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

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
