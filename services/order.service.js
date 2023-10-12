import models from '../libs/sequelize.js';
import boom from "@hapi/boom";


class OrderService {

    async create(data) {
        const newOrder = await models.models.Order.create(data);
        return newOrder;
    }

    async addItem(data) {
        const newItem = await models.models.OrderProduct.create(data);
        return newItem;
    }

    async find() {

        const rta = await models.models.Order.findAll();
        return rta;
    }

    async findOne(id) {
        const Order = await models.models.Order.findByPk(id,{
           include: [{
               association: 'customer',
               include: ['user']
           },
           'items'
           ]
        });
        if(!Order) {
            throw boom.notFound("Order not found");
        }
        return Order;
    }

    async update(id, changes) {
        const order = await this.findOne(id);
        const rta = await order.update(changes);
        return rta;
    }

    async delete(id) {
        const order = await this.findOne(id);
        const rta = await order.destroy();
        return {id};
    }

}

export default OrderService;