import models from '../libs/sequelize.js';
import boom from "@hapi/boom";
import bcrypt from "bcrypt";


class CustomerService {

    async create(data) {
        const hash = await bcrypt.hash(data.user.password,10);
        const newData = {
            ...data,
            user: {
                ...data.user,
                password: hash
            }
        }
        const newCustomer = await models.models.Customer.create(newData, {
            include: ['user']
        });
        return newCustomer;
    }

    async find() {

        const rta = await models.models.Customer.findAll({
            include: ['user']
        });
        return rta;
    }

    async findOne(id) {
        const Customer = await models.models.Customer.findByPk(id);
        if(!Customer) {
            throw boom.notFound("Customer not found");
        }
        return Customer;
    }

    async update(id, changes) {
        const customer = await this.findOne(id);
        const rta = await customer.update(changes);
        return rta;
    }

    async delete(id) {
        const customer = await this.findOne(id);
        const rta = await customer.destroy();
        return {id};
    }

}

export default CustomerService;