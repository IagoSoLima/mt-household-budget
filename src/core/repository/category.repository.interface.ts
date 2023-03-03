import type Category from '../entity/category.entity';
import { type CreateCategory } from './dto/create-category.dto';

export interface ICategoryRepository {
  create: (params: CreateCategory) => Promise<Category>;
  getAll: () => Promise<Category[] | []>;
  getByNameAndDescription: (
    name: string,
    description: string
  ) => Promise<Category | null>;
}
