import { randomInt } from 'crypto';
import Category from '~/core/entity/category.entity';
import { type ICategoryRepository } from '../category.repository.interface';
import { type CreateCategory } from '../dto/create-category.dto';

export default class CategoryRepositoryFake implements ICategoryRepository {
  private readonly categories: Category[] = [];

  async create(params: CreateCategory): Promise<Category> {
    const { description, name } = params;
    const category = new Category(name, description);
    category.setId(randomInt(1000));

    this.categories.push(category);

    return await Promise.resolve(category);
  }

  async getAll(): Promise<Category[]> {
    return await Promise.resolve(this.categories);
  }

  async getByName(name: string): Promise<Category | null> {
    const index = await Promise.resolve(
      this.categories.findIndex(category => category.name === name)
    );

    if (index < 0) return null;

    return this.categories[index];
  }
}
