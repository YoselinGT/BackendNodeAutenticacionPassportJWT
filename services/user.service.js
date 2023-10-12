import models from '../libs/sequelize.js';
import boom from "@hapi/boom";


class UserService {

    async create(data) {
        const newProduct = await models.models.User.create(data);
        return newProduct;
    }

    async find() {

        const rta = await models.models.User.findAll({
            include: ['customer']
        });
        return rta;
    }

    async findOne(id) {
        const user = await models.models.User.findByPk(id);
        if(!user) {
            throw boom.notFound("user not found");
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id) {
        const user = await this.findOne(id);
        const rta = await user.destroy();
        return {id};
    }

}

export default UserService;