import { IServiceCenterRepository } from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";

export class DeleteServiceCenterAction {
    private serviceCenterRepository: IServiceCenterRepository;

    constructor(serviceCenterRepository: IServiceCenterRepository) {
        this.serviceCenterRepository = serviceCenterRepository;
    }

    async execute(id: string): Promise<void> {
        try {
            await this.serviceCenterRepository.delete(id);
        } catch (error) {
            console.error("Error deleting service center:", error);
            throw new Error("Failed to delete service center");
        }
    }
}
