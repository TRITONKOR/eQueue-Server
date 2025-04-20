import {
    IServiceRepository,
    Service,
} from "../../../infra/db/repositories/service/ServiceRepository";

export class GetServiceByIdAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(id: string): Promise<Service> {
        try {
            const service = await this.serviceRepository.getById(id);

            if (!service) {
                throw new Error("Service not found");
            }
            return service;
        } catch (error) {
            console.error("Error getting service:", error);
            throw new Error("Failed to get service");
        }
    }
}
