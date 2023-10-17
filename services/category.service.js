import models from '../libs/sequelize.js';
import boom from "@hapi/boom";


class CategoryService {

    async create(data) {
        const newCategory = await models.models.Category.create(data);
        return newCategory;
    }

    async find() {
        const rta = await models.models.Category.findAll();
        return rta;
    }

    async findOne(id) {
        const Category = await models.models.Category.findByPk(id,{
            include: ['products']
        });
        if(!Category) {
            throw boom.notFound("Category not found");
        }
        return Category;
    }

    async update(id, changes) {
        const category = await this.findOne(id);
        const rta = await category.update(changes);
        return rta;
    }

    async delete(id) {
        const category = await this.findOne(id);
        const rta = await category.destroy();
        return {id};
    }

}

export default CategoryService;