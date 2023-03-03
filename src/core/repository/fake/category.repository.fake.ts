import { randomInt } from 'crypto';
import CategoryAdapter from '~/adapter/category.adapter';
import type Category from '~/core/entity/category.entity';
import { type ICategoryRepository } from '../category.repository.interface';
import { type CreateCategory } from '../dto/create-category.dto';

export default class CategoryRepositoryFake implements ICategoryRepository {
  private readonly categories: Category[] = [];

  async create(params: CreateCategory): Promise<Category> {
    const category = CategoryAdapter.create(params as Category);
    category.id = randomInt(1000);

    this.categories.push(category);

    return await Promise.resolve(category);
  }

  async getAll(): Promise<Category[]> {
    return await Promise.resolve(this.categories);
  }

  async getByNameAndDescription(
    name: string,
    description: string
  ): Promise<Category | null> {
    const index = await Promise.resolve(
      this.categories.findIndex(
        category =>
          category.name === name && category.description === description
      )
    );

    if (index < 0) return null;

    return this.categories[index];
  }
}
