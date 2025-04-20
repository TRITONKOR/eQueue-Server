import { ServiceDrizzleRepository } from "./ServiceDrizzleRepository";

export interface IServiceRepository {
    getAll(): Promise<Service[]>;
    getById(id: string): Promise<Service | null>;
    create(service: ServiceCreateData): Promise<Service>;
    update(id: string, service: ServiceUpdateData): Promise<Service>;
    delete(id: string): Promise<void>;
    getByServiceCenterId(serviceCenterId: string): Promise<Service[] | null>;
    getTakenTimes(
        serviceCenterId: string,
        serviceId: string,
        date: string
    ): Promise<string[]>;
}

export interface Service {
    id: string;
    serviceCenterId: string;
    description: string;
}

export interface ServiceCreateData {
    serviceCenterId: string;
    description: string;
}

export interface ServiceUpdateData {
    serviceCenterId?: string;
    description?: string;
}

export const getServiceRepository = (): IServiceRepository => {
    return new ServiceDrizzleRepository();
};
