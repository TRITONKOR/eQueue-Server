import {
    IServiceCenterRepository,
    ServiceCenter,
} from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";

export class GetAllServiceCenterAction {
    private serviceCenterRepository: IServiceCenterRepository;

    constructor(serviceCenterRepository: IServiceCenterRepository) {
        this.serviceCenterRepository = serviceCenterRepository;
    }

    async execute(): Promise<ServiceCenter[]> {
        try {
            const createdServiceCenter =
                await this.serviceCenterRepository.getAll();

            return createdServiceCenter;
        } catch (error) {
            console.error("Error creating service center:", error);
            throw new Error("Failed to create service center");
        }
    }
}
