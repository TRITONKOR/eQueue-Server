import { IServiceRepository } from "../../../infra/db/repositories/service/ServiceRepository";

export interface PreRegTime {
    StartTime: string;
    IsAllow: number;
}

export class GetAvailableTimesForDayAction {
    private serviceRepository: IServiceRepository;

    constructor(serviceRepository: IServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(
        serviceCenterId: string,
        serviceId: string,
        date: string
    ): Promise<PreRegTime[]> {
        const workingHours = Array.from({ length: 9 }, (_, i) => 8 + i); // 08–16

        const takenTimes = await this.serviceRepository.getTakenTimes(
            serviceCenterId,
            serviceId,
            date
        );

        const availableTimes: PreRegTime[] = workingHours.map((hour) => {
            const timeStr = `${hour.toString().padStart(2, "0")}:00`;
            return {
                StartTime: timeStr,
                IsAllow: takenTimes.includes(timeStr) ? 0 : 1,
            };
        });

        return availableTimes;
    }
}
