import { FastifyInstance } from "fastify";
import authController from "../../controllers/auth/AuthController";

export default function (fastify: FastifyInstance) {
    fastify.post("/login", (req, res) => authController.handleLogin(req, res));
}
