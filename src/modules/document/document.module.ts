import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Content } from './entities/content.entity';
import { Album } from './entities/album.entity';
import { Link } from './entities/link.entity';
import { DocumentService } from './document.service';
import { CategoryModule } from '../category/category.module';
import { AttachementModule } from '../attachement/attachement.module';
import { CounterModule } from '../counter/counter.module';
import { SencetiveModule } from '../sencetive/sencetive.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, Content, Album, Link]),
    CategoryModule,
    AttachementModule,
    CounterModule,
    SencetiveModule,
  ],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
