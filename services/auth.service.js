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

    async sendMail(email){

        const user = await service.findByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secureConnection: false,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "yoselin.galvan.torres@gmail.com",
                pass: "fhnb arpk nois drbn",
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <yoselin.galvan.torres@gmail.com>', // sender address
            to:`${user.email}` , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);

        return {message:'mail sent'};
    }

}

export default AuthService;