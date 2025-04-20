import {
    IServiceRepository,
    Service,
} from "../../../infra/db/repositories/service/ServiceRepository";

export class GetAllServicesByCenterIdAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(centerId: string): Promise<Service[]> {
        try {
            const services = await this.serviceRepository.getByServiceCenterId(
                centerId
            );

            return services ?? [];
        } catch (error) {
            console.error("Error getting services:", error);
            throw new Error("Failed to get services");
        }
    }
}
