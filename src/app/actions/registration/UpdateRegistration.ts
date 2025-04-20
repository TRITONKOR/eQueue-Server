import {
    IRegistrationRepository,
    Registration,
    RegistrationUpdateData,
} from "../../../infra/db/repositories/registration/RegistrationRepository";

export class UpdateRegistrationAction {
    private registrationRepository: IRegistrationRepository;

    constructor(registrationRepository: IRegistrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async execute(
        id: string,
        registration: RegistrationUpdateData
    ): Promise<Registration> {
        try {
            const updatedRegistration =
                await this.registrationRepository.update(id, registration);

            return updatedRegistration;
        } catch (error) {
            console.error("Error updating registration:", error);
            throw new Error("Failed to update registration");
        }
    }
}
