import {
    IRegistrationRepository,
    Registration,
} from "../../../infra/db/repositories/registration/RegistrationRepository";

export class GetRegistrationsByDateAndServiceAction {
    private registrationRepository: IRegistrationRepository;

    constructor(registrationRepository: IRegistrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async execute(
        serviceDate: string,
        serviceId: string
    ): Promise<Registration[]> {
        try {
            const registrations =
                await this.registrationRepository.getRegistrationsByDateAndService(
                    serviceDate,
                    serviceId
                );

            if (!registrations) {
                throw new Error("Registration not found");
            }
            return registrations;
        } catch (error) {
            console.error("Error getting services:", error);
            throw new Error("Failed to get services");
        }
    }
}
