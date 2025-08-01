create table "public"."algorithm_case_study_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "algorithm_id" uuid,
    "case_study_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."algorithm_case_study_relations" enable row level security;

create table "public"."algorithm_industry_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "algorithm_id" uuid,
    "industry_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."algorithm_industry_relations" enable row level security;

create table "public"."algorithms" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null,
    "name" text not null,
    "description" text,
    "use_cases" text[],
    "quantum_advantage" text,
    "published" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "main_content" text,
    "ts_content" tsvector generated always as (to_tsvector('english'::regconfig, ((COALESCE(description, ''::text) || ' '::text) || COALESCE(main_content, ''::text)))) stored,
    "published_at" timestamp with time zone,
    "steps" text default '[]'::jsonb,
    "academic_references" text,
    "is_system_record" boolean default false
);


alter table "public"."algorithms" enable row level security;

create table "public"."blog_post_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "blog_post_id" uuid,
    "related_blog_post_id" uuid,
    "relation_type" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."blog_post_relations" enable row level security;

create table "public"."blog_posts" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null,
    "title" text not null,
    "description" text,
    "content" text,
    "author" text,
    "featured_image" text,
    "category" text,
    "tags" text[],
    "published" boolean default false,
    "featured" boolean default false,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "ts_content" tsvector
);


alter table "public"."blog_posts" enable row level security;

create table "public"."case_studies" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null,
    "title" text not null,
    "description" text,
    "main_content" text,
    "partner_companies" text[],
    "quantum_companies" text[],
    "algorithms" text[],
    "quantum_hardware" text[],
    "published" boolean default false,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "academic_references" text,
    "resource_links" jsonb default '[]'::jsonb,
    "quantum_software" text[]
);


alter table "public"."case_studies" enable row level security;

create table "public"."case_study_industry_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "case_study_id" uuid,
    "industry_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."case_study_industry_relations" enable row level security;

create table "public"."case_study_persona_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "case_study_id" uuid,
    "persona_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."case_study_persona_relations" enable row level security;

create table "public"."case_study_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "case_study_id" uuid,
    "related_case_study_id" uuid,
    "relation_type" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."case_study_relations" enable row level security;

create table "public"."industries" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null,
    "name" text not null,
    "description" text,
    "icon" text,
    "created_at" timestamp with time zone default now(),
    "main_content" text,
    "ts_content" tsvector generated always as (to_tsvector('english'::regconfig, ((COALESCE(description, ''::text) || ' '::text) || COALESCE(main_content, ''::text)))) stored,
    "published" boolean default false,
    "updated_at" timestamp with time zone default now(),
    "published_at" timestamp with time zone,
    "is_system_record" boolean default false
);


alter table "public"."industries" enable row level security;

create table "public"."persona_algorithm_relations" (
    "persona_id" uuid not null,
    "algorithm_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."persona_industry_relations" (
    "id" uuid not null default uuid_generate_v4(),
    "persona_id" uuid,
    "industry_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."persona_industry_relations" enable row level security;

create table "public"."personas" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null,
    "name" text not null,
    "description" text,
    "expertise" text[],
    "created_at" timestamp with time zone default now(),
    "main_content" text,
    "ts_content" tsvector generated always as (to_tsvector('english'::regconfig, ((COALESCE(description, ''::text) || ' '::text) || COALESCE(main_content, ''::text)))) stored,
    "published" boolean default false,
    "updated_at" timestamp with time zone default now(),
    "published_at" timestamp with time zone,
    "recommended_reading" text,
    "is_system_record" boolean default false
);


alter table "public"."personas" enable row level security;

create table "public"."stack_layers" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null,
    "name" text not null,
    "description" text,
    "order_index" integer not null,
    "parent_layer_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."stack_layers" enable row level security;

create table "public"."user_preferences" (
    "id" uuid not null,
    "theme_preference" text default 'system'::text,
    "ui_preferences" jsonb default jsonb_build_object('sidebar_collapsed', false, 'code_font_size', 'medium'),
    "email_preferences" jsonb default jsonb_build_object('product_updates', false, 'newsletter', false, 'case_study_alerts', false),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "role" text default 'user'::text
);


alter table "public"."user_preferences" enable row level security;

CREATE UNIQUE INDEX algorithm_case_study_relations_algorithm_id_case_study_id_key ON public.algorithm_case_study_relations USING btree (algorithm_id, case_study_id);

CREATE UNIQUE INDEX algorithm_case_study_relations_pkey ON public.algorithm_case_study_relations USING btree (id);

CREATE INDEX algorithm_industry_relations_algorithm_id_idx ON public.algorithm_industry_relations USING btree (algorithm_id);

CREATE UNIQUE INDEX algorithm_industry_relations_algorithm_id_industry_id_key ON public.algorithm_industry_relations USING btree (algorithm_id, industry_id);

CREATE INDEX algorithm_industry_relations_industry_id_idx ON public.algorithm_industry_relations USING btree (industry_id);

CREATE UNIQUE INDEX algorithm_industry_relations_pkey ON public.algorithm_industry_relations USING btree (id);

CREATE UNIQUE INDEX algorithms_pkey ON public.algorithms USING btree (id);

CREATE INDEX algorithms_slug_idx ON public.algorithms USING btree (slug);

CREATE UNIQUE INDEX algorithms_slug_key ON public.algorithms USING btree (slug);

CREATE INDEX algorithms_ts_content_idx ON public.algorithms USING gin (ts_content);

CREATE UNIQUE INDEX blog_post_relations_blog_post_id_related_blog_post_id_key ON public.blog_post_relations USING btree (blog_post_id, related_blog_post_id);

CREATE UNIQUE INDEX blog_post_relations_pkey ON public.blog_post_relations USING btree (id);

CREATE UNIQUE INDEX blog_posts_pkey ON public.blog_posts USING btree (id);

CREATE INDEX blog_posts_slug_idx ON public.blog_posts USING btree (slug);

CREATE UNIQUE INDEX blog_posts_slug_key ON public.blog_posts USING btree (slug);

CREATE INDEX blog_posts_tags_idx ON public.blog_posts USING gin (tags);

CREATE INDEX blog_posts_ts_content_idx ON public.blog_posts USING gin (ts_content);

CREATE INDEX case_studies_algorithms_idx ON public.case_studies USING gin (algorithms);

CREATE INDEX case_studies_partner_companies_idx ON public.case_studies USING gin (partner_companies);

CREATE UNIQUE INDEX case_studies_pkey ON public.case_studies USING btree (id);

CREATE INDEX case_studies_quantum_companies_idx ON public.case_studies USING gin (quantum_companies);

CREATE INDEX case_studies_quantum_hardware_idx ON public.case_studies USING gin (quantum_hardware);

CREATE INDEX case_studies_slug_idx ON public.case_studies USING btree (slug);

CREATE UNIQUE INDEX case_studies_slug_key ON public.case_studies USING btree (slug);

CREATE UNIQUE INDEX case_study_industry_relations_case_study_id_industry_id_key ON public.case_study_industry_relations USING btree (case_study_id, industry_id);

CREATE UNIQUE INDEX case_study_industry_relations_pkey ON public.case_study_industry_relations USING btree (id);

CREATE UNIQUE INDEX case_study_persona_relations_case_study_id_persona_id_key ON public.case_study_persona_relations USING btree (case_study_id, persona_id);

CREATE UNIQUE INDEX case_study_persona_relations_pkey ON public.case_study_persona_relations USING btree (id);

CREATE UNIQUE INDEX case_study_relations_case_study_id_related_case_study_id_key ON public.case_study_relations USING btree (case_study_id, related_case_study_id);

CREATE UNIQUE INDEX case_study_relations_pkey ON public.case_study_relations USING btree (id);

CREATE INDEX idx_algorithm_case_study_algorithm_id ON public.algorithm_case_study_relations USING btree (algorithm_id);

CREATE INDEX idx_algorithm_case_study_case_study_id ON public.algorithm_case_study_relations USING btree (case_study_id);

CREATE UNIQUE INDEX industries_pkey ON public.industries USING btree (id);

CREATE UNIQUE INDEX industries_slug_key ON public.industries USING btree (slug);

CREATE INDEX industries_ts_content_idx ON public.industries USING gin (ts_content);

CREATE UNIQUE INDEX persona_algorithm_relations_pkey ON public.persona_algorithm_relations USING btree (persona_id, algorithm_id);

CREATE INDEX persona_industry_relations_industry_id_idx ON public.persona_industry_relations USING btree (industry_id);

CREATE INDEX persona_industry_relations_persona_id_idx ON public.persona_industry_relations USING btree (persona_id);

CREATE UNIQUE INDEX persona_industry_relations_persona_id_industry_id_key ON public.persona_industry_relations USING btree (persona_id, industry_id);

CREATE UNIQUE INDEX persona_industry_relations_pkey ON public.persona_industry_relations USING btree (id);

CREATE UNIQUE INDEX personas_pkey ON public.personas USING btree (id);

CREATE UNIQUE INDEX personas_slug_key ON public.personas USING btree (slug);

CREATE INDEX personas_ts_content_idx ON public.personas USING gin (ts_content);

CREATE UNIQUE INDEX stack_layers_pkey ON public.stack_layers USING btree (id);

CREATE UNIQUE INDEX stack_layers_slug_key ON public.stack_layers USING btree (slug);

CREATE UNIQUE INDEX user_preferences_pkey ON public.user_preferences USING btree (id);

alter table "public"."algorithm_case_study_relations" add constraint "algorithm_case_study_relations_pkey" PRIMARY KEY using index "algorithm_case_study_relations_pkey";

alter table "public"."algorithm_industry_relations" add constraint "algorithm_industry_relations_pkey" PRIMARY KEY using index "algorithm_industry_relations_pkey";

alter table "public"."algorithms" add constraint "algorithms_pkey" PRIMARY KEY using index "algorithms_pkey";

alter table "public"."blog_post_relations" add constraint "blog_post_relations_pkey" PRIMARY KEY using index "blog_post_relations_pkey";

alter table "public"."blog_posts" add constraint "blog_posts_pkey" PRIMARY KEY using index "blog_posts_pkey";

alter table "public"."case_studies" add constraint "case_studies_pkey" PRIMARY KEY using index "case_studies_pkey";

alter table "public"."case_study_industry_relations" add constraint "case_study_industry_relations_pkey" PRIMARY KEY using index "case_study_industry_relations_pkey";

alter table "public"."case_study_persona_relations" add constraint "case_study_persona_relations_pkey" PRIMARY KEY using index "case_study_persona_relations_pkey";

alter table "public"."case_study_relations" add constraint "case_study_relations_pkey" PRIMARY KEY using index "case_study_relations_pkey";

alter table "public"."industries" add constraint "industries_pkey" PRIMARY KEY using index "industries_pkey";

alter table "public"."persona_algorithm_relations" add constraint "persona_algorithm_relations_pkey" PRIMARY KEY using index "persona_algorithm_relations_pkey";

alter table "public"."persona_industry_relations" add constraint "persona_industry_relations_pkey" PRIMARY KEY using index "persona_industry_relations_pkey";

alter table "public"."personas" add constraint "personas_pkey" PRIMARY KEY using index "personas_pkey";

alter table "public"."stack_layers" add constraint "stack_layers_pkey" PRIMARY KEY using index "stack_layers_pkey";

alter table "public"."user_preferences" add constraint "user_preferences_pkey" PRIMARY KEY using index "user_preferences_pkey";

alter table "public"."algorithm_case_study_relations" add constraint "algorithm_case_study_relations_algorithm_id_case_study_id_key" UNIQUE using index "algorithm_case_study_relations_algorithm_id_case_study_id_key";

alter table "public"."algorithm_case_study_relations" add constraint "algorithm_case_study_relations_algorithm_id_fkey" FOREIGN KEY (algorithm_id) REFERENCES algorithms(id) ON DELETE CASCADE not valid;

alter table "public"."algorithm_case_study_relations" validate constraint "algorithm_case_study_relations_algorithm_id_fkey";

alter table "public"."algorithm_case_study_relations" add constraint "algorithm_case_study_relations_case_study_id_fkey" FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE not valid;

alter table "public"."algorithm_case_study_relations" validate constraint "algorithm_case_study_relations_case_study_id_fkey";

alter table "public"."algorithm_industry_relations" add constraint "algorithm_industry_relations_algorithm_id_fkey" FOREIGN KEY (algorithm_id) REFERENCES algorithms(id) ON DELETE CASCADE not valid;

alter table "public"."algorithm_industry_relations" validate constraint "algorithm_industry_relations_algorithm_id_fkey";

alter table "public"."algorithm_industry_relations" add constraint "algorithm_industry_relations_algorithm_id_industry_id_key" UNIQUE using index "algorithm_industry_relations_algorithm_id_industry_id_key";

alter table "public"."algorithm_industry_relations" add constraint "algorithm_industry_relations_industry_id_fkey" FOREIGN KEY (industry_id) REFERENCES industries(id) ON DELETE CASCADE not valid;

alter table "public"."algorithm_industry_relations" validate constraint "algorithm_industry_relations_industry_id_fkey";

alter table "public"."algorithms" add constraint "algorithms_slug_key" UNIQUE using index "algorithms_slug_key";

alter table "public"."blog_post_relations" add constraint "blog_post_relations_blog_post_id_fkey" FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE not valid;

alter table "public"."blog_post_relations" validate constraint "blog_post_relations_blog_post_id_fkey";

alter table "public"."blog_post_relations" add constraint "blog_post_relations_blog_post_id_related_blog_post_id_key" UNIQUE using index "blog_post_relations_blog_post_id_related_blog_post_id_key";

alter table "public"."blog_post_relations" add constraint "blog_post_relations_related_blog_post_id_fkey" FOREIGN KEY (related_blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE not valid;

alter table "public"."blog_post_relations" validate constraint "blog_post_relations_related_blog_post_id_fkey";

alter table "public"."blog_posts" add constraint "blog_posts_slug_key" UNIQUE using index "blog_posts_slug_key";

alter table "public"."case_studies" add constraint "case_studies_slug_key" UNIQUE using index "case_studies_slug_key";

alter table "public"."case_study_industry_relations" add constraint "case_study_industry_relations_case_study_id_fkey" FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE not valid;

alter table "public"."case_study_industry_relations" validate constraint "case_study_industry_relations_case_study_id_fkey";

alter table "public"."case_study_industry_relations" add constraint "case_study_industry_relations_case_study_id_industry_id_key" UNIQUE using index "case_study_industry_relations_case_study_id_industry_id_key";

alter table "public"."case_study_industry_relations" add constraint "case_study_industry_relations_industry_id_fkey" FOREIGN KEY (industry_id) REFERENCES industries(id) ON DELETE CASCADE not valid;

alter table "public"."case_study_industry_relations" validate constraint "case_study_industry_relations_industry_id_fkey";

alter table "public"."case_study_persona_relations" add constraint "case_study_persona_relations_case_study_id_fkey" FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE not valid;

alter table "public"."case_study_persona_relations" validate constraint "case_study_persona_relations_case_study_id_fkey";

alter table "public"."case_study_persona_relations" add constraint "case_study_persona_relations_case_study_id_persona_id_key" UNIQUE using index "case_study_persona_relations_case_study_id_persona_id_key";

alter table "public"."case_study_persona_relations" add constraint "case_study_persona_relations_persona_id_fkey" FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE not valid;

alter table "public"."case_study_persona_relations" validate constraint "case_study_persona_relations_persona_id_fkey";

alter table "public"."case_study_relations" add constraint "case_study_relations_case_study_id_fkey" FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE not valid;

alter table "public"."case_study_relations" validate constraint "case_study_relations_case_study_id_fkey";

alter table "public"."case_study_relations" add constraint "case_study_relations_case_study_id_related_case_study_id_key" UNIQUE using index "case_study_relations_case_study_id_related_case_study_id_key";

alter table "public"."case_study_relations" add constraint "case_study_relations_related_case_study_id_fkey" FOREIGN KEY (related_case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE not valid;

alter table "public"."case_study_relations" validate constraint "case_study_relations_related_case_study_id_fkey";

alter table "public"."industries" add constraint "industries_slug_key" UNIQUE using index "industries_slug_key";

alter table "public"."persona_algorithm_relations" add constraint "persona_algorithm_relations_algorithm_id_fkey" FOREIGN KEY (algorithm_id) REFERENCES algorithms(id) ON DELETE CASCADE not valid;

alter table "public"."persona_algorithm_relations" validate constraint "persona_algorithm_relations_algorithm_id_fkey";

alter table "public"."persona_algorithm_relations" add constraint "persona_algorithm_relations_persona_id_fkey" FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE not valid;

alter table "public"."persona_algorithm_relations" validate constraint "persona_algorithm_relations_persona_id_fkey";

alter table "public"."persona_industry_relations" add constraint "persona_industry_relations_industry_id_fkey" FOREIGN KEY (industry_id) REFERENCES industries(id) ON DELETE CASCADE not valid;

alter table "public"."persona_industry_relations" validate constraint "persona_industry_relations_industry_id_fkey";

alter table "public"."persona_industry_relations" add constraint "persona_industry_relations_persona_id_fkey" FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE not valid;

alter table "public"."persona_industry_relations" validate constraint "persona_industry_relations_persona_id_fkey";

alter table "public"."persona_industry_relations" add constraint "persona_industry_relations_persona_id_industry_id_key" UNIQUE using index "persona_industry_relations_persona_id_industry_id_key";

alter table "public"."personas" add constraint "personas_slug_key" UNIQUE using index "personas_slug_key";

alter table "public"."stack_layers" add constraint "stack_layers_parent_layer_id_fkey" FOREIGN KEY (parent_layer_id) REFERENCES stack_layers(id) not valid;

alter table "public"."stack_layers" validate constraint "stack_layers_parent_layer_id_fkey";

alter table "public"."stack_layers" add constraint "stack_layers_slug_key" UNIQUE using index "stack_layers_slug_key";

alter table "public"."user_preferences" add constraint "user_preferences_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user_preferences" validate constraint "user_preferences_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_blog_posts_published_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.published = TRUE AND OLD.published = FALSE THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_published_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.published = TRUE AND OLD.published = FALSE THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.setup_admin_role(admin_email text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Insert or update user preferences with admin role
  INSERT INTO user_preferences (id, role)
  SELECT au.id, 'admin'
  FROM auth.users au
  WHERE au.email = admin_email
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_ts_content()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.ts_content = 
        setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.content, '')), 'C');
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.verify_initial_setup()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
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
$function$
;

grant delete on table "public"."algorithm_case_study_relations" to "anon";

grant insert on table "public"."algorithm_case_study_relations" to "anon";

grant references on table "public"."algorithm_case_study_relations" to "anon";

grant select on table "public"."algorithm_case_study_relations" to "anon";

grant trigger on table "public"."algorithm_case_study_relations" to "anon";

grant truncate on table "public"."algorithm_case_study_relations" to "anon";

grant update on table "public"."algorithm_case_study_relations" to "anon";

grant delete on table "public"."algorithm_case_study_relations" to "authenticated";

grant insert on table "public"."algorithm_case_study_relations" to "authenticated";

grant references on table "public"."algorithm_case_study_relations" to "authenticated";

grant select on table "public"."algorithm_case_study_relations" to "authenticated";

grant trigger on table "public"."algorithm_case_study_relations" to "authenticated";

grant truncate on table "public"."algorithm_case_study_relations" to "authenticated";

grant update on table "public"."algorithm_case_study_relations" to "authenticated";

grant delete on table "public"."algorithm_case_study_relations" to "service_role";

grant insert on table "public"."algorithm_case_study_relations" to "service_role";

grant references on table "public"."algorithm_case_study_relations" to "service_role";

grant select on table "public"."algorithm_case_study_relations" to "service_role";

grant trigger on table "public"."algorithm_case_study_relations" to "service_role";

grant truncate on table "public"."algorithm_case_study_relations" to "service_role";

grant update on table "public"."algorithm_case_study_relations" to "service_role";

grant delete on table "public"."algorithm_industry_relations" to "anon";

grant insert on table "public"."algorithm_industry_relations" to "anon";

grant references on table "public"."algorithm_industry_relations" to "anon";

grant select on table "public"."algorithm_industry_relations" to "anon";

grant trigger on table "public"."algorithm_industry_relations" to "anon";

grant truncate on table "public"."algorithm_industry_relations" to "anon";

grant update on table "public"."algorithm_industry_relations" to "anon";

grant delete on table "public"."algorithm_industry_relations" to "authenticated";

grant insert on table "public"."algorithm_industry_relations" to "authenticated";

grant references on table "public"."algorithm_industry_relations" to "authenticated";

grant select on table "public"."algorithm_industry_relations" to "authenticated";

grant trigger on table "public"."algorithm_industry_relations" to "authenticated";

grant truncate on table "public"."algorithm_industry_relations" to "authenticated";

grant update on table "public"."algorithm_industry_relations" to "authenticated";

grant delete on table "public"."algorithm_industry_relations" to "service_role";

grant insert on table "public"."algorithm_industry_relations" to "service_role";

grant references on table "public"."algorithm_industry_relations" to "service_role";

grant select on table "public"."algorithm_industry_relations" to "service_role";

grant trigger on table "public"."algorithm_industry_relations" to "service_role";

grant truncate on table "public"."algorithm_industry_relations" to "service_role";

grant update on table "public"."algorithm_industry_relations" to "service_role";

grant delete on table "public"."algorithms" to "anon";

grant insert on table "public"."algorithms" to "anon";

grant references on table "public"."algorithms" to "anon";

grant select on table "public"."algorithms" to "anon";

grant trigger on table "public"."algorithms" to "anon";

grant truncate on table "public"."algorithms" to "anon";

grant update on table "public"."algorithms" to "anon";

grant delete on table "public"."algorithms" to "authenticated";

grant insert on table "public"."algorithms" to "authenticated";

grant references on table "public"."algorithms" to "authenticated";

grant select on table "public"."algorithms" to "authenticated";

grant trigger on table "public"."algorithms" to "authenticated";

grant truncate on table "public"."algorithms" to "authenticated";

grant update on table "public"."algorithms" to "authenticated";

grant delete on table "public"."algorithms" to "service_role";

grant insert on table "public"."algorithms" to "service_role";

grant references on table "public"."algorithms" to "service_role";

grant select on table "public"."algorithms" to "service_role";

grant trigger on table "public"."algorithms" to "service_role";

grant truncate on table "public"."algorithms" to "service_role";

grant update on table "public"."algorithms" to "service_role";

grant delete on table "public"."blog_post_relations" to "anon";

grant insert on table "public"."blog_post_relations" to "anon";

grant references on table "public"."blog_post_relations" to "anon";

grant select on table "public"."blog_post_relations" to "anon";

grant trigger on table "public"."blog_post_relations" to "anon";

grant truncate on table "public"."blog_post_relations" to "anon";

grant update on table "public"."blog_post_relations" to "anon";

grant delete on table "public"."blog_post_relations" to "authenticated";

grant insert on table "public"."blog_post_relations" to "authenticated";

grant references on table "public"."blog_post_relations" to "authenticated";

grant select on table "public"."blog_post_relations" to "authenticated";

grant trigger on table "public"."blog_post_relations" to "authenticated";

grant truncate on table "public"."blog_post_relations" to "authenticated";

grant update on table "public"."blog_post_relations" to "authenticated";

grant delete on table "public"."blog_post_relations" to "service_role";

grant insert on table "public"."blog_post_relations" to "service_role";

grant references on table "public"."blog_post_relations" to "service_role";

grant select on table "public"."blog_post_relations" to "service_role";

grant trigger on table "public"."blog_post_relations" to "service_role";

grant truncate on table "public"."blog_post_relations" to "service_role";

grant update on table "public"."blog_post_relations" to "service_role";

grant delete on table "public"."blog_posts" to "anon";

grant insert on table "public"."blog_posts" to "anon";

grant references on table "public"."blog_posts" to "anon";

grant select on table "public"."blog_posts" to "anon";

grant trigger on table "public"."blog_posts" to "anon";

grant truncate on table "public"."blog_posts" to "anon";

grant update on table "public"."blog_posts" to "anon";

grant delete on table "public"."blog_posts" to "authenticated";

grant insert on table "public"."blog_posts" to "authenticated";

grant references on table "public"."blog_posts" to "authenticated";

grant select on table "public"."blog_posts" to "authenticated";

grant trigger on table "public"."blog_posts" to "authenticated";

grant truncate on table "public"."blog_posts" to "authenticated";

grant update on table "public"."blog_posts" to "authenticated";

grant delete on table "public"."blog_posts" to "service_role";

grant insert on table "public"."blog_posts" to "service_role";

grant references on table "public"."blog_posts" to "service_role";

grant select on table "public"."blog_posts" to "service_role";

grant trigger on table "public"."blog_posts" to "service_role";

grant truncate on table "public"."blog_posts" to "service_role";

grant update on table "public"."blog_posts" to "service_role";

grant delete on table "public"."case_studies" to "anon";

grant insert on table "public"."case_studies" to "anon";

grant references on table "public"."case_studies" to "anon";

grant select on table "public"."case_studies" to "anon";

grant trigger on table "public"."case_studies" to "anon";

grant truncate on table "public"."case_studies" to "anon";

grant update on table "public"."case_studies" to "anon";

grant delete on table "public"."case_studies" to "authenticated";

grant insert on table "public"."case_studies" to "authenticated";

grant references on table "public"."case_studies" to "authenticated";

grant select on table "public"."case_studies" to "authenticated";

grant trigger on table "public"."case_studies" to "authenticated";

grant truncate on table "public"."case_studies" to "authenticated";

grant update on table "public"."case_studies" to "authenticated";

grant delete on table "public"."case_studies" to "service_role";

grant insert on table "public"."case_studies" to "service_role";

grant references on table "public"."case_studies" to "service_role";

grant select on table "public"."case_studies" to "service_role";

grant trigger on table "public"."case_studies" to "service_role";

grant truncate on table "public"."case_studies" to "service_role";

grant update on table "public"."case_studies" to "service_role";

grant delete on table "public"."case_study_industry_relations" to "anon";

grant insert on table "public"."case_study_industry_relations" to "anon";

grant references on table "public"."case_study_industry_relations" to "anon";

grant select on table "public"."case_study_industry_relations" to "anon";

grant trigger on table "public"."case_study_industry_relations" to "anon";

grant truncate on table "public"."case_study_industry_relations" to "anon";

grant update on table "public"."case_study_industry_relations" to "anon";

grant delete on table "public"."case_study_industry_relations" to "authenticated";

grant insert on table "public"."case_study_industry_relations" to "authenticated";

grant references on table "public"."case_study_industry_relations" to "authenticated";

grant select on table "public"."case_study_industry_relations" to "authenticated";

grant trigger on table "public"."case_study_industry_relations" to "authenticated";

grant truncate on table "public"."case_study_industry_relations" to "authenticated";

grant update on table "public"."case_study_industry_relations" to "authenticated";

grant delete on table "public"."case_study_industry_relations" to "service_role";

grant insert on table "public"."case_study_industry_relations" to "service_role";

grant references on table "public"."case_study_industry_relations" to "service_role";

grant select on table "public"."case_study_industry_relations" to "service_role";

grant trigger on table "public"."case_study_industry_relations" to "service_role";

grant truncate on table "public"."case_study_industry_relations" to "service_role";

grant update on table "public"."case_study_industry_relations" to "service_role";

grant delete on table "public"."case_study_persona_relations" to "anon";

grant insert on table "public"."case_study_persona_relations" to "anon";

grant references on table "public"."case_study_persona_relations" to "anon";

grant select on table "public"."case_study_persona_relations" to "anon";

grant trigger on table "public"."case_study_persona_relations" to "anon";

grant truncate on table "public"."case_study_persona_relations" to "anon";

grant update on table "public"."case_study_persona_relations" to "anon";

grant delete on table "public"."case_study_persona_relations" to "authenticated";

grant insert on table "public"."case_study_persona_relations" to "authenticated";

grant references on table "public"."case_study_persona_relations" to "authenticated";

grant select on table "public"."case_study_persona_relations" to "authenticated";

grant trigger on table "public"."case_study_persona_relations" to "authenticated";

grant truncate on table "public"."case_study_persona_relations" to "authenticated";

grant update on table "public"."case_study_persona_relations" to "authenticated";

grant delete on table "public"."case_study_persona_relations" to "service_role";

grant insert on table "public"."case_study_persona_relations" to "service_role";

grant references on table "public"."case_study_persona_relations" to "service_role";

grant select on table "public"."case_study_persona_relations" to "service_role";

grant trigger on table "public"."case_study_persona_relations" to "service_role";

grant truncate on table "public"."case_study_persona_relations" to "service_role";

grant update on table "public"."case_study_persona_relations" to "service_role";

grant delete on table "public"."case_study_relations" to "anon";

grant insert on table "public"."case_study_relations" to "anon";

grant references on table "public"."case_study_relations" to "anon";

grant select on table "public"."case_study_relations" to "anon";

grant trigger on table "public"."case_study_relations" to "anon";

grant truncate on table "public"."case_study_relations" to "anon";

grant update on table "public"."case_study_relations" to "anon";

grant delete on table "public"."case_study_relations" to "authenticated";

grant insert on table "public"."case_study_relations" to "authenticated";

grant references on table "public"."case_study_relations" to "authenticated";

grant select on table "public"."case_study_relations" to "authenticated";

grant trigger on table "public"."case_study_relations" to "authenticated";

grant truncate on table "public"."case_study_relations" to "authenticated";

grant update on table "public"."case_study_relations" to "authenticated";

grant delete on table "public"."case_study_relations" to "service_role";

grant insert on table "public"."case_study_relations" to "service_role";

grant references on table "public"."case_study_relations" to "service_role";

grant select on table "public"."case_study_relations" to "service_role";

grant trigger on table "public"."case_study_relations" to "service_role";

grant truncate on table "public"."case_study_relations" to "service_role";

grant update on table "public"."case_study_relations" to "service_role";

grant delete on table "public"."industries" to "anon";

grant insert on table "public"."industries" to "anon";

grant references on table "public"."industries" to "anon";

grant select on table "public"."industries" to "anon";

grant trigger on table "public"."industries" to "anon";

grant truncate on table "public"."industries" to "anon";

grant update on table "public"."industries" to "anon";

grant delete on table "public"."industries" to "authenticated";

grant insert on table "public"."industries" to "authenticated";

grant references on table "public"."industries" to "authenticated";

grant select on table "public"."industries" to "authenticated";

grant trigger on table "public"."industries" to "authenticated";

grant truncate on table "public"."industries" to "authenticated";

grant update on table "public"."industries" to "authenticated";

grant delete on table "public"."industries" to "service_role";

grant insert on table "public"."industries" to "service_role";

grant references on table "public"."industries" to "service_role";

grant select on table "public"."industries" to "service_role";

grant trigger on table "public"."industries" to "service_role";

grant truncate on table "public"."industries" to "service_role";

grant update on table "public"."industries" to "service_role";

grant delete on table "public"."persona_algorithm_relations" to "anon";

grant insert on table "public"."persona_algorithm_relations" to "anon";

grant references on table "public"."persona_algorithm_relations" to "anon";

grant select on table "public"."persona_algorithm_relations" to "anon";

grant trigger on table "public"."persona_algorithm_relations" to "anon";

grant truncate on table "public"."persona_algorithm_relations" to "anon";

grant update on table "public"."persona_algorithm_relations" to "anon";

grant delete on table "public"."persona_algorithm_relations" to "authenticated";

grant insert on table "public"."persona_algorithm_relations" to "authenticated";

grant references on table "public"."persona_algorithm_relations" to "authenticated";

grant select on table "public"."persona_algorithm_relations" to "authenticated";

grant trigger on table "public"."persona_algorithm_relations" to "authenticated";

grant truncate on table "public"."persona_algorithm_relations" to "authenticated";

grant update on table "public"."persona_algorithm_relations" to "authenticated";

grant delete on table "public"."persona_algorithm_relations" to "service_role";

grant insert on table "public"."persona_algorithm_relations" to "service_role";

grant references on table "public"."persona_algorithm_relations" to "service_role";

grant select on table "public"."persona_algorithm_relations" to "service_role";

grant trigger on table "public"."persona_algorithm_relations" to "service_role";

grant truncate on table "public"."persona_algorithm_relations" to "service_role";

grant update on table "public"."persona_algorithm_relations" to "service_role";

grant delete on table "public"."persona_industry_relations" to "anon";

grant insert on table "public"."persona_industry_relations" to "anon";

grant references on table "public"."persona_industry_relations" to "anon";

grant select on table "public"."persona_industry_relations" to "anon";

grant trigger on table "public"."persona_industry_relations" to "anon";

grant truncate on table "public"."persona_industry_relations" to "anon";

grant update on table "public"."persona_industry_relations" to "anon";

grant delete on table "public"."persona_industry_relations" to "authenticated";

grant insert on table "public"."persona_industry_relations" to "authenticated";

grant references on table "public"."persona_industry_relations" to "authenticated";

grant select on table "public"."persona_industry_relations" to "authenticated";

grant trigger on table "public"."persona_industry_relations" to "authenticated";

grant truncate on table "public"."persona_industry_relations" to "authenticated";

grant update on table "public"."persona_industry_relations" to "authenticated";

grant delete on table "public"."persona_industry_relations" to "service_role";

grant insert on table "public"."persona_industry_relations" to "service_role";

grant references on table "public"."persona_industry_relations" to "service_role";

grant select on table "public"."persona_industry_relations" to "service_role";

grant trigger on table "public"."persona_industry_relations" to "service_role";

grant truncate on table "public"."persona_industry_relations" to "service_role";

grant update on table "public"."persona_industry_relations" to "service_role";

grant delete on table "public"."personas" to "anon";

grant insert on table "public"."personas" to "anon";

grant references on table "public"."personas" to "anon";

grant select on table "public"."personas" to "anon";

grant trigger on table "public"."personas" to "anon";

grant truncate on table "public"."personas" to "anon";

grant update on table "public"."personas" to "anon";

grant delete on table "public"."personas" to "authenticated";

grant insert on table "public"."personas" to "authenticated";

grant references on table "public"."personas" to "authenticated";

grant select on table "public"."personas" to "authenticated";

grant trigger on table "public"."personas" to "authenticated";

grant truncate on table "public"."personas" to "authenticated";

grant update on table "public"."personas" to "authenticated";

grant delete on table "public"."personas" to "service_role";

grant insert on table "public"."personas" to "service_role";

grant references on table "public"."personas" to "service_role";

grant select on table "public"."personas" to "service_role";

grant trigger on table "public"."personas" to "service_role";

grant truncate on table "public"."personas" to "service_role";

grant update on table "public"."personas" to "service_role";

grant delete on table "public"."stack_layers" to "anon";

grant insert on table "public"."stack_layers" to "anon";

grant references on table "public"."stack_layers" to "anon";

grant select on table "public"."stack_layers" to "anon";

grant trigger on table "public"."stack_layers" to "anon";

grant truncate on table "public"."stack_layers" to "anon";

grant update on table "public"."stack_layers" to "anon";

grant delete on table "public"."stack_layers" to "authenticated";

grant insert on table "public"."stack_layers" to "authenticated";

grant references on table "public"."stack_layers" to "authenticated";

grant select on table "public"."stack_layers" to "authenticated";

grant trigger on table "public"."stack_layers" to "authenticated";

grant truncate on table "public"."stack_layers" to "authenticated";

grant update on table "public"."stack_layers" to "authenticated";

grant delete on table "public"."stack_layers" to "service_role";

grant insert on table "public"."stack_layers" to "service_role";

grant references on table "public"."stack_layers" to "service_role";

grant select on table "public"."stack_layers" to "service_role";

grant trigger on table "public"."stack_layers" to "service_role";

grant truncate on table "public"."stack_layers" to "service_role";

grant update on table "public"."stack_layers" to "service_role";

grant delete on table "public"."user_preferences" to "anon";

grant insert on table "public"."user_preferences" to "anon";

grant references on table "public"."user_preferences" to "anon";

grant select on table "public"."user_preferences" to "anon";

grant trigger on table "public"."user_preferences" to "anon";

grant truncate on table "public"."user_preferences" to "anon";

grant update on table "public"."user_preferences" to "anon";

grant delete on table "public"."user_preferences" to "authenticated";

grant insert on table "public"."user_preferences" to "authenticated";

grant references on table "public"."user_preferences" to "authenticated";

grant select on table "public"."user_preferences" to "authenticated";

grant trigger on table "public"."user_preferences" to "authenticated";

grant truncate on table "public"."user_preferences" to "authenticated";

grant update on table "public"."user_preferences" to "authenticated";

grant delete on table "public"."user_preferences" to "service_role";

grant insert on table "public"."user_preferences" to "service_role";

grant references on table "public"."user_preferences" to "service_role";

grant select on table "public"."user_preferences" to "service_role";

grant trigger on table "public"."user_preferences" to "service_role";

grant truncate on table "public"."user_preferences" to "service_role";

grant update on table "public"."user_preferences" to "service_role";

create policy "Admins can manage algorithm_case_study_relations"
on "public"."algorithm_case_study_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Enable read access for all users"
on "public"."algorithm_case_study_relations"
as permissive
for select
to public
using (true);


create policy "Admins can manage algorithm_industry_relations"
on "public"."algorithm_industry_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view algorithm_industry_relations"
on "public"."algorithm_industry_relations"
as permissive
for select
to public
using (true);


create policy "Admins can manage algorithms"
on "public"."algorithms"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view published algorithms"
on "public"."algorithms"
as permissive
for select
to public
using ((published = true));


create policy "Admins can manage blog_post_relations"
on "public"."blog_post_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "blog_post_relations_admin_policy"
on "public"."blog_post_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text))
with check (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "blog_post_relations_public_read_policy"
on "public"."blog_post_relations"
as permissive
for select
to public
using (((EXISTS ( SELECT 1
   FROM blog_posts
  WHERE ((blog_posts.id = blog_post_relations.blog_post_id) AND (blog_posts.published = true)))) AND (EXISTS ( SELECT 1
   FROM blog_posts
  WHERE ((blog_posts.id = blog_post_relations.related_blog_post_id) AND (blog_posts.published = true))))));


create policy "Admins can manage blog posts"
on "public"."blog_posts"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Admins can manage blog_posts"
on "public"."blog_posts"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view published blog posts"
on "public"."blog_posts"
as permissive
for select
to public
using ((published = true));


create policy "Public can view published blog_posts"
on "public"."blog_posts"
as permissive
for select
to public
using ((published = true));


create policy "blog_posts_admin_policy"
on "public"."blog_posts"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text))
with check (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "blog_posts_public_read_policy"
on "public"."blog_posts"
as permissive
for select
to public
using ((published = true));


create policy "Admins can manage case studies"
on "public"."case_studies"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM user_preferences
  WHERE ((user_preferences.id = auth.uid()) AND (user_preferences.role = 'admin'::text)))));


create policy "Admins can manage case_studies"
on "public"."case_studies"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Anyone can view published case studies"
on "public"."case_studies"
as permissive
for select
to public
using ((published = true));


create policy "Authenticated users can create case studies"
on "public"."case_studies"
as permissive
for insert
to authenticated
with check (true);


create policy "Public can view published case_studies"
on "public"."case_studies"
as permissive
for select
to public
using ((published = true));


create policy "Admins can manage case_study_industry_relations"
on "public"."case_study_industry_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Enable read access for all users"
on "public"."case_study_industry_relations"
as permissive
for select
to public
using (true);


create policy "Admins can manage case_study_persona_relations"
on "public"."case_study_persona_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Enable read access for all users"
on "public"."case_study_persona_relations"
as permissive
for select
to public
using (true);


create policy "Admins can manage case_study_relations"
on "public"."case_study_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Admins can manage industries"
on "public"."industries"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view published industries"
on "public"."industries"
as permissive
for select
to public
using ((published = true));


create policy "Public can view persona_algorithm_relations"
on "public"."persona_algorithm_relations"
as permissive
for select
to public
using (true);


create policy "Admins can manage persona_industry_relations"
on "public"."persona_industry_relations"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view persona_industry_relations for published person"
on "public"."persona_industry_relations"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM personas
  WHERE ((personas.id = persona_industry_relations.persona_id) AND (personas.published = true)))));


create policy "Admins can manage personas"
on "public"."personas"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view published personas"
on "public"."personas"
as permissive
for select
to public
using ((published = true));


create policy "Admins can manage stack layers"
on "public"."stack_layers"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "Public can view stack layers"
on "public"."stack_layers"
as permissive
for select
to public
using (true);


create policy "Admins can manage all preferences"
on "public"."user_preferences"
as permissive
for all
to public
using ((role = 'admin'::text));


create policy "Allow anon access to user_preferences"
on "public"."user_preferences"
as permissive
for select
to anon
using (true);


create policy "Users can update own preferences"
on "public"."user_preferences"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view own preferences"
on "public"."user_preferences"
as permissive
for select
to public
using ((auth.uid() = id));


CREATE TRIGGER update_algorithms_updated_at BEFORE UPDATE ON public.algorithms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER blog_posts_ts_content_update BEFORE INSERT OR UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_ts_content();

CREATE TRIGGER set_blog_posts_published_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION set_blog_posts_published_at();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_blog_posts_updated_at();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_industries_updated_at BEFORE UPDATE ON public.industries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_personas_published_at BEFORE UPDATE ON public.personas FOR EACH ROW EXECUTE FUNCTION set_published_at_column();

CREATE TRIGGER update_personas_updated_at BEFORE UPDATE ON public.personas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- Create newsletter_subscriptions table
create table "public"."newsletter_subscriptions" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    subscription_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribe_token VARCHAR(255) UNIQUE DEFAULT gen_random_uuid(),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX idx_newsletter_date ON newsletter_subscriptions(subscription_date);
CREATE INDEX idx_newsletter_unsubscribe_token ON newsletter_subscriptions(unsubscribe_token);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for newsletter_subscriptions
create policy "Enable read access for all users" ON newsletter_subscriptions
    FOR SELECT USING (true);

create policy "Enable insert for all users" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

create policy "Enable update for admins only" ON newsletter_subscriptions
    FOR UPDATE USING (
        auth.jwt() ->> 'role' = 'admin'
    );

create policy "Enable delete for admins only" ON newsletter_subscriptions
    FOR DELETE USING (
        auth.jwt() ->> 'role' = 'admin'
    );

-- Add trigger for newsletter_subscriptions
CREATE TRIGGER update_newsletter_subscriptions_updated_at BEFORE UPDATE ON public.newsletter_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


