import { FastifyInstance } from "fastify";
import { ServiceCreateData } from "../../../infra/db/repositories/service/ServiceRepository";
import serviceController from "../../controllers/service/ServiceController";

export default function (fastify: FastifyInstance) {
    fastify.post<{
        Params: ServiceCreateData;
    }>("/services", serviceController.createService);

    fastify.put<{
        Params: { id: string };
        Body: ServiceCreateData;
    }>("/services/:id", serviceController.updateService);

    fastify.delete<{
        Params: { id: string };
    }>("/services/:id", serviceController.deleteService);

    fastify.get<{
        Querystring: {
            serviceCenterId: string;
            organisationGuid: string;
        };
    }>("/GetServiceList", serviceController.getAllByCenterId);

    fastify.get<{
        Querystring: {
            serviceCenterId: string;
            serviceId: string;
            organisationGuid: string;
        };
    }>("/GetDayList", serviceController.getAvailableDays);

    fastify.get<{
        Querystring: {
            serviceCenterId: string;
            serviceId: string;
            organisationGuid: string;
            date: string;
        };
    }>("/GetTimeList", serviceController.getAvailableTimes);
}
