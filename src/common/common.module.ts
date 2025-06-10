import { Module } from '@nestjs/common';

import { ArgonService } from './hashing/argon.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: ArgonService,
    },
  ],
  exports: [HashingService],
})
export class CommonModule {}
