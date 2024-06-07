import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validate(request: Request) {
  const authHeader = request.headers.authorization;

  const auth = authHeader.split(' ')[1];

  const [email, password] = auth.split(':');

  if (!email || !password) return false;
  console.log(`este es authHeader ${authHeader} y este es \n auth ${auth}`);

  return true;
}
@Injectable()
export class GuardsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
