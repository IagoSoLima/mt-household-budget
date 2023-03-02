import Category from '~/core/entity/category.entity';

const CategoryAdapter = {
  create(param: Omit<Category, 'id'>): Category {
    const { name, description } = param;

    return new Category(name, description);
  }
};

export default CategoryAdapter;
