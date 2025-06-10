import { User } from 'generated/prisma';

export interface AuthenticatedRequest extends Request {
  user: User;
}
