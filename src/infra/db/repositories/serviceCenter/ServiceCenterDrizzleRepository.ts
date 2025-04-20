import { eq } from "drizzle-orm";
import db from "../..";
import { serviceCentersTable } from "../../schema";
import {
    IServiceCenterRepository,
    ServiceCenter,
    ServiceCenterCreateData,
    ServiceCenterUpdateData,
} from "./ServiceCenterRepository";

export class ServiceCenterDrizzleRepository
    implements IServiceCenterRepository
{
    async getAll(): Promise<ServiceCenter[]> {
        return db.select().from(serviceCentersTable);
    }

    async getById(id: string): Promise<ServiceCenter | null> {
        const result = await db
            .select()
            .from(serviceCentersTable)
            .where(eq(serviceCentersTable.id, id));
        return result[0] || null;
    }

    async create(center: ServiceCenterCreateData): Promise<ServiceCenter> {
        const createdServiceCenter = await db
            .insert(serviceCentersTable)
            .values(center)
            .returning();
        return createdServiceCenter[0];
    }

    async update(
        id: string,
        centerData: ServiceCenterUpdateData
    ): Promise<ServiceCenter | null> {
        const updatedServiceCenter = await db
            .update(serviceCentersTable)
            .set(centerData)
            .where(eq(serviceCentersTable.id, id))
            .returning();
        return updatedServiceCenter[0] || null;
    }

    async delete(id: string): Promise<void> {
        await db
            .delete(serviceCentersTable)
            .where(eq(serviceCentersTable.id, id));
    }
}
