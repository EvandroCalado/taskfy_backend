import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'generated/prisma';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticated-request.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
