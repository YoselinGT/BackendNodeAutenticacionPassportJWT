import boom from "@hapi/boom";
import UserService from "./user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import nodemailer from 'nodemailer'

const service = new UserService();


class AuthService {

    async getUser(email, password){
        const user = await service.findByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtsecret)

        return {
            user,
            token
        };
    }

    async sendRecovery(email){
        const user = await service.findByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }

        const payload = {
            sub: user.id
        }

        const token = jwt.sign(payload, config.jwtsecret, {expiresIn: '15min'})
        const link = `http://localhost/recovery?token=${token}`;

        await service.update(user.id,{recoveryToken: token});

        const mail = {
            from: '"Fred Foo 👻" <yoselin.galvan.torres@gmail.com>', // sender address
                to:`${user.email}` , // list of receivers
            subject: "Email para recuperar contraseña", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Ingresa a este link => ${link}</b>`, // html body
        }

        return await this.sendMail(mail);
    }

    async sendMail(email){

        const transporter = nodemailer.createTransport({
            host: config.hostMail,
            port: config.portMail,
            secureConnection: false,
            auth: {
                user: config.userMail,
                pass: config.passwordMail
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        const info = await transporter.sendMail(email);

        console.log("Message sent: %s", info.messageId);

        return {message:'mail sent'};
    }

}

export default AuthService;