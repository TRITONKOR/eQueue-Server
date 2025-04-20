import {
    IServiceRepository,
    Service,
    ServiceCreateData,
} from "../../../infra/db/repositories/service/ServiceRepository";

export class CreateServiceAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(serviceData: ServiceCreateData): Promise<Service> {
        try {
            const createdService = await this.serviceRepository.create(
                serviceData
            );

            return createdService;
        } catch (error) {
            console.error("Error creating service:", error);
            throw new Error("Failed to create service");
        }
    }
}
