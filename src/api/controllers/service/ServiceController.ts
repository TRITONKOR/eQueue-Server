import { IServicesService } from "../../../domain/services/service/interfaces/ServiceInterfaces";
import servicesService from "../../../domain/services/service/ServicesService";

class ServiceController {
    private servicesService: IServicesService;

    constructor(servicesService: IServicesService) {
        this.servicesService = servicesService;

        this.createService = this.createService.bind(this);
        this.updateService = this.updateService.bind(this);
        this.deleteService = this.deleteService.bind(this);
        this.getAvailableDays = this.getAvailableDays.bind(this);
        this.getAvailableTimes = this.getAvailableTimes.bind(this);
        this.getAllByCenterId = this.getAllByCenterId.bind(this);
    }

    async createService(request: any, reply: any) {
        const serviceData = request.body;

        try {
            const createdService = await this.servicesService.createService(
                serviceData
            );
            reply.status(201).send(createdService);
        } catch (error) {
            console.error("Error creating service:", error);
            reply.status(500).send({ error: "Failed to create service" });
        }
    }

    async updateService(request: any, reply: any) {
        const serviceId = request.params.id;
        const serviceData = request.body;

        try {
            const updatedService = await this.servicesService.updateService(
                serviceId,
                serviceData
            );
            reply.status(200).send(updatedService);
        } catch (error) {
            console.error("Error updating service:", error);
            reply.status(500).send({ error: "Failed to update service" });
        }
    }

    async deleteService(request: any, reply: any) {
        const serviceId = request.params.id;

        try {
            await this.servicesService.deleteService(serviceId);
            reply.status(204).send();
        } catch (error) {
            console.error("Error deleting service:", error);
            reply.status(500).send({ error: "Failed to delete service" });
        }
    }

    async getAvailableDays(request: any, reply: any) {
        const { serviceCenterId, serviceId } = request.query;

        try {
            const result = await this.servicesService.getAvailableDays(
                serviceCenterId,
                serviceId
            );
            reply.send(result);
        } catch (err) {
            reply.status(500).send({ error: "Failed to fetch available days" });
        }
    }

    async getAvailableTimes(request: any, reply: any) {
        const { serviceCenterId, serviceId, date } = request.query;

        try {
            const result = await this.servicesService.getAvailableTimes(
                serviceCenterId,
                serviceId,
                date
            );
            reply.send(result);
        } catch (err) {
            reply
                .status(500)
                .send({ error: "Failed to fetch available times" });
        }
    }

    async getAllByCenterId(request: any, reply: any) {
        const serviceCenterId = request.query.serviceCenterId;

        try {
            const rawServices =
                await this.servicesService.getAllServicesByCenterId(
                    serviceCenterId
                );

            if (!rawServices) {
                reply.status(404).send({ error: "No services found" });
                return;
            }

            const services = rawServices.map((service: any) => ({
                ServiceId: service.id,
                ServiceCenterId: service.serviceCenterId,
                Description: service.description,
            }));

            reply.send(services);
        } catch (error) {
            console.error("Error getting services:", error);
            reply.status(500).send({ error: "Failed to getting services" });
        }
    }
}

const serviceController = new ServiceController(servicesService);
export default serviceController;
