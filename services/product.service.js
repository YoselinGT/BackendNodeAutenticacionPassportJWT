import models from '../libs/sequelize.js';
import {Op} from 'sequelize';
import boom from "@hapi/boom";

class ProductsService {

    async create(data) {
        const newProduct = await models.models.Product.create(data);
        return newProduct;
    }

    async find({limit = 10, offset=0, price, price_min, price_max}) {
        const options = {
            include: ['category'],
            limit,
            offset,
            where: {}
        }
        price ? options.where.price = price : '';
        console.log(options);

        price_min && price_max  ? options.where.price = {
            [Op.gte]:price_min,
            [Op.lte]:price_max,
        }
        : '';

        console.log(options);
        const rta = await models.models.Product.findAll(options);
        return rta;
    }

    async findOne(id) {
        const Product = await models.models.Product.findByPk(id);
        if(!Product) {
            throw boom.notFound("Product not found");
        }
        return Product;
    }

    async update(id, changes) {
        const product = await this.findOne(id);
        const rta = await product.update(changes);
        return rta;
    }

    async delete(id) {
        const product = await this.findOne(id);
        const rta = await product.destroy();
        return {id};
    }

}

export default ProductsService;