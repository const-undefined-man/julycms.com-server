import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageConfig from '../../package.json';

/**
 * 生成文档
 * @param app Applycation
 * @param config Object
 */
export const SwaggerInit = (app, config): void => {
  const doc = new DocumentBuilder();
  doc.setTitle(config.title || packageConfig.name);
  doc.setDescription(config.description || packageConfig.description);
  doc.setVersion(config.version || packageConfig.version);
  doc.addBearerAuth();

  const configs = doc.build();

  const document = SwaggerModule.createDocument(app, configs);

  SwaggerModule.setup(config.url, app, document);
};
