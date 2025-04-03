import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const serviceCentersTable = pgTable("service_centers", {
    id: uuid().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
    isActive: boolean().notNull().default(true),
});

export const servicesTable = pgTable("services", {
    id: uuid().primaryKey(),
    serviceCenterId: uuid()
        .notNull()
        .references(() => serviceCentersTable.id),
    description: varchar({ length: 255 }).notNull(),
});

export const registrationsTable = pgTable("registrations", {
    id: uuid().primaryKey(),
    serviceId: uuid()
        .notNull()
        .references(() => servicesTable.id),
    serviceCenterId: uuid()
        .notNull()
        .references(() => serviceCentersTable.id),
    clientFullName: varchar({ length: 255 }).notNull(),
    clientEmail: varchar({ length: 255 }).notNull(),
    clientPhone: varchar({ length: 14 }),
    clientLegalPersonName: varchar({ length: 255 }),
    serviceDate: varchar({ length: 255 }).notNull(),
    serviceTime: varchar({ length: 255 }).notNull(),
});
