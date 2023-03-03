import CategoryAdapter from '~/adapter/category.adapter';
import type Category from '~/core/entity/category.entity';
import { type ICategoryRepository } from '~/core/repository/category.repository.interface';
import { type CreateCategory } from '~/core/repository/dto/create-category.dto';
import db from '~/infra/database/postgres/config.postgres';

export default class CategoryRepository implements ICategoryRepository {
  async create(params: CreateCategory): Promise<Category> {
    const { description, name } = params;
    await db.connect();

    const insert = await db.query<Category>(
      'INSERT INTO categorias(nome,descricao) VALUES ($1,$2) RETURNING *',
      [name, description]
    );

    const category = CategoryAdapter.create(params as Category);
    category.id = insert[0].id;
    return category;
  }

  async getAll(): Promise<Category[] | []> {
    await db.connect();

    const categories = await db.manyOrNone<Category>(
      'SELECT * FROM categorias'
    );

    return categories;
  }

  async getByNameAndDescription(
    name: string,
    description: string
  ): Promise<Category | null> {
    await db.connect();

    const category = await db.oneOrNone<Category>(
      'SELECT * FROM categorias WHERE nome = $1 AND descricao = $2',
      [name, description]
    );

    return category;
  }
}
