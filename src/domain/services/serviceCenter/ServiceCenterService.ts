import { CreateServiceCenterAction } from "../../../app/actions/serviceCenter/CreateServiceCenter";
import { DeleteServiceCenterAction } from "../../../app/actions/serviceCenter/DeleteServiceCenter";
import { GetAllServiceCenterAction } from "../../../app/actions/serviceCenter/GetAllServicesCenters";
import { GetServiceCenterByIdAction } from "../../../app/actions/serviceCenter/GetServiceCenterById";
import { UpdateServiceCenterAction } from "../../../app/actions/serviceCenter/UpdateServiceCenter";
import {
    getServiceCenterRepository,
    ServiceCenter,
    ServiceCenterCreateData,
    ServiceCenterUpdateData,
} from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";
import { IServiceCenterService } from "./interfaces/ServiceCenterServiceInterfaces";

export class ServiceCenterService implements IServiceCenterService {
    private createServiceCenterAction: CreateServiceCenterAction;
    private updateServiceCenterAction: UpdateServiceCenterAction;
    private deleteServiceCenterAction: DeleteServiceCenterAction;
    private getAllServiceCenterAction: GetAllServiceCenterAction;
    private getServiceCenterByIdAction: GetServiceCenterByIdAction;

    constructor() {
        const serviceCenterRepository = getServiceCenterRepository();

        this.createServiceCenterAction = new CreateServiceCenterAction(
            serviceCenterRepository
        );
        this.updateServiceCenterAction = new UpdateServiceCenterAction(
            serviceCenterRepository
        );
        this.deleteServiceCenterAction = new DeleteServiceCenterAction(
            serviceCenterRepository
        );
        this.getAllServiceCenterAction = new GetAllServiceCenterAction(
            serviceCenterRepository
        );
        this.getServiceCenterByIdAction = new GetServiceCenterByIdAction(
            serviceCenterRepository
        );
    }

    async getAll(): Promise<ServiceCenter[]> {
        try {
            const centers = await this.getAllServiceCenterAction.execute();
            return centers;
        } catch (error) {
            console.error("Error getting service centers:", error);
            throw new Error("Failed to getting service centers");
        }
    }
    getById(id: string): Promise<ServiceCenter | null> {
        try {
            const serviceCenter = this.getServiceCenterByIdAction.execute(id);
            return serviceCenter;
        } catch (error) {
            console.error("Error getting service center:", error);
            throw new Error("Failed to get service center");
        }
    }

    async createServiceCenter(
        centerData: ServiceCenterCreateData
    ): Promise<ServiceCenter> {
        try {
            const createdServiceCenter =
                await this.createServiceCenterAction.execute(centerData);
            return createdServiceCenter;
        } catch (error) {
            console.error("Error creating service center:", error);
            throw new Error("Failed to create service center");
        }
    }

    async updateServiceCenter(
        id: string,
        centerData: ServiceCenterUpdateData
    ): Promise<ServiceCenter> {
        try {
            const updatedServiceCenter =
                await this.updateServiceCenterAction.execute(id, centerData);
            return updatedServiceCenter;
        } catch (error) {
            console.error("Error creating service center:", error);
            throw new Error("Failed to create service center");
        }
    }
    async deleteServiceCenter(id: string): Promise<void> {
        try {
            await this.deleteServiceCenterAction.execute(id);
        } catch (error) {
            console.error("Error deleting service center:", error);
            throw new Error("Failed to delete service center");
        }
    }
}

const serviceCenterService = new ServiceCenterService();
export default serviceCenterService;
