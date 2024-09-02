CREATE TABLE IF NOT EXISTS "subhub_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "subhub_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_payment_assurance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"covered_amount" numeric(10, 2),
	"start_date" date,
	"end_date" date,
	"status" varchar(50),
	"recovery_amount" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"subscription_id" integer,
	"amount" numeric(10, 2),
	"status" varchar(50),
	"payment_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_by_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_provider" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"api_key" varchar(255),
	"category" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"provider_id" integer,
	"plan_name" varchar(255),
	"amount" numeric(10, 2),
	"billing_cycle" varchar(50),
	"next_billing_date" date,
	"status" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_user_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"total_saved" numeric(10, 2),
	"subscription_count" integer,
	"last_optimization_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp,
	"image" varchar(255),
	"password_hash" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"plan_tier" varchar(50),
	"total_subscription_value" numeric(10, 2),
	"banned_reason" text,
	"banned_until" timestamp,
	"banned_at" timestamp,
	"admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "subhub_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subhub_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "subhub_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_account" ADD CONSTRAINT "subhub_account_user_id_subhub_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_payment_assurance" ADD CONSTRAINT "subhub_payment_assurance_user_id_subhub_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_payment" ADD CONSTRAINT "subhub_payment_user_id_subhub_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_payment" ADD CONSTRAINT "subhub_payment_subscription_id_subhub_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subhub_subscription"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_post" ADD CONSTRAINT "subhub_post_created_by_id_subhub_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_session" ADD CONSTRAINT "subhub_session_user_id_subhub_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_subscription" ADD CONSTRAINT "subhub_subscription_user_id_subhub_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_subscription" ADD CONSTRAINT "subhub_subscription_provider_id_subhub_provider_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."subhub_provider"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subhub_user_analytics" ADD CONSTRAINT "subhub_user_analytics_user_id_subhub_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."subhub_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "subhub_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "subhub_session" USING btree ("user_id");