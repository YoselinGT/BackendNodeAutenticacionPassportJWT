import express from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import categoriesRouter from "./categories.router.js";
import customerRouter from "./customers.router.js";
import orderRouter from "./order.router.js";
import authRouter from "./auth.router.js";
import profileRouter from "./profile.router.js";

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router)
    router.use('/products',productsRouter)
    router.use('/users',usersRouter)
    router.use('/categories',categoriesRouter)
    router.use('/customers',customerRouter)
    router.use('/orders',orderRouter)
    router.use('/auth',authRouter)
    router.use('/profile',profileRouter)
}

export  default routerApi