import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetScopedUser = createParamDecorator(
  (_data: any, context: ExecutionContext) => {
    const req = context.getArgByIndex(0);
    return req.user;
  },
);
