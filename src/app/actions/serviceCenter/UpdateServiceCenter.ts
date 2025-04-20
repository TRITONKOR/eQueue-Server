import {
    IServiceCenterRepository,
    ServiceCenter,
    ServiceCenterUpdateData,
} from "../../../infra/db/repositories/serviceCenter/ServiceCenterRepository";

export class UpdateServiceCenterAction {
    private serviceCenterRepository: IServiceCenterRepository;

    constructor(serviceCenterRepository: IServiceCenterRepository) {
        this.serviceCenterRepository = serviceCenterRepository;
    }

    async execute(
        centerId: string,
        serviceCenterData: ServiceCenterUpdateData
    ): Promise<ServiceCenter> {
        try {
            const updatedServiceCenter =
                await this.serviceCenterRepository.update(
                    centerId,
                    serviceCenterData
                );

            if (!updatedServiceCenter) {
                throw new Error("Service center not found");
            }
            return updatedServiceCenter;
        } catch (error) {
            console.error("Error updating service center:", error);
            throw new Error("Failed to update service center");
        }
    }
}
