import {
    IServiceRepository,
    Service,
    ServiceUpdateData,
} from "../../../infra/db/repositories/service/ServiceRepository";

export class UpdateServiceAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(
        id: string,
        serviceData: ServiceUpdateData
    ): Promise<Service> {
        try {
            const updatedService = await this.serviceRepository.update(
                id,
                serviceData
            );

            return updatedService;
        } catch (error) {
            console.error("Error updating service:", error);
            throw new Error("Failed to updating service");
        }
    }
}
