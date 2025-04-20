import { and, eq } from "drizzle-orm";
import db from "../..";
import { registrationsTable } from "../../schema";
import {
    IRegistrationRepository,
    Registration,
    RegistrationCreateData,
    RegistrationUpdateData,
} from "./RegistrationRepository";

export class RegistrationDrizzleRepository implements IRegistrationRepository {
    async getAll(): Promise<Registration[]> {
        return db.select().from(registrationsTable);
    }

    async getById(id: string): Promise<Registration | null> {
        const result = await db
            .select()
            .from(registrationsTable)
            .where(eq(registrationsTable.id, id));
        return result[0] || null;
    }

    async getAllByServiceId(serviceId: string): Promise<Registration[] | null> {
        const result = await db
            .select()
            .from(registrationsTable)
            .where(eq(registrationsTable.serviceId, serviceId));
        return result || null;
    }

    async create(registration: RegistrationCreateData): Promise<Registration> {
        const createdRegistration = await db
            .insert(registrationsTable)
            .values(registration)
            .returning();
        return createdRegistration[0];
    }

    async update(
        id: string,
        registration: RegistrationUpdateData
    ): Promise<Registration> {
        const updatedRegistration = await db
            .update(registrationsTable)
            .set(registration)
            .where(eq(registrationsTable.id, id))
            .returning();
        return updatedRegistration[0];
    }

    async delete(id: string): Promise<void> {
        await db
            .delete(registrationsTable)
            .where(eq(registrationsTable.id, id));
    }

    async getRegistrationsByDateAndService(
        serviceDate: string,
        serviceId: string
    ): Promise<Registration[]> {
        const result = await db
            .select()
            .from(registrationsTable)
            .where(
                and(
                    eq(registrationsTable.serviceDate, serviceDate),
                    eq(registrationsTable.serviceId, serviceId)
                )
            );
        return result || [];
    }
}
