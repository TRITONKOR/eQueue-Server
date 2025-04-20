import { and, eq } from "drizzle-orm";
import db from "../..";
import { registrationsTable, servicesTable } from "../../schema";
import {
    IServiceRepository,
    Service,
    ServiceCreateData,
    ServiceUpdateData,
} from "./ServiceRepository";

export class ServiceDrizzleRepository implements IServiceRepository {
    async getAll(): Promise<Service[]> {
        return db.select().from(servicesTable);
    }

    async getById(id: string): Promise<Service | null> {
        const result = await db
            .select()
            .from(servicesTable)
            .where(eq(servicesTable.id, id));
        return result[0] || null;
    }

    async getByServiceCenterId(
        serviceCenterId: string
    ): Promise<Service[] | null> {
        const result = await db
            .select()
            .from(servicesTable)
            .where(eq(servicesTable.serviceCenterId, serviceCenterId));
        return result || null;
    }

    async create(service: ServiceCreateData): Promise<Service> {
        const createdService = await db
            .insert(servicesTable)
            .values(service)
            .returning();
        return createdService[0];
    }

    async update(id: string, service: ServiceUpdateData): Promise<Service> {
        const updatedService = await db
            .update(servicesTable)
            .set(service)
            .where(eq(servicesTable.id, id))
            .returning();
        return updatedService[0] || null;
    }

    async delete(id: string): Promise<void> {
        await db.delete(servicesTable).where(eq(servicesTable.id, id));
    }

    async getTakenTimes(
        serviceCenterId: string,
        serviceId: string,
        date: string
    ): Promise<string[]> {
        const results = await db
            .select({
                time: registrationsTable.serviceTime,
            })
            .from(registrationsTable)
            .where(
                and(
                    eq(registrationsTable.serviceId, serviceId),
                    eq(registrationsTable.serviceDate, date)
                )
            );

        return results.map((r) => r.time);
    }
}
