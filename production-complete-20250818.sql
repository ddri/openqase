

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."recover_content"("table_name" "text", "content_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  allowed_tables TEXT[] := ARRAY['case_studies', 'blog_posts', 'algorithms', 'industries', 'personas'];
BEGIN
  -- Validate table name to prevent SQL injection
  IF NOT (table_name = ANY(allowed_tables)) THEN
    RAISE EXCEPTION 'Invalid table name: %', table_name;
  END IF;

  -- Validate content_id exists
  IF content_id IS NULL THEN
    RAISE EXCEPTION 'Content ID cannot be NULL';
  END IF;

  -- Perform the recovery
  EXECUTE format('
    UPDATE %I 
    SET deleted_at = NULL,
        deleted_by = NULL
    WHERE id = %L
    AND deleted_at IS NOT NULL',  -- Only recover if actually deleted
    table_name,
    content_id
  );
  
  RETURN FOUND;
END;
$$;


ALTER FUNCTION "public"."recover_content"("table_name" "text", "content_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_blog_posts_published_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.published = TRUE AND OLD.published = FALSE THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_blog_posts_published_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_published_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.published = TRUE AND OLD.published = FALSE THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_published_at_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."setup_admin_role"("admin_email" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Insert or update user preferences with admin role
  INSERT INTO user_preferences (id, role)
  SELECT au.id, 'admin'
  FROM auth.users au
  WHERE au.email = admin_email
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin';
END;
$$;


ALTER FUNCTION "public"."setup_admin_role"("admin_email" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."soft_delete_content"("table_name" "text", "content_id" "uuid", "deleted_by_user" "uuid" DEFAULT NULL::"uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  allowed_tables TEXT[] := ARRAY['case_studies', 'blog_posts', 'algorithms', 'industries', 'personas'];
BEGIN
  -- Validate table name to prevent SQL injection
  IF NOT (table_name = ANY(allowed_tables)) THEN
    RAISE EXCEPTION 'Invalid table name: %', table_name;
  END IF;

  -- Validate content_id exists
  IF content_id IS NULL THEN
    RAISE EXCEPTION 'Content ID cannot be NULL';
  END IF;

  -- Perform the soft delete
  EXECUTE format('
    UPDATE %I 
    SET deleted_at = NOW(),
        deleted_by = %L,
        published = false
    WHERE id = %L
    AND deleted_at IS NULL',  -- Only delete if not already deleted
    table_name,
    deleted_by_user,
    content_id
  );
  
  RETURN FOUND;
END;
$$;


ALTER FUNCTION "public"."soft_delete_content"("table_name" "text", "content_id" "uuid", "deleted_by_user" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_blog_posts_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_blog_posts_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_ts_content"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.ts_content = 
        setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.content, '')), 'C');
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_ts_content"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."verify_initial_setup"() RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
begin
    -- Verify all tables exist
    if not exists (
        select from information_schema.tables 
        where table_name in (
            'industries', 'personas', 'algorithms', 
            'user_preferences', 'case_studies', 
            'case_study_relations', 'stack_layers'
        )
    ) then
        return false;
    end if;

    -- Verify RLS is enabled
    if not exists (
        select from pg_tables 
        where tablename in ('case_studies', 'user_preferences', 'stack_layers')
        and rowsecurity = true
    ) then
        return false;
    end if;

    return true;
end;
$$;


ALTER FUNCTION "public"."verify_initial_setup"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."algorithm_case_study_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "algorithm_id" "uuid",
    "case_study_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."algorithm_case_study_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."algorithm_industry_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "algorithm_id" "uuid",
    "industry_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."algorithm_industry_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."algorithms" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "use_cases" "text"[],
    "quantum_advantage" "text",
    "published" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "main_content" "text",
    "ts_content" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"english"'::"regconfig", ((COALESCE("description", ''::"text") || ' '::"text") || COALESCE("main_content", ''::"text")))) STORED,
    "published_at" timestamp with time zone,
    "steps" "text" DEFAULT '[]'::"jsonb",
    "academic_references" "text",
    "is_system_record" boolean DEFAULT false,
    "deleted_at" timestamp with time zone,
    "deleted_by" "uuid"
);


ALTER TABLE "public"."algorithms" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."blog_post_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "blog_post_id" "uuid",
    "related_blog_post_id" "uuid",
    "relation_type" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."blog_post_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."blog_posts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "content" "text",
    "author" "text",
    "featured_image" "text",
    "category" "text",
    "tags" "text"[],
    "published" boolean DEFAULT false,
    "featured" boolean DEFAULT false,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "ts_content" "tsvector",
    "deleted_at" timestamp with time zone,
    "deleted_by" "uuid"
);


ALTER TABLE "public"."blog_posts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."case_studies" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "main_content" "text",
    "partner_companies" "text"[],
    "quantum_companies" "text"[],
    "algorithms" "text"[],
    "quantum_hardware" "text"[],
    "published" boolean DEFAULT false,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "academic_references" "text",
    "resource_links" "jsonb" DEFAULT '[]'::"jsonb",
    "quantum_software" "text"[],
    "year" smallint DEFAULT EXTRACT(year FROM "now"()) NOT NULL,
    "import_batch_name" character varying(10),
    "import_batch_id" "uuid",
    "import_source" "text",
    "import_timestamp" timestamp with time zone DEFAULT "now"(),
    "original_qookie_id" "text",
    "original_qookie_slug" "text",
    "featured" boolean DEFAULT false,
    "deleted_at" timestamp with time zone,
    "deleted_by" "uuid",
    CONSTRAINT "check_year_range" CHECK ((("year" >= 1990) AND ("year" <= 2030)))
);


ALTER TABLE "public"."case_studies" OWNER TO "postgres";


COMMENT ON COLUMN "public"."case_studies"."featured" IS 'Whether this case study should be featured on the homepage';



CREATE TABLE IF NOT EXISTS "public"."case_study_industry_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "case_study_id" "uuid",
    "industry_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."case_study_industry_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."case_study_persona_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "case_study_id" "uuid",
    "persona_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."case_study_persona_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."case_study_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "case_study_id" "uuid",
    "related_case_study_id" "uuid",
    "relation_type" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."case_study_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."industries" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "main_content" "text",
    "ts_content" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"english"'::"regconfig", ((COALESCE("description", ''::"text") || ' '::"text") || COALESCE("main_content", ''::"text")))) STORED,
    "published" boolean DEFAULT false,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "published_at" timestamp with time zone,
    "is_system_record" boolean DEFAULT false,
    "sector" "text"[],
    "deleted_at" timestamp with time zone,
    "deleted_by" "uuid"
);


ALTER TABLE "public"."industries" OWNER TO "postgres";


COMMENT ON COLUMN "public"."industries"."sector" IS 'Array of sector/segment names for industry categorization';



CREATE TABLE IF NOT EXISTS "public"."persona_algorithm_relations" (
    "persona_id" "uuid" NOT NULL,
    "algorithm_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."persona_algorithm_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."persona_industry_relations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "persona_id" "uuid",
    "industry_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."persona_industry_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."personas" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "expertise" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "main_content" "text",
    "ts_content" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"english"'::"regconfig", ((COALESCE("description", ''::"text") || ' '::"text") || COALESCE("main_content", ''::"text")))) STORED,
    "published" boolean DEFAULT false,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "published_at" timestamp with time zone,
    "recommended_reading" "text",
    "is_system_record" boolean DEFAULT false,
    "deleted_at" timestamp with time zone,
    "deleted_by" "uuid"
);


ALTER TABLE "public"."personas" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stack_layers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "order_index" integer NOT NULL,
    "parent_layer_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."stack_layers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_preferences" (
    "id" "uuid" NOT NULL,
    "theme_preference" "text" DEFAULT 'system'::"text",
    "ui_preferences" "jsonb" DEFAULT "jsonb_build_object"('sidebar_collapsed', false, 'code_font_size', 'medium'),
    "email_preferences" "jsonb" DEFAULT "jsonb_build_object"('product_updates', false, 'newsletter', false, 'case_study_alerts', false),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "role" "text" DEFAULT 'user'::"text"
);


ALTER TABLE "public"."user_preferences" OWNER TO "postgres";


ALTER TABLE ONLY "public"."algorithm_case_study_relations"
    ADD CONSTRAINT "algorithm_case_study_relations_algorithm_id_case_study_id_key" UNIQUE ("algorithm_id", "case_study_id");



ALTER TABLE ONLY "public"."algorithm_case_study_relations"
    ADD CONSTRAINT "algorithm_case_study_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."algorithm_industry_relations"
    ADD CONSTRAINT "algorithm_industry_relations_algorithm_id_industry_id_key" UNIQUE ("algorithm_id", "industry_id");



ALTER TABLE ONLY "public"."algorithm_industry_relations"
    ADD CONSTRAINT "algorithm_industry_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."algorithms"
    ADD CONSTRAINT "algorithms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."algorithms"
    ADD CONSTRAINT "algorithms_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."blog_post_relations"
    ADD CONSTRAINT "blog_post_relations_blog_post_id_related_blog_post_id_key" UNIQUE ("blog_post_id", "related_blog_post_id");



ALTER TABLE ONLY "public"."blog_post_relations"
    ADD CONSTRAINT "blog_post_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."case_studies"
    ADD CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."case_studies"
    ADD CONSTRAINT "case_studies_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."case_study_industry_relations"
    ADD CONSTRAINT "case_study_industry_relations_case_study_id_industry_id_key" UNIQUE ("case_study_id", "industry_id");



ALTER TABLE ONLY "public"."case_study_industry_relations"
    ADD CONSTRAINT "case_study_industry_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."case_study_persona_relations"
    ADD CONSTRAINT "case_study_persona_relations_case_study_id_persona_id_key" UNIQUE ("case_study_id", "persona_id");



ALTER TABLE ONLY "public"."case_study_persona_relations"
    ADD CONSTRAINT "case_study_persona_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."case_study_relations"
    ADD CONSTRAINT "case_study_relations_case_study_id_related_case_study_id_key" UNIQUE ("case_study_id", "related_case_study_id");



ALTER TABLE ONLY "public"."case_study_relations"
    ADD CONSTRAINT "case_study_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."industries"
    ADD CONSTRAINT "industries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."industries"
    ADD CONSTRAINT "industries_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."persona_algorithm_relations"
    ADD CONSTRAINT "persona_algorithm_relations_pkey" PRIMARY KEY ("persona_id", "algorithm_id");



ALTER TABLE ONLY "public"."persona_industry_relations"
    ADD CONSTRAINT "persona_industry_relations_persona_id_industry_id_key" UNIQUE ("persona_id", "industry_id");



ALTER TABLE ONLY "public"."persona_industry_relations"
    ADD CONSTRAINT "persona_industry_relations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."personas"
    ADD CONSTRAINT "personas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."personas"
    ADD CONSTRAINT "personas_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."stack_layers"
    ADD CONSTRAINT "stack_layers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stack_layers"
    ADD CONSTRAINT "stack_layers_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."user_preferences"
    ADD CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id");



CREATE INDEX "algorithm_industry_relations_algorithm_id_idx" ON "public"."algorithm_industry_relations" USING "btree" ("algorithm_id");



CREATE INDEX "algorithm_industry_relations_industry_id_idx" ON "public"."algorithm_industry_relations" USING "btree" ("industry_id");



CREATE INDEX "algorithms_slug_idx" ON "public"."algorithms" USING "btree" ("slug");



CREATE INDEX "algorithms_ts_content_idx" ON "public"."algorithms" USING "gin" ("ts_content");



CREATE INDEX "blog_posts_slug_idx" ON "public"."blog_posts" USING "btree" ("slug");



CREATE INDEX "blog_posts_tags_idx" ON "public"."blog_posts" USING "gin" ("tags");



CREATE INDEX "blog_posts_ts_content_idx" ON "public"."blog_posts" USING "gin" ("ts_content");



CREATE INDEX "case_studies_algorithms_idx" ON "public"."case_studies" USING "gin" ("algorithms");



CREATE INDEX "case_studies_partner_companies_idx" ON "public"."case_studies" USING "gin" ("partner_companies");



CREATE INDEX "case_studies_quantum_companies_idx" ON "public"."case_studies" USING "gin" ("quantum_companies");



CREATE INDEX "case_studies_quantum_hardware_idx" ON "public"."case_studies" USING "gin" ("quantum_hardware");



CREATE INDEX "case_studies_slug_idx" ON "public"."case_studies" USING "btree" ("slug");



CREATE INDEX "idx_algorithm_case_study_algorithm_id" ON "public"."algorithm_case_study_relations" USING "btree" ("algorithm_id");



CREATE INDEX "idx_algorithm_case_study_case_study_id" ON "public"."algorithm_case_study_relations" USING "btree" ("case_study_id");



CREATE INDEX "idx_blog_posts_featured" ON "public"."blog_posts" USING "btree" ("featured") WHERE ("featured" = true);



CREATE INDEX "idx_case_studies_featured" ON "public"."case_studies" USING "btree" ("featured") WHERE ("featured" = true);



CREATE INDEX "industries_ts_content_idx" ON "public"."industries" USING "gin" ("ts_content");



CREATE INDEX "persona_industry_relations_industry_id_idx" ON "public"."persona_industry_relations" USING "btree" ("industry_id");



CREATE INDEX "persona_industry_relations_persona_id_idx" ON "public"."persona_industry_relations" USING "btree" ("persona_id");



CREATE INDEX "personas_ts_content_idx" ON "public"."personas" USING "gin" ("ts_content");



CREATE OR REPLACE TRIGGER "blog_posts_ts_content_update" BEFORE INSERT OR UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."update_ts_content"();



CREATE OR REPLACE TRIGGER "set_blog_posts_published_at" BEFORE UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."set_blog_posts_published_at"();



CREATE OR REPLACE TRIGGER "set_personas_published_at" BEFORE UPDATE ON "public"."personas" FOR EACH ROW EXECUTE FUNCTION "public"."set_published_at_column"();



CREATE OR REPLACE TRIGGER "update_algorithms_updated_at" BEFORE UPDATE ON "public"."algorithms" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_blog_posts_updated_at" BEFORE UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."update_blog_posts_updated_at"();



CREATE OR REPLACE TRIGGER "update_case_studies_updated_at" BEFORE UPDATE ON "public"."case_studies" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_industries_updated_at" BEFORE UPDATE ON "public"."industries" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_personas_updated_at" BEFORE UPDATE ON "public"."personas" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."algorithm_case_study_relations"
    ADD CONSTRAINT "algorithm_case_study_relations_algorithm_id_fkey" FOREIGN KEY ("algorithm_id") REFERENCES "public"."algorithms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."algorithm_case_study_relations"
    ADD CONSTRAINT "algorithm_case_study_relations_case_study_id_fkey" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."algorithm_industry_relations"
    ADD CONSTRAINT "algorithm_industry_relations_algorithm_id_fkey" FOREIGN KEY ("algorithm_id") REFERENCES "public"."algorithms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."algorithm_industry_relations"
    ADD CONSTRAINT "algorithm_industry_relations_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."blog_post_relations"
    ADD CONSTRAINT "blog_post_relations_blog_post_id_fkey" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."blog_post_relations"
    ADD CONSTRAINT "blog_post_relations_related_blog_post_id_fkey" FOREIGN KEY ("related_blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."case_study_industry_relations"
    ADD CONSTRAINT "case_study_industry_relations_case_study_id_fkey" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."case_study_industry_relations"
    ADD CONSTRAINT "case_study_industry_relations_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."case_study_persona_relations"
    ADD CONSTRAINT "case_study_persona_relations_case_study_id_fkey" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."case_study_persona_relations"
    ADD CONSTRAINT "case_study_persona_relations_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "public"."personas"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."case_study_relations"
    ADD CONSTRAINT "case_study_relations_case_study_id_fkey" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."case_study_relations"
    ADD CONSTRAINT "case_study_relations_related_case_study_id_fkey" FOREIGN KEY ("related_case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."persona_algorithm_relations"
    ADD CONSTRAINT "persona_algorithm_relations_algorithm_id_fkey" FOREIGN KEY ("algorithm_id") REFERENCES "public"."algorithms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."persona_algorithm_relations"
    ADD CONSTRAINT "persona_algorithm_relations_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "public"."personas"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."persona_industry_relations"
    ADD CONSTRAINT "persona_industry_relations_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."persona_industry_relations"
    ADD CONSTRAINT "persona_industry_relations_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "public"."personas"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stack_layers"
    ADD CONSTRAINT "stack_layers_parent_layer_id_fkey" FOREIGN KEY ("parent_layer_id") REFERENCES "public"."stack_layers"("id");



ALTER TABLE ONLY "public"."user_preferences"
    ADD CONSTRAINT "user_preferences_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



CREATE POLICY "Admins can manage algorithm_industry_relations" ON "public"."algorithm_industry_relations" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admins can manage all preferences" ON "public"."user_preferences" USING (("role" = 'admin'::"text"));



CREATE POLICY "Admins can manage blog posts" ON "public"."blog_posts" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admins can manage case studies" ON "public"."case_studies" USING ((EXISTS ( SELECT 1
   FROM "public"."user_preferences"
  WHERE (("user_preferences"."id" = "auth"."uid"()) AND ("user_preferences"."role" = 'admin'::"text")))));



CREATE POLICY "Admins can manage case_study_industry_relations" ON "public"."case_study_industry_relations" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admins can manage case_study_persona_relations" ON "public"."case_study_persona_relations" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admins can manage persona_industry_relations" ON "public"."persona_industry_relations" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admins can manage stack layers" ON "public"."stack_layers" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Allow anon access to user_preferences" ON "public"."user_preferences" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Authenticated users can create case studies" ON "public"."case_studies" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."algorithm_case_study_relations" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."case_study_industry_relations" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."case_study_persona_relations" FOR SELECT USING (true);



CREATE POLICY "Public can view algorithm_industry_relations" ON "public"."algorithm_industry_relations" FOR SELECT USING (true);



CREATE POLICY "Public can view persona_algorithm_relations" ON "public"."persona_algorithm_relations" FOR SELECT USING (true);



CREATE POLICY "Public can view persona_industry_relations for published person" ON "public"."persona_industry_relations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."personas"
  WHERE (("personas"."id" = "persona_industry_relations"."persona_id") AND ("personas"."published" = true)))));



CREATE POLICY "Public can view published algorithms" ON "public"."algorithms" FOR SELECT USING (("published" = true));



CREATE POLICY "Public can view published blog_posts" ON "public"."blog_posts" FOR SELECT USING (("published" = true));



CREATE POLICY "Public can view published case_studies" ON "public"."case_studies" FOR SELECT USING (("published" = true));



CREATE POLICY "Public can view published industries" ON "public"."industries" FOR SELECT USING (("published" = true));



CREATE POLICY "Public can view published personas" ON "public"."personas" FOR SELECT USING (("published" = true));



CREATE POLICY "Public can view stack layers" ON "public"."stack_layers" FOR SELECT USING (true);



CREATE POLICY "Users can update own preferences" ON "public"."user_preferences" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own preferences" ON "public"."user_preferences" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."algorithm_case_study_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."algorithm_industry_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."algorithms" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."blog_post_relations" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "blog_post_relations_public_read_policy" ON "public"."blog_post_relations" FOR SELECT USING (((EXISTS ( SELECT 1
   FROM "public"."blog_posts"
  WHERE (("blog_posts"."id" = "blog_post_relations"."blog_post_id") AND ("blog_posts"."published" = true)))) AND (EXISTS ( SELECT 1
   FROM "public"."blog_posts"
  WHERE (("blog_posts"."id" = "blog_post_relations"."related_blog_post_id") AND ("blog_posts"."published" = true))))));



ALTER TABLE "public"."blog_posts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."case_studies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."case_study_industry_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."case_study_persona_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."case_study_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."industries" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."persona_algorithm_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."persona_industry_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."personas" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stack_layers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_preferences" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."recover_content"("table_name" "text", "content_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."recover_content"("table_name" "text", "content_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."recover_content"("table_name" "text", "content_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_blog_posts_published_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_blog_posts_published_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_blog_posts_published_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_published_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_published_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_published_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."setup_admin_role"("admin_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."setup_admin_role"("admin_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."setup_admin_role"("admin_email" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."soft_delete_content"("table_name" "text", "content_id" "uuid", "deleted_by_user" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."soft_delete_content"("table_name" "text", "content_id" "uuid", "deleted_by_user" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."soft_delete_content"("table_name" "text", "content_id" "uuid", "deleted_by_user" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_blog_posts_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_blog_posts_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_blog_posts_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_ts_content"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_ts_content"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_ts_content"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."verify_initial_setup"() TO "anon";
GRANT ALL ON FUNCTION "public"."verify_initial_setup"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."verify_initial_setup"() TO "service_role";


















GRANT ALL ON TABLE "public"."algorithm_case_study_relations" TO "anon";
GRANT ALL ON TABLE "public"."algorithm_case_study_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."algorithm_case_study_relations" TO "service_role";



GRANT ALL ON TABLE "public"."algorithm_industry_relations" TO "anon";
GRANT ALL ON TABLE "public"."algorithm_industry_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."algorithm_industry_relations" TO "service_role";



GRANT ALL ON TABLE "public"."algorithms" TO "anon";
GRANT ALL ON TABLE "public"."algorithms" TO "authenticated";
GRANT ALL ON TABLE "public"."algorithms" TO "service_role";



GRANT ALL ON TABLE "public"."blog_post_relations" TO "anon";
GRANT ALL ON TABLE "public"."blog_post_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_post_relations" TO "service_role";



GRANT ALL ON TABLE "public"."blog_posts" TO "anon";
GRANT ALL ON TABLE "public"."blog_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_posts" TO "service_role";



GRANT ALL ON TABLE "public"."case_studies" TO "anon";
GRANT ALL ON TABLE "public"."case_studies" TO "authenticated";
GRANT ALL ON TABLE "public"."case_studies" TO "service_role";



GRANT ALL ON TABLE "public"."case_study_industry_relations" TO "anon";
GRANT ALL ON TABLE "public"."case_study_industry_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."case_study_industry_relations" TO "service_role";



GRANT ALL ON TABLE "public"."case_study_persona_relations" TO "anon";
GRANT ALL ON TABLE "public"."case_study_persona_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."case_study_persona_relations" TO "service_role";



GRANT ALL ON TABLE "public"."case_study_relations" TO "anon";
GRANT ALL ON TABLE "public"."case_study_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."case_study_relations" TO "service_role";



GRANT ALL ON TABLE "public"."industries" TO "anon";
GRANT ALL ON TABLE "public"."industries" TO "authenticated";
GRANT ALL ON TABLE "public"."industries" TO "service_role";



GRANT ALL ON TABLE "public"."persona_algorithm_relations" TO "anon";
GRANT ALL ON TABLE "public"."persona_algorithm_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."persona_algorithm_relations" TO "service_role";



GRANT ALL ON TABLE "public"."persona_industry_relations" TO "anon";
GRANT ALL ON TABLE "public"."persona_industry_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."persona_industry_relations" TO "service_role";



GRANT ALL ON TABLE "public"."personas" TO "anon";
GRANT ALL ON TABLE "public"."personas" TO "authenticated";
GRANT ALL ON TABLE "public"."personas" TO "service_role";



GRANT ALL ON TABLE "public"."stack_layers" TO "anon";
GRANT ALL ON TABLE "public"."stack_layers" TO "authenticated";
GRANT ALL ON TABLE "public"."stack_layers" TO "service_role";



GRANT ALL ON TABLE "public"."user_preferences" TO "anon";
GRANT ALL ON TABLE "public"."user_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."user_preferences" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
