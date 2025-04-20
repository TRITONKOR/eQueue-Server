import { CreateServiceAction } from "../../../app/actions/service/CreateService";
import { DeleteServiceAction } from "../../../app/actions/service/DeleteService";
import { GetAllServicesByCenterIdAction } from "../../../app/actions/service/GetAllServicesByCenterId";
import {
    GetAvailableDaysAction,
    PreRegDay,
} from "../../../app/actions/service/GetAvailableDays";
import {
    GetAvailableTimesForDayAction,
    PreRegTime,
} from "../../../app/actions/service/GetAvailableTimesForDay";
import { GetServiceByIdAction } from "../../../app/actions/service/GetServiceById";
import { UpdateServiceAction } from "../../../app/actions/service/UpdateService";
import {
    getServiceRepository,
    Service,
    ServiceCreateData,
    ServiceUpdateData,
} from "../../../infra/db/repositories/service/ServiceRepository";
import { IServicesService } from "./interfaces/ServiceInterfaces";

export class ServicesService implements IServicesService {
    private createServiceAction: CreateServiceAction;
    private updateServiceAction: UpdateServiceAction;
    private deleteServiceAction: DeleteServiceAction;

    private getAllServicesByCenterIdAction: GetAllServicesByCenterIdAction;
    private getServiceByIdAction: GetServiceByIdAction;

    private getAvailableDaysAction: GetAvailableDaysAction;
    private getAvailableTimesForDayAction: GetAvailableTimesForDayAction;

    constructor() {
        const serviceRepository = getServiceRepository();

        this.createServiceAction = new CreateServiceAction(serviceRepository);
        this.updateServiceAction = new UpdateServiceAction(serviceRepository);
        this.deleteServiceAction = new DeleteServiceAction(serviceRepository);
        this.getAvailableDaysAction = new GetAvailableDaysAction(
            serviceRepository
        );
        this.getAvailableTimesForDayAction = new GetAvailableTimesForDayAction(
            serviceRepository
        );
        this.getAllServicesByCenterIdAction =
            new GetAllServicesByCenterIdAction(serviceRepository);
        this.getServiceByIdAction = new GetServiceByIdAction(serviceRepository);
    }

    async getAll(): Promise<Service[]> {
        throw new Error("Method not implemented.");
    }

    async getById(id: string): Promise<Service | null> {
        try {
            const service = await this.getServiceByIdAction.execute(id);
            return service;
        } catch (error) {
            console.error("Error getting service:", error);
            throw new Error("Failed to get service");
        }
    }

    async createService(serviceData: ServiceCreateData): Promise<Service> {
        try {
            const createdService = await this.createServiceAction.execute(
                serviceData
            );
            return createdService;
        } catch (error) {
            console.error("Error creating service:", error);
            throw new Error("Failed to create service");
        }
    }

    async updateService(
        id: string,
        serviceData: ServiceUpdateData
    ): Promise<Service> {
        try {
            const updatedService = await this.updateServiceAction.execute(
                id,
                serviceData
            );
            return updatedService;
        } catch (error) {
            console.error("Error updating service:", error);
            throw new Error("Failed to update service");
        }
    }
    async deleteService(id: string): Promise<void> {
        try {
            await this.deleteServiceAction.execute(id);
        } catch (error) {
            console.error("Error deleting service:", error);
            throw new Error("Failed to delete service");
        }
    }

    async getAllServicesByCenterId(
        serviceCenterId: string
    ): Promise<Service[] | null> {
        try {
            const services = await this.getAllServicesByCenterIdAction.execute(
                serviceCenterId
            );
            return services;
        } catch (error) {
            console.error("Error getting services:", error);
            throw new Error("Failed to getting services");
        }
    }

    async getAvailableDays(
        serviceCenterId: string,
        serviceId: string
    ): Promise<PreRegDay[]> {
        try {
            return this.getAvailableDaysAction.execute(
                serviceCenterId,
                serviceId
            );
        } catch (error) {
            console.error("Error deleting service:", error);
            throw new Error("Failed to delete service");
        }
    }

    async getAvailableTimes(
        serviceCenterId: string,
        serviceId: string,
        date: string
    ): Promise<PreRegTime[]> {
        try {
            return this.getAvailableTimesForDayAction.execute(
                serviceCenterId,
                serviceId,
                date
            );
        } catch (error) {
            console.error("Error deleting service:", error);
            throw new Error("Failed to delete service");
        }
    }
}

const servicesService = new ServicesService();
export default servicesService;
