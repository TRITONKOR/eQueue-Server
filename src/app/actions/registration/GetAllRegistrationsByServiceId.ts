import {
    IRegistrationRepository,
    Registration,
} from "../../../infra/db/repositories/registration/RegistrationRepository";

export class GetAllRegistrationsByServiceIdAction {
    private registrationRepository: IRegistrationRepository;

    constructor(registrationRepository: IRegistrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async execute(serviceId: string): Promise<Registration[]> {
        try {
            const registrations =
                await this.registrationRepository.getAllByServiceId(serviceId);

            return registrations ?? [];
        } catch (error) {
            console.error("Error getting services:", error);
            throw new Error("Failed to get services");
        }
    }
}
