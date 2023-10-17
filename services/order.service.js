import models from '../libs/sequelize.js';
import boom from "@hapi/boom";


class OrderService {

    async create(data) {
        const customer = await models.models.Customer.findOne({
            where: data
        })
        if (customer) {
            const customerId = customer.id;
            const newOrder = await models.models.Order.create({customerId: customerId})
            return newOrder;
        } else {
            throw boom.notFound("Customer not found");
        }
    }

    async addItem(data) {
        const newItem = await models.models.OrderProduct.create(data);
        return newItem;
    }

    async find() {

        const rta = await models.models.Order.findAll();
        return rta;
    }

    async findByUser(userId) {

        const orders = await models.models.Order.findAll({
            where: {
                '$customer.user.id$': userId
            },
            include: [
                {
                    association: 'customer',
                    include: ['user']
                }
            ]
        });
        return orders;
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