import { CreateRegistrationAction } from "../../../app/actions/registration/CreateRegistration";
import { DeleteRegistrationAction } from "../../../app/actions/registration/DeleteRegistration";
import { GetAllRegistrationsByServiceIdAction } from "../../../app/actions/registration/GetAllRegistrationsByServiceId";
import { GetRegistrationByIdAction } from "../../../app/actions/registration/GetRegistrationById";
import { UpdateRegistrationAction } from "../../../app/actions/registration/UpdateRegistration";
import {
    getRegistrationRepository,
    Registration,
    RegistrationUpdateData,
} from "../../../infra/db/repositories/registration/RegistrationRepository";
import { IRegistrationService } from "./interfaces/RegistrationInterfaces";

export class RegistrationService implements IRegistrationService {
    private createRegistrationAction: CreateRegistrationAction;
    private updateRegistrationAction: UpdateRegistrationAction;
    private deleteRegistrationAction: DeleteRegistrationAction;
    private getRegistrationByIdAction: GetRegistrationByIdAction;
    private getAllRegistrationsByServiceIdAction: GetAllRegistrationsByServiceIdAction;

    constructor() {
        const registrationRepository = getRegistrationRepository();

        this.createRegistrationAction = new CreateRegistrationAction(
            registrationRepository
        );
        this.updateRegistrationAction = new UpdateRegistrationAction(
            registrationRepository
        );
        this.deleteRegistrationAction = new DeleteRegistrationAction(
            registrationRepository
        );
        this.getRegistrationByIdAction = new GetRegistrationByIdAction(
            registrationRepository
        );
        this.getAllRegistrationsByServiceIdAction =
            new GetAllRegistrationsByServiceIdAction(registrationRepository);
    }
    getById(id: string): Promise<Registration | null> {
        try {
            const registration = this.getRegistrationByIdAction.execute(id);
            return registration;
        } catch (error) {
            console.error("Error getting registration:", error);
            throw new Error("Failed to get registration");
        }
    }

    async getAll(): Promise<Registration[]> {
        throw new Error("Method not implemented.");
    }

    async create(registration: Registration): Promise<Registration> {
        try {
            const createdRegistration =
                await this.createRegistrationAction.execute(registration);
            return createdRegistration;
        } catch (error) {
            console.error("Error creating registration:", error);
            throw new Error("Failed to create registration");
        }
    }

    async update(
        id: string,
        registration: RegistrationUpdateData
    ): Promise<Registration> {
        try {
            const updatedRegistration =
                await this.updateRegistrationAction.execute(id, registration);
            return updatedRegistration;
        } catch (error) {
            console.error("Error updating registration:", error);
            throw new Error("Failed to update registration");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.deleteRegistrationAction.execute(id);
        } catch (error) {
            console.error("Error deleting registration:", error);
            throw new Error("Failed to delete registration");
        }
    }

    async getAllByServiceId(serviceId: string): Promise<Registration[] | null> {
        try {
            const registrations =
                await this.getAllRegistrationsByServiceIdAction.execute(
                    serviceId
                );
            return registrations;
        } catch (error) {
            console.error("Error getting registrations:", error);
            throw new Error("Failed to getting registrations");
        }
    }

    async getRegistrationsByDateAndService(
        serviceDate: string,
        serviceId: string
    ): Promise<Registration[]> {
        try {
            const registrations =
                await this.getAllRegistrationsByServiceIdAction.execute(
                    serviceId
                );
            return registrations;
        } catch (error) {
            console.error("Error getting registrations:", error);
            throw new Error("Failed to getting registrations");
        }
    }
}

const registrationService = new RegistrationService();
export default registrationService;
