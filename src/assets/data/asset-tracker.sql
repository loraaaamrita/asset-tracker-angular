-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS asset_id_seq;

-- Table Definition
CREATE TABLE "public"."asset" (
    "id" int4 NOT NULL DEFAULT nextval('asset_id_seq'::regclass),
    "tenant_id" uuid,
    "name" varchar,
    "unit_number" varchar,
    "picture" varchar,
    "lat" float8,
    "lng" float8,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archived" int4,
    "category_id" int4,
    "status_id" int4,
    "yard_id" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS asset_location_log_id_seq;

-- Table Definition
CREATE TABLE "public"."asset_log" (
    "id" int4 NOT NULL DEFAULT nextval('asset_location_log_id_seq'::regclass),
    "tenant_id" uuid,
    "asset_label" varchar,
    "lat" float8,
    "lng" float8,
    "move_date" timestamp,
    "move_user_label" varchar,
    "status_label" varchar,
    "unit_number" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS category_id_seq;

-- Table Definition
CREATE TABLE "public"."asset_status" (
    "id" int4 NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    "tenant_id" uuid,
    "status" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archived" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS asset_vitals_new_id_seq;

-- Table Definition
CREATE TABLE "public"."asset_vitals" (
    "id" int4 NOT NULL DEFAULT nextval('asset_vitals_new_id_seq'::regclass),
    "tenant_id" uuid,
    "asset_id" int4,
    "purchase_date" timestamp,
    "current_address" varchar,
    "nearest_city" varchar,
    "capital_cost" float8,
    "maintenance_cost" float8,
    "hours_billed" float8,
    "hours_worked" float8,
    PRIMARY KEY ("id")
);

CREATE SEQUENCE IF NOT EXISTS category_id_seq;

-- Table Definition
CREATE TABLE "public"."category" (
    "id" int4 NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    "tenant_id" uuid,
    "category" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archived" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS contact_id_seq;

-- Table Definition
CREATE TABLE "public"."company" (
    "id" int4 NOT NULL DEFAULT nextval('contact_id_seq'::regclass),
    "tenant_id" uuid,
    "company_name" varchar,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar,
    "address_street" varchar,
    "address_city" varchar,
    "address_prov_state" varchar,
    "address_country" varchar,
    "address_postal_zip" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "company_image" varchar,
    "lat" float8,
    "lng" float8,
    "user_created" int4,
    "user_archive" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS media_id_seq;

-- Table Definition
CREATE TABLE "public"."media" (
    "id" int4 NOT NULL DEFAULT nextval('media_id_seq'::regclass),
    "tenant_id" uuid,
    "file_name" varchar,
    "description" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "category_id" int4,
    "user_created" int4,
    "user_archived" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS permission_id_seq;

-- Table Definition
CREATE TABLE "public"."permission" (
    "id" int4 NOT NULL DEFAULT nextval('permission_id_seq'::regclass),
    "tenant_id" uuid,
    "role_id" int4,
    "asset_create" bool,
    "asset_read" bool,
    "asset_update" bool,
    "asset_delete" bool,
    "asset_log_read" bool,
    "asset_map_update" bool,
    "asset_map_read" bool,
    "billing_create" bool,
    "billing_read" bool,
    "billing_update" bool,
    "billing_delete" bool,
    "category_create" bool,
    "category_read" bool,
    "category_update" bool,
    "category_delete" bool,
    "company_read" bool,
    "company_update" bool,
    "media_read" bool,
    "media_update" bool,
    "media_delete" bool,
    "media_create" bool,
    "payment_create" bool,
    "payment_read" bool,
    "payment_update" bool,
    "payment_delete" bool,
    "permission_read" bool,
    "permission_update" bool,
    "role_create" bool,
    "role_read" bool,
    "role_update" bool,
    "role_delete" bool,
    "status_create" bool,
    "status_read" bool,
    "status_update" bool,
    "status_delete" bool,
    "user_create" bool,
    "user_read" bool,
    "user_update" bool,
    "user_delete" bool,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archived" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS role_id_seq;

-- Table Definition
CREATE TABLE "public"."role" (
    "id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
    "tenant_id" uuid,
    "role" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archive" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tenant_id_seq;

-- Table Definition
CREATE TABLE "public"."tenant" (
    "id" int4 NOT NULL DEFAULT nextval('tenant_id_seq'::regclass),
    "tenant_id" uuid NOT NULL,
    "company_logo" varchar,
    "company_name" varchar,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar,
    "address_street" varchar,
    "address_city" varchar,
    "address_prov_state" varchar,
    "address_country" varchar,
    "address_postal_zip" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archive" int4,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_id_seq;

-- Table Definition
CREATE TABLE "public"."user" (
    "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    "tenant_id" uuid NOT NULL,
    "role_id" int4,
    "first_name" varchar,
    "last_name" varchar,
    "password" varchar,
    "email" varchar,
    "status" varchar,
    "profile_image" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archived" int4,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id"),
    PRIMARY KEY ("id")
);

CREATE SEQUENCE IF NOT EXISTS yard_id_seq;

-- Table Definition
CREATE TABLE "public"."yard" (
    "id" int4 NOT NULL DEFAULT nextval('yard_id_seq'::regclass),
    "tenant_id" uuid,
    "name" varchar,
    "email" varchar,
    "lat" float8,
    "lng" float8,
    "address_street" varchar,
    "address_city" varchar,
    "address_prov_state" varchar,
    "address_country" varchar,
    "address_postal_zip" varchar,
    "date_created" timestamp,
    "date_archived" timestamp,
    "user_created" int4,
    "user_archive" int4,
    PRIMARY KEY ("id")
);

--Insert to create data

INSERT INTO "public"."asset_status" (tenant_id, status)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', 'Available');

INSERT INTO "public"."asset_status" (tenant_id, status)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', 'Booked');

INSERT INTO "public"."asset_status" (tenant_id, status)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', 'Maintenance');

INSERT INTO "public"."category" (tenant_id, category)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', 'category 1');

INSERT INTO "public"."category" (tenant_id, category)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', 'category 2');

INSERT INTO "public"."role" (tenant_id, role)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', 'Admin');

INSERT INTO "public"."permission" (tenant_id, role_id)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', '1');

INSERT INTO "public"."user" (tenant_id, role_id, first_name)
VALUES ('0451fd27-02f5-4a00-b100-7f6e80b32e45', '1', 'robot');