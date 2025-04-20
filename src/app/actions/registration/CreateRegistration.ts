import {
    IRegistrationRepository,
    Registration,
    RegistrationCreateData,
} from "../../../infra/db/repositories/registration/RegistrationRepository";

export class CreateRegistrationAction {
    private registrationRepository: IRegistrationRepository;

    constructor(registrationRepository: IRegistrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async execute(registration: RegistrationCreateData): Promise<Registration> {
        try {
            const createdRegistration =
                await this.registrationRepository.create(registration);

            return createdRegistration;
        } catch (error) {
            console.error("Error creating registration:", error);
            throw new Error("Failed to create registration");
        }
    }
}
