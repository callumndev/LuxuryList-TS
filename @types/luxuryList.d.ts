import 'express'

declare module "express" {
    interface Application {
        port?: Number;
    }
}