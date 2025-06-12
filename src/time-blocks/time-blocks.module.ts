import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { TimeBlocksController } from './time-blocks.controller';
import { TimeBlocksService } from './time-blocks.service';

@Module({
  controllers: [TimeBlocksController],
  providers: [TimeBlocksService, PrismaService],
})
export class TimeBlocksModule {}
