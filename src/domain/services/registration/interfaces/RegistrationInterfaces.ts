import {
    Registration,
    RegistrationCreateData,
    RegistrationUpdateData,
} from "../../../../infra/db/repositories/registration/RegistrationRepository";

export interface IRegistrationService {
    getAll(): Promise<Registration[]>;
    getById(id: string): Promise<Registration | null>;
    create(registration: RegistrationCreateData): Promise<Registration>;
    update(
        id: string,
        registration: RegistrationUpdateData
    ): Promise<Registration>;
    delete(id: string): Promise<void>;
    getAllByServiceId(serviceId: string): Promise<Registration[] | null>;
    getRegistrationsByDateAndService(
        serviceDate: string,
        serviceId: string
    ): Promise<Registration[]>;
}
