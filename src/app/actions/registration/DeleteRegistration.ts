import { IRegistrationRepository } from "../../../infra/db/repositories/registration/RegistrationRepository";

export class DeleteRegistrationAction {
    private registrationRepository: IRegistrationRepository;

    constructor(registrationRepository: IRegistrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    async execute(id: string): Promise<void> {
        try {
            await this.registrationRepository.delete(id);
        } catch (error) {
            console.error("Error deleting registration:", error);
            throw new Error("Failed to delete registration");
        }
    }
}
