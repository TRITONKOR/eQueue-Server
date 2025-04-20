import {
    IServiceCenterRepository,
    ServiceCenter,
} from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";

export class GetServiceCenterByIdAction {
    private serviceCenterRepository: IServiceCenterRepository;

    constructor(serviceCenterRepository: IServiceCenterRepository) {
        this.serviceCenterRepository = serviceCenterRepository;
    }

    async execute(id: string): Promise<ServiceCenter> {
        try {
            const serviceCenter = await this.serviceCenterRepository.getById(
                id
            );

            if (!serviceCenter) {
                throw new Error("Service Center not found");
            }
            return serviceCenter;
        } catch (error) {
            console.error("Error getting service Center:", error);
            throw new Error("Failed to get service Center");
        }
    }
}
