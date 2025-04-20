import { FastifyInstance } from "fastify";
import { ServiceCenterCreateData } from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";
import serviceCenterController from "../../controllers/serviceCenter/ServiceCenterController";

export default function (fastify: FastifyInstance) {
    fastify.post<{
        Params: ServiceCenterCreateData;
    }>("/service-centers", serviceCenterController.createServiceCenter);

    fastify.put<{
        Params: { id: string };
        Body: ServiceCenterCreateData;
    }>("/service-centers/:id", serviceCenterController.updateServiceCenter);

    fastify.delete<{
        Params: { id: string };
    }>("/service-centers/:id", serviceCenterController.deleteServiceCenter);

    fastify.get<{
        Querystring: {
            organisationGuid: string;
        };
    }>("/getServiceCenterList", serviceCenterController.getAllServiceCenters);
}
