import { IServiceCenterService } from "../../../domain/services/serviceCenter/interfaces/ServiceCenterServiceInterfaces";
import serviceCenterService from "../../../domain/services/serviceCenter/ServiceCenterService";

class ServiceCenterController {
    private serviceCenterService: IServiceCenterService;

    constructor(serviceCenterService: IServiceCenterService) {
        this.serviceCenterService = serviceCenterService;

        this.createServiceCenter = this.createServiceCenter.bind(this);
        this.updateServiceCenter = this.updateServiceCenter.bind(this);
        this.deleteServiceCenter = this.deleteServiceCenter.bind(this);
        this.getAllServiceCenters = this.getAllServiceCenters.bind(this);
    }

    async getAllServiceCenters(request: any, reply: any) {
        try {
            const rawCenters = await this.serviceCenterService.getAll();

            const centers = rawCenters.map((center: any) => ({
                ServiceCenterId: center.id,
                ServiceCenterName: center.name,
                LocationName: center.location,
                IsActive: center.isActive,
            }));

            reply.status(200).send(centers);
        } catch (error) {
            console.error("Error getting service centers:", error);
            reply.status(500).send({ error: "Failed to get service centers" });
        }
    }

    async createServiceCenter(request: any, reply: any) {
        const serviceCenterData = request.body;

        try {
            const createdServiceCenter =
                await this.serviceCenterService.createServiceCenter(
                    serviceCenterData
                );
            reply.status(201).send(createdServiceCenter);
        } catch (error) {
            console.error("Error creating service center:", error);
            reply
                .status(500)
                .send({ error: "Failed to create service center" });
        }
    }

    async updateServiceCenter(request: any, reply: any) {
        const centerId = request.params.id;
        const serviceCenterData = request.body;

        try {
            const updatedServiceCenter =
                await this.serviceCenterService.updateServiceCenter(
                    centerId,
                    serviceCenterData
                );
            reply.status(200).send(updatedServiceCenter);
        } catch (error) {
            console.error("Error updating service center:", error);
            reply
                .status(500)
                .send({ error: "Failed to update service center" });
        }
    }

    async deleteServiceCenter(request: any, reply: any) {
        const centerId = request.params.id;

        try {
            await this.serviceCenterService.deleteServiceCenter(centerId);
            reply.status(204).send();
        } catch (error) {
            console.error("Error deleting service center:", error);
            reply
                .status(500)
                .send({ error: "Failed to delete service center" });
        }
    }
}

const serviceCenterController = new ServiceCenterController(
    serviceCenterService
);
export default serviceCenterController;
