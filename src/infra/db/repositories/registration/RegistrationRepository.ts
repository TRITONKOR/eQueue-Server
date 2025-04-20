import { RegistrationDrizzleRepository } from "./RegistrationDrizzleRepository";

export interface IRegistrationRepository {
    getAll(): Promise<Registration[]>;
    getById(id: string): Promise<Registration | null>;
    create(registration: RegistrationCreateData): Promise<Registration>;
    update(
        id: string,
        registration: RegistrationUpdateData
    ): Promise<Registration>;
    delete(id: string): Promise<void>;
    getAllByServiceId(serviceCenterId: string): Promise<Registration[] | null>;
    getRegistrationsByDateAndService(
        serviceDate: string,
        serviceId: string
    ): Promise<Registration[]>;
}

export interface Registration {
    id: string;
    serviceId: string;
    clientFullName: string;
    clientEmail: string | null;
    clientPhone: string;
    clientLegalPersonName: string | null;
    serviceDate: string;
    serviceTime: string;
}

export interface RegistrationCreateData {
    serviceId: string;
    clientFullName: string;
    clientEmail: string | null;
    clientPhone: string;
    clientLegalPersonName: string | null;
    serviceDate: string;
    serviceTime: string;
}

export interface RegistrationUpdateData {
    clientFullName?: string;
    clientEmail?: string;
    clientPhone?: string;
    clientLegalPersonName?: string;
    serviceDate?: string;
    serviceTime?: string;
}

export const getRegistrationRepository = (): IRegistrationRepository => {
    return new RegistrationDrizzleRepository();
};
