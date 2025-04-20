import { FastifyInstance } from "fastify";
import registrationController from "../../controllers/registration/RegistrationController";

export default function (fastify: FastifyInstance) {
    fastify.post<{
        Querystring: {
            organisationGuid: string;
            serviceCenterId: string;
            serviceId: string;
            phone: string;
            email: string;
            name: string;
            customerInfo: string;
            date: string;
        };
    }>("/RegCustomerEx", registrationController.createRegistration);

    fastify.put<{
        Params: {
            id: string;
        };
        Body: {
            phone: string;
            email: string;
            name: string;
            customerInfo: string;
            date: string;
        };
    }>("/registrations/:id", registrationController.updateRegistration);

    fastify.delete<{
        Params: {
            id: string;
        };
    }>("/registrations/:id", registrationController.deleteRegistration);

    fastify.get<{
        Params: { serviceId: string };
    }>(
        "/services/:serviceId/registrations",
        registrationController.getAllByServiceId
    );

    fastify.get<{
        Querystring: {
            organisationGuid: string;
            orderGuid: string;
            serviceCenterId: string;
        };
    }>("/GetReceipt", registrationController.getReceipt);
}
