import { PreRegDay } from "../../../../app/actions/service/GetAvailableDays";
import { PreRegTime } from "../../../../app/actions/service/GetAvailableTimesForDay";
import {
    Service,
    ServiceCreateData,
    ServiceUpdateData,
} from "../../../../infra/db/repositories/service/ServiceRepository";

export interface IServicesService {
    getAll(): Promise<Service[]>;
    getById(id: string): Promise<Service | null>;
    createService(serviceData: ServiceCreateData): Promise<Service>;
    updateService(id: string, serviceData: ServiceUpdateData): Promise<Service>;
    deleteService(id: string): Promise<void>;
    getAllServicesByCenterId(
        serviceCenterId: string
    ): Promise<Service[] | null>;
    getAvailableDays(
        serviceCenterId: string,
        serviceId: string
    ): Promise<PreRegDay[]>;
    getAvailableTimes(
        serviceCenterId: string,
        serviceId: string,
        date: string
    ): Promise<PreRegTime[]>;
}
