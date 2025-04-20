import {
    IServiceCenterRepository,
    ServiceCenter,
    ServiceCenterCreateData,
} from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";

export class CreateServiceCenterAction {
    private serviceCenterRepository: IServiceCenterRepository;

    constructor(serviceCenterRepository: IServiceCenterRepository) {
        this.serviceCenterRepository = serviceCenterRepository;
    }

    async execute(
        serviceCenterData: ServiceCenterCreateData
    ): Promise<ServiceCenter> {
        try {
            const createdServiceCenter =
                await this.serviceCenterRepository.create(serviceCenterData);

            return createdServiceCenter;
        } catch (error) {
            console.error("Error creating service center:", error);
            throw new Error("Failed to create service center");
        }
    }
}
