import { Category } from '@app/modules/category/entities/category.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SeoVO } from './seo.vo';
import { DocumentVO } from './document.vo';
import { Document } from '@app/modules/document/entities/document.entity';
import { Attachement } from '@app/modules/attachement/entities/attachement.entity';

export class NavContentVo {
  @ApiPropertyOptional({ description: '栏目名称', example: '首页' })
  catname: string;

  @ApiPropertyOptional({ description: '栏目英文名称', example: 'index' })
  catnameEn: string;

  @ApiPropertyOptional({ description: '栏目目录', example: 'about' })
  catdir: string;

  @ApiPropertyOptional({ description: '栏目描述', example: '首页' })
  description: string;

  @ApiPropertyOptional({ description: '栏目封面', type: Attachement })
  cover: Attachement;

  @ApiPropertyOptional({ description: 'seo信息', type: SeoVO })
  seo: SeoVO;

  @ApiPropertyOptional({ description: '模型', example: 'page' })
  siteModel: string;

  @ApiPropertyOptional({ description: '栏目类型', type: [Category] })
  children: Category[];

  @ApiPropertyOptional({ description: '栏目类型', type: DocumentVO })
  document?: DocumentVO;

  @ApiPropertyOptional({ description: '栏目类型', type: [Document] })
  documents?: Document[];

  @ApiPropertyOptional({ description: '栏目类型', example: 1 })
  total?: number;
}
