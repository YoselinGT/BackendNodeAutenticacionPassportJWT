import {Strategy} from 'passport-local'
import AuthService from "./../../../services/auth.service.js";
const service = new AuthService

const LocalStrategy = new Strategy(
    {usernameField: 'email'}
    ,async (email, password,done) => {
    try {
        const user = await service.getUser(email,password);
        return done(null,user)
    } catch (error) {
        return done(error,false)
    }
});

export default LocalStrategy;