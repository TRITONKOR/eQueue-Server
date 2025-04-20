import { FastifyInstance } from "fastify";
import AuthRoutes from "./auth/AuthRoutes";
import RegistrationRoutes from "./registration/RegistrationRoutes";
import ServiceRoutes from "./service/ServiceRoutes";
import ServiceCenterRoutes from "./serviceCenter/ServiceCenterRoutes";

export default async function (fastify: FastifyInstance) {
    fastify.register(ServiceCenterRoutes);
    fastify.register(ServiceRoutes);
    fastify.register(AuthRoutes);
    fastify.register(RegistrationRoutes);
}
