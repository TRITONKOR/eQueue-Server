import { IServiceRepository } from "../../../infra/db/repositories/service/ServiceRepository";

export interface PreRegDay {
    DatePart: string;
    IsAllow: number;
}

export class GetAvailableDaysAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(
        serviceCenterId: string,
        serviceId: string
    ): Promise<PreRegDay[]> {
        const today = new Date();
        const days: PreRegDay[] = [];

        for (let i = 0; i < 3; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const yyyy = currentDate.getFullYear();
            const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
            const dd = String(currentDate.getDate()).padStart(2, "0");
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            const takenTimes = await this.serviceRepository.getTakenTimes(
                serviceCenterId,
                serviceId,
                formattedDate
            );

            const isFull = takenTimes.length >= 9; // 9 годин = 8:00–16:00
            days.push({
                DatePart: formattedDate,
                IsAllow: isFull ? 0 : 1,
            });
        }

        return days;
    }
}
