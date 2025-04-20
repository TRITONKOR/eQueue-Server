import {
    IRegistrationRepository,
    Registration,
} from "../../../infra/db/repositories/registration/RegistrationRepository";

export class GetRegistrationByIdAction {
    private registrationRepository: IRegistrationRepository;

    constructor(registrationRepository: IRegistrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async execute(serviceId: string): Promise<Registration> {
        try {
            const registration = await this.registrationRepository.getById(
                serviceId
            );

            if (!registration) {
                throw new Error("Registration not found");
            }
            return registration;
        } catch (error) {
            console.error("Error getting services:", error);
            throw new Error("Failed to get services");
        }
    }
}
