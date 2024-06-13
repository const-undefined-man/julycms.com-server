import { DataSource } from 'typeorm';
import { getConfig } from '../../config/index';
import entities from '../../modules/entities';
/**
 * 创建一个DataSource实例，在数据库表迁移的时候使用
 */
export const AppDataSource = new DataSource({ ...getConfig().db, entities });
