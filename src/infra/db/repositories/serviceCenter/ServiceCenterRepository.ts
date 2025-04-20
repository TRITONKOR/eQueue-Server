import { ServiceCenterDrizzleRepository } from "./ServiceCenterDrizzleRepository";

export interface IServiceCenterRepository {
    getAll(): Promise<ServiceCenter[]>;
    getById(id: string): Promise<ServiceCenter | null>;
    create(centerData: ServiceCenterCreateData): Promise<ServiceCenter>;
    update(
        id: string,
        centerData: ServiceCenterUpdateData
    ): Promise<ServiceCenter | null>;
    delete(id: string): Promise<void>;
}

export interface ServiceCenter {
    id: string;
    name: string;
    location: string;
    isActive: boolean;
}

export interface ServiceCenterCreateData {
    name: string;
    location: string;
    isActive: boolean;
}

export interface ServiceCenterUpdateData {
    name?: string;
    isActive?: boolean;
}

export const getServiceCenterRepository = (): IServiceCenterRepository => {
    return new ServiceCenterDrizzleRepository();
};
