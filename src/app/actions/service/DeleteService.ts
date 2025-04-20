import { IServiceRepository } from "../../../infra/db/repositories/service/ServiceRepository";

export class DeleteServiceAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(id: string): Promise<void> {
        try {
            await this.serviceRepository.delete(id);
        } catch (error) {
            console.error("Error deleting service:", error);
            throw new Error("Failed to delete service");
        }
    }
}
