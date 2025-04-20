import { IRegistrationService } from "../../../domain/services/registration/interfaces/RegistrationInterfaces";
import registrationService from "../../../domain/services/registration/RegistrationService";
import { IServicesService } from "../../../domain/services/service/interfaces/ServiceInterfaces";
import servicesService from "../../../domain/services/service/ServicesService";
import { IServiceCenterService } from "../../../domain/services/serviceCenter/interfaces/ServiceCenterServiceInterfaces";
import serviceCenterService from "../../../domain/services/serviceCenter/ServiceCenterService";
import {
    RegistrationCreateData,
    RegistrationUpdateData,
} from "../../../infra/db/repositories/registration/RegistrationRepository";

class RegistrationController {
    private registrationService: IRegistrationService;
    private serviceCenterService: IServiceCenterService;
    private servicesService: IServicesService;

    constructor(
        registrationService: IRegistrationService,
        serviceCenterService: IServiceCenterService,
        servicesService: IServicesService
    ) {
        this.registrationService = registrationService;
        this.serviceCenterService = serviceCenterService;
        this.servicesService = servicesService;

        this.createRegistration = this.createRegistration.bind(this);
        this.updateRegistration = this.updateRegistration.bind(this);
        this.deleteRegistration = this.deleteRegistration.bind(this);
        this.getAllByServiceId = this.getAllByServiceId.bind(this);
        this.getReceipt = this.getReceipt.bind(this);
    }

    async getAllByServiceId(request: any, reply: any) {
        const serviceId = request.params.serviceId;

        try {
            const centers = await this.registrationService.getAllByServiceId(
                serviceId
            );
            if (!centers) {
                return reply
                    .status(404)
                    .send({ error: "Registrations not found" });
            }
            reply.status(200).send(centers);
        } catch (error) {
            console.error("Error getting registrations:", error);
            reply.status(500).send({ error: "Failed to get registrations" });
        }
    }

    async createRegistration(request: any, reply: any) {
        const { serviceId, phone, email, name, customerInfo, date } =
            request.query;

        const [datePart, timePart] = date.split(" ");

        if (!datePart || !timePart) {
            return reply.status(400).send({ error: "Invalid date format" });
        }

        const registrationData: RegistrationCreateData = {
            serviceId,
            clientFullName: name,
            clientEmail: email || null,
            clientPhone: phone,
            clientLegalPersonName: customerInfo || null,
            serviceDate: datePart,
            serviceTime: timePart,
        };

        try {
            const createdRegistration = await this.registrationService.create(
                registrationData
            );

            const registrationsForDateAndService =
                await this.registrationService.getRegistrationsByDateAndService(
                    createdRegistration.serviceDate,
                    createdRegistration.serviceId
                );

            const queuePosition = registrationsForDateAndService.length + 1;

            const response = {
                ...createdRegistration,
                CustOrderGuid: createdRegistration.id,
                CustReceiptNum: queuePosition,
                selectedDate: datePart,
                selectedTime: timePart,
            };

            reply.status(201).send(response);
        } catch (error) {
            console.error("Error creating registration:", error);
            reply.status(500).send({ error: "Failed to create registration" });
        }
    }

    async updateRegistration(request: any, reply: any) {
        const id = request.params.id;
        const registrationData = request.body;

        const [datePart, timePart] = registrationData.date.split(" ");

        const updateRegistrationData: RegistrationUpdateData = {
            clientFullName: registrationData.name,
            clientEmail: registrationData.email,
            clientPhone: registrationData.phone,
            clientLegalPersonName: registrationData.customerInfo,
            serviceDate: datePart,
            serviceTime: timePart,
        };

        try {
            const updatedRegistration = await this.registrationService.update(
                id,
                updateRegistrationData
            );
            reply.status(200).send(updatedRegistration);
        } catch (error) {
            console.error("Error updating registration:", error);
            reply.status(500).send({ error: "Failed to update registration" });
        }
    }

    async deleteRegistration(request: any, reply: any) {
        const registrationId = request.params.id;

        try {
            await this.registrationService.delete(registrationId);
            reply.status(204).send();
        } catch (error) {
            console.error("Error deleting registration:", error);
            reply.status(500).send({ error: "Failed to delete registration" });
        }
    }

    async getReceipt(request: any, reply: any) {
        const { organisationGuid, orderGuid, serviceCenterId } = request.query;

        try {
            const registration = await this.registrationService.getById(
                orderGuid
            );
            if (!registration) {
                return reply
                    .status(404)
                    .send({ error: "Registration not found" });
            }

            const serviceCenter = await this.serviceCenterService.getById(
                serviceCenterId
            );
            if (!serviceCenter) {
                return reply
                    .status(404)
                    .send({ error: "Service center not found" });
            }

            const service = await this.servicesService.getById(
                registration.serviceId
            );
            if (!service) {
                return reply.status(404).send({ error: "Service not found" });
            }

            const registrationsForDateAndService =
                await this.registrationService.getRegistrationsByDateAndService(
                    registration.serviceDate,
                    registration.serviceId
                );
            const queuePosition = registrationsForDateAndService.length + 1;

            const receiptHtml = `
            <html>\r\n\t\t<head>\r\n\t\t\t<meta charset=\"windows-1251\" />\r\n\t\t\r\n\t\t\t<title>Receipt</title>\r\n\t\t\t<style type=\"text/css\">\r\n    \t\t\t\ttd{border-bottom:solid 0px #000; cellspacing:0;}\r\n\t\t\t</style>\r\n\t\t</head>\r\n\t<body>\r\n\t\t<table align=\"center\" style=\"width:265px;\" cellspacing=\"0\" cellpadding=\"0\">\r\n\t\t<tr>\r\n\t\t\t<td colspan=\"2\" align=\"center\"><p style=\"font-size:14px\"></p>\r\n\t\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t    <td colspan=\"2\" style=\"font-size:18px;\" align=\"center\">\r\n\t\t        <p>Вітаємо з успішною реєстрацією на прийом до адміністратора ЦНАП ${serviceCenter.name}</p>\r\n\t\t\t       <HR size=\"2\" color=\"black\" noshade>\r\n\t    \t</td>\r\n\t\t</tr>\r\n\t\t\t<tr align=\"center\" >\r\n\t\t\t<td colspan=\"2\">\r\n\t\t\t\t<p style=\"font-size:25px\"> <strong>Номер в черзі</strong> </p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t\r\n\t\t<tr align=\"center\">\r\n\t\t\t<td colspan=\"2\">\r\n\t\t\t\t<p style=\"font-size:50px\">${queuePosition}</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr align=\"center\">\r\n\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t<p style=\"font-size:18px\">${service.description}</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td colspan=\"2\"><HR size=\"2\" color=\"black\" noshade></td>\r\n\t\t</tr>\r\n\t\t\r\n\t\t<tr  style=\"font-size:16px; text-align:left\">\r\n\t\t\t<td>\r\n\t\t\t\tДата прийому:<br>Час прийому:\r\n\t\t\t</td>\r\n\t\t\t<td width=\"30%\">\r\n\t\t\t\t<p style=\"font-size:16px; text-align:right\">${registration.serviceDate} ${registration.serviceTime}</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t<td colspan=\"2\"><HR size=\"2\" color=\"black\" noshade></td>\r\n\t\t</tr>\t\r\n\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t<p style=\"font-size:16px; text-align:center\"><strong>Увага!<strong>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t<tr  style=\"font-size:16px; text-align:center\">\r\n\t\t\t\r\n\t\t\t<td colspan=\"2\">\r\n\t\t\t\t<p style=\"font-size:16px;text-indent: 1.5em; font-style:italic; text-align:justify\">Просимо своєчасно прибути до департамету,у разі запізнення Ваш чек буде анульовано! Один запис у черзі надає можливість отримання тільки однієї послуги! Запис до електронної черги є індивідуальним, передача запису третім особам не допускається!</p>\r\n\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t</td>\r\n\t\t\t<td>`;

            reply.header("Content-Type", "text/html").send(receiptHtml);
        } catch (error) {
            console.error("Error generating receipt:", error);
            reply.status(500).send({ error: "Failed to generate receipt" });
        }
    }
}

const registrationController = new RegistrationController(
    registrationService,
    serviceCenterService,
    servicesService
);
export default registrationController;
