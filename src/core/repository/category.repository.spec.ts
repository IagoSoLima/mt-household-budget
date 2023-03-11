import { beforeEach, describe, expect, it } from 'vitest';
import Category from '~/core/entity/category.entity';
import { type ICategoryRepository } from '~/core/repository/category.repository.interface';
import CategoryRepositoryFake from '~/core/repository/fake/category.repository.fake';
import { type CreateCategory } from './dto/create-category.dto';

describe('CategoryRepository', () => {
  let categoryRepository: ICategoryRepository;

  beforeEach(async () => {
    categoryRepository = new CategoryRepositoryFake();
  });

  it('should be defined', () => {
    expect(categoryRepository).toBeDefined();
  });

  it('should be create category', async () => {
    const data: CreateCategory = {
      description: 'Gastos Fixos',
      name: 'Fixo'
    };
    const response = await categoryRepository.create(data);
    expect(response).toBeInstanceOf(Category);
  });

  it('should be get all category', async () => {
    const categories = await categoryRepository.getAll();
    expect(categories.length).toBe(0);
  });

  it('should be get category by name and description', async () => {
    const data: CreateCategory = {
      description: 'Gastos Fixos',
      name: 'Fixo'
    };
    const categoryCreated = await categoryRepository.create(data);

    const category = await categoryRepository.getByNameAndDescription(
      categoryCreated.name,
      categoryCreated.description
    );
    expect(category).toBeInstanceOf(Category);
    expect(category?.id).toEqual(categoryCreated.id);
  });

  it('should not be found category by name and description ', async () => {
    const category = await categoryRepository.getByNameAndDescription(
      'Teste',
      'Descrição teste'
    );
    expect(category).toBeNull();
  });
});
