import {
    ServiceCenter,
    ServiceCenterCreateData,
    ServiceCenterUpdateData,
} from "../../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";

export interface IServiceCenterService {
    getAll(): Promise<ServiceCenter[]>;
    getById(id: string): Promise<ServiceCenter | null>;
    createServiceCenter(
        centerData: ServiceCenterCreateData
    ): Promise<ServiceCenter>;
    updateServiceCenter(
        id: string,
        centerData: ServiceCenterUpdateData
    ): Promise<ServiceCenter>;
    deleteServiceCenter(id: string): Promise<void>;
}
