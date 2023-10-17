import models from '../libs/sequelize.js';
import boom from "@hapi/boom";
import bcrypt from "bcrypt";


class UserService {

    async create(data) {
        const hash = await bcrypt.hash(data.password,10);
        const newUser = await models.models.User.create({
            ...data,
            password: hash
        });
        delete newUser.dataValues.password;
        return newUser;
    }

    async find() {

        const rta = await models.models.User.findAll({
            include: ['customer']
        });
        return rta;
    }

    async findByEmail(email) {

        const rta = await models.models.User.findOne({
            where: {email}
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