CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"serviceId" uuid NOT NULL,
	"clientFullName" varchar(255) NOT NULL,
	"clientEmail" varchar(255),
	"clientPhone" varchar(14) NOT NULL,
	"clientLegalPersonName" varchar(255),
	"serviceDate" varchar(255) NOT NULL,
	"serviceTime" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_centers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"serviceCenterId" uuid NOT NULL,
	"description" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_serviceCenterId_service_centers_id_fk" FOREIGN KEY ("serviceCenterId") REFERENCES "public"."service_centers"("id") ON DELETE cascade ON UPDATE no action;