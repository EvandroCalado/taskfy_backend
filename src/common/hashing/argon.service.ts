import { hash, verify } from 'argon2';

import { HashingService } from './hashing.service';

export class ArgonService implements HashingService {
  async hash(password: string): Promise<string> {
    return await hash(password);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await verify(hash, password);
  }
}
