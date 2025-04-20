import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const serviceCentersTable = pgTable("service_centers", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
    isActive: boolean().notNull().default(true),
});

export const servicesTable = pgTable("services", {
    id: uuid().primaryKey().defaultRandom(),
    serviceCenterId: uuid()
        .notNull()
        .references(() => serviceCentersTable.id, { onDelete: "cascade" }),
    description: varchar({ length: 255 }).notNull(),
});

export const registrationsTable = pgTable("registrations", {
    id: uuid().primaryKey().defaultRandom(),
    serviceId: uuid()
        .notNull()
        .references(() => servicesTable.id, { onDelete: "cascade" }),
    clientFullName: varchar({ length: 255 }).notNull(),
    clientEmail: varchar({ length: 255 }),
    clientPhone: varchar({ length: 14 }).notNull(),
    clientLegalPersonName: varchar({ length: 255 }),
    serviceDate: varchar({ length: 255 }).notNull(),
    serviceTime: varchar({ length: 255 }).notNull(),
});
