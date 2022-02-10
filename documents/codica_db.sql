-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- object: odmin | type: ROLE --
-- DROP ROLE IF EXISTS odmin;
CREATE ROLE odmin WITH 
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	LOGIN
	ENCRYPTED PASSWORD '********';
-- ddl-end --

-- object: rlyn1ce | type: ROLE --
-- DROP ROLE IF EXISTS rlyn1ce;
CREATE ROLE rlyn1ce WITH 
	INHERIT
	LOGIN
	ENCRYPTED PASSWORD '********';
-- ddl-end --


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: codica | type: DATABASE --
-- -- DROP DATABASE IF EXISTS codica;
-- CREATE DATABASE codica
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'ru_UA.UTF-8'
-- 	LC_CTYPE = 'ru_UA.UTF-8'
-- 	TABLESPACE = pg_default
-- 	OWNER = postgres;
-- -- ddl-end --
-- 

-- object: public.user_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.user_id_seq CASCADE;
CREATE SEQUENCE public.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.user_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id serial NOT NULL,
	email character varying(250),
	name character varying(250),
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT users_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: public.service_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.service_id_seq CASCADE;
CREATE SEQUENCE public.service_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.service_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.services | type: TABLE --
-- DROP TABLE IF EXISTS public.services CASCADE;
CREATE TABLE public.services (
	id serial NOT NULL,
	title character varying(250),
	description character varying(250),
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT services_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.services OWNER TO postgres;
-- ddl-end --

-- object: public.subscribers | type: TABLE --
-- DROP TABLE IF EXISTS public.subscribers CASCADE;
CREATE TABLE public.subscribers (
	id serial NOT NULL,
	user_id integer,
	service_id integer,
	expired_at timestamp with time zone,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT subscribers_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.subscribers OWNER TO postgres;
-- ddl-end --

-- object: subscribers_users_fk | type: CONSTRAINT --
-- ALTER TABLE public.subscribers DROP CONSTRAINT IF EXISTS subscribers_users_fk CASCADE;
ALTER TABLE public.subscribers ADD CONSTRAINT subscribers_users_fk FOREIGN KEY (user_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: subscribers_services_fk | type: CONSTRAINT --
-- ALTER TABLE public.subscribers DROP CONSTRAINT IF EXISTS subscribers_services_fk CASCADE;
ALTER TABLE public.subscribers ADD CONSTRAINT subscribers_services_fk FOREIGN KEY (service_id)
REFERENCES public.services (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


