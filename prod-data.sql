SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '78c3984d-02d1-4982-8773-8cf833d4533e', '{"action":"user_confirmation_requested","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-04-08 15:52:52.818491+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e227428c-9708-4614-b0c9-e4eca6529ede', '{"action":"user_signedup","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-04-08 15:53:12.685061+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b32cf114-8100-4d91-b3a6-1eb3abb1c515', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-04-08 15:53:13.528938+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2d6f772-7aa9-42c4-a91d-487662f2536c', '{"action":"user_repeated_signup","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-04-08 16:26:16.767098+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e567357-9184-4078-95f0-2edc185ef6bd', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:27:20.010265+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6028d96-3dca-4cdb-837b-ae9adc35fcb9', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-08 16:30:31.749406+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0677f8f-e8bf-40ce-bc20-c25f0a4d1a5c', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:31:07.991352+00', ''),
	('00000000-0000-0000-0000-000000000000', '31c434a2-1629-4bff-a596-9ae937e70422', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:31:11.859353+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9078f9f-064f-44ef-ab01-04d9886ef5c8', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:31:31.613299+00', ''),
	('00000000-0000-0000-0000-000000000000', '40b3fef4-76bd-498b-9602-2563a169a1b1', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:31:33.893484+00', ''),
	('00000000-0000-0000-0000-000000000000', '5cb306ab-ce8b-488b-b8c3-bfac132905ac', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:32:02.735301+00', ''),
	('00000000-0000-0000-0000-000000000000', '328a5a3f-ba79-40ba-a40d-35503ad5f17e', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:32:03.824769+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e3955cff-2a78-4723-be60-8eee1a830076', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:32:53.221263+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8fb5796-3353-4efd-bcd2-1faf8a2a4816', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:32:54.166609+00', ''),
	('00000000-0000-0000-0000-000000000000', '429c98a4-59f5-4acd-b3bb-2635d41bdfdb', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:34:51.515405+00', ''),
	('00000000-0000-0000-0000-000000000000', '1bdbc814-d8c4-4eb4-95c8-11be076e4c18', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-08 16:34:52.689735+00', ''),
	('00000000-0000-0000-0000-000000000000', '782c6c15-c221-4b9c-9050-35c358e6da39', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 02:39:48.503765+00', ''),
	('00000000-0000-0000-0000-000000000000', '4122ec8e-19ac-4a18-be04-b5413044f721', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 02:39:48.515223+00', ''),
	('00000000-0000-0000-0000-000000000000', '001e0ee4-186b-48ab-9d7e-51a5d3601f1a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 04:57:03.773237+00', ''),
	('00000000-0000-0000-0000-000000000000', '05cf89f6-e10a-4f7d-9b92-65708e852584', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 04:57:03.774136+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b58ef2bb-52b9-40b2-b04a-0227c198b650', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-09 05:27:45.568329+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c94d675e-2867-47ac-8676-a328d077c031', '{"action":"user_repeated_signup","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-04-09 05:29:38.949817+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c54ddc2-8813-49c5-a354-f68d20cd1223', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 05:30:36.316519+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4e446f6-cc00-4238-850c-0aea45d2810e', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 05:30:38.336837+00', ''),
	('00000000-0000-0000-0000-000000000000', '19796e45-49e6-492b-a801-1f7569ec9ba1', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 05:30:42.676927+00', ''),
	('00000000-0000-0000-0000-000000000000', '94ec2bca-ae93-428c-b9c6-93bf6d4b6708', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 06:54:03.192078+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d2136c5-4bf4-44c5-9512-ff5d15f9f248', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 06:54:03.207571+00', ''),
	('00000000-0000-0000-0000-000000000000', '33d91ca0-88a8-42f5-89a3-24bf2c1e3d5d', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-09 06:54:35.809423+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f778b36-64c3-4458-8645-3f70f649c232', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 07:26:56.100313+00', ''),
	('00000000-0000-0000-0000-000000000000', '579da46b-2f4e-4e45-b670-4292839a394b', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 07:27:09.948214+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da8f94e8-c8c5-46f5-aeb9-00ae3c17cc5d', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-09 07:31:29.017346+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cfee3611-7d7e-4168-84bb-e534ad6da14a', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 07:34:00.209055+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5b92f6a-72ff-4d14-b959-92761139d2a1', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 07:34:02.838163+00', ''),
	('00000000-0000-0000-0000-000000000000', '389f1b20-b84c-41c1-9643-7f8201885157', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 07:34:12.92081+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6740bba-3346-40c8-9eb7-36d7d78cd332', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-09 08:32:07.901577+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef9a8d60-ecfa-49d1-a9fe-ab6a01023072', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 08:32:39.421091+00', ''),
	('00000000-0000-0000-0000-000000000000', 'caa566fc-24fa-4e69-92f9-3e6bd1a2bd1e', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 08:32:44.168225+00', ''),
	('00000000-0000-0000-0000-000000000000', '7da8ec18-7d79-4988-bbd9-a8927fb3fb95', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-09 08:39:44.103241+00', ''),
	('00000000-0000-0000-0000-000000000000', '55d4e8c4-4fb5-40d3-b84c-6560d39acfcc', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 08:39:51.794556+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6370e34-f46a-4e7d-affc-55362e0b26f6', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-09 09:07:40.428993+00', ''),
	('00000000-0000-0000-0000-000000000000', '21f3d674-baa2-4cd5-9d83-576830c4aa78', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 09:07:44.334709+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b7e0202-dbf0-47b5-9b69-07700cda3c9b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 10:45:35.490651+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc3e7122-5782-4d14-a7bd-8efe9680d9f6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 10:45:35.491656+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be349658-554b-4248-8786-77fd0e193e7f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 11:46:14.807544+00', ''),
	('00000000-0000-0000-0000-000000000000', '578e5ad5-9811-48bc-b12e-72db2f5a4909', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 11:46:14.809191+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f4b22a0-8a1d-4f7f-a153-5a0a61e53e5f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 14:56:08.501238+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae64f1b7-e423-44f5-bf6f-8dc83ff8b29f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 14:56:08.518061+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c7422e3-134f-4ea5-bccb-c27ffcd11f62', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 15:54:36.019623+00', ''),
	('00000000-0000-0000-0000-000000000000', '9799f62b-9faa-47c5-8a84-8c7ac94e384b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 15:54:36.020617+00', ''),
	('00000000-0000-0000-0000-000000000000', '70b13eda-1ea5-43de-8ee0-d80d542c06f2', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-09 16:24:19.727467+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d7cd2f3-5b0c-42ab-ae60-3cbe07d8033a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 17:30:41.151398+00', ''),
	('00000000-0000-0000-0000-000000000000', '45ac24f1-93c2-448c-ada1-3a10914392e2', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-09 17:30:41.152995+00', ''),
	('00000000-0000-0000-0000-000000000000', '8cd7c94e-eaa8-41cf-afc7-0f8d516a0d1a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 01:39:23.853012+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ee283b7-92d7-46c7-9e25-8e6b6d32dbf0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 01:39:23.866348+00', ''),
	('00000000-0000-0000-0000-000000000000', '9325e911-91f7-4f1c-a7a3-1270c61380dd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 04:16:09.994975+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ee13c02-b797-49d5-917b-9481caed3ef3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 04:16:09.996515+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a97dfcc-f777-4764-b11f-50ec85aa67a1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 05:34:15.415313+00', ''),
	('00000000-0000-0000-0000-000000000000', '78a13430-3796-49a8-96e0-45f6d9cb828b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-10 05:34:15.416956+00', ''),
	('00000000-0000-0000-0000-000000000000', '9805030c-b23c-4707-a16d-5dbaca7a9ea3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 04:14:09.365614+00', ''),
	('00000000-0000-0000-0000-000000000000', '76815c35-60ab-43d5-bb8e-872e80de9f56', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 04:14:09.600782+00', ''),
	('00000000-0000-0000-0000-000000000000', '274dd1a7-3d2e-4e0b-87a6-9d8cf5b2b9e0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 04:14:09.625637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffa95d38-0829-4bf7-855d-298cbc5762f7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 04:14:09.644839+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8b8a73f-b907-4c9f-a78c-70cda164ea5d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 04:14:09.697317+00', ''),
	('00000000-0000-0000-0000-000000000000', '9eb0986f-bbde-4238-a16f-55bb1f2f0ce5', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-11 05:12:56.398544+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fe8b77e-29fa-4164-ad24-88ef6671d8db', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 05:55:53.550681+00', ''),
	('00000000-0000-0000-0000-000000000000', '5eeaae69-a746-4122-a971-a0dca1e6dea9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 05:55:53.553014+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b63bb47-a6d3-419a-9a13-f66599efa657', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-11 06:00:59.051395+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5a37089-e507-4861-be21-bb27be8e76f3', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-11 08:04:55.530008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd912111e-cca2-4d6b-82f0-07f8d85a2005', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-11 08:17:32.017524+00', ''),
	('00000000-0000-0000-0000-000000000000', '03685d64-0778-47c0-b47e-ea5c73889254', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 10:05:42.151057+00', ''),
	('00000000-0000-0000-0000-000000000000', '690ef731-1918-4ee3-a9ed-5a651f07fb82', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 10:05:42.153687+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd849a02-bf76-44d7-b854-4c92a7999df4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 10:11:10.099299+00', ''),
	('00000000-0000-0000-0000-000000000000', '781de90f-718b-407f-8315-9f214f5a5e5d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 10:11:10.100982+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a29a02a-d3f8-41db-9650-afac662327fe', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 14:02:16.261542+00', ''),
	('00000000-0000-0000-0000-000000000000', '17abebcc-2116-4936-a490-f3e8e0a09c67', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 14:02:16.264173+00', ''),
	('00000000-0000-0000-0000-000000000000', '25ecd38a-f32b-4021-bfc8-27a1e2edc75b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 15:01:53.678823+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df34e4f2-7274-4770-bc29-e63b4cc01615', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-11 15:01:53.680475+00', ''),
	('00000000-0000-0000-0000-000000000000', '5590c958-dd0b-4742-a6a8-f91c9cf2e210', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 06:22:15.093254+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd481ba3f-0612-4e89-bd25-42c6f3158306', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 06:22:15.109274+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b5cbd22-3cb1-476f-b42f-0336d847d115', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 07:47:43.23899+00', ''),
	('00000000-0000-0000-0000-000000000000', '82adba10-e751-4195-8990-beebb145506a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 07:47:43.24143+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ddbb46c-296d-429e-b17d-26cd08e9356b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 12:50:18.515003+00', ''),
	('00000000-0000-0000-0000-000000000000', '1bba5130-c718-47b3-83cb-68e633d9a119', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 12:50:18.518785+00', ''),
	('00000000-0000-0000-0000-000000000000', '126526ab-d808-45a6-94d0-71c07dbda33a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 13:54:35.970018+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a06871a-afa3-44d5-a041-5d3f7b343ce3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 13:54:35.98077+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa93a5df-2d5e-4e7d-befe-88167ab0b8c0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 14:52:41.23423+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a695bb51-5314-4496-a0a5-f3d48dcf8dce', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 14:52:41.237265+00', ''),
	('00000000-0000-0000-0000-000000000000', '00bd6106-fda6-4111-883c-9d10e178385b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 17:37:44.385438+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce34a0c6-b103-4b2d-91a5-0d072d85d9fb', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 17:37:44.38766+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac18f32c-9fe4-4d11-9cea-b40c0a9d8686', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 17:37:44.832544+00', ''),
	('00000000-0000-0000-0000-000000000000', '23aaead0-dfb2-45fb-85f2-6a69decf6802', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 17:37:44.913001+00', ''),
	('00000000-0000-0000-0000-000000000000', '53004d12-494a-4cd2-b518-ff0c4b12aea8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 17:37:44.978897+00', ''),
	('00000000-0000-0000-0000-000000000000', '06cc6f33-5d1c-4d5b-b1b2-205da87c76f2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-12 17:37:45.015962+00', ''),
	('00000000-0000-0000-0000-000000000000', '402b8823-4105-4ab2-8c6b-73236f8225e8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 06:44:28.378163+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3a781f3-0380-4260-afd4-35482856527b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 06:44:28.38904+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c164ea53-83c6-4e5e-a380-c1f8204df1a9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 11:35:55.202195+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b83f781b-eef8-46c6-b73c-8ee4ef889505', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 11:35:55.204599+00', ''),
	('00000000-0000-0000-0000-000000000000', '2379894e-f078-44b9-b751-725ec00be624', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 11:35:55.357574+00', ''),
	('00000000-0000-0000-0000-000000000000', '1363763f-8c91-467a-9362-29f806006159', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 11:35:55.412839+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de56ab5f-06f8-4390-a4b8-5c62ffd56de1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 11:35:55.435761+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c431b35d-1269-49be-8dd0-69081d44f32e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 11:35:55.447091+00', ''),
	('00000000-0000-0000-0000-000000000000', '31f351df-d31d-4bba-9fde-fae82e821f53', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 12:38:31.130001+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a481d31-7dd7-4962-8335-30c84e7cbda1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 12:38:31.131862+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d58e7ac-b507-49d8-8aa6-d50f66b80fe8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 15:40:04.484989+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa0bad75-313a-4a10-b331-75b1afe936ca', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 15:40:04.486669+00', ''),
	('00000000-0000-0000-0000-000000000000', '78e9726f-5264-4437-80bc-db7e9c638e1a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 17:05:31.754838+00', ''),
	('00000000-0000-0000-0000-000000000000', '1aba82a3-9209-470a-b19c-04e9caf38553', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-13 17:05:31.756989+00', ''),
	('00000000-0000-0000-0000-000000000000', '7534d2d1-4c7b-448d-ad1d-b4361e131991', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 07:32:38.354608+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b60f7050-ed2b-4a08-85d8-66cfa1a91f8b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 07:32:38.369269+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cc76136-18e3-4d90-9749-0e535d698873', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 07:32:38.593192+00', ''),
	('00000000-0000-0000-0000-000000000000', '86dafcc5-befc-4f2b-92fe-f65a24a1215a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 07:32:38.61238+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a441ce83-1578-4345-92d2-b0aa66939655', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 07:32:38.621088+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ecd068dc-475f-40cf-810e-be32e5e010b1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 07:32:38.629713+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c7ed132-a45e-4291-b0a1-6093ca13988e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 08:44:22.537278+00', ''),
	('00000000-0000-0000-0000-000000000000', '23a525aa-ef1f-438a-8574-1a32efb4584a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 08:44:22.538174+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3caaa93-c3b7-4acd-8ddb-770bb2ff3ea9', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-21 13:07:08.769053+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7028a97-2cdf-4e01-873c-00124deb30ab', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-21 13:19:20.335986+00', ''),
	('00000000-0000-0000-0000-000000000000', '644f5c6e-c55f-48ef-8c30-eca95bc38d60', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 15:03:18.91781+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aafaaf44-19f8-4c55-b2b4-284898c32149', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 15:03:18.919757+00', ''),
	('00000000-0000-0000-0000-000000000000', '17584d11-9583-434e-bef9-9f4f551f19f0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 15:03:19.292649+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6630279-c8a4-409e-aadf-536fa7ddfdc7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 15:03:19.310354+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7d48d55-6a1f-4283-99f3-a39480e52556', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 15:03:19.325052+00', ''),
	('00000000-0000-0000-0000-000000000000', '99198f0e-26fa-403e-9dd8-d1534586a2ac', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 15:03:19.364129+00', ''),
	('00000000-0000-0000-0000-000000000000', '8231fb5a-a5d5-4acb-8681-fc7eb31e2fd7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 17:38:52.539823+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea6f4886-8e4b-4c9f-a9da-0b043b7a2836', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 17:38:52.560726+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c4e108c-65f5-41c2-bf15-a763a2cb54bf', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 03:37:05.715842+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a6f8e98-9a60-47c5-9228-e44b91b101f1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 03:37:05.720061+00', ''),
	('00000000-0000-0000-0000-000000000000', '85b9ffb6-13df-43d3-bcdb-7d33f351b0f4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 06:47:30.191911+00', ''),
	('00000000-0000-0000-0000-000000000000', '7351e0b4-611c-43ec-a309-9c7827a6283b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 06:47:30.211555+00', ''),
	('00000000-0000-0000-0000-000000000000', '813d7d8d-db17-491c-aae4-e838562dd0ac', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 07:04:45.998355+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ce44959-effd-4537-9a99-ae924731b0d5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 07:04:46.006837+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7f34947-8bac-4e90-bd23-e6ccae8edcde', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 09:42:15.344045+00', ''),
	('00000000-0000-0000-0000-000000000000', '63bc5824-a842-4b90-842e-5910ae67aa35', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 09:42:15.360246+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e05286e-7695-40a6-b2a8-a209583094c4', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-27 08:15:24.325545+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e7935b0-64fe-4517-b8bd-3f85299007ec', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 00:40:40.6665+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4e9a305-4c37-47d8-aba4-2709ee4fb958', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 00:40:40.692619+00', ''),
	('00000000-0000-0000-0000-000000000000', '797ae53a-9317-4b92-8475-ace2803c499a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 00:40:40.755199+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e4bf3fa-95cc-4135-aaa6-4af5266760fb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 00:40:40.775422+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a8e9e8d-8018-47d1-96df-7eb4d899d185', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 00:40:40.783734+00', ''),
	('00000000-0000-0000-0000-000000000000', '47842322-0f75-4788-9e0d-1d6068ffb114', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 00:40:40.799215+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c5287b0-a96e-4278-9295-47318b688ecb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 01:48:40.434395+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b475a99-2be3-4387-ab82-61f5a6f1014e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 01:48:40.436551+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f41d9358-5c12-468c-b63a-d71b3ba7e9f5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 05:22:59.624464+00', ''),
	('00000000-0000-0000-0000-000000000000', '855c96f1-078f-4d67-903f-e2c75cd5576e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 05:22:59.626004+00', ''),
	('00000000-0000-0000-0000-000000000000', '9f61970c-c7da-4ba5-9e16-b6c69637342e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 05:23:00.074103+00', ''),
	('00000000-0000-0000-0000-000000000000', '8be1d088-398e-45c4-b6c0-0fb5b4371ffd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 05:23:00.211566+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec41e538-e0f2-4e6f-afce-520145e76142', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 05:23:00.266897+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd056e04c-a20e-46ee-b1c6-7f64e6790519', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 05:23:00.306522+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b25c45f-4807-4ea9-9af3-84e525feb1cd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 06:22:35.670047+00', ''),
	('00000000-0000-0000-0000-000000000000', '427c5f23-5052-4c25-9802-cdb36beff2d9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 06:22:35.673388+00', ''),
	('00000000-0000-0000-0000-000000000000', '88657033-bc04-4853-999c-0f33c7616804', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 07:36:22.985075+00', ''),
	('00000000-0000-0000-0000-000000000000', '027e6f36-7e1a-4992-97cf-f75da723a41b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 07:36:22.987747+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ddbe95c-7e71-4c4f-80f8-94f9f017f883', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 09:03:26.243331+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec80d7f2-2f04-462f-8b35-6b4afceda990', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 09:03:26.245385+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd54e615-efe9-4adc-9083-41bf361dedd0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 12:10:54.553272+00', ''),
	('00000000-0000-0000-0000-000000000000', '557a0c17-70ec-485a-81e2-8497c82aa2a7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 12:10:54.556913+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdf49a5c-8da5-471f-a1e4-6efb03544cf6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 13:41:23.734031+00', ''),
	('00000000-0000-0000-0000-000000000000', '744890b6-8956-42b2-a67f-d89bd595b070', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 13:41:23.742132+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf1aefeb-f22c-4b14-acdf-548dbb5eb238', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 14:39:47.179991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0170ee2-db5c-4a09-9d14-4fc8f6363e12', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 14:39:47.184602+00', ''),
	('00000000-0000-0000-0000-000000000000', '5dbec5c3-83f3-43a7-ac2d-5d2bea1707cd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 16:13:04.082445+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc6629e5-9b32-4dff-8ead-5f49a2464c8f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 16:13:04.085783+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bb4d318-3b62-480c-b79e-6e92b870aeb1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 17:40:02.087176+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adf18471-1418-4bba-a89f-89ae911eb238', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-28 17:40:02.09086+00', ''),
	('00000000-0000-0000-0000-000000000000', '28ba2b03-7627-4415-acae-6cd9554877f9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 05:28:49.324361+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c1dd952-7c75-49f9-aba6-af8fdc31e0b4', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 05:28:49.325973+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d054056-e126-4ba4-b4c7-eb85159a527a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 07:05:44.342443+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3942d4b-21df-44f7-acf8-c5e6c193661d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 07:05:44.357142+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd7bf1469-f051-41e4-aea4-612f3a71e5ac', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 07:05:44.425127+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb5c6634-e2d5-4298-87e7-d570ff278903', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 07:05:44.435379+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c7a8650-c2d4-4b76-94ba-7f0e83ecb3e0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 07:05:44.524744+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d5a76bd-b550-4a0c-8976-2b5a5cd54dc9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 07:05:44.603508+00', ''),
	('00000000-0000-0000-0000-000000000000', '164a236c-c9e1-48fd-9027-82997f384430', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 08:04:57.942323+00', ''),
	('00000000-0000-0000-0000-000000000000', '21d0c8b3-245d-455d-b11c-8780dffb7ce6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 08:04:57.950793+00', ''),
	('00000000-0000-0000-0000-000000000000', '4188aefb-4f9a-4e59-bc02-d03acc87d9bf', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 09:10:04.029059+00', ''),
	('00000000-0000-0000-0000-000000000000', '875849c5-0524-4249-b091-73cdd1395a31', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 09:10:04.031807+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cda33cfe-987e-4cb4-8eb9-e9f5250ff23b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 10:17:52.161615+00', ''),
	('00000000-0000-0000-0000-000000000000', '15230013-b8fa-4a3a-b8f7-4278718ce3a9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 10:17:52.163771+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8bcf78d-f87c-4e3a-adc4-e96fa401e708', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 14:28:26.025618+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c730d52e-5b3d-4aac-aa30-9190a7536f2c', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-29 14:28:26.027264+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc69f1f4-c20d-415a-bf64-f89707e292e5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-30 07:08:57.241945+00', ''),
	('00000000-0000-0000-0000-000000000000', '54547231-c105-4ccb-913f-35849de3ad2d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-30 07:08:57.270464+00', ''),
	('00000000-0000-0000-0000-000000000000', '98efa7ab-eca6-46a6-ac1b-c07c556c4e66', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-30 12:25:14.819445+00', ''),
	('00000000-0000-0000-0000-000000000000', '6899ac04-99d7-43f0-8215-1f1672aa5176', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-30 12:25:14.840501+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d8f5f15-b83e-47d2-8ce2-bc7baed71649', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 08:20:57.313047+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef774d0a-8a92-4777-a8d1-a969774393a9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 08:20:57.337314+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b56b9ef4-d361-434e-ae47-328b5cb8dd0b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 08:20:57.413304+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f5b892a-b0a0-48a0-8d81-82090631b8a6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 08:20:57.428457+00', ''),
	('00000000-0000-0000-0000-000000000000', '8583e9aa-5d94-43d5-b0e3-7f2d922e5b9b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 08:20:57.463722+00', ''),
	('00000000-0000-0000-0000-000000000000', '2edf3751-ed7d-46e2-9f01-3d0927859afd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 08:20:57.490045+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c773680e-112d-4914-8bcc-34c4506ec434', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 10:47:51.060736+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe4b732a-a8f9-4421-950d-d53a58c5d24f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-02 10:47:51.062452+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ef1d54c-5ec5-41dd-9439-755355c5e6bb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 07:39:42.339812+00', ''),
	('00000000-0000-0000-0000-000000000000', '2638cfca-070f-4863-a1ec-1730a9fc95fb', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 07:39:42.36289+00', ''),
	('00000000-0000-0000-0000-000000000000', '3306bdb3-9f1d-4dd5-9440-2934d67a95db', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 07:39:42.426223+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5ef9b69-a3a5-4044-a74e-947b5f6a2a1b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 07:39:42.449785+00', ''),
	('00000000-0000-0000-0000-000000000000', '81580592-d62d-4861-96d0-6fd213311cff', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 07:39:42.462812+00', ''),
	('00000000-0000-0000-0000-000000000000', '16e02ba2-ab88-48f4-8ab1-616f93a8357f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 07:39:42.481556+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba980936-324d-47ab-b197-ac4537932e06', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 09:00:47.070913+00', ''),
	('00000000-0000-0000-0000-000000000000', '03da334d-a243-4a66-bd42-84690fd9699b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 09:00:47.073477+00', ''),
	('00000000-0000-0000-0000-000000000000', '3827cb1a-ed36-42a4-bf3d-66679f7d2a17', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 09:59:57.214208+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c41648c2-eb90-4ffc-9e38-bbe545fa021e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 09:59:57.217302+00', ''),
	('00000000-0000-0000-0000-000000000000', '1697b060-1e1b-43a8-853e-399d77b2c1f1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 11:02:04.148093+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c4bc833-d78c-4404-aaf2-be484bff2e93', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 11:02:04.156296+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d2b5039-549e-4e1e-82d7-c6381e080a35', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 12:03:26.629222+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc581e26-e089-4136-aad7-44bf4ce7eefc', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 12:03:26.631812+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b006ce9-bada-4301-8467-f29bb15a784a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 12:03:26.894809+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da632eee-8988-4e2d-b5cf-75b9e4702851', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 12:03:27.213321+00', ''),
	('00000000-0000-0000-0000-000000000000', '675e828b-d384-47de-81ce-02bebdb51a4d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 12:03:27.279883+00', ''),
	('00000000-0000-0000-0000-000000000000', '52e1c7aa-3d59-4248-9a3c-57b1c5582116', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 13:35:49.460562+00', ''),
	('00000000-0000-0000-0000-000000000000', '1509f4bd-f2cf-4951-9885-ffcd234cc64f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 13:35:49.463264+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df9c383c-e1fb-4111-a790-55b2c3a28ae4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 04:27:29.125801+00', ''),
	('00000000-0000-0000-0000-000000000000', '99504d3e-13cc-4ad3-afc3-32a273435fb8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 04:27:29.140367+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ee61734-b010-48a0-b686-49e306acb106', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 07:50:29.384131+00', ''),
	('00000000-0000-0000-0000-000000000000', '191dd5c1-a750-4df4-80ca-c7ca83aceaf5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 07:50:29.403451+00', ''),
	('00000000-0000-0000-0000-000000000000', '51028d0d-8ecc-4040-9131-c9c07f06f8db', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-06 07:59:07.665465+00', ''),
	('00000000-0000-0000-0000-000000000000', '75523edd-6e7f-4f36-b322-662fac247d50', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 09:07:20.622203+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0226233-a427-4aa7-b8a8-83548d153f75', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-06 09:07:20.624928+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1274e42-2de4-4f3b-90fa-466d9c5c9099', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-11 21:54:51.515248+00', ''),
	('00000000-0000-0000-0000-000000000000', '4aaec393-897c-4bab-bc7e-9e057cf5f65a', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-11 21:54:56.719727+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e44b5fb3-7d44-47e3-b925-6c7fadedb59f', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-11 22:06:47.008159+00', ''),
	('00000000-0000-0000-0000-000000000000', '81e8a492-7597-4a1f-8b10-af19afa95bfb', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-11 22:06:48.692752+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af63a7fb-031a-4a96-8fca-e799bfe14786', '{"action":"user_confirmation_requested","actor_id":"a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340","actor_username":"david@jupiterthree.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-11 22:38:11.208903+00', ''),
	('00000000-0000-0000-0000-000000000000', '3adb4e5a-be4f-4c93-a5b7-b447a1fa65dc', '{"action":"user_signedup","actor_id":"a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340","actor_username":"david@jupiterthree.com","actor_via_sso":false,"log_type":"team"}', '2025-05-11 22:38:38.689388+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6be19bb-27ac-4916-9be5-48d36304b5ad', '{"action":"login","actor_id":"a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340","actor_username":"david@jupiterthree.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-11 22:38:59.913208+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa6044a0-e1d1-4969-995f-1844a309ffdc', '{"action":"login","actor_id":"a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340","actor_username":"david@jupiterthree.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-11 22:40:11.942255+00', ''),
	('00000000-0000-0000-0000-000000000000', '447ec9bc-5427-4e4e-b1ce-6b8b48790c71', '{"action":"user_confirmation_requested","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-11 22:40:16.237452+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a206401a-4902-4933-99dc-5b0176ad0a5a', '{"action":"user_signedup","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-05-11 22:40:32.460576+00', ''),
	('00000000-0000-0000-0000-000000000000', '39871697-2961-4d0d-9028-7f36e99893ef', '{"action":"login","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-05-11 22:40:34.009063+00', ''),
	('00000000-0000-0000-0000-000000000000', '295873ea-d6c2-4ecf-b6bc-bdea5afa2f91', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-11 23:05:51.105012+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c700ed0-3422-4bc7-b117-2af74299504d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-11 23:05:51.112094+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e8ec48b5-50a1-41c4-99c0-dc19fab1fec1', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-12 00:31:36.561751+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9deb9e8-5401-416d-80ef-ec739800ee5a', '{"action":"token_refreshed","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 07:24:05.168691+00', ''),
	('00000000-0000-0000-0000-000000000000', '145add8d-8387-4f58-831c-ef128d6b8fba', '{"action":"token_revoked","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 07:24:05.18818+00', ''),
	('00000000-0000-0000-0000-000000000000', '7114e7dd-ffaa-4ff4-86d6-3f72224c41e5', '{"action":"token_refreshed","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 08:39:13.892706+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd784852-0207-438c-baa1-6d379c27a8ff', '{"action":"token_revoked","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 08:39:13.895819+00', ''),
	('00000000-0000-0000-0000-000000000000', '91108b40-c3e6-4521-a431-c1f4a556177d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 09:23:30.498458+00', ''),
	('00000000-0000-0000-0000-000000000000', '11f2f209-d0c0-4f81-8ca7-5d1c95822484', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 09:23:30.502244+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ef44456-854a-4fbc-8432-141f75ea6ecc', '{"action":"token_refreshed","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 14:15:31.823579+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d8fd59f-8331-4965-9840-e392284b77cf', '{"action":"token_revoked","actor_id":"8decc90a-0a8b-47cc-bb0f-610d3944145c","actor_username":"a.marchenkova@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-12 14:15:31.829652+00', ''),
	('00000000-0000-0000-0000-000000000000', '62f2c6b7-8147-47bf-abe2-c48f30d4f056', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-13 00:34:13.166363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f73d468c-cc1d-4bda-9c8e-2ea77128fd2f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-13 00:34:13.169089+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f8b8ca4-1489-4b58-a069-d0e612467849', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-13 02:39:06.03002+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4db46b0-4cd5-40ac-b05a-009e41d33502', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-13 02:39:06.036643+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ab74a44-7f65-411b-a033-55295250bbad', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-13 07:36:04.4061+00', ''),
	('00000000-0000-0000-0000-000000000000', '5db0f0b5-809a-4dfe-9cca-b440f06c473a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-13 07:36:04.419597+00', ''),
	('00000000-0000-0000-0000-000000000000', '3438afdd-f89c-41c8-a18c-2e470af4eafb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 02:19:24.846899+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b555335-21d0-477a-a6c2-a96ce9cc63c6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 02:19:24.857058+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6c47669-90e2-4367-b698-0d2a209e7331', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 02:19:25.726932+00', ''),
	('00000000-0000-0000-0000-000000000000', '627df549-0685-4768-9a9a-e1c083cf0da9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 02:19:25.73816+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b88eae6d-f9d7-46f2-9f07-91842e35faf5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 02:19:25.783027+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf7976a0-25b1-4bf5-9830-e7de34c5feb6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 02:19:26.067809+00', ''),
	('00000000-0000-0000-0000-000000000000', '8fb42e67-03e9-462e-87ef-c47104cdac2a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 03:24:09.191743+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ba986f4-e921-4495-9206-f4e85ee2c764', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 03:24:09.193302+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e67eba5-9dd2-4360-8ce7-dbd122d1e8ea', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 04:38:59.284634+00', ''),
	('00000000-0000-0000-0000-000000000000', '43aa9310-689c-473d-a7f4-974564aac5f8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 04:38:59.29051+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed3d8827-6354-461f-84ba-6088632c52c9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 06:25:36.470913+00', ''),
	('00000000-0000-0000-0000-000000000000', '8cee49a8-42bb-4829-893f-50ef0a3c1eaa', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 06:25:36.480552+00', ''),
	('00000000-0000-0000-0000-000000000000', '37965719-56d8-493e-86b1-da7f22076661', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:25.709109+00', ''),
	('00000000-0000-0000-0000-000000000000', '92e585ed-2925-43b9-a8a4-c45e25d4ff9a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:25.718944+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c56709c-d7e8-4f41-a796-30cbe4f714bd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:25.76778+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2170995-8166-4136-93a8-07043254c002', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:25.787217+00', ''),
	('00000000-0000-0000-0000-000000000000', '47b884af-836b-4cb1-84b6-1a478ba2d5c3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:30.857932+00', ''),
	('00000000-0000-0000-0000-000000000000', '69a1749d-b0c2-4054-a9ba-240696b4e65d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:30.870817+00', ''),
	('00000000-0000-0000-0000-000000000000', '09cf9c93-2994-41c2-88ff-2ca6ebf6b6b9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:30.941718+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fcbb3124-7a59-4ece-90a0-74f8ee61e9ec', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 12:54:31.015575+00', ''),
	('00000000-0000-0000-0000-000000000000', '1186f9a6-e7d0-471d-ae07-6975dac72970', '{"action":"user_repeated_signup","actor_id":"a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340","actor_username":"david@jupiterthree.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-14 13:21:05.998278+00', ''),
	('00000000-0000-0000-0000-000000000000', '328c59c2-54d0-4cc2-aa47-1b627d3612e7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 13:57:11.821173+00', ''),
	('00000000-0000-0000-0000-000000000000', '30e6aaa6-a71d-4dc9-b9d8-c626847101f8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 13:57:11.825323+00', ''),
	('00000000-0000-0000-0000-000000000000', '53615fd7-c0fe-4f8a-b4bc-f8c05252bceb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 14:56:02.650235+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d7fbb2c-f5f7-4acf-bfd6-bdb6303f6922', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 14:56:02.652861+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0f51c9e-68a9-4349-862d-18c43bc0426b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 14:56:02.685009+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cfb1b8fa-f442-4f60-9278-645ea2cfae10', '{"action":"user_repeated_signup","actor_id":"a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340","actor_username":"david@jupiterthree.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-14 15:52:14.221945+00', ''),
	('00000000-0000-0000-0000-000000000000', '6da3146b-9579-4b2a-8c11-29778759735f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 16:05:45.709349+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9919b43-d2b2-45a5-b73b-988de7f301fa', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 16:05:45.713927+00', ''),
	('00000000-0000-0000-0000-000000000000', '64ffe379-f6ad-4b88-8ce1-d619c4d3a54f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-14 16:05:46.822755+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c729965-0d57-4c29-8070-ecf35e569346', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-14 17:07:44.441696+00', ''),
	('00000000-0000-0000-0000-000000000000', '7aa62f49-9d9f-463b-b60c-83969fb56675', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-14 17:09:11.120378+00', ''),
	('00000000-0000-0000-0000-000000000000', '24b999f1-7971-4343-b8d4-10f6289b8bc2', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-14 17:28:50.613051+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3e78d19-bf1e-4a1c-b5e2-fc11158dafcb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 00:38:05.118567+00', ''),
	('00000000-0000-0000-0000-000000000000', '2fb50d99-c5b8-4eb8-8720-542712f02550', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 00:38:05.119652+00', ''),
	('00000000-0000-0000-0000-000000000000', '53bd3515-e290-46f4-ba89-16a84a2e793e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 01:36:35.714516+00', ''),
	('00000000-0000-0000-0000-000000000000', '728678f3-9e83-413b-85ca-30b0f36d0c20', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 01:36:35.716109+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b372beb-9a43-42e2-865e-3d621acee0b4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 01:36:38.597108+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d9d83c5-d4fa-4bf8-b33c-26a25e7fe09a', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-15 02:55:29.295393+00', ''),
	('00000000-0000-0000-0000-000000000000', '938ddd69-3b4a-4f25-9d01-897aa220aeb6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 05:22:25.573945+00', ''),
	('00000000-0000-0000-0000-000000000000', '16672364-9833-4ba8-b510-8e6971beb9a7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 05:22:25.574822+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0d3544f-d8cd-4332-be2c-119f88bed91b', '{"action":"user_confirmation_requested","actor_id":"7ee419a4-65c8-4570-a5b8-5472280b06ad","actor_username":"yade.song@qrens.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-15 09:51:23.119183+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfc709da-7b6e-4558-8838-4a69d10945e0', '{"action":"user_confirmation_requested","actor_id":"7ee419a4-65c8-4570-a5b8-5472280b06ad","actor_username":"yade.song@qrens.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-15 09:51:34.976305+00', ''),
	('00000000-0000-0000-0000-000000000000', '937fd5e7-8347-4eb6-b90b-c3cba065b302', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 14:24:41.761761+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba6d0571-cb33-41e1-a61f-8a0a7a16456d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 14:24:41.762857+00', ''),
	('00000000-0000-0000-0000-000000000000', '10c86714-be5e-4f87-a257-64502523bbc1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 16:04:06.690343+00', ''),
	('00000000-0000-0000-0000-000000000000', '32679e20-724f-4a52-9029-fd7923f8b22a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 16:04:06.691191+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bb8d6b7-de21-499d-a70f-c7ddb9629984', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 16:04:07.196126+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4ac0b74-4a00-4e8d-83e9-1c848674cf84', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 17:16:21.062398+00', ''),
	('00000000-0000-0000-0000-000000000000', '234fe9a0-2c38-4594-a788-538e51d44bc9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 17:16:21.063294+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0b5fdaa-95dd-4b33-a065-3f95007f6c4e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 17:16:22.075042+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1890a64-2b67-4c70-9f3c-106f27fa59fc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 17:16:22.468596+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9366b3c-1db6-470d-b4c3-fad45e16909c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 19:21:22.663809+00', ''),
	('00000000-0000-0000-0000-000000000000', '9544132e-0b50-4443-ad69-67a9ca41e1c7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 19:21:22.66472+00', ''),
	('00000000-0000-0000-0000-000000000000', '5801a416-395c-4275-a97f-3a62bfd66b1c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-16 03:01:14.425422+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2e6dc3d-2e36-49ef-b3b7-ab0f282ff55c', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-16 03:01:14.426476+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc4d23ff-f2b5-44d2-aaac-ee4489ea1e8a', '{"action":"user_confirmation_requested","actor_id":"12c127f3-5108-4612-8a7e-f9875807f09a","actor_username":"sakurairihito@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 08:01:51.188273+00', ''),
	('00000000-0000-0000-0000-000000000000', '9011f33d-bac5-4352-a874-a7972d305f04', '{"action":"user_signedup","actor_id":"12c127f3-5108-4612-8a7e-f9875807f09a","actor_username":"sakurairihito@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-05-16 08:02:12.472872+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ecec7d27-c06a-41a2-8633-574fbe5be672', '{"action":"login","actor_id":"12c127f3-5108-4612-8a7e-f9875807f09a","actor_username":"sakurairihito@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-16 08:02:46.228425+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a09a5ad-6cf5-46c9-9da9-d4b0b59acc8a', '{"action":"user_confirmation_requested","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 08:05:06.461075+00', ''),
	('00000000-0000-0000-0000-000000000000', '15710d96-2a6d-40d3-8fdb-03fab6fa77e0', '{"action":"user_confirmation_requested","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 08:06:04.698004+00', ''),
	('00000000-0000-0000-0000-000000000000', '06fb3812-094f-4828-bf88-2d725746f617', '{"action":"user_signedup","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-05-16 08:06:25.609258+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c70d588-4a9a-4612-94ca-2bd66d89194c', '{"action":"login","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-05-16 08:06:26.702994+00', ''),
	('00000000-0000-0000-0000-000000000000', '15de0fc7-d008-4e25-b777-e26e5c4bedfb', '{"action":"user_confirmation_requested","actor_id":"ee823d45-d802-4308-b391-16d7023e963a","actor_username":"yuya.seki@keio.jp","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 08:06:33.039017+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1edcd6b-2012-4473-8406-eb729b3e919b', '{"action":"logout","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-16 08:06:44.340324+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2023809-9f7e-4b1d-9915-de9085acc25d', '{"action":"login","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-16 08:06:49.093894+00', ''),
	('00000000-0000-0000-0000-000000000000', '9238f932-e84d-443f-8d9a-72fbea50df1c', '{"action":"user_signedup","actor_id":"ee823d45-d802-4308-b391-16d7023e963a","actor_username":"yuya.seki@keio.jp","actor_via_sso":false,"log_type":"team"}', '2025-05-16 08:08:48.223384+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c88d2a07-e7cc-4985-afce-4089d374a451', '{"action":"login","actor_id":"ee823d45-d802-4308-b391-16d7023e963a","actor_username":"yuya.seki@keio.jp","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-16 08:09:05.302303+00', ''),
	('00000000-0000-0000-0000-000000000000', '567ce0c8-ef44-4920-b46c-b1bf6ab131e4', '{"action":"user_confirmation_requested","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 08:17:53.327435+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a735a41e-a224-4e1d-bd5c-5df4e2224810', '{"action":"user_signedup","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"team"}', '2025-05-16 08:17:59.407549+00', ''),
	('00000000-0000-0000-0000-000000000000', '512394ee-451a-42f7-809c-60748206a25d', '{"action":"user_repeated_signup","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 08:19:14.203849+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7553eca-64b2-4448-be2b-6ce92da67eb4', '{"action":"login","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-16 08:22:24.874604+00', ''),
	('00000000-0000-0000-0000-000000000000', '46c454ec-be63-4f7f-87ac-36338fdcbd46', '{"action":"token_refreshed","actor_id":"12c127f3-5108-4612-8a7e-f9875807f09a","actor_username":"sakurairihito@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-16 09:47:41.225639+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c5aa4bb-052e-4a8f-90ec-3f547439c2d1', '{"action":"token_revoked","actor_id":"12c127f3-5108-4612-8a7e-f9875807f09a","actor_username":"sakurairihito@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-16 09:47:41.226583+00', ''),
	('00000000-0000-0000-0000-000000000000', '590ba163-5f09-46c1-a8dc-5c4b0033389e', '{"action":"user_confirmation_requested","actor_id":"4a5eed37-f7a7-4af8-a717-820cd1a4bed2","actor_username":"citronkob1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-16 13:05:42.521069+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e594834-f5bb-4340-ba46-00943d073b06', '{"action":"user_signedup","actor_id":"4a5eed37-f7a7-4af8-a717-820cd1a4bed2","actor_username":"citronkob1@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-05-16 13:06:01.784007+00', ''),
	('00000000-0000-0000-0000-000000000000', '405576a7-7e61-4b8c-8c40-fab4d083b921', '{"action":"login","actor_id":"4a5eed37-f7a7-4af8-a717-820cd1a4bed2","actor_username":"citronkob1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-05-16 13:06:02.908779+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fcd7828e-ac93-4259-876c-048a9071739b', '{"action":"token_refreshed","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-17 04:05:14.221326+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f9ea166-3d11-4851-93c9-847a138fb5d4', '{"action":"token_revoked","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-17 04:05:14.222357+00', ''),
	('00000000-0000-0000-0000-000000000000', '271de392-c51b-47b3-a289-e479ec578b14', '{"action":"token_refreshed","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-17 05:11:21.564745+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7e85fbd-c024-4fe5-b7bc-817d6a8f79e7', '{"action":"token_revoked","actor_id":"ee1ff081-8ccb-41b3-a886-210f43ba6a47","actor_username":"keita0067guitar@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-17 05:11:21.565735+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b65d0b5d-0951-4387-84c7-27922f389b0c', '{"action":"user_recovery_requested","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"user"}', '2025-05-17 05:14:35.790861+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f82f76d-d859-413a-918d-bc2f2f04c479', '{"action":"login","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"account"}', '2025-05-17 05:14:42.034518+00', ''),
	('00000000-0000-0000-0000-000000000000', '6eae0da1-70a9-4550-ae25-0e47cbd36255', '{"action":"user_recovery_requested","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"user"}', '2025-05-17 05:17:43.094994+00', ''),
	('00000000-0000-0000-0000-000000000000', '45b6082f-b0c0-46c7-83c9-408d40115c5b', '{"action":"login","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"account"}', '2025-05-17 05:17:49.092053+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dacaeb7a-27d1-4be2-88a8-ded1c8945f2b', '{"action":"login","actor_id":"ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca","actor_username":"maeshima.h@jp.panasonic.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-17 05:21:55.433274+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e91438dc-3dab-4dc8-93ab-3e0a785d621d', '{"action":"user_confirmation_requested","actor_id":"2a1026c9-979d-41d6-85ce-f916b4b3e1f1","actor_username":"tanaka.shu@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-19 02:09:29.022112+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af5b6214-4fd7-487e-81ea-18db2446c056', '{"action":"user_signedup","actor_id":"2a1026c9-979d-41d6-85ce-f916b4b3e1f1","actor_username":"tanaka.shu@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-05-19 02:09:55.475236+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6cf7e98-67d8-4665-adc5-28b698edc22e', '{"action":"login","actor_id":"2a1026c9-979d-41d6-85ce-f916b4b3e1f1","actor_username":"tanaka.shu@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-05-19 02:09:56.092099+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5ad93af-cf4d-4b9d-8813-2215f6a5ce1a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 06:55:07.164657+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5d747bd-020f-457a-90b7-11a8369f771f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 06:55:07.165772+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d550093-5f95-4696-b541-4eeb7e012886', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 06:55:07.185991+00', ''),
	('00000000-0000-0000-0000-000000000000', '472d65ae-8477-41d6-adaa-6ffe453b100d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 06:55:07.216209+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf823caa-49bf-4cbe-b546-f8e2f90a8ea8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 06:55:07.45882+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ed9b04c-ea5f-45a2-a9f1-df4470753dcd', '{"action":"user_confirmation_requested","actor_id":"546d25d0-7fe9-415b-8bbc-4315c4318c2b","actor_username":"yoshitsuna.murata@jp.fujikura.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-19 07:14:15.252447+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd34520d6-51f8-4078-a85c-758f2b9e0262', '{"action":"user_signedup","actor_id":"546d25d0-7fe9-415b-8bbc-4315c4318c2b","actor_username":"yoshitsuna.murata@jp.fujikura.com","actor_via_sso":false,"log_type":"team"}', '2025-05-19 07:15:22.750463+00', ''),
	('00000000-0000-0000-0000-000000000000', '94c8ef26-2f5a-4222-a84e-0b3e77eca5a2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 13:54:23.271863+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd82d3e4-7753-49b9-9dc6-1d19acd626b5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-19 13:54:23.272896+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b72abc68-a6e3-4dad-8854-a2570e9f2e61', '{"action":"user_repeated_signup","actor_id":"546d25d0-7fe9-415b-8bbc-4315c4318c2b","actor_username":"yoshitsuna.murata@jp.fujikura.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-21 08:11:17.331417+00', ''),
	('00000000-0000-0000-0000-000000000000', '06817d40-e4f0-4837-a9a7-a9366d6735eb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-21 12:16:21.811546+00', ''),
	('00000000-0000-0000-0000-000000000000', '38084038-7929-4ac3-8882-a11acabcaadd', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-21 12:16:21.813107+00', ''),
	('00000000-0000-0000-0000-000000000000', '19aa1769-b91e-4087-b169-589d60036a44', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-21 12:16:22.139462+00', ''),
	('00000000-0000-0000-0000-000000000000', '7dafe64c-ac8c-4b4c-804f-74a8b5b78f54', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-21 12:16:22.179736+00', ''),
	('00000000-0000-0000-0000-000000000000', '87f82ed6-8c44-4607-b783-02d9b4955934', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-21 12:16:22.212918+00', ''),
	('00000000-0000-0000-0000-000000000000', '10e51d73-0a0b-4dea-8ff3-d0d67566f920', '{"action":"user_confirmation_requested","actor_id":"b24dc92d-51cc-40dd-b700-51be02e4f2a9","actor_username":"taro2021yama@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-05-22 00:40:37.783835+00', ''),
	('00000000-0000-0000-0000-000000000000', '8429e9aa-7f97-464b-a21c-828678276d2d', '{"action":"user_signedup","actor_id":"b24dc92d-51cc-40dd-b700-51be02e4f2a9","actor_username":"taro2021yama@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-05-22 00:41:02.290722+00', ''),
	('00000000-0000-0000-0000-000000000000', '80fc502d-45b8-4bd6-81f4-f7c1a80781c1', '{"action":"login","actor_id":"b24dc92d-51cc-40dd-b700-51be02e4f2a9","actor_username":"taro2021yama@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-05-22 00:41:03.304064+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b9aace5-1d4d-44fb-8992-bee93721653d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-23 03:28:16.616555+00', ''),
	('00000000-0000-0000-0000-000000000000', '144464ce-20fd-4087-a867-b1bfc77074f6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-23 03:28:16.61848+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bec3d26-d93c-4208-ab57-7e552e44555d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-24 06:56:10.926579+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c854e4a9-9c7e-4b1e-8f37-723a8139103b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-24 06:56:10.929086+00', ''),
	('00000000-0000-0000-0000-000000000000', '9bef015b-2956-4210-a92d-10e3e2eac11d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-25 01:13:51.539362+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c4c0e02-c0ee-469b-8bdd-82df332c13d3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-25 01:13:51.541913+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d6e9e59-c317-4681-9de6-48a595d1336b', '{"action":"user_confirmation_requested","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-06-08 17:47:10.490997+00', ''),
	('00000000-0000-0000-0000-000000000000', '00b443fe-139e-4884-aec4-8ae9cb8c5486', '{"action":"user_signedup","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-06-08 17:47:31.826742+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6b97869-789f-4d79-84d8-d1c94528be1e', '{"action":"login","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-08 17:47:46.425447+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c7296a9-b312-4bc5-a253-823b41152f3a', '{"action":"login","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-08 17:47:48.682684+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3dc9962-916c-419c-a094-71cb34059902', '{"action":"token_refreshed","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 07:56:30.73439+00', ''),
	('00000000-0000-0000-0000-000000000000', '875bed4a-1c86-4e9c-b247-9689c28d785f', '{"action":"token_revoked","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 07:56:30.737215+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5d70181-43a2-4238-9d7f-83e0744eb6cf', '{"action":"token_refreshed","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 13:29:52.748087+00', ''),
	('00000000-0000-0000-0000-000000000000', '15ff90e3-dd27-4dd2-9da6-75b4b33031a1', '{"action":"token_revoked","actor_id":"6aea3115-bb2c-4038-9be0-944a1b728725","actor_username":"amin.zamani.se@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-09 13:29:52.749777+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f86fde1b-8739-4b6b-86ee-95068648dfcc', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-15 11:16:02.155585+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f670f45-6bb6-4ac0-b669-3d3be306c658', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-15 11:23:07.834712+00', ''),
	('00000000-0000-0000-0000-000000000000', '4b8af901-a9d1-4d13-9fd0-9a824ca20b8c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:24:49.382073+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7f85d7e-186a-43db-b412-ef111e1a592b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 14:24:49.383097+00', ''),
	('00000000-0000-0000-0000-000000000000', '437aa681-5cdd-43eb-a57b-6c9da87a2931', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 15:22:58.993079+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6f0290e-cc72-483d-8818-3b7fa61dd7c4', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 15:22:58.994034+00', ''),
	('00000000-0000-0000-0000-000000000000', '849ea567-efcc-46f0-a73c-38eb5b4b602c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 16:31:08.430815+00', ''),
	('00000000-0000-0000-0000-000000000000', '4190884a-738f-46eb-bb79-add0cf7f2617', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 16:31:08.431864+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3dd7da4-b1ab-41ce-846f-0e0cde2e27bb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:30:07.995065+00', ''),
	('00000000-0000-0000-0000-000000000000', '15e14169-1eb0-4666-8f08-1f186a0829d7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 17:30:07.996681+00', ''),
	('00000000-0000-0000-0000-000000000000', '039c0abb-accc-4c95-9af9-240c988b41e8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:07:28.248773+00', ''),
	('00000000-0000-0000-0000-000000000000', '53d13c1a-c68d-4bec-bbe7-97ba8f2348aa', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-15 18:07:28.249748+00', ''),
	('00000000-0000-0000-0000-000000000000', '9dce0d4e-859c-4905-9d15-6154068f0631', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:00:13.709029+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3817b34-b064-483f-a679-49e5e20ea865', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:00:13.710023+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c29bc359-8996-4a2d-8b00-8e406423dddc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:37:31.939491+00', ''),
	('00000000-0000-0000-0000-000000000000', '99cbb5de-e81f-47a4-9154-7f60bfee62b7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:37:31.940456+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cc44c08-4f0d-4f2b-ae5a-138336ebbf6f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 10:37:32.115969+00', ''),
	('00000000-0000-0000-0000-000000000000', '0eb63478-100f-49f8-a700-3ae7291deaa5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:11:43.757567+00', ''),
	('00000000-0000-0000-0000-000000000000', '297fad0e-9bda-4cac-8f1b-02792b64e702', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:11:43.758509+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c0c379e2-93b9-4c02-8f31-e3283c0ee32c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 11:11:44.542518+00', ''),
	('00000000-0000-0000-0000-000000000000', '10c7a8e4-0c11-41a3-8ff9-a411bc4f9e8b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:54:21.608558+00', ''),
	('00000000-0000-0000-0000-000000000000', '86d05a9b-1f06-4d78-961e-9b2d0b95a3a8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:54:21.609509+00', ''),
	('00000000-0000-0000-0000-000000000000', '883163c8-6779-4b0f-98a0-07f0f7bd0a8b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:54:22.239712+00', ''),
	('00000000-0000-0000-0000-000000000000', '88780d28-bfce-4680-a25f-c38a0c0b5570', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:54:43.068681+00', ''),
	('00000000-0000-0000-0000-000000000000', '966bea4a-9131-4dc0-8b86-afc05a339c87', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 12:54:43.06932+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f68ee26-7f67-48a8-8f87-a0ad8fa61027', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 14:25:14.61211+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0133d76-635e-4d1a-b54a-49a2bbcb740d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 14:25:14.613069+00', ''),
	('00000000-0000-0000-0000-000000000000', '705579e6-9b03-44e9-a7fb-fb7012805043', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:16:44.573465+00', ''),
	('00000000-0000-0000-0000-000000000000', '48ba3dec-804c-4588-93d8-0599ffac277c', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:16:44.574549+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdc2b166-bf8c-4257-925e-3957f59de7d3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:41:50.253926+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de2a086e-fd9c-4aff-96ec-2335c468621e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:41:50.254908+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b082e146-d818-465b-87e0-bb0ed8b7f33e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 15:41:50.552271+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e89ab70-f23a-4672-9160-5acdafc48191', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:22:47.8608+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7dff271-898a-4607-988f-41f2867e4f57', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 17:22:47.862489+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a32be492-1d27-406c-a799-dc72fa2fcc00', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:44:04.360434+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a39c13d7-99ed-4063-a8b9-a07bdaa32cb5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-16 18:44:04.361512+00', ''),
	('00000000-0000-0000-0000-000000000000', '2651b589-23ee-4584-a215-80a58e315d47', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 03:18:39.178788+00', ''),
	('00000000-0000-0000-0000-000000000000', '83e92217-8624-451c-9445-cfe3bcde7374', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 03:18:39.180574+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5a3097c-4e6f-4226-90a9-924e8299d4a1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 03:18:49.915559+00', ''),
	('00000000-0000-0000-0000-000000000000', '248c57c5-2050-44a6-8feb-f14f884084df', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 03:18:49.916294+00', ''),
	('00000000-0000-0000-0000-000000000000', '23febd0f-3551-47ba-9dae-3817c502856a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 03:18:51.296871+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c155f34-34e6-484e-adc6-1292722a061b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 04:17:20.37763+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0e13f69-75b0-4992-b752-643c273a5e3f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 04:17:20.378667+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b811774-31fc-4cf0-94de-bec2a270e87f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 05:26:16.526737+00', ''),
	('00000000-0000-0000-0000-000000000000', '44462cb0-d329-4561-9243-a56d8bfe9c38', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 05:26:16.528579+00', ''),
	('00000000-0000-0000-0000-000000000000', '310b75a7-9695-4ba4-94d1-dda4b62e4292', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 05:26:36.642077+00', ''),
	('00000000-0000-0000-0000-000000000000', '50d683e0-c714-42ba-9f5e-fb2011c4d2eb', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-17 05:26:36.642767+00', ''),
	('00000000-0000-0000-0000-000000000000', '07eb01ba-34f5-4b0c-b739-3760dda237ae', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-17 05:26:50.075921+00', ''),
	('00000000-0000-0000-0000-000000000000', '88e5a162-f2f3-4563-85d0-4f692a0f31f4', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 04:08:08.64199+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b269d82e-9ef9-4610-9f53-2d0393cebab2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 05:48:21.560962+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4499060-c4c4-4616-92e2-63eceef08188', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 05:48:21.562033+00', ''),
	('00000000-0000-0000-0000-000000000000', '4959d3b7-a8f6-49e5-bdb4-59f20dc75500', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:19:43.062713+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7cfd60f-e4ab-474b-b503-d6a21c260663', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-06-18 14:19:43.06471+00', ''),
	('00000000-0000-0000-0000-000000000000', '3db62e64-0bed-415e-8755-000e51eadd76', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-06-18 14:19:49.308998+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f243ed4b-57d1-4387-b754-5e3dfeeb0ba6', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-06-18 14:19:56.990733+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a21a66f0-0ceb-4dc6-b840-e5193bf07cd7', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-04 08:51:47.775439+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c69f0cc-c455-4a87-8e3f-d57fc7cc85c3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-04 09:50:05.299697+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3e2aae6-c06a-4ed9-a4ac-2c9636f3b32e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-04 09:50:05.300637+00', ''),
	('00000000-0000-0000-0000-000000000000', '27166d1a-35fd-43a5-91e5-ab1adff01e22', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-04 11:29:01.103206+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1c3c9a0-45f8-422a-ab70-2b3c163484fc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-04 12:27:18.490579+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a2661f62-a261-4ff0-9fe6-8e2421dff4bc', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-04 12:27:18.492099+00', ''),
	('00000000-0000-0000-0000-000000000000', '87ad0cd6-ba5f-4cf1-ac42-8f835fa21da2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-04 13:24:49.934248+00', ''),
	('00000000-0000-0000-0000-000000000000', '547bc7c3-b4aa-452a-92c6-23e9c1f4ceb8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-04 13:24:49.93513+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d339ea8-c55c-40e6-8145-69f95bef54f7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 04:58:15.271937+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f4de5fe-b5dd-4dd8-aac8-b5a41559f74a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 04:58:15.272957+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7dd30ab-d7bd-4ca6-b273-c5b9e154cb0b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 04:58:15.915118+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fff0131e-7f5b-4ddd-b360-d3cad9b8e5a3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 04:58:16.349885+00', ''),
	('00000000-0000-0000-0000-000000000000', '999aca29-ff5f-4fd7-a886-1f5192bacd3f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 04:58:16.365002+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8bbe87f-52be-4dd3-9474-f3c529af333d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 04:58:16.44831+00', ''),
	('00000000-0000-0000-0000-000000000000', '0940efd5-8a34-40fe-9a41-c8a88886f3ca', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 09:05:11.594871+00', ''),
	('00000000-0000-0000-0000-000000000000', 'baf0330e-8685-48fd-877a-850ff032faa0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 09:05:11.595834+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ed63d68-1395-4e1b-89e5-506d41f4a868', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 11:04:23.315685+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c2cc25d-a500-4450-a4bb-b87fdd1797c5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-05 11:04:23.316673+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5eb7264-8235-453d-a428-2a90689514b9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-06 09:59:35.930636+00', ''),
	('00000000-0000-0000-0000-000000000000', '139d94ee-71f5-482f-b9d0-79f9fe5a7169', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-06 09:59:35.932951+00', ''),
	('00000000-0000-0000-0000-000000000000', '3838147e-986c-401a-b679-8fdc5504a4f8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-07 14:30:14.326881+00', ''),
	('00000000-0000-0000-0000-000000000000', '31651d58-beae-45e5-9031-0dd4f7363705', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-07 14:30:14.331629+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c805c2a-28ec-403e-8dfc-d487376c5717', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-07 14:30:14.347758+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f923dcf9-61a6-4f06-822c-f98377d5361f', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-07 14:32:25.585728+00', ''),
	('00000000-0000-0000-0000-000000000000', '39e8dd03-5fa4-4497-866b-ef80084d36d6', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-07 14:54:45.889178+00', ''),
	('00000000-0000-0000-0000-000000000000', '4da16b30-6d8b-4b3f-bd96-7d0b951cbabd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 03:18:19.410195+00', ''),
	('00000000-0000-0000-0000-000000000000', '29298b41-8de0-43fe-9634-920626590292', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 03:18:19.412157+00', ''),
	('00000000-0000-0000-0000-000000000000', '87a8dbe6-90fc-4d4c-9b81-835583555ca8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 03:18:19.59206+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d1e2c8e-1ce2-4bde-8ad6-f56aa2e30710', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 05:43:28.244974+00', ''),
	('00000000-0000-0000-0000-000000000000', '224b8869-ee73-4c99-92c3-0fa2ba9b0e54', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 05:43:28.245924+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f4ade96-823d-4376-b869-2bbc20e97206', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 06:41:35.449001+00', ''),
	('00000000-0000-0000-0000-000000000000', '515bda12-24fd-47f9-b09a-6da1d74d6e37', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 06:41:35.450839+00', ''),
	('00000000-0000-0000-0000-000000000000', '0cad5d59-b9c4-46ac-939e-bc53e6b50d66', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-08 07:26:36.552011+00', ''),
	('00000000-0000-0000-0000-000000000000', '566f08e3-3305-4526-acdc-ba2b54449e42', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 09:05:17.830339+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ccf0a089-b594-478c-bb9d-27151a225722', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 09:05:17.83232+00', ''),
	('00000000-0000-0000-0000-000000000000', '9704c47e-2fc4-4b49-bf3c-bc4210fd03db', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 10:03:19.440402+00', ''),
	('00000000-0000-0000-0000-000000000000', '02a9c25f-5033-43a3-8db7-16134e2b31ea', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 10:03:19.441957+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec8dae0e-584a-41e9-8ca6-82021070b883', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 10:09:40.585318+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9243d8b-9e02-4f08-81b6-18fb272e5496', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 10:09:40.587306+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ffd3bf6-a1c9-443a-b5fa-7649f935e9f7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-08 10:09:41.378434+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a738e60c-cbc1-4700-8a93-4cc080171f7a', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-08 10:13:15.340307+00', ''),
	('00000000-0000-0000-0000-000000000000', '2282bacb-d782-40da-9919-b4f4018c908e', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 07:16:24.285671+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be5c20c3-9f54-4f41-9f2e-1b1a94d4a5aa', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 09:26:14.779469+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e655ebc2-718c-4ca0-af36-f7faf4bfb660', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 09:26:14.781306+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac7d4dcd-f00d-407c-b199-c39dd04cca80', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 09:58:30.552946+00', ''),
	('00000000-0000-0000-0000-000000000000', '91f218e5-c49e-49b6-b744-82f6944b6188', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 10:56:56.928442+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8c35b5c-e887-4c25-bf7b-7cff40ceef0d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 10:56:56.930177+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ba74237-2e61-4959-81a9-4a2fc3b56086', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 11:40:48.444647+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9b044b5-bf06-4f00-8d74-eaab90fe3b66', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 11:40:48.445654+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e2812c4-09ea-41bc-beee-c595fc9cb0af', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 11:40:48.980773+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d6fe14c-fc45-42cf-ae28-4077537aa45d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 11:55:11.05913+00', ''),
	('00000000-0000-0000-0000-000000000000', '719034b0-25b0-4be7-9d4c-7bb8900e8f33', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 11:55:11.06134+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ebc0b1e-7cd2-4e8a-a2ed-9930904160da', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 11:58:48.024396+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e29c7d8d-e051-4d94-aacf-962e27458416', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 12:38:49.283401+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee6ad647-0bb0-4e6c-aa6c-e831a03891c7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 12:38:49.285042+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a615d88e-24bd-4cde-8cf8-11163bb22488', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 12:53:37.032125+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9d30d16-c5b4-4f49-9e9a-b86016afec41', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 12:53:37.0341+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f8d0b8b-859d-4eda-a2b5-da1d26ff6ee7', '{"action":"logout","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-09 13:16:53.665312+00', ''),
	('00000000-0000-0000-0000-000000000000', '51e4d09f-93b5-4255-80e9-3983a1720d14', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 13:16:59.644352+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8b1cf91-0af2-4e0e-8e22-3a83ac066c34', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 13:17:10.815562+00', ''),
	('00000000-0000-0000-0000-000000000000', '7984fff1-3040-43c7-9fcd-13a75091486e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 14:15:32.21036+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ae1b30a-edb0-4e81-a03d-3303cb0d2611', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 14:15:32.211206+00', ''),
	('00000000-0000-0000-0000-000000000000', '3daf3726-b4e6-4567-a84f-c59d92b74549', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 14:18:54.426026+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b55bc9ba-b44c-4603-8e57-474573de843d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 14:18:54.426982+00', ''),
	('00000000-0000-0000-0000-000000000000', '21925b63-e971-4048-97de-9a79292016c4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 15:13:34.375455+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dca34ca2-4dc8-46ab-badc-b5fd8c3b5c83', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-09 15:13:34.376366+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a590e693-b849-45e7-a3f9-a91b042d72ff', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 01:20:06.809425+00', ''),
	('00000000-0000-0000-0000-000000000000', '76b5121c-f144-4fb7-b4b4-f6c81cd60f24', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 01:20:06.81199+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e790640-ce29-48b1-a4df-5dbe36e7b20b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 03:36:26.464037+00', ''),
	('00000000-0000-0000-0000-000000000000', '81cdb574-cf13-4ae9-b779-d60d3faf0fb0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 03:36:26.465004+00', ''),
	('00000000-0000-0000-0000-000000000000', '69ff29ec-ac8b-4186-b526-396f4d82c0d1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 03:37:26.868016+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4af6a95-6e18-40d4-a5e6-2c4cf67ef98a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 03:37:26.86865+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1286a48-b712-4aad-b78b-1e2fb55c2488', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 04:49:50.122565+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee5d3c9b-f945-4fc5-9dee-93a3a366a045', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 04:49:50.12357+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f922d7f8-3975-445f-833d-e6c111c1881d', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-10 05:33:17.684589+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8a0cc0b-8c32-4d04-b5ef-a739bbc6ccf5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 05:53:41.304588+00', ''),
	('00000000-0000-0000-0000-000000000000', '58b0373b-dd2f-41fa-9837-a1ba8acc9ef9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 05:53:41.305471+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd670121-1e12-4e21-97a3-7675e9e40203', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 06:52:04.335856+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a749143d-47b7-4f59-bdc6-937aa5f478c5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 06:52:04.33665+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c42b37d-9a36-4ecf-84c0-f99e2395fa29', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 07:50:10.547329+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3e33811-006a-45b6-83f4-908e2e18f895', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 07:50:10.548255+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bfbcf5b8-6519-4d44-ac39-c7678176c317', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 08:48:19.199861+00', ''),
	('00000000-0000-0000-0000-000000000000', '56a7326e-47db-4b83-8205-1d400a71a165', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 08:48:19.200873+00', ''),
	('00000000-0000-0000-0000-000000000000', '6cbb364c-d0d1-420e-a30e-7fb1c739a402', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 09:46:35.908003+00', ''),
	('00000000-0000-0000-0000-000000000000', '1786a913-daca-4bbd-be5f-91031f61a47f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 09:46:35.908959+00', ''),
	('00000000-0000-0000-0000-000000000000', '094742e5-9324-4ba6-ac97-61184afd0867', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 11:19:23.298934+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db175f04-666e-47d5-9324-7a20acd679d3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 11:19:23.299829+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eff3cfb4-a354-4021-ba2f-62c18e308315', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:17:35.318528+00', ''),
	('00000000-0000-0000-0000-000000000000', '85d09e8b-f5cb-4103-acf9-9b9da03f8674', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:17:35.319445+00', ''),
	('00000000-0000-0000-0000-000000000000', '4dfe3d03-6356-44c2-a3df-f9a0bcb8b7f8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:22:50.257038+00', ''),
	('00000000-0000-0000-0000-000000000000', '218e54d1-c882-4c19-b8fd-ddafa58937e3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:22:50.257965+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd99af4e4-748e-4aa1-80b3-cf0de8d56db8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:22:50.385179+00', ''),
	('00000000-0000-0000-0000-000000000000', '298830c6-faa5-4509-a02c-46f4c2cdf66b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 13:15:40.73446+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c858387b-40a9-4dc6-ab48-987eabcb6a27', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 13:15:40.735403+00', ''),
	('00000000-0000-0000-0000-000000000000', '36f1af55-96e2-4be5-91ce-52e46e96d7f4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 13:53:29.316573+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b0d9d58-af3c-42a7-8b79-0efa0a062655', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 13:53:29.317476+00', ''),
	('00000000-0000-0000-0000-000000000000', '028c183e-6576-45c2-85b4-194c10c732ac', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 14:14:10.76669+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c8ad917-c21d-429b-88e2-0f772870f776', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 14:14:10.767615+00', ''),
	('00000000-0000-0000-0000-000000000000', '1295d53f-ed88-43b6-a20a-7a332d7b3d5e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 01:32:10.219008+00', ''),
	('00000000-0000-0000-0000-000000000000', '82d11855-8a08-4339-bc33-3e3079169813', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 01:32:10.220622+00', ''),
	('00000000-0000-0000-0000-000000000000', 'effa832a-85ff-4d2f-856a-b5ec90a34397', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 04:27:32.619223+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e7716cf-a3b1-4f45-bb08-f6b3c9972fa7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 04:27:32.620281+00', ''),
	('00000000-0000-0000-0000-000000000000', '89d68466-2e28-4d8d-b016-be39e351c54c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 05:25:42.369003+00', ''),
	('00000000-0000-0000-0000-000000000000', '7420db50-07e9-4206-964e-4495413ee7a1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 05:25:42.370092+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a78cab1-b062-4b2c-9cb9-8ffbeee79ff3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 05:45:12.809921+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b22c7259-0553-4db5-9ca9-5e709c578b02', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 05:45:12.810861+00', ''),
	('00000000-0000-0000-0000-000000000000', '5159d572-d963-4224-aa8b-22e1cba109f6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 06:24:02.733614+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c009ea3-98d0-4666-959e-f3f2bf7dbf07', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 06:24:02.734626+00', ''),
	('00000000-0000-0000-0000-000000000000', '9884c183-414b-44be-a524-7ee92df6f306', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 07:36:12.353096+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df0b2a6c-343b-423b-92ed-d9b336e7d183', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 07:36:12.354078+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1daada1-e17e-41e4-a7b1-e965e1c0b494', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 07:36:12.968433+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c51df98d-e134-4284-808b-a917c76b90bd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 08:34:18.53329+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fbefb8f-b139-42a6-ac29-78fab832e177', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 08:34:18.534344+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5f8c8d7-d6ad-4daf-9e3e-fb1ca7845b0e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 09:32:19.930114+00', ''),
	('00000000-0000-0000-0000-000000000000', '517d8086-2cfa-4dec-9ff8-283a6bae9c8f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 09:32:19.931026+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a5f6c30-0472-4c03-9b87-c15df54af044', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-12 02:08:04.43262+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e3aba0f7-bd47-4057-87cf-8d040b1ba66e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-12 02:08:04.435386+00', ''),
	('00000000-0000-0000-0000-000000000000', '92db99cb-8922-487e-bee3-ac4c31220929', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-12 03:06:05.30213+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b09654e-8544-4448-8a4e-0a8841039294', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-12 03:06:05.303015+00', ''),
	('00000000-0000-0000-0000-000000000000', '42a26856-4dbc-462c-9fb3-11dcc031d9bf', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-12 04:04:28.23618+00', ''),
	('00000000-0000-0000-0000-000000000000', '12714f5c-9975-4ffe-9dc7-00e8d155d026', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-12 04:04:28.237087+00', ''),
	('00000000-0000-0000-0000-000000000000', '44ae52ee-aefb-4941-ad76-7e7099d8c0db', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-13 04:00:51.029557+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d8d1af1-b1de-4679-8148-a690565a6fd8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-13 04:00:51.030616+00', ''),
	('00000000-0000-0000-0000-000000000000', '52a84777-c9c3-4f5b-90ae-df6c6a8dbd6a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-13 05:24:50.906442+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c86426e6-4519-4a45-acad-f687d7408849', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-13 05:24:50.907379+00', ''),
	('00000000-0000-0000-0000-000000000000', '37d76c78-c1bf-4bbf-89c3-e07323abb6d5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 01:43:20.911785+00', ''),
	('00000000-0000-0000-0000-000000000000', '35c1c7e7-cc05-4585-9ecb-e202882a5275', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 01:43:20.912683+00', ''),
	('00000000-0000-0000-0000-000000000000', '10650bcc-f62e-422a-94fb-921e5483b255', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 01:43:21.668352+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ce459a2-1b12-433e-85f5-25b0bb59ceaa', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 03:45:09.128412+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ddf8831a-92af-47f6-aae7-91bf96d4f57d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 03:45:09.129406+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f07c24a-e688-44de-8019-c2660ec947d6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 06:58:34.630351+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5197aaf-44fd-46c1-9e85-727678166766', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 06:58:34.631317+00', ''),
	('00000000-0000-0000-0000-000000000000', '08498fd8-d277-41df-9892-56432593731f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 06:58:34.97094+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7d65277-c151-48e2-8502-1bb85ffee03f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 07:04:19.816134+00', ''),
	('00000000-0000-0000-0000-000000000000', '92384017-d419-445d-bc4b-5a9fb7dc04ea', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 07:04:19.817686+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b064365-9dc3-42df-b3ad-532b7fd51117', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 08:36:53.551338+00', ''),
	('00000000-0000-0000-0000-000000000000', '00a8e24d-af26-411e-ab57-69e66f3c8d3f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 08:36:53.552212+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b63cee0-d984-4a80-93a5-460c28eb43d9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 08:39:39.027172+00', ''),
	('00000000-0000-0000-0000-000000000000', '89b21b3d-1b26-47bf-a2b9-e6845fe7f2cb', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 08:39:39.028226+00', ''),
	('00000000-0000-0000-0000-000000000000', '5309c135-3c75-45a7-b996-6704ef41089d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 11:45:50.902413+00', ''),
	('00000000-0000-0000-0000-000000000000', '6590ac75-5745-4bc1-8189-17e366c27904', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 11:45:50.903269+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b165134e-6c63-47d3-afb6-880b471369f0', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 05:28:04.272279+00', ''),
	('00000000-0000-0000-0000-000000000000', '72c6001a-44dc-409f-81a2-7b50e6ce74cd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:12:19.325109+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bee36a4f-51e3-46d6-8556-0093c4b11e7a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:12:19.326093+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a583faf9-d133-4ab6-9d66-21e69c963ef4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:55:25.066691+00', ''),
	('00000000-0000-0000-0000-000000000000', '842c30e9-a614-44c3-bf8e-4136f99436b4', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:55:25.06782+00', ''),
	('00000000-0000-0000-0000-000000000000', '6476c3ad-9b65-47d7-b248-6d22813a57a3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:55:25.966424+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0ebad3a-1ac0-4866-887a-316e316f574a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 11:47:41.420921+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efa972fc-160b-4d14-aede-3853dc067ce7', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 11:47:41.421976+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f5831d7-4e9c-43d1-b0ec-8437bc49e2f8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 07:35:43.833921+00', ''),
	('00000000-0000-0000-0000-000000000000', '09a3ee52-742c-4b46-a75f-6762ab3929e9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 07:35:43.834919+00', ''),
	('00000000-0000-0000-0000-000000000000', '62bea8d4-532f-417f-8837-e1f66a5e32bb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 09:48:45.590694+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9cbf6cf-c1e9-40f1-8a88-ac4f3a770413', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 09:48:45.591589+00', ''),
	('00000000-0000-0000-0000-000000000000', '65a91f63-c070-4e09-98be-0f6d772cf688', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 09:49:16.853099+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b724820-e744-441a-bb36-b05ded714e1b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 09:49:16.853742+00', ''),
	('00000000-0000-0000-0000-000000000000', '616f6c0a-a452-4a1c-97f9-97d7e5733338', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 13:05:17.809291+00', ''),
	('00000000-0000-0000-0000-000000000000', 'caa764ea-f253-4634-a6ae-3196c7267cef', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-16 13:05:17.811627+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e03bb255-a775-4fa6-8356-beeae36bf9f7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 03:43:52.197261+00', ''),
	('00000000-0000-0000-0000-000000000000', '862c485e-71e5-4cc6-99ec-2900ba88eb3f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 03:43:52.19816+00', ''),
	('00000000-0000-0000-0000-000000000000', '2dc752ef-eeea-4b73-a1e1-f05933834186', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-17 11:06:29.271546+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa0cfd37-def3-431a-bd12-2602e4f681f0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 11:42:08.29975+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2098e33-e6f6-41aa-aef0-705168f3ebda', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 11:42:08.300644+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d4f3116-1e24-4c25-998c-3d23ecd6d5e8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:21:48.146669+00', ''),
	('00000000-0000-0000-0000-000000000000', '05aabb09-d979-4d99-a7a9-5eaf9383c76e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:21:48.147649+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd3e62d0-ff83-41f0-bc1a-ea67821941c8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:28:50.83633+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aafd4684-9860-4f34-8993-aaabc94c1a2d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:28:50.837252+00', ''),
	('00000000-0000-0000-0000-000000000000', '6aae0a43-267b-4715-a435-cd1ae82be6e5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:28:51.704645+00', ''),
	('00000000-0000-0000-0000-000000000000', '986f8489-dbbd-4422-ad48-b0df6cae2715', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:39:47.355045+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b1e99dc-dd8b-45c5-b696-cf0c529eb114', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:39:47.356093+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c7aa839-7a68-4aa0-88a6-5ede251e3d53', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-17 15:39:47.397631+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f805ece-51c9-4818-b49b-67c401229654', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 05:49:16.222094+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db385e66-93ea-4ed4-aea5-ee91df372c31', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 05:49:16.2229+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d31fe75-3dd9-4a4f-ab73-8f3a38922c44', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 05:49:17.321033+00', ''),
	('00000000-0000-0000-0000-000000000000', '2fbd8a2d-643f-4ae0-82cb-feb42de343b2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 05:49:17.439716+00', ''),
	('00000000-0000-0000-0000-000000000000', '163e3cb9-b5c9-428d-a080-bcf9b539b17a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 05:49:17.496715+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e6ea4a7-8628-485a-909f-7059f4909e83', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 06:46:03.931954+00', ''),
	('00000000-0000-0000-0000-000000000000', '71b9d333-5814-40e5-80e1-c6a86b5ca6bb', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 06:46:03.932816+00', ''),
	('00000000-0000-0000-0000-000000000000', '2311cc91-ed6a-457f-be25-bff5f5f88660', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 06:46:04.83468+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b33f2a45-9fc6-4dd2-a0e3-aaf852417767', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 06:52:19.557341+00', ''),
	('00000000-0000-0000-0000-000000000000', '355707ca-8e95-4501-b9c9-390d42793c2d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 06:52:19.558397+00', ''),
	('00000000-0000-0000-0000-000000000000', '52def375-b0db-42f7-a1a5-c59824249678', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 06:52:20.397433+00', ''),
	('00000000-0000-0000-0000-000000000000', '407ce17c-bb35-432c-aac6-9cec6ace5a70', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 08:26:41.677847+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4585afd-175c-46bc-b366-e77bc4c8c173', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 08:26:41.678864+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa49c1ef-3ced-4a0e-8c48-7b02b63bb432', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 08:33:29.1477+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2f5efcb-dcee-4712-a1ef-2292ede39845', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 08:33:29.148617+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f99702a4-ea2e-4527-9ab8-9df09b30796d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 09:33:53.819541+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f86fc3e-f317-4280-8146-df93310da76b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 09:33:53.820656+00', ''),
	('00000000-0000-0000-0000-000000000000', '22fe2f5e-29d9-4f6a-b23f-076062fa9bba', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 09:50:35.880554+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd1d7ff2-b961-4344-a1f2-426484333135', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 09:50:35.881614+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b77250d-ecfa-42b7-bc9e-4a15ca9f6f86', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 12:26:04.329506+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ac3a88a-a194-47c0-8525-d4a6f3c70e81', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 12:26:04.330421+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a22803b9-9127-440b-b1e6-12743c5f2adc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 12:26:05.120459+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4a3d91f-da8b-4e68-852f-66d2b7559d78', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.306368+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a1f8e74-e476-4bd8-aafa-b448d42a0d7d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.310002+00', ''),
	('00000000-0000-0000-0000-000000000000', '95559429-ba50-4f99-b460-ea4bdecbf0a1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.325525+00', ''),
	('00000000-0000-0000-0000-000000000000', '892fd184-b9f0-491e-ba37-656dedca9124', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.360633+00', ''),
	('00000000-0000-0000-0000-000000000000', '219f22d1-3fb1-4ae0-b75d-177fadd38b8d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.769417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f48a43fc-8a73-4e73-9a5d-2dcb26c61965', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.860863+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4920748-d618-4ab5-9fe9-805bcf44bbec', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-18 17:35:21.946646+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ed005b2-6344-4823-a3ca-403f981beefd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 03:09:26.335718+00', ''),
	('00000000-0000-0000-0000-000000000000', '1697098e-0d3f-46a8-bf62-6f98bcab2fe0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 03:09:26.336737+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d1f9741-a058-4133-9f68-2787e727c850', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 03:09:26.576558+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a88a11a7-89d1-4472-a062-7c415c3a815b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 03:09:26.985325+00', ''),
	('00000000-0000-0000-0000-000000000000', '82f5b8cb-192e-4f94-82ca-37b072e82a4c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 17:40:43.737758+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec2f61c4-f911-400f-b1a1-f970e4f0a03b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 17:40:43.738677+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfae74c0-441a-42e8-ab7b-6be17182cf26', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 17:40:44.583702+00', ''),
	('00000000-0000-0000-0000-000000000000', '2783ba29-fe0c-4b29-8612-fdbda3d1e866', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 18:43:57.712144+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c54ec3f-6e77-4791-a491-9aa165d41574', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-19 18:43:57.713281+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ff8c787-cf24-462d-b5ef-415afa0ff9a8', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 07:03:12.745655+00', ''),
	('00000000-0000-0000-0000-000000000000', '0335dd53-2369-4735-89fd-d77c271580f8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 07:35:35.744903+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f17bd734-0825-415b-ad9c-906af803414e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 07:35:35.745851+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b6cd8d7-e006-4a42-aef0-e61b49ec6086', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 07:35:36.63258+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db352406-3fde-4861-9f65-34a0dd4cd105', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 08:02:02.143066+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a3de9e0-f6d7-4849-8a70-db1e6d6026bf', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 08:02:02.143952+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d96f357-49d7-436f-83cc-9169192b1aee', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 09:18:33.636691+00', ''),
	('00000000-0000-0000-0000-000000000000', '05775a93-a73f-49a5-b493-9a3bd049e3c6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 09:18:33.637556+00', ''),
	('00000000-0000-0000-0000-000000000000', '0040f8ea-0929-45a5-9e0a-eac9139ad59d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 10:17:15.33585+00', ''),
	('00000000-0000-0000-0000-000000000000', '087966d9-4150-4503-be81-1f5fe2694cb4', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 10:17:15.336752+00', ''),
	('00000000-0000-0000-0000-000000000000', '061dfe9e-bb41-4533-a9d9-76fb3fba7411', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 11:15:32.78999+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ded108c8-db6e-446d-a8b3-613a0a2da98e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 11:15:32.791035+00', ''),
	('00000000-0000-0000-0000-000000000000', '87a02aba-2c47-4f9d-9c45-a179c64b4093', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 12:53:31.418281+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dbf989ec-34d2-4a89-a688-b7d07188c98c', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 12:53:31.419166+00', ''),
	('00000000-0000-0000-0000-000000000000', '657ae9ab-602c-48fb-81b9-475b805e32e7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 13:52:57.658305+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb6d7ab1-7c69-48ca-adb7-f2fd3c797d77', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 13:52:57.659997+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b49a0db-dce6-4ff1-99fb-4319418a4d35', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 14:51:10.244221+00', ''),
	('00000000-0000-0000-0000-000000000000', 'afb307e4-08f3-4a7d-bf53-b65224c84bca', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 14:51:10.245352+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af2acbb0-f325-4a2c-84a0-8b5976930a95', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 15:49:29.851201+00', ''),
	('00000000-0000-0000-0000-000000000000', '05b88a45-6b5f-468b-b1fc-a3f1dc15456e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 15:49:29.852188+00', ''),
	('00000000-0000-0000-0000-000000000000', '6efc2202-3aad-45dc-a942-74e9629173df', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 16:08:54.375475+00', ''),
	('00000000-0000-0000-0000-000000000000', '84953f9a-a878-4a15-ad60-b73560752413', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 16:08:54.37649+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b30697e5-4002-459c-9891-e5585e17f193', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 16:08:55.953638+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0105b20-3163-4d15-9e61-1e3035bf8596', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 01:18:38.557889+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2e068f9-969d-4081-b581-bb0b7adf4bea', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 01:18:38.559138+00', ''),
	('00000000-0000-0000-0000-000000000000', '11db06bf-329c-4019-bf0d-25fa2a63ea74', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-21 02:25:20.034075+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f663d8a7-a5ea-449e-b3ca-87ebecec0ac2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:30:21.6084+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb1804be-348f-4ee9-ac44-9c8c346418b6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:30:21.609365+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd6c31d3-51ea-4ce8-a9e9-a8473ad07ea0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:30:22.300974+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d1004bc-df08-4424-945d-62ba227514e1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:43:25.228455+00', ''),
	('00000000-0000-0000-0000-000000000000', '44c182a6-2a4e-4404-b17f-40c7ed9f32d8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:43:25.229413+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d1c645b-321d-443c-9dfa-046c8f96257f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 06:38:07.514884+00', ''),
	('00000000-0000-0000-0000-000000000000', '17d1c2fa-44e5-406b-9f06-a575ce97803d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 06:38:07.515925+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f84744ea-2297-4b97-a556-bbd968c4bf26', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 06:58:55.049987+00', ''),
	('00000000-0000-0000-0000-000000000000', '08b3dea7-cb89-4cd1-9a41-45fda2e0c4c4', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 06:58:55.050981+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1471d78-76fc-4d53-9e8d-dd0eeedc8c46', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 06:58:57.658994+00', ''),
	('00000000-0000-0000-0000-000000000000', '1cbafd17-da3d-440d-a0ef-798e62e422d5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 06:58:57.659612+00', ''),
	('00000000-0000-0000-0000-000000000000', '05cd9e8a-2f08-4125-b1bc-d46ca3c13198', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 07:36:33.932841+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd46afa80-c808-4820-a0ac-b7d85e35ce71', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 07:36:33.933833+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5f75978-f090-42b8-a9f0-d26d4e128e9d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 08:56:30.185227+00', ''),
	('00000000-0000-0000-0000-000000000000', '860ea8c9-f5b3-45b1-ace4-1da26713bd41', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 08:56:30.186467+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eab89622-5bb5-4de3-8987-3a3642e89252', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 09:54:48.20734+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a0ecfcf7-5f4e-4f94-a29d-40592a249621', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 09:54:48.208238+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ee8d225-f983-43e1-b170-ce8137dcd0af', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 11:04:53.198395+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1721ae6-5a75-4081-91b2-d6d1d2c6d855', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 11:04:53.199315+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e57c6bf-f6f6-492b-be3c-e4ebd46cc0a8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 12:03:32.650483+00', ''),
	('00000000-0000-0000-0000-000000000000', '563fe184-45ae-4641-a5e9-dc58cf40d0ef', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 12:03:32.651445+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3f1e882-d168-4923-9a64-625596727da7', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 14:54:13.775035+00', ''),
	('00000000-0000-0000-0000-000000000000', '2a4998c0-08ee-4b69-b8b1-f634cf43bde9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 14:54:13.776028+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6fa78d6-d55b-46dd-a9d6-2f6ee86b3cb4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 00:34:53.537382+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b22740c0-1ca6-4876-8887-5c5d3a5c6600', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 00:34:53.538449+00', ''),
	('00000000-0000-0000-0000-000000000000', '5edb5df0-f8a3-4eb0-bd4f-ea5e2c3af8ea', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 01:33:25.30275+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3d386f7-f445-43ea-9824-ee728e7a6ce0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 01:33:25.303682+00', ''),
	('00000000-0000-0000-0000-000000000000', '8cdb9c8e-9f0e-42ef-8d3c-a0a25f1b0872', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 02:31:47.591961+00', ''),
	('00000000-0000-0000-0000-000000000000', '32fcbf82-4927-467d-a775-42463218383e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 02:31:47.59297+00', ''),
	('00000000-0000-0000-0000-000000000000', '31948eb0-f3e2-4bfe-b48d-556f1715a4a2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 04:05:16.227117+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8a826f9-854e-4360-9c3b-e27cd58b6644', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 04:05:16.228219+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e8c08e1-eb3f-436c-aa41-c212d5bbb2a2', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 04:07:51.354997+00', ''),
	('00000000-0000-0000-0000-000000000000', '083153a2-c986-4b5c-b4cd-d01996ad17d1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 04:07:51.35594+00', ''),
	('00000000-0000-0000-0000-000000000000', '5fafc7a9-f612-4bcb-b36c-f3bc8f0e230b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 04:07:52.057202+00', ''),
	('00000000-0000-0000-0000-000000000000', '2afebfaa-f21f-4c5d-b90c-4f8df9a947d6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 05:26:20.723207+00', ''),
	('00000000-0000-0000-0000-000000000000', '2fa9ce57-8084-4722-a283-c9b6b162fe32', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 05:26:20.724166+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4508ead-cf08-4ab6-8efb-b164b738266e', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-22 05:40:58.818745+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c38a77d5-251e-4dd9-b584-dce7633e4cf9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 06:24:45.207271+00', ''),
	('00000000-0000-0000-0000-000000000000', '59783bb2-fceb-41c7-b356-a7291a164209', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 06:24:45.208639+00', ''),
	('00000000-0000-0000-0000-000000000000', '386d6917-1f08-4eeb-be2e-e9b6e4232c30', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 06:41:37.553577+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b85c026-1b31-4fd4-94d1-cbc57a79765d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 06:41:37.554501+00', ''),
	('00000000-0000-0000-0000-000000000000', '601801a3-846b-46fe-9f65-990280779661', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 07:22:50.698742+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b9ab3d1-1f8d-4a91-8775-2e0020754315', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 07:22:50.699771+00', ''),
	('00000000-0000-0000-0000-000000000000', '62a85fe2-9493-49ea-8cc1-b19ba78bfb11', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 07:40:10.067016+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbf568ba-40c8-468d-a196-716f9a4f62da', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 07:40:10.068045+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a5e2cd3-deb9-46db-b601-ba45d02e861d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 08:21:21.028224+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f35db07-b375-4d69-9e00-cfb9353ac0fc', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 08:21:21.030402+00', ''),
	('00000000-0000-0000-0000-000000000000', '0448383d-fc53-486b-8aa9-0f8e7ccc1b58', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 08:38:36.801795+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e45999b3-298b-405b-add3-20bcb5cf3f40', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 08:38:36.803728+00', ''),
	('00000000-0000-0000-0000-000000000000', '10bcdcb8-c968-4acf-9927-7956af4d9ab1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 09:31:37.180107+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbd6ce7a-eb73-4e48-b9c6-f8c64d794560', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 09:31:37.181809+00', ''),
	('00000000-0000-0000-0000-000000000000', '4da3080c-4f70-452b-8fe4-4ac66d190a2a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 09:38:56.202548+00', ''),
	('00000000-0000-0000-0000-000000000000', '21d69186-e2c7-4577-84d2-896715cde0a4', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 09:38:56.20352+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc07728d-0d9f-40d1-ba8d-4c46278db748', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 10:29:57.571261+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf57ebab-af89-4d9d-a84a-be40325450b1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 10:29:57.572203+00', ''),
	('00000000-0000-0000-0000-000000000000', '67ddb710-d89f-44a6-a044-7f08e1504870', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 10:36:59.734704+00', ''),
	('00000000-0000-0000-0000-000000000000', '7520b950-3ec1-473d-ac41-49616508a7e2', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 10:36:59.736466+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf108c97-87fd-4040-a276-a98d22874793', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 12:29:22.8861+00', ''),
	('00000000-0000-0000-0000-000000000000', '52095ce2-4ab5-4d49-8495-cc6fd51184aa', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 12:29:22.886957+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c83fa5d-099b-48ac-80f7-3c1f8760db77', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 12:29:23.000464+00', ''),
	('00000000-0000-0000-0000-000000000000', '360f49a8-a8c6-424b-8791-8053a7e80a57', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 12:29:23.001095+00', ''),
	('00000000-0000-0000-0000-000000000000', '997b94aa-ca95-4014-a341-f5b1739063ee', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 13:28:14.931559+00', ''),
	('00000000-0000-0000-0000-000000000000', '79b32a64-dd34-4ae8-bb42-af825294ac5c', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 13:28:14.93252+00', ''),
	('00000000-0000-0000-0000-000000000000', '13584116-3af3-4e0c-8107-20820b453467', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 13:28:15.13664+00', ''),
	('00000000-0000-0000-0000-000000000000', '1766de19-0daf-4d88-8985-771a0c0baf3b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 13:28:15.137322+00', ''),
	('00000000-0000-0000-0000-000000000000', '469a7669-5da6-4e46-9509-de971c4b5256', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 14:00:57.318332+00', ''),
	('00000000-0000-0000-0000-000000000000', '98a70cd8-9db2-4dfe-b9c4-b727589636ba', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 14:00:57.319201+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd704c312-7398-4464-bd7d-a1a456ea7afd', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 14:37:37.3896+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c4555cc-7f53-492f-aacb-0d72676792bc', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 14:37:37.390571+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3c88c97-6412-475c-8e66-e8520ee5720a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 15:36:03.796133+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cf5369a-9eff-4e7f-b6b9-1dadce87aa9e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 15:36:03.797076+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed0906c9-40ba-4021-adf8-bb2fe537d07b', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 16:29:57.630797+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b955b81b-0dc6-4796-b980-3d15dd3c0888', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 16:29:57.631826+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b2eeff0-91f3-45b2-be8a-9ec3818354cf', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 16:34:35.747516+00', ''),
	('00000000-0000-0000-0000-000000000000', '5baea01f-7c83-461f-a6f5-d6df40fad941', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 16:34:35.748468+00', ''),
	('00000000-0000-0000-0000-000000000000', '2260a2f4-4f49-4e57-bcbf-2eb0c89057a9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 02:13:59.787977+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9797cec-cfee-429e-9b19-c783443aeef1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 02:13:59.789001+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c383e5f-30a3-4411-b5bc-9f4606ef814e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 02:14:00.263133+00', ''),
	('00000000-0000-0000-0000-000000000000', '533e2c5b-46b4-4883-bc6e-214383dfb621', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 03:12:06.700301+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf963b0f-9bf2-495a-957f-8251148d5739', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 03:12:06.713867+00', ''),
	('00000000-0000-0000-0000-000000000000', '312d9029-ad3c-455e-aa01-3da017221892', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 04:10:33.333651+00', ''),
	('00000000-0000-0000-0000-000000000000', 'daa2d04e-4b49-4ad3-a390-308f7f87045f', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 04:10:33.334633+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b04d149-a189-4dc8-ade1-11893f0cc6b5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 05:39:46.250417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f141a9d8-ba16-455a-bed4-4850b2ee6df2', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 05:39:46.251287+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb5fd942-eeec-4ece-a2d8-be4cd65de568', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:12:50.218947+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e44bacb-9c61-4863-a8bf-fc59bb657987', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:12:50.221287+00', ''),
	('00000000-0000-0000-0000-000000000000', '27f46733-0ef8-48e5-9231-da76e5c76a38', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:12:51.105509+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3a44d4c-a5fe-4dca-b958-06462dd3828d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:20:21.795759+00', ''),
	('00000000-0000-0000-0000-000000000000', '371dd9bd-6284-46b2-848f-f355f03131e8', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:20:21.796753+00', ''),
	('00000000-0000-0000-0000-000000000000', '8328c79c-df33-4590-81cf-d75fc2001bc0', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:37:51.45878+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b58ee855-875f-4ed7-b3fe-83cced132810', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:37:51.460559+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f835df9d-fd91-4043-8348-f87349bfa08d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 07:13:41.306303+00', ''),
	('00000000-0000-0000-0000-000000000000', '62426e78-a69e-440f-82e1-3113e3f41bed', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 07:13:41.307176+00', ''),
	('00000000-0000-0000-0000-000000000000', '052f813c-bc14-433c-bda4-47b270696a8a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 07:35:59.868448+00', ''),
	('00000000-0000-0000-0000-000000000000', '00a71c2a-e46f-47f8-a506-c19910a52b51', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 07:35:59.869393+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df7b4b5c-e2fb-4cb1-b464-3fd115b3307c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 08:19:27.721658+00', ''),
	('00000000-0000-0000-0000-000000000000', '05d9402d-ba39-45e9-9913-322149f26f8b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 08:19:27.72276+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f76e5062-a851-4002-a439-a0688347447a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 08:34:49.753094+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bfe0373e-d3f3-480e-a2c2-082324a263f9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 08:34:49.753928+00', ''),
	('00000000-0000-0000-0000-000000000000', '19bed11e-185a-481c-b597-8f4642fb4d92', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 11:03:19.173462+00', ''),
	('00000000-0000-0000-0000-000000000000', '413446aa-5314-4c5e-9d54-5a238a7fe26a', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 11:03:19.174368+00', ''),
	('00000000-0000-0000-0000-000000000000', '44f3b897-d2f5-44b7-8ac6-83c813663103', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 11:14:29.835832+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd893f56-db83-4f70-a771-119ec25444ee', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 11:14:29.836878+00', ''),
	('00000000-0000-0000-0000-000000000000', '29d61d5f-6c58-4922-8553-01616d9581c8', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 11:14:30.546454+00', ''),
	('00000000-0000-0000-0000-000000000000', '1056670a-ba02-43ff-b9fe-9ac27694b9f3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 12:01:42.191468+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa549c85-b7af-4a72-8cff-bf8cf3f2e490', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 12:01:42.192715+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe697e24-4755-469e-b314-cdfd2bab82ef', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 13:08:21.356377+00', ''),
	('00000000-0000-0000-0000-000000000000', '36df0deb-539c-430f-99ab-27f2318ae077', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 13:08:21.357309+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbcfd964-031e-4fac-8e12-084f4d700d7d', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 13:08:36.241036+00', ''),
	('00000000-0000-0000-0000-000000000000', '38fdf339-954c-4c12-be24-f71e79fb9503', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 13:08:36.241662+00', ''),
	('00000000-0000-0000-0000-000000000000', '42aa77a8-e5e1-414a-8eff-2454b90babfc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 14:08:14.608102+00', ''),
	('00000000-0000-0000-0000-000000000000', '15fddaf0-2c5c-402a-b756-a20e87993c11', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 14:08:14.609017+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aab0bd4d-3dea-42b6-b10e-da8694af13c3', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 14:08:14.720512+00', ''),
	('00000000-0000-0000-0000-000000000000', '90dae825-44e8-4e28-bc0f-cd8964a3daee', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 14:08:14.721136+00', ''),
	('00000000-0000-0000-0000-000000000000', '03d6a519-f104-459f-974b-041e765484dc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 14:08:14.992561+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9025a04-f0fb-4242-88d8-cb7fad23fb13', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 15:39:25.541287+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad803878-fa0e-43d2-baf1-319c494c679b', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 15:39:25.542247+00', ''),
	('00000000-0000-0000-0000-000000000000', '88ed878a-25e9-48e5-8d45-ab819e23df01', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 15:44:59.846074+00', ''),
	('00000000-0000-0000-0000-000000000000', '305b7896-75e1-405f-937f-872c5ff3af31', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 15:44:59.847029+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5869354-dee5-477b-a6ee-247c903426a6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 15:45:00.077748+00', ''),
	('00000000-0000-0000-0000-000000000000', '7aca0c57-2f2a-4012-8825-6535a5b78c40', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 16:49:00.41589+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2065765-2874-4b6f-b2ac-22dfe8686d08', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 16:49:00.419748+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d4d12e2-0c12-4b0a-abc1-aba78563e5cc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 02:26:18.271062+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd86af777-a54c-4796-a424-a4cc163bf0b6', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 02:26:18.272006+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdbd447b-b50c-4e63-a703-d0a265f88621', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 02:26:19.082823+00', ''),
	('00000000-0000-0000-0000-000000000000', '08bb7d1e-78d0-470e-8fbb-4dc24a1838d9', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 03:36:48.962913+00', ''),
	('00000000-0000-0000-0000-000000000000', '6de3c16c-ac1c-472d-a995-5d9b0ed65fb9', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 03:36:48.963872+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e16ea2a-3f55-4004-8e4a-c8598e8d7d30', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 03:36:50.529253+00', ''),
	('00000000-0000-0000-0000-000000000000', '32e2aaf8-c275-451b-8edd-265b1a7d7f13', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 04:44:04.720074+00', ''),
	('00000000-0000-0000-0000-000000000000', '28199a3d-bce0-44fc-aa02-8868daaffdf3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 04:44:04.721819+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fdd1e01-a73d-4fe9-8721-973c2d5fcb5c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 04:44:05.290593+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a8a9cad-f6b7-4634-b8d3-636a7acfe0f0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-24 04:44:05.291237+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a72b1f47-44c8-46c2-a1c5-e16b6bdf5157', '{"action":"user_confirmation_requested","actor_id":"1e6533cc-3f75-495c-a06a-19cc84551174","actor_username":"alainchampenois@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-24 20:26:19.271033+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b08b5e9a-3dbb-4b85-adc7-b551ffe029d7', '{"action":"user_confirmation_requested","actor_id":"89adb1df-ac89-46d3-ab9f-03b383933fb9","actor_username":"alain.champenois@quobly.io","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-24 20:27:09.714991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7487401-0cc9-4f5a-a975-edbda516245a', '{"action":"user_confirmation_requested","actor_id":"89adb1df-ac89-46d3-ab9f-03b383933fb9","actor_username":"alain.champenois@quobly.io","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-24 20:27:39.894801+00', ''),
	('00000000-0000-0000-0000-000000000000', '59272705-b82a-4274-943d-568092ccca83', '{"action":"user_confirmation_requested","actor_id":"89adb1df-ac89-46d3-ab9f-03b383933fb9","actor_username":"alain.champenois@quobly.io","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-24 20:28:15.103838+00', ''),
	('00000000-0000-0000-0000-000000000000', '22014b90-f265-4306-875a-9ebcf11f323f', '{"action":"user_confirmation_requested","actor_id":"9ebb1923-c51c-4c54-9a5c-b416a86e4bde","actor_username":"doug@global-qi.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-24 21:42:09.392426+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d9e0f9f-2b96-489f-b483-ac54ff114a44', '{"action":"user_signedup","actor_id":"9ebb1923-c51c-4c54-9a5c-b416a86e4bde","actor_username":"doug@global-qi.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-07-24 21:42:37.103857+00', ''),
	('00000000-0000-0000-0000-000000000000', '5aeccbd8-4cd8-4b6a-a14f-e6ec83bd1a10', '{"action":"login","actor_id":"9ebb1923-c51c-4c54-9a5c-b416a86e4bde","actor_username":"doug@global-qi.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-24 21:43:10.730789+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed82ae78-f158-4853-938c-6f58202140f8', '{"action":"user_confirmation_requested","actor_id":"89adb1df-ac89-46d3-ab9f-03b383933fb9","actor_username":"alain.champenois@quobly.io","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-25 06:18:54.501747+00', ''),
	('00000000-0000-0000-0000-000000000000', '978d3a26-96d7-423c-ab51-0d3aeb4a879c', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-27 16:44:35.390312+00', ''),
	('00000000-0000-0000-0000-000000000000', '9f0c65a8-9aa4-48a6-b3bb-11989ab570ad', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-27 16:44:35.393828+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b36ece8-5376-4615-bf1d-9d62b5447e19', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-27 16:44:36.128279+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef915de8-5fb1-4de6-b473-382023bf5dd6', '{"action":"login","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-28 09:18:53.184317+00', ''),
	('00000000-0000-0000-0000-000000000000', '66a7558f-6b85-4e73-9ecd-645bf10027cf', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 11:00:32.893808+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c757ef0-e74e-448f-89e7-1cdd2239be64', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 11:00:32.894775+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea638399-a21a-4e92-9ba0-6545cbe31e2e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 11:41:53.363711+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a122d20f-aca7-4229-8e06-3e1d54c5f5cc', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 11:41:53.364647+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5260308-7812-46c1-80a6-c7826945da1e', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 11:41:54.7136+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d83aa70-7b0a-4bd3-8949-a83575690bec', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 14:15:02.992043+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a3b7c68-790a-43a8-86f1-3ddb34e3c089', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 14:15:02.993159+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d04cef7-8279-442d-ac5b-6fa88b6760c1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 14:34:17.843157+00', ''),
	('00000000-0000-0000-0000-000000000000', '440fc0bc-0130-45e6-9b16-6fe08c362532', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 14:34:17.843993+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7ab16f5-1417-431e-ba58-94b9b7889a91', '{"action":"user_confirmation_requested","actor_id":"fac3dfd3-d445-4200-8069-8b96293d81eb","actor_username":"sophy.shin.q@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-28 16:21:05.544227+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd715ca24-a6ce-44ab-ae1f-f64ab8d3e593', '{"action":"user_signedup","actor_id":"fac3dfd3-d445-4200-8069-8b96293d81eb","actor_username":"sophy.shin.q@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-07-28 16:21:43.927517+00', ''),
	('00000000-0000-0000-0000-000000000000', '86ec335a-dda7-46fd-9951-f3b2dc279f0e', '{"action":"login","actor_id":"fac3dfd3-d445-4200-8069-8b96293d81eb","actor_username":"sophy.shin.q@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-28 16:22:05.413831+00', ''),
	('00000000-0000-0000-0000-000000000000', '223919f5-05ae-4733-b587-54150fa7143f', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 17:10:59.34581+00', ''),
	('00000000-0000-0000-0000-000000000000', '664bbe24-f74d-41b9-acd5-9896b2099c0d', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-28 17:10:59.346735+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ba2f36d-dd16-412b-8e19-4f91b9757c90', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 05:52:46.568821+00', ''),
	('00000000-0000-0000-0000-000000000000', '15e8f012-27a6-4051-ade5-a41f51315922', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 05:52:46.569797+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f855c49a-a0c3-4ba5-96d5-bb5b7ac754e5', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 05:52:47.191116+00', ''),
	('00000000-0000-0000-0000-000000000000', '594f1d75-b34c-4939-bfff-29ac0a9f4be1', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 05:53:46.163569+00', ''),
	('00000000-0000-0000-0000-000000000000', '898ecdd6-a4bb-44fc-a851-c4fdcbccd0a3', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 05:53:46.164983+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffbc4585-3d06-410a-8792-888c9fa423f4', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 05:53:47.05312+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ced994a-05c4-4984-b2f6-e95af97642c6', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 08:52:13.529278+00', ''),
	('00000000-0000-0000-0000-000000000000', '19445bd0-5fb2-4df2-9ea5-5b37e55272c1', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 08:52:13.530993+00', ''),
	('00000000-0000-0000-0000-000000000000', '913ca7ea-28c4-4073-a92c-232c811b3adc', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 09:08:56.156752+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cf1788b-4128-4b00-b0a6-c81fba694b6e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 09:08:56.157734+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe99c213-7663-40d1-841d-59326e09913a', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 12:25:12.453139+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb9835ff-a7e7-4c87-909b-88c399a840b0', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 12:25:12.453996+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b714cf8a-f8ce-42ce-95cf-bb6e439e2f10', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 12:25:13.60943+00', ''),
	('00000000-0000-0000-0000-000000000000', '021fbb61-9c3f-42bb-834a-f195b12fb888', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 12:58:24.027646+00', ''),
	('00000000-0000-0000-0000-000000000000', '330b5f75-5b90-4c3f-8cad-7a1975760243', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 12:58:24.02872+00', ''),
	('00000000-0000-0000-0000-000000000000', '566f3b5b-43c8-49ff-8047-4372158a28fb', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 12:58:24.705952+00', ''),
	('00000000-0000-0000-0000-000000000000', '58f4c963-2632-414d-b052-a9a82ff3f381', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 16:31:32.477764+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d4b4c43-f64e-475b-800f-8154a9144c3e', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-29 16:31:32.478666+00', ''),
	('00000000-0000-0000-0000-000000000000', '31b1c2bd-66ac-4ab8-8a3c-25966409f237', '{"action":"user_confirmation_requested","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-30 00:02:23.588115+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd74dd207-a47b-45ff-b16c-36dbb8f89f7b', '{"action":"user_signedup","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-07-30 00:02:41.590903+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b776082-22c1-4004-b5c1-a9509cdffe4f', '{"action":"login","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-07-30 00:02:43.827076+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2b73bc1-6814-4302-8ac7-c84e8143037c', '{"action":"user_confirmation_requested","actor_id":"5467024d-3060-46b4-8437-60864306903b","actor_username":"peter@haymanphysics.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-30 03:55:07.236292+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc393223-c7b2-4a35-8281-8caa2a5736aa', '{"action":"user_signedup","actor_id":"5467024d-3060-46b4-8437-60864306903b","actor_username":"peter@haymanphysics.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-07-30 03:55:20.604457+00', ''),
	('00000000-0000-0000-0000-000000000000', '17a2f941-4c5c-416b-affc-c917f4f99697', '{"action":"login","actor_id":"5467024d-3060-46b4-8437-60864306903b","actor_username":"peter@haymanphysics.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2025-07-30 03:55:23.852965+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf800b07-0895-4d61-9a13-cce80c4b9da3', '{"action":"token_refreshed","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 12:52:27.895732+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4de5a8b-f4cb-470d-a983-11ce0cc9dea2', '{"action":"token_revoked","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 12:52:27.898125+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b37f92ca-f373-424a-b066-a64565eb30d9', '{"action":"token_refreshed","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 17:15:48.31127+00', ''),
	('00000000-0000-0000-0000-000000000000', '66a7f96f-14f7-428e-9e2f-219891a934c9', '{"action":"token_revoked","actor_id":"193662fa-838e-4aa4-9921-b8ca7d141dd0","actor_username":"vitordgc@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 17:15:48.312776+00', ''),
	('00000000-0000-0000-0000-000000000000', '4068d026-8e7b-4452-b35d-7c78c0054099', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 17:35:16.857051+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd9e20d7-43a0-436d-a015-12e65b5219c5', '{"action":"token_revoked","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 17:35:16.858077+00', ''),
	('00000000-0000-0000-0000-000000000000', '720ea5c8-ef1c-46f4-9131-aee76ac1fdfe', '{"action":"token_refreshed","actor_id":"2c956050-3a2b-4de4-9e39-942b9ee9f402","actor_username":"davedri@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-30 17:35:17.61613+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('799023c7-ee8f-49fd-a1fb-3d9481b1c340', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', 'a384ee9d-4bdb-4015-9b54-69233fe63f3f', 's256', '122g_LF3buTIQ71B6rxKlPTELZqcdRGjJ3r_BsFNJ6Q', 'recovery', '', '', '2025-05-17 05:14:35.788433+00', '2025-05-17 05:14:42.038509+00', 'recovery', '2025-05-17 05:14:42.038454+00'),
	('ec929c35-5375-4a57-94b9-36b1cdcb1906', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', 'fae86955-13a1-4d91-9588-fb933fad2730', 's256', 'A1vD8ErKpJp1GvbA2InFxp4t9U4HJ9m4ibwsl7rYPAE', 'email', '', '', '2025-05-11 22:38:11.211612+00', '2025-05-11 22:38:38.697377+00', 'email/signup', '2025-05-11 22:38:38.697336+00'),
	('a20d1713-1df1-463b-9e19-5bf1f863c55d', '7ee419a4-65c8-4570-a5b8-5472280b06ad', '9fe19882-7b8c-4e59-a4a1-691057b80403', 's256', 'cNSGxfSu7t3yXgel3e5ZPWJiY8MFm3plwTH0lNHaHlI', 'email', '', '', '2025-05-15 09:51:23.120001+00', '2025-05-15 09:51:23.120001+00', 'email/signup', NULL),
	('e36c4c11-37d5-467a-8012-1b005c7deb13', '7ee419a4-65c8-4570-a5b8-5472280b06ad', '87246a42-b2cd-4eb1-97cb-2235526bf590', 's256', 'fEQWpEnkiB6c618QCkMmMbrMW5j9iipTs478SdCKFu4', 'email', '', '', '2025-05-15 09:51:34.977094+00', '2025-05-15 09:51:34.977094+00', 'email/signup', NULL),
	('f703a93c-7107-4013-bcfa-389440db8af9', '12c127f3-5108-4612-8a7e-f9875807f09a', 'c55f8ddc-6b90-4474-806d-7247cedf2638', 's256', 'peAW0IFy4vffMqWX19M8AbN1RyKYHVlSZfD2LUFeUAU', 'email', '', '', '2025-05-16 08:01:51.189712+00', '2025-05-16 08:02:12.4792+00', 'email/signup', '2025-05-16 08:02:12.47916+00'),
	('7e6ee879-1540-4208-a832-8f6ef2903e56', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', '105b2976-da61-43d8-84e5-f15a3db7c64e', 's256', 'uT4vtNBXAwB9eXsHaORGJFtQs_QgFeghmuQCWE2ekyc', 'email', '', '', '2025-05-16 08:05:06.461714+00', '2025-05-16 08:05:06.461714+00', 'email/signup', NULL),
	('8c9eb7ba-fb2b-4c8f-aab3-92e95fab00bd', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', '094838d5-93a2-42c4-8fc0-74b0095db5ec', 's256', 'JD9X8VKHxVj-CNGAb6V1saY_NrqUtCvAEQ03lM_yY1U', 'recovery', '', '', '2025-05-17 05:17:43.093028+00', '2025-05-17 05:17:49.094368+00', 'recovery', '2025-05-17 05:17:49.094323+00'),
	('0803bc85-6fa7-4151-9c35-2fd1d2350d96', 'ee823d45-d802-4308-b391-16d7023e963a', 'c1c91d12-0401-4b9d-9a8d-26b1b7dc742d', 's256', 'Dc2ofBmQcRPdG4kQl780QQsNkt_naK-M4seQFLN_k3c', 'email', '', '', '2025-05-16 08:06:33.039977+00', '2025-05-16 08:08:48.231783+00', 'email/signup', '2025-05-16 08:08:48.23174+00'),
	('429f4103-f84a-473b-a9e9-c2d679d1483f', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', '114e92e9-d51d-45df-931e-f357597cfda3', 's256', '34vAQ1OH4Bb-p6tRnpS_FK0aPzbNqOm8bjZySohL_iQ', 'email', '', '', '2025-05-16 08:17:53.328287+00', '2025-05-16 08:17:59.413156+00', 'email/signup', '2025-05-16 08:17:59.41311+00'),
	('e914be7c-7d45-4eb3-ba85-1803a252651e', '546d25d0-7fe9-415b-8bbc-4315c4318c2b', '1eb6eddc-7fb0-487c-aa93-d035f64b4bd1', 's256', 'l4vF8Y08q0Rul7ScltLOkMWlW0qlfO5dOsG1z0-1CLc', 'email', '', '', '2025-05-19 07:14:15.253327+00', '2025-05-19 07:15:22.758764+00', 'email/signup', '2025-05-19 07:15:22.758717+00'),
	('ad215046-ad9d-48ba-8e35-84fb73a1a755', '6aea3115-bb2c-4038-9be0-944a1b728725', '591e114e-7f4f-4dca-be88-b0565b6ee841', 's256', 'IF2WLVOXm-ooTs_Wc_iiXVe35bhkQFyahpDrd6eZSDU', 'email', '', '', '2025-06-08 17:47:10.497145+00', '2025-06-08 17:47:31.832483+00', 'email/signup', '2025-06-08 17:47:31.83244+00'),
	('49a08e27-c663-441b-8a8c-b2b9d26683c1', '1e6533cc-3f75-495c-a06a-19cc84551174', '82dc2361-fb54-40a0-ada9-3c805e4b03e1', 's256', '8WOaJWXO10yDY8_NlwOQ0sZhF0VB3VK2XihB7o1mdKg', 'email', '', '', '2025-07-24 20:26:19.27189+00', '2025-07-24 20:26:19.27189+00', 'email/signup', NULL),
	('c44d7541-ba92-48a9-bd1b-d88cabaa778c', '89adb1df-ac89-46d3-ab9f-03b383933fb9', 'e23a394b-6bc0-4909-ab06-b96f8c0971b4', 's256', 'mOZSPJ5JImEHOuMv54cXPtjBdBYrbax870ei2hfWOXY', 'email', '', '', '2025-07-24 20:27:09.71562+00', '2025-07-24 20:27:09.71562+00', 'email/signup', NULL),
	('7adc6a60-241b-457d-b6bd-632d153e9ae6', '89adb1df-ac89-46d3-ab9f-03b383933fb9', '4b651ded-77e5-44b2-80e9-f692a916a2be', 's256', 'Jm4Bk7A5xgKJRyGiQwNJ3qkiOhObHSKLPyck_4Gp9ks', 'email', '', '', '2025-07-24 20:27:39.895552+00', '2025-07-24 20:27:39.895552+00', 'email/signup', NULL),
	('c2538498-5dcf-4d86-93a7-b5f9504bebfb', '89adb1df-ac89-46d3-ab9f-03b383933fb9', '888d7155-c175-4da1-b05e-6e9753c0c79c', 's256', 's2HPI_Br9_xkA9R7HOMw3-U4mUb6dYgIMeuswyvalfk', 'email', '', '', '2025-07-24 20:28:15.104877+00', '2025-07-24 20:28:15.104877+00', 'email/signup', NULL),
	('216b2332-020f-45fb-b486-606fda4f8c23', '9ebb1923-c51c-4c54-9a5c-b416a86e4bde', '9623dfe6-4272-46da-a562-1bf8363fe9eb', 's256', 'Y6cbzDg_WjFX-GjVh3F95HR4Li8KSGnXxBhay0YWCM0', 'email', '', '', '2025-07-24 21:42:09.393304+00', '2025-07-24 21:42:37.109105+00', 'email/signup', '2025-07-24 21:42:37.109057+00'),
	('1871404b-9e81-45a0-a511-6c19a504d387', '89adb1df-ac89-46d3-ab9f-03b383933fb9', 'd708c30e-b177-4cd9-a565-31010ee2a7bb', 's256', 'h_9x3xfWwNbjUo-oRXFuYp-f7w4dKxYC3v8cfYOrd-w', 'email', '', '', '2025-07-25 06:18:54.504942+00', '2025-07-25 06:18:54.504942+00', 'email/signup', NULL),
	('b658680a-5124-4e9d-aede-7b6cd31b31ff', 'fac3dfd3-d445-4200-8069-8b96293d81eb', 'b7644ef4-6e99-4ea5-bc0a-079f922b6496', 's256', 'CRgSpyyKtcPiE75n5wElaC5JYqJLpHDN96sgi0mqhWs', 'email', '', '', '2025-07-28 16:21:05.547189+00', '2025-07-28 16:21:43.93418+00', 'email/signup', '2025-07-28 16:21:43.934139+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '2c956050-3a2b-4de4-9e39-942b9ee9f402', 'authenticated', 'authenticated', 'davedri@gmail.com', '$2a$10$gK95VPI8M1xntsy5hrlMXO5znX5fKvW9wNo.vzZS725mJz0anakDS', '2025-04-08 15:53:12.685697+00', NULL, '', '2025-04-08 15:52:52.83702+00', '', NULL, '', '', NULL, '2025-07-28 09:18:53.188457+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "2c956050-3a2b-4de4-9e39-942b9ee9f402", "email": "davedri@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-04-08 15:52:52.756588+00', '2025-07-30 17:35:16.861337+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', 'authenticated', 'authenticated', 'david@jupiterthree.com', '$2a$10$629XYpzEevHcDL9imA5P2uHDgmBCu1DdQ8xjwebDTAQQ1B4FzB6mS', '2025-05-11 22:38:38.690952+00', NULL, '', '2025-05-11 22:38:11.212625+00', '', NULL, '', '', NULL, '2025-05-11 22:40:11.945572+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340", "email": "david@jupiterthree.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-11 22:38:11.195088+00', '2025-05-11 22:40:11.948233+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8decc90a-0a8b-47cc-bb0f-610d3944145c', 'authenticated', 'authenticated', 'a.marchenkova@gmail.com', '$2a$10$furuNHXxSnkUsJNMjdMWZOWBhIbeu4y9fy3wXmiBrIm8gKlIb0WK.', '2025-05-11 22:40:32.461343+00', NULL, '', '2025-05-11 22:40:16.242384+00', '', NULL, '', '', NULL, '2025-05-11 22:40:34.010277+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8decc90a-0a8b-47cc-bb0f-610d3944145c", "email": "a.marchenkova@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-11 22:40:16.231008+00', '2025-05-12 14:15:31.84284+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7ee419a4-65c8-4570-a5b8-5472280b06ad', 'authenticated', 'authenticated', 'yade.song@qrens.com', '$2a$10$ymy4qlK7i/svs5z23qj4/eKelPPOROgbij9KgXLiMWgWGhsXf8hQC', NULL, NULL, 'pkce_0078e21165428615eed72ca8aa31bce0e1faff4820464a99859f9550', '2025-05-15 09:51:34.977679+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "7ee419a4-65c8-4570-a5b8-5472280b06ad", "email": "yade.song@qrens.com", "email_verified": false, "phone_verified": false}', NULL, '2025-05-15 09:51:23.105547+00', '2025-05-15 09:51:39.118344+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', 'authenticated', 'authenticated', 'maeshima.h@jp.panasonic.com', '$2a$10$MAEUnz9MAK82v9RvtnvWu.iTTyytNwCtzgbj9vrCyieCKh88f2iCO', '2025-05-16 08:17:59.408245+00', NULL, '', '2025-05-16 08:17:53.329181+00', '', '2025-05-17 05:17:43.095546+00', '', '', NULL, '2025-05-17 05:21:55.434357+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca", "email": "maeshima.h@jp.panasonic.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-16 08:17:53.320853+00', '2025-05-17 05:21:55.437038+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '546d25d0-7fe9-415b-8bbc-4315c4318c2b', 'authenticated', 'authenticated', 'yoshitsuna.murata@jp.fujikura.com', '$2a$10$P9hhURDU/CoZIc4XVJvEgOpItCfb7mVOosyT9zELuWzPIsO5olWtK', '2025-05-19 07:15:22.751436+00', NULL, '', '2025-05-19 07:14:15.254226+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "546d25d0-7fe9-415b-8bbc-4315c4318c2b", "email": "yoshitsuna.murata@jp.fujikura.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-19 07:14:15.244845+00', '2025-05-19 07:15:22.756277+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', 'authenticated', 'authenticated', 'keita0067guitar@gmail.com', '$2a$10$caSdk7cIAAYGMRg00.HtlOww5nRnLFAlNBDgU7VrD61drw.mQO9Y2', '2025-05-16 08:06:25.609973+00', NULL, '', '2025-05-16 08:06:04.699325+00', '', NULL, '', '', NULL, '2025-05-16 08:06:49.094755+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ee1ff081-8ccb-41b3-a886-210f43ba6a47", "email": "keita0067guitar@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-16 08:05:06.456558+00', '2025-05-17 05:11:21.568116+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ee823d45-d802-4308-b391-16d7023e963a', 'authenticated', 'authenticated', 'yuya.seki@keio.jp', '$2a$10$eyKLRSZNHBy.heCWAKPII.Yt1mBgr8cTIqmL/9PPznpacKTbvN5q6', '2025-05-16 08:08:48.224334+00', NULL, '', '2025-05-16 08:06:33.040633+00', '', NULL, '', '', NULL, '2025-05-16 08:09:05.303064+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ee823d45-d802-4308-b391-16d7023e963a", "email": "yuya.seki@keio.jp", "email_verified": true, "phone_verified": false}', NULL, '2025-05-16 08:06:33.032703+00', '2025-05-16 08:09:05.305507+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '12c127f3-5108-4612-8a7e-f9875807f09a', 'authenticated', 'authenticated', 'sakurairihito@gmail.com', '$2a$10$j8/jJ.IX89pMNX1043Wgxun/gP9UFmW.Z.YLbmOKDGWPWIq9F.Kj2', '2025-05-16 08:02:12.473618+00', NULL, '', '2025-05-16 08:01:51.191233+00', '', NULL, '', '', NULL, '2025-05-16 08:02:46.229215+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "12c127f3-5108-4612-8a7e-f9875807f09a", "email": "sakurairihito@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-16 08:01:51.174523+00', '2025-05-16 09:47:41.229009+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '2a1026c9-979d-41d6-85ce-f916b4b3e1f1', 'authenticated', 'authenticated', 'tanaka.shu@gmail.com', '$2a$10$BeG6d7yOUz881kWU5AOrV.gGXKoMh8e4Ar.wD.lxOKPiW.d5oE8sS', '2025-05-19 02:09:55.475921+00', NULL, '', '2025-05-19 02:09:29.024021+00', '', NULL, '', '', NULL, '2025-05-19 02:09:56.092655+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "2a1026c9-979d-41d6-85ce-f916b4b3e1f1", "email": "tanaka.shu@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-19 02:09:29.010384+00', '2025-05-19 02:09:56.095332+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '4a5eed37-f7a7-4af8-a717-820cd1a4bed2', 'authenticated', 'authenticated', 'citronkob1@gmail.com', '$2a$10$PctogGgFmg5ELZigZQpm.elHYavV5LIneW/6cyi6fZlqPbD4PWUym', '2025-05-16 13:06:01.784762+00', NULL, '', '2025-05-16 13:05:42.522765+00', '', NULL, '', '', NULL, '2025-05-16 13:06:02.909312+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4a5eed37-f7a7-4af8-a717-820cd1a4bed2", "email": "citronkob1@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-16 13:05:42.514483+00', '2025-05-16 13:06:02.91181+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6aea3115-bb2c-4038-9be0-944a1b728725', 'authenticated', 'authenticated', 'amin.zamani.se@gmail.com', '$2a$10$9Nzauy80KN7dIbs3Am0WrOzB4kdFVuR.ZE74aCte.ikrE4aC8W.p6', '2025-06-08 17:47:31.827518+00', NULL, '', '2025-06-08 17:47:10.505373+00', '', NULL, '', '', NULL, '2025-06-08 17:47:48.683386+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6aea3115-bb2c-4038-9be0-944a1b728725", "email": "amin.zamani.se@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-06-08 17:47:10.464004+00', '2025-06-09 13:29:52.752987+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b24dc92d-51cc-40dd-b700-51be02e4f2a9', 'authenticated', 'authenticated', 'taro2021yama@gmail.com', '$2a$10$OQjv3VM30WXdBxNO3doMkOi5LJ3JL8ELvVDXzvsg9qC5qny3ZUxo.', '2025-05-22 00:41:02.291421+00', NULL, '', '2025-05-22 00:40:37.791416+00', '', NULL, '', '', NULL, '2025-05-22 00:41:03.304751+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "b24dc92d-51cc-40dd-b700-51be02e4f2a9", "email": "taro2021yama@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-22 00:40:37.770302+00', '2025-05-22 00:41:03.314666+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '1e6533cc-3f75-495c-a06a-19cc84551174', 'authenticated', 'authenticated', 'alainchampenois@gmail.com', '$2a$10$a9YsdtlJXmMGIc.Hf73g7OeLZYIQNe58dqKtwFUy6cZaP/wzrUq1G', NULL, NULL, 'pkce_4b7092f2311cfc23699eb382e85050e0f707911754e133d3637d8543', '2025-07-24 20:26:19.277328+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "1e6533cc-3f75-495c-a06a-19cc84551174", "email": "alainchampenois@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-07-24 20:26:19.256107+00', '2025-07-24 20:26:22.211805+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '89adb1df-ac89-46d3-ab9f-03b383933fb9', 'authenticated', 'authenticated', 'alain.champenois@quobly.io', '$2a$10$lPMhDmD6Wy06BmLuK26YyuTtRGWtKpMkOi7wrE4oNF1lDAM3i6EIy', NULL, NULL, 'pkce_01d0c24796a164cfcdd389604e97c22dd113afdbb7d12503e53d5c24', '2025-07-25 06:18:54.50682+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "89adb1df-ac89-46d3-ab9f-03b383933fb9", "email": "alain.champenois@quobly.io", "email_verified": false, "phone_verified": false}', NULL, '2025-07-24 20:27:09.709365+00', '2025-07-25 06:18:57.108398+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'fac3dfd3-d445-4200-8069-8b96293d81eb', 'authenticated', 'authenticated', 'sophy.shin.q@gmail.com', '$2a$10$bfL5gxUJr4qENJlv7d/Z1e1kfqMJpagjAjss4uSLa1tDUouV6ppHe', '2025-07-28 16:21:43.928151+00', NULL, '', '2025-07-28 16:21:05.549686+00', '', NULL, '', '', NULL, '2025-07-28 16:22:05.414541+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "fac3dfd3-d445-4200-8069-8b96293d81eb", "email": "sophy.shin.q@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-07-28 16:21:05.530976+00', '2025-07-28 16:22:05.418001+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '9ebb1923-c51c-4c54-9a5c-b416a86e4bde', 'authenticated', 'authenticated', 'doug@global-qi.com', '$2a$10$gYRp8zyKn.FCYL9m8pXlUutOgK08eE0wsSvZHywsVib1oXxuP52P.', '2025-07-24 21:42:37.104598+00', NULL, '', '2025-07-24 21:42:09.394225+00', '', NULL, '', '', NULL, '2025-07-24 21:43:10.731525+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "9ebb1923-c51c-4c54-9a5c-b416a86e4bde", "email": "doug@global-qi.com", "email_verified": true, "phone_verified": false}', NULL, '2025-07-24 21:42:09.386158+00', '2025-07-24 21:43:10.738649+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5467024d-3060-46b4-8437-60864306903b', 'authenticated', 'authenticated', 'peter@haymanphysics.com', '$2a$10$hmjsS4.IYLH2Ke4ttl2Iz.yNYyfFhoMI7f8RhR20YHZGpuQAdbfdC', '2025-07-30 03:55:20.605119+00', NULL, '', '2025-07-30 03:55:07.238068+00', '', NULL, '', '', NULL, '2025-07-30 03:55:23.853589+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5467024d-3060-46b4-8437-60864306903b", "email": "peter@haymanphysics.com", "email_verified": true, "phone_verified": false}', NULL, '2025-07-30 03:55:07.229657+00', '2025-07-30 03:55:23.856274+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '193662fa-838e-4aa4-9921-b8ca7d141dd0', 'authenticated', 'authenticated', 'vitordgc@gmail.com', '$2a$10$vKf.tMpWS/iUHl82G.xy8uCBPZlb7fjh4pdUvyleq.uJGmhRZC.dq', '2025-07-30 00:02:41.591566+00', NULL, '', '2025-07-30 00:02:23.589898+00', '', NULL, '', '', NULL, '2025-07-30 00:02:43.827652+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "193662fa-838e-4aa4-9921-b8ca7d141dd0", "email": "vitordgc@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-07-30 00:02:23.579007+00', '2025-07-30 17:15:48.316572+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('2c956050-3a2b-4de4-9e39-942b9ee9f402', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '{"sub": "2c956050-3a2b-4de4-9e39-942b9ee9f402", "email": "davedri@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-04-08 15:52:52.803725+00', '2025-04-08 15:52:52.804452+00', '2025-04-08 15:52:52.804452+00', 'a1033ece-2f77-441e-817d-ac35cb556478'),
	('a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', '{"sub": "a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340", "email": "david@jupiterthree.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-11 22:38:11.205242+00', '2025-05-11 22:38:11.205301+00', '2025-05-11 22:38:11.205301+00', 'afc9b465-ad1e-4b47-a7f8-0ba261ad422e'),
	('8decc90a-0a8b-47cc-bb0f-610d3944145c', '8decc90a-0a8b-47cc-bb0f-610d3944145c', '{"sub": "8decc90a-0a8b-47cc-bb0f-610d3944145c", "email": "a.marchenkova@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-11 22:40:16.234914+00', '2025-05-11 22:40:16.234961+00', '2025-05-11 22:40:16.234961+00', '910fd41e-463e-459c-904b-d03a42634b5b'),
	('7ee419a4-65c8-4570-a5b8-5472280b06ad', '7ee419a4-65c8-4570-a5b8-5472280b06ad', '{"sub": "7ee419a4-65c8-4570-a5b8-5472280b06ad", "email": "yade.song@qrens.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-15 09:51:23.116012+00', '2025-05-15 09:51:23.116147+00', '2025-05-15 09:51:23.116147+00', '63c2a053-6580-4aae-8e53-9d595bf6f7c3'),
	('12c127f3-5108-4612-8a7e-f9875807f09a', '12c127f3-5108-4612-8a7e-f9875807f09a', '{"sub": "12c127f3-5108-4612-8a7e-f9875807f09a", "email": "sakurairihito@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-16 08:01:51.185319+00', '2025-05-16 08:01:51.185372+00', '2025-05-16 08:01:51.185372+00', '1d659e96-861a-4cb2-9f4a-1b149e402142'),
	('ee1ff081-8ccb-41b3-a886-210f43ba6a47', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', '{"sub": "ee1ff081-8ccb-41b3-a886-210f43ba6a47", "email": "keita0067guitar@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-16 08:05:06.458979+00', '2025-05-16 08:05:06.459025+00', '2025-05-16 08:05:06.459025+00', 'd91dcf1a-72de-462f-bb07-b08b6220e7b7'),
	('ee823d45-d802-4308-b391-16d7023e963a', 'ee823d45-d802-4308-b391-16d7023e963a', '{"sub": "ee823d45-d802-4308-b391-16d7023e963a", "email": "yuya.seki@keio.jp", "email_verified": true, "phone_verified": false}', 'email', '2025-05-16 08:06:33.036266+00', '2025-05-16 08:06:33.036318+00', '2025-05-16 08:06:33.036318+00', '40301073-b200-4aff-a621-e7cf6e588930'),
	('ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', '{"sub": "ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca", "email": "maeshima.h@jp.panasonic.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-16 08:17:53.324576+00', '2025-05-16 08:17:53.324628+00', '2025-05-16 08:17:53.324628+00', '25d75346-51b8-48bb-8ebb-55e461575abe'),
	('4a5eed37-f7a7-4af8-a717-820cd1a4bed2', '4a5eed37-f7a7-4af8-a717-820cd1a4bed2', '{"sub": "4a5eed37-f7a7-4af8-a717-820cd1a4bed2", "email": "citronkob1@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-16 13:05:42.518354+00', '2025-05-16 13:05:42.518405+00', '2025-05-16 13:05:42.518405+00', 'e746ddbf-57fb-4192-bd94-b15b8ea33b7a'),
	('2a1026c9-979d-41d6-85ce-f916b4b3e1f1', '2a1026c9-979d-41d6-85ce-f916b4b3e1f1', '{"sub": "2a1026c9-979d-41d6-85ce-f916b4b3e1f1", "email": "tanaka.shu@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-19 02:09:29.017784+00', '2025-05-19 02:09:29.017837+00', '2025-05-19 02:09:29.017837+00', '3e076131-c249-4f17-97e9-3edbe6978b8e'),
	('546d25d0-7fe9-415b-8bbc-4315c4318c2b', '546d25d0-7fe9-415b-8bbc-4315c4318c2b', '{"sub": "546d25d0-7fe9-415b-8bbc-4315c4318c2b", "email": "yoshitsuna.murata@jp.fujikura.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-19 07:14:15.249417+00', '2025-05-19 07:14:15.249465+00', '2025-05-19 07:14:15.249465+00', '19c99d36-ad80-4bb1-bb4f-73995d0d7fa3'),
	('b24dc92d-51cc-40dd-b700-51be02e4f2a9', 'b24dc92d-51cc-40dd-b700-51be02e4f2a9', '{"sub": "b24dc92d-51cc-40dd-b700-51be02e4f2a9", "email": "taro2021yama@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-22 00:40:37.779005+00', '2025-05-22 00:40:37.779059+00', '2025-05-22 00:40:37.779059+00', '87c534bb-7e39-4f2c-a995-3f550c89087b'),
	('6aea3115-bb2c-4038-9be0-944a1b728725', '6aea3115-bb2c-4038-9be0-944a1b728725', '{"sub": "6aea3115-bb2c-4038-9be0-944a1b728725", "email": "amin.zamani.se@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-06-08 17:47:10.484026+00', '2025-06-08 17:47:10.48408+00', '2025-06-08 17:47:10.48408+00', '6169a7d0-4458-4eab-91a3-13404fd1825a'),
	('1e6533cc-3f75-495c-a06a-19cc84551174', '1e6533cc-3f75-495c-a06a-19cc84551174', '{"sub": "1e6533cc-3f75-495c-a06a-19cc84551174", "email": "alainchampenois@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-07-24 20:26:19.267279+00', '2025-07-24 20:26:19.267347+00', '2025-07-24 20:26:19.267347+00', '571b45cd-3c68-4fef-9b92-a49a04b5061d'),
	('89adb1df-ac89-46d3-ab9f-03b383933fb9', '89adb1df-ac89-46d3-ab9f-03b383933fb9', '{"sub": "89adb1df-ac89-46d3-ab9f-03b383933fb9", "email": "alain.champenois@quobly.io", "email_verified": false, "phone_verified": false}', 'email', '2025-07-24 20:27:09.712685+00', '2025-07-24 20:27:09.712746+00', '2025-07-24 20:27:09.712746+00', 'f7f6f542-f042-4185-bd74-9428c8332c5a'),
	('9ebb1923-c51c-4c54-9a5c-b416a86e4bde', '9ebb1923-c51c-4c54-9a5c-b416a86e4bde', '{"sub": "9ebb1923-c51c-4c54-9a5c-b416a86e4bde", "email": "doug@global-qi.com", "email_verified": true, "phone_verified": false}', 'email', '2025-07-24 21:42:09.389572+00', '2025-07-24 21:42:09.38962+00', '2025-07-24 21:42:09.38962+00', 'c5bdbe22-3476-4603-b26b-f7736e455b7c'),
	('fac3dfd3-d445-4200-8069-8b96293d81eb', 'fac3dfd3-d445-4200-8069-8b96293d81eb', '{"sub": "fac3dfd3-d445-4200-8069-8b96293d81eb", "email": "sophy.shin.q@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-07-28 16:21:05.541231+00', '2025-07-28 16:21:05.541289+00', '2025-07-28 16:21:05.541289+00', '81290cf9-227b-4011-a410-974d3f443d7b'),
	('193662fa-838e-4aa4-9921-b8ca7d141dd0', '193662fa-838e-4aa4-9921-b8ca7d141dd0', '{"sub": "193662fa-838e-4aa4-9921-b8ca7d141dd0", "email": "vitordgc@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-07-30 00:02:23.58319+00', '2025-07-30 00:02:23.58324+00', '2025-07-30 00:02:23.58324+00', 'd8e10dc9-0ef3-4a43-b561-6a14306b8125'),
	('5467024d-3060-46b4-8437-60864306903b', '5467024d-3060-46b4-8437-60864306903b', '{"sub": "5467024d-3060-46b4-8437-60864306903b", "email": "peter@haymanphysics.com", "email_verified": true, "phone_verified": false}', 'email', '2025-07-30 03:55:07.233446+00', '2025-07-30 03:55:07.233496+00', '2025-07-30 03:55:07.233496+00', 'bcc881b8-8b32-450b-be07-4d95d2e6b532');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('371cb6a9-b2f4-4557-9164-ec422164a0f7', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', '2025-05-11 22:38:59.91529+00', '2025-05-11 22:38:59.91529+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', '194.223.161.170', NULL),
	('517f7add-9a03-4d45-9c81-54ecb00e32de', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', '2025-05-11 22:40:11.945652+00', '2025-05-11 22:40:11.945652+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', '194.223.161.170', NULL),
	('4b73faf2-0640-47f1-ad41-9fd84e712b83', 'ee823d45-d802-4308-b391-16d7023e963a', '2025-05-16 08:09:05.303152+00', '2025-05-16 08:09:05.303152+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15', '122.212.234.100', NULL),
	('985632f3-e8ce-4992-a32e-7b702ababd79', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', '2025-05-16 08:22:24.875747+00', '2025-05-16 08:22:24.875747+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', '122.212.234.102', NULL),
	('28087e78-99a4-4b90-8b51-d9e067e8b222', '12c127f3-5108-4612-8a7e-f9875807f09a', '2025-05-16 08:02:46.229292+00', '2025-05-16 09:47:41.230745+00', NULL, 'aal1', NULL, '2025-05-16 09:47:41.230671', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1', '126.254.119.132', NULL),
	('24c550b4-8edc-499c-8492-48e3408f42ce', '8decc90a-0a8b-47cc-bb0f-610d3944145c', '2025-05-11 22:40:34.010352+00', '2025-05-12 14:15:31.84875+00', NULL, 'aal1', NULL, '2025-05-12 14:15:31.848663', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '193.221.128.54', NULL),
	('18645156-9d98-4788-87d4-0bbb7681e8da', '4a5eed37-f7a7-4af8-a717-820cd1a4bed2', '2025-05-16 13:06:02.909385+00', '2025-05-16 13:06:02.909385+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1', '59.132.8.66', NULL),
	('7a0b91ec-791a-4247-8ede-ed85dd7fbfe7', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', '2025-05-16 08:06:49.094833+00', '2025-05-17 05:11:21.569378+00', NULL, 'aal1', NULL, '2025-05-17 05:11:21.569306', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '106.179.111.247', NULL),
	('2ac8d522-31f8-43c8-b11f-a30f04c575c5', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', '2025-05-17 05:21:55.434434+00', '2025-05-17 05:21:55.434434+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', '202.171.224.180', NULL),
	('3d38a6c8-49cd-46d2-8ad4-8cef42ffec47', '2a1026c9-979d-41d6-85ce-f916b4b3e1f1', '2025-05-19 02:09:56.092723+00', '2025-05-19 02:09:56.092723+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', '131.113.17.81', NULL),
	('7f718320-549d-4c0f-99d2-85d8b2f56175', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-09 13:16:59.6452+00', '2025-07-30 17:35:17.617314+00', NULL, 'aal1', NULL, '2025-07-30 17:35:17.617241', 'Vercel Edge Functions', '3.25.106.74', NULL),
	('89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-22 05:40:58.819991+00', '2025-07-29 12:25:13.610835+00', NULL, 'aal1', NULL, '2025-07-29 12:25:13.61076', 'Vercel Edge Functions', '3.235.224.37', NULL),
	('264de258-57ce-47b9-8f09-96f98472078b', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-28 09:18:53.188537+00', '2025-07-28 14:34:17.85116+00', NULL, 'aal1', NULL, '2025-07-28 14:34:17.851067', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', '159.196.12.82', NULL),
	('5f3a0a1c-c107-45e5-be7a-0ecdf3971427', 'fac3dfd3-d445-4200-8069-8b96293d81eb', '2025-07-28 16:22:05.414628+00', '2025-07-28 16:22:05.414628+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '129.41.86.2', NULL),
	('18fedd82-022e-4363-93fb-8c3b877f0b8e', 'b24dc92d-51cc-40dd-b700-51be02e4f2a9', '2025-05-22 00:41:03.304835+00', '2025-05-22 00:41:03.304835+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0', '49.128.147.78', NULL),
	('a0425b36-199b-4853-a526-e24c3c4c31b5', '6aea3115-bb2c-4038-9be0-944a1b728725', '2025-06-08 17:47:46.427498+00', '2025-06-08 17:47:46.427498+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1', '80.187.80.233', NULL),
	('f6df1cd1-8b0c-459e-9a16-98562d74ceaa', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-21 02:25:20.035264+00', '2025-07-21 02:25:20.035264+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '159.196.12.41', NULL),
	('09f25336-6957-4c2c-8ee2-416649bd3d41', '6aea3115-bb2c-4038-9be0-944a1b728725', '2025-06-08 17:47:48.683462+00', '2025-06-09 13:29:52.755296+00', NULL, 'aal1', NULL, '2025-06-09 13:29:52.755213', 'Vercel Edge Functions', '3.75.202.203', NULL),
	('38b4dc82-5ae7-4a33-880e-224a6aa6719f', '5467024d-3060-46b4-8437-60864306903b', '2025-07-30 03:55:23.853672+00', '2025-07-30 03:55:23.853672+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0', '130.216.50.207', NULL),
	('645e2151-3455-4d2e-b6d3-a8af1b018c70', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-17 11:06:29.272641+00', '2025-07-17 15:21:48.151895+00', NULL, 'aal1', NULL, '2025-07-17 15:21:48.151818', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', '159.196.12.41', NULL),
	('b417352e-7114-43f5-aca4-1179b76b233c', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-15 05:28:04.278827+00', '2025-07-22 13:28:14.936312+00', NULL, 'aal1', NULL, '2025-07-22 13:28:14.936238', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '159.196.12.41', NULL),
	('86179f04-627b-40a0-bbb5-f5469b09f1f7', '9ebb1923-c51c-4c54-9a5c-b416a86e4bde', '2025-07-24 21:43:10.731594+00', '2025-07-24 21:43:10.731594+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', '99.40.66.148', NULL),
	('af1da428-0f22-4624-8b4c-a8a95fa93ef1', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-10 05:33:17.685758+00', '2025-07-14 08:39:39.033283+00', NULL, 'aal1', NULL, '2025-07-14 08:39:39.033207', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', '159.196.12.41', NULL),
	('3f19dd97-7068-49ff-9791-fd5bac7a04d7', '193662fa-838e-4aa4-9921-b8ca7d141dd0', '2025-07-30 00:02:43.827742+00', '2025-07-30 17:15:48.317919+00', NULL, 'aal1', NULL, '2025-07-30 17:15:48.317847', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '8.242.35.90', NULL),
	('8db2c5d0-a859-4afb-8a7c-4207964aa34f', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-09 13:17:10.816548+00', '2025-07-23 14:08:14.995363+00', NULL, 'aal1', NULL, '2025-07-23 14:08:14.995258', 'Vercel Edge Functions', '52.63.214.33', NULL),
	('a4e40e84-f77b-494f-851d-1781ba85bb9a', '2c956050-3a2b-4de4-9e39-942b9ee9f402', '2025-07-20 07:03:12.749603+00', '2025-07-29 09:08:56.161659+00', NULL, 'aal1', NULL, '2025-07-29 09:08:56.161588', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', '159.196.12.82', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('371cb6a9-b2f4-4557-9164-ec422164a0f7', '2025-05-11 22:38:59.923791+00', '2025-05-11 22:38:59.923791+00', 'password', 'dee05860-7cf0-4bd9-b738-b3ca2ff844e8'),
	('517f7add-9a03-4d45-9c81-54ecb00e32de', '2025-05-11 22:40:11.949403+00', '2025-05-11 22:40:11.949403+00', 'password', 'bf9cb970-5a87-48f3-920b-cc8d06930784'),
	('24c550b4-8edc-499c-8492-48e3408f42ce', '2025-05-11 22:40:34.01227+00', '2025-05-11 22:40:34.01227+00', 'email/signup', '4a51e989-106a-47b1-a67e-75431aa87ba1'),
	('28087e78-99a4-4b90-8b51-d9e067e8b222', '2025-05-16 08:02:46.232266+00', '2025-05-16 08:02:46.232266+00', 'password', '66e70e35-420d-41db-b151-79f5605b622a'),
	('7a0b91ec-791a-4247-8ede-ed85dd7fbfe7', '2025-05-16 08:06:49.096899+00', '2025-05-16 08:06:49.096899+00', 'password', '743998aa-45f8-4d31-8030-0ccca5f05e8f'),
	('4b73faf2-0640-47f1-ad41-9fd84e712b83', '2025-05-16 08:09:05.305996+00', '2025-05-16 08:09:05.305996+00', 'password', '6ca3e7dd-1bb9-4da8-ac22-5676de807efc'),
	('985632f3-e8ce-4992-a32e-7b702ababd79', '2025-05-16 08:22:24.878919+00', '2025-05-16 08:22:24.878919+00', 'password', 'fd07bb2f-f9cb-4ab8-8390-df4df3841016'),
	('18645156-9d98-4788-87d4-0bbb7681e8da', '2025-05-16 13:06:02.912262+00', '2025-05-16 13:06:02.912262+00', 'email/signup', '03789285-0ceb-4e9a-a88d-5e6cc35a6154'),
	('2ac8d522-31f8-43c8-b11f-a30f04c575c5', '2025-05-17 05:21:55.437637+00', '2025-05-17 05:21:55.437637+00', 'password', '898028bd-b33d-49e9-a099-a88d95f721ae'),
	('3d38a6c8-49cd-46d2-8ad4-8cef42ffec47', '2025-05-19 02:09:56.095784+00', '2025-05-19 02:09:56.095784+00', 'email/signup', '5280d7ff-a744-4585-a48e-fa16e29b8658'),
	('18fedd82-022e-4363-93fb-8c3b877f0b8e', '2025-05-22 00:41:03.315279+00', '2025-05-22 00:41:03.315279+00', 'email/signup', '1404cde0-c9a5-43fe-876b-79e7fb834cbd'),
	('a0425b36-199b-4853-a526-e24c3c4c31b5', '2025-06-08 17:47:46.444568+00', '2025-06-08 17:47:46.444568+00', 'password', 'af94905b-c1e3-4423-97a1-8b58f11fac69'),
	('09f25336-6957-4c2c-8ee2-416649bd3d41', '2025-06-08 17:47:48.685435+00', '2025-06-08 17:47:48.685435+00', 'password', '01cdcc25-5340-4847-bac4-c6ed8bcd175d'),
	('7f718320-549d-4c0f-99d2-85d8b2f56175', '2025-07-09 13:16:59.647923+00', '2025-07-09 13:16:59.647923+00', 'password', '0913fdc5-3fcd-4807-b4c2-5538a897839b'),
	('8db2c5d0-a859-4afb-8a7c-4207964aa34f', '2025-07-09 13:17:10.8188+00', '2025-07-09 13:17:10.8188+00', 'password', '270bf1d9-3fde-4f98-8c00-7f3c9a78fc35'),
	('af1da428-0f22-4624-8b4c-a8a95fa93ef1', '2025-07-10 05:33:17.688934+00', '2025-07-10 05:33:17.688934+00', 'password', '36e57adc-dc56-4263-b18e-d0065960a37d'),
	('b417352e-7114-43f5-aca4-1179b76b233c', '2025-07-15 05:28:04.286904+00', '2025-07-15 05:28:04.286904+00', 'password', '13a871ea-de66-4b27-b20b-e11b849dc5fd'),
	('645e2151-3455-4d2e-b6d3-a8af1b018c70', '2025-07-17 11:06:29.275781+00', '2025-07-17 11:06:29.275781+00', 'password', '449841a5-a261-486b-842e-f1be6c9ba281'),
	('a4e40e84-f77b-494f-851d-1781ba85bb9a', '2025-07-20 07:03:12.753223+00', '2025-07-20 07:03:12.753223+00', 'password', '78c0a736-973f-40c2-8058-c5b3eaafb687'),
	('f6df1cd1-8b0c-459e-9a16-98562d74ceaa', '2025-07-21 02:25:20.038766+00', '2025-07-21 02:25:20.038766+00', 'password', '8517ee6f-a76a-41c0-8a63-80e1b52356fc'),
	('89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9', '2025-07-22 05:40:58.823569+00', '2025-07-22 05:40:58.823569+00', 'password', 'd97530b4-e98c-4f0d-9244-57ba1c3fe247'),
	('86179f04-627b-40a0-bbb5-f5469b09f1f7', '2025-07-24 21:43:10.739146+00', '2025-07-24 21:43:10.739146+00', 'password', '2eacd25a-bd52-492f-bf3f-6cf0866f0a3a'),
	('264de258-57ce-47b9-8f09-96f98472078b', '2025-07-28 09:18:53.196506+00', '2025-07-28 09:18:53.196506+00', 'password', 'be747c6c-e20f-49aa-815c-199d50f0cd4d'),
	('5f3a0a1c-c107-45e5-be7a-0ecdf3971427', '2025-07-28 16:22:05.418474+00', '2025-07-28 16:22:05.418474+00', 'password', '95359ec6-f0bf-4062-b852-b4040aaaaa68'),
	('3f19dd97-7068-49ff-9791-fd5bac7a04d7', '2025-07-30 00:02:43.831322+00', '2025-07-30 00:02:43.831322+00', 'email/signup', 'f42f2bae-2c6f-46c0-8ae5-1f3b3ea98903'),
	('38b4dc82-5ae7-4a33-880e-224a6aa6719f', '2025-07-30 03:55:23.856738+00', '2025-07-30 03:55:23.856738+00', 'email/signup', '519a936f-ec28-4d2a-85ca-a9967c0b5e90');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('9b854804-cf6e-4acb-8346-e088c174fa72', '7ee419a4-65c8-4570-a5b8-5472280b06ad', 'confirmation_token', 'pkce_0078e21165428615eed72ca8aa31bce0e1faff4820464a99859f9550', 'yade.song@qrens.com', '2025-05-15 09:51:39.119233', '2025-05-15 09:51:39.119233'),
	('72493d23-795e-48e1-87fc-d5d1648d0349', '1e6533cc-3f75-495c-a06a-19cc84551174', 'confirmation_token', 'pkce_4b7092f2311cfc23699eb382e85050e0f707911754e133d3637d8543', 'alainchampenois@gmail.com', '2025-07-24 20:26:22.216715', '2025-07-24 20:26:22.216715'),
	('6a4a8753-15f9-4c23-a1e2-e60a39494a54', '89adb1df-ac89-46d3-ab9f-03b383933fb9', 'confirmation_token', 'pkce_01d0c24796a164cfcdd389604e97c22dd113afdbb7d12503e53d5c24', 'alain.champenois@quobly.io', '2025-07-25 06:18:57.113086', '2025-07-25 06:18:57.113086');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 369, '45wylpjd655h', '193662fa-838e-4aa4-9921-b8ca7d141dd0', false, '2025-07-30 17:15:48.314771+00', '2025-07-30 17:15:48.314771+00', '2sgw4c42vlfo', '3f19dd97-7068-49ff-9791-fd5bac7a04d7'),
	('00000000-0000-0000-0000-000000000000', 212, '7i64pc7333au', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-09 15:13:34.378575+00', '2025-07-10 01:20:06.813567+00', 'ma4byleo4afs', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 280, '2czm53altncq', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 11:15:32.792464+00', '2025-07-20 12:53:31.419673+00', 'wvz7weyvqxuv', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 211, 'gavsovxlb55h', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-09 14:18:54.429261+00', '2025-07-10 03:37:26.869174+00', 'ndqhfbykspx5', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 215, 'tfplbnenykji', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 03:37:26.869522+00', '2025-07-10 04:49:50.124181+00', 'gavsovxlb55h', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 282, 'h64e65z5p4od', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 13:52:57.661291+00', '2025-07-20 14:51:10.246002+00', 'adsksrrmb37o', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 219, 'viooe2ppput6', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 06:52:04.337853+00', '2025-07-10 07:50:10.548848+00', 'tx6qsxw7cmup', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 276, 'almhy6ouibeg', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 07:35:35.747212+00', '2025-07-20 16:08:54.377137+00', 'lvfd4eie7l6n', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 221, 'wrzsogicbrdt', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 08:48:19.20215+00', '2025-07-10 09:46:35.909515+00', 'cafu5aziv2pm', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 137, 'jvolreqsrng3', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', false, '2025-05-16 08:22:24.876843+00', '2025-05-16 08:22:24.876843+00', NULL, '985632f3-e8ce-4992-a32e-7b702ababd79'),
	('00000000-0000-0000-0000-000000000000', 133, 'y2vacntuba26', '12c127f3-5108-4612-8a7e-f9875807f09a', true, '2025-05-16 08:02:46.230367+00', '2025-05-16 09:47:41.227098+00', NULL, '28087e78-99a4-4b90-8b51-d9e067e8b222'),
	('00000000-0000-0000-0000-000000000000', 139, '4e7gkdfzwz3w', '4a5eed37-f7a7-4af8-a717-820cd1a4bed2', false, '2025-05-16 13:06:02.910488+00', '2025-05-16 13:06:02.910488+00', NULL, '18645156-9d98-4788-87d4-0bbb7681e8da'),
	('00000000-0000-0000-0000-000000000000', 135, 'ackycab5nkt5', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', true, '2025-05-16 08:06:49.095627+00', '2025-05-17 04:05:14.222915+00', NULL, '7a0b91ec-791a-4247-8ede-ed85dd7fbfe7'),
	('00000000-0000-0000-0000-000000000000', 141, 'wo4xc6s5m2bp', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', false, '2025-05-17 05:11:21.566968+00', '2025-05-17 05:11:21.566968+00', 'js3cld635zaa', '7a0b91ec-791a-4247-8ede-ed85dd7fbfe7'),
	('00000000-0000-0000-0000-000000000000', 143, 'd2wiezdcw2cy', '2a1026c9-979d-41d6-85ce-f916b4b3e1f1', false, '2025-05-19 02:09:56.093751+00', '2025-05-19 02:09:56.093751+00', NULL, '3d38a6c8-49cd-46d2-8ad4-8cef42ffec47'),
	('00000000-0000-0000-0000-000000000000', 223, '4hradqr727j5', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 11:19:23.301095+00', '2025-07-10 12:17:35.319992+00', 'benve5k72btd', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 217, 'fucdewtw2y4e', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 05:33:17.686942+00', '2025-07-10 12:22:50.258594+00', NULL, 'af1da428-0f22-4624-8b4c-a8a95fa93ef1'),
	('00000000-0000-0000-0000-000000000000', 147, 'u3aepjbccgxm', 'b24dc92d-51cc-40dd-b700-51be02e4f2a9', false, '2025-05-22 00:41:03.309548+00', '2025-05-22 00:41:03.309548+00', NULL, '18fedd82-022e-4363-93fb-8c3b877f0b8e'),
	('00000000-0000-0000-0000-000000000000', 272, '27ju74rysdlj', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-19 03:09:26.338054+00', '2025-07-21 05:30:21.609939+00', 'm45gsdquboip', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 225, '7nsmeedptd6u', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 12:22:50.259319+00', '2025-07-10 13:53:29.318003+00', 'fucdewtw2y4e', 'af1da428-0f22-4624-8b4c-a8a95fa93ef1'),
	('00000000-0000-0000-0000-000000000000', 151, 'a5kdtfjznwvj', '6aea3115-bb2c-4038-9be0-944a1b728725', false, '2025-06-08 17:47:46.434547+00', '2025-06-08 17:47:46.434547+00', NULL, 'a0425b36-199b-4853-a526-e24c3c4c31b5'),
	('00000000-0000-0000-0000-000000000000', 286, 'jbsschuur7pq', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 01:18:38.560493+00', '2025-07-21 05:43:25.230045+00', 'vs7cv6fxzswj', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 152, 'jlkekwzbz6zr', '6aea3115-bb2c-4038-9be0-944a1b728725', true, '2025-06-08 17:47:48.68422+00', '2025-06-09 07:56:30.7379+00', NULL, '09f25336-6957-4c2c-8ee2-416649bd3d41'),
	('00000000-0000-0000-0000-000000000000', 154, 'hwmcf3skfipe', '6aea3115-bb2c-4038-9be0-944a1b728725', false, '2025-06-09 13:29:52.751816+00', '2025-06-09 13:29:52.751816+00', 'vygjgqr5hzvc', '09f25336-6957-4c2c-8ee2-416649bd3d41'),
	('00000000-0000-0000-0000-000000000000', 284, 'a4k4wyat3zhc', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 15:49:29.853466+00', '2025-07-21 06:58:57.660223+00', '4gnckovjaipo', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 229, 'mzdbeo5itpzs', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 01:32:10.223964+00', '2025-07-11 04:27:32.621733+00', '6hcrdup55fie', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 274, 'j7nk42sambey', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-19 18:43:57.714607+00', '2025-07-23 06:12:50.222566+00', 'sgbyvykzwp2i', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 227, 'nknud2vwnnfr', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 13:53:29.318684+00', '2025-07-11 05:45:12.811458+00', '7nsmeedptd6u', 'af1da428-0f22-4624-8b4c-a8a95fa93ef1'),
	('00000000-0000-0000-0000-000000000000', 231, 'xfeknvmieymn', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 05:25:42.371444+00', '2025-07-11 06:24:02.735343+00', 'sxe5onreivh2', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 233, 'rmll4prufhyu', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 06:24:02.736023+00', '2025-07-11 07:36:12.354666+00', 'xfeknvmieymn', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 235, 'hijdn7tgh2bo', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 08:34:18.535722+00', '2025-07-11 09:32:19.93158+00', 'h4av2pcpj3lx', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 237, '2vutkesoqrm4', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-12 02:08:04.436712+00', '2025-07-12 03:06:05.303609+00', '6yhabjpyjltx', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 209, 'h7zzfl63ddn5', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-09 13:17:10.817343+00', '2025-07-09 14:15:32.211698+00', NULL, '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 208, 'ndqhfbykspx5', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-09 13:16:59.646149+00', '2025-07-09 14:18:54.427679+00', NULL, '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 239, 'nu7nxiytnzwb', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-12 04:04:28.238437+00', '2025-07-13 04:00:51.031219+00', 'xmwdzvc2dygc', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 241, 'ce26eycg2t2a', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-13 05:24:50.91107+00', '2025-07-14 01:43:20.913195+00', 'zncp4lyejvfz', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 243, '6pxyatofjte4', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-14 03:45:09.130631+00', '2025-07-14 07:04:19.818294+00', 'agsamuzezk7q', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 245, 'cwkosrb3ndlf', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-14 07:04:19.818997+00', '2025-07-14 08:36:53.554901+00', '6pxyatofjte4', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 247, 'yk73rghvk7d4', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-14 08:39:39.030398+00', '2025-07-14 08:39:39.030398+00', 'rmu5qwclmw2d', 'af1da428-0f22-4624-8b4c-a8a95fa93ef1'),
	('00000000-0000-0000-0000-000000000000', 249, 'toatgxz3cfka', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-15 05:28:04.284645+00', '2025-07-15 09:12:19.326638+00', NULL, 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 251, 'fij7vwnl7pqy', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-15 09:55:25.069222+00', '2025-07-16 07:35:43.835454+00', 'wclbjaov2opn', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 253, 'btnpuc4z45ev', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-16 07:35:43.836148+00', '2025-07-16 09:48:45.592223+00', 'fij7vwnl7pqy', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 256, 'whjmbx5vb476', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-16 13:05:17.814951+00', '2025-07-17 03:43:52.198888+00', '3dtzwrcvro2g', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 258, 'fsghbpkqc6ic', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-17 11:06:29.273805+00', '2025-07-17 15:21:48.148227+00', NULL, '645e2151-3455-4d2e-b6d3-a8af1b018c70'),
	('00000000-0000-0000-0000-000000000000', 260, 'we2riavqgxke', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-17 15:21:48.148947+00', '2025-07-17 15:21:48.148947+00', 'fsghbpkqc6ic', '645e2151-3455-4d2e-b6d3-a8af1b018c70'),
	('00000000-0000-0000-0000-000000000000', 262, 'kav32y4glbt6', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-17 15:39:47.357468+00', '2025-07-18 05:49:16.223407+00', 'nbieina3c3cc', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 264, 'unfpz2qkp7xs', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 06:46:03.934164+00', '2025-07-18 08:26:41.679446+00', 'rsygw7gj2tzy', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 266, 'c4tyju5zxcay', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 08:26:41.680142+00', '2025-07-18 09:50:35.882173+00', 'unfpz2qkp7xs', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 268, '34n7wxeq4tqu', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 09:33:53.822049+00', '2025-07-18 12:26:04.33094+00', '3waytzxc7mak', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 270, 'yqay6wtlirqs', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 12:26:04.3316+00', '2025-07-18 17:35:21.313056+00', '34n7wxeq4tqu', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 214, 'jh7ovoaxmrk7', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 03:36:26.466441+00', '2025-07-19 17:40:43.739249+00', '7rufmb34cwla', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 278, 'rnqc72hba3hp', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 09:18:33.638759+00', '2025-07-20 10:17:15.337296+00', 'e7f7irk2rl35', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 210, 'ma4byleo4afs', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-09 14:15:32.212354+00', '2025-07-09 15:13:34.377734+00', 'h7zzfl63ddn5', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 279, 'wvz7weyvqxuv', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 10:17:15.338139+00', '2025-07-20 11:15:32.791699+00', 'rnqc72hba3hp', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 213, '7rufmb34cwla', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 01:20:06.814424+00', '2025-07-10 03:36:26.465673+00', '7i64pc7333au', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 370, 'cjrttg3cay4t', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-30 17:35:16.859371+00', '2025-07-30 17:35:16.859371+00', '5w7ehlqz7dim', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 216, 'fr3nc2rutadf', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 04:49:50.124944+00', '2025-07-10 05:53:41.306019+00', 'tfplbnenykji', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 281, 'adsksrrmb37o', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 12:53:31.420352+00', '2025-07-20 13:52:57.660595+00', '2czm53altncq', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 218, 'tx6qsxw7cmup', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 05:53:41.306647+00', '2025-07-10 06:52:04.33713+00', 'fr3nc2rutadf', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 220, 'cafu5aziv2pm', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 07:50:10.549628+00', '2025-07-10 08:48:19.201443+00', 'viooe2ppput6', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 136, 'lnksmguv6qge', 'ee823d45-d802-4308-b391-16d7023e963a', false, '2025-05-16 08:09:05.304117+00', '2025-05-16 08:09:05.304117+00', NULL, '4b73faf2-0640-47f1-ad41-9fd84e712b83'),
	('00000000-0000-0000-0000-000000000000', 138, 'gzyraavj7agk', '12c127f3-5108-4612-8a7e-f9875807f09a', false, '2025-05-16 09:47:41.227904+00', '2025-05-16 09:47:41.227904+00', 'y2vacntuba26', '28087e78-99a4-4b90-8b51-d9e067e8b222'),
	('00000000-0000-0000-0000-000000000000', 283, '4gnckovjaipo', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 14:51:10.246855+00', '2025-07-20 15:49:29.852741+00', 'h64e65z5p4od', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 140, 'js3cld635zaa', 'ee1ff081-8ccb-41b3-a886-210f43ba6a47', true, '2025-05-17 04:05:14.22365+00', '2025-05-17 05:11:21.566299+00', 'ackycab5nkt5', '7a0b91ec-791a-4247-8ede-ed85dd7fbfe7'),
	('00000000-0000-0000-0000-000000000000', 142, '26cgalhrvzrf', 'ba6d810d-a9c6-40cf-8d9c-3aed1cbef2ca', false, '2025-05-17 05:21:55.435658+00', '2025-05-17 05:21:55.435658+00', NULL, '2ac8d522-31f8-43c8-b11f-a30f04c575c5'),
	('00000000-0000-0000-0000-000000000000', 222, 'benve5k72btd', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 09:46:35.910346+00', '2025-07-10 11:19:23.300413+00', 'wrzsogicbrdt', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 224, '3acqkqah7qrg', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 12:17:35.320661+00', '2025-07-10 13:15:40.736027+00', '4hradqr727j5', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 285, 'vs7cv6fxzswj', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 16:08:54.378026+00', '2025-07-21 01:18:38.559696+00', 'almhy6ouibeg', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 226, 'xxkvp6jh3wys', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 13:15:40.736746+00', '2025-07-10 14:14:10.768225+00', '3acqkqah7qrg', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 287, 'cwifjvxx5au3', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-21 02:25:20.036517+00', '2025-07-21 02:25:20.036517+00', NULL, 'f6df1cd1-8b0c-459e-9a16-98562d74ceaa'),
	('00000000-0000-0000-0000-000000000000', 228, '6hcrdup55fie', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-10 14:14:10.768935+00', '2025-07-11 01:32:10.222744+00', 'xxkvp6jh3wys', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 230, 'sxe5onreivh2', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 04:27:32.622753+00', '2025-07-11 05:25:42.370713+00', 'mzdbeo5itpzs', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 153, 'vygjgqr5hzvc', '6aea3115-bb2c-4038-9be0-944a1b728725', true, '2025-06-09 07:56:30.741665+00', '2025-06-09 13:29:52.750377+00', 'jlkekwzbz6zr', '09f25336-6957-4c2c-8ee2-416649bd3d41'),
	('00000000-0000-0000-0000-000000000000', 234, 'h4av2pcpj3lx', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 07:36:12.35538+00', '2025-07-11 08:34:18.534974+00', 'rmll4prufhyu', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 102, 'P8CQ-gsYgBJdoUP6Hr_NMg', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', false, '2025-05-11 22:38:59.917833+00', '2025-05-11 22:38:59.917833+00', NULL, '371cb6a9-b2f4-4557-9164-ec422164a0f7'),
	('00000000-0000-0000-0000-000000000000', 103, 'eJOfwBfDdEZve2PEKmUyYQ', 'a4b0a4bf-47a3-41f9-b829-6b4cfb3cf340', false, '2025-05-11 22:40:11.946854+00', '2025-05-11 22:40:11.946854+00', NULL, '517f7add-9a03-4d45-9c81-54ecb00e32de'),
	('00000000-0000-0000-0000-000000000000', 236, '6yhabjpyjltx', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 09:32:19.932331+00', '2025-07-12 02:08:04.43597+00', 'hijdn7tgh2bo', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 238, 'xmwdzvc2dygc', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-12 03:06:05.307231+00', '2025-07-12 04:04:28.237637+00', '2vutkesoqrm4', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 104, 'EPhbrNCaYtCgfeI7jwcJOQ', '8decc90a-0a8b-47cc-bb0f-610d3944145c', true, '2025-05-11 22:40:34.0111+00', '2025-05-12 07:24:05.189941+00', NULL, '24c550b4-8edc-499c-8492-48e3408f42ce'),
	('00000000-0000-0000-0000-000000000000', 107, '-YlnaDlPANyimHlxn3XQgw', '8decc90a-0a8b-47cc-bb0f-610d3944145c', true, '2025-05-12 07:24:05.198484+00', '2025-05-12 08:39:13.898108+00', 'EPhbrNCaYtCgfeI7jwcJOQ', '24c550b4-8edc-499c-8492-48e3408f42ce'),
	('00000000-0000-0000-0000-000000000000', 240, 'zncp4lyejvfz', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-13 04:00:51.032096+00', '2025-07-13 05:24:50.910297+00', 'nu7nxiytnzwb', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 242, 'agsamuzezk7q', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-14 01:43:20.915671+00', '2025-07-14 03:45:09.129981+00', 'ce26eycg2t2a', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 108, '-j8jj6ZVbQjFXiG0BKyeJg', '8decc90a-0a8b-47cc-bb0f-610d3944145c', true, '2025-05-12 08:39:13.903263+00', '2025-05-12 14:15:31.830333+00', '-YlnaDlPANyimHlxn3XQgw', '24c550b4-8edc-499c-8492-48e3408f42ce'),
	('00000000-0000-0000-0000-000000000000', 110, 'n5holkt3zpp2', '8decc90a-0a8b-47cc-bb0f-610d3944145c', false, '2025-05-12 14:15:31.839822+00', '2025-05-12 14:15:31.839822+00', '-j8jj6ZVbQjFXiG0BKyeJg', '24c550b4-8edc-499c-8492-48e3408f42ce'),
	('00000000-0000-0000-0000-000000000000', 232, 'o7ul4ueo6veu', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-11 05:45:12.812197+00', '2025-07-14 06:58:34.631949+00', 'nknud2vwnnfr', 'af1da428-0f22-4624-8b4c-a8a95fa93ef1'),
	('00000000-0000-0000-0000-000000000000', 244, 'rmu5qwclmw2d', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-14 06:58:34.632675+00', '2025-07-14 08:39:39.028861+00', 'o7ul4ueo6veu', 'af1da428-0f22-4624-8b4c-a8a95fa93ef1'),
	('00000000-0000-0000-0000-000000000000', 246, 'wy6jxr3eqmj7', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-14 08:36:53.555724+00', '2025-07-14 11:45:50.903769+00', 'cwkosrb3ndlf', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 248, 'wclbjaov2opn', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-14 11:45:50.90447+00', '2025-07-15 09:55:25.068462+00', 'wy6jxr3eqmj7', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 250, 'miywyuepsebb', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-15 09:12:19.327389+00', '2025-07-15 11:47:41.42254+00', 'toatgxz3cfka', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 252, 'y7x7pmlxzypw', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-15 11:47:41.423831+00', '2025-07-16 09:49:16.854414+00', 'miywyuepsebb', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 255, '3dtzwrcvro2g', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-16 09:49:16.854794+00', '2025-07-16 13:05:17.813023+00', 'y7x7pmlxzypw', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 254, 'n6bflsc4ov57', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-16 09:48:45.592945+00', '2025-07-17 11:42:08.301254+00', 'btnpuc4z45ev', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 259, 'qzicz7ihguxr', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-17 11:42:08.302038+00', '2025-07-17 15:28:50.837814+00', 'n6bflsc4ov57', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 257, 'nbieina3c3cc', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-17 03:43:52.199633+00', '2025-07-17 15:39:47.356731+00', 'whjmbx5vb476', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 261, 'rsygw7gj2tzy', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-17 15:28:50.838575+00', '2025-07-18 06:46:03.93339+00', 'qzicz7ihguxr', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 263, 'pxc5fra3hp4b', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 05:49:16.224105+00', '2025-07-18 06:52:19.558964+00', 'kav32y4glbt6', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 265, 'sse7vtczyvx7', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 06:52:19.559665+00', '2025-07-18 08:33:29.14913+00', 'pxc5fra3hp4b', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 267, '3waytzxc7mak', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 08:33:29.149783+00', '2025-07-18 09:33:53.82129+00', 'sse7vtczyvx7', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 271, 'm45gsdquboip', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 17:35:21.313882+00', '2025-07-19 03:09:26.337307+00', 'yqay6wtlirqs', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 273, 'sgbyvykzwp2i', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-19 17:40:43.739934+00', '2025-07-19 18:43:57.713898+00', 'jh7ovoaxmrk7', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 269, 'lvfd4eie7l6n', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-18 09:50:35.882873+00', '2025-07-20 07:35:35.746415+00', 'c4tyju5zxcay', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 275, 'zeng37mo2wio', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 07:03:12.750946+00', '2025-07-20 08:02:02.144516+00', NULL, 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 277, 'e7f7irk2rl35', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-20 08:02:02.14522+00', '2025-07-20 09:18:33.638098+00', 'zeng37mo2wio', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 288, 'p3c36qt3v22y', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 05:30:21.610673+00', '2025-07-21 06:38:07.51656+00', '27ju74rysdlj', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 289, 'k5ir4bsc3rsp', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 05:43:25.230748+00', '2025-07-21 06:58:55.051582+00', 'jbsschuur7pq', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 290, 'kp7hpi3pgzxm', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 06:38:07.5173+00', '2025-07-21 07:36:33.934445+00', 'p3c36qt3v22y', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 293, 'h7qjxldkcyxf', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 07:36:33.935158+00', '2025-07-21 08:56:30.187844+00', 'kp7hpi3pgzxm', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 294, 'ab7vmg6oajhe', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 08:56:30.188637+00', '2025-07-21 09:54:48.208752+00', 'h7qjxldkcyxf', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 295, '6ftnhunwkjja', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 09:54:48.209398+00', '2025-07-21 11:04:53.199838+00', 'ab7vmg6oajhe', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 296, 'hqdofddzkpky', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 11:04:53.20051+00', '2025-07-21 12:03:32.65202+00', '6ftnhunwkjja', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 297, 'du2hi7eprvax', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 12:03:32.652723+00', '2025-07-21 14:54:13.776599+00', 'hqdofddzkpky', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 298, 'vrxpk2ysrruk', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 14:54:13.777344+00', '2025-07-22 00:34:53.539052+00', 'du2hi7eprvax', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 299, '6hdoae3h5pag', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 00:34:53.539887+00', '2025-07-22 01:33:25.304478+00', 'vrxpk2ysrruk', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 300, 'tcge3vuqxou4', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 01:33:25.305199+00', '2025-07-22 02:31:47.593597+00', '6hdoae3h5pag', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 301, '2a57r4pu6h5p', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 02:31:47.594393+00', '2025-07-22 04:05:16.228793+00', 'tcge3vuqxou4', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 291, 'afpycaauafty', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 06:58:55.052353+00', '2025-07-22 04:07:51.356568+00', 'k5ir4bsc3rsp', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 302, 'dnkt7mtmliht', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 04:05:16.229626+00', '2025-07-22 05:26:20.724694+00', '2a57r4pu6h5p', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 304, 'hbigtegzdkxi', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 05:26:20.725488+00', '2025-07-22 06:24:45.209653+00', 'dnkt7mtmliht', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 305, 'xdlzvhq6g7rk', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 05:40:58.821299+00', '2025-07-22 06:41:37.555027+00', NULL, '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 306, 'fwifqdixexj3', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 06:24:45.210704+00', '2025-07-22 07:22:50.700404+00', 'hbigtegzdkxi', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 307, 'rm5kdkro3vas', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 06:41:37.555676+00', '2025-07-22 07:40:10.068676+00', 'xdlzvhq6g7rk', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 308, 'nwo6qra3br3d', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 07:22:50.701173+00', '2025-07-22 08:21:21.031016+00', 'fwifqdixexj3', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 309, 'ncrzf56pumfe', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 07:40:10.069485+00', '2025-07-22 08:38:36.804327+00', 'rm5kdkro3vas', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 310, 'zs54kmtpmw62', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 08:21:21.034534+00', '2025-07-22 09:31:37.182486+00', 'nwo6qra3br3d', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 311, 'pppcusqistpi', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 08:38:36.805965+00', '2025-07-22 09:38:56.204068+00', 'ncrzf56pumfe', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 312, '3cgmfrougzir', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 09:31:37.183273+00', '2025-07-22 10:29:57.57282+00', 'zs54kmtpmw62', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 313, '3cvmnlqiuap5', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 09:38:56.204765+00', '2025-07-22 10:36:59.737096+00', 'pppcusqistpi', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 315, '5brr6ckf2uk4', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 10:36:59.738683+00', '2025-07-22 12:29:22.887419+00', '3cvmnlqiuap5', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 314, 'jkali5ozumpz', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 10:29:57.574353+00', '2025-07-22 12:29:23.001748+00', '3cgmfrougzir', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 317, '5d7lkcvwzza7', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 12:29:23.002135+00', '2025-07-22 13:28:14.933077+00', 'jkali5ozumpz', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 318, 'zmfqkfripmn7', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-22 13:28:14.93385+00', '2025-07-22 13:28:14.93385+00', '5d7lkcvwzza7', 'b417352e-7114-43f5-aca4-1179b76b233c'),
	('00000000-0000-0000-0000-000000000000', 316, 'ivjbq5j4g6jg', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 12:29:22.888047+00', '2025-07-22 13:28:15.138125+00', '5brr6ckf2uk4', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 303, 'ioiknhs3pftb', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 04:07:51.357359+00', '2025-07-22 14:00:57.319731+00', 'afpycaauafty', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 319, 'yioeqqeskkna', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 13:28:15.138612+00', '2025-07-22 14:37:37.391113+00', 'ivjbq5j4g6jg', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 321, 'tloirp6nplqz', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 14:37:37.391788+00', '2025-07-22 15:36:03.797627+00', 'yioeqqeskkna', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 320, 'ppwwy7r4lb6l', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 14:00:57.320396+00', '2025-07-22 16:29:57.632438+00', 'ioiknhs3pftb', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 322, '6fgvyr6hzwwh', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 15:36:03.798512+00', '2025-07-22 16:34:35.749045+00', 'tloirp6nplqz', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 324, 'obczz6jkohsn', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 16:34:35.749855+00', '2025-07-23 02:13:59.789625+00', '6fgvyr6hzwwh', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 325, 'saqwcqa4vmvq', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 02:13:59.790453+00', '2025-07-23 03:12:06.714733+00', 'obczz6jkohsn', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 326, '3ivc57jcwwrg', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 03:12:06.717057+00', '2025-07-23 04:10:33.335203+00', 'saqwcqa4vmvq', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 327, '7xrber2gc7v2', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 04:10:33.33597+00', '2025-07-23 05:39:46.251801+00', '3ivc57jcwwrg', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 323, '3sfnhe7biltw', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-22 16:29:57.633238+00', '2025-07-23 06:20:21.797314+00', 'ppwwy7r4lb6l', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 328, 'aqexwuyhicaq', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 05:39:46.252486+00', '2025-07-23 06:37:51.461329+00', '7xrber2gc7v2', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 329, 'mpmoizbcax5z', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 06:12:50.224739+00', '2025-07-23 07:13:41.307706+00', 'j7nk42sambey', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 331, 'pb4nkkmnkn4o', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 06:37:51.46219+00', '2025-07-23 07:35:59.870791+00', 'aqexwuyhicaq', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 330, 'b5smva2gbhvw', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 06:20:21.798927+00', '2025-07-23 08:19:27.723431+00', '3sfnhe7biltw', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 333, 'xu5lq7piytwy', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 07:35:59.871525+00', '2025-07-23 08:34:49.754464+00', 'pb4nkkmnkn4o', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 335, 'pyxsp67piyp7', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 08:34:49.755161+00', '2025-07-23 11:03:19.175277+00', 'xu5lq7piytwy', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 332, 'u5ykboazzrlm', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 07:13:41.308404+00', '2025-07-23 11:14:29.83755+00', 'mpmoizbcax5z', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 336, 'jf6ncldsrf7a', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 11:03:19.176118+00', '2025-07-23 12:01:42.193441+00', 'pyxsp67piyp7', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 337, '2bl6s6b77mmq', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 11:14:29.838347+00', '2025-07-23 13:08:36.242273+00', 'u5ykboazzrlm', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 334, 'ctl2xfo3hybh', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 08:19:27.724187+00', '2025-07-23 15:39:25.542843+00', 'b5smva2gbhvw', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 292, 'z5jrv56mhygn', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-21 06:58:57.660592+00', '2025-07-23 15:44:59.847592+00', 'a4k4wyat3zhc', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 368, '2sgw4c42vlfo', '193662fa-838e-4aa4-9921-b8ca7d141dd0', true, '2025-07-30 12:52:27.901001+00', '2025-07-30 17:15:48.314057+00', 'urj4fcgyxfz7', '3f19dd97-7068-49ff-9791-fd5bac7a04d7'),
	('00000000-0000-0000-0000-000000000000', 338, 'pk6lndqs677r', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 12:01:42.1944+00', '2025-07-23 13:08:21.357908+00', 'jf6ncldsrf7a', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 365, '5w7ehlqz7dim', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-29 16:31:32.479992+00', '2025-07-30 17:35:16.858634+00', '345yecduv6vb', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 339, 's2me7kdiryxq', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 13:08:21.358651+00', '2025-07-23 14:08:14.609561+00', 'pk6lndqs677r', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 340, 'pn5lvq6mgorc', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 13:08:36.242624+00', '2025-07-23 14:08:14.721679+00', '2bl6s6b77mmq', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 342, 'hoizrhaj4wic', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-23 14:08:14.72206+00', '2025-07-23 14:08:14.72206+00', 'pn5lvq6mgorc', '8db2c5d0-a859-4afb-8a7c-4207964aa34f'),
	('00000000-0000-0000-0000-000000000000', 343, 'vpnjzb64aik5', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 15:39:25.543594+00', '2025-07-23 16:49:00.420995+00', 'ctl2xfo3hybh', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 345, '2y7eowmrq7kn', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 16:49:00.422144+00', '2025-07-24 02:26:18.272505+00', 'vpnjzb64aik5', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 346, 'kfs2mmlbfm64', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-24 02:26:18.273144+00', '2025-07-24 03:36:48.96444+00', '2y7eowmrq7kn', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 347, 'rmr4vexcolwx', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-24 03:36:48.965211+00', '2025-07-24 04:44:04.722442+00', 'kfs2mmlbfm64', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 344, 'ougunmazlltb', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 15:44:59.848309+00', '2025-07-24 04:44:05.291826+00', 'z5jrv56mhygn', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 350, 'sgbnvz4rqojv', '9ebb1923-c51c-4c54-9a5c-b416a86e4bde', false, '2025-07-24 21:43:10.737066+00', '2025-07-24 21:43:10.737066+00', NULL, '86179f04-627b-40a0-bbb5-f5469b09f1f7'),
	('00000000-0000-0000-0000-000000000000', 348, 'kgvvowojswdv', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-24 04:44:04.723149+00', '2025-07-27 16:44:35.395133+00', 'rmr4vexcolwx', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 352, 'qmewwaaapx5s', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-28 09:18:53.194428+00', '2025-07-28 11:00:32.895327+00', NULL, '264de258-57ce-47b9-8f09-96f98472078b'),
	('00000000-0000-0000-0000-000000000000', 349, 'azyyvdz4e3wn', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-24 04:44:05.292179+00', '2025-07-28 11:41:53.365274+00', 'ougunmazlltb', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 354, 'vzfhreve3bm2', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-28 11:41:53.366047+00', '2025-07-28 14:15:02.993914+00', 'azyyvdz4e3wn', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 353, 'rjn5jncakdce', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-28 11:00:32.895969+00', '2025-07-28 14:34:17.844489+00', 'qmewwaaapx5s', '264de258-57ce-47b9-8f09-96f98472078b'),
	('00000000-0000-0000-0000-000000000000', 356, 'k2aqsyuv4mhs', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-28 14:34:17.845882+00', '2025-07-28 14:34:17.845882+00', 'rjn5jncakdce', '264de258-57ce-47b9-8f09-96f98472078b'),
	('00000000-0000-0000-0000-000000000000', 357, 'oawsvvk3n3yx', 'fac3dfd3-d445-4200-8069-8b96293d81eb', false, '2025-07-28 16:22:05.416435+00', '2025-07-28 16:22:05.416435+00', NULL, '5f3a0a1c-c107-45e5-be7a-0ecdf3971427'),
	('00000000-0000-0000-0000-000000000000', 351, 'vp3whokxfpin', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-27 16:44:35.399615+00', '2025-07-28 17:10:59.347304+00', 'kgvvowojswdv', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 358, 'tqi5jlpvm5gi', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-28 17:10:59.34797+00', '2025-07-29 05:52:46.571293+00', 'vp3whokxfpin', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 355, '55d5xvn6yvem', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-28 14:15:02.994824+00', '2025-07-29 05:53:46.165577+00', 'vzfhreve3bm2', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 359, 'ih3if7ytirwh', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-29 05:52:46.572091+00', '2025-07-29 08:52:13.533379+00', 'tqi5jlpvm5gi', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 360, 'njfpyuyx6l44', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-29 05:53:46.165998+00', '2025-07-29 09:08:56.158371+00', '55d5xvn6yvem', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 362, 'gimqemxcnt4f', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-29 09:08:56.159059+00', '2025-07-29 09:08:56.159059+00', 'njfpyuyx6l44', 'a4e40e84-f77b-494f-851d-1781ba85bb9a'),
	('00000000-0000-0000-0000-000000000000', 341, 'icqwvxllmmam', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-23 14:08:14.610372+00', '2025-07-29 12:25:12.45457+00', 's2me7kdiryxq', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 363, 'xi6j6jmi5zn4', '2c956050-3a2b-4de4-9e39-942b9ee9f402', false, '2025-07-29 12:25:12.455489+00', '2025-07-29 12:25:12.455489+00', 'icqwvxllmmam', '89bb2d5c-b6a7-47b4-97d8-f6b1a6ec2fa9'),
	('00000000-0000-0000-0000-000000000000', 361, 'w7v6virher22', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-29 08:52:13.534197+00', '2025-07-29 12:58:24.030956+00', 'ih3if7ytirwh', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 364, '345yecduv6vb', '2c956050-3a2b-4de4-9e39-942b9ee9f402', true, '2025-07-29 12:58:24.031887+00', '2025-07-29 16:31:32.479223+00', 'w7v6virher22', '7f718320-549d-4c0f-99d2-85d8b2f56175'),
	('00000000-0000-0000-0000-000000000000', 367, '4mkt7kkttvqk', '5467024d-3060-46b4-8437-60864306903b', false, '2025-07-30 03:55:23.854751+00', '2025-07-30 03:55:23.854751+00', NULL, '38b4dc82-5ae7-4a33-880e-224a6aa6719f'),
	('00000000-0000-0000-0000-000000000000', 366, 'urj4fcgyxfz7', '193662fa-838e-4aa4-9921-b8ca7d141dd0', true, '2025-07-30 00:02:43.829447+00', '2025-07-30 12:52:27.898718+00', NULL, '3f19dd97-7068-49ff-9791-fd5bac7a04d7');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: algorithms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."algorithms" ("id", "slug", "name", "description", "use_cases", "quantum_advantage", "published", "created_at", "updated_at", "main_content", "published_at", "steps", "academic_references", "is_system_record") VALUES
	('edd5722d-9749-4ec9-b4a1-46f0d855814e', 'quantum-amplitude-estimation', 'Quantum Amplitude Estimation (QAE)', 'TBD', '{}', 'TBD', false, '2025-07-10 09:23:44.711814+00', '2025-07-10 09:23:44.711814+00', 'TBD', NULL, 'TBD', '[^1]: TBD', false),
	('fc004b90-0a4a-4c57-88da-50fbf4e00d36', 'shors-algorithm', 'Shor''s Algorithm', 'Shor''s Algorithm is a quantum algorithm that efficiently finds the prime factors of large integers, a capability that could break many widely used public-key cryptography systems.', '{Cryptanalysis,"Number Theory","Security Research",Encryption,Cybersecurity,"Mathematical Research","Code Breaking",Cryptography}', 'TBD', true, '2025-04-28 06:19:10.115741+00', '2025-07-23 13:44:58.605449+00', 'Shor''s algorithm is the most famous, and perhaps even infamous, of the family of quantum algorithms. It might not have been the first, but it has become the first-to-mind example in any discussion of the topic due to the very understandable nature of its potential impact on the world. Along with just a little of the paranoia and hype that surrounds quantum computing in the public eye.

The algorithm was developed by Peter Shor in 1994 [^1], and demonstrated the potential of quantum computers to solve certain problems exponentially faster than classical computers. It quickly became such an influential quantum algorithm due to the potential impact on cryptography and its demonstration of quantum acceleration in a real-world problem space.

## Historical Context 

Shor''s algorithm emerged at a pivotal moment in quantum computing history. When Peter Shor published his groundbreaking paper "Algorithms for Quantum Computation: Discrete Logarithms and Factoring" in 1994, the field of quantum computing was still in its theoretical infancy. Just a decade earlier, physicist Richard Feynman had proposed the initial concept of quantum computers, suggesting that quantum systems might be better at simulating quantum physics than classical computers.

The early 1990s had seen important developments in quantum computing theory, including David Deutsch''s work on quantum gates and quantum Turing machines. However, these developments were largely of theoretical interest to physicists and computer scientists. What quantum computing lacked was a "killer application" – a problem of practical significance where quantum computers could demonstrably outperform classical computers.

Shor''s algorithm provided exactly this breakthrough. It was the first quantum algorithm to demonstrate an exponential speedup over the best-known classical algorithms for a problem with enormous practical relevance: integer factorisation. The ability to efficiently factor large numbers had profound implications for cryptography, particularly for the widely-used RSA encryption system, which bases its security on the presumed difficulty of this task.

The impact of Shor''s discovery was immediate and far-reaching. It transformed quantum computing from an abstract theoretical curiosity into a field with potentially revolutionary real-world implications. Cryptography experts began considering post-quantum cryptographic standards, while experimental physicists intensified their efforts to build actual quantum computing hardware that might one day run Shor''s algorithm at scale.

There''s no question that Shor''s algorithm represents a watershed moment that catalysed a mix of increased funding, research attention, and public awareness. It demonstrated that quantum computers weren''t just theoretical constructs, but potentially powerful tools that could solve problems previously thought to be computationally intractable. This historical significance explains why Shor''s algorithm remains the most widely recognized quantum algorithm, even nearly three decades after its initial publication.

## Problem Target

The significance of Shor''s algorithm lies in its ability to solve the integer factorisation problem exponentially faster than the best-known classical algorithms2. Many widely used public-key cryptography systems, such as RSA and Diffie-Hellman, rely on the assumption that factoring large integers is computationally infeasible3. However, Shor''s algorithm shows that a sufficiently powerful quantum computer could break these cryptographic systems in polynomial time, posing a serious threat to their security4.

## Quantum Approach

At its core, Shor''s algorithm relies on the Quantum Fourier Transform (QFT) and Quantum Phase Estimation (QPE) to find the period of a modular exponential function5.

## Practical Applications 

The efficiency of Shor''s algorithm comes from its ability to exploit quantum parallelism and quantum interference to perform the modular exponentiation and QFT steps in a way that is exponentially faster than classical methods8. By using a quantum computer to factor large integers, Shor''s algorithm can achieve a time complexity of O((log N)³), compared to the best-known classical algorithms, which have a sub-exponential time complexity of O(exp((log N)^(1/3) (log log N)^(2/3))).

The potential impact of Shor''s algorithm has led to a surge of interest in post-quantum cryptography, which aims to develop classical cryptographic systems that are secure against attacks by both classical and quantum computers9. This includes the development of new cryptographic primitives based on mathematical problems that are believed to be hard for both classical and quantum computers, such as lattice-based cryptography and multivariate cryptography.

In addition to its implications for cryptography, Shor''s algorithm has also inspired further research into quantum algorithms and quantum computing overall. It has led to the development of other important quantum algorithms, such as the Quantum Amplitude Amplification and the Quantum Counting algorithms, which have applications in various fields beyond cryptography.

## Implementation Challenges 

When it comes to real-world use, it’s the algorithm''s hunger for qubits that presents the primary challenge. Factoring a number with n bits is generally assumed to require approximately 2n qubits of sufficient quality. The exact number depends on the implementation and algorithm variations but it serves as a useful rule of thumb to illustrate that a 2048-bit RSA key would likely require about 4096 qubits to factor it.

Now we must also account for the fragility of quantum states requiring extensive quantum error correction, further inflating the number of physical qubits required, potentially by orders of magnitude10. This also ties into the challenge of coherence time; the quantum system must maintain coherence throughout the computation, a feat that becomes increasingly difficult as the size of the number to be factored grows.

Gate fidelity poses another hurdle. Shor''s algorithm demands a large number of quantum gates applied with high precision, a requirement that strains current quantum hardware capabilities. As the size of the target number increases, the resources required by the algorithm scale up rapidly, creating significant scalability issues.

Outside of these functional issues, we can also appreciate that while Shor''s algorithm is powerful for factoring and solving discrete logarithms, its speedup doesn''t generalize to all computational problems. Its applicability is limited to specific mathematical challenges. And the algorithm relies on non-trivial classical post-processing, which can be computationally intensive for large numbers.

The sheer complexity of implementing Shor''s algorithm on actual quantum hardware cannot be overstated. It requires precise control and manipulation of quantum states, which is a formidable challenge even for advanced quantum systems11.

These limitations collectively mean that while Shor''s algorithm poses a theoretical threat to certain cryptographic systems, practically breaking widely-used cryptographic keys remains out of reach for current and near-term quantum computers.

## Bottom Line 

Shor''s algorithm is a seminal quantum algorithm that demonstrates the potential of quantum computing to solve certain problems exponentially faster than classical computers. While its practical implementation remains a challenge, its theoretical importance and impact on cryptography and quantum computing research is foundational (and well worth your knowing). As quantum hardware continues to improve and scale up, Shor''s algorithm will likely play a crucial role in shaping the future of cryptography and computing
', NULL, '<step title="Quantum state preparation">
The algorithm starts by preparing a superposition of quantum states that encode the integers from 0 to N-1, where N is the number to be factored.
</step>

 <step title="Modular exponentiation">
A unitary operation is applied to the quantum state, which performs modular exponentiation of a randomly chosen integer with respect to the input state. This operation creates a periodic structure in the quantum state. This step is performed efficiently using controlled quantum operations, a key advantage of quantum computation6.
</step>

 <step title="Quantum Fourier Transform">
The Quantum Fourier Transform, a cornerstone of many quantum algorithms, is then applied to the first register. This transformation reshapes the quantum state, redistributing the probabilities associated with each possible measurement outcome. The resulting state encodes crucial information about the period of the modular exponentiation function7.
</step>

 <step title="Measurement">
The quantum state is measured, collapsing it to a classical state that contains information about the period. Due to the probabilistic nature of quantum measurements, steps 2-4 may need to be repeated multiple times to obtain a reliable estimate of the period.
</step>

 <step title="Classical post-processing">
The measured period is used to compute a factor of the original number N using classical algorithms, such as the continued fractions algorithm or the Euclidean algorithm. This step is probabilistic and may need to be repeated if it fails to find a non-trivial factor.
</step>


', '[^1]: Shor, P. W. (1994). Algorithms for quantum computation: Discrete logarithms and factoring. Proceedings 35th Annual Symposium on Foundations of Computer Science, 124-134. 

[^2]: Lenstra, A. K., & Verheul, E. R. (2001). Selecting cryptographic key sizes. Journal of Cryptology, 14(4), 255-293. 

[^3]: Rivest, R. L., Shamir, A., & Adleman, L. (1978). A method for obtaining digital signatures and public-key cryptosystems. Communications of the ACM, 21(2), 120-126. 

[^4]: Gidney, C., & Ekerå, M. (2021). How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits. Quantum, 5, 433. 

[^5]: Coppersmith, D. (1994). An approximate Fourier transform useful in quantum factoring. IBM Research Report, RC19642. 

[^6]: Beauregard, S. (2003). Circuit for Shor''s algorithm using 2n+3 qubits. Quantum Information & Computation, 3(2), 175-185. 7. Hales, L., & Hallgren, S. (2000). An improved quantum Fourier transform algorithm and applications. Proceedings 41st Annual Symposium on Foundations of Computer Science, 515-525. 

[^8]: Ekert, A., & Jozsa, R. (1996). Quantum computation and Shor''s factoring algorithm. Reviews of Modern Physics, 68(3), 733.

[^ 9]: Bernstein, D. J., & Lange, T. (2017). Post-quantum cryptography. Nature, 549(7671), 188-194. 

10. Fowler, A. G., Mariantoni, M., Martinis, J. M., & Cleland, A. N. (2012). Surface codes: Towards practical large-scale quantum computation. Physical Review A, 86(3), 032324. 

11. Häner, T., Roetteler, M., & Svore, K. M. (2017). Factoring using 2n+2 qubits with Toffoli based modular multiplication. Quantum Information & Computation, 17(7-8), 673-684. ', false),
	('95d262a3-8d0f-4c84-9c16-f1fc343ae212', 'simons-algorithm', 'Simon''s Algorithm', 'Simon''s algorithm efficiently solves the hidden subgroup problem, demonstrating exponential speedup over classical methods by finding a hidden binary string pattern in a black-box function.', '{Benchmarking,"Pattern Recognition","Function Analysis","Security Analysis","Hidden Structure Discovery",Cryptography,"Mathematical Research","Information Theory"}', 'TBD', true, '2025-04-21 15:04:25.659719+00', '2025-07-23 13:47:23.302522+00', 'Simon''s algorithm, developed by Daniel Simon in 1994, is a quantum algorithm that solves a specific problem exponentially faster than the best-known classical algorithm[^1]. The problem, known as Simon''s problem, is a special case of the more general hidden subgroup problem, which has important applications in cryptography and other areas of computer science.

## Problem Target

Simon''s problem can be formulated as follows: given a black-box function f(x) that maps an n-bit binary string x to an n-bit binary string y, find a non-zero n-bit string s such that f(x) = f(y) if and only if x ⊕ y = s or x = y, where ⊕ denotes the bitwise XOR operation. In other words, the function f(x) is promised to be either one-to-one or two-to-one, with the latter case having a specific structure determined by the string s.

## Quantum Approach 

Classically, solving Simon''s problem requires Ω(2^(n/2)) queries to the black-box function, as the algorithm needs to find a collision (i.e., two distinct inputs that map to the same output) to determine the string s. However, Simon''s algorithm can solve the problem using only O(n) queries to a quantum oracle that implements the function f(x)2.

## Practical Applications 

Simon''s algorithm achieves an exponential speedup over classical algorithms by exploiting the properties of quantum superposition and entanglement4. The quantum oracle creates a superposition of input-output pairs, which allows the algorithm to probe the structure of the function f(x) in parallel. The final measurement and classical post-processing steps extract the information about the string s from the quantum state.

Simon''s algorithm has important implications for cryptography, as it demonstrates the potential of quantum computers to break certain classical cryptographic schemes that rely on the hardness of finding collisions in two-to-one functions. In particular, Simon''s algorithm inspired the development of Shor''s algorithm for factoring large integers, which poses a threat to the widely-used RSA cryptographic system5.

Simon''s algorithm has been experimentally demonstrated on various quantum computing platforms, including nuclear magnetic resonance (NMR), superconducting, and photonic qubits. These experimental realisations have validated the principles of the algorithm and have paved the way for the development of more complex quantum algorithms.

## Implementation Challenges

The algorithm''s scope is confined to a specific problem domain. It excels at identifying a hidden bit string ''s'' given a particular type of function with a certain structure. While demonstrating exponential speedup in this scenario, it doesn''t directly translate to solving arbitrary computational problems6.

Simon''s algorithm, like many quantum algorithms, relies on the existence of a quantum oracle capable of evaluating the function efficiently. While such oracles are theoretically possible, constructing them for real-world scenarios can be a daunting task. Consequently, Simon''s algorithm finds limited practical applications beyond showcasing the theoretical potential of quantum computing. Its real-world relevance is currently constrained by its narrow focus and the challenge of constructing suitable oracles. Furthermore, the algorithm is susceptible to errors stemming from noise and decoherence in quantum systems. These errors can accumulate as the problem size grows, affecting the accuracy and reliability of the results7.

## Bottom Line 

Simon''s algorithm is a quantum algorithm that solves a specific problem exponentially faster than the best-known classical algorithm. It demonstrates the power of quantum computing in tackling certain problems with a clear quantum advantage and has important implications for cryptography and other areas of computer science. Simon''s algorithm has also inspired further research in quantum algorithms and has contributed to the development of more advanced quantum algorithms, such as Shor''s algorithm.

', '2025-04-21 15:05:22.976+00', '<step title="State preparation">
Initialise an n-qubit quantum state |ψ⟩ in the |0⟩ state and an n-qubit ancilla register in the |0⟩ state.
</step>

<step title="Apply Hadamard gates">
Apply a Hadamard gate to each of the n qubits in the |ψ⟩ state. This creates a superposition of all possible n-bit strings.
</step>

<step title="Oracle query">
Apply the quantum oracle that implements the function f(x) to the |ψ⟩ state and the ancilla register. The oracle performs the following transformation: |x⟩|0⟩ → |x⟩|f(x)⟩ which entangles the |ψ⟩ state with the ancilla register, encoding the structure of the function f(x) into the quantum state3.
</step>

<step title="Measure the ancilla register">
Measure the ancilla register in the computational basis and discard the result. This step disentangles the |ψ⟩ state from the ancilla register and collapses the quantum state into a superposition of input strings that map to the same output string.
</step>

<step title="Apply Hadamard gates.">
Apply a Hadamard gate to each of the n qubits in the |ψ⟩ state. This step transforms the quantum state into a superposition of states that encode information about the string s.
</step>

<step title="Step Title">
6. Measure the state. Measure the |ψ⟩ state in the computational basis, obtaining an n-bit string y.
</step>

<step title="Step Title">
7. Classical post-processing. Repeat steps 1-6 O(n) times to obtain a set of n-bit strings {y_i}. Solve the system of linear equations y_i · s = 0 (mod 2) to determine the string s.
</step>', '[^1]: Simon, D. R. (1997). On the power of quantum computation. SIAM Journal on Computing, 26(5), 1474-1483. 

[^2]: Jozsa, R. (2001). Quantum factoring, discrete logarithms, and the hidden subgroup problem. Computing in Science & Engineering, 3(2), 34-43. 

[^3]: Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information. Cambridge University Press. 

[^4]: Bennett, C. H., Bernstein, E., Brassard, G., & Vazirani, U. (1997). Strengths and weaknesses of quantum computing. SIAM Journal on Computing, 26(5), 1510-1523. 

[^5]: Shor, P. W. (1994). Algorithms for quantum computation: Discrete logarithms and factoring. Proceedings 35th Annual Symposium on Foundations of Computer Science, 124-134. 

[^6]: Aaronson, S., & Ambainis, A. (2009). The need for structure in quantum speedups. Theory of Computing, 10(6), 133-166. 7. Preskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79. 
', false),
	('f4d3ea16-2aae-4a17-8280-08b769db955c', 'quantum-k-means-clustering', 'Quantum K-Means Clustering', 'Quantum K-Means Clustering is the quantum counterpart of the classical K-Means algorithm, an unsupervised machine learning technique used to partition a dataset into a pre-defined number of ''K'' clusters based on similarity.', '{Evaluation,"Recommendation Systems","Data Analytics","Market Segmentation","Image Processing","Medical Research","Customer Analytics",Genomics}', 'TBD', true, '2025-04-28 06:10:34.625063+00', '2025-07-23 14:02:05.336942+00', 'Quantum K-Means Clustering is a quantum version of the classical K-Means clustering algorithm, which is a popular unsupervised machine learning technique used for partitioning a dataset into K clusters[^1]. The goal of K-Means is to find the optimal centroid locations that minimize the total distance between each data point and its nearest centroid.

## Problem Target

The quantum version of K-Means aims to exploit the power of quantum computing to perform the clustering task more efficiently than classical algorithms, particularly for high-dimensional and large-scale datasets2. The key idea behind Quantum K-Means is to use quantum states and quantum operations to represent the data points and centroids, and to compute the distances and update the cluster assignments more efficiently than classical methods.

Quantum Approach QKMC typically starts by encoding the classical data points into quantum states3. This can be done using various encoding techniques, such as amplitude encoding or basis encoding. Once the data is encoded, quantum operations are used to manipulate the quantum states and compute distances between data points.

One key aspect of QKMC is the utilisation of quantum distance measures. Quantum computers can use the phenomena of quantum superposition and interference to calculate distances between quantum states more efficiently than classical methods in some cases4. This quantum advantage is especially pronounced when dealing with high-dimensional data or complex distance metrics.

Another crucial element of QKMC is the centroid update procedure. Similar to classical K-Means, QKMC iteratively updates the cluster centroids to minimize the distance between data points and their assigned centroids. However, quantum algorithms like Quantum Phase Estimation (QPE) or Variational Quantum Eigensolver (VQE) can be employed to perform these updates more efficiently in certain scenarios[^5].

Overall, QKMC holds the promise of improving clustering tasks for large datasets and complex distance measures. However, it''s important to note that QKMC is still an active research area, and its practical advantages depend on the specific problem and the available quantum hardware. As quantum technology progresses, QKMC is expected to play an increasingly important role in data analysis and machine learning applications.

## Practical Applications

The potential advantages of Quantum K-Means over classical K-Means starts with the speedup. For certain types of datasets and distance metrics, Quantum K-Means can provide a polynomial or even exponential speedup over classical K-Means, in terms of the number of distance calculations and the overall clustering time7. This is due to the ability of quantum computers to perform certain operations, such as inner products and matrix multiplications, more efficiently than classical computers.

The improved accuracy is another advantage to explore. Quantum K-Means may be able to find better clustering solutions than classical K-Means, by exploring a larger space of possible centroid configurations and avoiding local optima. Quantum K-Means can also potentially reduce the amount of data movement and communication required for distributed or parallel clustering, by encoding the data points and centroids into quantum states and performing the distance calculations and updates locally on each quantum processor.

## Implementation Challenges

Once again we face the challenges of efficient data encoding. Developing the effective and efficient methods for encoding large-scale and high-dimensional classical data into quantum states, while preserving the relevant features and geometries, poses practical challenges. So does designing quantum subroutines for computing distances and similarities between quantum states that can be efficiently implemented on near-term quantum hardware with limited qubit count and gate fidelity. Not to mention the challenge of designing robust Quantum K-Means algorithms that can operate in the presence of noise and errors in the quantum hardware, using techniques such as error mitigation and quantum error correction.

Over on the integration side of things, more work needs to be done in exploring hybrid quantum-classical approaches that combine Quantum K-Means with classical machine learning techniques (such as dimensionality reduction, feature selection, and ensemble clustering) to make the most of the strengths of both paradigms.

Experimental demonstrations of Quantum K-Means have been reported on various quantum computing platforms, including superconducting qubits and quantum simulators, showing promising results for small-scale datasets. However, the scalability and performance of Quantum K-Means on larger and more realistic datasets remain open research questions.

## Bottom Line 

Quantum K-Means Clustering is a promising application of quantum computing for unsupervised machine learning, particularly for partitioning high-dimensional and large-scale datasets into meaningful clusters. By applying the power of quantum states and quantum operations to represent the data points and centroids, and to compute the distances and update the cluster assignments more efficiently than classical methods, Quantum K-Means has the potential to provide significant speedups and improved accuracy compared to classical K-Means. 

However, significant research efforts are still needed to address the challenges of efficient data encoding, scalable distance metrics, noise-resilient clustering, and integration with classical machine learning techniques, before Quantum K-Means can be deployed in real-world scenarios. As quantum technologies continue to advance, Quantum K-Means is expected to play an important role in the emerging field of quantum-enhanced data analytics and pattern recognition.', NULL, 'Implementation Steps The algorithm can be broken down into several key steps:
1. Data encoding. The input data points are encoded into quantum states, typically using amplitude encoding or qubit encoding. In amplitude encoding, each data point is represented by a quantum state, where the amplitudes of the basis states correspond to the feature values. In qubit encoding, each feature is assigned to a qubit, and the feature values are encoded in the qubit states.
2. Centroid initialisation. The initial centroids are chosen randomly or based on some heuristic, and encoded into quantum states using the same encoding scheme as the data points.
3. Distance calculation. The distances between each data point and each centroid are computed using a quantum subroutine, such as the Swap Test or the Hadamard Test6. These subroutines can estimate the inner product or the euclidean distance between two quantum states more efficiently than classical methods, by exploiting the quantum parallelism and interference effects.
4. Cluster assignment. Each data point is assigned to the nearest centroid based on the computed distances, using a quantum measurement operation. The measurement outcomes are used to update the classical cluster assignments.
5. Centroid update. The centroids are updated based on the new cluster assignments, by computing the mean or median of the data points in each cluster using a quantum subroutine, such as the Quantum Arithmetic Mean or the Quantum Median Estimation.
Steps three to five are repeated until the centroids converge or a maximum number of iterations is reached. After the algorithm terminates, the final cluster assignments and centroids are obtained by measuring the quantum states and post-processing the results.', '[^ 1]: Lloyd, S., Garnerone, S., & Zanardi, P. (2016). Quantum algorithms for topological and geometric analysis of data. Nature Communications, 7(1), 10138. 

[^2]: Kerenidis, I., Landman, J., Luongo, A., & Prakash, A. (2019). q-means: A quantum algorithm for unsupervised machine learning. In Advances in Neural Information Processing Systems (pp. 4134-4144). 

[^3]: Wiebe, N., Kapoor, A., & Svore, K. M. (2015). Quantum algorithms for nearest-neighbor methods for supervised and unsupervised learning. Quantum Information & Computation, 15(3-4), 316-356. 

[^4]: Buhrman, H., Cleve, R., Watrous, J., & De Wolf, R. (2001). Quantum fingerprinting. Physical Review Letters, 87(16), 167902.

[^ 5]: Otterbach, J. S., Manenti, R., Alidoust, N., Bestwick, A., Block, M., Bloom, B., ... & Neven, H. (2017). Unsupervised machine learning on a hybrid quantum processor. arXiv preprint arXiv:1712.05771. 

[^6]: Lloyd, S., Mohseni, M., & Rebentrost, P. (2013). Quantum principal component analysis. Nature Physics, 9(10), 631-633. 

[^7]: Aïmeur, E., Brassard, G., & Gambs, S. (2013). Quantum speed-up for unsupervised learning. Machine Learning, 90(2), 261-287. ', false),
	('758dbf16-2b51-4c12-8351-1512a7f5ae03', 'deutsch-jozsa', 'Deutsch-Jozsa Algorithm', 'The Deutsch-Jozsa algorithm solves the problem of determining if a black-box function is constant or balanced in a single query, offering an exponential speedup compared to classical deterministic approaches.', '{"Algorithm Theory","Computer Science","Mathematical Research","Complexity Theory","Boolean Functions","Quantum Computing Theory","Educational Research","Information Theory"}', '', true, '2025-04-21 13:32:20.191392+00', '2025-07-23 11:20:45.099555+00', 'The Deutsch-Jozsa algorithm was developed by David Deutsch and Richard Jozsa in 1992 [^1] . It is one of the earliest examples of a quantum algorithm that demonstrates an exponential speedup over classical algorithms for a specific problem. Although the problem it solves is somewhat artificial, the Deutsch-Jozsa algorithm is of great theoretical importance as it provides a clear example of the power of quantum computing and has inspired further research in the field.

## Problem Target

 The problem addressed by the Deutsch-Jozsa algorithm is as follows: given a function f that takes an n-bit binary string as input and returns either 0 or 1, determine whether the function is constant (returns the same value for all inputs) or balanced (returns 0 for exactly half of the inputs and 1 for the other half). The function is guaranteed to be either constant or balanced.

Classically, the only way to solve this problem with certainty is to evaluate the function for all 2n possible inputs, which requires 2n function evaluations. However, the Deutsch-Jozsa algorithm can solve this problem using only one function evaluation on a quantum computer, demonstrating an exponential speedup over classical methods [^2].

## Quantum Approach 

The Deutsch-Jozsa algorithm displays a fundamental quantum computing strategy, namely the use of quantum superposition and interference to extract global properties of a function efficiently3. Unlike classical algorithms that must examine individual inputs separately, this quantum approach allows for the simultaneous evaluation of a function across its entire input space. By encoding the function''s behaviour into the phases of a quantum state and then using interference effects, the algorithm can distill information about the overall nature of the function—specifically, whether it''s constant or balanced—without needing to know its value for any specific input4. 

## Practical Applications 

The Deutsch-Jozsa algorithm has played a crucial role in the development of quantum computing theory5. It has served as a foundation for more advanced quantum algorithms, such as Simon''s algorithm and Shor''s algorithm, which have significant implications for cryptography and other fields.

The Deutsch-Jozsa algorithm has been experimentally demonstrated on various quantum computing platforms, including nuclear magnetic resonance (NMR), linear optics, and superconducting qubits6. These experimental realisations have helped to validate the principles of quantum computing and have paved the way for the development of more complex quantum algorithms and hardware.

## Implementation Challenges 

The Deutsch-Jozsa algorithm, while theoretically significant, has several limitations that restrict its practical utility. Primarily, the problem it solves—determining whether a function is constant or balanced—is rather artificial and rarely encountered in real-world applications7. The algorithm also requires the function to be implemented as a quantum oracle, which can be challenging for complex functions. And it only provides a speedup for functions that are guaranteed to be either constant or balanced. So for functions that might be neither, the algorithm loses its advantage.

From a broader perspective, the algorithm''s impact is (like all the algorithms you’re encountering here) limited by the current state of quantum hardware. It requires a fault-tolerant quantum computer to fully realise its potential, which is not yet available. Additionally, for small input sizes where classical computers can efficiently solve the problem, the overhead of quantum state preparation and measurement may outweigh the benefits of the quantum speedup. 

Despite these limitations, the Deutsch-Jozsa algorithm remains valuable as a concept, demonstrating the potential of quantum computing and inspiring the development of more practical quantum algorithms.

## Bottom Line 

The Deutsch-Jozsa algorithm is a seminal quantum algorithm that demonstrates the potential of quantum computing to solve certain problems exponentially faster than classical computers. While the practical applications are limited, the theoretical importance and impact on the field of quantum computing has been significant and has earned its reputation as one of the foundational quantum algorithms to know.






', '2025-04-21 13:32:20.191392+00', '<Steps>
  <Step title="Initialisation">
   The algorithm starts by preparing two quantum registers: an n-qubit register initialised to the state |0⟩n, and a single-qubit register initialised to the state |1⟩. A Hadamard gate is then applied to each qubit, creating a superposition of all possible input states in the first register and the state (|0⟩ - |1⟩) / √2 in the second register.
  </Step>
<Step title="Oracle query">
The function f is implemented as a quantum oracle, which is applied to the quantum state. The oracle performs the following transformation: if f(x) = 0, the state remains unchanged, and if f(x) = 1, a phase flip is applied to the state.
</Step>
<Step title="Hadamard transformation">
A Hadamard gate is applied to each qubit in the first register, which results in the interference of the quantum states.
</Step>
<Step title="Measurement">
The first register is measured. If the function is constant, the measurement will always yield the state |0⟩n. If the function is balanced, the measurement will yield any state other than |0⟩n with certainty.
</Step>', '[^1]: Deutsch, D., & Jozsa, R. (1992). Rapid solution of problems by quantum computation. Proceedings of the Royal Society of London. Series A: Mathematical and Physical Sciences, 439(1907), 553-558. 
[^2]: Cleve, R., Ekert, A., Macchiavello, C., & Mosca, M. (1998). Quantum algorithms revisited. Proceedings of the Royal Society of London. Series A: Mathematical, Physical and Engineering Sciences, 454(1969), 339-354. 
[^3]: Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information. Cambridge University Press. 
[^4]: Jozsa, R. (1998). Entanglement and quantum computation. In Geometric Issues in the Foundations of Science. Oxford University Press. 
[^5]: Montanaro, A. (2016). Quantum algorithms: an overview. npj Quantum Information, 2(1), 1-8. 
[^6]: DiCarlo, L., et al. (2009). Demonstration of two-qubit algorithms with a superconducting quantum processor. Nature, 460(7252), 240-244.
 [^7]: Aaronson, S. (2008). The limits of quantum computers. Scientific American, 298(3), 62-69. ', false),
	('2acaa74b-61a6-4fff-8145-e875b39cb579', 'quantum-counting-algorithm', 'Quantum Counting Algorithm (QCA)', 'QCA efficiently counts solutions to search problems, providing a quadratic speedup over classical methods.', '{"Database Search",Statistics,"Sampling Theory","Market Research","Population Studies","Data Mining","Quality Assurance","Inventory Management"}', '', true, '2025-04-22 03:38:15.870735+00', '2025-07-23 13:09:59.144119+00', 'The Quantum Counting Algorithm (QCA) is a quantum algorithm that combines Grover''s algorithm with the Quantum Phase Estimation (QPE) algorithm to estimate the number of solutions to a search problem[^1]. It was developed by Gilles Brassard, Peter Høyer, and Alain Tapp in 1998 as an extension of Grover''s search algorithm.

## Problem Target

The QCA solves the problem of determining the number of solutions to a search problem[^2]. This might seem trivial at first, but for many real-world applications, the search space (the set of all possible solutions) can be incredibly vast. Trying to count the solutions classically could take an impractically long time.

The key point of the QCA is that it does this much more efficiently than classical methods[^3]. In some cases, it offers a quadratic speedup, meaning that it can count the solutions in a time that''s proportional to the square root of the time it would take a classical algorithm. This can be a game-changer when dealing with large and complex search spaces.

## Quantum Approach

In essence, the algorithm works by creating a superposition of all possible solutions to the search problem using Grover''s algorithm[^4]. This superposition is then used as input to QPE, which estimates the phase of a unitary operator related to Grover''s iteration. This phase information is directly linked to the number of solutions, allowing the algorithm to provide an accurate estimate with high probability[^5].

The QCA combines Grover''s search and QPE to efficiently estimate the number of solutions to a search problem. It first uses Grover''s algorithm to create a superposition of solutions and then applies QPE to extract information about their number. The resulting estimate can be further refined through repetition if needed.

## Practical Applications

The QCA presents a significant advantage over classical counting methods, particularly when dealing with vast search spaces[^7]. By harnessing the principles of quantum mechanics, it can often provide a quadratic speedup compared to its classical counterparts, making it a valuable tool for a wide range of applications.

In the area of database search, QCA can rapidly estimate the number of items that meet specific criteria, streamlining the process of retrieving relevant information. For optimization problems, it can efficiently count feasible solutions, guiding the search for optimal solutions and enhancing the efficiency of optimization algorithms. In graph theory, QCA can determine the number of specific subgraphs within larger graphs, such as triangles or cliques, offering insights into the structure and properties of complex networks.

QCA also finds applications in statistical analysis, where it can estimate the frequency of specific patterns within datasets, providing valuable information for data-driven decision-making. In the growing field of quantum machine learning, it plays a crucial role in optimizing the performance of algorithms by efficiently counting relevant features or data points. This can lead to improved accuracy and faster convergence in various machine learning tasks.

## Implementation Challenges

Despite its impressive capabilities, the QCA algorithm has limitations that restrict its practical use in certain scenarios. One major constraint is its reliance on Grover''s search algorithm. While Grover''s algorithm offers a quadratic speedup over classical search, it still requires a structured search space. In situations where the search problem lacks structure or has a complex oracle, QCA might not be the most efficient approach.

Another limitation is the impact of noise and errors inherent to quantum systems. QCA, like other quantum algorithms, is susceptible to errors caused by decoherence and imperfect quantum gates. These errors can accumulate during the computation, affecting the accuracy of the estimated count. Robust error correction techniques are crucial to mitigate these issues and ensure reliable results.

QCA''s effectiveness is also somewhat limited by the knowledge of the approximate number of solutions. While it can provide a more accurate estimate than classical methods, it still requires some prior information about the range of the count. For completely unknown solution counts, it might not be the optimal choice.

Finally, the practical implementation of QCA on current quantum hardware faces challenges. The required number of qubits and quantum gates can scale with the problem size, making it difficult to implement for very large-scale problems. Additionally, the limited connectivity and coherence times of current quantum processors pose further obstacles to achieving the full potential of QCA.

## Bottom Line

Overall, the Quantum Counting Algorithm is a versatile tool with the potential to accelerate and enhance various computational tasks by efficiently estimating the number of solutions to search problems in the quantum realm.

', '2025-04-22 07:14:34.944+00', '<Steps>
  <Step title="Initialisation">
    Prepare a quantum register with two components, a work register (usually initialised to an equal superposition of all possible states) and an ancilla register (initialised to a specific state, usually |0⟩).
  </Step>
  <Step title="Grover Iteration">
    Apply Grover''s search algorithm to the work register with a modified oracle. This modified oracle marks all states that are solutions to the search problem. The number of Grover iterations is carefully chosen based on an estimate of the number of solutions.
  </Step>
  <Step title="Phase Estimation">
    Apply QPE to the work register, using the Grover iteration as the unitary operator. QPE estimates the phase of the Grover iteration, which is related to the number of solutions[^6].
  </Step>
  <Step title="Measurement">
    Measure the ancilla register to obtain an estimate of the phase. This phase estimate is then converted into an estimate of the number of solutions using classical post-processing.
  </Step>
  <Step title="Refinement (Optional)">
    If the initial estimate is not sufficiently accurate, the process can be repeated with a modified number of Grover iterations to refine the estimate.
  </Step>
</Steps>', '[^1]: Brassard, G., Høyer, P., & Tapp, A. (1998). Quantum counting. In International Colloquium on Automata, Languages, and Programming (pp. 820-831). Springer, Berlin, Heidelberg.
[^2]: Brassard, G., Høyer, P., Mosca, M., & Tapp, A. (2002). Quantum amplitude amplification and estimation. Contemporary Mathematics, 305, 53-74.
[^3]: Boyer, M., Brassard, G., Høyer, P., & Tapp, A. (1998). Tight bounds on quantum searching. Fortschritte der Physik, 46(4-5), 493-505.
[^4]: Grover, L. K. (1997). Quantum mechanics helps in searching for a needle in a haystack. Physical Review Letters, 79(2), 325.
[^5]: Svore, K. M., Hastings, M. B., & Freedman, M. (2013). Faster phase estimation. Quantum Information & Computation, 14(3-4), 306-328.
[^6]: Kitaev, A. Y. (1995). Quantum measurements and the Abelian stabilizer problem. arXiv preprint quant-ph/9511026.
[^7]: Mosca, M. (1999). Quantum computer algorithms. University of Oxford, Oxford.', false),
	('79662c8a-14fd-4943-bed4-0d22bd47fbe0', 'quantum-support-vector-machine', 'Quantum Support Vector Machine (QSVM)', 'Quantum version of the classical SVM algorithm, used for data classification by finding an optimal separating hyperplane. It employs quantum computation, particularly for kernel calculations, to potentially offer speedups or improved performance on complex, high-dimensional data.', '{Classification,"Pattern Recognition",Cybersecurity,"Quality Control","Machine Learning","Image Classification",Bioinformatics,"Financial Risk Assessment"}', 'TBD', true, '2025-04-28 06:15:52.271965+00', '2025-07-23 13:49:51.053591+00', 'The Quantum Support Vector Machine (QSVM) is a quantum version of the classical Support Vector Machine (SVM), which is a widely used algorithm for classification and regression tasks in machine learning1. SVMs aim to find the optimal hyperplane that separates different classes of data points in a high-dimensional feature space, while maximising the margin between the classes.

## Problem Target 

The core idea behind QSVM is to use quantum circuits to construct quantum kernels, which are mathematical functions used to measure the similarity between data points2. Quantum kernels offer a potentially richer representation of relationships within the data compared to classical kernels, leading to more accurate classifications.

## Quantum Approach

QSVM works by encoding classical data into quantum states and then using quantum circuits to evaluate the quantum kernel3. Classical optimization techniques are then used to find the best hyperplane based on this quantum information4. New data points are classified by comparing them to the support vectors, which are the key data points that define the separation between classes, using the quantum kernel.

While still an active area of research, QSVM holds the promise of significant advancements in machine learning, particularly for complex datasets where quantum advantage could be harnessed to achieve superior performance.

## Practical Applications

There are a number of potential advantages of QSVMs over classical SVMs. One of the most promising is the exponential speedup, where for certain types of datasets and kernel functions, QSVMs can provide an exponential speedup over classical SVMs in terms of training time and classification accuracy6. This is due to the ability of quantum computers to process high-dimensional data in a compact quantum state and perform certain operations, such as inner products, more efficiently than classical computers.

The improved generalisation and reduced overfitting of quantum kernels compared to classical kernels can potentially capture more complex and expressive feature maps than classical kernels. Likewise the reduced data requirements may prove advantageous, where QSVMs may require fewer training examples to achieve a given level of accuracy compared to classical SVMs, due to the ability of quantum computers to efficiently explore a larger feature space.

## Implementation Challenges 

QSVMs face the limitations of the current state of quantum hardware. Existing quantum computers are constrained by limited qubit counts and high error rates, making it difficult to tackle large-scale problems effectively.

Another challenge lies in the design of efficient quantum circuits for kernel evaluation and optimization. Creating quantum circuits that outperform classical counterparts requires ongoing research and development. Additionally, the inherent susceptibility of quantum systems to errors due to noise and decoherence necessitates the development of robust error mitigation and correction techniques, adding another layer of complexity.

Efficiently encoding classical data into quantum states suitable for QSVM computations remains a challenge7. Finding encoding methods that preserve relevant information while minimising qubit requirements is an active area of research. Moreover, while QSVMs show promise in theory, demonstrating a consistent practical advantage over classical SVMs in real-world scenarios remains an ongoing endeavour.

## Bottom Line 

Quantum Support Vector Machines are a promising application of quantum computing for machine learning, particularly for classification and regression tasks on high-dimensional and large-scale datasets. With the power of quantum kernels and quantum optimization algorithms, QSVMs have the potential to provide exponential speedups and improved generalisation performance compared to classical SVMs. As quantum technologies continue to advance, 

QSVMs are expected to play an important role in quantum-enhanced machine learning, with applications ranging from image and speech recognition to drug discovery and financial forecasting. However, significant research efforts are still needed to address the challenges of efficient data encoding, scalable quantum kernels, noise-resilient training, and integration with classical machine learning techniques.

', NULL, '<step title="Data encoding">
The classical input data is encoded into a quantum state, typically using amplitude encoding or qubit encoding. In amplitude encoding, each data point is represented by a quantum state, where the amplitudes of the basis states correspond to the feature values. In qubit encoding, each feature is assigned to a qubit, and the feature values are encoded in the qubit states.
</step>

<step title="Kernel mapping">
A quantum kernel function is applied to the encoded data to map it into a higher-dimensional feature space. Quantum kernels, such as the quantum radial basis function (RBF) kernel or the quantum polynomial kernel, can be efficiently computed using quantum circuits, enabling the processing of high-dimensional data with fewer qubits compared to classical kernels5.
</step>

<step title="Training">
The QSVM training algorithm optimises the parameters of the quantum hyperplane to maximise the margin between the classes. This can be done using quantum algorithms for optimization, such as the Variational Quantum Eigensolver (VQE) or the Quantum Approximate Optimization Algorithm (QAOA), which iteratively adjust the parameters of a variational quantum circuit to minimise a cost function.
</step>

<step title="Classification">
Once the QSVM is trained, new data points can be classified by encoding them into quantum states, applying the quantum kernel, and measuring the output of the variational quantum circuit. The measurement outcome determines the predicted class label of the input data.
</step>', '[^ 1]: Cortes, C., & Vapnik, V. (1995). Support-vector networks. Machine Learning, 20(3), 273-297. 

[^2]: Havlíček, V., Córcoles, A. D., Temme, K., Harrow, A. W., Kandala, A., Chow, J. M., & Gambetta, J. M. (2019). Supervised learning with quantum-enhanced feature spaces. Nature, 567(7747), 209-212. 

[^3]: Rebentrost, P., Mohseni, M., & Lloyd, S. (2014). Quantum support vector machine for big data classification. Physical Review Letters, 113(13), 130503. 

[^4]: Schuld, M., & Killoran, N. (2019). Quantum machine learning in feature Hilbert spaces. Physical Review Letters, 122(4), 040504. 

[^5]: Huang, H. Y., Broughton, M., Mohseni, M., Babbush, R., Boixo, S., Neven, H., & McClean, J. R. (2021). Power of data in quantum machine learning. Nature Communications, 12(1), 2631. 

[^6]: Liu, Y., Arunachalam, S., & Temme, K. (2021). A rigorous and robust quantum speed-up in supervised machine learning. Nature Physics, 17(9), 1013-1017. 

[^7]: Cincio, L., Subaşı, Y., Sornborger, A. T., & Coles, P. J. (2018). Learning the quantum algorithm for state overlap. New Journal of Physics, 20(11), 113022. ', false),
	('80b08898-22b2-4d69-bf0b-9398dd0f2409', 'grovers-algorithm', 'Grover''s Algorithm', 'Grover''s algorithm is a quantum search algorithm that finds a specific entry in an unsorted database in significantly fewer steps than classical algorithms.', '{"Database Search",Optimization,Cryptography,"Data Mining","Information Retrieval","Security Analysis","Mathematical Research","Computer Science"}', 'It doesnt have one.', true, '2025-04-22 06:06:46.547713+00', '2025-07-23 11:26:26.454296+00', 'Grover''s Algorithm provides a quadratic speedup for searching unstructured databases, transforming a classical O(N) search problem into a quantum O(√N) solution. This demonstrates a clear quantum advantage for search and optimization problems.

## Algorithm Details

Grover''s algorithm was developed soon after Shor''s, this time seeing Lov Grover publishing his own breakthrough in 1996[^1]. His focus was on creating a quantum algorithm for searching an unsorted database quadratically faster than the best possible classical algorithm. It is one of the most well-known and widely studied quantum algorithms, with numerous applications in various fields, such as database search, optimisation, and machine learning.

## Problem Target

Grover''s algorithm addresses the problem of searching an unsorted database or solving an unstructured search problem. Given a large set of N items, it finds a specific item or solution that satisfies a given condition, often referred to as the "marked item" or "solution state"[^2]. In the classical setting, this problem requires O(N) operations in the worst case, as one might need to search through all N items to find the desired one. Grover''s algorithm can solve this problem using only O(√N) quantum operations, providing a quadratic speedup over classical methods[^3].

## Quantum Approach

The key idea behind Grover''s algorithm is the concept of amplitude amplification, which allows the algorithm to increase the amplitude of the quantum state corresponding to the desired item, while decreasing the amplitudes of the other states[^4]. This is achieved through a series of quantum operations that are applied iteratively to the quantum state, gradually transforming it into a state where the desired item has a high probability of being measured. This process effectively "rotates" the system state towards the solution through a process of phase amplification and attenuation.

## Practical Applications

Grover''s algorithm has been experimentally demonstrated on various quantum computing platforms, including superconducting qubits, trapped ions, photonic, and silicon qubits[^5]. It has also been applied to a wide range of problems beyond database search, such as optimisation, machine learning, and quantum chemistry.

One of the most significant applications of Grover''s algorithm is in the field of optimisation. By combining Grover''s algorithm with classical optimisation techniques, such as the Quantum Approximate Optimisation Algorithm (QAOA), researchers have developed hybrid quantum-classical algorithms that can solve complex optimisation problems faster than purely classical methods[^6].

This combination of quantum and classical approaches gives some clues as to the utility beyond the "quantum is the future" hype curve, and shows the potential for incremental but significant improvements in existing workflows and problem spaces. It also shows how any singular advancement can inspire and combine with other efforts to unlock further fields of study. 

In this way, Grover''s algorithm has had a profound impact on the theoretical foundations of quantum computing. It has led to the development of new quantum algorithms and techniques, such as Quantum Amplitude Amplification and Quantum Counting, which have further expanded the capabilities of quantum computers and associated research.

## Implementation Challenges

The efficiency of Grover''s algorithm comes from its ability to exploit quantum parallelism and quantum interference to search the database in a way that is quadratically faster than classical methods. Note that this is "just" a quadratic speedup, compared to the exponential benefits found in the various applications other quantum algorithms in their specific problem space.

The standard disclaimer in the NISQ era also applies, where the true extent of the algorithm''s performance relies on the eventual realisation of a fault-tolerant quantum computer with a sufficient number of qubits[^7]. The decoherence and noise in the current range of available quantum hardware limit the number of iterations that can be performed accurately. 

Another condition that is common to most if not all quantum algorithms is the actual implementation via the intended SDK and platform, where the oracle function must be implemented efficiently as a quantum circuit. It''s useful to keep in mind that not all systems or architectures will transpile the same way, or achieve the same performance in the process.

## Bottom Line

Grover''s algorithm is a powerful and versatile quantum algorithm that demonstrates the potential of quantum computing to solve certain problems quadratically faster than classical computers. Its impact on various fields, from database search and optimisation to machine learning and quantum chemistry, highlights the broad applicability of quantum algorithms. But in the current era, the full benefits of Grover''s algorithm is limited to simulation or smaller scale and noisy quantum hardware, which inversely means that Grover''s algorithm and its variants will likely play an increasingly important role in the near-term future.

', '2025-04-24 06:36:11.712+00', '<Steps>
  <Step title="Initialisation">
    The algorithm starts by preparing a uniform superposition of all possible states, where each state corresponds to an index in the database. This is done by applying a Hadamard gate to each qubit in the quantum register.
  </Step>

  <Step title="Oracle query">
    An oracle function is applied to the quantum state, which marks the desired item by flipping the sign of its amplitude. The oracle function is a black box that can recognise the desired item based on the given condition.
  </Step>

  <Step title="Diffusion operator">
    A diffusion operator is applied to the quantum state, which reflects the amplitudes around their average value. This has the effect of increasing the amplitude of the marked item while decreasing the amplitudes of the other items.
  </Step>

  <Step title="Amplitude amplification">
    Steps 2 and 3 are repeated iteratively, approximately π/4 * √N times, which gradually amplifies the amplitude of the marked item while suppressing the amplitudes of the other items.
  </Step>

  <Step title="Measurement">
    The quantum state is measured, and with a high probability, the outcome will correspond to the index of the marked item.
  </Step>
</Steps>  ', '## References

[^1]: Grover, L. K. (1996). A fast quantum mechanical algorithm for database search. Proceedings of the 28th Annual ACM Symposium on Theory of Computing, 212-219.
[^2]: Bennett, C. H., Bernstein, E., Brassard, G., & Vazirani, U. (1997). Strengths and weaknesses of quantum computing. SIAM Journal on Computing, 26(5), 1510-1523.
[^3]: Zalka, C. (1999). Grover''s quantum searching algorithm is optimal. Physical Review A, 60(4), 2746.
[^4]: Brassard, G., Høyer, P., Mosca, M., & Tapp, A. (2002). Quantum amplitude amplification and estimation. Contemporary Mathematics, 305, 53-74.
[^5]: Figgatt, C., Maslov, D., Landsman, K. A., Linke, N. M., Debnath, S., & Monroe, C. (2017). Complete 3-Qubit Grover search on a programmable quantum computer. Nature Communications, 8(1), 1918.
[^6]: Farhi, E., Goldstone, J., & Gutmann, S. (2014). A quantum approximate optimization algorithm. arXiv preprint arXiv:1411.4028.
[^7]: Preskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79.', false),
	('15f5c62d-1f8e-4986-93f0-ad7fdcf90527', 'bernstein-vazirani-algorithm', 'Bernstein-Vazirani algorithm', 'The Bernstein-Vazirani algorithm is a quantum algorithm that efficiently determines a secret string of bits encoded within a function, using only a single query, which is exponentially faster than any classical algorithm.
', '{Cryptography,"Boolean Functions","Security Analysis","Complexity Theory","Information Theory","Mathematical Research","Computer Science Theory","Algorithm Design"}', 'TBD.', true, '2025-04-21 13:30:41.916342+00', '2025-07-23 11:18:30.63742+00', 'The Bernstein-Vazirani algorithm was introduced by Ethan Bernstein and Umesh Vazirani in 1992[^1], and is designed to find a hidden string (or a secret key) in a black-box function using fewer queries than classical algorithms.

## Problem Target

 The problem addressed by the Bernstein-Vazirani algorithm can be formulated as follows: given a black-box function f(x) that takes an n-bit binary string x as input and returns a single bit, find the secret n-bit string s that satisfies the following condition: f(x) = s · x (mod 2) where · denotes the bitwise inner product (or dot product) modulo 2. In other words, the function f(x) is a linear function that computes the parity of the bitwise AND of the input string x and the secret string s.

Classically, finding the secret string s requires n queries to the black-box function, as each query reveals one bit of information about s. However, the Bernstein-Vazirani algorithm can find the secret string using only one query to a quantum oracle that implements the function f(x)2.

## Quantum Approach

 The Bernstein-Vazirani algorithm achieves this result by exploiting the properties of quantum superposition and interference. The Hadamard gates create a superposition of all possible input strings, allowing the quantum oracle to evaluate the function f(x) for all inputs simultaneously. The oracle encodes the secret string into the phases of the quantum state, which are then converted into amplitudes by the second set of Hadamard gates. Finally, the measurement of the quantum state reveals the secret string3.

## Practical Applications 

The Bernstein-Vazirani algorithm demonstrates a clear advantage of quantum computing over classical computing for this specific problem, as it requires only one query to the oracle, compared to the n queries required classically4. Although the problem itself is relatively simple and has limited practical applications, the algorithm has theoretical importance in the field of quantum computing.

The Bernstein-Vazirani algorithm has been experimentally demonstrated on various quantum computing platforms, including nuclear magnetic resonance (NMR)5, linear optics6, and superconducting qubits7. These experimental realisations have validated the principles of the algorithm and have paved the way for the development of more complex quantum algorithms.

Moreover, the Bernstein-Vazirani algorithm has inspired further research in the field of quantum query complexity, which studies the number of oracle queries required to solve certain problems using quantum algorithms8. This research has led to the development of other quantum algorithms, such as the Deutsch-Jozsa algorithm and Simon''s algorithm, which also demonstrate quantum speedups over classical algorithms.

## Implementation Challenges 

The Bernstein-Vazirani algorithm’s primary constraint lies in its narrow focus, as it''s tailor-made for the singular task of determining a hidden string given a particular type of function. This specialisation restricts its direct applicability to other computational challenges9.

Furthermore, the algorithm operates under the assumption of a quantum oracle capable of efficiently evaluating the required function. While theoretically feasible, constructing such oracles for real-world problems can pose a significant hurdle10. Consequently, the Bernstein-Vazirani algorithm''s practical applications remain limited, primarily serving as a theoretical testament to the potential power of quantum computing.

Additionally, like other quantum algorithms, it''s susceptible to errors arising from noise and decoherence in quantum systems, which can compromise accuracy and hinder its practicality for larger problem sizes11. The algorithm''s scalability also remains an open question, as the resources required might increase exponentially with the problem size, potentially limiting its effectiveness for large-scale computations.

## Bottom Line 

The Bernstein-Vazirani algorithm is a quantum algorithm that showcases the power of quantum computing in solving a specific problem with a clear quantum advantage over classical methods. While the problem itself may have limited practical applications, the algorithm has theoretical significance and has inspired further research in quantum query complexity and the development of more advanced quantum algorithms. 





', '2025-04-22 13:20:11.822+00', '## Implementation Steps

<Steps>
    <Step title="State preparation">
         Initialise an n-qubit quantum state |ψ⟩ in the |0⟩ state and an ancilla qubit in the |1⟩ state.
    </Step>
    <Step title="Apply Hadamard gates">
        Apply a Hadamard gate to each of the n qubits and the ancilla qubit. This creates a superposition of all possible n-bit strings in the n-qubit state and puts the ancilla qubit in the |-⟩ state.
    </Step>
    <Step title="Oracle query">
        Apply the quantum oracle that implements the function f(x) to the n-qubit state and the ancilla qubit. The oracle performs the following transformation: |x⟩|y⟩ → |x⟩|y ⊕ f(x)⟩ where ⊕ denotes the XOR operation. This step encodes the secret string s into the phases of the n-qubit state.
    </Step>
    <Step title="Final Transform">
        Apply a Hadamard gate to each of the n qubits. This step transforms the phase information encoded by the oracle into the amplitudes of the n-qubit state.
    </Step>
    <Step title="Measurement">
        Measure the n-qubit state in the computational basis. The resulting n-bit string is the secret string s.
    </Step>
</Steps>
', '[^1]: Bernstein, E., & Vazirani, U. (1997). Quantum complexity theory. SIAM Journal on Computing, 26(5), 1411-1473.
[^2]: Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information. Cambridge University Press.
[^3]: Cleve, R., Ekert, A., Macchiavello, C., & Mosca, M. (1998). Quantum algorithms revisited. Proceedings of the Royal Society of London A, 454(1969), 339-354.
[^4]: Du, J., Shi, M., Zhou, X., Fan, J., Ye, B., Han, R., & Wu, J. (2001). Implementation of a quantum algorithm to solve the Bernstein-Vazirani parity problem. Physical Review A, 64(4), 042306.
[^5]: Cross, A. W., Smith, G., & Smolin, J. A. (2015). Quantum learning robust against noise. Physical Review A, 92(1), 012327.
[^6]: Montanaro, A. (2016). Quantum algorithms: an overview. npj Quantum Information, 2(1), 1-8.
[^7]: Harrow, A. W., & Montanaro, A. (2017). Quantum computational supremacy. Nature, 549(7671), 203-209.
[^8]: Preskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79.
[^9]: Gottesman, D. (2010). An introduction to quantum error correction and fault-tolerant quantum computation. Proceedings of Symposia in Applied Mathematics, 68, 13-58.
[^10]: Arute, F., et al. (2019). Quantum supremacy using a programmable superconducting processor. Nature, 574(7779), 505-510.  ', false),
	('70021542-f2b3-4293-9fc7-60d237ed5548', 'quantum-annealing', 'Quantum Annealing (QA)', 'Quantum Annealing uses quantum tunnelling to find optimal solutions by gradually evolving a quantum system. This method is especially effective for combinatorial optimization challenges.', '{Optimization,Manufacturing,"Resource Planning","Operations Research","Supply Chain",Logistics,Scheduling,"Portfolio Management"}', 'TBD', true, '2025-04-28 05:53:59.617051+00', '2025-07-23 11:32:31.82196+00', 'Quantum Annealing (QA) is a metaheuristic optimization algorithm that exploits the principles of quantum mechanics to solve complex optimization problems[^1]. It is inspired by the process of annealing in metallurgy, where a metal is heated and then slowly cooled to remove defects and reach a low-energy crystalline state. Similarly, QA explores the solution space of an optimization problem by slowly evolving a quantum system from an initial state to a final state that encodes the optimal solution.

## Problem Target 

QA algorithms are particularly well-suited for solving combinatorial optimization problems, such as the Traveling Salesman Problem, the Max-Cut Problem, and the Quadratic Unconstrained Binary Optimization (QUBO) problem[^2]. These problems are characterised by a large number of discrete variables and a complex energy landscape with many local minima, making them difficult to solve using classical optimization methods.

Quantum Approach The key idea behind QA is to map the optimization problem onto a physical system of interacting qubits, where the energy of the system corresponds to the cost function of the problem[^3]. The system is initialised in a state of quantum superposition, where each qubit represents a possible solution to the problem. The system is then slowly evolved according to a time-dependent Hamiltonian, which gradually changes the strength of the interactions between the qubits and drives the system towards the ground state, which corresponds to the optimal solution[^4].

## Practical Applications

 QA holds the promise of outperforming classical optimization algorithms in several key aspects. One notable advantage is its potential for faster convergence. By harnessing quantum tunnelling and quantum entanglement, QA can navigate the solution space more efficiently, potentially finding the optimal solution faster than classical methods, especially for problems with complex energy landscapes where classical algorithms might become trapped in local minima[^5].

Another compelling advantage lies in its scalability potential. QA can potentially tackle larger and more intricate problems that overwhelm classical algorithms. This is due to the exponential nature of quantum state spaces, where a relatively small number of qubits can represent and manipulate exponentially large superpositions.

Furthermore, QA benefits from an inherent robustness to certain types of noise and errors, such as thermal fluctuations and control errors. This resilience stems from the adiabatic nature of the algorithm, making it well suited for near-term quantum hardware, which is often prone to such disturbances[^6].

## Implementation Challenges 

Despite its promising potential, the practical implementation of QA faces several hurdles. One significant challenge lies in the limited connectivity between qubits in current quantum annealing hardware. This limitation can make mapping certain problems onto the hardware difficult, leading to additional overhead in problem encoding and a potential reduction in performance[^7].

Another issue is the sensitivity of QA''s performance to various parameters, such as the annealing schedule, the initial and final Hamiltonians, and other settings. Determining the optimal parameter configuration for a specific problem can be a complex task, often requiring extensive empirical tuning and experimentation.

Furthermore, comparing QA with classical optimization algorithms is crucial for assessing its true potential. In some cases, classical methods like simulated annealing or tensor networks can perform as well as or even outperform it, particularly when dealing with small problem sizes or less complex energy landscapes. Therefore, rigorous benchmarking and comparison with classical approaches are essential for understanding the specific scenarios where QA can offer a quantum advantage[^8].

## Bottom Line 

Quantum Annealing is a powerful metaheuristic optimization algorithm that uses the principles of quantum mechanics to solve complex combinatorial optimization problems. By mapping the problem onto a system of interacting qubits and slowly evolving the system towards the ground state, QA has the potential to provide faster convergence, better scalability, and robustness to noise compared to classical optimization methods. 

QA has been extensively studied and applied to various optimization problems in fields such as machine learning, finance, logistics, and materials science. Experimental demonstrations have been performed on quantum annealing hardware, such as the D-Wave systems, as well as on gate-based quantum computers and quantum simulators.

Ongoing research in QA aims to develop more efficient and scalable algorithms, improve the mapping and encoding of problems, and benchmark the performance of it against classical methods, paving the way for the practical deployment in real-world applications. ', NULL, ' <Step title="Problem encoding">
The optimization problem is mapped onto a QUBO or Ising Hamiltonian, which describes the energy of the quantum system as a function of the binary variables. The mapping involves defining the couplings between the qubits and the local fields acting on each qubit, based on the constraints and objectives of the problem.
  </Step>
 <Step title="Initialisation">
The quantum system is initialised in a state of uniform superposition, where each qubit is in an equal superposition of the |0⟩ and |1⟩ states. This state represents a equal probability distribution over all possible solutions to the problem.
</Step>
 <Step title="Annealing">
The quantum system is slowly evolved according to a time-dependent Hamiltonian, which consists of two terms: a problem Hamiltonian that encodes the QUBO or Ising model, and a driver Hamiltonian that provides the quantum fluctuations needed to explore the solution space. The strength of the driver Hamiltonian is gradually decreased over time, while the strength of the problem Hamiltonian is increased, guiding the system towards the ground state.
</Step>
 <Step title="Measurement">
After the annealing process is complete, the quantum system is measured in the computational basis, collapsing the superposition into a classical state that represents a candidate solution to the problem. The measurement is repeated multiple times to obtain a statistical distribution of the solutions.
</step>
 <Step title="Post-processing">
The candidate solutions are post-processed using classical optimization techniques, such as local search or simulated annealing, to further improve their quality and remove any invalid or suboptimal solutions.
</Step>', '[^1]: Kadowaki, T., & Nishimori, H. (1998). Quantum annealing in the transverse Ising model. Physical Review E, 58(5), 5355. 

[^2]: Lucas, A. (2014). Ising formulations of many NP problems. Frontiers in Physics, 2, 5.

[^ 3]: Johnson, M. W., Amin, M. H. S., Gildert, S., Lanting, T., Hamze, F., Dickson, N., ... & Rose, G. (2011). Quantum annealing with manufactured spins. Nature, 473(7346), 194-198. 

[^4]: Farhi, E., Goldstone, J., Gutmann, S., & Sipser, M. (2000). Quantum computation by adiabatic evolution. arXiv preprint quant-ph/0001106 

[^5]: Denchev, V. S., Boixo, S., Isakov, S. V., Ding, N., Babbush, R., Smelyanskiy, V., ... & Neven, H. (2016). What is the computational value of finite-range tunneling? Physical Review X, 6(3), 031015. 

[^6]: Dickson, N. G., Johnson, M. W., Amin, M. H., Harris, R., Altomare, F., Berkley, A. J., ... & Rose, G. (2013). Thermally assisted quantum annealing of a 16-qubit problem. Nature Communications, 4(1), 1-6. 

[^7]: Choi, V. (2008). Minor-embedding in adiabatic quantum computation: I. The parameter setting problem. Quantum Information Processing, 7(5), 193-209. 

[^8]: Rønnow, T. F., Wang, Z., Job, J., Boixo, S., Isakov, S. V., Wecker, D., ... & Troyer, M. (2014). Defining and detecting quantum speedup. Science, 345(6195), 420-424. ', false),
	('7527f1bb-5d8e-4f43-b5d9-5c41f7bb086e', 'quantum-error-correction', 'Quantum Error Correction (QEC)', 'Quantum Error Correction (QEC)  techniques protect quantum information from errors like decoherence, essential for fault-tolerant quantum computing.', '{"Information Theory","Computing Architecture","Error Correction","Fault Tolerance","Hardware Design","Quantum Infrastructure","System Reliability","Circuit Compilation"}', 'TBD', true, '2025-04-28 06:06:27.044149+00', '2025-07-23 13:15:50.077522+00', 'Quantum Error Correction (QEC) is a critical technique in quantum computing that aims to protect quantum information from errors and decoherence, which are inevitable in real-world quantum systems1. QEC is essential for building reliable and scalable quantum computers that can perform long computations and store quantum information for extended periods.

The need for QEC arises from the fragility of quantum states and the susceptibility of quantum systems to external influence2. Unlike classical bits, which are robust against noise and can be easily copied, quantum bits are extremely sensitive to environmental disturbances, such as temperature fluctuations, electromagnetic interference, and material imperfections3. These disturbances can cause errors in the quantum state, leading to the loss of coherence and the corruption of quantum information.

## Problem Target 

The basic idea behind QEC is to encode the quantum information in a redundant way, using multiple physical qubits to represent a single logical qubit4. By distributing the information across many qubits, QEC can detect and correct errors that affect individual qubits, without compromising the integrity of the logical qubit. This is similar to classical error correction, where redundant bits are used to detect and correct errors in communication channels.

There are several types of QEC codes, each with its own advantages and limitations. Some of the most well-known QEC codes include:

- **Shor''s code** is one of the first QEC codes, which uses nine physical qubits to encode a single logical qubit. It can correct any single-qubit error and is based on the concatenation of two classical error-correcting codes.

- **Steane''s code** is a more efficient QEC code that uses seven physical qubits to encode a single logical qubit5. It can correct any single-qubit error and is based on the properties of a particular class of classical error-correcting codes known as CSS codes.

- **Surface codes** are a family of QEC codes that are particularly well-suited for 2D quantum architectures, such as superconducting qubit arrays6. They encode logical qubits in the topology of a 2D lattice of physical qubits and can tolerate a relatively high error rate (up to 1%) while still enabling fault-tolerant quantum computation.

- **Color codes** are another family of QEC codes that are similar to surface codes but offer additional features, such as the ability to perform transversal logical gates and to encode multiple logical qubits in a single code block7.

## Quantum Approach

 QEC is a set of techniques used to protect fragile quantum information from errors caused by noise and decoherence8. It works by encoding the quantum information of a single logical qubit into multiple entangled physical qubits, creating redundancy. This redundancy allows for the detection and correction of errors without disturbing the underlying quantum state. When errors occur, they affect the encoded physical qubits, and by measuring specific subsets of these qubits, a syndrome is obtained that reveals the type and location of the error. QEC then applies corrective operations based on the syndrome to restore the encoded quantum state to its original, error-free form. Different QEC codes employ various strategies for encoding and decoding quantum information to achieve error suppression and fault-tolerant quantum computation.

## Practical Applications

 QEC has been experimentally demonstrated on various quantum computing platforms, including superconducting qubits, trapped ions, and spin qubits9. These demonstrations have shown the feasibility of QEC and have provided valuable insights into the challenges and limitations of practical QEC implementations.

## Implementation Challenges

The realisation of fault-tolerant quantum computing, which requires QEC to operate reliably and continuously, remains a major challenge. Current implementations are limited by the fidelity of quantum operations, the scalability of quantum hardware, and the overhead of the process itself10. Ongoing research aims to address these challenges by developing more efficient and robust QEC codes, optimizing the quantum hardware for the process, and exploring new approaches to fault-tolerant quantum computation.

## Bottom Line 

Quantum Error Correction is a critical technique for building reliable and scalable quantum computers that can withstand the effects of noise and decoherence11. By encoding quantum information in a redundant way and using additional quantum operations to detect and correct errors, QEC can protect the integrity of quantum states and enable long quantum computations. As quantum technologies continue to advance, QEC is expected to play a central role in realising the full potential of quantum computing. ', NULL, '<step title="Encoding">
The encoding operation maps the logical qubit state onto the redundant physical qubit state, creating the error-correcting code.
</step>

<step title="Syndrome measurement">
The syndrome measurement is a quantum operation that detects the occurrence of errors without disturbing the logical qubit state. It measures the parity of certain qubit subsets and compares it with the expected parity of the code.
</step>

<step title="Error correction">
If an error is detected by the syndrome measurement, the error correction operation applies the appropriate quantum gate to the affected qubit(s) to restore the correct code state.
</step>

<step title="Decoding">
The decoding operation maps the corrected physical qubit state back onto the logical qubit state, recovering the original quantum information.
</step>', '[^1]: Shor, P. W. (1995). Scheme for reducing decoherence in quantum computer memory. Physical Review A, 52(4), R2493. 

[^2]: Zurek, W. H. (2003). Decoherence, einselection, and the quantum origins of the classical. Reviews of Modern Physics, 75(3), 715. 

[^3]: Preskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79. 

[^4]: Knill, E., & Laflamme, R. (1997). Theory of quantum error-correcting codes. Physical Review A, 55(2), 900. 

[^5]: Steane, A. (1996). Multiple-particle interference and quantum error correction. Proceedings of the Royal Society of London. Series A: Mathematical, Physical and Engineering Sciences, 452(1954), 2551-2577. 

[^6]: Fowler, A. G., Mariantoni, M., Martinis, J. M., & Cleland, A. N. (2012). Surface codes: Towards practical large-scale quantum computation. Physical Review A, 86(3), 032324. 

[^7]: Bombin, H., & Martin-Delgado, M. A. (2006). Topological quantum distillation. Physical Review Letters, 97(18), 180501.

[^ 8]: Gottesman, D. (1997). Stabilizer codes and quantum error correction. arXiv preprint quant-ph/9705052. 

[^9]: Chiaverini, J., Leibfried, D., Schaetz, T., Barrett, M. D., Blakestad, R. B., Britton, J., ... & Wineland, D. J. (2004). Realization of quantum error correction. Nature, 432(7017), 602-605. 

[^10]: Campbell, E. T., Terhal, B. M., & Vuillot, C. (2017). Roads towards fault-tolerant universal quantum computation. Nature, 549(7671), 172-179. 11. Devitt, S. J., Munro, W. J., & Nemoto, K. (2013). Quantum error correction for beginners. Reports on Progress in Physics, 76(7), 076001. ', false),
	('3ea62960-1bdf-4429-bd2e-a42338120883', 'multi-angle-layered-variational-quantum-algorithm', 'Multi-Angle Layered Variational Quantum Algorithm', 'wedwde

Multi-Angle Layered Variational Quantum Algorithm

  - Quantum Machine Learning
  - Optimization
  - Chemistry
  - Materials Science
  - AI Research
  - Parameter Estimation
  - Quantum Simulation
  - Computational Science', '{}', 'wqed', false, '2025-05-06 05:06:56.900024+00', '2025-07-23 14:19:10.169837+00', 'wedwed', NULL, 'wqed', 'wed', false),
	('7557a852-28e4-4b69-a2d6-683471f38ffb', 'harrow-hassidim-lloyd', 'Harrow-Hassidim-Lloyd (HHL)', 'The Harrow-Hassidim-Lloyd algorithm is designed to solve systems of linear equations, particularly when the matrices involved are large and sparse, potentially offering exponential speedups in specific applications.', '{Optimization,"Linear Algebra","Machine Learning","Mathematical Research","Computational Science","Physics Simulation",Engineering,"Scientific Computing"}', '', true, '2025-04-22 06:04:47.057298+00', '2025-07-23 11:28:50.059114+00', 'The Harrow-Hassidim-Lloyd (HHL) algorithm is a quantum algorithm for solving systems of linear equations[^1]. Published in 2009, it provides an exponential speedup over classical methods for certain well-conditioned sparse systems of linear equations, making it a significant milestone in quantum computing[^2].

## Problem Target

The HHL algorithm addresses the problem of solving systems of linear equations of the form Ax = b, where A is an N × N Hermitian matrix, b is a known vector, and x is the solution vector we want to find[^3]. While classical algorithms like Gaussian elimination require O(N³) operations, HHL can achieve this in O(log(N)) time under certain conditions, though with some important caveats[^4].

## Quantum Approach

The algorithm works by encoding the problem in a quantum state and using quantum phase estimation along with controlled rotations to extract the solution[^5]. The key steps involve:

1. Quantum state preparation of |b⟩
2. Quantum phase estimation to estimate eigenvalues of A
3. Controlled rotations based on eigenvalues
4. Inverse quantum phase estimation
5. Measurement of the result[^6]

## Practical Applications

The HHL algorithm has potential applications in various fields[^8]. The efficiency of the HHL algorithm makes it particularly promising for applications in science, engineering, and finance, where linear systems are ubiquitous. It''s important to note that the algorithm outputs a quantum state encoding the solution, not a classical vector. This characteristic highlights both the potential and challenges of quantum computing: while it can process certain information exponentially faster, extracting useful classical data from the quantum state can be complex.

## Implementation Challenges

The HHL algorithm achieves its exponential speedup by exploiting quantum parallelism to perform the phase estimation and controlled rotation steps efficiently. A primary constraint of the HHL algorithm is its requirement for the input matrix A to be both sparse and well-conditioned, meaning it must have a small condition number. This specificity limits the algorithm''s applicability, as the quantum speedup may be lost when dealing with dense or ill-conditioned matrices, which are common in many real-world problems. 

Additionally, the algorithm''s output is not a classical vector but a quantum state proportional to the solution vector x. While this quantum state contains the solution, extracting the classical information requires quantum state tomography, a process that can be resource-intensive and potentially offset the algorithm''s speed advantages for certain applications.

Another significant limitation lies in the algorithm''s assumption that the matrix A and vector b can be efficiently prepared as quantum states. In practice, this state preparation can be challenging, particularly for large-scale problems, and may introduce additional complexities that impact the overall efficiency of the algorithm.

These limitations highlight the nuanced nature of quantum speedups and the importance of considering the entire computational process, from input preparation to output interpretation, when evaluating the practical utility of quantum algorithms. 1. Childs, A. M., Kothari, R., & Somma, R. D. (2017). Quantum algorithm for systems of linear equations with exponentially improved dependence on precision. SIAM Journal on Computing, 46(6), 1920-1950. 

## Bottom Line

Despite these constraints, the HHL algorithm has generated considerable excitement in the quantum computing community. It has sparked significant interest in the potential of quantum computing for solving linear systems and related problems, finding applications in diverse domains such as machine learning, data fitting, and differential equations. Experimental demonstrations on small-scale quantum computers have showcased the algorithm''s feasibility, albeit on a limited scale. 

As quantum hardware continues to advance and scale up, there''s optimism that the HHL algorithm and its variants may find increasing applications in solving large-scale linear systems and other related problems, potentially overcoming some of the current limitations through improved quantum technologies and algorithmic refinements.
', '2025-04-22 07:14:05.696+00', '
<Steps>
  <Step title="State Preparation">
    Convert the vector b into a quantum state |b⟩. This step requires efficient quantum state preparation techniques.
  </Step>
  <Step title="Phase Estimation">
    Apply quantum phase estimation to estimate the eigenvalues of the matrix A. This involves implementing the unitary operator e^(iAt).
  </Step>
  <Step title="Eigenvalue Inversion">
    Perform controlled rotations based on the eigenvalues to implement the matrix inversion. This step is crucial for obtaining the solution vector[^7].
  </Step>
  <Step title="Uncomputation">
    Apply inverse quantum phase estimation to uncompute ancilla qubits.
  </Step>
  <Step title="Measurement">
    Measure the system to obtain information about the solution vector x.
  </Step>
</Steps>
', '
[^1]: Harrow, A. W., Hassidim, A., & Lloyd, S. (2009). Quantum algorithm for linear systems of equations. Physical Review Letters, 103(15), 150502.
[^2]: Aaronson, S. (2015). Read the fine print. Nature Physics, 11(4), 291-293.
[^3]: Childs, A. M., Kothari, R., & Somma, R. D. (2017). Quantum algorithm for systems of linear equations with exponentially improved dependence on precision. SIAM Journal on Computing, 46(6), 1920-1950.
[^4]: Berry, D. W. (2014). High-order quantum algorithm for solving linear differential equations. Journal of Physics A: Mathematical and Theoretical, 47(10), 105301.
[^5]: Clader, B. D., Jacobs, B. C., & Sprouse, C. R. (2013). Preconditioned quantum linear system algorithm. Physical Review Letters, 110(25), 250504.
[^6]: Cao, Y., Papageorgiou, A., Petras, I., Traub, J., & Kais, S. (2013). Quantum algorithm and circuit design solving the Poisson equation. New Journal of Physics, 15(1), 013021.
[^7]: Ambainis, A. (2012). Variable time amplitude amplification and quantum algorithms for linear algebra problems. STACS''12 (29th International Symposium on Theoretical Aspects of Computer Science), 636-647.
[^8]: Montanaro, A., & Pallister, S. (2016). Quantum algorithms and the finite element method. Physical Review A, 93(3), 032324.
[^9]: Coles, P. J., et al. (2018). Quantum Algorithm Implementations for Beginners. arXiv preprint arXiv:1804.03719.
[^10]: Lloyd, S., Mohseni, M., & Rebentrost, P. (2014). Quantum principal component analysis. Nature Physics, 10(9), 631-633.', false),
	('3c26b0e6-9613-4272-b3d1-58be873c0f3f', 'quantum-approximate-optimization-algorithm', 'Quantum Approximate Optimization Algorithm (QAOA)', 'A hybrid quantum-classical algorithm that iteratively applies parameterised quantum circuits and optimises the parameters using classical methods to find approximate solutions to combinatorial optimisation problems.', '{Logistics,"Supply Chain",Scheduling,Manufacturing,Transportation,"Resource Allocation","Operations Research","Portfolio Optimization"}', 'TBD', true, '2025-04-28 05:55:30.231458+00', '2025-07-23 11:39:25.816441+00', 'The Quantum Approximate Optimization Algorithm (QAOA) is a hybrid quantum-classical algorithm designed to solve combinatorial optimization problems. It was introduced by Edward Farhi, Jeffrey Goldstone, and Sam Gutmann in 2014 as a general-purpose algorithm for finding approximate solutions to hard optimization problems that are difficult to solve using classical computers[^1]. QAOA has attracted significant attention in the quantum computing community due to its potential to demonstrate quantum advantage on near-term quantum devices.

## Problem Target 

The goal of QAOA is to find the optimal solution to a given optimization problem, which can be expressed as finding the ground state of a corresponding classical Hamiltonian[^2]. The algorithm works by preparing a parameterised quantum state using a series of alternating quantum operations, and then optimizing the parameters using a classical optimization algorithm to minimize the energy of the resulting state.

## Quantum Approach 

QAOA works by encoding an optimization problem into a quantum circuit that alternates between two types of operations: a problem-specific phase separation operator and a mixing operator[^3]. It then uses a classical optimization algorithm to adjust the parameters of this quantum circuit, aiming to minimize the expectation value of the problem Hamiltonian. The process iterates between running the quantum circuit and classical optimization until convergence, producing an approximate solution to the original optimization problem.

## Practical Applications 

One of the key advantages of QAOA is its flexibility and applicability to a wide range of optimization problems, including Max-Cut, graph colouring, and satisfiability problems[^5]. By adjusting the number of alternating layers in the QAOA ansatz, one can trade off between the quality of the approximate solution and the computational resources required. In the limit of an infinite number of layers, QAOA can theoretically converge to the optimal solution, although this is not practically feasible due to the limitations of current quantum hardware.

QAOA has been experimentally demonstrated on various quantum computing platforms, including superconducting qubits and trapped ions6. It has been applied to a range of optimization problems and has shown promising results in finding approximate solutions that are competitive with classical methods.

## Implementation Challenges

 There are still open questions and challenges regarding the performance and scalability of QAOA. The choice of the mixing operator and the efficiency of the classical optimization algorithm can significantly impact the quality of the approximate solutions and the computational resources required[^7]. Moreover, the presence of noise and errors in near-term quantum devices may limit the depth of the QAOA ansatz and the accuracy of the results.

Despite these challenges, QAOA remains an active area of research in the quantum computing community, with ongoing efforts to improve its performance, develop new variants and extensions, and apply it to real-world optimization problems. As quantum hardware continues to improve and scale up, QAOA and related algorithms are expected to play an increasingly important role in demonstrating the potential of quantum computing for solving hard optimization problems.

## Bottom Line

 At the time of writing it looks like QAOA is a promising hybrid quantum-classical algorithm for solving combinatorial optimization problems. Its flexibility, applicability to a wide range of problems, and potential to demonstrate quantum advantage on near-term devices make it an important tool in the quantum computing toolbox. As research in QAOA and related algorithms continues to advance in the NISQ era, we can expect to see new developments and applications emerging, although it is unclear what the future of the algorithm will be as we reach fault-tolerant quantum computing.

', NULL, '<step title="Problem encoding">
The optimization problem is mapped onto a classical Hamiltonian, which encodes the objective function and constraints of the problem. The Hamiltonian is typically expressed as a sum of local terms that can be efficiently implemented on a quantum computer.
</step>

<step title="Ansatz preparation">
A parameterised quantum circuit, called the QAOA ansatz, is constructed by alternating two types of quantum operations: a phase separation operator, which encodes the classical Hamiltonian, and a mixing operator, which introduces quantum fluctuations and enables the exploration of the solution space.
</step>

<step title="Expectation value measurement">
The expectation value of the classical Hamiltonian with respect to the QAOA ansatz is estimated by measuring the output of the quantum circuit and averaging the results over multiple runs. This step requires the efficient evaluation of the local terms in the Hamiltonian.
</step>

<step title="Classical optimization">
A classical optimization algorithm, such as gradient descent or Bayesian optimization, is used to update the parameters of the QAOA ansatz to minimize the expectation value of the Hamiltonian. The optimization process iterates between steps 3 and 4 until convergence is achieved or a maximum number of iterations is reached.
</step>

<step title="Result interpretation">
The final converged parameters of the QAOA ansatz represent an approximate solution to the optimization problem, and the corresponding expectation value provides an estimate of the quality of the solution.
</step>', '[^1]: Farhi, E., Goldstone, J., & Gutmann, S. (2014). A quantum approximate optimization algorithm. arXiv preprint arXiv:1411.4028. 

[^2]: Lucas, A. (2014). Ising formulations of many NP problems. Frontiers in Physics, 2, 5. 

[^3]: Zhou, L., Wang, S. T., Choi, S., Pichler, H., & Lukin, M. D. (2020). Quantum approximate optimization algorithm: Performance, mechanism, and implementation on near-term devices. Physical Review X, 10(2), 021067. 

[^4]: Moll, N., Barkoutsos, P., Bishop, L. S., Chow, J. M., Cross, A., Egger, D. J., Filipp, S., Fuhrer, A., Gambetta, J. M., Ganzhorn, M., Kandala, A., Mezzacapo, A., Müller, P., Riess, W., Salis, G., Smolin, J., Tavernelli, I., & Temme, K. (2018). Quantum optimization using variational algorithms on near-term quantum devices. Quantum Science and Technology, 3(3), 030503.

[^5]: Harrigan, M. P., Sung, K. J., Neeley, M., Satzinger, K. J., Arute, F., Arya, K., Babbush, R., Bacon, D., Bardin, J. C., Barends, R., Boixo, S., Broughton, M., Buckley, B. B., Buell, D. A., Burkett, B., Bushnell, N., Chen, Y., Chen, Z., Chiaro, B., & Martinis, J. M. (2021). Quantum approximate optimization of non-planar graph problems on a planar superconducting processor. Nature Physics, 17(3), 332-336. 

[^6]: Pagano, G., Bapat, A., Becker, P., Collins, K. S., De, A., Hess, P. W., Kaplan, H. B., Kyprianidis, A., Tan, W. L., Baldwin, C., Brady, L. T., Deshpande, A., Liu, F., Jordan, S., Gorshkov, A. V., & Monroe, C. (2020). Quantum approximate optimization of the long-range Ising model with a trapped-ion quantum simulator. Proceedings of the National Academy of Sciences, 117(41), 25396-25401. 

[^7]: McClean, J. R., Boixo, S., Smelyanskiy, V. N., Babbush, R., & Neven, H. (2018). Barren plateaus in quantum neural network training landscapes. Nature Communications, 9(1), 4812. ', false),
	('6d7e573c-1834-4bdf-847a-e598c8c5f506', 'quantum-principal-component-analysis', 'Quantum Principal Component Analysis (QPCA)', 'The quantum analog of classical PCA, used to reduce dataset dimensionality by finding its most important features.', '{"Dimensionality Reduction","Pattern Recognition",Bioinformatics,Statistics,"Data Science","Machine Learning","Image Processing","Market Analysis"}', 'TBD', true, '2025-04-28 06:14:25.011162+00', '2025-07-23 13:59:23.981417+00', 'Quantum Principal Component Analysis (QPCA) is a quantum algorithm that performs Principal Component Analysis (PCA) on quantum data[^1]. PCA is a widely used technique in classical data analysis and machine learning for dimensionality reduction, feature extraction, and data compression. The goal of PCA is to identify the principal components of a dataset, which are the linearly uncorrelated variables that capture the maximum variance in the data.

QPCA is a quantum analog of classical PCA that operates on quantum states instead of classical vectors. It aims to find the principal components of a quantum dataset, which are the eigenstates of the covariance matrix of the dataset. These eigenstates can be used to represent the quantum data in a lower-dimensional space, while preserving the most important information.

## Problem Target

The main advantage of QPCA over classical PCA is its potential for exponential speedup in certain cases[^2]. For example, if the quantum data is prepared by a quantum algorithm or stored in a quantum memory, QPCA can operate directly on the quantum states without the need for costly classical data read-out and processing. This can lead to significant computational savings, especially for high-dimensional datasets.

Quantum Approach The core idea behind QPCA is to manipulate quantum states representing the data and extract information about their eigenvalues and eigenvectors, which correspond to the principal components and their variances. This is often achieved by applying quantum operations, such as Hamiltonian simulation or phase estimation, to prepare quantum states encoding the covariance matrix of the data.

By measuring these prepared states, one can obtain estimates of the eigenvalues and eigenvectors, thereby revealing the principal components and their significance. The quantum nature of the process allows for potential exponential speedups in certain cases, particularly when dealing with large datasets or when the data is inherently quantum in nature. However, the actual speedup achievable depends on the specific implementation and the characteristics of the data.

## Practical Applications

The QPCA algorithm has been theoretically analysed and shown to provide an exponential speedup over classical PCA for certain types of datasets, such as low-rank datasets or datasets with a sparse covariance matrix4. However, the practical implementation of QPCA on near-term quantum devices is still challenging due to the limited qubit count, connectivity, and coherence time of current quantum hardware.

Experimental demonstrations of QPCA have been reported on various quantum computing platforms, including superconducting qubits and photonic qubits. These demonstrations have validated the basic principles of QPCA and have shown its potential for quantum-enhanced data analysis and machine learning.

Ongoing research in QPCA aims to develop more efficient and robust implementations of the algorithm, adapt it to the constraints of near-term quantum devices, and explore its applications in various domains, such as quantum chemistry, quantum finance, and quantum sensing.

## Implementation Challenges

QPCA holds immense promise in various fields, but several challenges and research directions need to be addressed for its full potential to be realised. Efficient state preparation remains a key focus, as researchers strive to develop quantum circuits capable of effectively preparing the quantum dataset and the principal component states, particularly for complex, high-dimensional datasets. Addressing this challenge is crucial for ensuring the practicality and scalability of QPCA.

Another significant area of research is developing noise-resilient covariance estimation methods. Quantum hardware is inherently susceptible to noise and errors, and finding ways to estimate the covariance matrix accurately in the presence of such noise is essential for reliable QPCA results[^5].

Improving the scalability and precision of eigenvalue estimation algorithms is also a priority. Algorithms like Quantum Phase Estimation (QPE) and Variational Quantum Eigensolver (VQE) are crucial for QPCA, but their scalability to larger problems and the precision of their estimates need to be enhanced for real-world applications.

Hybrid quantum-classical algorithms represent another promising avenue of research. Combining QPCA with classical data processing and machine learning techniques can benefit from the strengths of both approaches, potentially leading to more efficient and accurate solutions6.

Finally, tailoring QPCA to specific application domains is an important direction. By incorporating domain knowledge and problem-specific constraints, QPCA can be adapted to address the unique challenges of different fields, such as quantum chemistry or quantum finance, unlocking its full potential in a wide range of applications.

## Bottom Line

Quantum Principal Component Analysis is a promising quantum algorithm for dimensionality reduction and feature extraction of quantum data7. By operating directly on quantum states and exploiting the power of quantum computing, QPCA has the potential to provide exponential speedups over classical PCA in certain cases. As quantum technologies continue to advance, QPCA is expected to play an important role in quantum-enhanced data analysis and machine learning, with applications ranging from quantum chemistry and quantum finance to quantum sensing and beyond. 

', NULL, '<step title="State preparation">
The quantum dataset is prepared as a set of quantum states, each representing a data point. This can be done using a quantum algorithm or a quantum memory that stores the data in a coherent superposition.
</step>
<step title="Covariance matrix estimation">
The covariance matrix of the quantum dataset is estimated using a series of quantum measurements and classical post-processing. This can be done using techniques such as quantum state tomography or quantum state discrimination.
</step>
<step title="Eigenvalue estimation">
The eigenvalues of the covariance matrix are estimated using a quantum algorithm, such as the Quantum Phase Estimation (QPE) algorithm or the Variational Quantum Eigensolver (VQE). These algorithms can find the eigenvalues with a high precision using a small number of quantum operations3.
</step>
<step title="Eigenvector preparation">
The eigenvectors of the covariance matrix (i.e., the principal components) are prepared as quantum states using the estimated eigenvalues and a quantum state preparation circuit. This can be done using techniques such as quantum amplitude amplification or quantum state synthesis.
</step>
<step title="Dimensionality reduction">
The quantum data points are projected onto the subspace spanned by the principal components, effectively reducing the dimensionality of the data. This can be done using a quantum inner product circuit or a quantum swap test.
</step>
<step title="Data analysis.">
The reduced-dimensional quantum data can be analysed using quantum algorithms for clustering, classification, or anomaly detection, depending on the application.
</step>', '[^1]: Lloyd, S., Mohseni, M., & Rebentrost, P. (2014). Quantum principal component analysis. Nature Physics, 10(9), 631-633. 

[^2]: Biamonte, J., Wittek, P., Pancotti, N., Rebentrost, P., Wiebe, N., & Lloyd, S. (2017). Quantum machine learning. Nature, 549(7671), 195-202. 

[^3]: Kitaev, A. Y. (1995). Quantum measurements and the Abelian stabilizer problem. arXiv preprint quant-ph/9511026. 

[^4]: Aaronson, S. (2015). Read the fine print. Nature Physics, 11(4), 291-293. 

[^5]: Preskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79. 

[^6]: Cerezo, M., Arrasmith, A., Babbush, R., Benjamin, S. C., Endo, S., Fujii, K., McClean, J. R., Mitarai, K., Yuan, X., Cincio, L., & Coles, P. J. (2021). Variational quantum algorithms. Nature Reviews Physics, 3(9), 625-644. 

[^7]: Montanaro, A. (2016). Quantum algorithms: an overview. npj Quantum Information, 2(1), 1-8. ', false),
	('9eaba195-477b-4658-9263-6a7d158c1269', 'quantum-phase-estimation', 'Quantum Phase Estimation (QPE)', 'A fundamental quantum algorithm designed to determine the phase associated with an eigenvalue of a given unitary operator when provided with its corresponding eigenvector.', '{"Energy Calculations","Mathematical Research",Spectroscopy,"Molecular Dynamics","Quantum Chemistry","Materials Science","Physics Research","Quantum Simulation"}', 'TBD', true, '2025-04-28 06:12:15.690147+00', '2025-07-23 14:04:16.390438+00', 'Quantum Phase Estimation (QPE) is a fundamental quantum algorithm that plays a crucial role in many quantum computing applications, such as quantum chemistry, quantum simulation, and quantum linear algebra[^1]. The main objective of QPE is to estimate the eigenvalues (phases) of a unitary operator, which can provide valuable information about the properties and behaviour of quantum systems.

QPE is closely related to the Quantum Fourier Transform (QFT) and is often used in conjunction with other quantum algorithms, such as the Harrow-Hassidim-Lloyd (HHL) algorithm for solving linear systems of equations and Shor''s algorithm for factoring large integers2.

## Problem Target 

The problem addressed by QPE can be formulated as follows: given a unitary operator U and an eigenvector |ψ⟩ of U, estimate the corresponding eigenvalue e^(2πiθ), where θ is the phase to be estimated[^3]. The eigenvalue equation can be written as: U|ψ⟩ = e^(2πiθ)|ψ⟩. By applying controlled-U operations on an initial state and measuring the resulting state in the computational basis, the QPE algorithm estimates the phase θ.

## Quantum Approach 

QPE prepares an ancilla qubit register to store the binary representation of the phase, while applying controlled versions of the unitary operator to the target qubit4. The number of controlled operations is doubled with each subsequent ancilla qubit, creating a superposition of states encoding different phase approximations. A subsequent inverse Quantum Fourier Transform (QFT) applied to the ancilla register then collapses the state into a measurement outcome that provides an estimate of the phase with high probability5. The accuracy of the estimation increases with the number of ancilla qubits used in the process. QPE finds applications in diverse quantum algorithms, such as Shor''s factoring algorithm and Hamiltonian simulation.

## Practical Applications 

QPE is a remarkable quantum algorithm with a time complexity of O(1/ε), where ε represents the desired precision of the phase estimation7. This exponential speedup over classical methods, which usually scale polynomially with precision, opens up a world of possibilities across various fields.

In quantum chemistry, QPE is effective in enabling the estimation of ground state energies and other vital properties of molecular systems, accelerating research in drug discovery and materials science8. Quantum simulation, another major beneficiary, harnesses QPE to model the dynamics of quantum systems, advancing our understanding in condensed matter physics and quantum field theory.

QPE also plays a pivotal role in quantum linear algebra, serving as a key component of the HHL algorithm, which boasts an exponential speedup in solving linear systems under certain conditions9. The same can be said for explorations in quantum machine learning, where QPE empowers algorithms like the Quantum Support Vector Machine (QSVM) and Quantum Principal Component Analysis (QPCA) to efficiently extract features and classify high-dimensional data.

## Implementation Challenges

 Despite its power and versatility, QPE also faces challenges in its implementation on real quantum hardware. The algorithm requires a large number of controlled-U operations, which can be difficult to implement with high fidelity on current quantum devices10. Moreover, the precision of the phase estimation is limited by the coherence time of the quantum system and the presence of noise and errors.

Ongoing research in QPE focuses on developing more efficient and robust implementations of the algorithm, as well as exploring new applications in various fields. Some promising directions include the use of error mitigation techniques, such as quantum error correction and dynamical decoupling, to improve the accuracy of the phase estimation, and the development of hybrid quantum-classical approaches that leverage the strengths of both quantum and classical computing[^11].

## Bottom Line 

Quantum Phase Estimation is a powerful and fundamental quantum algorithm that has wide-ranging applications in quantum computing, from quantum chemistry and simulation to linear algebra and machine learning. As quantum hardware continues to advance and scale up, QPE is expected to play an increasingly important role in unlocking the potential of quantum computing for solving complex problems and advancing scientific discovery. ', NULL, '<step title="State preparation">
Prepare a quantum state |ψ⟩ that is an eigenvector of the unitary operator U. This state is typically obtained through some state preparation procedure, such as the Variational Quantum Eigensolver (VQE) or the Quantum Adiabatic Algorithm (QAA).
</step>

<step title="Ancilla qubits">
Initialise a set of ancilla qubits in the |0⟩ state. The number of ancilla qubits determines the precision of the phase estimation.
</step>

<step title="Controlled-U operations">
Apply a sequence of controlled-U operations on the ancilla qubits, where the number of applications of U depends on the position of the ancilla qubit. For example, the first ancilla qubit controls the application of U^(2^0), the second ancilla qubit controls U^(2^1), and so on, up to U^(2^(n-1)), where n is the number of ancilla qubits6.
</step>

<step title="Quantum Fourier Transform">
Apply the inverse Quantum Fourier Transform (QFT) to the ancilla qubits. This step transforms the phase information encoded in the ancilla qubits into the computational basis.
</step>

<step title="Measurement">
Measure the ancilla qubits in the computational basis. The resulting binary string represents an approximation of the phase θ, with a precision that depends on the number of ancilla qubits.
</step>', '[^1]: Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information. Cambridge University Press.

[^ 2]: Shor, P. W. (1994). Algorithms for quantum computation: Discrete logarithms and factoring. Proceedings 35th Annual Symposium on Foundations of Computer Science, 124-134. 

[^3]: Kitaev, A. Y. (1995). Quantum measurements and the Abelian stabilizer problem. arXiv preprint quant-ph/9511026. 

[^4]: Griffiths, R. B., & Niu, C. S. (1996). Semiclassical Fourier transform for quantum computation. Physical Review Letters, 76(17), 3228.

[^ 5]: Abrams, D. S., & Lloyd, S. (1999). Quantum algorithm providing exponential speed increase for finding eigenvalues and eigenvectors. Physical Review Letters, 83(24), 5162.

[^ 6]: Cleve, R., Ekert, A., Macchiavello, C., & Mosca, M. (1998). Quantum algorithms revisited. Proceedings of the Royal Society of London. Series A: Mathematical, Physical and Engineering Sciences, 454(1969), 339-354. 

[^7]: Higgins, B. L., Berry, D. W., Bartlett, S. D., Wiseman, H. M., & Pryde, G. J. (2007). Entanglement-free Heisenberg-limited phase estimation. Nature, 450(7168), 393-396. 

[^8]: Aspuru-Guzik, A., Dutoi, A. D., Love, P. J., & Head-Gordon, M. (2005). Simulated quantum computation of molecular energies. Science, 309(5741), 1704-1707. 

[^9]: Harrow, A. W., Hassidim, A., & Lloyd, S. (2009). Quantum algorithm for linear systems of equations. Physical Review Letters, 103(15), 150502. 

[^10]: Preskill, J. (2018). Quantum Computing in the NISQ era and beyond. Quantum, 2, 79. 

[^11]: Kandala, A., Mezzacapo, A., Temme, K., Takita, M., Brink, M., Chow, J. M., & Gambetta, J. M. (2017). Hardware-efficient variational quantum eigensolver for small molecules and quantum magnets. Nature, 549(7671), 242-246. ', false),
	('462de4e7-2a6d-4a7f-8792-39141fadfb15', 'quantum-boltzmann-machines', 'Quantum Boltzmann Machines', 'Quantum versions of classical Boltzmann machines, designed to use quantum effects for potentially more efficient training and inference.', '{"Data Science","Recommendation Systems","Generative Models","Pattern Recognition","Neural Networks","Machine Learning","AI Research","Statistical Learning"}', 'TBD', true, '2025-04-28 05:57:52.447549+00', '2025-07-23 11:42:34.51526+00', 'Quantum Boltzmann Machines (QBMs) are a class of quantum machine learning models that generalize the classical Boltzmann machines to the quantum domain[^1]. Boltzmann machines are probabilistic graphical models that learn the probability distribution underlying a set of input data and can be used for tasks such as unsupervised learning, generative modeling, and combinatorial optimization.

## Problem Target

 QBMs exploit the power of quantum computing to represent and manipulate complex probability distributions more efficiently than classical Boltzmann machines, particularly for high-dimensional and strongly correlated data[^2]. The key idea behind QBMs is to use quantum states and quantum operations to represent the model parameters and perform the learning and inference tasks.

## Quantum Approach 

A QBM consists of a network of quantum nodes, each representing a qubit or a group of qubits, and connected by quantum edges that encode the interactions between the nodes[^3]. The quantum state of the QBM represents the joint probability distribution of the variables in the model, and the goal of training is to adjust the parameters of the quantum edges to minimize the difference between the model distribution and the target distribution of the input data.

## Practical Applications 

The potential advantages of QBMs over classical Boltzmann machines include some of the usual themes we might expect in such quantum explorations. The exponential speedup is a benefit for certain types of data and model architectures, where QBMs can provide an exponential speedup over classical Boltzmann machines in terms of training time and model capacity[^5]. This is due to the ability of quantum computers to represent and manipulate exponentially large state spaces with a linear number of qubits.

These quantum states and quantum operations can potentially capture more complex and expressive probability distributions than classical models, due to the presence of entanglement and interference effects[^6]. Likewise the improved generalisation of QBMs may result in more robust representations of the input data, by exploiting the quantum superposition and quantum parallelism effects to explore a larger hypothesis space.

## Implementation Challenges 

QBMs face the usual collection of limitations given their reliance on near-term quantum devices. Developing efficient methods for encoding large-scale and high-dimensional classical data into quantum states, while preserving the relevant features and correlations, requires efficient data encoding in the first place. Similar issues exist with designing QBM architectures that can be efficiently implemented on near-term quantum hardware with limited qubit count and gate fidelity. One such example is in noise-resilient training, where the development of robust QBM training algorithms that can operate in the presence of noise and errors in the quantum hardware, requires continual advances in techniques such as error mitigation and quantum error correction.

The practical application of integrating with classical machine learning is also a concern in the current era[^7]. There is much work to be done in exploring hybrid quantum-classical approaches that combine QBMs with classical machine learning techniques, such as pre-training, fine-tuning, and transfer learning, to use the strengths of both paradigms. Experimental demonstrations of QBMs have been reported on various quantum computing platforms, including superconducting qubits, trapped ions, and quantum annealers, showing promising results for small-scale datasets. However, the scalability and performance of QBMs on larger and more realistic datasets remain open research questions.

## Bottom Line

Quantum Boltzmann Machines are a promising class of quantum machine learning models that exploit the power of quantum computing to learn and represent complex probability distributions more efficiently than classical models. By exploiting the quantum superposition, entanglement, and interference effects, QBMs have the potential to provide exponential speedups and enhanced expressivity compared to classical Boltzmann machines, with applications ranging from unsupervised learning and generative modeling to optimization and decision-making. 

However, significant research efforts are still needed to address the challenges of efficient data encoding, scalable model architectures, noise-resilient training, and integration with classical machine learning techniques, before QBMs can be deployed in real-world scenarios. As quantum technologies continue to advance, QBMs are expected to play an important role in the emerging field of quantum-enhanced artificial intelligence.

 ', NULL, '<step title="State preparation">
The input data is encoded into a quantum state, typically using amplitude encoding or qubit encoding. In amplitude encoding, each data sample is represented by a quantum state, where the amplitudes of the basis states correspond to the feature values. In qubit encoding, each feature is assigned to a qubit, and the feature values are encoded in the qubit states.
</step>

<step title="Model initialisation">
The parameters of the QBM, such as the weights of the quantum edges and the biases of the quantum nodes, are initialised to random values or based on prior knowledge. 
</step>

<step title="Quantum sampling">
A quantum sampling algorithm, such as quantum annealing or quantum Gibbs sampling, is used to generate samples from the model distribution4. These algorithms exploit the quantum superposition and quantum tunnelling effects to explore the state space more efficiently than classical sampling methods.
</step>

<step title="Gradient estimation">
The gradients of the model parameters with respect to the objective function, such as the log-likelihood or the Kullback-Leibler divergence, are estimated using the quantum samples and classical post-processing. This can be done using techniques such as quantum back-propagation or quantum natural gradient.
</step>

<step title="Parameter update">
The model parameters are updated based on the estimated gradients, using classical optimization algorithms such as gradient descent or Adam. Steps three to five are repeated until the model converges or a maximum number of iterations is reached. After training, the QBM can be used for tasks such as data generation, anomaly detection, and classification, by sampling from the learned distribution or computing the probabilities of the input data.
</step>', '[^1]: Amin, M. H., Andriyash, E., Rolfe, J., Kulchytskyy, B., & Melko, R. (2018). Quantum Boltzmann machine. Physical Review X, 8(2), 021050.

[^ 2]: Kieferová, M., & Wiebe, N. (2017). Tomography and generative training with quantum Boltzmann machines. Physical Review A, 96(6), 062327. 

[^3]: Benedetti, M., Realpe-Gómez, J., Biswas, R., & Perdomo-Ortiz, A. (2017). Quantum-assisted learning of hardware-embedded probabilistic graphical models. Physical Review X, 7(4), 041052. 

[^4]: Johnson, M. W., Amin, M. H. S., Gildert, S., Lanting, T., Hamze, F., Dickson, N., Harris, R., Berkley, A. J., Johansson, J., Bunyk, P., Chapple, E. M., Enderud, C., Hilton, J. P., Karimi, K., Ladizinsky, E., Ladizinsky, N., Oh, T., Perminov, I., Rich, C., ... & Rose, G. (2011). Quantum annealing with manufactured spins. Nature, 473(7346), 194-198. 

[^5]: Adachi, S. H., & Henderson, M. P. (2015). Application of quantum annealing to training of deep neural networks. arXiv preprint arXiv:1510.06356. 

[^6]: Korenkevych, D., Xue, Y., Bian, Z., Chudak, F., Macready, W. G., Rolfe, J., & Andriyash, E. (2016). Benchmarking quantum hardware for training of fully visible Boltzmann machines. arXiv preprint arXiv:1611.04528. 

[^7]: Khoshaman, A., Vinci, W., Denis, B., Andriyash, E., Sadeghi, H., & Amin, M. H. (2018). Quantum variational autoencoder. Quantum Science and Technology, 4(1), 014001. ', false),
	('5b008285-b825-4763-aab1-58b1aaf97e96', 'quantum-walk-algorithm', 'Quantum Walk Algorithm', 'Quantum Walks use quantum mechanics to create a superposition of possible paths, allowing simultaneous exploration of a graph. They can outperform classical random walks in tasks like search and navigation.', '{"Network Analysis","Graph Theory","Social Networks",Transportation,"Physics Simulation",Logistics,Chemistry,Isomorphism}', 'TBD', true, '2025-04-21 17:00:02.700102+00', '2025-07-23 13:21:19.20523+00', 'Quantum walk algorithms are a class of quantum algorithms that exploit the principles of quantum mechanics to perform walks on graphs or other structured spaces. They are the quantum analogues of classical random walks, which have numerous applications in computer science, physics, and other fields[^1]. However, quantum walks can exhibit markedly different behaviour compared to their classical counterparts, leading to new possibilities for quantum algorithms and simulations.

In a classical random walk, a walker moves randomly between adjacent nodes of a graph, with the probability of moving to each neighbouring node being equal. In contrast, a quantum walk involves a quantum particle (or a quantum state) that moves between the nodes of a graph in a superposition of different paths[^2]. The interference between these paths can lead to a faster spread of the quantum walker compared to the classical random walker, and can also result in the localisation of the quantum walker on certain nodes or subgraphs.

There are two main types of quantum walks: discrete-time quantum walks (DTQW) and continuous-time quantum walks (CTQW)[^3]. In a DTQW, the quantum walker evolves in discrete time steps, and the evolution is governed by a coin operator (which determines the direction of the walk) and a shift operator (which moves the walker between the nodes). In a CTQW, the quantum walker evolves continuously in time according to the Schrödinger equation, with the Hamiltonian of the system determined by the structure of the graph.

## Problem Target 

Quantum walk algorithms have emerged as a powerful tool in various domains, offering significant advantages over classical approaches. In the study of graph traversal and search, quantum walks provide a quadratic speedup compared to their classical counterparts, enabling faster and more efficient exploration of complex networks[^4]. For instance, they can pinpoint a marked node on a graph with remarkable speed, outperforming classical random walks.

Quantum walks also tackle the element distinctness problem with unprecedented efficiency, determining the presence of duplicates in a list significantly faster than classical algorithms[^5]. They also prove invaluable in quantum simulations, shedding light on the dynamics of intricate quantum systems like photosynthetic complexes and disordered media, paving the way for advancements in quantum technologies.

The applications of quantum walks extend to the field of quantum machine learning, where they revolutionise tasks such as clustering, classification, and feature extraction. Quantum walk-based clustering algorithms, for example, can rapidly identify patterns in datasets with exceptional speed.

Finally, quantum walks have made their mark in the domain of quantum cryptography, contributing to the development of secure key distribution protocols and other cryptographic schemes that are resistant to eavesdropping and other threats.

## Quantum Approach 

Quantum walks involve a "walker" in superposition, moving in multiple directions simultaneously[^6]. A quantum coin flip determines movement, and interference between different paths creates unique probability distributions for the walker''s location. This allows quantum walks to excel at searching graphs, simulating quantum systems, and potentially enhancing machine learning and cryptography.

## Practical Applications

The implementation of quantum walk algorithms on quantum hardware requires the ability to perform quantum state preparation, coin and shift operations, and quantum measurements. Experimental realisations of quantum walks have been demonstrated on various platforms, including photonic qubits, trapped ions, and superconducting qubits. These experiments have validated the basic principles of quantum walks and have paved the way for the development of more complex quantum algorithms based on walks.

For continuous-time quantum walks, the evolution is described by a time-dependent Schrödinger equation instead of discrete steps. It''s worth noting that the specific implementation can vary depending on the type of quantum walk (discrete-time or continuous-time) and the problem being solved. Quantum walks can be applied to various tasks such as search algorithms, element distinctness, and graph property testing.

## Implementation Challenges

 The practical implementation of quantum walk algorithms faces challenges, such as the need for high-fidelity quantum operations, the presence of decoherence and noise, and the scalability of the quantum hardware[^7]. Ongoing research in quantum error correction, fault-tolerant quantum computing, and quantum algorithm design aims to address these challenges and unlock the full potential of quantum walks for various applications.

## Bottom Line

 Quantum walk algorithms are a powerful tool in the quantum computing toolbox, with the potential to solve certain problems faster than classical algorithms and to simulate the behaviour of complex quantum systems[^8]. As quantum technologies continue to advance, quantum walks are expected to play an increasingly important role in various fields, from quantum information processing and quantum sensing to quantum-enhanced machine learning and quantum cryptography. 

', NULL, ' <step title="State preparation">
The quantum walk starts with initialising the quantum system in a specific state, usually a superposition of all possible positions.
</step>

 <step title="Evolution">
The quantum walk evolves through a series of steps. Each step typically involves two operations:
   a. Coin operation. A "quantum coin" is flipped, which is usually implemented as a unitary operation (like a Hadamard gate) applied to a coin register. This creates a superposition of "directions" for the walk.
   b. Shift operation. Based on the coin state, the position of the walker is updated. This is usually implemented as a controlled operation that moves the walker based on the coin state.
</step>

 <step title="Measurement">
After a certain number of steps, or at the end of the algorithm, a measurement is performed to collapse the quantum state and obtain a classical outcome.
</step>

 <step title="Repetition">
Steps one to three may be repeated multiple times to gather statistical data about the walk''s behaviour.
</step>


', '[^1]: Kempe, J. (2003). Quantum random walks: An introductory overview. Contemporary Physics, 44(4), 307-327. 

[^2]: Aharonov, Y., Davidovich, L., & Zagury, N. (1993). Quantum random walks. Physical Review A, 48(2), 1687. 

[^3]: Venegas-Andraca, S. E. (2012). Quantum walks: a comprehensive review. Quantum Information Processing, 11(5), 1015-1106. 

[^4]: Shenvi, N., Kempe, J., & Whaley, K. B. (2003). Quantum random-walk search algorithm. Physical Review A, 67(5), 052307.

[^ 5]: Ambainis, A. (2007). Quantum walk algorithm for element distinctness. SIAM Journal on Computing, 37(1), 210-239. 

[^6]: Childs, A. M. (2009). Universal computation by quantum walk. Physical Review Letters, 102(18), 180501. 

[^7]: Kendon, V. (2006). Decoherence in quantum walks—a review. Mathematical Structures in Computer Science, 17(6), 1169-1220. 8. Montanaro, A. (2016). Quantum algorithms: an overview. npj Quantum Information, 2(1), 1-8. ', false),
	('f02557be-ca5c-4b43-94c1-c37484cd6343', 'quantum-amplitude-amplification', 'Quantum Amplitude Amplification (QAA)', 'Quantum Amplitude Amplification (QAA) amplifies the probability amplitude of a desired state, quadratically speeding up the search for solutions in problems where a classical algorithm would require a linear search.', '{Optimization,"Database Search","Algorithm Enhancement","Search Algorithms","Machine Learning","Pattern Recognition","Mathematical Research","Computer Science Theory"}', '', true, '2025-04-28 05:52:38.360013+00', '2025-07-23 14:17:20.812953+00', 'Quantum Amplitude Amplification (QAA) is a fundamental technique in quantum computing that generalises the idea of amplitude amplification, which is the key concept behind Grover''s algorithm for unstructured search. QAA is a powerful tool that can be used to enhance the success probability of quantum algorithms and to speed up the solution of various problems, including optimization, machine learning, and quantum simulation.

## Historical Context 

QAA was developed by Gilles Brassard, Peter Høyer, Michele Mosca, and Alain Tapp, with their comprehensive treatment appearing in 2002 in the paper "Quantum Amplitude Amplification and Estimation”[^1], though the core ideas had been developed and presented at conferences in the late 1990s. This collaboration brought together researchers from the Université de Montréal, the University of Calgary, and the University of Waterloo, representing the strong Canadian contribution to quantum computing theory.

The algorithm emerged from efforts to understand and generalize Grover''s 1996 search algorithm. While Grover''s algorithm had demonstrated a quadratic speedup for searching unsorted databases, researchers recognised that its underlying principle, of selectively amplifying the amplitudes of desired quantum states, was one that could be abstracted and applied more broadly. Brassard, who had co-invented the BB84 quantum key distribution protocol with Charles Bennett in 1984, brought deep insights from quantum cryptography to this algorithmic challenge.

The development of QAA represented a significant conceptual advance in quantum algorithm design. Rather than viewing Grover''s algorithm as a specialised technique for database search, the authors revealed it as a specific instance of a more general amplitude amplification principle. This shift in perspective was similar to how the discovery of general relativity revealed Newtonian gravity as a special case of a more fundamental theory.

The timing of QAA''s development in the late 1990s was particularly significant. The field of quantum computing had moved beyond proving that quantum computers could be more powerful than classical ones and was now exploring the full scope of that power. Researchers were seeking general principles and techniques that could be applied to create new quantum algorithms, rather than discovering isolated algorithmic tricks.

Peter Høyer''s contributions were particularly important in establishing the mathematical framework for amplitude amplification. His work on quantum counting, developed around the same time, showed how amplitude amplification could be combined with quantum phase estimation to count the number of solutions to a search problem—extending the technique''s applicability beyond simple search tasks[^2]. This demonstrated the compositional nature of quantum algorithms, where basic building blocks could be combined to solve more complex problems.

Michele Mosca, who would later become a leading figure in quantum cryptography and post-quantum cryptography, brought expertise in both the theoretical and practical aspects of quantum computing. His involvement highlighted how amplitude amplification techniques were relevant not just for algorithm design but also for understanding the security implications of quantum computers.

The collaborative nature of QAA''s development reflected the increasingly international character of quantum computing research. The algorithm emerged from discussions at conferences and workshops where researchers from different institutions and countries shared ideas. This collaborative approach was essential for recognising the general principles underlying specific quantum algorithms.

QAA''s impact extended far beyond its immediate applications. It provided a powerful tool for quantum algorithm designers, showing how to boost the success probability of any quantum algorithm that could identify desired outcomes. This made it particularly valuable for optimization algorithms, where finding good solutions among many possibilities is the central challenge. The technique has been incorporated into numerous quantum algorithms, from quantum machine learning to quantum simulation.

The development of QAA also contributed to a deeper understanding of the relationship between quantum and classical computation. By showing how amplitude amplification could be applied to any problem where good solutions could be verified, it helped clarify the sources of quantum computational advantage. The quadratic speedup provided by amplitude amplification became recognised as one of the fundamental ways quantum computers could outperform classical machines, alongside the exponential speedups achieved through period finding and related techniques.

## Problem Target 

The goal of QAA is to amplify the amplitude of a desired quantum state (or a set of states) within a larger superposition, while suppressing the amplitudes of the other states. This is achieved by applying a sequence of quantum operations that gradually transform the initial superposition into a state where the desired amplitude is maximised[^3].

Quantum Approach The basic idea behind QAA can be understood in the context of Grover''s algorithm. In Grover''s algorithm, the goal is to find a marked item within an unstructured database of size N. The algorithm starts by preparing a uniform superposition of all possible states, where each state corresponds to a different item in the database. Then, a sequence of quantum operations (known as the Grover iteration) is applied to amplify the amplitude of the marked state, while suppressing the amplitudes of the other states. After O(√N) iterations, the marked state is measured with a high probability, effectively solving the search problem with a quadratic speedup over classical methods[^4].

## Practical Applications 

QAA is a versatile technique that has found applications across various domains of quantum computing. In the area of optimization, it can significantly accelerate the solution of complex problems like the Minimum Vertex Cover and Traveling Salesman problem, offering a quadratic speedup over classical methods by manipulating quantum states to amplify the optimal solution[^6].

It also plays an important role in enhancing the performance of quantum machine learning algorithms. By amplifying the amplitudes of desired feature states, it can boost classification accuracy and speed up convergence, unlocking the full potential of algorithms like Quantum Support Vector Machine (QSVM) and Quantum Principal Component Analysis (QPCA)[^7].

Furthermore, QAA proves invaluable in quantum simulation by efficiently preparing specific quantum states essential for simulations. It can amplify the amplitude of target states within a superposition, allowing for streamlined initialisation of quantum simulators and reducing computational overhead.

Lastly, QAA contributes to the robustness of quantum computing by aiding in error detection and correction. By amplifying the amplitude of error-free states and suppressing erroneous ones, the algorithm helps improve the fidelity of quantum operations and extend the coherence time of quantum devices[^8].

## Implementation Challenges 

The implementation of QAA on quantum hardware requires the ability to perform quantum state preparation, quantum oracles, and reflection operators. Each with varying levels of difficult across the emerging modalities of qubit types and the overall control systems. 

Experimental realisations of the algorithm have been demonstrated on various platforms, including superconducting qubits, trapped ions, and photonic qubits. These experiments have validated the basic principles of QAA and have paved the way for the development of more complex quantum algorithms based on amplitude amplification.

However, the precise nature of a practical implementation also faces challenges, such as the need for high-fidelity quantum operations, the presence of decoherence and noise, and the scalability of the current era of quantum hardware. Ongoing research in quantum error correction, fault-tolerant quantum computing, and quantum algorithm design aims to address these challenges and unlock the full potential of the algorithm for various applications.

## Bottom Line 

Quantum Amplitude Amplification is a powerful technique in quantum computing that generalises the idea of amplitude amplification to a broad class of problems. By amplifying the amplitude of desired quantum states, QAA can enhance the success probability of quantum algorithms and speed up the solution of various problems, from optimization and machine learning to quantum simulation and error correction. As quantum technologies continue to advance, QAA is expected to play an increasingly important role in realising the full potential of quantum computing for real-world applications.

', NULL, '<Steps>
  <Step title="State preparation">
    Initialise the quantum system in a superposition of states, where the desired state (or states) has a non-zero amplitude. This can be achieved using a state preparation circuit that encodes the problem instance.
  </Step>
  <Step title="Amplitude amplification">
Apply a sequence of quantum operations that amplify the amplitude of the desired state while suppressing the amplitudes of the other states. This is typically achieved using a combination of quantum oracles (which mark the desired state) and reflection operators (which invert the amplitudes around the average).
</Step>
  <Step title="Measurement">
Measure the quantum system in the computational basis. If the amplitude amplification has been successful, the desired state will be observed with a high probability.
</Step>
  <Step title="Result interpretation">
The number of amplitude amplification steps required to maximise the success probability depends on the initial amplitude of the desired state. In the case of Grover''s algorithm, where the initial amplitude is 1/√N, the optimal number of steps is approximately π/4 · √N. More generally, if the initial amplitude is α, the optimal number of steps is O(1/α)5.
</Step>





', '[^1]: 1. Brassard, G., Høyer, P., Mosca, M., & Tapp, A. (2002). Quantum amplitude amplification and estimation. Contemporary Mathematics, 305, 53-74.
[^2]: 2. Brassard, G., Høyer, P., & Tapp, A. (1998). Quantum counting. In K. G. Larsen, S. Skyum, & G. Winskel (Eds.), Automata, Languages and Programming (pp. 820-831). Springer.
[^3]: 3. Grover, L. K. (2005). Fixed-point quantum search. Physical Review Letters, 95(15), 150501.
[^4]: 4. Grover, L. K. (1996). A fast quantum mechanical algorithm for database search. Proceedings of the 28th Annual ACM Symposium on Theory of Computing, 212-219.
[^5]: 5. Yoder, T. J., Low, G. H., & Chuang, I. L. (2014). Fixed-point quantum search with an optimal number of queries. Physical Review Letters, 113(21), 210501.
[^6]: 6. Dürr, C., & Høyer, P. (1996). A quantum algorithm for finding the minimum. arXiv preprint quant-ph/9607014.
[^7]: 7. Rebentrost, P., Mohseni, M., & Lloyd, S. (2014). Quantum support vector machine for big data classification. Physical Review Letters, 113(13), 130503.
[^8]: 8. Temme, K., Bravyi, S., & Gambetta, J. M. (2017). Error mitigation for short-depth quantum circuits. Physical Review Letters, 119(18), 180509.', false),
	('ae90e8c4-4431-4b28-8e5d-10c18ff512d4', 'quantum-fourier-transform', 'Quantum Fourier Transform (QFT)', 'A fundamental building block in many significant quantum algorithms, enabling them to achieve computational speedups by efficiently manipulating quantum information in the frequency domain.', '{"Phase Estimation",Cryptography,"Quantum Simulation","Hidden Subgroup Problem","Algorithm Design","Quantum Metrology","Linear Equations",Cryptanalysis}', 'Enables significantly faster analysis of periodic data patterns compared to classical methods', true, '2025-04-18 01:06:30.070088+00', '2025-07-23 13:28:26.383221+00', 'The Quantum Fourier Transform (QFT) is a fundamental quantum algorithm that plays a crucial role in many quantum computing applications. These include quantum phase estimation, Shor''s algorithm for factoring, and quantum simulations[^1]. It is the quantum analog of the classical Discrete Fourier Transform (DFT), which is used to analyse and manipulate signals and data in various fields, including signal processing, image compression, and cryptography.

## Problem Target 

The QFT solves the problem of efficiently transforming a quantum state from the computational basis to the Fourier basis. It allows for the extraction of periodicity and frequency information from quantum states (where the amplitudes of the state are proportional to the discrete Fourier coefficients)[^2]. This transformation is crucial for many quantum algorithms, as it enables them to efficiently analyse and manipulate the frequency components of quantum data.

## Quantum Approach

The QFT uses a series of Hadamard gates and controlled phase rotation gates to efficiently extract periodicity and frequency information from quantum states[^3]. The QFT has a time complexity of O(n²) for n qubits, making it exponentially faster than the classical Discrete Fourier Transform.	

The QFT can be defined as follows: given a quantum state |x⟩ = ∑ₓ αₓ |x⟩ in the computational basis, where x is an n-bit integer and αₓ are the complex amplitudes, the QFT transforms the state into the Fourier basis |ψ⟩ = ∑ₖ βₖ |k⟩, where k is an n-bit integer and βₖ are the Fourier coefficients. The relationship between the amplitudes and the Fourier coefficients is given by: βₖ = (1/√N) ∑ₓ αₓ exp(2πi·xk/N) where N = 2ⁿ is the dimension of the Hilbert space4.

## Practical Applications 

One of the most famous applications of the QFT is in Shor''s algorithm for factoring large integers, which has significant implications for cryptography[^6]. The QFT is used in the period-finding subroutine of Shor''s algorithm, which enables the efficient determination of the period of a modular exponentiation function. This, in turn, allows for the factorisation of large numbers in polynomial time, a feat that is believed to be infeasible for classical computers.

The QFT is also a key component in quantum phase estimation, which is a technique for estimating the eigenvalues of a unitary operator7. Quantum phase estimation is used in many quantum algorithms, such as the Harrow-Hassidim-Lloyd (HHL) algorithm for solving linear systems of equations and the Variational Quantum Eigensolver (VQE) for finding the ground state energy of a quantum system.

In addition to its algorithmic applications, the QFT is also used in quantum error correction schemes, such as the Shor code and the Steane code, where it helps to detect and correct errors in quantum states.

## Implementation Challenges

Despite its importance and efficiency, the QFT is not without its challenges. The implementation of the QFT on real quantum hardware is subject to noise and errors, which can degrade the accuracy of the results. Moreover, the QFT requires a large number of controlled phase rotation gates, which can be difficult to implement with high fidelity on current quantum devices.

Ongoing research in quantum computing aims to address these challenges and improve the implementation of the QFT on near-term quantum devices. This includes the development of error mitigation techniques, such as quantum error correction and dynamical decoupling, as well as the design of more efficient and robust quantum circuits for the QFT.

## Bottom Line

The Quantum Fourier Transform (QFT) is a powerful and versatile quantum algorithm that plays a central role in many quantum computing applications. Its ability to efficiently extract periodicity and frequency information from quantum states makes it a key tool in solving problems that are intractable for classical computers. The QFT and its applications are expected to remain an essential part of the quantum programmer’s toolkit, and be a part of new breakthroughs in the domains ranging from cryptography and materials science to machine learning and optimization. 

', '2025-04-18 01:06:30.070088+00', '<step title="Problem encoding">
Apply a Hadamard gate to the first qubit, which creates a superposition of all possible states in the first qubit.
</step>

<step title="Controlled rotation">
For each subsequent qubit, apply a sequence of controlled phase rotation gates, where the control qubit is the previous qubit, and the angle of rotation depends on the position of the target qubit. The phase rotation angle is given by exp(2πi/2ᵏ), where k is the position of the target qubit.
</step>

<step title="Gate application">
Apply a Hadamard gate to each qubit, which completes the transformation to the Fourier basis.
</step>

<step title="Reorder the qubits">
If necessary, apply a SWAP gate to reverse the order of the qubits, as the QFT naturally produces the output in bit-reversed order. The QFT has a time complexity of O(n²), where n is the number of qubits, making it exponentially faster than the classical DFT, which has a time complexity of O(n2ⁿ). This speedup is one of the main advantages of the QFT and is exploited in many quantum algorithms5.
</step>', '[^1]: Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information. Cambridge University Press.

[^ 2]: Jozsa, R. (1998). Quantum algorithms and the Fourier transform. Proceedings of the Royal Society of London. Series A: Mathematical, Physical and Engineering Sciences, 454(1969), 323-337. 

[^3]: Coppersmith, D. (1994). An approximate Fourier transform useful in quantum factoring. IBM Research Report, RC19642. 

[^4]: Bernstein, E., & Vazirani, U. (1997). Quantum complexity theory. SIAM Journal on Computing, 26(5), 1411-1473. 

[^5]: Cleve, R., Ekert, A., Macchiavello, C., & Mosca, M. (1998). Quantum algorithms revisited. Proceedings of the Royal Society of London. Series A: Mathematical, Physical and Engineering Sciences, 454(1969), 339-354. 

[^6]: Shor, P. W. (1994). Algorithms for quantum computation: Discrete logarithms and factoring. Proceedings 35th Annual Symposium on Foundations of Computer Science, 124-134.

 [^7]: Kitaev, A. Y. (1995). Quantum measurements and the Abelian stabilizer problem. arXiv preprint quant-ph/9511026. ', false),
	('ff12f2c3-5f2e-4bac-93dc-412475ac85ec', 'quantum-gradient-descent', 'Quantum Gradient Descent (QGD)', 'QGD uses quantum computing to accelerate gradient descent, potentially improving optimization and machine learning. It uses quantum properties for faster gradient calculations and parameter updates.', '{Optimization,"Parameter Estimation","Neural Networks","Machine Learning","Training Models","Deep Learning","Predictive Analytics","AI Research"}', '', true, '2025-04-21 16:05:07.452491+00', '2025-07-23 13:42:29.686739+00', 'Quantum Gradient Descent (QGD) is a quantum optimization algorithm that extends the classical gradient descent method to the quantum domain[^1]. Gradient descent is a widely used optimization technique in machine learning, used for training models such as neural networks, support vector machines, and logistic regression. The goal of gradient descent is to find the optimal parameters of a model that minimize a given cost function, by iteratively updating the parameters in the direction of the negative gradient of the cost function.

## Problem Target 

QGD exploits the power of quantum computing to perform the gradient descent updates more efficiently than classical algorithms, particularly for high-dimensional and non-convex optimization problems[^2]. The key idea behind QGD is to use quantum states and quantum operations to represent the model parameters and compute the gradients and updates more efficiently than classical methods.

## Quantum Approach

The core idea behind QGD is to utilise quantum operations to estimate the gradient of the function being optimised. This is often achieved by encoding the function''s parameters into a quantum state and then applying quantum circuits to compute the gradient information[^3]. Quantum superposition and interference effects can be harnessed to simultaneously explore multiple directions in the parameter space, potentially leading to faster convergence compared to classical methods that explore one direction at a time.

QGD typically involves an iterative process where the quantum estimate of the gradient is used to update the parameters, gradually moving closer to the minimum of the function. The specific quantum operations and circuits used for gradient estimation can vary depending on the problem and the available quantum hardware.

## Practical Applications 

The potential advantages of QGD over classical gradient descent include the desired speedup. For certain types of cost functions and parameter spaces, QGD can provide a polynomial or even exponential speedup over classical gradient descent, in terms of the number of iterations and the overall optimization time. This is due to the ability of quantum computers to perform certain operations, such as function evaluations and gradient computations, more efficiently than classical computers.

There’s also an improvement in convergence, where QGD may be able to find better optimization solutions than classical gradient descent, by exploring a larger space of possible parameter configurations and avoiding local minima[^5]. This advantage is also due to the ability of quantum algorithms to perform global search and optimization more efficiently than classical algorithms.

Another potential advantage includes the reduced memory requirements. QGD can potentially reduce the amount of memory required for storing and updating the parameters, by encoding them into quantum states and performing the computations directly on the quantum hardware.

## Implementation Challenges 

The practical implementation of QGD on near-term quantum devices faces several familiar challenges. Efficient parameter encoding requires the development of efficient methods for encoding large-scale and high-precision parameters into quantum states, while preserving the relevant information and gradients. The cost functions need to be scalable and require the design of efficient quantum subroutines for evaluating them and their gradients. These need to be efficiently implemented on near-term quantum hardware with limited qubit count and gate fidelity. Which in turn is currently reliant on noise-resilient optimization, and the development of robust QGD algorithms that can operate in the presence of noise and errors in the quantum hardware.

Similar to other implementations of machine learning approaching in quantum computing, the question of integration with classical machine learning is an open one. Efforts are being made to explore hybrid quantum-classical methods that combine QGD with classical optimization techniques (such as momentum, adaptive learning rates, and regularisation) to leverage the strengths of both paradigms.

Experimental demonstrations of QGD have been reported on various quantum computing platforms, including superconducting qubits and quantum simulators, showing promising results for small-scale problems. However, the scalability and performance of QGD on larger and more realistic problems remain open research questions.

## Bottom Line

Quantum Gradient Descent is a promising quantum optimization algorithm that extends the classical gradient descent method to the quantum domain, with the potential to provide significant speedups and improved convergence for high-dimensional and non-convex optimization problems. By using the power of quantum states and quantum operations to represent the parameters, and compute the gradients and updates more efficiently than classical methods, QGD has the potential to accelerate the training of machine learning models and the solution of optimization problems in various domains, from finance and logistics to physics and chemistry.

Having said that, significant research efforts are still needed to address the challenges of efficient parameter encoding, scalable cost functions, noise-resilient optimization, and integration with classical techniques, before QGD can be deployed in real-world scenarios. As quantum technologies continue to advance, QGD is expected to play an important role in the emerging field of quantum-enhanced optimization and machine learning. 

', '2025-04-23 13:52:05.771+00', '<step title="Parameter encoding">
The model parameters are encoded into a quantum state, typically using amplitude encoding or qubit encoding. In amplitude encoding, each parameter is represented by the amplitude of a basis state in a quantum superposition. In qubit encoding, each parameter is assigned to a qubit or a group of qubits, and the parameter values are encoded in the qubit states.
</step>

 <step title="Cost function evaluation">
The cost function is evaluated for the current set of parameters, using a quantum subroutine that computes the value of the cost function from the quantum state representing the parameters. This can be done using techniques such as Quantum Phase Estimation (QPE), Quantum Amplitude Estimation (QAE), or Variational Quantum Eigensolvers (VQE).
</step>

<step title="Gradient computation">
The gradients of the cost function with respect to the parameters are computed using a quantum subroutine, such as the quantum finite difference method, the quantum back-propagation algorithm, or the parameter-shift rule. These subroutines can estimate the gradients more efficiently than classical methods, by exploiting the quantum parallelism and finite difference effects[^4].
</step>

 <step title="Parameter update">
The parameters are updated based on the computed gradients, using a quantum subroutine that performs the gradient descent update rule, such as the quantum stochastic gradient descent or the quantum Adam optimiser. These subroutines can update the parameters more efficiently than classical methods, by exploiting the quantum superposition and interference effects.
</step>

<step title="FYI">
Steps two to four are repeated until the cost function converges or a maximum number of iterations is reached. After the algorithm terminates, the optimal parameters are obtained by measuring the quantum state and post-processing the results.
</step>', '[^1]: Rebentrost, P., Schuld, M., Petruccione, F., & Lloyd, S. (2016). Quantum gradient descent and Newton''s method for constrained polynomial optimization. arXiv preprint arXiv:1612.01789. 

[^2]: Biamonte, J., Wittek, P., Pancotti, N., Rebentrost, P., Wiebe, N., & Lloyd, S. (2017). Quantum machine learning. Nature, 549(7671), 195-202. 

[^3]: Mitarai, K., Negoro, M., Kitagawa, M., & Fujii, K. (2018). Quantum circuit learning. Physical Review A, 98(3), 032309. 

[^4]: Gilyen, A., Arunachalam, S., & Wiebe, N. (2019). Optimizing quantum optimization algorithms via faster quantum gradient computation. In Proceedings of the Thirtieth Annual ACM-SIAM Symposium on Discrete Algorithms (pp. 1425-1444).

[^5]. Cerezo, M., Arrasmith, A., Babbush, R., Benjamin, S. C., Endo, S., Fujii, K., McClean, J. R., Mitarai, K., Yuan, X., Cincio, L., & Coles, P. J. (2021). Variational quantum algorithms. Nature Reviews Physics, 3(9), 625-644. ', false),
	('c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', 'variational-quantum-eigensolver', 'Variational Quantum Eigensolver (VQE)', 'A hybrid quantum-classical algorithm that finds optimal solutions for complex molecular and optimization problems.', '{"Drug Discovery","Materials Science",Chemistry,"Energy Research","Molecular Modelling","Quantum Chemistry","Battery Technology","Catalyst Design"}', 'Can solve certain molecular chemistry problems more efficiently than classical computers', true, '2025-04-18 01:06:30.070088+00', '2025-07-23 13:52:08.770209+00', 'The Variational Quantum Eigensolver (VQE) is a hybrid quantum-classical algorithm that combines the power of quantum computers with classical optimisation techniques to solve eigenvalue problems, particularly in the context of quantum chemistry and materials science. VQE was introduced in 2014 by a team of researchers from Harvard University and Google1, and has since become one of the most widely studied and implemented algorithms in the field of quantum computing.

## Problem Target 

The main objective of VQE is to find the lowest eigenvalue (ground state energy) and the corresponding eigenvector (ground state) of a given Hamiltonian matrix, which describes the energy of a quantum system2. This is a fundamental problem in quantum chemistry, as the ground state energy and wavefunction provide crucial information about the properties and behaviour of molecules and materials.

## Quantum Approach 

The VQE algorithm tackles this problem by using a parameterised quantum circuit, called the ansatz, to prepare a trial wavefunction. The parameters of the ansatz are then optimised using a classical optimisation algorithm to minimise the expectation value of the Hamiltonian with respect to the trial wavefunction3. The expectation value is estimated by measuring the output of the quantum circuit and averaging the results over multiple runs.

## Practical Applications 

The VQE algorithm has several advantages over classical methods for solving eigenvalue problems in quantum chemistry and materials science5. First, it can leverage the exponential computational space of quantum computers to efficiently represent and manipulate complex wavefunctions, which is challenging for classical computers. Second, VQE is relatively resilient to noise and errors in current quantum hardware, as it relies on short-depth circuits and can incorporate error mitigation techniques. Finally, VQE can be used to solve problems beyond the reach of classical methods, such as strongly correlated systems and excited state properties.

VQE has been experimentally demonstrated on various quantum computing platforms, including superconducting qubits, trapped ions, and photonic qubits6. It has been applied to a range of problems in quantum chemistry and materials science, such as calculating the ground state energies of small molecules, simulating the electronic structure of solids, and optimizing the parameters of quantum circuits for other applications.

## Implementation Challenges

VQE’s performance heavily depends on the choice of ansatz, which can be challenging to design effectively for specific problems. VQE is susceptible to the "barren plateau" problem, where gradients become exponentially small as the system size increases, making optimization difficult7. The classical optimization component may get stuck in local minima, failing to find the global minimum. While relatively resilient to some noise, VQE can still be affected by hardware errors and decoherence, potentially leading to inaccurate results. 

The algorithm also requires a large number of measurements for accurate energy estimation, which can be time-consuming and resource-intensive. Scalability remains a challenge, as the complexity of the optimization problem grows rapidly with system size. Current NISQ device limitations in qubit count, connectivity, and coherence times restrict the complexity of implementable ansatze and the size of tractable problems. 

Additionally, VQE may struggle with excited state calculations and suffer from convergence issues, especially for systems with small energy gaps or near-degenerate states. Addressing these limitations is an active area of research, with ongoing efforts to develop improved ansatze, more efficient optimization techniques, and error mitigation strategies to enhance VQE''s performance and applicability across various domains.

## Bottom Line 

VQE is a powerful hybrid quantum-classical algorithm that exploits the benefits of both quantum and classical computing to solve eigenvalue problems in quantum chemistry and materials science. Its potential to tackle problems beyond the reach of classical methods and its resilience to noise and errors make it a promising approach for near-term quantum computing applications.

A point to keep in mind is that VQE was developed specifically for the NISQ era. Its prominence may decrease in the fault-tolerant era, although it may remain a valuable tool in the quantum computing toolkit, especially for problems where its hybrid and variational nature offer distinct advantages. The exact role of VQE in future quantum computing landscapes will depend on ongoing research, the specific capabilities of fault-tolerant systems, and the nature of the problems being addressed. 

', '2025-04-18 01:06:30.070088+00', ' <step title="Problem encoding">
The Hamiltonian matrix is encoded into a quantum circuit, which can be efficiently executed on a quantum computer. This typically involves mapping the fermionic operators of the Hamiltonian to qubit operators using techniques such as the Jordan-Wigner or Bravyi-Kitaev transformations4.
</step>

 <step title="Ansatz preparation">
A parameterised quantum circuit, the ansatz, is constructed to prepare trial wavefunctions. The ansatz is designed to capture the essential features of the problem and is usually inspired by the structure of the Hamiltonian or the physical system being studied.
</step>

 <step title="Expectation value measurement">
The expectation value of the Hamiltonian with respect to the trial wavefunction is estimated by measuring the output of the quantum circuit and averaging the results over multiple runs. This step requires the efficient evaluation of the terms in the Hamiltonian using techniques such as qubit-wise commuting measurements or low-rank factorisation.
</step>

 <step title="Classical optimisation">
A classical optimisation algorithm, such as gradient descent, Nelder-Mead, or Bayesian optimisation, is used to update the parameters of the ansatz to minimise the expectation value of the Hamiltonian. The optimisation process iterates between steps three and four until convergence is achieved.
</step>

 <step title="Result interpretation">
The final converged parameters of the ansatz represent the approximate ground state wavefunction, and the corresponding expectation value provides an estimate of the ground state energy.
</step>', '[^1]: Peruzzo, A., McClean, J., Shadbolt, P., Yung, M. H., Zhou, X. Q., Love, P. J., Aspuru-Guzik, A., & O''Brien, J. L. (2014). A variational eigenvalue solver on a photonic quantum processor. Nature Communications, 5(1), 4213. 

[^2]: Cao, Y., Romero, J., Olson, J. P., Degroote, M., Johnson, P. D., Kieferová, M., Kivlichan, I. D., Menke, T., Peropadre, B., Sawaya, N. P., Sim, S., Veis, L., & Aspuru-Guzik, A. (2019). Quantum chemistry in the age of quantum computing. Chemical Reviews, 119(19), 10856-10915. 

[^3]: McClean, J. R., Romero, J., Babbush, R., & Aspuru-Guzik, A. (2016). The theory of variational hybrid quantum-classical algorithms. New Journal of Physics, 18(2), 023023. 

[^4]: McArdle, S., Endo, S., Aspuru-Guzik, A., Benjamin, S. C., & Yuan, X. (2020). Quantum computational chemistry. Reviews of Modern Physics, 92(1), 015003. 

[^5]: Cerezo, M., Arrasmith, A., Babbush, R., Benjamin, S. C., Endo, S., Fujii, K., McClean, J. R., Mitarai, K., Yuan, X., Cincio, L., & Coles, P. J. (2021). Variational quantum algorithms. Nature Reviews Physics, 3(9), 625-644.

[^ 6]: Kandala, A., Mezzacapo, A., Temme, K., Takita, M., Brink, M., Chow, J. M., & Gambetta, J. M. (2017). Hardware-efficient variational quantum eigensolver for small molecules and quantum magnets. Nature, 549(7671), 242-246. 7. McClean, J. R., Boixo, S., Smelyanskiy, V. N., Babbush, R., & Neven, H. (2018). Barren plateaus in quantum neural network training landscapes. Nature Communications, 9(1), 4812. ', false);


--
-- Data for Name: case_studies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."case_studies" ("id", "slug", "title", "description", "main_content", "partner_companies", "quantum_companies", "algorithms", "quantum_hardware", "published", "published_at", "created_at", "updated_at", "academic_references", "resource_links", "quantum_software", "year") VALUES
	('5bc389e7-9689-4409-aaea-4562dea188da', 'ibm-daimler-battery', 'IBM and Daimler (Mercedes-Benz) explore battery design', 'Daimler and IBM Quantum simulate chemistry for next-generation lithium-sulfur batteries, exploring quantum computing for materials discovery in the automotive industry.', '## Overview

Daimler AG (now Mercedes-Benz Group AG), one of the world''s premier automotive manufacturers, formed a strategic partnership with IBM Quantum to accelerate the development of next-generation lithium-sulfur batteries using quantum computational methods. This collaboration aimed to simulate complex chemical systems at unprecedented levels of accuracy, potentially overcoming the limitations of current lithium-ion battery technology. The partnership leveraged IBM''s quantum computing expertise and Daimler''s automotive engineering experience to address critical challenges in energy storage for electric vehicles.

## Problem Statement

The transition to electric mobility represents a cornerstone of the automotive industry''s sustainability strategy. However, current lithium-ion battery technology faces limitations in energy density, charging time, weight, and cost that constrain the performance and adoption of electric vehicles. These constraints directly impact consumer acceptance through concerns about driving range, charging convenience, and vehicle affordability—all crucial factors in the competitive automotive market.

Lithium-sulfur batteries offer theoretical advantages that could address these limitations. Their potential benefits include significantly higher energy density—up to five times that of conventional lithium-ion batteries—along with reduced weight due to sulfur''s lighter atomic mass compared to traditional cathode materials. Additionally, sulfur represents an abundant, low-cost material that could reduce battery production expenses while avoiding some of the supply chain concerns associated with cobalt and other critical minerals used in current battery technologies.

Despite these promising characteristics, practical implementation of lithium-sulfur batteries faces significant challenges. The cathode materials demonstrate instability, resulting in rapid capacity degradation over repeated charge-discharge cycles. Complex electrochemical reactions involving multiple sulfur species create modeling challenges that exceed the capabilities of classical computational methods. The formation of polysulfide intermediates during operation leads to the "shuttle effect," where these compounds migrate between electrodes, reducing efficiency and battery lifespan. Interface chemistry between electrolytes and electrodes introduces additional complications that must be understood and addressed for successful commercial implementation.

These problems fundamentally involve quantum mechanical interactions that are difficult to simulate using classical computational approaches. Accurate modeling requires accounting for electronic structures, reaction pathways, and quantum effects that become computationally intractable for classical methods as molecular complexity increases. This quantum nature of the challenge makes battery chemistry an ideal candidate for quantum computational approaches.

## Quantum Approach

The Daimler-IBM collaboration employed sophisticated quantum computational techniques specifically designed to address the quantum mechanical aspects of battery chemistry. The research team developed specialised quantum algorithms for simulating electronic structures and chemical reactions relevant to lithium-sulfur battery chemistry, with particular focus on the Variational Quantum Eigensolver (VQE) and Quantum Phase Estimation (QPE) algorithms.

VQE provided a hybrid quantum-classical approach well-suited to near-term quantum hardware, enabling the simulation of ground state energies and electronic configurations for key molecular components of the battery system. This algorithm allowed researchers to explore reaction energetics and stability characteristics with potentially higher accuracy than classical computational chemistry methods. Meanwhile, QPE implementations, though more demanding in terms of quantum resources, offered a pathway toward even higher precision calculations as quantum hardware capabilities advance.

Recognising current quantum hardware limitations, the solution employed a strategic hybrid approach where quantum processors addressed specific electronic structure calculations, particularly those involving strongly correlated electron systems, while classical computers handled molecular dynamics and broader materials modeling. This division of computational labor maximised the impact of quantum computing resources while acknowledging the practical constraints of contemporary quantum processors.

The team created resource-efficient quantum circuit designs that could effectively represent electronic structures while requiring fewer quantum resources, making the simulations feasible on near-term quantum processors with limited qubit counts and coherence times. These specialised circuit designs, or ansätze, were tailored to capture the essential quantum characteristics of the battery chemistry while minimizing the computational requirements.

To address the noise and errors inherent in current quantum hardware, the researchers implemented advanced error suppression and mitigation methods. These techniques helped improve algorithm performance by reducing the impact of device imperfections, allowing more accurate results to be extracted from noisy quantum computations.

The algorithms were tested and refined using IBM''s superconducting qubit systems, accessed through IBM''s cloud-based quantum computing service. This iterative development process allowed continuous improvement as the team gained insights from experimental results and refined their approach accordingly.

## Results and Business Impact

The collaboration between Daimler AG and IBM produced several significant outcomes that advanced the understanding of lithium-sulfur battery chemistry and demonstrated quantum computing''s potential in materials science applications. The team successfully modelled key aspects of lithium-sulfur chemistry with quantum algorithms, gaining insights into reaction mechanisms that were difficult to obtain with classical methods.

The quantum approach enabled more accurate electronic structure modeling, particularly for polysulfide species involved in the troublesome shuttle effect. These simulations revealed electronic configurations and energy relationships that helped explain the degradation mechanisms limiting lithium-sulfur battery performance. By understanding these fundamental processes at the quantum level, researchers identified potential intervention points for improving battery stability.

Materials screening emerged as another valuable application of the quantum methods. The research team developed computational workflows that combined quantum simulations with classical analysis to evaluate potential cathode materials and electrolyte compositions. This screening process identified several promising candidates with theoretical properties that could mitigate the stability issues plaguing lithium-sulfur technology. The most promising materials were selected for experimental validation, creating an accelerated development pathway from computational prediction to physical testing.

The project also advanced quantum chemistry algorithms specifically tailored to battery material simulations. These algorithmic innovations focused on creating efficient representations of complex molecular systems while minimizing quantum resource requirements—a critical consideration given current hardware limitations. The methodologies developed through this collaboration established approaches applicable to a broader range of materials science challenges beyond battery chemistry.

For Daimler AG, these technical achievements translated into significant business advantages. The accelerated materials discovery process potentially reduced development timelines for advanced energy storage solutions—a critical competitive factor in the rapidly evolving electric vehicle market. By identifying promising material combinations early in the development process, the company positioned itself to secure intellectual property that could provide lasting advantages in electric vehicle technology.

The collaboration also fostered the development of internal quantum computing expertise applicable to other automotive R&D challenges. This knowledge base represents a strategic asset as quantum computing continues to mature, allowing Daimler to apply similar approaches to other materials and systems throughout their vehicles. The experience gained through this project established frameworks for integrating quantum computational methods into broader research and development workflows.

From a strategic perspective, the project reinforced Daimler''s position as an innovator in automotive technology and sustainable mobility. The forward-looking investment in quantum computing applications demonstrated the company''s commitment to leveraging advanced technologies to address fundamental challenges in electric vehicle development. This positioning enhances brand value while attracting research talent interested in working at the intersection of automotive innovation and quantum technology.

Perhaps most importantly from a business perspective, the insights gained through quantum simulation could potentially lead to significant cost reductions in battery development. By utilising computational screening to identify the most promising materials before extensive physical prototyping, the company could focus laboratory resources on candidates with the highest probability of success. This approach reduces the trial-and-error component of materials development, potentially saving millions in research costs while accelerating time to market.

## Future Directions

Building on the initial success of their quantum battery research collaboration, Daimler AG and IBM outlined an ambitious agenda for future development. Algorithm enhancement represents a continuing priority, with ongoing work to improve quantum approaches for simulating increasingly complex battery systems. These enhancements focus on both accuracy improvements and computational efficiency, allowing more comprehensive modeling as quantum hardware capabilities evolve.

The research scope continues to expand beyond the initial focus on lithium-sulfur chemistry. The team is extending quantum modeling approaches to additional battery technologies, including solid-state electrolytes and novel electrode materials that could offer complementary advantages. This broader exploration ensures that quantum insights can inform multiple parallel development tracks, maximising the potential for breakthrough discoveries.

Integration with experimental workflows represents another key development direction. The researchers are creating tighter connections between quantum computational predictions and laboratory validation, establishing feedback loops that refine models based on experimental results. This integration accelerates the iteration cycle between theoretical prediction and practical verification, enhancing the efficiency of the overall materials discovery process.

As IBM''s quantum hardware evolves with improvements in qubit counts, coherence times, and gate fidelities, the team continues to adapt their algorithms to take advantage of these advancements. This hardware-specific optimization ensures that each new generation of quantum processors can be applied to increasingly sophisticated battery simulations, progressively addressing more complex aspects of battery chemistry.

The success of the battery chemistry research has inspired exploration of quantum computing applications in other areas of automotive development. Promising directions include lightweight structural materials that could improve vehicle efficiency, catalyst materials for emissions control systems, and hydrogen storage solutions for fuel cell vehicles. These additional applications leverage the quantum simulation expertise developed through the battery research while addressing other critical aspects of sustainable mobility.

## Conclusion

The Daimler AG-IBM collaboration demonstrates the potential for quantum computing to address fundamental challenges in battery chemistry research, a critical component of the automotive industry''s transition to electrification. While practical quantum advantage for full-scale battery simulations remains a future goal dependent on hardware advances, this partnership has established a viable pathway toward quantum-enhanced materials discovery.

The project has moved quantum computing from theoretical discussions to practical applications in industrial research. By focusing on one of the most pressing challenges in electric vehicle development, namely battery performance and cost, the collaboration addressed a problem with immediate business relevance while developing approaches that can transfer to other materials science challenges.

The methodical approach taken by Daimler and IBM Quantum illustrates a practical strategy for adopting quantum computing in industrial settings. Rather than waiting for fault-tolerant quantum computers, the partners developed hybrid quantum-classical methods that extract value from current quantum systems while establishing frameworks that can scale with hardware improvements. This incremental approach delivers near-term business value while positioning Daimler to capture additional benefits as quantum technology matures.

For the broader automotive industry, this case study highlights how quantum computing might accelerate the transition to sustainable mobility by addressing fundamental materials challenges that have persisted despite decades of classical research. The ability to model and predict the behaviour of complex chemical systems at the quantum level could unlock new battery chemistries, lightweight materials, and catalytic systems that enable the next generation of efficient, affordable electric vehicles.

As quantum computing continues its rapid evolution, collaborations like the Daimler-IBM partnership demonstrate how forward-thinking companies can gain competitive advantages by engaging early with transformative technologies. By building quantum expertise, developing application-specific algorithms, and creating integrated computational-experimental workflows, Daimler has positioned itself to lead in the application of quantum computing to automotive innovation—potentially transforming how advanced materials are discovered and optimised for the vehicles of tomorrow.', '{Daimler,Mercedes-Benz}', '{IBM}', '{}', '{"IBM Q Valencia","IBM Q System One"}', true, '2025-04-18 01:06:30.070088+00', '2025-04-18 01:06:30.070088+00', '2025-07-22 07:21:29.266253+00', '[^1]: IBM. (n.d.). Mercedes-Benz bets on quantum to craft the future of electric vehicles. IBM Case Studies. https://www.ibm.com/case-studies/daimler

[^2]: IBM Quantum Computing Blog. (2020). IBM and Daimler use quantum computer to develop next-gen batteries. https://www.ibm.com/quantum/blog/next-gen-lithium-sulfur-batteries

[^3]: Green Car Congress. (2020, January 14). IBM, Daimler researchers use quantum computer to simulate Li-sulfur battery chemistry. https://www.greencarcongress.com/2020/01/20200114-quantum.html

[^4]: IBM Mediacenter. (n.d.). See how Mercedes-Benz is using quantum computers to design better batteries. https://mediacenter.ibm.com/media/See+how+Mercedes-Benz+is+using+quantum+computers+to+design+better+batteries/1_dm6myi14

[^5]: Quantum Algorithms Institute. (2024, December 13). Driving Innovation: How Daimler AG and IBM are Transforming Battery Technology with Quantum Computing. https://www.qai.ca/resource-library/driving-innovation-how-daimler-ag-and-ibm-are-transforming-battery-technology-with-quantum-computing

[^6]: Daimler. (n.d.). What''s behind quantum computing and why Daimler is researching it. https://www.daimler.com/magazine/technology-innovation/quantum-computing.html

[^7]: The Quantum Insider. (2022, February 24). Quantum Computers Can Help Electric Vehicles Travel Farther, Charge Faster. https://thequantuminsider.com/2020/01/19/daimler-ag-plugs-into-ibms-quantum-computer-to-boost-electric-vehicles/

[^8]: Inside Quantum Technology. (2019, February 26). Mercedes & IBM Teaming to Use Quantum Computing to Build Electric Vehicle Battery. https://www.insidequantumtechnology.com/news-archive/mercedes-ibm-teaming-use-quantum-computing-build-electric-vehicle-battery/

[^9]: IoT Automotive News. (2020, March 31). IBM AND DAIMLER USE QUANTUM COMPUTER TO DEVELOP NEXT-GEN BATTERIES. https://iot-automotive.news/ibm-and-daimler-use-quantum-computer-to-develop-next-gen-batteries/
', '[{"url": "https://arxiv.org/abs/2001.01120", "label": "Quantum Chemistry Simulations of Dominant Products in Lithium-Sulfur Batteries", "order": 1}, {"url": "https://www.ibm.com/quantum/blog/next-gen-lithium-sulfur-batteries", "label": "IBM and Daimler use quantum computer to develop next-gen batteries", "order": 2}]', '{Qiskit,"IBM Quantum Experience"}', 2020),
	('fa955b24-adce-45b9-a004-0131a38e4d9f', 'microsoft-azure-quantum-ford', 'Microsoft and Ford explore traffic flow optimisation', 'Microsoft Azure Quantum and Ford explore opportunities to improve traffic flow optimisation.', 'Microsoft Azure Quantum partnered with Ford Motor Company in 2022 to explore quantum computing applications for manufacturing optimization, focusing on traffic routing and material simulation challenges. This collaboration aimed to leverage quantum algorithms to solve complex optimization problems that are computationally intensive for classical computers, potentially revolutionising Ford''s manufacturing and logistics operations.

## Introduction
The partnership between Microsoft Azure Quantum and Ford Motor Company represents a significant milestone in applying quantum computing to real-world automotive manufacturing challenges. As one of the world''s largest automotive manufacturers, Ford faces numerous complex optimization problems in its global operations, from supply chain management to traffic routing and materials science. Traditional computing methods often struggle with the exponential complexity of these problems, particularly when dealing with multiple variables and constraints. Microsoft Azure Quantum, with its cloud-based quantum computing platform and ecosystem of quantum hardware providers, offered Ford access to cutting-edge quantum technologies without requiring massive infrastructure investments. This collaboration began in 2022 as part of Ford''s broader digital transformation strategy, aiming to explore how quantum computing could provide competitive advantages in manufacturing efficiency, cost reduction, and innovation acceleration. The partnership focused on identifying specific use cases where quantum algorithms could outperform classical approaches, establishing proof-of-concepts, and developing a roadmap for quantum adoption in automotive manufacturing.

## Challenge
Ford''s manufacturing operations face several computationally complex challenges that traditional computing struggles to solve efficiently. One primary challenge involves traffic routing optimization in urban environments, crucial for Ford''s autonomous vehicle development and logistics operations. With millions of vehicles on roads creating dynamic traffic patterns, calculating optimal routes in real-time requires processing vast amounts of data with numerous variables and constraints. Classical algorithms often require simplifications that compromise solution quality. Another significant challenge lies in quantum chemistry simulations for developing new materials, particularly for electric vehicle batteries and lightweight components. Simulating molecular interactions at the quantum level demands exponential computational resources on classical computers, limiting Ford''s ability to rapidly prototype and test new materials. Additionally, Ford''s global supply chain optimization presents a massive combinatorial problem, with thousands of suppliers, multiple manufacturing plants, and complex logistics networks. Finding optimal configurations that minimize costs while maintaining reliability and flexibility becomes increasingly difficult as the network grows. These challenges directly impact Ford''s competitiveness, affecting everything from production costs to innovation speed and customer satisfaction.

## Solution
Microsoft Azure Quantum provided Ford with a comprehensive quantum computing solution addressing multiple optimization challenges. For traffic routing optimization, the team implemented quantum-inspired optimization algorithms running on Azure Quantum''s cloud platform, utilising both quantum simulators and actual quantum hardware from providers like IonQ and Honeywell. These algorithms leveraged quantum annealing and variational quantum eigensolver (VQE) approaches to explore solution spaces more efficiently than classical methods. For materials simulation, Azure Quantum''s chemistry library enabled Ford to run quantum simulations of molecular structures relevant to battery chemistry and lightweight materials. The solution incorporated hybrid classical-quantum algorithms that decompose problems into components best suited for each computing paradigm. Microsoft''s Q# programming language and Quantum Development Kit provided Ford''s engineers with tools to develop and test quantum algorithms without deep quantum physics expertise. The platform''s cloud-based nature allowed Ford to experiment with different quantum hardware backends, comparing performance across various quantum technologies. Additionally, Azure Quantum''s integration with classical Azure services enabled seamless data flow between Ford''s existing systems and quantum computations, facilitating practical implementation within Ford''s IT infrastructure.

## Implementation
The implementation of Azure Quantum at Ford followed a phased approach designed to minimize risk while maximising learning opportunities. Phase one involved establishing a quantum computing centre of excellence within Ford, training select engineers and data scientists on quantum programming using Microsoft''s educational resources and workshops. Ford''s team started with quantum simulators to develop and test algorithms before moving to actual quantum hardware. For the traffic routing use case, Ford integrated Azure Quantum with their existing traffic simulation systems, creating a hybrid workflow where quantum algorithms handled the most computationally intensive optimization tasks. The implementation included developing custom Q# libraries specific to Ford''s optimization problems and creating interfaces between quantum algorithms and Ford''s data systems. Microsoft provided ongoing technical support, including quantum algorithm experts who worked directly with Ford''s team to optimise implementations. The teams established benchmarking protocols to compare quantum and classical algorithm performance across various problem sizes and complexities. Security and intellectual property considerations were addressed through Azure''s enterprise-grade security features and carefully structured data sharing agreements. Regular review meetings ensured alignment between technical development and business objectives, with clear metrics for evaluating quantum advantage.

## Results & Business Impact
The partnership yielded significant results across multiple dimensions of Ford''s operations. In traffic routing optimization, quantum-inspired algorithms demonstrated up to 20% improvement in solution quality for complex urban routing scenarios compared to classical approaches, with potential implications for reducing delivery times and fuel consumption across Ford''s logistics network. While full quantum advantage remains limited by current hardware capabilities, the quantum simulators provided valuable insights into algorithm design that improved even classical implementations. For materials simulation, quantum algorithms successfully modelled battery chemistry components that were previously computationally prohibitive, potentially accelerating Ford''s electric vehicle battery development by months. The business impact extended beyond immediate technical achievements. Ford established itself as an early adopter of quantum computing in automotive manufacturing, enhancing its reputation for innovation. The quantum computing expertise developed through this partnership positioned Ford to capitalise on future quantum breakthroughs. Cost savings from optimization improvements, though still being quantified, showed promise for significant ROI as quantum hardware matures. Perhaps most importantly, the partnership created a framework for ongoing quantum exploration, with Ford now capable of independently evaluating and implementing quantum solutions for emerging challenges.

## Future Directions
Looking ahead, Microsoft and Ford plan to expand their quantum computing collaboration into new areas of automotive innovation. As quantum hardware continues to improve, with increasing qubit counts and lower error rates, Ford anticipates tackling larger and more complex optimization problems. Priority areas include full supply chain optimization incorporating thousands of variables, advanced materials discovery for next-generation vehicles, and real-time manufacturing scheduling across global facilities. Ford is investing in building internal quantum expertise, planning to expand their quantum team and establish dedicated quantum computing labs. The partnership will explore emerging quantum technologies, including topological qubits being developed by Microsoft, which promise greater stability and scalability. Integration with artificial intelligence and machine learning systems represents another frontier, where quantum-classical hybrid algorithms could enhance Ford''s predictive maintenance and quality control systems. Both companies are committed to contributing to the broader quantum ecosystem, sharing learnings and best practices with the automotive industry while maintaining competitive advantages. The ultimate vision involves quantum computing becoming a standard tool in Ford''s computational toolkit, seamlessly integrated with classical systems to solve previously intractable problems.', '{Ford}', '{Microsoft}', NULL, '{"IonQ Harmony","IonQ Aria","Quantinuum System Model H1"}', true, NULL, '2025-05-05 09:16:35.040295+00', '2025-07-22 10:33:09.072031+00', '[^1]: Nguyen, H.T., Usman, M., & Buyya, R. (2023). iQuantum: A case for modeling and simulation of quantum computing environments. IEEE Conference on Quantum Computing and Engineering. Available at: https://ieeexplore.ieee.org/abstract/document/10234319/
[^2]: Gill, S.S., & Buyya, R. (2024). Transforming research with quantum computing. Journal of Economy and Technology, Elsevier. Available at: https://www.sciencedirect.com/science/article/pii/S2949948824000295
[^3]: Angara, P.P., Stege, U., & MacLean, A. (2020). Quantum computing for high-school students an experience report. IEEE Conference on Quantum Computing and Engineering. Available at: https://ieeexplore.ieee.org/abstract/document/9259970/
[^4]:  q qRot, P.A. (2023). The Business Ecosystem of the Quantum Computing Market: Cooperation and Competition. TU Delft Repository. Available at: https://repository.tudelft.nl/file/File_f2b8c01f-bcad-4f79-8990-f177456c3b90?preview=1', '[{"url": "https://omdia.tech.informa.com/om030786/on-the-radar-microsoft-azure-quantum-tightens-the-integration-of-qc-and-classical-computing", "label": "On the Radar: Microsoft Azure Quantum tightens the integration of QC and classical computing", "order": 1}, {"url": "https://azure.microsoft.com/en-us/blog/", "label": "How Microsoft and Quantinuum achieved reliable quantum computing", "order": 2}]', '{"Microsoft Azure Quantum","Azure Quantum''s Chemistry Library","Quantum Development Kit (QDK)","Q# Programming Language"}', 2022),
	('833b4b11-7998-464d-96b5-c1c09376d81a', 'pasqal-bmw-automotive-materials-simulation', 'Pasqal and BMW Group explore automotive materials simulation ', 'A strategic partnership focusing on automotive materials simulation, including crash test simulations and battery chemistry optimization for electric vehicles.', 'BMW Group, one of the world''s leading premium automobile manufacturers, established a strategic partnership with Pasqal, a French quantum computing startup specialising in neutral atom quantum processors. The collaboration focuses on applying quantum computing to automotive materials simulation, specifically targeting crash test simulations and battery chemistry optimization for electric vehicles. By combining BMW''s automotive engineering expertise with Pasqal''s quantum computing capabilities, the partnership aims to accelerate vehicle development cycles, enhance safety performance, and improve battery efficiency for BMW''s next-generation vehicles.

## Problem Statement

Automotive design and manufacturing involve complex materials science challenges that significantly impact vehicle performance, safety, and sustainability. Traditional computational approaches for simulating material deformation in crash tests and modeling battery chemistry face limitations in accuracy and computational efficiency. These simulations involve quantum mechanical interactions that classical computers struggle to model precisely, forcing engineers to rely on approximations that compromise accuracy or requiring enormous computational resources that extend development timelines.

For BMW Group, whose competitive advantage partly derives from engineering excellence and innovation, these computational limitations create tangible business constraints. Vehicle safety development requires extensive physical crash testing that is both time-consuming and expensive. Battery development for electric vehicles involves complex chemistry optimization across multiple parameters including energy density, charging speed, longevity, and thermal stability. This is a multidimensional optimization problem that grows exponentially in complexity with each additional variable.

The business implications of these computational challenges are substantial. Extended development cycles increase time-to-market for new vehicle models and features. Suboptimal battery chemistry constrains electric vehicle performance and adoption. Physical testing requirements increase development costs and material waste. As the automotive industry accelerates its transition to electrification, these challenges become increasingly critical to competitive positioning and sustainability objectives.

BMW identified material deformation simulation and battery chemistry optimization as areas where quantum computing might offer advantages over classical approaches. These applications involve modeling quantum mechanical interactions that determine material properties and chemical reactions. Which is precisely the types of problems where quantum computers have theoretical advantages over classical systems.

## Quantum Approach

The BMW-Pasqal collaboration implemented a sophisticated quantum computational strategy tailored to automotive materials challenges. This approach leverages Pasqal''s neutral atom quantum processors, which can arrange more than 100 atoms in programmable arrays to perform quantum computations.

The technical implementation focuses on two complementary applications: material deformation simulation for crash safety and battery chemistry optimization for electric vehicles. For crash test simulations, the team developed quantum algorithms that model how materials deform under stress at the quantum mechanical level, potentially capturing behaviours that classical simulations might miss. These implementations aim to enhance prediction accuracy for material responses in crash scenarios, supporting vehicle safety design with reduced physical testing requirements.

In battery chemistry applications, the partnership created quantum computational approaches for modeling complex electrochemical reactions within battery cells. These methods address the multidimensional optimization challenge of balancing energy density, charging performance, cycle stability, and thermal properties. The quantum algorithms aim to identify promising material combinations and chemical configurations that might be overlooked by conventional simulation methods.

Pasqal''s neutral atom quantum technology offers specific advantages for these materials science applications. The processors can be configured to mirror the natural arrangement of atoms in materials, potentially providing more efficient simulations of material properties. The platform allows direct quantum simulation of many-body physics problems that are exponentially complex for classical computers.

Given current quantum hardware limitations, the partnership employed a pragmatic hybrid approach combining quantum algorithms for specific computational components with classical pre- and post-processing. This hybrid strategy delivers near-term benefits while establishing a framework for more comprehensive quantum advantage as the technology matures.

The collaboration developed specialised problem formulations that make complex materials science challenges more amenable to quantum processing. These techniques include mathematical mappings between material properties and quantum states, efficient encoding of structural information, and problem decomposition strategies that leverage the specific strengths of neutral atom quantum computing.

## Results and Business Impact

The collaboration has produced promising initial outcomes demonstrating quantum computing''s potential for automotive applications. Early implementations showed that quantum-enhanced materials simulations could capture certain material behaviours more accurately than classical approaches, particularly for complex composite materials used in vehicle structures. These enhanced simulations could potentially reduce the number of physical crash tests required during vehicle development, accelerating the design process while maintaining or improving safety standards.

Battery chemistry optimisations leveraging quantum approaches identified several promising material configurations for further investigation. While still in the research phase, these quantum-enhanced insights could potentially contribute to next-generation battery designs with improved performance characteristics. The quantum algorithms demonstrated particular advantages for modeling complex electron interactions within battery materials, a key factor in determining energy density and charging behaviour.

For BMW Group, these technical achievements translate into meaningful business advantages across their product development lifecycle. Enhanced simulation capabilities support more efficient vehicle design with fewer physical prototyping iterations. Improved battery optimization contributes directly to BMW''s electrification strategy, a core competitive priority as the automotive industry transitions away from internal combustion engines. The accelerated materials discovery process could potentially reduce time-to-market for innovations while enhancing product performance.

Beyond these immediate development benefits, the collaboration positions BMW at the forefront of quantum computing applications in automotive manufacturing. This leadership in computational materials science strengthens the company''s innovation profile and creates opportunities for continued competitive differentiation as quantum technology matures. The expertise developed through this partnership represents a strategic asset that will appreciate in value as quantum computing capabilities expand.

## Future Directions

Building on their initial progress, BMW and Pasqal have outlined several promising directions for continued development. Algorithm refinement remains a primary focus, with ongoing work to improve both the accuracy and computational efficiency of quantum approaches for automotive materials simulations. These enhancements aim to expand the range of materials and scenarios that can be effectively modelled while improving prediction quality for existing applications.

The partners are extending their quantum computational methods to additional automotive applications, including aerodynamic design optimization, noise vibration harshness (NVH) prediction, and manufacturing process simulation. This expansion follows a strategic roadmap that aligns growing quantum capabilities with increasingly sophisticated automotive engineering challenges.

Integration with BMW''s existing simulation and design workflows represents another key development area. The collaboration is creating seamless connections between quantum-enhanced simulations and BMW''s established engineering platforms, enabling design engineers to leverage quantum computational advantages without requiring specialised quantum expertise. These integration efforts focus on creating practical tools that deliver quantum benefits within familiar design environments.

As quantum hardware advances, the team continuously evaluates opportunities to scale implementations to more complex materials systems and larger simulation domains. This progressive scaling strategy ensures that automotive applications can capitalise on expanding quantum computational capabilities as they become available while maintaining practical benefits from current limitations.

The collaboration is also exploring quantum machine learning techniques that could enhance materials property prediction based on limited experimental data. These hybrid approaches could further accelerate materials discovery by efficiently navigating the vast design space of potential materials configurations.

## Conclusion

The BMW-Pasqal partnership demonstrates how quantum computing can enhance automotive materials development today while establishing frameworks for greater advantages as quantum hardware matures. By implementing a practical strategy that combines quantum and classical approaches, this collaboration has created a viable pathway for quantum computing adoption in automotive engineering.

The strategic approach taken by these organisations illustrates how automotive manufacturers can effectively engage with quantum computing technologies, such as developing expertise, establishing methodologies, and creating engineering workflows that position them to capitalise on each advancement in quantum hardware. Rather than treating quantum computing as a distant future technology, this pragmatic strategy delivers current value while building capabilities for transformative future advantages.

For the automotive industry broadly, this case study highlights quantum computing''s potential to transform materials development by addressing the quantum mechanical nature of material properties that fundamentally limit classical simulation approaches. The ability to more accurately model and optimise materials at the atomic level could significantly enhance vehicle performance, safety, and sustainability, supporting both business objectives and environmental goals during a critical industry transition toward electrification.

As quantum computing continues its rapid evolution, forward-thinking automotive companies that invest in quantum capabilities today may gain substantial competitive advantages in development efficiency, product performance, and innovation capacity. The BMW-Pasqal collaboration exemplifies how strategic partnerships between industry leaders and quantum technology specialists can accelerate progress toward practical quantum applications with significant business impact.

', '{BMW}', '{Pascal}', NULL, '{Orion}', true, NULL, '2025-05-05 10:39:21.430034+00', '2025-07-22 10:22:50.898126+00', '[^1]: BMW Group. (2023). BMW Group and Pasqal announce collaboration agreement to enhance and accelerate design and development processes. [Press Release]. Retrieved from https://www.press.bmwgroup.com/global/article/detail/T0400001EN/bmw-group-and-pasqal-announce-collaboration-agreement
    
[^2]: Pasqal. (2023). Pasqal announces new commercial partnership with BMW Group to enhance vehicle development and production. [Press Release]. Retrieved from https://pasqal.com/2023/01/06/pasqal-announces-new-commercial-partnership-with-bmw-group/
    
[^3]: Motta, M., Sun, C., Tan, A. T., O''Rourke, M. J., Ye, E., Minnich, A. J., Brandão, F. G., & Chan, G. K. (2020). Determining eigenstates and thermal states on a quantum computer using quantum imaginary time evolution. Nature Physics, 16(2), 205-210. https://doi.org/10.1038/s41567-019-0704-4
    
[^4]: Henriet, L., Beguin, L., Signoles, A., Lahaye, T., Browaeys, A., Reymond, G.O., & Jurczak, C. (2020). Quantum computing with neutral atoms. Quantum, 4, 327. https://doi.org/10.22331/q-2020-09-21-327
    
[^5]: Automotive World. (2023). Quantum Computing in Automotive Design: Applications and Implementation Case Studies. Industry Report.
    
[^6]: European Quantum Industry Consortium. (2023). Quantum Technologies in Manufacturing: Case Studies and Economic Impact. EUQIC Technical Report.
    
[^7]: Boston Consulting Group. (2023). Quantum Computing in Automotive R&D: Industry Assessment and Outlook. BCG Industry Analysis.
    
[^8]: Quantum Economic Development Consortium. (2023). Quantum Computing Applications in Materials Science: Market Analysis and Technology Roadmap. QED-C Technical Report.', '[]', '{Pulser,Qadence}', 2021),
	('99224120-7ece-4b81-9eac-e04716eee201', 'd-wave-lockheed-martin-quantum-annealing-verification', 'D-Wave and Lockheed Martin explore quantum annealing', 'D-Wave and Lockheed Martin explore the use of quantum annealing for complex systems verification.', 'In November 2010, Lockheed Martin Corporation, one of the world''s largest aerospace and defence contractors, signed a multi-year contract with D-Wave Systems, marking the beginning of one of the earliest commercial applications of quantum computing technology. This partnership, officially announced in May 2011, included the purchase of the D-Wave One quantum computer, along with maintenance and professional services. The collaboration established the USC-Lockheed Martin Quantum Computing Center (QCC) at the University of Southern California''s Information Sciences Institute, creating the first installation of a commercial quantum computing system outside of D-Wave''s headquarters.

## The Verification and Validation Challenge

Lockheed Martin faced increasingly complex computational challenges in the verification and validation of mission-critical systems. These systems, which control advanced aircraft, spacecraft, and defence platforms, contain millions of lines of code and must operate with near-perfect reliability in demanding environments.

Traditional computing approaches were reaching their limits as system complexity grew exponentially. As Ray Johnson, then Lockheed Martin''s Chief Technology Officer, explained, "In the future, critical systems will become so complex, that problems will take too long or become too expensive to solve using even our most powerful supercomputers". The company needed to explore fundamentally new computing approaches to address these challenges.

The verification and validation process for complex systems involves checking all possible states and transitions to ensure correct operation under all conditions. This combinatorial explosion of possible states creates an optimization problem well-suited for quantum approaches, but beyond the capabilities of classical computing methods.

## Quantum Solution

The partnership focused on applying D-Wave''s quantum annealing technology to solve complex optimization problems related to verification and validation of control systems. Quantum annealing leverages quantum effects to find the global minimum of a function, making it particularly suited for certain classes of optimization problems.

Unlike universal quantum computers, D-Wave''s systems implement specialised quantum annealing, which excels at solving specific types of optimization problems that can be represented as finding the lowest energy state of a system. While this approach doesn''t address all computing challenges, it offered potential advantages for Lockheed Martin''s specific verification and validation requirements.

The initial implementation utilised D-Wave''s 128-qubit system, which was later upgraded to a 512-qubit processor in 2013, and subsequently to even more powerful systems over the years. Lockheed Martin researchers translated their verification and validation challenges into a form that could be solved on D-Wave''s quantum annealing processors, specifically focusing on problems that could be represented as Ising Spin Glass models.

## Implementation

The implementation began with the establishment of the USC-Lockheed Martin Quantum Computing Center (QCC) in 2011, housing the first D-Wave One quantum computer. This centre, operated jointly by USC''s Information Sciences Institute and Lockheed Martin, created a collaborative environment where researchers from both organisations could explore quantum computing applications.

Lockheed Martin focused on transforming their verification and validation challenges into formats compatible with quantum annealing. This required significant expertise in both quantum computing and systems engineering to properly formulate the problems. 

Meanwhile, USC researchers concentrated on fundamental quantum computing research, including testing the quantum nature of the D-Wave system and benchmarking its performance against classical algorithms.

The implementation faced several technical challenges, including the need to maintain extremely low temperatures (near absolute zero) and electromagnetic shielding to preserve the quantum states of the qubits. The QCC team also developed methods to counteract quantum decoherence, which can degrade the performance of quantum processors.

Over the years, the partnership continued to evolve, with system upgrades and expansion of research focus. In 2020, the collaboration was renewed with plans to upgrade to D-Wave''s Advantage system with more than 5,000 qubits, significantly increasing the computational power available to researchers. In 2022, the QCC became home to the first D-Wave Advantage quantum computer physically located in the United States that was accessible via the Leap quantum cloud service.

## Results and Business Impact

The partnership between D-Wave and Lockheed Martin yielded several important outcomes. While early results were "fairly inconclusive" regarding speed advantages over classical computing for certain problems, as noted by USC researcher Daniel Lidar . The Washington Post, the collaboration provided Lockheed Martin with valuable insights into quantum computing''s potential applications.

The project demonstrated that quantum annealing could address certain verification and validation challenges, particularly those related to the problem of verification and validation of control systems. Lockheed Martin researchers also applied the technology to the design of special wave forms for RF applications with minimal side-lobes, expanding the potential use cases.

Beyond specific applications, the partnership positioned Lockheed Martin at the forefront of quantum computing adoption in the aerospace and defence industry. As Greg Tallant, Lockheed Martin Fellow, stated: "For more than 12 years, Lockheed Martin has been proud to support advanced practical quantum computing, putting the technology in the hands of people who can make the most of it".

The business impact extended beyond immediate technical solutions to include developing organisational capabilities in quantum computing, establishing important academic and industry partnerships, and gaining practical experience with quantum systems that informed Lockheed Martin''s broader quantum computing strategy.

## Future Directions

Building on their pioneering quantum computing work with D-Wave, Lockheed Martin has continued to expand its quantum computing initiatives. In 2014, the company established the Quantum Engineering Center at the University of Maryland''s College Park campus, focusing on a different quantum computing approach to complement their work with D-Wave''s quantum annealing systems.

The ongoing partnership with D-Wave and USC continues to evolve, with access to newer generations of quantum processors through D-Wave''s Leap quantum cloud service. This cloud-based approach represents a significant evolution in how Lockheed Martin accesses quantum computing resources, allowing for more flexible and scalable utilisation.

As Kristen Pudenz, quantum research scientist and corporate lead for Quantum at Lockheed Martin, explained: "Our new agreement allows for cloud access to the latest generation of QPUs at all times, helping drive the state-of-the-art forward, as we develop new capabilities and applications". This approach enables Lockheed Martin to continue exploring quantum applications while the technology matures, potentially leading to breakthroughs in system verification, artificial intelligence, materials sciences, and other areas critical to the aerospace and defence industry.', '{"Lockheed Martin"}', '{D-Wave}', NULL, '{"D-Wave One","D-Wave Two","D-Wave Advantage"}', true, NULL, '2025-05-05 10:07:28.40814+00', '2025-07-22 06:44:03.51146+00', '[^1]: Lockheed Martin Corporation. (2011). "Quantum Computing and Systems Verification & Validation."
[^2]: D-Wave Systems. (2011). "D-Wave One: The World''s First Commercial Quantum Computer."
[^3]: USC Information Sciences Institute. (2011). "USC-Lockheed Martin Quantum Computing Center."
[^4]: Pudenz, K.L. et al. (2014). "Quantum Annealing Correction for Verification and Validation."', '[]', '{"D-Wave Ocean SDK"}', 2010),
	('2c4b75d8-285a-4f84-acce-69d65d37aa68', 'ionq-airbus-loading-optimisation-machine-learning', 'IonQ and Airbus explore aircraft loading optimization', 'A collaboration that tackled the computationally intensive challenge of optimizing aircraft cargo loading.', '## Introduction

A collaboration between IonQ and Airbus[^1] created a strategic partnership to explore quantum computing applications for aircraft loading optimization. The teams used IonQ''s trapped-ion quantum computers to solve complex combinatorial optimization problems in aviation, exploring the potential for reducing fuel consumption and improving operational efficiency. The effort was documented in a research paper titled "Quantum Computing for Optimizing Aircraft Loading"[^2], and demonstrated progress in applying quantum algorithms to solve complex logistical challenges in aviation operations.

## Challenge
Aircraft loading optimization presents one of the most complex logistical challenges in aviation operations. The problem requires simultaneously optimizing multiple variables including passenger seating arrangements, cargo placement, fuel distribution, and weight balancing to ensure the aircraft''s centre of gravity remains within safe operational limits. 

Current classical computing solutions often rely on approximations and heuristics that may not find the globally optimal solution. The complexity increases exponentially with the number of items to be loaded and the various constraints that must be satisfied. Airlines face significant financial implications from suboptimal loading, including increased fuel consumption, reduced payload capacity, and potential safety risks. Additionally, the time-sensitive nature of aircraft turnaround operations demands solutions that can provide optimal loading configurations quickly. 

The challenge extends beyond simple weight distribution to include considerations such as cargo priority, destination-based grouping, and hazardous material regulations, making it an ideal candidate for quantum computing approaches. This optimization problem is classified as NP-Hard, sharing computational complexity characteristics with the well-known knapsack problem (Martello and Toth, 1990). The best known classical algorithms for such problems scale exponentially with the number of objects, making them computationally intractable for large problem instances[^2]. As Saunders et al. (2019) observed in their comprehensive review of aviation logistics optimization, even modest improvements in loading efficiency can translate to millions in annual revenue gains and significant carbon emission reductions across an airline''s fleet.

## Solution
IonQ and Airbus developed a quantum computing approach utilising variational quantum algorithms and quantum approximate optimization algorithms (QAOA) to address the aircraft loading challenge. The solution uses IonQ''s trapped-ion quantum processors, which offer high-fidelity quantum gates and all-to-all connectivity between qubits. The quantum algorithm formulates the loading problem as a quadratic unconstrained binary optimization (QUBO) problem, encoding various constraints and objectives into a quantum Hamiltonian. 

This approach uses a hybrid classical-quantum algorithm where the quantum processor explores the solution space more efficiently than classical methods, while classical computers handle pre-processing and post-processing tasks. The solution incorporates real-world constraints such as weight limits, balance requirements, and cargo compatibility rules. IonQ''s cloud-based quantum computing platform enables Airbus to access quantum resources on-demand, facilitating iterative development and testing of quantum algorithms without requiring on-premise quantum hardware.

## Implementation
The implementation began with Airbus''s quantum computing team working closely with IonQ''s algorithm experts to translate the aircraft loading problem into quantum-compatible formulations. The teams developed a proof-of-concept using simplified aircraft models and gradually increased complexity to approach real-world scenarios. The implementation utilised IonQ''s quantum cloud services, allowing Airbus engineers to submit optimization problems through APIs and receive results for analysis. The hybrid approach involved classical preprocessing to reduce problem size through intelligent constraint handling and symmetry exploitation. The quantum algorithm execution focused on exploring the most promising regions of the solution space, with classical post-processing validating and refining the quantum results. The teams implemented benchmarking protocols to compare quantum solutions against classical optimization methods, measuring both solution quality and computation time. Regular iterations incorporated feedback from Airbus''s operational teams to ensure the solutions met practical aviation requirements.

## Quantum Algorithm Innovation

The research introduces a Multi-Angle Layered Variational Quantum Algorithm (MALVQA), building upon the Quantum Approximate Optimization Algorithm (QAOA) framework first proposed by Farhi et al. (2014). MALVQA distinguishes itself through several key innovations:

1. **Reduced gate complexity**: The algorithm employs significantly fewer two-qubit gates compared to standard QAOA implementations. Where conventional QAOA uses a single parameter for entire mixer or Hamiltonian blocks, MALVQA assigns unique parameters to individual gates, creating a more expressive ansatz while allowing shallower circuits for similar expressibility. This parameterisation flexibility enables effective optimization with fewer quantum resources—critical for implementation on current hardware. Unlike standard QAOA, however, MALVQA does not provide a formal guarantee of converging to the ground state as layers increase infinitely; its performance depends on factors like the classical optimiser used, ansatz design, and parameter initialisation.
    
2. **Novel constraint handling**: Rather than representing inequality constraints within the quantum circuit through additional slack qubits—which would dramatically increase qubit requirements—the researchers developed an approach that offloads constraint evaluation to the classical optimization component. The novel cost function handled multiple inequality constraints including maximum loading weight, center of gravity limits, shear forces, container slot assignments, and container type/size compatibility, all without requiring slack qubits. These constraints were grouped into "hard" and "soft" categories, with correspondingly adjusted penalty functions using an error function form to provide a steep, differentiable penalty for violations. Hard constraints included maximum weight, total shear stress, and volume/space constraints, while soft constraints primarily addressed centre of gravity limits.
    
3. **Enhanced cost function**: The implementation utilises a Conditional Value at Risk (CVaR) method as described by Barkoutsos et al. (2020), focusing optimization on the lowest-energy measurement outcomes to improve solution quality, even with limited sampling.
    
This approach significantly reduces the quantum resources required while maintaining algorithmic effectiveness—a critical consideration for implementation on near-term quantum hardware with limited qubit counts and coherence times.

## Experimental Implementation and Results

The researchers executed their algorithm on IonQ''s trapped-ion quantum processors: Aria and Forte. These systems employ Ytterbium (Yb) ions arranged in linear traps, with qubit manipulation performed via 355-nm laser pulses driving Raman transitions between states. The system implements Mølmer-Sørensen type two-qubit entangling gates, which are particularly well-suited for the entanglement requirements of the MALVQA circuit architecture. Key performance metrics from the experiments include:

|Problem Instance|Qubits|Max Weight Constraint|QPU|Solution Quality|Optimal Solution Probability|
|---|---|---|---|---|---|
|4 containers, 3 slots|12|14 kG|Aria|Optimal|~70%|
|4 containers, 4 slots|16|16 kG|Aria|Optimal|~40%|
|5 containers, 4 slots|20|16 kG|Aria|Optimal|~50%|
|7 containers, 4 slots|28|23 kG|Forte|Optimal|~35%|

To mitigate the effects of systematic errors, the researchers employed error mitigation through symmetrisation, aggregating measurement statistics across multiple circuit variants with distinct qubit-to-ion mappings (Maksymov et al., 2023). For the largest (28-qubit) problem instance run as a full optimization on Forte, the process was "warm-started" using parameters obtained from a partially converged classical simulation to accelerate convergence on the QPU. Despite the increased circuit complexity and potential for higher noise impact, the algorithm successfully identified the optimal solution.

Notably, the inference runs demonstrated the algorithm''s capability to converge to different degenerate optimal solutions (configurations with the same maximum objective value), an important feature for complex problems with multiple potentially valid optima. This capability becomes increasingly valuable when scaling to larger problem sizes, where the number of near-optimal solutions may increase substantially. The researchers performed ten independent optimisations with random initial parameters for the 28-qubit problem and found multiple distinct solutions achieving the same optimal objective value, demonstrating the algorithm''s robustness against varying initialisation conditions.

## Results & Business Impact
Early results from the IonQ-Airbus partnership demonstrated promising improvements in finding optimal loading configurations compared to traditional methods. Those traditional approaches to aircraft loading rely heavily on heuristics and the experience of ground personnel, often yielding suboptimal solutions. As Topi and Ashworth (2023) document in their analysis of airline operations, even a 5% improvement in loading efficiency can translate to approximate fuel savings of 1-2% across a fleet, representing millions in cost reduction and thousands of tons in reduced carbon emissions annually.

The quantum approach also showed promise in reducing the time required to generate loading plans, potentially improving aircraft turnaround times. The partnership enhanced Airbus''s position as a technology leader in aviation, demonstrating commitment to sustainable aviation through advanced optimization. The collaboration also provided valuable insights into the practical challenges of deploying quantum computing in industrial settings, including the need for robust error mitigation strategies and hybrid algorithm development. These learnings contribute to the broader quantum computing ecosystem and help establish best practices for quantum adoption in the aerospace industry.

While this quantum implementation currently addresses problem sizes smaller than those encountered in commercial operations, it demonstrates a clear pathway toward quantum advantage in this domain. As Morris et al. (2024) note in their review of near-term quantum optimization applications, the aircraft loading problem possesses characteristics that make it particularly well-suited for quantum approaches: discrete solution space, constrained optimization structure, and computational intractability at scale.

## Future Directions
The IonQ-Airbus partnership plans to expand beyond aircraft loading to explore other quantum computing applications in aerospace. Future research areas include flight path optimization, aircraft design optimization, and supply chain management. As quantum hardware continues to improve, the teams aim to tackle larger and more complex optimization problems that closely mirror real-world operational scenarios. The partnership is investigating the integration of quantum computing solutions into existing airline operational systems, developing interfaces that make quantum optimization accessible to non-specialist users. Both companies have committed to developing quantum workforce capabilities, with plans for knowledge transfer and training programs. The collaboration will continue benchmarking quantum performance against classical methods as both technologies evolve, pursuing the business care for quantum solutions to provide genuine operational advantages. The specific future research directions identified by the authors include:

1. Investigation of decomposition methods to break down larger problem instances into manageable subproblems
2. Exploration of alternative quantum approaches, such as Quantum Imaginary Time Evolution (Motta et al., 2020)
3. Scaling to larger problem sizes as quantum hardware capabilities advance

## Other Related Research

The Kaushik et al. (2025) research represents the latest advancement in Airbus''s sustained quantum computing research initiative, which has been systematically exploring quantum approaches to aviation challenges for several years. This long-term investment in quantum technology reflects Airbus''s strategic commitment to exploring next-generation computational methods for addressing complex operational challenges.

A significant earlier contribution from Airbus researchers came in February 2021, when Pilon, Gugole, and Massarenti published "Aircraft Loading Optimization -- QUBO models under multiple constraints" (Corpus ID: 231979202). This foundational work established the initial formulation of aircraft loading optimization in terms of Quadratic Unconstrained Binary Optimization (QUBO) models compatible with quantum annealing systems. The research team benchmarked their model across different solvers to evaluate the capabilities of quantum annealing technology available at that time, establishing an important baseline for quantum approaches to this problem domain.

Building on this foundation, Airbus continued its quantum research with the 2024 publication "QUBO formulation for aircraft load optimization" (Journal of Quantum Optimization, Volume 23, article number 355). This work further refined the QUBO formulation and expanded testing on more advanced quantum annealing hardware, demonstrating Airbus''s methodical approach to developing quantum solutions for aviation logistics.

The progression from these earlier quantum annealing approaches to the gate-based MALVQA implementation described in Kaushik et al. (2025) illustrates a strategic evolution in Airbus''s quantum algorithm development. While quantum annealers provided an initial platform for addressing optimization problems encoded as QUBO, gate-based quantum processors offer greater flexibility in circuit design and constraint handling. The IonQ-Airbus collaboration leverages this flexibility through innovations like the novel cost function implementation described earlier.

This research trajectory demonstrates how different quantum computing paradigms can provide complementary insights, with each new study building upon previous work while adapting to emerging quantum technologies. The initial QUBO formulations established the mathematical framework for representing aircraft loading as a quantum optimization problem, while the MALVQA approach extends this foundation with innovations specifically designed to overcome the limitations of near-term gate-based hardware.

Similar research progressions can be observed in other logistics domains, such as the work by Henderson et al. (2023) on quantum algorithms for supply chain optimization and Zhang et al. (2022) on quantum approaches to the vehicle routing problem. These parallel efforts highlight the broader potential for quantum computing to address computationally intractable optimization challenges across the transportation and logistics sectors.


', '{Airbus}', '{IonQ}', NULL, '{Forte,Aria}', true, NULL, '2025-05-05 07:44:00.106571+00', '2025-07-22 13:07:57.655433+00', '[^1]: [Barkoutsos, P.K., Nannicini, G., Robert, A., Tavernelli, I., and Woerner, S. (2020). Improving Variational Quantum Optimization using CVaR. Quantum, 4:256.](https://arxiv.org/abs/1907.04769)
    
[^2]: [Farhi, E., Goldstone, J., and Gutmann, S. (2014). A Quantum Approximate Optimization Algorithm. arXiv:1411.4028](https://arxiv.org/abs/1411.4028).
    
[^3]: [Kaushik, A., Kim, S.H., Aboumrad, W., Roetteler, M., Topi, A., and Ashworth, R. (2025). Quantum Computing for Optimizing Aircraft Loading. arXiv:2504.01567](https://arxiv.org/abs/2504.01567).
    
[^4]: Maksymov, A., Nguyen, J., Nam, Y., and Markov, I. (2023). Enhancing quantum computer performance via symmetrization. arXiv:2301.07233.
    
[^5]: Martello, S., and Toth, P. (1990). Knapsack problems: algorithms and computer implementations. John Wiley & Sons.
    
[^6]: Morris, T.D., Kaushik, A., Roetteler, M., and Lotshaw, P.C. (2024). Performant near-term quantum combinatorial optimization. arXiv:2404.16135.
    
[^7]: Motta, M., Sun, C., Tan, A.T., O''Rourke, M.J., Ye, E., Minnich, A.J., Brandão, F.G., and Chan, G.K. (2020). Determining eigenstates and thermal states on a quantum computer using quantum imaginary time evolution. Nature Physics, 16(2), 205-210.
    
[^8]: Saunders, C., Topi, A., and Ashworth, R. (2019). Optimization methods for sustainable aviation logistics. Journal of Air Transport Management, 74, 13-22.
    
[^9]: Topi, A., and Ashworth, R. (2023). Quantifying the impact of loading optimization on airline operational efficiency. International Journal of Aviation Logistics, 7(3), 112-128.

[^10]: Henderson, R.M., Chen, J., and Venkatesh, S. (2023). Quantum algorithms for supply chain optimization: A comparative analysis. Quantum Information Processing, 22(4), 189-204.

[^11]: Journal of Quantum Optimization. (2024). QUBO formulation for aircraft load optimization. Volume 23, article number 355.

[^12]: Pilon, G., Gugole, N., and Massarenti, N. (2021). Aircraft Loading Optimization -- QUBO models under multiple constraints. arXiv preprint.

[^13]: Zhang, L., Wu, Y., and Wang, X. (2022). Quantum approaches to the vehicle routing problem: A systematic review. IEEE Transactions on Quantum Engineering, 3(1), 1-15.', '[]', '{"IonQ Quantum Cloud Platform"}', 2022),
	('f2b23a03-f51f-488f-aaba-13c3610c6385', 'classiq-sumitomo-corporation-financial-risk-management', 'Classiq and Sumitomo Corporation explore risk', 'Exploring quantum computing for financial risk management, achieving up to 95% compression of quantum circuits for Monte Carlo simulations.', 'In March 2025, Classiq Technologies, a leading quantum computing software company, partnered with Sumitomo Corporation and Mizuho-DL Financial Technology to achieve a significant breakthrough in quantum computing applications for financial risk management. The collaboration successfully demonstrated up to 95% compression of quantum circuits for Monte Carlo simulations, marking a major milestone in making quantum computing viable for practical financial applications.

## The Financial Risk Management Challenge

Financial institutions routinely employ Monte Carlo simulations for derivative pricing and asset risk evaluation, essential processes for managing investment portfolios and complying with regulatory requirements. However, these simulations require generating vast numbers of random scenarios, leading to high computational costs and extended processing times on classical computers.

Traditional risk assessment methods, particularly for credit portfolio risk management, involve evaluating numerous complex variables and potential scenarios. For large financial institutions, running these simulations can take hours or even days, limiting the ability to respond quickly to changing market conditions or to perform comprehensive risk assessments with the desired frequency and accuracy.

Quantum computing offered potential solutions to these computational challenges, but practical implementation faced significant hurdles. Quantum circuits for financial simulations typically required either a large number of qubits or deep circuits with many operations, making them difficult to run efficiently on current quantum hardware with limited qubit counts and high error rates.

## Quantum Solution

The partners developed an innovative approach to quantum-enhanced Monte Carlo simulations that leveraged Classiq''s quantum software platform and specialised algorithms provided by Mizuho-DL Financial Technology. The project focused on two distinct methods for implementing quantum Monte Carlo simulations.

- Traditional Quantum Monte Carlo Simulation: This approach required a dedicated qubit for each random number needed in the simulation, leading to high qubit usage but relatively shallow circuits.

- Pseudo-Random Number-Based Quantum Monte Carlo Simulation: This novel method, developed by Mizuho-DL FT, generated necessary random patterns in stages, significantly reducing the required qubit count at the cost of deeper, more complex circuits.

To optimise these quantum approaches, Classiq applied its quantum circuit compression technology. The company''s high-level quantum language, Qmod, enabled the team to generate optimised circuits for both simulation methods, focusing on reducing circuit depth while maintaining computational accuracy.

The solution was designed to address the practical limitations of current quantum hardware, which typically features limited qubit counts and is susceptible to errors, particularly in deep circuits. By optimizing circuit design, the partners aimed to enable financial institutions to run complex risk simulations more efficiently than possible with classical computing alone.

## Implementation

The implementation process began with Sumitomo Corporation, which had established its Quantum Transformation (QX) project in 2021 to revolutionise business processes through quantum computing. As part of this initiative, Sumitomo had invested in Classiq, recognising the Israeli company''s expertise in developing essential software for quantum computing.

For the Monte Carlo simulation project, the partners adopted a methodical approach:

- First, they defined the financial risk management use case, focusing on credit portfolio risk assessment, a computation-intensive process critical for financial institutions.
- Next, Mizuho-DL FT provided quantum algorithms for both traditional and pseudo-random number-based Monte Carlo simulations.
Classiq then applied its quantum circuit design and optimization technology to generate efficient implementations of these algorithms, with a focus on reducing circuit depth and qubit requirements.
- Finally, the partners evaluated the performance of the optimised circuits, measuring both computational efficiency and accuracy compared to conventional approaches.

Throughout the implementation, the team focused on creating practical solutions that could be executed on current quantum hardware while positioning the partners to take advantage of more capable quantum systems as they become available.

The collaboration achieved remarkable results, demonstrating up to 95% compression of quantum circuits for both types of Monte Carlo simulations while maintaining computational accuracy. This dramatic reduction in circuit depth significantly improved the feasibility of running these algorithms on current quantum hardware, which is limited by noise and error rates that increase with circuit depth.

The pseudo-random number-based approach proved particularly effective, requiring fewer qubits than the traditional method while still delivering accurate results after optimization. This approach addressed one of the key limitations of current quantum hardware: the restricted number of available qubits.

From a business perspective, these achievements marked a significant step toward practical quantum computing applications in finance. By enabling high-precision calculations with fewer resources, the study demonstrated that large-scale probabilistic simulations for financial risk management may be feasible on near-term quantum hardware. This could potentially lead to faster, more accurate risk assessments, enabling financial institutions to make better-informed decisions and optimise their portfolios more effectively.

For Sumitomo Corporation, which had been exploring quantum computing applications since 2018, this success represented a significant milestone in its QX project. The demonstration validated the company''s investment in quantum technologies and positioned it at the forefront of quantum applications in finance.

## Future Directions

Building on this success, the partners established plans to further advance quantum computing applications in financial risk management. Future work will focus on expanding the approach to handle larger, more complex financial portfolios and a wider range of risk assessment scenarios.

The partners also identified opportunities to apply similar quantum circuit optimization techniques to other computationally intensive financial applications, such as fraud detection, algorithmic trading, and portfolio optimization.

As quantum hardware continues to mature, with increases in qubit count and reductions in error rates, the optimised algorithms developed in this project are expected to deliver even greater performance improvements over classical methods. The groundwork laid by this collaboration positions all three companies to remain at the forefront of quantum finance applications as the technology evolves.

Sumitomo Corporation continues to expand its quantum computing initiatives through its QX project, collaborating with partners around the world to explore applications in various industries beyond that of finance, including mobility, manufacturing, and cybersecurity.

', '{SumitomoCorporation,"Mizuho-DL Financial Technology"}', '{Classiq}', NULL, '{"Not Applicable"}', true, NULL, '2025-05-05 10:37:16.869421+00', '2025-07-22 15:25:28.033258+00', '[^1]: Classiq Technologies. (2025). "Quantum Circuit Compression for Financial Monte Carlo Simulations."
[^2]: Sumitomo Corporation. (2021). "Quantum Transformation (QX) Project: Vision and Implementation."
[^3]: Mizuho-DL Financial Technology. (2025). "Quantum Algorithms for Financial Risk Management."
[^4]: Journal of Quantum Finance. (2025). "Advances in Quantum Computing for Credit Portfolio Risk Assessment."', '[]', '{"Classiq Platform"}', 2023),
	('2ee41a9d-b30a-4799-b28e-4dd230c9b09a', 'quantinuum-mitsui-trading-co', 'Quantinuum and Mitsui & Co. evaluate broad quantum utility', 'Quantinuum and Mitsui & Co. trading company explore quantum computing potential across a broad range of its portfolio of activities.', '## Overview
Mitsui & Co., one of Japan''s largest trading companies with business operations spanning diverse sectors including energy, metals, machinery, chemicals, food, and retail, established a strategic partnership with Quantinuum, a quantum computing company formed from the merger of Honeywell Quantum Solutions and Cambridge Quantum Computing. This collaboration, announced in April 2023, focuses on applying quantum computing to enhance logistics operations and financial risk assessment across Mitsui''s diverse business portfolio. By combining Mitsui''s extensive trading and investment expertise with Quantinuum''s quantum hardware and algorithm capabilities, the partnership aims to improve operational efficiency, optimize supply chains, and enhance financial decision-making across Mitsui''s global operations.

## Problem Statement
Global trading companies face extraordinary optimization and risk assessment challenges that impact operational performance, capital efficiency, and investment returns. Traditional computational approaches struggle with the scale and complexity of these problems, which involve optimizing logistics across thousands of products and hundreds of locations, managing complex supply chains spanning multiple industries, and assessing financial risks across diverse investment portfolios. These computational limitations force trading companies to accept suboptimal operating efficiency and potentially incomplete risk assessments.

For Mitsui & Co., whose operations span energy, resources, materials, machinery, infrastructure, mobility, chemicals, food, retail, healthcare, and other industries across 63 countries, enhancing computational capabilities for optimization and risk assessment represented a significant opportunity to improve performance while strengthening decision-making processes. The company identified several specific challenges where quantum computational approaches might offer advantages: optimizing logistics operations across their diverse supply chains, enhancing commodity trading strategies, and improving financial risk assessment across their investment portfolio.

The computational complexity stems from the interconnected nature of global trading operations, where decisions in one business area affect multiple other domains with diverse constraints and objectives. Classical optimization and simulation algorithms often struggle to navigate these vast solution spaces effectively, either requiring prohibitively long computation times or settling for suboptimal solutions that leave significant performance improvements unrealized. For time-sensitive trading decisions, these computational limitations become particularly problematic, forcing reliance on simplified models that compromise solution quality.

The business implications of these computational constraints are substantial. Suboptimal logistics operations increase costs and reduce service levels across supply chains. Limited trading strategy optimization leaves potential trading value unrealized in commodity markets. Incomplete risk assessment may lead to suboptimal capital allocation or inadequate risk mitigation. For a diversified trading company like Mitsui, these computational barriers represent significant constraints on operational and financial performance across multiple business domains.

## Quantum Approach
The Mitsui-Quantinuum collaboration implemented a sophisticated quantum computational strategy tailored to trading company challenges. This approach leverages Quantinuum''s quantum hardware and software capabilities, with a particular focus on their H-Series trapped-ion quantum computers and complementary algorithmic expertise.

The technical implementation focuses on three complementary applications: logistics optimization, commodity trading enhancement, and financial risk assessment. For logistics optimization, the team developed quantum and quantum-inspired algorithms capable of more effectively navigating the complex solution space of global supply chain operations. These implementations aim to identify logistics strategies that minimize costs while maintaining service levels across Mitsui''s diverse business portfolio—a challenging multi-objective optimization problem where quantum approaches might offer advantages over classical methods.

In commodity trading applications, the partnership created quantum computational approaches for market analysis and trading strategy optimization. These methods address the challenge of identifying optimal trading positions in complex, volatile markets with numerous interacting factors—a domain where subtle pattern recognition and scenario analysis capabilities could create significant competitive advantages.

For financial risk assessment, the team implemented algorithms designed to more comprehensively model risk factors across Mitsui''s diverse investment portfolio. These approaches seek to identify potential risk correlations and extreme scenarios that might be overlooked by conventional risk modeling techniques, supporting more informed investment decisions and risk mitigation strategies.

Given current quantum hardware limitations, the partnership employed a pragmatic implementation strategy utilizing both quantum-inspired algorithms running on classical infrastructure for immediate operational benefits and implementations on Quantinuum''s quantum processors for specific computational components where they might offer near-term advantages. This dual-track approach provides tangible improvements to current business operations while establishing frameworks for more transformative quantum advantage in the future.

The collaboration developed specialized techniques for trading company problem formulation that make complex optimization and risk assessment challenges more amenable to both quantum and quantum-inspired approaches. These techniques include efficient mathematical representations of supply chain networks, encoding of trading strategies, and risk modeling frameworks that can leverage potential quantum computational advantages.

## Results and Business Impact
The collaboration has yielded promising outcomes demonstrating quantum and quantum-inspired computation''s potential for trading company applications. Initial implementations showed meaningful improvements in solution quality for specific logistics scenarios compared to conventional optimization approaches. These enhanced optimization capabilities identified logistics strategies with potential cost reductions of 5-8% in selected supply chains while maintaining or improving service levels.

Commodity trading enhancements leveraging quantum-inspired analytics demonstrated potential performance improvements in simulated trading environments. These advanced analytical capabilities showed particular promise for identifying non-obvious market patterns and optimizing trading positions across complex scenarios with multiple interacting factors—potentially creating meaningful advantages in competitive trading markets.

Financial risk assessments incorporating quantum approaches provided more comprehensive scenario analysis, identifying potential risk concentrations and correlation patterns that conventional methods might miss. These enhanced risk insights support more informed capital allocation and risk mitigation strategies, potentially improving both investment returns and portfolio resilience.

For Mitsui & Co., these technical achievements translate into valuable business advantages across their diverse operations. The improved optimization capabilities support more efficient logistics with reduced costs and enhanced service levels. Advanced trading analytics strengthen competitive positioning in commodity markets through more sophisticated strategy development. Enhanced risk assessment supports better investment decisions while potentially reducing exposure to extreme market events.

Beyond these immediate operational benefits, the collaboration positions Mitsui at the forefront of quantum computing applications in global trading and investment. This leadership in computational business optimization strengthens the company''s technology credentials and creates opportunities for continued innovation as quantum technology matures. The expertise developed through this partnership represents a strategic asset that will appreciate in value as quantum computing capabilities expand.

## Future Directions
Building on their initial success, Mitsui and Quantinuum have outlined several promising directions for continued development. Algorithm refinement remains a primary focus, with ongoing work to improve both the effectiveness and computational efficiency of quantum and quantum-inspired approaches for trading company applications. These enhancements aim to expand the range of business challenges that can be effectively addressed while improving solution quality for existing applications.

The partners are extending their quantum computational methods to additional aspects of Mitsui''s operations, including renewable energy optimization, healthcare supply chains, and digital transformation initiatives. This expansion follows a strategic roadmap that aligns growing quantum capabilities with Mitsui''s evolving business portfolio and strategic priorities.

Integration with operational decision systems represents another key development area. The collaboration is creating seamless connections between quantum-enhanced analytics and Mitsui''s existing business intelligence and decision support platforms, establishing the technical infrastructure and validation processes necessary for routine deployment in business-critical decisions. These integration efforts focus on creating user-friendly interfaces that deliver quantum benefits without requiring specialized expertise from business users.

As quantum hardware advances, the team continuously evaluates opportunities to migrate quantum-inspired implementations to actual quantum processors where they might deliver additional advantages. This hardware-specific assessment ensures that trading company applications can capitalize on quantum computational capabilities as they become available while maintaining the benefits of current quantum-inspired approaches.

The partnership is also exploring quantum machine learning techniques that could enhance predictive capabilities for market trends, supply chain disruptions, and investment opportunities. These enhanced predictive models could further improve business performance by incorporating more accurate forecasts into planning and decision processes.

## Conclusion
The Mitsui-Quantinuum partnership demonstrates how quantum and quantum-inspired computational approaches can enhance trading company capabilities today while establishing frameworks for greater advantages as quantum hardware matures. By implementing a practical strategy that combines quantum-inspired algorithms for immediate benefits with quantum implementations for future advantage, this collaboration has created a viable pathway for quantum computing adoption in global trading operations.

The strategic approach taken by these organizations illustrates how trading companies can effectively engage with emerging quantum technologies—developing specialized expertise, focusing on high-value business applications, and creating implementation frameworks that deliver increasing value as capabilities advance. Rather than waiting for fault-tolerant quantum computers, this pragmatic strategy pursues incremental improvements through quantum-inspired methods while building capabilities for more transformative future applications.

For the trading industry broadly, this case study highlights the potential for advanced optimization and analytics approaches to transform operations by addressing the computational complexity that fundamentally limits traditional methods. The ability to more effectively optimize logistics, enhance trading strategies, and assess financial risks could significantly improve both operational performance and investment returns, creating competitive advantages in the highly contested global trading landscape.

As quantum computing continues its rapid evolution, forward-thinking trading companies that invest in quantum and quantum-inspired capabilities today may gain substantial competitive advantages in operational efficiency, trading performance, and risk management. The Mitsui-Quantinuum collaboration exemplifies how strategic partnerships between industry leaders and quantum technology specialists can accelerate progress toward practical applications with significant business impact, even before full quantum advantage materializes.
', '{"Mitsui & Co."}', '{Quantinuum}', NULL, '{"Quantinuum H-Series"}', true, '2025-07-04 12:20:22.483+00', '2025-05-07 01:22:31.46732+00', '2025-07-22 13:24:04.897363+00', '[^1]: Mitsui & Co. (2023). Mitsui and Quantinuum announce strategic partnership to advance quantum computing applications across trading operations. [Press Release]. Retrieved from https://www.mitsui.com/jp/en/release/2023/quantinuum_partnership.html
[^2]: Quantinuum. (2023). Quantinuum partners with Mitsui & Co. to implement quantum solutions for global trading company. [Press Release]. Retrieved from https://www.quantinuum.com/news/mitsui-partnership-announcement
[^3]: Venturelli, D., Kondratyev, A., Marécek, J., & Biswas, R. (2023). Quantum computation for combinatorial optimization: Status and prospects. Operations Research, 71(3), 1066-1088. https://doi.org/10.1287/opre.2022.2371
[^4]: Herman, D., Googin, C., Liu, X., Galda, A., Patoary, I., Meyerov, I., Filippov, S., Severini, S., & Parkins, S. (2022). A survey of quantum computing for finance. ACM Computing Surveys. https://doi.org/10.1145/3507669
[^5]: World Trade Organization. (2023). Digital Technologies in Global Trade: The Role of Advanced Computing. WTO Technical Report.
[^6]: Japan External Trade Organization. (2023). Quantum Computing Applications in Global Trading Companies: Case Studies and Implementation Framework. JETRO Technology Report.
[^7]: Quantum Economic Development Consortium. (2023). Quantum Computing Applications in Global Trade and Investment: Industry Survey and Market Outlook. QED-C Industry Report.
[^8]: McKinsey & Company. (2023). The Quantum Opportunity in Trading and Investment: Implementation Priorities and ROI Assessment. McKinsey Global Institute Report.', '[]', '{TKET,"Quantum Origin",InQuanto}', 2023),
	('b0a580db-244f-4360-8190-3f8b39457edd', 'quera-pawsey-supercomputing-research-centre-research', 'QuEra and Pawsey conduct quantum-classical research', 'Partnering to advance methods and approaches to quantum-classical integration for advanced research.', 'In January 2023, QuEra Computing, a leader in neutral-atom quantum computing, and Pawsey Supercomputing Research Centre, Australia''s premier high-performance computing facility, established a strategic partnership to integrate quantum computing with traditional supercomputing capabilities. This collaboration aims to enhance research capabilities across multiple scientific domains by developing specialized quantum emulation software optimized for Pawsey''s Setonix supercomputer while providing Australian researchers with access to QuEra''s advanced quantum hardware platforms.

## The Quantum-Supercomputing Integration Challenge

Scientific research increasingly requires computational capabilities that exceed what classical supercomputers alone can provide. As quantum computing emerges as a viable technology, integrating quantum and classical systems presents both technical and practical challenges for research institutions worldwide.

A significant obstacle in this integration is the specialized expertise gap between quantum computing and high-performance computing domains. Few organizations possess proficiency in both areas, which substantially limits potential synergies between these technologies. This expertise divide is further compounded by geographic and financial barriers that restrict access to cutting-edge quantum systems, particularly for research institutions outside major technology hubs.

From a technical perspective, developing software that effectively bridges quantum and classical computing environments demands specialized knowledge and significant development resources that exceed the capabilities of most individual research organizations. The creation of seamless workflows between quantum processors and classical supercomputers involves complex challenges in data transfer, timing, and resource management that require coordinated expertise from both quantum and classical computing disciplines.

The integration of quantum computing into traditional high-performance computing workflows has become increasingly important as researchers tackle complex problems in materials science, optimization, and simulation that benefit from both computing paradigms. According to industry analyses, hybrid quantum-classical computing approaches are expected to deliver practical advantages years before pure quantum systems can operate at scale, making partnerships like the QuEra-Pawsey collaboration particularly valuable in the current technological landscape.

## Quantum Solution

QuEra and Pawsey''s partnership addresses these integration challenges through a multi-faceted approach centered on hybrid quantum-classical computing. The solution leverages QuEra''s neutral-atom quantum technology and Pawsey''s world-class supercomputing infrastructure to create a synergistic computing environment that exceeds the capabilities of either system operating independently.

The centerpiece of the solution is the joint development of high-performance quantum emulation software optimized specifically for Pawsey''s Setonix supercomputer—the most powerful research computer in the Southern Hemisphere and the fourth greenest supercomputer globally according to the TOP500 and Green500 rankings. This specialized software facilitates seamless integration between quantum and classical workloads, enabling researchers to develop and test quantum algorithms at scale within a unified computational framework.

The implementation builds upon QuEra''s Bloqade software package, available in both Python and Julia programming languages, which provides sophisticated tools for quantum simulation and algorithm development. Through collaborative engineering efforts, this software is being enhanced to leverage Setonix''s massive parallel processing capabilities, allowing for larger and more complex quantum simulations than possible on standard computing platforms, thereby extending the practical research applications of quantum algorithms.

Beyond software integration, QuEra provides Pawsey with private cloud access to its Boston-based Aquila-class quantum computers—256-qubit devices featuring unique capabilities including high coherence times and an innovative analog quantum processing mode. This remote access arrangement is complemented by expert consulting services and specialized training programs designed to build quantum computing expertise within the Australian research community, addressing the critical expertise gap identified in quantum-classical integration.

A particularly significant innovation in QuEra''s technology contribution is their Field-Programmable Qubit Array (FPQA) approach, which allows flexible reconfiguration of qubit positioning for each computation. This capability essentially enables customized "quantum chip designs" tailored to specific research problems, providing a level of adaptability that significantly enhances the practical utility of quantum computing for scientific applications.

## Implementation

The implementation of this quantum-supercomputing integration followed a carefully structured process designed to ensure successful deployment and adoption of these advanced technologies across the Australian research community.
The partnership formally began in January 2023 when QuEra and Pawsey established their collaboration with specific focus on joint research projects and software development initiatives. Following this formal agreement, technical teams from both organizations conducted comprehensive analyses of Setonix''s architecture and QuEra''s quantum systems to identify optimal integration points and detailed software requirements for their hybrid computing approach.

With this technical foundation established, the collaborative development of quantum emulation software optimized for Setonix commenced, drawing upon QuEra''s expertise in quantum simulation and Pawsey''s extensive experience in high-performance computing. In parallel, the technical infrastructure necessary to provide Australian researchers with secure access to QuEra''s Boston-based quantum computers through private cloud services was implemented, creating a seamless connection between these geographically distant computing resources.

To ensure effective utilization of these advanced technologies, QuEra provided specialized training and consulting services to build quantum computing expertise within the Pawsey ecosystem. These knowledge transfer activities included workshops and technical sessions for researchers across multiple disciplines, creating a foundation of quantum computing literacy essential for leveraging the integrated systems effectively.

With both technical infrastructure and knowledge foundations in place, initial research projects were launched focusing on quantum simulation applications relevant to Australian research priorities. These projects placed particular emphasis on materials science and optimization problems where the quantum-classical integration offered significant computational advantages over traditional approaches.
Throughout this implementation process, both organizations maintained robust communication channels to address emerging technical challenges and ensure continuous alignment with evolving research objectives. The partnership structure was deliberately designed to allow for ongoing refinement of tools and approaches as quantum technology evolves, ensuring sustainable long-term value from the collaboration.

## Results and Business Impact

The QuEra-Pawsey partnership has delivered substantial benefits for both organizations and the broader scientific community through its innovative approach to quantum-classical integration. By combining complementary expertise and technologies, the collaboration has created value that neither organization could have achieved independently.

The integration of quantum computing capabilities with Pawsey''s supercomputing infrastructure has significantly extended computational capabilities for Australian researchers, particularly in quantum simulation and optimization domains. This enhanced computational power has enabled new approaches to previously intractable scientific problems, opening research pathways that were inaccessible with classical computing resources alone. The practical impact of this capability expansion has been observed across multiple research domains, from materials science to complex systems modeling.

By combining Pawsey''s deep expertise in high-performance computing with QuEra''s quantum technology innovations, the partnership has accelerated the development of practical quantum applications with real-world relevance. Researchers can now move seamlessly between classical and quantum computational approaches within a unified framework, selecting the optimal computational strategy for each aspect of complex scientific challenges. This flexibility represents a significant advancement over the isolated quantum or classical computing environments that characterized previous research infrastructures.

The collaboration has also substantially expanded quantum computing expertise within the Australian research community through structured training programs and hands-on experience with quantum systems. This knowledge development aspect of the partnership addresses one of the fundamental challenges in quantum-classical integration—the expertise gap—creating lasting value that extends beyond the immediate technical implementations.

From a strategic perspective, the partnership has strengthened the competitive positioning of both organizations. For Pawsey, the collaboration has established the center as a pioneering facility in quantum-supercomputing integration, enhancing its position as a world-class research infrastructure provider capable of supporting the most advanced computational research methodologies. For QuEra, the partnership has expanded its global reach and provided valuable real-world testing of its technology in diverse research applications, accelerating the refinement and practical validation of its quantum computing approach.

The joint software development initiatives have improved the efficiency of quantum resource utilization across the research ecosystem, allowing scientists to maximize the utility of limited quantum computing time through effective pre-testing and simulation on classical systems. This optimization of computational resources represents a significant operational efficiency gain, particularly given the current scarcity and expense of quantum computing resources globally.

Through these multifaceted benefits, the partnership has positioned both organizations at the forefront of quantum-classical computing integration, creating practical pathways for researchers to leverage emerging quantum capabilities alongside established supercomputing resources in ways that advance scientific discovery and technological innovation.

## Future Directions

Building on the solid foundation established through their initial collaboration, QuEra and Pawsey have developed an ambitious roadmap for future development that extends the impact and capabilities of their quantum-supercomputing integration. This forward-looking strategy encompasses multiple dimensions of technological and application development.

The partners plan to extend their collaboration to encompass new scientific domains, including quantum machine learning applications, advanced materials research with quantum simulation components, and complex optimization problems relevant to Australian industries. This expansion of application domains will broaden the impact of their quantum-classical computing integration, creating value across a more diverse range of scientific and industrial challenges.

In the technical domain, future development will focus on creating increasingly sophisticated tools for quantum-classical integration. These advanced software systems will include automated workflow management capabilities that optimize resource allocation between quantum and classical computing elements based on problem characteristics and computational requirements. These tools will further reduce the technical barriers to quantum computing adoption by research teams without specialized quantum expertise.

The partnership''s educational dimension will also expand through enhanced training programs designed to build a broader base of quantum computing expertise within the Australian research community. These initiatives will accelerate the adoption of quantum techniques across multiple disciplines by creating a larger pool of researchers capable of effectively leveraging quantum-enhanced computational approaches in their work.

As QuEra advances its quantum hardware capabilities through ongoing development, the partnership will ensure Pawsey researchers maintain access to increasingly powerful quantum systems. The software infrastructure developed through the collaboration will be continuously optimized to leverage these hardware advancements, creating a sustainable pathway for computational capability enhancement over time.

The strengthening relationship between these organizations was further formalized in August 2024, when Pawsey was named as an initial member of the QuEra Quantum Alliance Partner Program. This development has created new pathways for quantum computing deployment in research applications, cementing the long-term nature of the collaboration and its strategic importance to both organizations.

The strategic alignment between QuEra and Pawsey represents a significant step toward practical quantum advantage in scientific research. Their collaboration demonstrates how targeted partnerships between quantum technology providers and high-performance computing facilities can accelerate the transition to quantum-enhanced computational methods, creating value for the broader scientific community while advancing the technical capabilities and strategic positioning of the partner organizations.', '{"Pawsey Supercomputing Research Centre"}', '{QuEra}', NULL, '{Aquila}', true, NULL, '2025-05-05 10:32:08.985116+00', '2025-07-17 11:25:07.966739+00', '[^1]: QuEra Computing & Pawsey Supercomputing Research Centre. (2023). "Partnership Announcement: Quantum Computing and Supercomputing Integration."
[^2]: Pawsey Supercomputing Research Centre. (2024). "Quantum-HPC Integration: Australian Research Applications."
[^3]: QuEra Computing. (2024). "Neutral-Atom Quantum Computing: Research Applications and Case Studies."
[^4]: Journal of Quantum Information Science. (2024). "Practical Integration of Neutral-Atom Quantum Computing with High-Performance Computing Infrastructure."', '[{"url": "https://pawsey.org.au/quera-and-pawsey-partner-to-drive-innovation-in-quantum-computing-and-supercomputing/", "label": "QuEra and Pawsey Partner to Drive Innovation in Quantum Computing and Supercomputing", "order": 1}]', '{Bloqade}', 2025),
	('d775c6d9-0887-409c-a2b1-ff6052ca84ec', 'd-wave-pattison-driver-scheduling', 'D-Wave and Pattison Food Group explore driver scheduling', 'D-Wave and Pattison Food Group explore the potential of quantum-powered workforce scheduling optimization.', '
In 2024, D-Wave Quantum Inc., a leader in quantum computing systems and the world''s first commercial supplier of quantum computers, partnered with Pattison Food Group Ltd., a major Canadian grocery retail organisation with over 100 stores offering e-commerce delivery services. The collaboration aimed to address the complex challenge of driver scheduling for e-commerce deliveries by using D-Wave''s quantum computing technology.

## The Workforce Scheduling Challenge

Pattison Food Group faced significant operational challenges with its e-commerce delivery driver scheduling process. With over 100 stores offering delivery services, the company required an efficient system to manage driver assignments across its extensive retail network.

The existing scheduling process was highly manual and labor-intensive, requiring 3-4 dedicated staff members to create driver schedules each week. These schedulers needed to account for numerous complex constraints simultaneously, including driver seniority, individual preferences, work history, and company policies. The manual nature of this process consumed substantial time and resources, was prone to human error, and often resulted in suboptimal schedules that failed to efficiently utilise the available workforce.

The scheduling problem represented a classic combinatorial optimization challenge: finding the best possible assignment of drivers to time slots and delivery routes while satisfying all constraints. The number of possible scheduling combinations grew exponentially with each additional variable, making it impossible to evaluate all possibilities manually or even with conventional computing approaches in a reasonable timeframe.

## Quantum Solution

D-Wave collaborated with Pattison Food Group to develop a quantum-powered solution that could automatically generate optimised driver schedules. The solution leveraged D-Wave''s quantum annealing technology, which is specifically designed to solve complex optimization problems.

The team modelled the scheduling problem as a quadratic unconstrained binary optimization (QUBO) problem, a format suitable for D-Wave''s quantum annealing processors. This approach represented each potential driver assignment as a variable in a mathematical framework where the optimal solution minimised a cost function that accounted for all scheduling constraints.

Key features of the quantum solution included:

- Comprehensive Constraint Integration: The system incorporated all relevant scheduling rules, including driver seniority considerations, individual preferences and work history, and company policies.

-Hybrid Quantum-Classical Approach: The solution used D-Wave''s hybrid solver services, accessible through the Leap quantum cloud service, which combined the power of quantum computing with classical optimization techniques to efficiently handle the large-scale scheduling problem.

-Iterative Refinement: The system allowed for adjustments and refinements to the automatically generated schedules, providing schedulers with the flexibility to make manual modifications when necessary.

## Implementation

The implementation process began with a thorough analysis of Pattison Food Group''s existing scheduling workflows and constraints. D-Wave''s team worked closely with the company''s schedulers to understand the complex rules and preferences that governed driver assignments.

Next, the partners developed a structured data model to represent all relevant scheduling information, including driver availability, qualifications, seniority levels, and store locations. This data served as input to the quantum optimization system.

The quantum scheduling application was deployed as a cloud-based solution, allowing Pattison''s scheduling team to access it through D-Wave''s Leap quantum cloud service. This approach eliminated the need for on-premises quantum hardware while providing secure, reliable access to D-Wave''s quantum computing resources.

The implementation included a training phase for Pattison''s scheduling team, ensuring they could effectively use the new system and interpret its results. The partners also established a feedback loop to continuously improve the solution based on real-world performance and user experiences.

## Results and Business Impact

The implementation of D-Wave''s quantum-powered scheduling solution delivered significant and measurable business benefits for Pattison Food Group. Most notably, the company achieved an approximately 80% reduction in the manual effort required for initial schedule creation.

This dramatic efficiency improvement translated into multiple operational benefits:

- Resource Reallocation: Staff members previously dedicated to manual scheduling could now be redirected to higher-value activities, improving overall operational efficiency.

- Schedule Quality: The quantum-optimised schedules better aligned with driver preferences and company policies, potentially leading to increased driver satisfaction and reduced turnover.

- Responsiveness: The rapid generation of optimised schedules enhanced the company''s ability to respond to changing delivery demands and driver availability.

The success of this implementation demonstrated the practical business value of quantum computing in addressing real-world operational challenges. Instead of remaining a theoretical technology with future potential, D-Wave''s quantum solution delivered immediate, measurable benefits in a production environment.

## Future Directions

Following the successful implementation of the driver scheduling solution, Pattison Food Group and D-Wave identified opportunities to extend the application of quantum computing to other aspects of the retail operation. Potential areas for future optimization included inventory management, store staffing, and supply chain logistics.

The partners also recognised opportunities to enhance the existing scheduling solution by incorporating additional data sources, such as traffic patterns and weather forecasts, to further improve delivery efficiency. By continually refining the optimization model and incorporating more variables, the quantum solution could deliver even greater business value over time.

D-Wave has showcased the Pattison Food Group case study as an example of quantum computing''s practical business applications, highlighting it alongside other successful implementations such as Ford Otosan''s manufacturing production scheduling (which achieved an 83% time reduction) and NTT Docomo''s mobile network resource utilisation (which saw a 15% improvement). These success stories collectively demonstrate that quantum computing has transitioned from a theoretical technology to one that delivers practical business value across diverse industries and use cases.

', '{Pattison}', '{D-Wave}', NULL, '{"D-Wave Advantage"}', true, NULL, '2025-05-05 09:11:37.567752+00', '2025-07-22 06:42:06.537624+00', '[^1]: D-Wave Quantum Inc. (2024). "Quantum Computing Applications in Retail Operations."
[^2]: Pattison Food Group Ltd. (2024). "E-commerce Delivery Optimization Case Study."
[^3]: Journal of Quantum Business Applications. (2024). "Quantum Annealing for Workforce Scheduling in Retail."
[^4]: D-Wave Systems. (2024). "Leap Quantum Cloud Service: Customer Success Stories."', '[]', '{"D-Wave Leap"}', 2024),
	('b64fccb1-1d09-4445-abd6-6a7bae7bfe11', 'ibm-boeing-aerospace-materials-optimisation', 'IBM and Boeing explore aerospace materials optimisation', 'A collaboration between IBM Quantum and Boeing to explore the use of quantum computing for aerospace materials design and corrosion prevention.', 'Boeing, a leading global aerospace company, partnered with IBM Quantum to explore how quantum computing could address two critical aerospace engineering challenges: the design of advanced composite materials and the prevention of metal corrosion. This collaboration leveraged IBM''s quantum computing expertise and Boeing''s deep aerospace industry knowledge to develop innovative approaches that could potentially transform aircraft design and manufacturing.

## The Aerospace Engineering Challenges

Boeing faced two significant engineering challenges that traditional computing methods struggled to address efficiently:

**Ply Composite Design Optimization**. Aircraft manufacturers like Boeing use advanced materials known as ply composites to create lightweight, safe, and strong components for aircraft like the 787 Dreamliner. These composites consist of thousands of individual plies—long strands of strong material layered across one another like fabric. Each strand is strong in one direction, and building a component with the right properties requires careful arrangement of each strand at precisely the right angle. For a large aircraft component, these design decisions can involve up to 100,000 variables, creating an optimization problem of enormous complexity. Traditional computing approaches cannot solve such problems all at once, forcing engineers to break them into smaller pieces, which leads to suboptimal designs and longer development cycles.

**Metal Corrosion Prevention**. Corrosion represents a persistent challenge for the aerospace industry, affecting the longevity, safety, and maintenance costs of aircraft. Metal components exposed to humidity and environmental factors develop thin water films on their surfaces, initiating chemical reactions that lead to corrosion. Understanding and preventing these reactions requires modeling complex quantum-scale interactions between water molecules and metal surfaces. This is a task that classical computing methods can only approximate with significant limitations. More precise simulations could lead to the development of better corrosion-resistant materials and protective coatings.

## Quantum Solutions

The IBM-Boeing partnership developed two distinct quantum computing approaches to address these aerospace engineering challenges:

**Quantum Optimization for Ply Composite Design**. For the ply composite design problem, the teams developed a quantum optimization approach that could potentially handle the massive number of variables involved in designing composite materials. They created a streamlined model of the ply composite problem, focusing on finding the optimal way to stack layers of material. However, existing quantum optimization methods were inefficient, using just one binary variable per qubit. Through their collaboration, Boeing and IBM researchers developed more efficient encoding techniques that made better use of limited quantum resources. This breakthrough allowed them to run what was, at the time, the largest binary optimization problem ever handled by a quantum computer: a small version of Boeing''s ply composite problem with 40 variables.

**Quantum Simulation of Corrosion Processes**. For the corrosion challenge, IBM and Boeing researchers developed new techniques to perform quantum simulations of a key step in the corrosion process known as water reduction, which is the splitting of a water molecule on a magnesium surface, which initiates a chain of corrosion reactions. The team created two innovative approaches, the first being a new embedding method specifically designed for simulating reactions of molecules on surfaces, and the second being a circuit simplification technique that significantly reduced the quantum resources required to run their simulations.

## Implementation

The implementation of these quantum solutions involved close collaboration between Boeing''s aerospace engineering teams and IBM''s quantum computing experts.

**Ply Composite Design Implementation**. For the ply composite challenge, the teams implemented a phased approach. They first identified a simplified version of the problem that could be tackled with current quantum hardware while still representing the essential characteristics of the full design challenge. This allowed them to test and validate their quantum optimization approach on existing quantum computers . IBM
The implementation required developing new quantum algorithms that could encode the complex constraints of aerospace material design into a format compatible with quantum processing. The researchers created specialised techniques to map the material properties and structural requirements onto quantum states, allowing the quantum computer to explore the vast solution space more efficiently than classical approaches. While current quantum computers weren''t yet large enough to design a complete airplane wing, the successful implementation of a 40-variable model demonstrated that the approach was viable and could scale as quantum hardware capabilities improved.

**Corrosion Process Simulation Implementation**. For the corrosion prevention challenge, the teams implemented a quantum simulation workflow that integrated both classical and quantum computing elements. They developed a hybrid approach that used classical computing for preprocessing and then employed quantum computing for the most computationally intensive aspects of the molecular simulation.

The implementation included the development of an embedding method specifically designed for simulating reactions of molecules on surfaces, allowing them to focus quantum resources on the most critical aspects of the water reduction process. Additionally, their circuit simplification technique significantly reduced the quantum resources required, making it feasible to run meaningful simulations on current quantum hardware. This implementation allowed them to compute the energies involved in the water reduction reaction with greater accuracy than leading classical methods like Density Functional Theory (DFT), which has been used to study this same reaction in hundreds of other papers but requires significant approximations.

## Results and Business Impact

The collaboration between IBM and Boeing delivered several significant outcomes with potential long-term business implications.

**Results of Ply Composite Design Project**. The teams successfully ran a 40-variable model of Boeing''s ply composite problem on a quantum computer, which was, at the time, the largest execution of its kind ever performed. This represented a significant milestone in applying quantum computing to real-world aerospace engineering challenges.

As Jay Lowell, Chief Scientist for Boeing''s Disruptive Computing and Networks team, noted, this achievement demonstrated that "it''s not if quantum computers will be relevant to our business problems, but when". The project showed that quantum solutions for complex optimization problems were more achievable than previously thought, potentially bringing quantum-enhanced aerospace design closer to reality. While current quantum computers aren''t yet capable of handling the full 100,000-variable problems involved in actual aircraft design, the techniques developed through this collaboration laid important groundwork for scaling up the approach as quantum hardware improves.

**Results of Corrosion Prevention Project**. In the corrosion prevention project, the researchers demonstrated that quantum computing could model the water reduction reaction more accurately than leading classical methods. By computing the energies involved in this fundamental quantum process, they achieved a level of precision that classical approximation methods simply couldn''t match.

This enhanced accuracy could potentially lead to better understanding of corrosion mechanisms and the development of more effective corrosion-resistant materials. Given that corrosion represents a significant maintenance and safety challenge for the aerospace industry, even incremental improvements in corrosion prevention could translate to substantial economic benefits and safety enhancements. The circuit simplification method developed during this project also has potential applications beyond corrosion studies, potentially enhancing the efficiency of quantum simulations across various domains.

## Future Directions

Building on their successful collaboration, IBM and Boeing have outlined several directions for future research and development:

**Scaling Up Ply Composite Design**. As quantum computers continue to increase in capacity and reliability, Boeing aims to scale up their quantum optimization approach to handle progressively larger and more complex design problems. This could eventually enable the optimization of full-scale aerospace components with tens of thousands of variables, potentially revolutionising aircraft design and manufacturing. The techniques developed for efficient encoding of optimization problems on quantum hardware will likely find applications in other areas of aerospace design and manufacturing, extending beyond ply composites to other complex optimization challenges.

**Expanding Corrosion Simulation Capabilities**. For the corrosion prevention work, the researchers plan to continue their collaboration to investigate how quantum computing may shed light on additional chemical reactions involved in material degradation across different environments. This expanded focus could lead to comprehensive models of corrosion processes and more effective prevention strategies. Boeing is also exploring the application of their quantum simulation approach to the development of advanced corrosion-resistant chemicals for coating airplanes, potentially leading to more durable and environmentally friendly protective solutions.

Through this partnership, Boeing has established a quantum-literate workforce and capabilities that position the company to take advantage of quantum computing as the technology matures. The skills and expertise developed during these projects will enable Boeing to apply quantum approaches to other aerospace challenges as quantum hardware continues to improve. As Jennifer Glick, Technical Lead for Quantum Prototypes at IBM Quantum, observed, these collaborations are "helping us push the frontier of quantum research" and "beginning to see what a future where quantum computers solve real, practical problems looks like". This pioneering work is establishing a foundation for the broader adoption of quantum computing in the aerospace industry and beyond.
', '{Boeing}', '{IBM}', NULL, '{"IBM Eagle"}', true, NULL, '2025-05-05 09:21:04.694714+00', '2025-07-22 06:58:42.329172+00', '[^1]: IBM Research. (2023). "Quantum Computing Applications in Aerospace Design."
[^2]: Boeing Corporation. (2023). "Advanced Materials Design with Quantum Computing."
[^3]: IBM Quantum Blog. (2023). "Simulating Corrosion Processes with Quantum Computing."
[^4]: Nature, npj Quantum Information. (2023). "Quantum Computation of Reactions on Surfaces Using Local Embedding."', '[]', '{Qiskit}', 2023),
	('1725a92a-e804-4fb6-af66-5b7bc875834f', 'quantinuum-hsbc-financial-services-enhancement', 'Quantinuum and HSBC explore financial services', 'Quantinuum and HSBC collaborate on applying Quantum Computing to financial use cases such as cybersecurity and fraud detection.', 'In May 2023, Quantinuum, the world''s largest quantum computing company, and HSBC, one of the largest banking and financial services organizations globally, announced a partnership to explore the potential near and long-term benefits of quantum computing for banking applications. This collaboration focused on specific areas critical to the financial industry: cybersecurity, fraud detection, and natural language processing.

## The Financial Services Challenges

HSBC faced several complex challenges that traditional computing approaches struggled to address effectively, particularly in areas where security, data analysis, and customer interaction intersect.

**Cybersecurity Threats.** The banking industry faces ever-evolving cybersecurity threats, with sensitive financial and customer data as prime targets. Additionally, the looming threat of quantum computers breaking existing cryptographic systems poses a significant long-term security risk. This "store now, decrypt later" vulnerability meant that encrypted data captured today could potentially be decrypted once quantum computers reach sufficient capability, creating an urgent need for quantum-resistant security solutions.

**Fraud Detection Complexity**. Financial fraud detection involves analyzing massive datasets with numerous parameters to identify suspicious patterns. Traditional machine learning approaches often struggle with the high dimensionality of these datasets, where adding more parameters exponentially increases the computational complexity. More effective methods were needed to detect sophisticated fraud attempts in real-time.

**Natural Language Processing Limitations**. In regulated financial environments, transparency and explainability in AI systems are crucial. Traditional "black box" large language models often lack the explainability required for applications involving sensitive customer data. HSBC needed more transparent approaches to natural language processing that could maintain regulatory compliance while improving customer service.

## Quantum Solutions

The Quantinuum-HSBC partnership developed a multi-faceted approach to address these challenges, leveraging different aspects of quantum computing technology:

**Quantum Origin for Enhanced Cryptography**. The first component of the collaboration focused on implementing Quantinuum''s Quantum Origin platform to strengthen cybersecurity. Quantum Origin uses the operations of a quantum computer to generate cryptographic keys that are provably unpredictable, offering a level of randomness and security that classical systems cannot achieve. This system was designed to integrate with existing "classical" cybersecurity infrastructure through hardware security module (HSM) providers, allowing HSBC to enhance their security posture without overhauling their entire security architecture.

**Quantum Machine Learning for Fraud Detection**. The partners explored how quantum machine learning (QML) techniques could improve fraud detection capabilities. By leveraging quantum computing''s ability to efficiently process high-dimensional data and explore complex pattern spaces, they aimed to develop more effective models for identifying fraudulent transactions. These QML approaches were enhanced by Quantinuum''s TKET software development platform, which provided qubit routing and circuit optimization techniques to improve the efficiency and effectiveness of quantum algorithms on current hardware.

**Quantum Natural Language Processing**. The third component focused on quantum natural language processing (QNLP), a novel approach to language-based AI that uses quantum states and processes to encode word meanings. Unlike traditional "black box" language models, QNLP offered a more explainable approach to tasks such as question answering and text similarity analysis. This quantum approach to NLP aimed to provide the transparency needed in regulated markets while maintaining the sophisticated language processing capabilities required for effective customer service.

## Implementation

The implementation of these quantum solutions involved several phases and components, leveraging Quantinuum''s hardware and software expertise alongside HSBC''s financial domain knowledge.

**Quantum Cryptography Integration**. HSBC and Quantinuum implemented Quantum Origin via an HSM provider, integrating quantum-generated cryptographic keys into the bank''s existing security infrastructure. This approach allowed HSBC to enhance security while maintaining compatibility with their current systems. The implementation included exploration of how Quantum Origin could be combined with post-quantum cryptographic algorithms to create a comprehensive defence against both current threats and future quantum-enabled attacks.

**Fraud Detection Prototyping**. For the quantum machine learning component, the partners developed prototype fraud detection systems that could analyze transaction patterns using quantum algorithms. These prototypes were designed to evaluate how quantum computing might offer advantages over classical approaches, particularly for problems involving many variables and complex relationships. The implementation leveraged Quantinuum''s TKET platform to optimise quantum circuits for current quantum hardware, addressing the limitations of noisy intermediate-scale quantum (NISQ) devices while still exploring potential quantum advantages.

**QNLP Development**. The QNLP implementation used Quantinuum''s LAMBEQ software, which enables the design and implementation of end-to-end quantum natural language processing pipelines. This development focused on training quantum states and processes to encode word meanings in ways that preserved explainability while maintaining performance. The partners explored how these QNLP approaches could be applied to specific financial use cases, such as customer question answering and document similarity analysis for compliance purposes.

## Results and Business Impact

While the partnership was initially exploratory in nature, it yielded several significant outcomes with implications for the future of quantum computing in financial services. The implementation of Quantum Origin provided HSBC with an additional layer of security based on quantum-generated cryptographic keys. This enhanced protection for the bank''s most sensitive data against both current threats and potential future quantum attacks. In 2024, HSBC conducted a pilot combining Quantum Origin and post-quantum cryptography to future-proof gold tokens against "store now, decrypt-later" threats, demonstrating a practical application of quantum security technology in financial transactions.

The research collaboration also provided valuable insights into the potential advantages and limitations of quantum computing for financial applications. While full quantum advantage may still be years away, the partners identified specific areas where quantum approaches showed promise for improving performance over classical methods. This research helped HSBC develop a clearer roadmap for quantum computing adoption, identifying which applications might benefit from quantum technologies in the near term and which would require more mature quantum hardware.

The partnership positioned both organizations at the forefront of quantum computing applications in financial services. For HSBC, it provided access to cutting-edge quantum hardware and expertise, helping them prepare for a future where quantum computing could transform banking operations. As Philip Intallura, Global Head of Quantum Technologies at HSBC, noted, the collaboration provided "a great opportunity to access cutting-edge quantum hardware and take our use cases to a truly transformational level".

## Future Directions

The Quantinuum-HSBC partnership outlined several directions for future development of quantum applications in financial services:

**Expanded Cybersecurity Applications**. Building on the success of their initial Quantum Origin implementation, the partners identified opportunities to extend quantum-enhanced security to additional areas of banking operations. This included exploring how quantum random number generation could improve security for a wider range of financial transactions and systems.

**Advanced Quantum Algorithms for Finance**. The partners planned to develop more sophisticated quantum algorithms for financial modeling and risk management, addressing the "curse of dimensionality" and NP-hard optimization problems that challenge classical computing approaches. This research aimed to create hybrid classical-quantum methods that could provide practical advantages for complex financial calculations.

**Quantum-Ready Workforce Development**. HSBC recognized the importance of building internal quantum expertise to fully leverage the technology''s potential. The bank has been building a dedicated quantum research team and in-house team of PhD scientists to formalize quantum use cases into deep research projects and develop patents and quantum products.

**Broader Industry Transformation**. The partners envisioned their collaboration as part of a broader transformation of the financial services industry through quantum computing. By developing and implementing quantum-based solutions, they aimed to establish new standards and approaches that could revolutionize banking operations across the sector.


', '{HSBC}', '{Quantinuum}', NULL, '{}', true, '2025-07-04 12:18:59.169+00', '2025-05-05 09:23:46.89137+00', '2025-07-22 06:12:22.562992+00', 'Quantinuum. (2023). "Quantum Origin: Quantum-Generated Cryptographic Keys for Financial Services."
HSBC. (2023). "Quantum Computing Applications in Banking and Financial Services."
Journal of Quantum Finance. (2024). "Quantum Machine Learning for Fraud Detection in Banking."
Quantum Computing Report. (2023). "Quantinuum-HSBC Collaboration for Financial Services."', '[]', '{}', 2025),
	('af449569-c8e6-4ff5-8e04-bb75645465e5', 'qc-ware-goldman-sachs-finance-risk-assessment', 'QC Ware and Goldman Sachs explore quantum in finance', 'QC Ware and Goldman Sachs explore quantum algorithms for financial risk assessment and asset pricing.', 'In December 2019, Goldman Sachs, a leading global investment banking and securities firm, partnered with QC Ware, a quantum computing-as-a-service company, to explore quantum computing applications in finance. This collaboration aimed to gain in-depth knowledge about the near-term impact of quantum computers and to develop new algorithms that would enable quantum computers to outperform classical systems for computational finance applications.

## The Financial Computing Challenge

Goldman Sachs faced significant computational challenges in financial risk assessment and asset pricing that pushed the limits of traditional computing approaches. In particular, Monte Carlo simulations, which are widely used to evaluate risk and simulate prices for various financial instruments, required enormous computational resources and time to execute.

The computational intensity of these simulations meant they were typically executed only once overnight. In volatile markets, traders would be forced to use outdated results throughout the following trading day, potentially missing opportunities or mis-pricing risk. Ideally, these simulations would be run multiple times throughout the day to provide traders with current information, but the computational demands made this impractical with classical computing approaches.

Additionally, the firm needed to prepare for the potential disruption that quantum computing could bring to the financial services industry. As Paul Burchard, lead researcher for R&D at Goldman Sachs, noted, the company sought to "stay current and develop in-house quantum expertise to gain a ''quantum advantage'' once the technology is ready for commercial use".

## Quantum Solution

The QC Ware and Goldman Sachs teams developed innovative quantum algorithms focused on Monte Carlo simulations, which are central to pricing financial instruments and assessing risk. Their approach included several key components.

**Shallow Monte Carlo Algorithms**. The researchers designed what they called "Shallow Monte Carlo" algorithms—quantum algorithms specifically engineered to run on near-term quantum hardware with limited capabilities while still providing significant computational advantages over classical approaches. These algorithms represented a novel approach to quantum algorithm design, trading off some theoretical performance gains for increased resilience to the noise and errors that affect current quantum hardware. Rather than aiming for the theoretical maximum speedup of 1000x that might be possible with perfectly error-corrected quantum computers (expected in 10-20 years), they targeted a more modest 100x speedup that could be achieved on quantum hardware expected to be available in just 5-10 years.

**QFT-Free Monte Carlo Approaches**. The collaboration also explored Quantum Fourier Transform (QFT)-free approaches to Monte Carlo simulations. Traditional quantum algorithms for these simulations relied heavily on QFT operations, which are particularly sensitive to hardware noise. By developing QFT-free methods, the team created algorithms that could run more reliably on near-term quantum hardware.

**Hardware-Agnostic Implementation**. QC Ware''s approach was hardware-agnostic, allowing Goldman Sachs to test algorithms across different quantum computing platforms rather than being tied to a single hardware provider. This flexibility was important given the rapidly evolving quantum hardware landscape and uncertainty about which quantum computing architectures would ultimately prove most effective.

## Implementation

The implementation of these quantum finance algorithms proceeded through several phases, evolving from theoretical research to practical demonstration.

**Research and Algorithm Development**. The collaboration began with intensive research into quantum algorithms for financial applications, with a particular focus on Monte Carlo simulations. The teams investigated how quantum computing could accelerate these simulations while addressing the limitations of near-term quantum hardware. A key aspect of the implementation involved analyzing the effect of noise on the accuracy of quantum algorithms for approximate counting. This research confirmed that standard quantum algorithms were sensitive to noise in current quantum hardware, leading the team to develop more robust approaches.

**Algorithm Optimization**. The partners worked to optimise their quantum algorithms for the constraints of near-term quantum hardware. This involved making careful trade-offs between computational speed and error resilience, resulting in the development of the Shallow Monte Carlo algorithms. These optimisations required rigorous mathematical analysis and empirical simulations to demonstrate that the algorithms could deliver significant performance improvements while remaining robust to the noise and errors present in current and near-term quantum hardware.

**Proof-of-Concept Demonstration**. In September 2021, the collaboration expanded to include IonQ, a quantum hardware provider, to demonstrate their algorithms on actual quantum hardware. This proof-of-concept successfully demonstrated that the quantum algorithm theorised by QC Ware and Goldman Sachs for Monte Carlo simulations could be implemented on IonQ''s quantum computer. This demonstration represented a significant milestone, showing that the combination of innovative algorithms that reduced hardware requirements and increasingly powerful quantum computers was making it possible to run Monte Carlo simulations on current quantum hardware.

## Results and Business Impact

The partnership between QC Ware and Goldman Sachs delivered several significant outcomes with implications for the future of financial computing.

**Algorithm Performance**. The research teams successfully designed quantum algorithms that outperformed state-of-the-art classical algorithms for Monte Carlo simulations. These Shallow Monte Carlo algorithms demonstrated the potential for a 100x speedup over classical approaches, while being designed to run on quantum hardware expected to be available in 5-10 years. By trading off some theoretical performance for reduced error sensitivity, the team cut the timeline for practical quantum advantage in half. Instead of waiting 10-20 years for fully error-corrected quantum computers, financial institutions like Goldman Sachs could potentially begin using quantum computing for certain applications in just 5-10 years.

**Practical Demonstration**. The successful demonstration of these algorithms on IonQ''s quantum hardware validated the practical feasibility of the approach. As noted by Iordanis Kerenidis, Head of Quantum Algorithms – International at QC Ware, this showed "how the combination of insightful algorithms that reduce hardware requirements and more powerful near-term quantum computers has now made it possible to start running Monte Carlo simulations". This proof-of-concept implementation was particularly significant because it moved beyond theoretical research to show that quantum algorithms could be executed on real quantum hardware, even with the limitations of current systems.

**Competitive Advantage**. For Goldman Sachs, the collaboration positioned the firm to be an early adopter of quantum computing technology in finance. By developing expertise and algorithms in advance of widespread quantum computing availability, Goldman Sachs would be prepared to rapidly deploy these technologies when the hardware matured sufficiently.

William Zeng, Head of Quantum Research at Goldman Sachs, highlighted that "quantum computing could have a significant impact on financial services," and their work with QC Ware was "bringing that future closer". This forward-looking approach could provide Goldman Sachs with a competitive edge in computational finance as quantum computing continues to mature.

## Future Directions

The QC Ware-Goldman Sachs partnership outlined several directions for future development of quantum applications in finance:

**Expanding to Other Financial Applications**. While the initial focus was on Monte Carlo simulations, the partners identified additional financial applications that could benefit from quantum computing, such as portfolio optimization and derivative pricing. These applications could potentially provide additional competitive advantages in areas beyond risk assessment.

**Hardware Evolution**. As quantum hardware continues to improve in terms of qubit count, coherence times, and error rates, the partners anticipated being able to scale their algorithms to handle increasingly complex financial simulations. The modular design of their algorithms would allow them to take advantage of hardware improvements as they became available.

**Integration with Financial Systems**. The long-term vision included integrating quantum computing capabilities into Goldman Sachs''s broader computational finance infrastructure. This would allow for seamless use of quantum resources alongside classical computing systems, creating a hybrid approach that exploited the strengths of both paradigms.

**Industry Transformation**. The partners believed that their work could potentially transform how financial markets operate worldwide. If quantum computing could enable Monte Carlo simulations to be executed throughout the trading day rather than just overnight, it could fundamentally change how risk is assessed and how financial instruments are priced in volatile markets.

', '{"Goldman Sachs"}', '{"QC Ware"}', NULL, '{"IonQ Harmony","IonQ Aria"}', true, NULL, '2025-05-05 10:13:06.206809+00', '2025-07-22 15:11:43.734624+00', '[^1]: Goldman Sachs Research & Development. (2021). "Quantum Algorithms for Monte Carlo Simulations in Finance."
[^2]: QC Ware. (2021). "Shallow Monte Carlo: Trading Quantum Speedup for Error Resilience."
[^3]: IonQ, QC Ware, and Goldman Sachs. (2021). "Demonstration of Quantum Monte Carlo Simulations on Trapped-Ion Quantum Computers."
[^4]: Journal of Quantum Finance. (2021). "Reducing the Quantum Hardware Timeline for Monte Carlo Simulations."', '[]', '{"QC Ware Platform"}', 2019),
	('5f38c06a-dafe-45b7-98d6-b2539c02d0a2', 'qc-ware-roche-biomedical-image-analysis', 'QC Ware and Roche explore biomedical image analysis ', 'A collaboration to explore quantum neural networks for biomedical image analysis.', 'QC Ware, a leading quantum software and services company, partnered with Roche Pharma Research and Early Development (pRED) to explore how quantum computing could support drug development through advanced biomedical image analysis. This collaboration focused specifically on using quantum neural networks to classify medical images for detecting and diagnosing diabetic retinopathy, a serious eye condition that can lead to vision loss in people with diabetes.

## The Medical Imaging Challenge

Roche faced significant challenges in analysing and classifying complex biomedical images, particularly retinal scans used to detect diabetic retinopathy. This condition, which affects blood vessels in the retina, requires early detection and accurate staging to prevent vision loss, but analysing retinal images is a complex and resource-intensive process.

Traditional machine learning approaches for medical image analysis require substantial computational resources and can struggle with the subtle features and patterns that indicate different stages of diabetic retinopathy. More accurate and efficient methods for analysing these images could potentially improve diagnostic capabilities, accelerate drug development for eye conditions, and ultimately lead to better patient outcomes.

Additionally, as a leading biotechnology company, Roche needed to explore how emerging technologies like quantum computing might transform their research and development processes in the future. Understanding the potential applications and limitations of quantum computing for pharmaceutical research could provide a competitive advantage as the technology matures.

## Quantum Solution

The QC Ware-Roche collaboration developed a quantum machine learning approach focused on using quantum neural networks for biomedical image classification. Their solution had several key components:

**Quantum Vision Transformers**. The teams developed novel quantum transformer models for analysing retinal images. These quantum-enhanced vision transformers leveraged the unique properties of quantum computing to process and classify medical images in ways that could potentially surpass classical approaches. This approach drew inspiration from classical transformer models, which have revolutionised natural language processing and computer vision, but implemented them using quantum computing principles to potentially achieve better performance with fewer parameters.

**Hardware-Efficient Quantum Neural Networks**. The solution employed quantum neural network architectures optimised for current and near-term quantum hardware. These networks were designed to operate efficiently on systems with limited qubit counts and subject to the noise and errors present in current quantum computers.

By tailoring the architecture to the constraints of available quantum hardware, the team created a practical implementation that could be tested on actual quantum computers rather than just simulated environments.

**Hybrid Quantum-Classical Approach**. Recognising the limitations of current quantum hardware, the researchers developed a hybrid approach that combined the strengths of quantum computing with classical processing. This allowed them to implement their solution on available quantum systems while still addressing the complex requirements of biomedical image analysis.

## Implementation

The implementation of this quantum solution involved several phases, from theoretical development to practical testing on quantum hardware.

**Quantum Algorithm Development**. The QC Ware and Roche pRED Quantum Computing Taskforce collaborated to design quantum algorithms specifically for classifying biomedical images. This required translating complex image processing tasks into formats suitable for quantum computation while maintaining the accuracy needed for medical applications.

**Testing on Quantum Hardware**. The team tested their quantum vision transformer models on IBM''s 27-qubit superconducting quantum computer. They ran direct experiments with up to six qubits to evaluate the performance of their algorithms on actual quantum hardware. Additionally, they conducted simulations to assess how their approach might perform on larger quantum systems with up to 100 qubits, providing insights into the potential future capabilities of their solution as quantum hardware continues to advance.
Comparative Analysis

A critical aspect of the implementation was comparing the performance of their quantum neural networks against state-of-the-art classical machine learning models for the same image classification tasks. This allowed them to assess the potential advantages and limitations of quantum approaches for biomedical image analysis.

**Documentation and Knowledge Sharing**. The research findings were documented in a paper titled "Quantum Vision Transformers," which was published on arXiv, making the results available to the broader scientific community. This reflected both organisations'' commitment to advancing the field of quantum computing for biomedical applications.

## Results and Business Impact

The collaboration between QC Ware and Roche yielded several significant outcomes with implications for both medical diagnostics and quantum computing applications.

**Performance Achievements**. The study demonstrated that the quantum transformer models matched—and in some cases outperformed—classical models for analyszing retinal images to detect diabetic retinopathy. This finding was particularly notable given the early stage of quantum computing technology. As Iordanis Kerenidis, QC Ware''s senior vice president of quantum algorithms, noted, these results were "extremely encouraging" and illustrated "the potential future of quantum computing in the acceleration of image analysis and medical diagnostics".

**Quantum Computing Insights**. The project provided Roche with valuable insights into how quantum computing could support drug development processes. Marielle van de Pol, Global Head Scientific Solution Engineering and Architecture at Roche, emphasised that the result of their joint exploration was "to understand how quantum computing can support drug development". This understanding of quantum computing''s potential applications and limitations in pharmaceutical research could inform Roche''s technology strategy and investments moving forward.

**Industry Recognition**. The collaboration positioned both QC Ware and Roche as pioneers in applying quantum computing to medical diagnostics. By successfully demonstrating practical applications of quantum neural networks for biomedical image analysis, they established themselves as leaders in this emerging field.

## Future Directions

The QC Ware-Roche partnership outlined several directions for future development of quantum applications in biomedical research:

**Expanding to Additional Medical Imaging Applications**. Building on their success with diabetic retinopathy detection, the partners identified opportunities to apply their quantum neural network approach to other types of medical images, potentially including radiological images, pathology slides, and microscopy data.

**Scaling to Larger Quantum Systems**. As quantum hardware continues to advance, the teams planned to scale their algorithms to take advantage of systems with more qubits and lower error rates. Their simulation work with up to 100 qubits provided a roadmap for how their approach could evolve as hardware capabilities improve.

**Integration with Drug Development Workflows**. Roche aimed to explore how quantum computing capabilities could be integrated into broader drug development workflows, potentially accelerating multiple aspects of the pharmaceutical research and development process.

**Quantum Machine Learning Framework Development**. QC Ware planned to continue developing its quantum machine learning framework, incorporating insights from the Roche collaboration to enhance its capabilities for biomedical applications and other domains requiring complex image analysis.

', '{Roche}', '{"QC Ware"}', NULL, '{"IBM Falcon","IBM Quantum System One"}', true, NULL, '2025-05-05 10:20:58.70925+00', '2025-07-22 15:22:29.712821+00', '[^1]: QC Ware and Roche pRED. (2023). "Quantum Vision Transformers."
[^2]: Roche Pharma Research and Early Development. (2023). "Quantum Computing Applications in Drug Development."
[^3]: arXiv. (2023). "Quantum Neural Networks for Biomedical Image Classification."
[^4]: Journal of Quantum Machine Learning. (2023). "Quantum Approaches to Medical Image Analysis."', '[]', '{"Quantum Vision Transformers"}', 2020),
	('93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '1qbit-accenture-biogen-drug-discovery', '1QBit explore drug discovery with Accenture and Biogen', 'Accenture Labs and 1QBit work with Biogen to apply quantum computing to accelerate the research around drug discovery. ', 'In June 2017, Accenture Labs, quantum software firm 1QBit, and biotechnology company Biogen collaborated to develop a first-of-its-kind quantum-enabled molecular comparison application. This innovative solution aimed to significantly improve advanced molecular design to accelerate drug discovery for complex neurological conditions including multiple sclerosis, Alzheimer''s, Parkinson''s, and Lou Gehrig''s Disease.

## The Drug Discovery Challenge

Pharmaceutical companies like Biogen face significant challenges in the drug discovery process, particularly in the early phases of molecular design. Traditional computational methods used to review molecule matches and predict therapeutic effects were computationally intensive and provided limited insights into molecular structures and their interactions.

Molecular comparison is a crucial step in drug discovery where scientists analyze structural similarities between molecules to identify potential therapeutic candidates. The existing methods provided only basic similarity scores without detailed information about why molecules matched or their shared characteristics. This limited researchers'' ability to make informed decisions about which molecular structures to pursue for further development.

Additionally, the discovery process for treatments targeting complex neurological conditions is particularly challenging due to the intricacy of the central nervous system and the multifaceted nature of these diseases. These challenges result in lengthy development timelines and high costs, with neurological drug discovery often taking over a decade from concept to market.

The partners developed a quantum-enabled molecular comparison application that leveraged 1QBit''s Graph-Based Molecular Similarity (GMS) method. This innovative approach was formulated as a quadratic unconstrained binary optimization (QUBO) problem, making it suitable for quantum computing.

The solution enhanced Biogen''s existing molecule comparison methods with quantum capabilities, allowing scientists to not only determine how similar molecules are but also to understand exactly how, where, and why molecular bonds matched. This provided deeper contextual information and better insights into shared molecular traits that could potentially accelerate the drug discovery process.

While full-scale quantum computing hardware was not yet commercially available, the application was designed to leverage today''s high-performance computing power while being ready to take advantage of quantum computers as they matured. The quantum-inspired algorithms delivered superior results compared to classical methods even when running on conventional hardware, with the promise of even greater performance as quantum technology advanced.

## Implementation

The implementation began with researchers at Accenture Labs collaborating with 1QBit to adapt their pre-developed structural molecular comparison algorithm and cloud-based API to include Biogen''s additional pharmacophore requirements.

In just over two months, the partnership progressed from an exploratory conversation about quantum business experimentation to a proof of concept that validated the quantum computing molecule comparison approach. This rapid development culminated in an enterprise-ready, quantum-enabled application with transparent processes that provided molecular comparison results with deeper insights about shared traits.

The implementation focused on practical integration with Biogen''s existing research workflows. The system was designed to complement traditional molecular comparison methods, using the conventional approach to run initial comparisons on millions of molecules and then employing the quantum-enabled application to dive deeper into the most promising candidates.

## Results and Business Impact

The quantum-enabled method for molecular comparison demonstrated significant improvements over existing methods, providing scientists with more detailed information about molecular similarities. The application verified that the quantum-enabled approach was as good as or better than existing methods, confirming quantum computing''s potential to transform pharmaceutical research and development.

According to Govinda Bhisetti, Head of Computational Chemistry at Biogen, the solution made it "possible to rapidly pilot and deploy a quantum-enabled application that has the potential to enable us to bring medicines to people faster" . 1QBit The enhanced molecular comparison capabilities allowed researchers to see exactly how and why molecular bonds matched, offering better insights to expedite drug discovery for complex neurological conditions.

The business impact extended beyond improved scientific insights to include significant efficiency gains. By enabling more accurate initial molecular comparisons, the solution reduced the expenses associated with screening different molecules for pharmaceutical use. This created a distinct competitive advantage through reduced time to market and cost savings.

## Future Directions

Building on the success of this collaboration, the partners established plans to further advance quantum computing applications in drug discovery. Accenture aimed to scale quantum computing use in molecular matching while continuing to improve speed and effectiveness of the solution.

As quantum computers became more sophisticated, the partners anticipated even greater benefits for pharmaceutical research. The quantum-enabled application was designed to deliver increasingly valuable insights as quantum hardware capabilities matured, potentially enabling comparisons of much larger molecules and opening the door for more pharmaceutical advancements.

The successful implementation of this quantum-enabled solution also laid the groundwork for exploring additional quantum computing applications in the pharmaceutical industry. Accenture and 1QBit continued to collaborate on other classes of problems that could benefit from quantum approaches, such as image analysis and interpretation, all directed towards improving the speed and effectiveness of developing new medicines.', '{Accenture,Biogen}', '{1QBit}', NULL, '{}', true, NULL, '2025-05-05 09:14:54.475254+00', '2025-07-22 06:26:46.630073+00', '[^1]: Accenture. (2017). ["Quantum Computing in Pharmaceutical Research and Development."](https://www.accenture.com/gr-en/case-studies/life-sciences/quantum-computing-advanced-drug-discovery)
[^2]: 1QBit Research. (2017). "Graph-Based Molecular Similarity for Drug Discovery."
[^3]: Biogen. (2017). "Advanced Computing Applications in Neurological Drug Discovery."
[^4]: Journal of Chemical Information and Modeling. (2019). ["A Quantum-Inspired Method for Three-Dimensional Ligand-Based Virtual Screening."](https://arxiv.org/abs/1902.00352)', '[{"url": "https://newsroom.accenture.com/news/2017/accenture-labs-and-1qbit-work-with-biogen-to-apply-quantum-computing-to-accelerate-drug-discovery", "label": "Accenture Labs and 1QBit Work with Biogen to Apply Quantum Computing to Accelerate Drug Discovery", "order": 1}, {"url": "https://1qbit.com/news/wsj-accenture-1qbit-biogen-poc-indicates-quantum-computing-may-speed-drug-discovery/", "label": "Accenture, 1QBit and Biogen POC Shows Quantum Computing May Speed Drug Discovery", "order": 2}, {"url": "https://arxiv.org/abs/1902.00352", "label": "A Quantum-Inspired Method for Three-Dimensional Ligand-Based Virtual Screening", "order": 3}]', '{"Graph-Based Molecular Similarity (GMS)","Quadratic Unconstrained Binary Optimization (QUBO)","1QBit Platform"}', 2017),
	('99916798-d04e-46af-b496-970de5b2d2f5', 'qcware-covestro-materials-science-innovation', 'QC Ware and Covestro tackle new methods of materials science', 'QC Ware and notable polymer manufacturer Covestro explore quantum algorithms for materials science and polymer innovation.', 'In June 2022, Covestro, one of the world''s leading polymer companies, and QC Ware, a quantum software and services company, announced a five-year collaboration agreement to develop quantum algorithms for materials research and development. This partnership aimed to prepare Covestro to fully deploy quantum algorithms for the discovery of new materials and catalysts on near-term quantum hardware.

## The Materials Science Challenge

Covestro faced significant computational challenges in its research and development of new materials and more efficient production processes. As a major polymer manufacturer with 2020 sales of €10.7 billion and 33 production sites worldwide, the company was committed to developing sustainable solutions and transitioning to a circular economy.

Traditional computational methods for simulating molecular behavior had reached their limits when it came to modeling complex chemical systems relevant to industrial applications. Simulating large-scale molecules and their properties—such as forces on atoms, light absorption, or electrical conductivity—required computational resources beyond what classical computers could efficiently provide. Additionally, Covestro needed to accelerate its R&D processes to support the company''s transformation toward carbon neutrality and a circular economy. Developing sustainable polymer materials for industries such as automotive, construction, electronics, and household appliances required more powerful computational tools to discover and optimise new materials with specific properties.

## Quantum Solution

The QC Ware-Covestro partnership developed advanced quantum algorithms specifically designed for materials science applications with several key innovations:

**Quantum Chemistry Simulation**. The collaboration focused on creating quantum algorithms that could accurately model the behavior of complex molecules relevant to Covestro''s business. These algorithms were designed to simulate quantum-scale interactions more naturally and efficiently than classical computing approaches, potentially enabling the discovery of new materials and catalysts. A distinctive feature of their approach was the ability to compute not just ground state energies of molecules—which had been the focus of most quantum chemistry research—but also crucial properties such as forces on atoms, color and light-absorbing properties, and electrical conductivity. These capabilities were critical for providing practical value to computational chemists in industrial settings.

**Resource-Efficient Quantum Techniques**. The team developed new quantum techniques that significantly reduced the quantum computing resources required to design new materials and chemical processes. These innovations included reductions in both circuit depth and connectivity requirements—critical components for implementing practical applications on near-term quantum hardware with limited capabilities.

**Hybrid Quantum-Classical Architecture**. Recognizing that practical applications required leveraging both quantum and classical computing strengths, the partners created a full-stack solution that merged high-performance classical techniques for pre- and post-processing with advanced quantum algorithms reserved for the most computationally challenging aspects of the problems. This hybrid approach allowed them to tackle larger molecular systems than would be possible with purely quantum approaches on current hardware.

## Implementation

The implementation of this quantum solution involved a structured approach that began with a proof-of-concept project and evolved into a long-term partnership. Before signing the five-year agreement, Covestro and QC Ware conducted a year-long collaboration on a proof-of-concept project that explored modeling large-scale molecules needed for industrial applications on near-term quantum computers[^1][^2]. This project allowed them to validate their approach and establish a foundation for more extensive collaboration. The results of this initial project were documented in two research papers: "Local, Expressive, Quantum-Number-Preserving VQE Ansatze for Fermionic Systems" published in New Journal of Physics[^3], and "Analytical Ground- and Excited-State Gradients for Molecular Electronic Structure Theory from Hybrid Quantum/Classical Methods" published on arXiv[^4]. These papers introduced new quantum techniques for simulating molecular systems with significantly reduced resource requirements, creating a pathway to practical applications on near-term quantum hardware.

The implementation also involved creating a cross-disciplinary team that combined Covestro''s expertise in computational chemistry and manufacturing with QC Ware''s specialised knowledge in quantum algorithms. Christian Gogolin, Expert Advanced Computational Concepts and Quantum Computing at Covestro Digital R&D, led efforts on the Covestro side, while Robert Parrish, Head of Chemistry Simulations at QC Ware, spearheaded the quantum algorithm development. This collaborative structure enabled the partners to bridge the gap between theoretical quantum computing capabilities and practical industrial applications.

## Results and Business Impact

In September 2021, Covestro deepened its commitment to quantum computing by co-leading QC Ware''s $25 million Series B funding round alongside Koch Disruptive Technologies. This investment reflected Covestro''s belief in the strategic importance of quantum computing for its future R&D capabilities and provided additional resources to accelerate the development of quantum algorithms for materials discovery. The partnership between QC Ware and Covestro hasn''t just been on the financial side, as it has delivered several significant outcomes with implications for the future of materials science and polymer development.

**Enhanced Computational Capabilities**. The quantum algorithms developed through the collaboration demonstrated the potential to solve simulation problems that were "out of the reach of state-of-the-art classical computing," according to Torsten Heinemann, Head of Group Innovation at Covestro. The approach allowed for the accurate prediction of not just molecular energies but also forces and other properties critical for materials development. This capability represented a significant advancement over previous quantum simulation approaches, providing Covestro''s researchers with deeper insights into molecular behaviour.

**Path to Quantum Advantage**. While the full benefits of quantum computing for materials science would require more powerful quantum hardware, the partnership established a clear trajectory toward practical quantum advantage. The companies believed their algorithms would achieve quantum advantage—solving real-world problems better than classical computers—once processors with 200-500 qubits became available. This positioned Covestro to be ready to leverage quantum computing for competitive advantage as soon as the hardware matured sufficiently.

## Future Directions

The five-year collaboration agreement between QC Ware and Covestro outlined several directions for future development of quantum applications in materials science. By providing new computational tools for materials discovery, the quantum algorithms could potentially reduce the time and resources required to develop new products, enabling more rapid innovation in sustainable materials.

**Expanding Materials Discovery Applications**. The partners planned to use their quantum algorithms to discover new material classes and develop more efficient, resource-conserving production processes. This would support Covestro''s strategic goal of enhancing its digital R&D processes to achieve carbon neutrality through circular economy approaches.

**Scaling to Larger Molecular Systems**. As quantum hardware capabilities continued to improve, the partners intended to scale their algorithms to tackle increasingly complex molecular systems. Their approach was designed to be adaptable to growing qubit counts and improving coherence times, allowing them to address more industrially relevant molecules as the technology matured.

**Integration with R&D Workflows**. A key goal was to develop quantum computing tools that Covestro''s R&D team could integrate into their regular workflows. This would involve creating user-friendly interfaces and connecting quantum capabilities with existing computational chemistry infrastructure to make quantum computing accessible to researchers without specialized quantum expertise.

**Industry Standard Setting**. As a pioneering partnership in quantum computing for materials science, QC Ware and Covestro positioned themselves to help establish industry standards and best practices in this emerging field. Their research papers and implementations could guide other companies exploring quantum applications in chemistry and materials science.


', '{}', '{"QC Ware"}', NULL, '{}', true, NULL, '2025-05-05 10:14:47.3844+00', '2025-07-22 13:31:20.549264+00', '[^1]:QC Ware. (2022). "Quantum Algorithms for Materials Science."
[^2]:Covestro Digital R&D. (2022). "Quantum Computing for Polymer Innovation."
[^3]:New Journal of Physics. (2021). "Local, Expressive, Quantum-Number-Preserving VQE Ansatze for Fermionic Systems."
arXiv. (2021). 
[^4]:"Analytical Ground- and Excited-State Gradients for Molecular Electronic Structure Theory from Hybrid Quantum/Classical Methods."', '[{"url": "https://www.prnewswire.com/news-releases/covestro-and-qc-ware-partner-to-develop-quantum-algorithms-for-materials-rd-301562290.html", "label": "Covestro and QC Ware Partner to Develop Quantum Algorithms for Materials R&D", "order": 1}]', '{"QC Ware Platform","QC Ware Forge"}', 2022),
	('6560ef0b-87f5-4203-8826-23202351903e', 'quantinuum-google-deepmind-circuit-optimisation', 'Quantinuum and Google search for quantum circuit optimization', 'A collaboration between Quantinuum and Google DeepMind to explore AI-enhanced quantum circuit optimization.', 'Quantinuum and Google DeepMind announced a strategic partnership in 2024 to explore the intersection of quantum computing and artificial intelligence, focusing on developing quantum algorithms for machine learning applications. The partnership focused on using AI to tackle one of quantum computing''s most pressing challenges by optimizing quantum circuits to minimize the number of resource-intensive T-gates required for universal quantum computation.

As the overall state of quantum computing technology matures, its potential to work alongside machine learning and AI applications has become increasingly attractive. Quantinuum, formed from the merger of Honeywell Quantum Solutions and Cambridge Quantum Computing, brings world-class trapped-ion quantum hardware and software capabilities to the partnership. Google DeepMind, known for its groundbreaking AI research including AlphaGo and AlphaFold, contributes deep expertise in neural networks, reinforcement learning, and complex problem-solving. 

The collaboration aimed to explore how quantum computing can enhance AI capabilities, particularly in areas where classical computers face computational limitations. Such a partnership was well placed to work on developing hybrid quantum-classical algorithms that could use the strengths of both computing paradigms, potentially unlocking new possibilities in drug discovery, materials science, and optimization problems that are intractable for classical systems alone.

## Challenge
The primary challenge addressed by this partnership is the fundamental limitation of classical computing in handling certain complex AI and machine learning tasks. As AI models grow more sophisticated, they require exponentially more computational resources, leading to unsustainable energy consumption and training times. Specifically, problems involving high-dimensional optimization, quantum system simulation, and certain pattern recognition tasks face computational barriers that classical computers cannot efficiently overcome. 

On the quantum side of things, there''s a similar challenge where quantum computers continue to advance in capabilities, with quantum circuit optimisation emerging as a critical bottleneck in the development of practical quantum applications. In particular, the T-gate (or π/8 gate) presented a significant challenge. These gates are essential for universal quantum computation but are expensive to implement in terms of physical resources and error rates. T-gates are fundamental building blocks for implementing complex quantum algorithms, yet they''re significantly more resource-intensive than other quantum gates. In fault-tolerant quantum computing architectures, T-gates typically require specialised techniques like magic state distillation, which consumes substantial physical resources and introduces additional complexity.

The manual optimization of quantum circuits to minimize T-gate count was a labor-intensive process that required deep expertise in quantum computing and often resulted in suboptimal solutions. As quantum processors scaled to handle more complex problems, the need for automated, efficient approaches to circuit optimization became increasingly urgent.

## Solution
The partnership developed a comprehensive quantum-classical hybrid approach to machine learning, called AlphaTensor-Quantum, which applied advanced AI techniques to the problem of quantum circuit optimization. This solution represented the first application of Google DeepMind''s AlphaTensor AI system to the specific problem of T-gate reduction in quantum circuits. 

The core of the solution was an AI model specifically designed to analyse quantum circuits and identify opportunities for reducing T-gate counts while preserving the overall functionality of the circuit. The model was built upon Google DeepMind''s expertise in reinforcement learning and tensor decomposition, adapted to the unique requirements of quantum circuit optimization.

The solution centres on three key innovations. First, the development of quantum feature maps that can encode classical data into quantum states, enabling the exploration of feature spaces that are computationally prohibitive for classical machines. Second, the creation of variational quantum algorithms optimised for machine learning tasks, including quantum neural networks that can learn patterns in data more efficiently than their classical counterparts for specific problem classes. Third, the implementation of quantum-enhanced reinforcement learning algorithms that can explore solution spaces more effectively. 

The team also developed a new software framework that seamlessly integrates quantum subroutines into classical AI workflows, allowing researchers to identify and isolate components of AI algorithms that would benefit most from quantum acceleration. This framework includes automated tools for quantum circuit optimization and error mitigation strategies tailored to machine learning applications, ensuring that near-term noisy quantum devices can provide meaningful advantages despite their limitations.

With these approaches put to practice, AlphaTensor-Quantum could automatically search through vast spaces of potential circuit configurations to find optimisations that would be difficult or impossible for human designers to discover through manual analysis. This automated approach allowed for the systematic exploration of optimization opportunities across diverse types of quantum circuits.

## Implementation
The implementation phase involved a carefully orchestrated integration of Quantinuum''s quantum hardware with Google DeepMind''s AI infrastructure. The team began by identifying specific use cases where quantum advantage was most likely to manifest, focusing initially on quantum chemistry simulations for drug discovery and combinatorial optimization problems relevant to logistics and resource allocation. 

The project used Quantinuum''s H-Series trapped-ion quantum computers, which offer high-fidelity gates and all-to-all connectivity, crucial for implementing complex quantum machine learning circuits. A dedicated team of quantum algorithm developers and AI researchers worked collaboratively to port selected DeepMind algorithms to the hybrid quantum-classical framework. This included extensive benchmarking against classical baselines, with careful attention to fair comparisons that account for the overhead of quantum-classical communication. The research team included experts from both organisations: Francisco J. R. Ruiz, Johannes Bausch, Matej Balog, and others from Google DeepMind, along with Tuomas Laakkonen, Konstantinos Meichanetzidis, and Nathan Fitzpatrick from Quantinuum.

The team also developed new quantum error mitigation techniques specifically tailored to machine learning applications, recognising that ML algorithms often have different error tolerance characteristics than traditional quantum algorithms. Regular iterations between algorithm design and hardware testing allowed for rapid refinement of approaches, with findings fed back into both hardware development at Quantinuum and algorithm research at DeepMind.

## Results & Business Impact

The partnership yielded significant results across multiple dimensions. In drug discovery applications, the quantum-enhanced algorithms demonstrated a 40% improvement in predicting molecular properties for certain classes of compounds compared to classical methods, with particular success in modeling protein-drug interactions involving quantum mechanical effects. For optimization problems, the hybrid algorithms showed polynomial speedups for specific instances of vehicle routing and supply chain optimization, leading to potential cost savings of millions of dollars for large-scale logistics operations.

The AlphaTensor-Quantum method achieved remarkable performance in reducing T-gate counts across various types of quantum circuits. In standard benchmark sets, the approach reduced costs by 37%, and by 47% in circuits relevant for elliptic curve cryptography. The AI system not only matched but in many cases surpassed human expertise in minimizing T-count for quantum simulations. This was particularly notable in applications like quantum chemistry, where the model matched the best human-designed solutions while requiring far less manual intervention.

The collaboration also produced several breakthrough research papers, advancing the theoretical understanding of quantum machine learning and establishing new benchmarks for the field. From a business perspective, the partnership positioned both companies at the forefront of the quantum AI revolution, attracting significant interest from pharmaceutical companies, financial institutions, and technology firms seeking early access to these capabilities. The success led to the establishment of a joint quantum AI research lab and the launch of a cloud-based platform allowing enterprise customers to experiment with quantum-enhanced AI algorithms. This has opened new revenue streams and strengthened both companies'' positions in the rapidly growing quantum computing market, estimated to reach $65 billion by 2030.

By automating the complex process of quantum circuit optimization, the collaboration also made advanced optimization techniques accessible to a broader range of quantum software developers. This reduced the need for specialised expertise in circuit design, potentially accelerating the development of practical quantum applications. The cost reduction achieved through this approach has significant commercial implications for quantum computing. By reducing the resource requirements for quantum algorithms, the solution could help bring practical quantum advantage closer to reality, making quantum computing more economically viable for a range of applications.

## Future Directions

Looking ahead, the partnership plans to expand its focus to include more ambitious applications of quantum AI, including quantum advantage demonstrations in natural language processing and computer vision tasks. Beyond T-gate optimization, the partners identified opportunities to apply AI approaches to other aspects of quantum computing, including error mitigation, circuit compilation, and algorithm design. These applications could potentially address multiple bottlenecks in quantum computing development. The roadmap includes scaling to larger quantum processors as Quantinuum''s hardware capabilities grow, with plans to utilise systems with over 1000 logical qubits by 2026. 

The collaboration will also explore the development of quantum foundation models that could serve as the basis for a new generation of AI systems. Additionally, the partnership aims to democratise access to quantum AI through educational initiatives and open-source tools, fostering a broader ecosystem of researchers and developers. Future research directions include investigating the potential of quantum computing to enable more interpretable AI models and exploring applications in climate modeling and materials discovery for sustainable technologies.', '{"Google DeepMind AI"}', '{Quantinuum}', NULL, '{"Quantinuum H-Series"}', true, NULL, '2025-04-30 11:33:59.376503+00', '2025-07-22 14:54:10.090638+00', '[^1]: Quantinuum and Google DeepMind. (2024). "AlphaTensor-Quantum: AI-Enhanced Optimization of T Gates in Quantum Circuits."
[^2]: Nature Machine Intelligence. (2024). "AI-Driven Quantum Circuit Optimization."
[^3]: arXiv. (2024). "Minimizing T Count in Quantum Circuits Using AlphaTensor-Quantum."
[^4]: Quantinuum. (2024). "The Symbiotic Relationship Between Quantum Computing and AI."
', '[]', '{AlphaTensor-Quantum}', 2024),
	('ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', 'amazon-aws-braket-bmw-automotive-applications', 'Amazon AWS Braket and BMW explore automotive solutions', 'A partnership to run a series of quantum computing innovation challenges for automotive applications.', 'In 2021, the BMW Group, in collaboration with Amazon Web Services (AWS), launched the BMW Group Quantum Computing Challenge, a global open innovation initiative focused on discovering potential quantum computing solutions for real-world automotive industry use cases . Amazon Web Services This partnership represented one of the first major quantum computing innovation challenges focused entirely on industrial automotive applications, demonstrating both companies'' commitment to exploring the potential of quantum technologies in transforming automotive design, manufacturing, and operations.

## The Automotive Industry Challenge

The automotive industry faces numerous complex computational challenges that have historically been difficult or impossible to solve with classical computing methods. These include optimizing pre-production vehicle configuration, accurately simulating material deformation in manufacturing processes, determining optimal sensor placement in vehicles, and improving machine learning for automated quality assessment.

These challenges are characterised by their combinatorial complexity and the need to consider numerous variables and constraints simultaneously. For example, pre-production vehicle testing requires managing complex dependencies between different test requirements while minimizing the number of vehicles built. Similarly, material deformation simulation involves solving complex non-linear partial differential equations that are computationally intensive.

The automotive industry''s increasing focus on sustainability, efficiency, and autonomous capabilities has further heightened the need for computational approaches that can address these complex problems more effectively than traditional methods.

## Quantum Solution

Rather than implementing a single quantum solution, BMW and AWS took an innovative approach by creating a global challenge to identify multiple potential quantum applications across different aspects of automotive operations. The challenge focused on four specific use cases:

- Pre-production Vehicle Configuration: Optimizing the testing process to perform the maximum number of required tests on a minimum number of vehicles while accounting for build-ability and scheduling constraints.

- Material Deformation Simulation: Developing quantum algorithmic approaches to model and numerically simulate material deformation for predicting material properties in the pre-production phase of vehicle component manufacturing.

- Vehicle Sensor Placement: Optimizing the positions of sensors to maximise coverage while minimizing the total number of required sensors, critical for safety and convenience in modern vehicles.

- Machine Learning for Automated Quality Assessment: Using quantum machine learning techniques to improve the assessment of vehicle parts for defects such as cracks and scratches caused by the metal-forming process.

To support the challenge participants, AWS provided access to Amazon Braket, its fully managed quantum computing service. This gave teams access to quantum hardware from multiple providers including D-Wave, IonQ, and Rigetti, as well as quantum circuit simulators . Amazon Web Services AWS also offered credits for participants to use these services, removing financial barriers to experimentation with quantum approaches.

## Implementation

The BMW-AWS Quantum Computing Challenge was organised into two rounds. In the first round, participants submitted detailed concept proposals for one or more of the four use cases. Teams with the top submissions in each use case advanced to the second round, where they were tasked with implementing and demonstrating their solutions.

The implementation phase involved teams from around the world working with the Amazon Quantum Solutions Lab Professional Services team and BMW Group experts to refine their approaches and test them on real automotive industry data. The AWS team provided technical support and guidance on using quantum computing resources effectively.

Throughout the challenge, BMW and AWS emphasised the importance of practical solutions that could potentially be implemented in real-world automotive applications, even as quantum hardware continues to mature. This meant that many of the approaches were hybrid quantum-classical solutions that could deliver value in the near term while positioning BMW to take advantage of quantum computing advancements in the future.

## Results and Business Impact

The challenge produced innovative solutions across all four use cases, with winning teams announced at the Q2B quantum computing industry conference in December 2021. The winning solutions included a range of different approaches and ideas.

For pre-production vehicle configuration, a team from Technical University of Munich and BMW Group IT developed a solution using quantum annealing that outperformed the classical state-of-the-art in certain scenarios. The material deformation simulation challenge was won by quantum computing startup Qu&Co, which provided a detailed, NISQ-ready solution strategy based on differentiable quantum circuits with promising benchmark comparisons to exact results.

Accenture''s team won the sensor placement challenge with a holistic workflow from user input to final result, including a framework with plugins for future quantum methods. For machine learning quality assessment, a team from Leibniz Supercomputing Centre developed a hybrid quantum-classical machine learning approach that demonstrated superior performance for small datasets.

Dr. Peter Lehnert, Vice President BMW Group Research and New Technologies Digital Car, emphasised the significance of these results, stating that "future technologies such as quantum computing have the potential to make our products more desirable and sustainable".

The business impact extended beyond the specific solutions developed during the challenge. The initiative established BMW as a leader in exploring quantum computing applications in the automotive industry, built relationships with key quantum computing experts and institutions, and created a foundation for ongoing quantum computing innovation within BMW''s operations.

## Future Directions

Building on the success of the initial challenge, BMW and AWS have continued their quantum computing collaboration. In 2023, BMW hosted the "Quantum Computing for Automotive Challenges" event, which brought together experts to discuss further applications and advancements in quantum technologies for the automotive sector . Amazon Web Services

More recently, BMW joined forces with Airbus and AWS to launch the "Airbus-BMW Group Quantum Mobility Quest" in 2024, expanding the scope to include aviation applications and offering larger prizes to encourage even more innovative quantum computing solutions . Amazon Web Services

The ongoing partnership between BMW and AWS aims to bridge the gap between scientific exploration and practical industrial applications of quantum computing. As quantum hardware continues to advance, BMW is positioning itself to quickly adopt these technologies to address its most challenging computational problems, potentially leading to more efficient operations, improved vehicle designs, and more sustainable manufacturing processes.


', '{BMW}', '{Amazon}', NULL, '{"D-Wave Advantage","IonQ Aria","Rigetti Aspen"}', true, NULL, '2025-05-05 10:30:34.753438+00', '2025-07-22 06:28:59.613074+00', '[^1]: BMW Group. (2021). "BMW Group Quantum Computing Challenge: Final Report and Results."
[^2]: AWS Quantum Technologies Blog. (2021). "Exploring Industrial Use Cases in the BMW Quantum Computing Challenge."
[^3]: AWS Quantum Solutions Lab. (2021). "Quantum Computing Applications in Automotive Design and Manufacturing."
[^4]: BMW Group Innovation Lab. (2023). "Quantum Computing Roadmap for Automotive Applications."', '[{"url": "https://www.press.bmwgroup.com/global/article/detail/T0362463EN/bmw-group-quantum-computing-challenge:-the-winners-have-been-decided", "label": "BMW Group Quantum Computing Challenge: the winners have been decided.", "order": 1}]', '{"Amazon Braket"}', 2021),
	('9e039b07-ad28-4612-abf8-718d89bb4cc2', 'classiq-rolls-royce-computational-fluid-dynamics', 'Classiq and Rolls-Royce explore aerospace applications', 'Developing quantum algorithms for computational fluid dynamics that combine classical and quantum computing techniques for aerospace applications.', 'Rolls-Royce, a global leader in propulsion systems and power solutions for aerospace, defence, and energy applications, established a strategic partnership with Classiq, an Israeli quantum software company specialising in quantum algorithm design and optimization. This collaboration, announced in March 2022, focuses on applying quantum computing to solve complex aerospace engineering challenges, particularly in computational fluid dynamics, materials science, and design optimization. By combining Rolls-Royce''s deep aerospace engineering expertise with Classiq''s quantum algorithm development platform, the partnership aims to enhance engine design processes, improve efficiency, and accelerate development cycles for next-generation propulsion systems.

## Problem Statement

Aerospace engineering involves extraordinarily complex computational challenges that impact performance, efficiency, and development timelines. Traditional computational approaches for modeling fluid dynamics, structural mechanics, and thermodynamics in jet engines require significant simplifications that compromise accuracy or demand enormous computational resources that extend simulation timelines. These computational limitations constrain the design space exploration process, potentially leaving innovative solutions undiscovered.

For Rolls-Royce, whose business depends on developing increasingly efficient and sustainable propulsion systems, enhancing computational capabilities represented a strategic priority with direct implications for product performance and market position. The company identified several specific challenges where quantum computational approaches might offer advantages: optimizing aerodynamic designs through enhanced computational fluid dynamics (CFD), accelerating materials discovery for high-temperature applications, and improving system-level optimization across multiple performance parameters.

The computational complexity stems from the multiphysics nature of aerospace propulsion, where fluid dynamics, thermodynamics, structural mechanics, and materials science intersect. Classical simulation approaches struggle with the high-dimensional parameter spaces and non-linear relationships characteristic of these systems. For comprehensive engine design optimization, the computational requirements grow exponentially with each additional parameter or physical domain included in the simulation.

The business implications of these computational constraints are substantial. Extended development cycles increase time-to-market and development costs for new engine programs. Limited simulation fidelity necessitates more extensive physical testing, adding expense and further extending timelines. Constrained design space exploration may result in suboptimal performance characteristics, directly impacting fuel efficiency, emissions, and operating economics, which are all critical competitive factors in the aerospace market. With increasing industry focus on sustainability and emissions reduction, computational limitations that constrain efficiency optimization represent both business and environmental challenges.

### Quantum Approach

The Rolls-Royce and Classiq collaboration implemented a sophisticated quantum computational strategy tailored to aerospace engineering challenges. This approach leverages Classiq''s quantum algorithm design platform, which enables engineers to create quantum circuits at a higher level of abstraction without requiring deep quantum physics expertise, another critical advantage for practical industrial implementation.

The technical implementation focuses on three complementary applications: computational fluid dynamics enhancement, materials property simulation, and multi-objective system optimization. For CFD applications, the team developed quantum algorithms that could potentially simulate fluid flows around engine components with greater fidelity than classical methods. These implementations aim to capture turbulence effects and boundary layer behaviours that significantly impact engine performance but are computationally expensive to model accurately with classical approaches.

In materials science applications, the partnership created quantum computational approaches for simulating properties of high-temperature materials used in critical engine components. These methods address the challenge of modeling quantum mechanical interactions that determine material characteristics like thermal stability, creep resistance, and oxidation behaviour. All of which are properties essential for engine performance and durability in extreme operating environments.

For system-level optimization, the team implemented quantum algorithms designed to navigate the complex multi-objective design spaces of aerospace propulsion systems. These approaches seek to identify design configurations that simultaneously optimise multiple competing objectives like thrust, efficiency, weight, and emissions. This is a challenging optimization problem where quantum computational advantages might be particularly valuable.

Given current quantum hardware limitations, the partnership employed a pragmatic implementation strategy focusing on algorithm development and testing on quantum simulators while establishing pathways for hardware implementation as capabilities advance. This forward-looking approach enables meaningful progress on algorithm design and validation while preparing for deployment on increasingly capable quantum processors.

A key innovation in their approach involves Classiq''s quantum algorithm synthesis platform, which automatically generates optimised quantum circuits from high-level functional descriptions. This capability allows Rolls-Royce engineers to express aerospace problems in familiar terms while the platform handles the complex translation to quantum circuits. The resulting implementation efficiency and accessibility significantly accelerate the development process for quantum applications in aerospace engineering.

## Results and Business Impact

The collaboration has yielded promising early outcomes demonstrating quantum computing''s potential for aerospace applications. Initial algorithm implementations showed that quantum approaches could potentially address key computational bottlenecks in aerospace simulations, particularly for problems involving quantum mechanical effects in materials and high-dimensional optimization challenges in system design.

While full-scale quantum advantage for comprehensive engine simulations remains a future goal dependent on hardware advances, the partnership has established viable algorithmic approaches for specific computational components where quantum methods might offer near-term advantages. These targeted implementations focus on well-defined subproblems where quantum computational benefits might emerge earliest, providing incremental value while building toward more comprehensive solutions.

The collaboration has successfully developed and tested quantum algorithms for materials property simulation, demonstrating potential advantages in modeling electronic structures of complex alloys used in high-temperature engine components. These enhanced simulation capabilities could accelerate materials discovery and qualification, a critical pathway to improved engine performance and durability.

For Rolls-Royce, these technical achievements translate into valuable strategic positioning and capability development. The enhanced computational approaches support the company''s broader digital transformation initiative, which aims to accelerate development cycles and improve product performance through advanced simulation and design optimization. The quantum algorithms developed through this partnership represent intellectual assets that will appreciate in value as quantum hardware capabilities expand.

Beyond immediate technical outcomes, the collaboration positions Rolls-Royce at the forefront of quantum computing applications in aerospace. This leadership in computational engineering strengthens the company''s innovation profile and creates opportunities for continued competitive differentiation as quantum technology matures. The expertise developed through this partnership, particularly in translating complex engineering problems into quantum computational frameworks, represents a strategic capability that will become increasingly valuable across Rolls-Royce''s business.

## Future Directions

Building on their initial progress, Rolls-Royce and Classiq have outlined several promising directions for continued development. Algorithm refinement remains a primary focus, with ongoing work to improve both the effectiveness and computational efficiency of quantum approaches for aerospace applications. These enhancements aim to expand the range of engineering problems that can be effectively addressed while reducing the quantum resources required for implementation.

The partners are extending their quantum computational methods to additional aspects of aerospace engineering, including structural analysis, thermal management, and noise reduction. This expansion follows a strategic roadmap that aligns growing quantum capabilities with increasingly sophisticated engineering challenges across Rolls-Royce''s product portfolio.

Integration with existing engineering workflows represents another key development area. The collaboration is creating seamless connections between quantum-enhanced simulations and Rolls-Royce''s established design and analysis platforms, enabling engineers to leverage quantum computational advantages within familiar environments. These integration efforts focus on creating user-friendly interfaces that deliver quantum benefits without requiring aerospace engineers to become quantum computing specialists.

As quantum hardware advances, the team continuously evaluates opportunities to implement their algorithms on increasingly capable quantum processors, moving from simulation to actual quantum execution for specific subproblems where near-term advantages might emerge. This progressive implementation strategy ensures that aerospace applications can capitalise on quantum computational capabilities as they become available.

The partnership is also exploring quantum machine learning techniques that could enhance pattern recognition in complex simulation data, potentially identifying non-obvious relationships between design parameters and performance outcomes. These hybrid approaches could further accelerate the design optimization process by efficiently navigating vast design spaces based on limited simulation data.

## Conclusion

The Rolls-Royce and Classiq partnership demonstrates how forward-thinking aerospace companies can effectively engage with quantum computing today, developing expertise, establishing methodologies, and creating algorithmic frameworks that position them to capitalise on each advancement in quantum hardware. Rather than waiting for fault-tolerant quantum computers, this pragmatic strategy focuses on algorithm development and capability building that will deliver increasing value as quantum technology matures.

The collaboration illustrates the importance of abstraction layers and domain-specific tools in making quantum computing accessible to industry experts. By enabling aerospace engineers to express problems in familiar terms while automatically handling the complex translation to quantum circuits, Classiq''s platform significantly accelerates the development process for quantum applications in aerospace engineering. This approach bridges the knowledge gap between quantum physics and aerospace engineering, a critical factor for practical industrial adoption.

For the aerospace industry broadly, this case study highlights quantum computing''s potential to transform engineering simulation and optimization by addressing computational complexity barriers that fundamentally limit traditional approaches. The ability to more accurately model multiphysics systems, simulate quantum mechanical properties of materials, and navigate complex design spaces could significantly enhance both product performance and development efficiency, supporting both business objectives and sustainability goals.

As quantum computing continues its rapid evolution, aerospace companies that invest in quantum capabilities today may gain substantial competitive advantages in design quality, development speed, and innovation capacity. The Rolls-Royce and Classiq collaboration exemplifies how strategic partnerships between industry leaders and quantum technology specialists can accelerate progress toward practical quantum applications with significant business impact.
', '{Rolls-Royce}', '{Classiq}', NULL, '{"Not Applicable"}', true, '2025-05-08 12:43:51.158+00', '2025-04-24 15:38:34.805786+00', '2025-07-22 06:31:03.196781+00', '[^1]: Rolls-Royce. (2022). Rolls-Royce and Classiq collaborate on quantum computing for aerospace applications. [Press Release]. Retrieved from https://www.rolls-royce.com/media/press-releases/2022/21-03-2022-rr-and-classiq-collaborate-on-quantum-computing.aspx
    
[^2]: Classiq. (2022). Classiq and Rolls-Royce announce strategic partnership to implement quantum algorithms for aerospace engineering. [Press Release]. Retrieved from https://www.classiq.io/company/news/classiq-and-rolls-royce-announce-strategic-partnership
    
[^3]: Motta, M., Sun, C., Tan, A.T., O''Rourke, M.J., Ye, E., Minnich, A.J., Brandão, F.G., & Chan, G.K. (2020). Determining eigenstates and thermal states on a quantum computer using quantum imaginary time evolution. Nature Physics, 16(2), 205-210. https://doi.org/10.1038/s41567-019-0704-4
    
[^4]: Bauer, B., Bravyi, S., Motta, M., & Chan, G.K. (2020). Quantum algorithms for quantum chemistry and quantum materials science. Chemical Reviews, 120(22), 12685-12717. https://doi.org/10.1021/acs.chemrev.9b00829
    
[^5]: Aerospace Technology Institute. (2022). Quantum Computing Applications in Aerospace: Implementation Roadmap and Industry Assessment. ATI Technical Report.
    
[^6]: Quantum Economic Development Consortium. (2022). Quantum Computing Applications in Aerospace and Defense: Industry Survey and Market Outlook. QED-C Industry Report.
    
[^7]: Royal Aeronautical Society. (2022). Advanced Computing Technologies in Aerospace Engineering: Quantum Computing Implementation Case Studies. RAeS Technical Assessment.
    
[^8]: International Council for Aeronautical Sciences. (2023). Quantum Technologies in Aircraft Design and Manufacturing: Technical Assessment and Implementation Guidelines. ICAS Technical Paper.', '[{"url": "https://www.classiq.io/insights/rolls-royce-and-classiq-quantum-algorithm-design-for-computational-fluid-dynamics-collaboration", "label": "Rolls-Royce and Classiq quantum algorithm design for computational fluid dynamics collaboration", "order": 1}]', '{"Classiq Platform"}', 2022),
	('315cc55f-e58f-4d1e-8a64-f765bfd37ba2', 'quantum-brilliance-pawsey-supercomputing-qdk', 'Quantum Brilliance and Pawsey Supercomputing Centre', 'Partnering to deploy the world''s first diamond-based quantum accelerator in a supercomputing environment, creating Australia''s first quantum-supercomputing hub.', '## Overview

Quantum Brilliance, an Australian-German quantum computing hardware company, established a pioneering partnership with the Pawsey Supercomputing Centre to deploy the world''s first diamond-based quantum accelerator in a supercomputing environment. This collaboration, announced in 2021, marked a significant milestone in quantum computing integration into high-performance computing (HPC) infrastructure. Unlike most quantum computing approaches that require extreme cooling and specialized facilities, Quantum Brilliance''s diamond quantum accelerators operate at room temperature, opening new possibilities for practical quantum computing implementations. The partnership created Australia''s first quantum-supercomputing hub for research applications in computational chemistry, materials science, and logistics optimization.

## Problem Statement

Traditional quantum computing systems face significant practical deployment challenges due to their demanding operational requirements. Most quantum processors require cooling to near absolute zero temperatures, extensive shielding from environmental interference, and specialized infrastructure that limits their integration with existing computing systems. These constraints create substantial barriers to practical quantum computing applications, particularly in environments where seamless integration with classical computing resources is essential.

For Pawsey Supercomputing Centre, a world-class supercomputing facility supporting Australian research, these limitations presented a challenge to incorporating quantum capabilities into their existing high-performance computing infrastructure. Researchers needed quantum computing resources that could work alongside classical supercomputing systems without requiring separate specialized facilities or creating operational silos between computing modalities.

Quantum Brilliance''s diamond-based quantum computing technology offered a potential solution through its unique operating characteristics. By utilizing nitrogen-vacancy (NV) centers in synthetic diamond as qubits, their systems can operate at room temperature and in less controlled environments than competing quantum technologies. This approach promised greater practicality for integration with conventional computing infrastructure while maintaining quantum computational capabilities.

## Quantum Approach

The Quantum Brilliance-Pawsey collaboration implemented a groundbreaking approach to quantum-classical integration. At the core of the implementation was Quantum Brilliance''s diamond quantum accelerator, which leverages quantum mechanical properties of nitrogen-vacancy centers in synthetic diamond. These NV centers act as qubits—the fundamental units of quantum information—but unlike superconducting or trapped-ion qubits, they can maintain quantum coherence at room temperature and with less susceptibility to environmental noise.

The technical implementation focused on creating a hybrid quantum-classical computing environment where researchers could seamlessly access both quantum and supercomputing resources. This integration required the development of specialized software interfaces, scheduling systems, and programming frameworks that allow computational workflows to efficiently utilize both quantum and classical processing elements.

The partnership developed a comprehensive integration architecture that addressed several key challenges. This included creating a unified programming environment that allows researchers to develop algorithms leveraging both quantum and classical resources without requiring deep expertise in quantum computing. The system implemented efficient data transfer mechanisms between quantum and classical components, minimizing latency in hybrid computational workflows.

Resource management systems were adapted to incorporate quantum accelerators into the supercomputing center''s allocation and scheduling framework, allowing researchers to request quantum computing resources alongside traditional HPC allocations. This integration extended to monitoring and performance analysis tools, providing researchers with comprehensive visibility into both quantum and classical aspects of their computations.

## Results and Business Impact

The collaboration has yielded several significant outcomes that demonstrate the potential of integrated quantum-classical computing. The successful deployment of a diamond quantum accelerator in a supercomputing environment established an important proof-of-concept for this integration approach, demonstrating that certain types of quantum computing technology can coexist with conventional HPC infrastructure without requiring separate specialized facilities.

The partnership created Australia''s first quantum-supercomputing hub, providing researchers with unprecedented access to hybrid quantum-classical computational resources. This new capability has enabled research projects across multiple domains, including computational chemistry, materials science, and optimization problems in logistics and transportation planning.

Early research projects have demonstrated the potential advantages of hybrid quantum-classical approaches for specific computational tasks. While current diamond quantum accelerators have limited qubit counts, researchers have successfully implemented algorithms that distribute workloads between quantum and classical processors based on their respective strengths, achieving performance improvements for certain problem classes compared to purely classical approaches.

For Pawsey Supercomputing Centre, the collaboration has strengthened its position as a leading-edge computing facility, expanding its capabilities beyond traditional HPC to include quantum computing resources. This enhanced service offering benefits the Australian research community and attracts international collaborations, raising the center''s global profile in advanced computing.

For Quantum Brilliance, the partnership has provided a valuable real-world deployment environment for their technology, generating practical insights that inform ongoing hardware and software development. The implementation at Pawsey serves as an important reference case demonstrating the practicality of their room-temperature quantum computing approach, potentially accelerating adoption across other supercomputing facilities and commercial environments.

Beyond the immediate technical outcomes, the collaboration has advanced understanding of practical quantum-classical integration challenges and solutions. The knowledge developed through this partnership contributes to the broader field of hybrid quantum computing, establishing frameworks and methodologies that can inform future integration efforts across the industry.

## Future Directions

Building on their initial success, Quantum Brilliance and Pawsey Supercomputing Centre have outlined several promising directions for future development. Hardware advancement remains a key priority, with ongoing work to increase qubit counts, improve coherence times, and enhance gate fidelities in diamond quantum accelerators. These improvements will expand the range and complexity of problems that can be meaningfully addressed with quantum acceleration.

Software ecosystem development continues with the creation of more sophisticated programming tools, optimizing compilers, and algorithm libraries specifically designed for hybrid quantum-classical computation. These developments aim to reduce the expertise barrier for researchers, making quantum computational resources more accessible to domain scientists without requiring deep quantum computing knowledge.

The partners are expanding application development across multiple domains, including quantum chemistry simulations, materials discovery, optimization problems, and machine learning applications. This work focuses on identifying problem classes where current and near-term quantum accelerators can provide meaningful advantages when integrated with classical supercomputing resources.

As the technology matures, the collaboration plans to scale deployment across Pawsey''s infrastructure, integrating additional quantum accelerators and creating a more distributed quantum-classical computing environment. This expansion will increase availability of quantum resources to researchers while providing insights into scaling challenges for room-temperature quantum computing.

The partners are also developing comprehensive benchmarking methodologies for hybrid quantum-classical computations. These frameworks will provide objective measures of performance and advantages compared to traditional computing approaches, helping to identify the most promising application areas for current and near-term quantum acceleration.

## Conclusion

The Quantum Brilliance-Pawsey Supercomputing Centre partnership demonstrates a practical approach to integrating quantum computing with existing high-performance computing infrastructure. While current diamond quantum accelerators represent early-stage technology with limited qubit counts, this collaboration has established viable pathways for hybrid quantum-classical computing that deliver incremental benefits while building capabilities for greater future impact.

The strategic approach taken by these organizations illustrates how research computing facilities can effectively engage with quantum computing today—developing expertise, establishing integration methodologies, and creating computational frameworks that position them to capitalize on each advancement in quantum hardware. Rather than waiting for fault-tolerant quantum computers, this pragmatic strategy delivers near-term value while building capabilities for transformative future advantages.

For the broader computing industry, this case study highlights the potential of room-temperature quantum computing technologies to overcome some of the deployment barriers that have limited practical quantum computing applications. The ability to integrate quantum accelerators into conventional computing environments without specialized infrastructure could significantly accelerate the adoption of quantum computing across scientific and commercial applications.

As quantum computing continues its rapid evolution, forward-thinking research organizations that invest in quantum-classical integration capabilities today may gain substantial advantages in computational capabilities, research outcomes, and institutional expertise. The Quantum Brilliance-Pawsey collaboration exemplifies how partnerships between quantum technology developers and advanced computing facilities can accelerate progress toward practical quantum applications with significant research and commercial impact.

', '{"Pawsey Supercomputing Research Centre"}', '{"Quantum Brilliance"}', NULL, '{"Quantum Development Kit (QDK)"}', true, NULL, '2025-05-05 09:57:52.71623+00', '2025-07-17 11:25:07.966739+00', '[^1]: Pawsey Supercomputing Centre. (2021). Pawsey and Quantum Brilliance Join Forces to Advance Australian Quantum Computing. [Press Release]. Retrieved from https://pawsey.org.au/quantum-brilliance-quantum-computing/
    
[^2]: Quantum Brilliance. (2021). Quantum Brilliance Deploys World''s First Diamond Quantum Accelerator at Pawsey Supercomputing Centre. [Press Release]. Retrieved from https://quantumbrilliance.com/news/pawsey-deployment

[^3]: Bradshaw, M., Loke, T., Greentree, A.D., & Prawer, S. (2019). Quantum computing with color centers in diamond. Journal of Physics: Condensed Matter, 31(33), 334001. https://doi.org/10.1088/1361-648X/ab1dec
    
[^4]: Doherty, M.W., Manson, N.B., Delaney, P., Jelezko, F., Wrachtrup, J., & Hollenberg, L.C. (2013). The nitrogen-vacancy colour centre in diamond. Physics Reports, 528(1), 1-45. https://doi.org/10.1016/j.physrep.2013.02.001
    
[^5]: Australian Research Council. (2022). Quantum Computing Applications in Materials Research. ARC Centre of Excellence Report.
    
[^6]: National Computational Infrastructure Australia. (2022). Hybrid Quantum-Classical Computing: Integration Challenges and Opportunities. NCI Technical Report.
    
[^7]: Quantum Technologies Expert Group. (2023). Room Temperature Quantum Computing: Assessment and Outlook. Industry White Paper.
    
[^8]: Department of Industry, Science and Resources, Australian Government. (2023). Australia''s Quantum Technology Roadmap: Research Infrastructure and Applications. Government Report.', '[{"url": "https://pawsey.org.au/pioneering-room-temperature-quantum-computing-in-wa/", "label": "Pioneering room-temperature Quantum Computing in WA", "order": 1}, {"url": "https://quantumbrilliance.com", "label": "Quantum Brilliance", "order": 2}]', '{"Qristal SDK"}', 2025),
	('bdc1d580-4643-4156-a148-45e63cb44342', 'sandboxaq-deloitte-cybersecurity', 'SandboxAQ and Deloitte on Cybersecurity', 'Partnering to explore quantum-ready cybersecurity and AI solutions for the enterprise.', '## Summary

In May 2022, Sandbox AQ, an enterprise SaaS company delivering solutions at the intersection of AI and quantum technologies, formed a strategic alliance with Deloitte to help organizations prepare for the coming quantum era. This partnership positioned Deloitte as one of Sandbox AQ''s Platinum Global Systems Integrators, focused on providing quantum-readiness solutions to organisations preparing for both the opportunities and disruptions that mature quantum technologies would bring.

## The Quantum Readiness Challenge

Organizations across industries face significant challenges in preparing for the quantum computing era. While commercial quantum computing hardware was still years away from widespread availability, the need to prepare for quantum disruption became increasingly urgent. In particular, many companies relied on encryption technologies vulnerable to quantum computing attacks, creating a pressing need to transition to quantum-resistant cryptographic algorithms.

Businesses operating in highly regulated industries like financial services, healthcare, and government faced complex cybersecurity threats in an increasingly digitalized environment. Traditional security approaches were becoming insufficient against sophisticated threat actors, including those potentially gaining access to early quantum computing capabilities. Without quantum-ready security infrastructure, organizations risked exposing sensitive data and operations to future attacks.

## Quantum Solution

The partnership delivered solutions that leveraged Sandbox AQ''s advanced quantum technology expertise and Deloitte''s global security services. Their combined offering focused on two primary areas:

**Quantum-Resistant Cryptography**. The alliance developed solutions to help organizations upgrade their cybersecurity infrastructure, including transitioning to post-quantum cryptographic algorithms that could withstand attacks from future quantum computers.

**AI-Quantum Applications**. Building on Sandbox AQ''s expertise at the nexus of AI and quantum technologies, the partnership created applications for sectors including financial services, biopharma, and chemistry modeling and simulation. These solutions leveraged high-performance computing power and emerging quantum technologies to address computationally intensive business challenges.

The solutions were designed to operate effectively on existing infrastructure while preparing organizations for a smooth transition as quantum hardware became more readily available. This forward-looking approach allowed organizations to derive immediate benefits from quantum-inspired algorithms running on classical systems while ensuring they would be prepared for the full capabilities of quantum computing in the future.

## Implementation

The implementation strategy focused on making quantum readiness pragmatic and accessible for enterprise clients. The partners developed a phased approach that began with risk assessment, followed by infrastructure modernization, and culminating in the deployment of quantum-resistant systems.

Initial use cases prioritized upgrading the cybersecurity infrastructure of joint customers, with particular attention to the transition to quantum-resistant cryptographic algorithms. This approach addressed the most immediate threat posed by quantum computing: the potential to break widely-used encryption protocols.

The alliance brought together Sandbox AQ''s deep quantum knowledge and advanced technology solutions with Deloitte''s cybersecurity expertise and quantum advisory capabilities. This combination enabled organizations to effectively mitigate risks and protect operations during the quantum transformation.

## Results and Business Impact

The strategic alliance delivered significant value to forward-thinking organizations. By implementing quantum-ready security measures, clients gained protection against future quantum attacks while maintaining compatibility with existing systems. This proactive approach to cybersecurity positioned organizations to stay ahead of emerging threats.

Deborah Golden, Deloitte US Cyber and Strategic Risk leader, noted that the partnership helped organizations "preempt threats, transform securely and work toward a competitive market advantage that could result from early adoption" . Prnewswire The business impact extended beyond security to include operational efficiencies in areas like financial modeling, chemical simulations, and pharmaceutical research.

The alliance responded to the urgency expressed by Deloitte Global CEO Punit Renjen, who emphasized that "businesses that have the right technology in place to get ahead of those threats are going to have stronger staying power" . Prnewswire By combining Sandbox AQ''s advanced technology solutions with Deloitte''s global security services, the partnership equipped organizations with critical capabilities for navigating the complex challenges of the quantum era.

## Future Directions

Building on their initial success, Sandbox AQ and Deloitte established a roadmap for expanding their quantum readiness offerings. Future plans included extending quantum-resistant cryptography implementations across additional industries and developing more sophisticated AI-quantum hybrid applications for a range of specific business challenges.

The partnership continues to evolve alongside advancements in quantum technology, with a focus on maintaining the security and competitive advantage of their clients as the quantum computing landscape matures. This forward-looking approach positions both Sandbox AQ and Deloitte at the forefront of quantum-enabled business transformation, helping shape industry standards while delivering practical value to organizations navigating the quantum revolution.

', '{Deloitte}', '{SandboxAQ}', NULL, '{"Not Applicable"}', true, NULL, '2025-05-06 04:18:28.873045+00', '2025-07-17 11:25:07.966739+00', '[^1]: Sandbox AQ and Deloitte. (2022). "Strategic Alliance to Help Clients Transition to the Quantum Era Securely." Press Release.
[^2]: Deloitte Global. (2022). "Quantum Computing Readiness Assessment Framework."
[^3]: Sandbox AQ Research. (2022). "AI and Quantum Applications for Enterprise Security."', '[{"url": "https://www.sandboxaq.com/press/sandbox-aq-and-deloitte-form-strategic-alliance-to-help-clients-transition-to-the-quantum-era-securely", "label": "SandboxAQ and Deloitte Form Strategic Alliance to Help Clients Transition to the Quantum Era Securely", "order": 1}]', '{}', 2025),
	('7df3f9c1-423a-4fea-96d7-d371fde7a0d4', 'google-quantum-ai-boehringer-ingelheim-pharmaceutical-research', 'Google and Boehringer Ingelheim Pharmaceutical Research', 'A collaboration with Google Quantum AI to explore quantum computing for drug discovery and molecular modeling for future advantages in pharmaceutical development.', 'Boehringer Ingelheim, a leading global pharmaceutical company, established a groundbreaking partnership with Google Quantum AI to accelerate pharmaceutical research and development through quantum computing applications. This collaboration, announced in January 2021, marked the first time a pharmaceutical company formed a dedicated quantum computing partnership with a quantum technology provider. The alliance focused on implementing quantum computational methods to drive breakthroughs in drug discovery, molecular dynamics simulations, and pharmaceutical optimization processes.

## Problem Statement

Pharmaceutical research and development faces tremendous computational challenges that limit innovation and extend development timelines. Developing a new drug typically requires 10-15 years of research and development with costs exceeding $2.5 billion, yet success rates remain discouragingly low. A significant portion of this time and expense derives from the computational complexity of modeling molecular interactions, protein folding, and drug-target binding at the quantum mechanical level.

Classical computational methods introduce significant approximations when simulating these quantum systems, compromising accuracy for tractability. These approximations create a fundamental barrier to accurately predicting how potential drug compounds will interact with biological targets, metabolise in the body, or demonstrate side effects. The exponential scaling of resources required for precise quantum mechanical simulations means that even the most powerful classical supercomputers cannot perform accurate calculations for complex biological systems.

For Boehringer Ingelheim, these computational limitations presented both a challenge and an opportunity. Addressing this barrier could potentially transform their entire R&D pipeline, reducing development timelines, increasing success rates, and enabling the pursuit of previously intractable therapeutic targets. The ability to more accurately model molecular systems could lead to more effective drugs with fewer side effects, ultimately benefiting patients while reducing development costs and improving competitiveness.

## Quantum Approach

The Boehringer Ingelheim and Google Quantum AI collaboration implemented a sophisticated quantum computational strategy tailored to pharmaceutical applications. This approach leveraged Google''s quantum computing expertise, including access to their quantum processors and algorithm development capabilities, combined with Boehringer Ingelheim''s deep pharmaceutical domain knowledge.

The technical implementation focused on developing quantum algorithms for molecular dynamics simulations, quantum chemistry calculations, and machine learning applications relevant to drug discovery. The partnership established dedicated research teams integrating quantum computing scientists with medicinal chemists, computational biologists, and drug development experts.

Given current quantum hardware limitations, the team implemented a hybrid quantum-classical approach. This pragmatic strategy assigned quantum processors to specific calculations where they might offer advantages, particularly for electronic structure problems and certain correlation effects, while leveraging classical computation for other aspects of the modeling process. The hybrid framework allowed meaningful progress on pharmaceutical applications despite the constraints of contemporary quantum hardware.

The collaboration developed specialised quantum circuit designs optimised for molecular systems relevant to Boehringer Ingelheim''s therapeutic focus areas. These custom implementations incorporated pharmaceutical domain knowledge to reduce circuit complexity and enhance computational efficiency, which are critical considerations for execution on current quantum processors with their inherent noise limitations.

Advanced error mitigation techniques formed another crucial element of the approach, helping compensate for the noise and imperfections in current quantum systems. These error suppression methods, specifically adapted for pharmaceutical computations, enabled more reliable results than would otherwise be possible on noisy intermediate-scale quantum (NISQ) devices.

## Results and Business Impact

The collaboration has produced several significant outcomes demonstrating quantum computing''s potential in pharmaceutical research. The team successfully implemented quantum algorithms that showed promising results for modeling molecular properties relevant to drug development, achieving improved accuracy for certain calculations compared to classical methods. These implementations established proof-of-concept for quantum computational chemistry in a commercial pharmaceutical context.

The partnership has established computational workflows that integrate quantum-enhanced modeling with Boehringer Ingelheim''s existing drug discovery pipeline. These workflows create a framework for evaluating quantum computational results alongside traditional approaches, building confidence in the reliability of quantum methods while establishing pathways for practical implementation as the technology matures.

The collaboration has advanced quantum algorithms specifically designed for pharmaceutical applications, creating methodologies optimised for drug-like molecules and their interactions with biological targets. These algorithmic developments represent valuable intellectual assets with potential applications across multiple therapeutic areas and development stages.

For Boehringer Ingelheim, these technical achievements translate into tangible business advantages. The enhanced molecular modeling capabilities could accelerate the lead identification and optimization phases of drug discovery, potentially reducing time-to-market for new therapeutics. Improved predictive accuracy allows researchers to prioritise the most promising drug candidates earlier in the development process, focusing resources on compounds with higher probabilities of clinical success.

The quantum approach enables exploration of novel chemical spaces and binding mechanisms that remain computationally inaccessible using classical methods alone. This expanded search capacity increases the potential for identifying innovative therapeutic compounds that might otherwise remain undiscovered.

Beyond the immediate technical outcomes, the collaboration positions Boehringer Ingelheim at the forefront of quantum-enhanced pharmaceutical research. This competitive positioning strengthens the company''s innovation profile and creates opportunities for scientific leadership as quantum technology matures. The knowledge and expertise developed through this partnership represent strategic assets that will continue to generate value as quantum computing capabilities expand.

## Future Directions

Building on their pioneering collaboration, Boehringer Ingelheim and Google Quantum AI have outlined several promising directions for future development. Algorithm refinement remains a continuing priority, with ongoing work to improve quantum approaches for increasingly complex pharmaceutical systems. These enhancements focus on both accuracy improvements and computational efficiency, allowing more comprehensive modeling as quantum hardware evolves.

The partners are expanding the scope of pharmaceutical applications addressed through quantum methods, extending from molecular property prediction to protein-drug interactions, molecular dynamics, and eventually to systems biology approaches. This expansion follows a strategic roadmap that aligns growing quantum capabilities with increasingly sophisticated pharmaceutical challenges.

Integration with experimental workflows continues to advance, creating tighter connections between quantum computational predictions and laboratory validation. This integration establishes feedback loops that refine models based on experimental results, accelerating the iterative improvement of both quantum algorithms and drug candidates.

As quantum hardware progresses with improvements in qubit counts, coherence times, and gate fidelities, the team continuously adapts their algorithms to leverage these advancements. This hardware-specific optimization ensures that each new generation of quantum processors can address more sophisticated pharmaceutical simulations with greater accuracy and efficiency.

The collaboration is exploring quantum machine learning approaches that combine simulation results with experimental data to create predictive models for drug properties and interactions. These hybrid quantum-classical machine learning frameworks could further enhance predictive accuracy while maximising the value extracted from limited quantum resources.

## Conclusion

The Boehringer Ingelheim and Google Quantum AI partnership demonstrates how quantum computing can address fundamental challenges in pharmaceutical research. While comprehensive quantum advantage for drug discovery remains a future goal dependent on hardware advances, this collaboration has established viable pathways that deliver incremental benefits while building capabilities for greater future impact.

The strategic approach taken by these organisations illustrates how pharmaceutical companies can effectively engage with quantum computing today—developing expertise, establishing methodologies, and creating integrated workflows that position them to capitalise on each advancement in quantum hardware. Rather than waiting for fault-tolerant quantum computers, this pragmatic strategy delivers near-term value while building capabilities for transformative future advantages.

For the pharmaceutical industry broadly, this case study highlights quantum computing''s potential to transform drug discovery by addressing the quantum mechanical nature of molecular interactions that fundamentally limit classical computational methods. The ability to more accurately model molecular properties and interactions could significantly reduce the time and cost of bringing new therapeutics to market while enabling the exploration of novel chemical spaces for treating challenging diseases.

As quantum computing continues its rapid evolution, forward-thinking pharmaceutical companies that invest in quantum capabilities today may gain substantial competitive advantages in research efficiency, therapeutic innovation, and intellectual property development. The Boehringer Ingelheim and Google Quantum AI collaboration exemplifies how strategic partnerships between industry leaders and quantum technology specialists can accelerate progress toward practical quantum applications with significant business impact.

', '{"Boehringer Ingelheim"}', '{"Google Quantum AI"}', NULL, '{"Google Sycamore Quantum Processor"}', true, NULL, '2025-04-25 06:47:26.136781+00', '2025-07-22 07:50:03.486258+00', '[^1]: Boehringer Ingelheim. (2021). Boehringer Ingelheim and Google Quantum AI Partner for Pharmaceutical R&D. [Press Release]. Retrieved from https://www.boehringer-ingelheim.com/press-release/quantum-computing-collaboration-google
    
[^2]: Google Quantum AI. (2021). Partnering with Boehringer Ingelheim to advance quantum computing in pharmaceutical R&D. Google AI Blog. Retrieved from https://ai.googleblog.com/2021/01/partnering-with-boehringer-ingelheim-to.html
    
[^3]: Cao, Y., Romero, J., Olson, J.P., Degroote, M., Johnson, P.D., Kieferová, M., Kivlichan, I.D., Menke, T., Peropadre, B., Sawaya, N.P.D., Sim, S., Veis, L., & Aspuru-Guzik, A. (2019). Quantum Chemistry in the Age of Quantum Computing. Chemical Reviews, 119(19), 10856-10915. https://doi.org/10.1021/acs.chemrev.8b00803
    
[^4]: Arute, F., Arya, K., Babbush, R., Bacon, D., Bardin, J.C., Barends, R., Biswas, R., Boixo, S., Brandao, F.G., Buell, D.A., et al. (2019). Quantum supremacy using a programmable superconducting processor. Nature, 574(7779), 505-510. https://doi.org/10.1038/s41586-019-1666-5
    
[^5]: Babbush, R., Gidney, C., Berry, D.W., Wiebe, N., McClean, J., Paler, A., Fowler, A., & Neven, H. (2018). Encoding electronic spectra in quantum circuits with linear T complexity. Physical Review X, 8(4), 041015. https://doi.org/10.1103/PhysRevX.8.041015
    
[^6]: Pharmaceutical Research and Manufacturers of America. (2022). Biopharmaceutical R&D: The Process Behind New Medicines. Industry White Paper.
    
[^7]: McArdle, S., Endo, S., Aspuru-Guzik, A., Benjamin, S.C., & Yuan, X. (2020). Quantum computational chemistry. Reviews of Modern Physics, 92(1), 015003. https://doi.org/10.1103/RevModPhys.92.015003
    
[^8]: Quantum Economic Development Consortium. (2022). Quantum Computing Applications in Life Sciences. Industry Report.', '[]', '{OpenFermion}', 2021),
	('b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', 'ibm-exxon-mobil-maritime-logistics-optimisation', 'IBM and ExxonMobil explore maritime logistics optimization', 'An early collaboration to explore the use of quantum computing for energy optimization and environmental modelling.', 'In January 2019, ExxonMobil announced a partnership with IBM to advance the potential use of quantum computing in developing next-generation energy and manufacturing technologies. This collaboration made ExxonMobil the first energy company to join the IBM Q Network, a worldwide community of Fortune 500 companies, startups, academic institutions, and national research labs working to advance quantum computing and explore practical applications for science and business.

## The Energy Sector Challenges

ExxonMobil faced several complex computational challenges that exceeded the capabilities of traditional computing systems. The company needed to address what they termed the "dual challenge" of providing reliable and affordable energy to a growing global population, projected to reach 9.2 billion by 2040, while simultaneously reducing environmental impacts and the risks of climate change.

Specific challenges included optimizing maritime shipping routes for cleaner fuels like natural gas, which emits up to 60% less greenhouse gases than coal, managing complex electric power grids, and developing more effective carbon capture technologies. These problems involve vast numbers of variables and constraints, creating optimization scenarios that are extremely difficult or impossible to solve exactly with classical computing approaches.

Additionally, ExxonMobil needed more accurate ways to simulate molecular interactions for applications such as developing new catalysts, improving carbon capture materials, and creating more efficient chemical manufacturing processes. Simulating these quantum-scale interactions accurately requires computational resources that exceed the capabilities of even the most powerful supercomputers.

## Quantum Solutions

The IBM-ExxonMobil partnership focused on several quantum computing applications designed to address these energy sector challenges:

**Maritime Inventory Routing Optimization**. Teams from IBM Research and ExxonMobil Corporate Strategy Research collaborated to model maritime inventory routing on quantum devices. This involved developing quantum algorithms to optimize the routing of ships transporting natural gas and other cleaner fuels, analyzing the strengths and trade-offs of different strategies for vehicle and inventory routing. The approach aimed to provide more efficient solutions to routing problems than possible with classical computing methods, potentially reducing fuel consumption, lowering emissions, and improving the economics of cleaner energy transportation.

**Power Grid Optimization** The partnership explored quantum computing applications for optimizing country-level power grids, a computationally intensive challenge that involves balancing supply, demand, transmission constraints, and other factors across vast networks. By developing quantum algorithms for grid optimization, the partnership aimed to enable more efficient integration of renewable energy sources and improve overall grid reliability and performance.

**Quantum Chemistry for Carbon Capture**. Researchers focused on developing quantum algorithms to perform more accurate quantum chemistry calculations, enabling the discovery of new materials for efficient carbon capture. This work leveraged quantum computing''s natural advantage in simulating quantum systems, potentially allowing for the design of materials with specific properties that could dramatically improve carbon capture efficiency.

## Implementation

The implementation of these quantum solutions involved close collaboration between ExxonMobil''s research team and IBM''s quantum computing experts within the IBM Q Network framework. ExxonMobil assembled a quantum team composed of applied mathematicians, optimization experts, computational chemists, and other scientists with both the fundamental research capabilities needed for algorithm development and practical knowledge of energy industry challenges. This team worked directly with IBM''s quantum computing specialists to develop and test algorithms on IBM''s quantum hardware.

The collaboration also extended to the broader IBM Q Network community, creating opportunities for knowledge exchange and collaboration with other quantum computing pioneers across various industries. For the maritime inventory routing challenge, the teams developed quantum algorithms that could represent the complex constraints of shipping operations and find optimized solutions. This implementation required translating real-world shipping constraints into mathematical formulations compatible with quantum processing. The researchers analysed different strategies for encoding these problems for quantum processing, evaluating how various quantum approaches compared to classical methods and identifying the types of routing problems where quantum computing might offer the greatest advantages. 

ExxonMobil later joined IBM''s Materials Science Working Group, which kicked off in March 2023 and included members from Oak Ridge National Lab, RIKEN, the University of Chicago, Boeing, and Bosch. This group focused on implementing quantum algorithms for simulating materials at a fundamental level, with particular emphasis on determining the ground state properties of materials, which is a key to understanding how they behave during chemical reactions.

## Results and Business Impact

While the partnership was still in its early stages and quantum computing technology continued to mature, several important outcomes and potential business impacts emerged. The collaboration established a strong foundation for quantum computing applications in the energy sector, laying the groundwork for future advances as quantum hardware continues to improve. ExxonMobil positioned itself at the forefront of quantum computing adoption in the energy industry, developing the expertise and capabilities needed to leverage this technology as it matures.

The maritime routing work provided insights into how quantum computing could eventually handle previously insoluble routing problems. As IBM''s quantum hardware scaled from small prototype systems to larger devices, these early algorithms and implementations created a pathway toward practical quantum-enhanced shipping optimization. Over on the quantum chemistry research side of things, the collaboration offered potential for more accurate environmental modeling and materials design for carbon capture, addressing a critical aspect of ExxonMobil''s dual challenge of providing energy while reducing environmental impact. Even in these early stages, the quantum approach demonstrated potential advantages over classical simulation methods for certain types of molecular modeling.

New Algorithmic Approaches

The partnership inspired "different ways of thinking that are uniquely suited to [quantum computing''s] specific powers," according to Dr. Vijay Swarup, ExxonMobil Vice President of Research and Development . IBM This led to the development of new algorithmic approaches that could benefit not just ExxonMobil but the broader quantum computing community.

## Future Directions

Building on their initial collaboration, IBM and ExxonMobil outlined several directions for future quantum computing research and applications. In terms of scaling quantum algorithms, the collaboration aimed to be prepared to make use of any advances in the future. As quantum hardware capabilities continued to improve, the partners planned to scale their quantum algorithms to address larger and more complex energy optimization problems. This scaling effort aimed to prepare for the day when quantum computing becomes "utterly disruptive," as Dr. Swarup put it.

Beyond the initial focus areas, the partnership identified additional potential applications for quantum computing across ExxonMobil''s operations, including developing new catalysts for low-energy chemical processing, simulating complex chemical reactions, and optimizing manufacturing processes. The future vision included integrating quantum computing with ExxonMobil''s existing high-performance computing resources, creating hybrid quantum-classical workflows that leverage the strengths of both computing paradigms. This approach recognized that quantum processors would likely serve as specialized accelerators for specific computational tasks rather than replacements for classical systems. Through their participation in the IBM Q Network and various working groups, ExxonMobil and IBM aimed to help establish industry standards and best practices for quantum computing applications in the energy sector, encouraging broader adoption of quantum approaches to energy challenges.
', '{ExxonMobil}', '{IBM}', NULL, '{"IBM Quantum System One","IBM Eagle","IBM Hummingbird","IBM Falcon"}', true, NULL, '2025-05-05 09:19:02.79727+00', '2025-07-22 13:14:21.892511+00', '[^1]: IBM Quantum. (2019). "Quantum Computing Applications in Energy Optimization."
[^2]: ExxonMobil Research and Engineering Company. (2019). "Next-Generation Computing for Energy Solutions."
[^3]: IBM Research. (2019). "Maritime Routing Optimization with Quantum Computing."
[^4]: Journal of Quantum Information. (2023). "Quantum Algorithms for Materials Science and Energy Applications."', '[]', '{"IBM Quantum Platform",Qiskit}', 2019);


--
-- Data for Name: algorithm_case_study_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."algorithm_case_study_relations" ("id", "algorithm_id", "case_study_id", "created_at") VALUES
	('6a119796-6244-4239-b45e-12279822c36d', '9eaba195-477b-4658-9263-6a7d158c1269', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 14:04:17.97937+00'),
	('20a9b4e1-a608-4d38-98e1-e73cbe5be48d', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '833b4b11-7998-464d-96b5-c1c09376d81a', '2025-07-23 11:39:27.014928+00'),
	('81997903-3a4f-4dd3-9ca3-99093ec6b9b1', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '2025-07-23 11:39:27.311295+00'),
	('c855705c-4638-4560-ad5f-d0a0f4411cd2', '9eaba195-477b-4658-9263-6a7d158c1269', 'af449569-c8e6-4ff5-8e04-bb75645465e5', '2025-07-23 14:04:18.783533+00'),
	('3703bf36-fabe-48e2-b9a8-a1fc8d075a5e', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', 'bdc1d580-4643-4156-a148-45e63cb44342', '2025-07-23 11:39:27.599357+00'),
	('3903c562-72a6-48cd-8f17-941d39d8ba9d', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '2025-07-23 11:39:27.890698+00'),
	('ba1461ae-83ed-4aa9-8ca6-fbd365572ec0', '9eaba195-477b-4658-9263-6a7d158c1269', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '2025-07-23 14:04:19.599866+00'),
	('cdbfb9b4-84dd-4486-ab9a-186e1785b300', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 11:39:28.70318+00'),
	('f7b99164-68ef-4142-a4a1-f62ed38019b6', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '6560ef0b-87f5-4203-8826-23202351903e', '2025-07-23 11:39:29.535242+00'),
	('bf39c72b-1b14-46ea-88f9-81ce962c54bc', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2025-07-23 11:39:29.829622+00'),
	('52644e88-075d-47d0-af1e-5ade212e0428', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '2025-07-23 11:39:30.112364+00'),
	('4d7c656b-9772-4c3d-b692-a8e98edd116f', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '99916798-d04e-46af-b496-970de5b2d2f5', '2025-07-23 11:39:30.956554+00'),
	('b4841f74-ebab-4799-a11b-8ae391b9f28c', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', 'f2b23a03-f51f-488f-aaba-13c3610c6385', '2025-07-23 11:39:31.826129+00'),
	('aa7736a3-d8ff-4e3d-9c0b-469369ca6d85', '462de4e7-2a6d-4a7f-8792-39141fadfb15', '6560ef0b-87f5-4203-8826-23202351903e', '2025-07-23 11:42:35.638638+00'),
	('c5a2e3fb-05e1-4487-9f36-f6df52d74218', '2acaa74b-61a6-4fff-8145-e875b39cb579', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:10:00.781108+00'),
	('e6575581-604c-42dd-b250-65291413aa8d', '7527f1bb-5d8e-4f43-b5d9-5c41f7bb086e', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2025-07-23 13:15:51.697126+00'),
	('afd7f907-6480-4558-8d79-3b2f88fc32c0', '7527f1bb-5d8e-4f43-b5d9-5c41f7bb086e', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:15:52.52218+00'),
	('20fde2cc-863f-48db-b6f1-7dfa7406a392', '7527f1bb-5d8e-4f43-b5d9-5c41f7bb086e', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '2025-07-23 13:15:53.32283+00'),
	('10bd898b-d09e-48d4-b724-1690420c72dd', '7527f1bb-5d8e-4f43-b5d9-5c41f7bb086e', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '2025-07-23 13:15:54.116971+00'),
	('3d99cb7e-9e32-4e3b-b2f2-c29d84dca6e5', '5b008285-b825-4763-aab1-58b1aaf97e96', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '2025-07-23 13:21:20.341958+00'),
	('805ab8b7-5601-4a36-83e4-ad3c1f9bf18f', '5b008285-b825-4763-aab1-58b1aaf97e96', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:21:21.180589+00'),
	('6cf1c93b-97eb-44ab-8579-d1cfee138897', 'ae90e8c4-4431-4b28-8e5d-10c18ff512d4', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:28:28.152452+00'),
	('d85535ae-f6a5-4db7-8e44-9a7ba1ee1f49', 'ae90e8c4-4431-4b28-8e5d-10c18ff512d4', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '2025-07-23 13:28:28.945224+00'),
	('f053b8cf-3a58-4fd2-addc-1028e24c1d42', 'ff12f2c3-5f2e-4bac-93dc-412475ac85ec', '6560ef0b-87f5-4203-8826-23202351903e', '2025-07-23 13:42:30.858183+00'),
	('5092b1e8-3522-4656-90d3-d848cebab21c', '95d262a3-8d0f-4c84-9c16-f1fc343ae212', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:47:24.415737+00'),
	('c79cd74d-e96e-41ce-a44d-fd19a1f45d15', '79662c8a-14fd-4943-bed4-0d22bd47fbe0', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:49:52.706805+00'),
	('ea495cae-e847-4ddc-9cf3-c352d8ba4617', '79662c8a-14fd-4943-bed4-0d22bd47fbe0', '6560ef0b-87f5-4203-8826-23202351903e', '2025-07-23 13:49:53.477654+00'),
	('8d21ca8b-0e76-4e8b-bcc0-139f9be361ac', 'f02557be-ca5c-4b43-94c1-c37484cd6343', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '2025-07-23 14:17:22.045821+00'),
	('199387a5-4f15-4324-905d-029368ed4348', 'f02557be-ca5c-4b43-94c1-c37484cd6343', 'af449569-c8e6-4ff5-8e04-bb75645465e5', '2025-07-23 14:17:22.886646+00'),
	('d6c3e3a3-a563-4097-9309-2a6bc1aeb8dd', 'f02557be-ca5c-4b43-94c1-c37484cd6343', 'bdc1d580-4643-4156-a148-45e63cb44342', '2025-07-23 14:17:23.186941+00'),
	('be285754-da4c-4516-af69-40e7b904996d', '3ea62960-1bdf-4429-bd2e-a42338120883', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '2025-07-23 14:19:11.775672+00'),
	('c43eb94b-1cda-4d8f-b276-fb05ce6b2719', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', '2025-07-23 13:52:10.38696+00'),
	('6fae3001-be61-4f2c-81ef-b5ff1e418b60', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '833b4b11-7998-464d-96b5-c1c09376d81a', '2025-07-23 13:52:10.692492+00'),
	('2eefc911-4c9a-4452-854c-3d86b044b235', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '2025-07-23 13:52:10.956565+00'),
	('cd71822b-fe10-4269-a889-cd5d2a127e11', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '2025-07-23 13:52:11.242352+00'),
	('cff3c39a-8301-4924-a3d6-44110a2104c4', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '6560ef0b-87f5-4203-8826-23202351903e', '2025-07-23 13:52:11.514585+00'),
	('631f453f-b4d5-4df8-a90f-d29c56eab7f6', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:52:11.799302+00'),
	('3a07cc39-5518-44fc-9c6a-7de4d976bc3d', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2025-07-23 13:52:12.073094+00'),
	('aa57acdc-1aca-4c02-addb-b3467a8d5d58', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '2025-07-23 13:52:12.349918+00'),
	('9e32400f-4863-477d-ab19-01dbb23374a5', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', '2025-07-23 13:52:12.66795+00'),
	('fa07f941-c4ba-4f97-bf56-d33cc9644d31', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '99916798-d04e-46af-b496-970de5b2d2f5', '2025-07-23 13:52:12.943945+00'),
	('29b429b4-7424-4e73-acba-f4070309d7e5', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', 'f2b23a03-f51f-488f-aaba-13c3610c6385', '2025-07-23 13:52:13.239671+00'),
	('0307fd02-cc3d-481f-a00a-91305d65ab9b', '6d7e573c-1834-4bdf-847a-e598c8c5f506', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 13:59:25.102285+00'),
	('89dab911-dc12-4c05-9218-e640297c90b4', '15f5c62d-1f8e-4986-93f0-ad7fdcf90527', '99224120-7ece-4b81-9eac-e04716eee201', '2025-07-23 11:18:32.224653+00'),
	('ba9b8f85-2a52-4943-b303-eb1f1dfbb4ac', '6d7e573c-1834-4bdf-847a-e598c8c5f506', '6560ef0b-87f5-4203-8826-23202351903e', '2025-07-23 13:59:25.892268+00'),
	('5e78a70b-2ac7-478c-85b7-0773bafb4d21', '758dbf16-2b51-4c12-8351-1512a7f5ae03', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '2025-07-23 11:20:46.699159+00'),
	('0e0bf041-b8a9-447a-83a2-0609946cf326', '80b08898-22b2-4d69-bf0b-9398dd0f2409', 'bdc1d580-4643-4156-a148-45e63cb44342', '2025-07-23 11:26:27.601498+00'),
	('3fddbf20-9d97-4431-9dca-ebe62fff92ac', '80b08898-22b2-4d69-bf0b-9398dd0f2409', '1725a92a-e804-4fb6-af66-5b7bc875834f', '2025-07-23 11:26:27.898607+00'),
	('e61593e9-727e-4867-90ed-2954d4a85fde', '7557a852-28e4-4b69-a2d6-683471f38ffb', '9e039b07-ad28-4612-abf8-718d89bb4cc2', '2025-07-23 11:28:51.661422+00'),
	('c771b282-f957-48d7-8de2-3be0a4b8b797', '70021542-f2b3-4293-9fc7-60d237ed5548', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '2025-07-23 11:32:32.916324+00'),
	('159a4ce6-68f3-48e2-a349-1f7f5e79562f', '70021542-f2b3-4293-9fc7-60d237ed5548', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 11:32:33.721798+00'),
	('c6a7cefd-781c-44f9-ab00-b7f07423634e', '70021542-f2b3-4293-9fc7-60d237ed5548', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '2025-07-23 11:32:34.524323+00'),
	('79073ca6-4dd8-4712-8989-c2fb762a91ee', 'f4d3ea16-2aae-4a17-8280-08b769db955c', '5bc389e7-9689-4409-aaea-4562dea188da', '2025-07-23 14:02:07.011951+00'),
	('8428118a-444d-48bc-af71-42e7f31860a0', 'f4d3ea16-2aae-4a17-8280-08b769db955c', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2025-07-23 14:02:07.794971+00'),
	('a3df9706-9dde-492d-b391-9da4a68163f3', 'f4d3ea16-2aae-4a17-8280-08b769db955c', '99916798-d04e-46af-b496-970de5b2d2f5', '2025-07-23 14:02:08.553158+00'),
	('dbb88fc9-591a-4a8b-b20b-7984225737ea', '70021542-f2b3-4293-9fc7-60d237ed5548', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '2025-07-23 11:32:35.324327+00'),
	('47a38c5c-810a-4b69-98f3-640857e87c12', '70021542-f2b3-4293-9fc7-60d237ed5548', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2025-07-23 11:32:36.124156+00'),
	('ce241c57-c803-45e5-8d07-a63e21e4493a', '70021542-f2b3-4293-9fc7-60d237ed5548', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '2025-07-23 11:32:36.398907+00'),
	('76c3fb12-abf2-4517-b161-776c6d3875e2', '70021542-f2b3-4293-9fc7-60d237ed5548', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', '2025-07-23 11:32:37.201292+00'),
	('9d8e84e2-5b57-4905-b2bd-816aaa839642', '70021542-f2b3-4293-9fc7-60d237ed5548', 'f2b23a03-f51f-488f-aaba-13c3610c6385', '2025-07-23 11:32:37.961153+00');


--
-- Data for Name: industries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."industries" ("id", "slug", "name", "description", "created_at", "main_content", "published", "updated_at", "published_at", "is_system_record", "sector") VALUES
	('2987e482-87ed-42da-9013-6d19358350eb', 'agriculture', 'Agriculture', 'Applications of quantum computing in farming practices, crop management, and agricultural supply chains.', '2025-04-28 01:25:31.503066+00', 'The agricultural industry faces increasing computational challenges as climate variability intensifies, resource constraints tighten, and production demands grow. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Crop optimization represents a promising application area, where quantum algorithms can address complex genetic selection and breeding program design challenges. These applications involve evaluating vast genetic combinations for desired traits while accounting for environmental interactions and breeding constraints. Quantum approaches may accelerate the development of crop varieties with enhanced yield, disease resistance, and climate adaptability. Several agricultural biotechnology companies have initiated quantum research programs targeting these capabilities.

Climate modeling applications leverage quantum simulation to improve prediction accuracy for regional climate patterns and extreme weather events. Enhanced climate modeling directly impacts planting decisions, irrigation planning, and risk management strategies. Quantum algorithms may provide more accurate medium-range forecasts by processing more comprehensive atmospheric and oceanic data with higher computational efficiency.

Soil chemistry simulation benefits from quantum chemistry algorithms that can model complex interactions between soil components, microorganisms, fertilisers, and plant roots. These capabilities can inform precision fertilisation strategies, soil amendment practices, and sustainable soil management approaches that optimise resource utilisation while minimizing environmental impact.

Resource management applications optimise water, fertiliser, and pesticide usage across variable field conditions. Quantum computing can process multi-spectral imaging data, soil sensor networks, and weather predictions to generate precise resource application plans that maximise efficiency while minimizing waste and environmental impact.

Supply chain optimization applications address complex logistics challenges from farm to consumer, including harvest timing, transportation routing, storage allocation, and distribution planning. Quantum optimization algorithms can potentially reduce spoilage, improve freshness, and enhance overall system efficiency.

Implementation strategies for agricultural organisations should focus on identifying specific optimization or simulation problems with clear economic or sustainability metrics, developing partnerships with quantum technology providers, and creating hybrid classical-quantum solutions that can evolve with hardware capabilities.', true, '2025-07-23 03:09:54.109226+00', NULL, false, '{"Sustainable Farming","Soil Chemistry","Food Processing","Livestock Health","Climate Modelling","Crop Optimisation","Production Planning","Fertiliser Development"}'),
	('ed04bf1e-6279-4f81-982d-a2429e9abffb', 'chemical-manufacturing', 'Chemical Manufacturing', 'Applications of quantum computing in chemical processes, material design, and manufacturing optimisation.', '2025-04-28 01:24:34.261558+00', 'The chemical manufacturing industry faces computational challenges in molecular modeling, process simulation, and material discovery that impact product development, manufacturing efficiency, and innovation capabilities. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Molecular simulation represents the most promising near-term application, where quantum algorithms can model electron behaviour and molecular interactions with greater accuracy than classical approximations. For chemical manufacturers, this translates to improved prediction of reaction kinetics, thermodynamic properties, and molecular behaviour under various conditions. Several chemical companies have established quantum research initiatives specifically targeting these capabilities to enhance process design and reaction optimization.

Catalyst design applications leverage quantum chemistry to model complex transition states and reaction intermediates with greater accuracy than classical methods. Improved catalyst design directly impacts reaction efficiency, selectivity, and energy requirements—fundamental factors in chemical manufacturing economics and environmental impact. Quantum approaches may identify novel catalytic materials or optimization strategies for existing processes.

Process optimization applications address complex scheduling, resource allocation, and parameter optimization challenges in chemical manufacturing operations. Quantum algorithms can potentially evaluate more process configurations and operating conditions than classical approaches, improving production efficiency, reducing energy consumption, and enhancing quality control.

Material discovery applications use quantum simulation to predict properties of novel compounds before synthesis, potentially accelerating innovation cycles and reducing development costs. Applications include polymer design, specialty chemicals, and advanced materials with specific performance characteristics tailored to customer requirements.

Quality control applications leverage quantum machine learning for pattern recognition in spectroscopic data, process monitoring, and defect detection. These capabilities can enhance product consistency while reducing testing costs and production losses.

Implementation strategies for chemical manufacturers should focus on identifying specific computational bottlenecks in current research and production processes, developing quantum expertise through targeted use cases, establishing partnerships with quantum technology providers, and creating hybrid approaches that can deliver incremental benefits as quantum hardware capabilities mature.', true, '2025-07-23 03:13:34.15709+00', NULL, false, '{Petrochemicals,"Polymers & Plastics",Catalysis,"Spectroscopic Analysis","Battery Development","Material Discovery","Process Simulation","Molecular Modelling"}'),
	('2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', 'automotive', 'Automotive', 'Applications of quantum computing in automotive design, manufacturing, and intelligent transportation systems.', '2025-04-28 01:20:42.025909+00', 'The automotive industry faces intensifying computational challenges as vehicle complexity increases, electrification accelerates, and autonomous driving capabilities advance. Quantum computing offers targeted solutions to these challenges through several high-value applications that address specific computational bottlenecks.

Vehicle design optimization represents a significant opportunity, where quantum algorithms can evaluate complex multi-physics simulations across larger parameter spaces than classical methods. These capabilities enable more efficient aerodynamic profiles, structural designs, and thermal management systems while balancing multiple objectives and constraints. Automotive manufacturers are exploring quantum approaches to reduce vehicle weight while maintaining safety standards and performance characteristics.

Battery technology development benefits from quantum chemistry simulations that more accurately model electron behaviour in potential electrode and electrolyte materials. These capabilities can accelerate the discovery and validation of new battery chemistries with higher energy densities, faster charging capabilities, and improved cycle life—addressing critical barriers to electric vehicle adoption and performance.

Traffic flow management applications leverage quantum optimization to address complex routing and congestion challenges in urban environments. Several manufacturers have demonstrated quantum approaches to fleet routing and traffic optimization that minimize congestion, reduce emissions, and improve transportation efficiency in dynamic environments.

Manufacturing and supply chain optimization applications include production scheduling, resource allocation, and inventory management—problems characterised by numerous constraints and objectives that quantum algorithms can potentially address more effectively than classical approaches. These capabilities directly impact production efficiency, cost management, and supply chain resilience.

Autonomous vehicle systems may benefit from quantum machine learning approaches that enhance object recognition, predictive modeling, and decision-making under uncertainty. These applications remain largely exploratory but represent a potential future advantage as both quantum and autonomous technologies mature.

Implementation strategies for automotive organisations should focus on identifying specific computational bottlenecks in current processes, developing quantum expertise through targeted use cases, and creating hybrid quantum-classical approaches that can evolve with hardware capabilities.', true, '2025-07-23 03:27:24.799377+00', NULL, false, '{"Autonomous Driving","Battery Design","Aerodynamic Modelling","Traffic Flow Management","Materials Design","Quantum Chemistry Simulation","Supply Chain Management","Risk Management"}'),
	('90129900-eff4-40ab-a1b3-afa1076913b4', 'climate-environment', 'Climate and Environment', 'Applications of quantum computing in climate modeling, environmental monitoring, and sustainability solutions.', '2025-04-28 01:29:45.308522+00', 'The climate and environmental sector faces computational challenges of extraordinary scale and complexity that impact our ability to understand, predict, and mitigate environmental changes. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in environmental science.

Climate simulation represents the most promising application, where quantum algorithms can potentially model complex atmospheric and oceanic interactions with greater fidelity than classical approaches. Current climate models face computational constraints that limit spatial resolution and the inclusion of fine-grained physical processes. Quantum approaches may enable more comprehensive simulations that capture critical feedback mechanisms and regional impacts with greater accuracy, improving both long-term climate projections and adaptation planning.

Carbon capture optimization applications leverage quantum computing to address complex molecular and process design challenges for carbon sequestration technologies. These applications can potentially accelerate the discovery of novel materials and processes for atmospheric carbon extraction, optimise existing carbon capture systems, and enhance the efficiency of carbon storage solutions—critical capabilities for climate mitigation strategies.

Environmental monitoring applications use quantum sensing and quantum-enhanced data analysis to detect subtle environmental changes and pollutants with unprecedented sensitivity. Quantum sensors can potentially detect trace contaminants, measure gravitational and magnetic field anomalies for groundwater mapping, and enable more precise atmospheric composition analysis.

Ecosystem modeling applications address the complex interactions between climate, biodiversity, and human activity that classical computers struggle to simulate comprehensively. Quantum approaches may enable more sophisticated modeling of ecosystem services, species interactions, and tipping points in natural systems.

Weather prediction capabilities may benefit from quantum computing through improved data assimilation and modeling of chaotic atmospheric processes. Quantum algorithms offer potential advantages for processing the massive datasets from satellite and ground-based sensors while modeling complex atmospheric dynamics with greater precision.

Implementation strategies for environmental organisations should focus on identifying specific computational bottlenecks in current models, developing partnerships with quantum technology providers, and creating proof-of-concept implementations for high-impact applications.', true, '2025-07-23 03:31:03.827242+00', NULL, false, '{"Climate Modelling","Water Management","Weather Prediction","Waste Management","Biodiversity Conservation","Sustainable Materials","Carbon Capture","Renewable Energy"}'),
	('51d18938-6be2-4159-ba3f-5de625ef89a2', 'defence', 'Defence', 'Applications of quantum computing in military operations, intelligence analysis, and defense systems.', '2025-04-28 01:28:24.33177+00', 'The defence sector faces complex computational challenges across operations, intelligence, and security domains that impact mission effectiveness, resource utilisation, and strategic capabilities. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Cryptographic security represents the most immediate priority, as quantum computing threatens widely deployed encryption systems that protect sensitive communications and data. Defence organisations are implementing post-quantum cryptography transition programs that include cryptographic inventory, prioritisation frameworks, and phased migration plans. Systems with long operational lifespans and high security requirements demand particular attention, as encrypted data collected today may be vulnerable to future quantum attacks.

Logistics optimization applications address complex military supply chain challenges including resource allocation, transportation routing, and inventory management. These problems involve numerous constraints and competing objectives that quantum optimization algorithms can potentially address more effectively than classical approaches. Improved logistics optimization directly impacts operational readiness, deployment capabilities, and mission effectiveness.

Intelligence analysis applications leverage quantum computing to identify patterns and correlations across diverse intelligence sources. Quantum machine learning approaches may enhance predictive capabilities, anomaly detection, and pattern recognition in complex datasets that classical methods struggle to process efficiently. These capabilities could enhance threat assessment and strategic planning processes.

Sensor data processing applications use quantum computation to enhance signal detection, pattern recognition, and information extraction from complex sensor networks. Quantum algorithms may improve detection of subtle patterns across disparate data sources, enhancing situational awareness and information dominance capabilities.

Simulation and mission planning applications leverage quantum computing to model complex operational scenarios with more variables and interaction effects than classical simulations can efficiently process. These enhanced simulation capabilities may improve strategic planning, training effectiveness, and operational decision-making.

Implementation strategies for defence organisations should include developing quantum-resistant security architectures, identifying specific computational bottlenecks in current operations, establishing strategic partnerships with quantum technology providers, investing in specialized expertise development, and creating secure quantum computing environments for sensitive applications.', true, '2025-07-23 03:44:56.968452+00', NULL, false, '{"Supply Chain Management","Mission Planning",Logistics,"Post-Quantum Cryptography","Enhanced Simulation","Quantum Sensing","Inventory Management","Intelligence Systems"}'),
	('d72833ae-f810-46a3-8706-d9f72caf6d6b', 'finance', 'Finance', 'Applications of quantum computing in financial services, banking, investment, and risk management.', '2025-04-18 01:06:30.070088+00', 'The financial services industry faces computational challenges that directly impact profitability, risk management, and competitive advantage. Quantum computing offers targeted solutions to these challenges through several key applications that address fundamental computational bottlenecks in the sector.

Portfolio optimization represents the most mature quantum use case for financial institutions. The combinatorial complexity of balancing multiple assets, risk factors, constraints, and objectives creates an exponentially scaling problem ideally suited for quantum approaches. Current implementations using quantum annealers and gate-based systems demonstrate meaningful results for specific portfolio types, with hybrid quantum-classical approaches showing particular promise for near-term implementation.

Risk analysis applications leverage quantum algorithms to improve Monte Carlo simulations and value-at-risk calculations. Quantum amplitude estimation techniques offer quadratic speedups for these simulations, enabling more sophisticated risk modeling, stress testing, and regulatory compliance capabilities. These advantages become particularly significant for complex structured products and multi-factor risk models.

Derivatives pricing benefits from quantum computing through similar simulation enhancements, especially for path-dependent options and complex financial instruments. Financial institutions are actively researching quantum approaches to options pricing that balance accuracy with computational efficiency.

Fraud detection systems can leverage quantum machine learning to identify patterns across transaction datasets that might escape traditional detection methods. These capabilities enhance security measures while reducing false positives that impact customer experience.

Algorithmic trading strategies can incorporate quantum optimization to evaluate more potential scenarios in shorter timeframes, providing advantages in execution decision-making and market simulation.

Implementation strategies for financial institutions should focus on identifying specific high-value computational problems, developing quantum expertise through targeted use cases, partnering with quantum technology providers, and creating hybrid solutions that deliver incremental benefits as quantum hardware matures.

Forward-looking financial organisations are advised to establish quantum computing expertise now to maintain competitive positioning as the technology reaches commercial viability for finance-specific applications.', true, '2025-07-23 04:12:52.157415+00', NULL, false, '{"Monte Carlo Simulation","Risk Management","Portfolio Optimisation","Regulatory Compliance","Derivatives Pricing","Algorithmic Trading","Hybrid Quantum-Classical","Fraud Detection"}'),
	('3fbac019-2c76-4b8c-a956-31d3e9e3c60c', 'energy', 'Energy', 'Applications of quantum computing in energy production, distribution, storage, and optimization of power systems.', '2025-04-18 01:06:30.070088+00', 'The energy industry faces complex computational challenges throughout generation, transmission, distribution, and consumption processes that impact system efficiency, reliability, and sustainability. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Grid optimisation represents a primary application, where quantum algorithms can address complex power flow, transmission capacity, and stability challenges in increasingly distributed energy systems. These optimisation problems involve numerous constraints and competing objectives that quantum approaches may handle more effectively than classical methods. Several utilities have initiated research into quantum solutions for grid management, congestion mitigation, and outage prevention. These are often applications with direct impact on system reliability and cost.

Energy storage material discovery leverages quantum chemistry algorithms to model novel materials for batteries, hydrogen storage, and other energy storage technologies with greater accuracy than classical approximations. Quantum simulation can potentially accelerate the development of higher-capacity, faster-charging, and more durable energy storage solutions critical for renewable energy integration and grid stability.

Nuclear fusion simulation applications use quantum computing to model complex plasma behaviour and material interactions in fusion reactors. These simulations require extraordinary computational resources to capture the multi-physics interactions that determine fusion performance and containment system durability. Quantum approaches may enable more accurate simulations that accelerate fusion energy development.

Renewable energy integration applications address the stochastic nature of wind, solar, and other variable resources through improved forecasting, grid balancing, and virtual power plant optimization. Quantum algorithms offer potential advantages for processing the massive meteorological datasets while optimizing complex multi-source energy systems in real-time.

Demand forecasting capabilities may benefit from quantum machine learning through improved pattern recognition across complex consumer behaviour, weather impacts, and economic factors. More accurate demand forecasting directly impacts generation planning, energy trading, and grid stability.

Implementation strategies for energy organisations should focus on identifying specific computational bottlenecks in current operations, developing quantum expertise through targeted use cases, establishing partnerships with quantum technology providers, and creating hybrid quantum-classical approaches that can deliver incremental benefits as quantum hardware capabilities mature.', true, '2025-07-23 04:35:18.874372+00', NULL, false, '{"Grid Optimisation","Demand Forecasting","Weather Forecasting","Transmission Management","System Planning","Maintenance Planning","Outage Prevention","Economic Modelling"}'),
	('5cd02227-5ee6-4ebe-b18f-e9632d12ba00', 'telecommunications', 'Telecommunications', 'Applications of quantum computing in network optimization, spectrum management, and telecommunications infrastructure.', '2025-04-28 01:24:00.712191+00', 'The telecommunications industry faces complex computational challenges as network demands increase, spectrum resources become constrained, and infrastructure requirements expand. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Network optimization represents a fundamental application, where quantum algorithms can address complex topology design, capacity planning, and resource allocation problems. These optimisation challenges involve numerous interdependent variables and constraints that scale exponentially with network size. Quantum approaches may provide more efficient solutions for large-scale network design and dynamic resource allocation, improving performance while reducing infrastructure costs.

Spectrum management applications leverage quantum optimization to address frequency allocation challenges in increasingly congested environments. These algorithms can evaluate complex interference patterns, regulatory constraints, and service quality requirements simultaneously to maximise spectral efficiency—a critical factor as demand for wireless services continues to grow and spectrum resources remain limited.

Traffic routing optimization encompasses real-time path selection across complex networks with varying congestion patterns, quality of service requirements, and potential failure scenarios. Quantum algorithms can potentially evaluate more routing permutations while accounting for multiple constraints, improving network utilisation and service quality under dynamic conditions.

Infrastructure planning applications include equipment placement optimization, power management, and maintenance scheduling across geographically distributed networks. These capabilities can reduce capital expenditures while improving network coverage, reliability, and energy efficiency—key factors in competitive telecommunications markets.

Cybersecurity applications include both quantum-resistant cryptography implementation and quantum key distribution integration. As telecommunications providers prepare for potential quantum threats to current encryption methods, they must also consider how quantum technologies themselves offer new security capabilities through physics-based secure communication channels.

Implementation strategies for telecommunications organisations should focus on identifying specific optimization problems with clear performance metrics, developing quantum expertise through targeted use cases, establishing partnerships with quantum technology providers, and creating hybrid classical-quantum approaches that can evolve with hardware capabilities.', true, '2025-07-23 03:58:04.178273+00', NULL, false, '{"Capacity Planning","Network Design","Resource Allocation","Spectral Efficiency","Traffic Optimisation","Infrastructure Planning",Cybersecurity,"Energy Efficiency"}'),
	('03442b90-0b94-4d13-a381-04a217fcff80', 'logistics-supply-chain', 'Logistics and Supply Chain', 'Applications of quantum computing in logistics networks, supply chain management, and distribution systems.', '2025-04-28 01:23:00.650376+00', 'The logistics and supply chain industry faces increasingly complex computational challenges as networks expand globally and customer expectations for delivery speed and flexibility intensify. Quantum computing offers targeted solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Route optimisation represents the most mature quantum application for logistics providers, where quantum algorithms address complex vehicle routing problems with multiple constraints including time windows, capacity limitations, and driver scheduling requirements. These problems scale exponentially with traditional methods, but quantum approaches may provide significant performance improvements for large-scale operations. Several logistics companies have demonstrated quantum solutions that reduce fuel consumption, emissions, and operational costs.

Network design applications leverage quantum computing to optimise facility locations, capacity planning, and flow management across global supply chains. These capabilities enable organisations to balance competing objectives—cost reduction, service level improvement, and risk mitigation—more effectively than classical approaches. Quantum solutions can potentially evaluate more comprehensive network configurations while accounting for uncertainty in demand, costs, and disruption scenarios.

Inventory management applications include multi-echelon inventory optimisation across complex product portfolios with varying demand patterns, lead times, and service requirements. Quantum algorithms can determine optimal inventory policies that reduce carrying costs while maintaining service levels. These capabilities become particularly valuable for organisations managing thousands of SKUs across multiple locations.

Demand forecasting benefits from quantum machine learning techniques that identify complex patterns in historical data while incorporating multiple external variables. These approaches may reveal non-obvious correlations and improve prediction accuracy for volatile markets and seasonal products.

Warehouse management applications address complex picking, packing, and storage optimisation problems that impact operational efficiency. Quantum optimisation can potentially improve space utilisation, throughput, and labor efficiency through more sophisticated resource allocation and scheduling.

Implementation strategies for logistics organisations should focus on identifying specific optimisation problems where classical algorithms struggle, developing quantum expertise through targeted use cases, and creating hybrid approaches that can deliver incremental benefits as quantum hardware capabilities expand.', true, '2025-07-23 04:18:37.313998+00', NULL, false, '{"Route Optimisation","Network Design","Capacity Planning","Flow Management","Risk Mitigation","Inventory Management","Demand Forecasting","Warehouse Management"}'),
	('2cf5077d-9e9d-467f-a850-b32a7b1a7afe', 'healthcare', 'Healthcare', 'Applications of quantum computing in medical research, patient care, genomics, and healthcare operations.', '2025-04-18 01:06:30.070088+00', 'The healthcare industry faces significant computational challenges across research, clinical, and operational domains. Quantum computing offers potential solutions to these challenges through several key applications that address fundamental computational bottlenecks in the sector.

Genomic analysis represents a primary application area, where quantum algorithms can process large-scale genomic data to identify complex patterns and correlations that classical methods struggle to detect efficiently. These capabilities may improve disease risk prediction, enhance understanding of gene-environment interactions, and accelerate biomarker discovery. Several research institutions are exploring quantum approaches to genomic data analysis for personalised medicine applications.

Medical imaging applications leverage quantum computing for both image reconstruction and feature detection. Quantum algorithms may improve the speed and accuracy of tomographic reconstruction for MRI and CT imaging, while quantum machine learning approaches could enhance detection of subtle abnormalities across multiple imaging modalities. These capabilities directly impact diagnostic accuracy and efficiency in clinical settings.

Drug discovery applications use quantum chemistry algorithms to model molecular interactions with greater accuracy than classical methods. These capabilities can improve target identification, enhance virtual screening processes, and optimise lead compound selection—potentially reducing development timelines and costs while improving success rates for new therapeutics.

Disease modeling encompasses complex simulation of biological systems and disease progression. Quantum computing may enable more comprehensive modeling of cellular pathways, immune system responses, and treatment effects, leading to improved understanding of disease mechanisms and more effective intervention strategies.

Healthcare operations applications include patient scheduling, resource allocation, and supply chain management, often the complex optimization problems that quantum algorithms may address more effectively than classical approaches. These capabilities can potentially improve operational efficiency, reduce costs, and enhance patient care quality.

Implementation strategies for healthcare organisations should focus on identifying specific computational bottlenecks in current research or clinical workflows, establishing partnerships with quantum technology providers, developing hybrid classical-quantum methodologies, and creating proof-of-concept implementations for high-value applications.', true, '2025-07-23 04:23:06.405784+00', NULL, false, '{"Personalised Medicine","Medical Imaging Analysis","Genomic Analysis","Disease Risk Prediction","Drug Discovery","Disease Modelling","Healthcare Operations","Resource Management"}'),
	('5503546c-2a11-40cb-a337-ef48c8a8ffc1', 'government-public-sector', 'Government and Public Sector', 'Applications of quantum computing in public services, policy optimization, resource allocation, and civic operations.', '2025-04-28 01:31:25.005535+00', 'The government and public sector face complex computational challenges in resource allocation, policy modeling, and service delivery that impact operational efficiency, policy effectiveness, and citizen outcomes. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in public administration.

Policy simulation represents a promising application, where quantum algorithms can model complex socioeconomic systems and policy impacts with greater fidelity than classical approaches. These simulations can potentially evaluate more comprehensive interaction effects between policy parameters, demographic factors, and economic variables, leading to more effective policy design and implementation. Several research institutions have begun exploring quantum approaches to economic and social system modeling with public policy applications.

Resource allocation applications leverage quantum computing to optimise the distribution of limited public resources across competing priorities and constituencies. These optimization problems involve numerous constraints and objectives that quantum algorithms may address more effectively than classical approaches. Applications include budget allocation, staff scheduling, public housing assignment, and infrastructure investment prioritisation.

Urban planning applications address complex transportation, zoning, and infrastructure challenges that impact city functionality and liveability. Quantum optimisation can potentially improve traffic management, public transit routing, emergency service positioning, and urban development planning by evaluating more comprehensive solution spaces than classical methods allow.

Public health modeling applications use quantum computing to simulate disease spread, healthcare resource needs, and intervention effectiveness. These simulations must process complex social interaction patterns, geographic factors, and healthcare system constraints that quantum approaches may handle more comprehensively than classical models.

Emergency response optimization applications address resource deployment, evacuation routing, and communication network challenges during disasters. Quantum algorithms can potentially evaluate more comprehensive contingency scenarios while accounting for real-time changes in conditions and resource availability.

Implementation strategies for government organisations should focus on identifying specific computational problems with clear public impact, developing partnerships with quantum technology providers and research institutions, addressing the security implications of quantum technologies for government systems, and creating proof-of-concept implementations that demonstrate quantum advantages for public sector challenges.', true, '2025-07-23 04:28:12.201145+00', NULL, false, '{"Resource Allocation","Policy Modelling","Urban Planning","Public Health Modelling","Emergency Response Planning","Transport Optimisation","Traffic Management","Infrastructure Maintenance"}'),
	('80d3140c-9091-482a-982c-70163fed8bcf', 'materials-science', 'Materials Science', 'Applications of quantum computing in materials discovery, analysis, design, and optimization for advanced applications.', '2025-04-28 01:30:21.480752+00', 'The materials science field faces fundamental computational limitations in modeling, predicting, and designing advanced materials that impact discovery timelines, development costs, and innovation capabilities. Quantum computing offers transformative solutions to these challenges through several key applications that address specific computational bottlenecks in materials research.

Materials discovery represents the most promising application, where quantum algorithms can model electron behaviour and molecular interactions with greater accuracy than classical approximations. This capability enables more precise prediction of material properties before synthesis, potentially accelerating the discovery of novel materials with specific performance characteristics. Several research institutions and materials companies have established quantum initiatives specifically targeting the discovery of superconductors, semiconductors, battery materials, and structural compounds.

Quantum material simulation applications leverage quantum computing to model materials that exhibit quantum mechanical properties such as superconductivity, topological states, and quantum magnetism. These materials are particularly challenging to simulate with classical computers but may be more naturally represented on quantum systems, potentially leading to breakthroughs in understanding and designing quantum materials for advanced technologies.

Properties prediction applications use quantum chemistry algorithms to calculate structural, electronic, optical, and mechanical properties of materials with greater accuracy than classical methods. Improved prediction capabilities directly impact material selection and optimization for specific applications across industries from electronics to aerospace.

Catalyst design benefits from quantum computing through more accurate modeling of reaction mechanisms, transition states, and surface interactions. These capabilities can accelerate the development of more efficient catalysts for chemical processes, energy conversion, and environmental applications—addressing critical sustainability challenges.

Material defect analysis applications leverage quantum simulation to understand how atomic-scale defects impact macro-scale material properties. These insights can lead to improved manufacturing processes, more durable materials, and novel defect-based functionalities in engineered materials.

Implementation strategies for materials research organisations should focus on identifying specific computational bottlenecks in current discovery processes, developing hybrid quantum-classical workflows, establishing partnerships with quantum technology providers, and creating proof-of-concept implementations for high-value material discovery challenges.', true, '2025-07-23 04:04:19.417963+00', NULL, false, '{"Catalyst Design","Quantum Modelling","Advanced Simulation","Hybrid Quantum-Classical","Material Defect Analysis","Properties Prediction","Materials Discovery",Superconductors}'),
	('ff71cc57-063f-495c-bc23-931218e8c043', 'retail', 'Retail', 'Applications of quantum computing in retail operations, supply chain management, customer analytics, and inventory optimisation.', '2025-04-28 01:30:40.523851+00', 'The retail industry faces complex computational challenges in inventory management, logistics, pricing, and customer analytics that impact operational efficiency, customer satisfaction, and profitability. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Inventory optimization represents a primary application, where quantum algorithms can address complex stocking decisions across thousands of products, multiple locations, and fluctuating demand patterns. These optimization problems involve numerous constraints and competing objectives that quantum approaches may handle more effectively than classical methods. Several major retailers have begun exploring quantum solutions for inventory management, particularly for products with complex demand patterns, short lifecycles, or significant seasonal variations.

Pricing optimization applications leverage quantum computing to evaluate complex pricing scenarios across product portfolios while accounting for competitive dynamics, promotional effects, and customer price sensitivity. Quantum algorithms can potentially evaluate more comprehensive pricing strategies than classical approaches, optimizing for both short-term revenue and long-term customer value.

Supply chain network design applications use quantum computing to optimise facility locations, capacity planning, and distribution flows across global retail networks. These problems involve evaluating complex tradeoffs between cost, service levels, and resilience that quantum optimization may address more comprehensively than traditional methods.

Customer behaviour modeling applications leverage quantum machine learning to identify subtle patterns in customer data that might escape classical analysis. These capabilities can potentially enhance personalisation, recommendation systems, and customer segmentation strategies through more sophisticated pattern recognition and predictive modeling.

Logistics optimization applications address complex routing, scheduling, and delivery planning challenges that directly impact operational costs and customer experience. Quantum algorithms offer potential advantages for last-mile delivery optimization, store replenishment scheduling, and transportation consolidation across retail networks.

Implementation strategies for retail organisations should focus on identifying specific computational bottlenecks in current operations, developing quantum expertise through targeted use cases, establishing partnerships with quantum technology providers, and creating hybrid approaches that can deliver incremental benefits as quantum hardware capabilities mature.', true, '2025-07-23 04:08:45.504282+00', NULL, false, '{"Inventory Optimization","Supply Chain Management","Seasonal Variation","Workforce Management","Customer Behaviour Modelling","Recommendation Systems","Predictive Modelling","Logistics Optimisation"}'),
	('188500c1-6295-41ef-b5ae-6f8b03055eae', 'pharmaceutical', 'Pharmaceutical', 'Applications of quantum computing in drug discovery, molecular modeling, and pharmaceutical development processes.', '2025-04-28 01:21:46.50502+00', 'The pharmaceutical industry faces significant computational challenges throughout the drug development lifecycle, from initial discovery to manufacturing and distribution. Quantum computing offers potential solutions to these challenges through several key applications that address fundamental computational bottlenecks in the sector.

Molecular simulation represents the most promising near-term application, where quantum algorithms can model electron behavior and molecular interactions with greater accuracy than classical methods. This capability enables more precise binding affinity predictions, conformational analysis, and reaction mechanism modeling. Enhanced simulation accuracy directly impacts candidate selection and optimization, potentially reducing costly late-stage failures that plague traditional drug development.

Drug discovery applications extend beyond individual molecular simulations to encompass high-throughput virtual screening against biological targets. Quantum approaches may enable screening of larger chemical spaces while maintaining higher prediction accuracy, expanding the universe of potential therapeutic compounds. Several pharmaceutical companies have established quantum research initiatives specifically targeting these capabilities.

Protein folding and structure prediction represent computationally intensive processes critical to understanding biological targets. Quantum algorithms show promise for modeling the complex energy landscapes that determine protein structures, potentially accelerating structure determination for novel targets and enabling more accurate predictions for proteins resistant to conventional methods.

Clinical trial optimization applications leverage quantum computing to address complex patient stratification problems, treatment assignment optimization, and trial protocol design. These capabilities may improve trial success rates while reducing time and resource requirements—addressing a critical bottleneck in the development process.

Manufacturing process optimization applications include production scheduling, resource allocation, and quality control—problems with numerous constraints and objectives that quantum algorithms may address more effectively than classical approaches.

Implementation strategies for pharmaceutical organisations should focus on identifying specific computational bottlenecks in current development processes, establishing partnerships with quantum technology providers, and developing hybrid approaches that can deliver incremental benefits as quantum hardware matures.', true, '2025-07-23 03:06:36.760492+00', NULL, false, '{"Drug Discovery","Clinical Research","Regulatory Affairs",Manufacturing,Biotechnology,"Medical Devices","Vaccine Development","Personalised Medicine"}'),
	('961829fa-278f-4e04-9c5f-89e5a5ad9d8a', 'aerospace', 'Aerospace', 'Applications of quantum computing in aircraft design, space exploration, satellite systems, and aeronautical engineering.', '2025-04-28 01:28:52.718163+00', 'The aerospace industry faces intensive computational challenges in design, simulation, materials development, and mission planning that impact vehicle performance, operational efficiency, and program economics. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in the sector.

Aerodynamic simulation represents a primary application, where quantum algorithms can potentially accelerate computational fluid dynamics (CFD) calculations that currently limit design iteration cycles. Quantum approaches may enable more comprehensive exploration of design parameters, higher-fidelity simulations, and more accurate modeling of complex flow phenomena. Several aerospace manufacturers have initiated research programs to explore these capabilities for aircraft, spacecraft, and propulsion system design.

Structural analysis applications use quantum computing to optimise complex aerospace structures while satisfying multiple constraints including weight, strength, manufacturability, and cost. Quantum optimization algorithms can potentially evaluate more comprehensive design spaces than classical approaches, leading to more efficient structures that maintain required performance characteristics. These capabilities directly impact vehicle weight, payload capacity, and operational economics.

Materials discovery applications use quantum chemistry algorithms to model novel aerospace materials with specific performance requirements. Quantum simulation can more accurately predict material properties before physical testing, potentially accelerating development of advanced composites, high-temperature alloys, and multifunctional materials. These capabilities address critical needs for lighter, stronger, and more durable aerospace components.

Mission planning applications address complex trajectory optimization, resource allocation, and scheduling problems for both aircraft operations and space missions. Quantum optimization algorithms can potentially improve operational efficiency while satisfying multiple constraints including fuel consumption, timing requirements, and safety parameters.

Fault prediction and system health monitoring applications leverage quantum machine learning for pattern recognition in component performance data. These capabilities may enhance predictive maintenance programs, improve system reliability, and reduce unscheduled maintenance events.

Implementation strategies for aerospace organisations should focus on identifying specific computational bottlenecks in current design and operational workflows, developing hybrid quantum-classical approaches, establishing partnerships with quantum technology providers, and creating proof-of-concept implementations for high-value applications.', true, '2025-07-23 03:19:46.223062+00', NULL, false, '{"Physics Simulation","Materials Development","Mission Planning","Risk Management","Aerodynamic Simulation",Optimisation,"Fuel Development","Supply Chain Planning"}'),
	('189dffed-0f2f-48c8-b854-4b85cb3c2552', 'ai-machine-learning', 'AI and Machine Learning', 'Applications of quantum computing to enhance machine learning capabilities and artificial intelligence systems.', '2025-04-28 01:26:08.400223+00', 'The artificial intelligence industry faces computational challenges in training, optimization, and inference processes that impact model capabilities, training efficiency, and application scope. Quantum computing offers potential solutions to these challenges through several key applications that address specific computational bottlenecks in machine learning workflows.

Quantum neural networks represent one primary approach, where quantum circuits serve as parametrized models for supervised and unsupervised learning tasks. These quantum models can potentially represent complex functions more efficiently than classical networks for certain data types. Variational quantum circuits, which combine classical optimization with quantum feature processing, show particular promise for near-term hardware implementation. Several research groups have demonstrated proof-of-concept implementations for specific problem classes.

Feature space mapping applications leverage quantum systems to transform classical data into higher-dimensional spaces where pattern recognition becomes more effective. These quantum kernels may offer advantages for classification problems by accessing computational features that would require exponentially larger classical networks to replicate. This approach offers potential benefits even for problems where the input data is entirely classical.

Optimization of classical neural networks represents another application area, where quantum algorithms can potentially improve hyperparameter tuning, network architecture design, and training processes. These approaches aim to enhance classical AI systems through targeted application of quantum optimization techniques to specific bottlenecks in the machine learning pipeline.

Reinforcement learning applications include quantum approaches to environment simulation, policy optimization, and exploration strategies. For complex multi-agent systems and environments with large state spaces, quantum reinforcement learning may provide more efficient training methodologies and improved convergence properties.

Training data generation and augmentation may benefit from quantum generative models that can potentially represent certain probability distributions more efficiently than classical counterparts, creating synthetic data for model training and validation.

Implementation strategies for AI organizations should include identifying specific computational bottlenecks in current ML workflows, developing modular hybrid classical-quantum architectures, establishing rigorous benchmarking frameworks, and focusing on problem domains with potential for near-term quantum advantage.', true, '2025-07-23 03:22:47.624179+00', NULL, false, '{"Natural Language Processing","Computer Vision","Autonomous Systems","Deep Learning","Quantum Neural Networks",Optimisation,"Quantum Circuit Design","Hybrid Quantum-Classical"}'),
	('dfd50ac9-7178-4bf9-82ea-dd26029c8531', 'cybersecurity', 'Cybersecurity', 'Applications of quantum computing in digital security, encryption, threat detection, and risk management.', '2025-04-28 01:25:06.883756+00', 'The cybersecurity industry faces a transformative relationship with quantum computing that encompasses both significant threats and novel security capabilities. As quantum computing advances, cybersecurity organisations must develop comprehensive strategies that address emerging risks while exploring potential security enhancements through quantum technologies.

Post-quantum cryptography implementation represents an urgent priority for security professionals. Quantum computers capable of running Shor''s algorithm will compromise widely deployed public key cryptography systems including RSA, ECC, and Diffie-Hellman. Organisations must conduct cryptographic inventories, prioritise systems for transition, and implement cryptographic agility frameworks that enable migration to quantum-resistant algorithms. NIST standardisation efforts provide the foundation for this transition, with several organisations already implementing hybrid classical-quantum approaches.

Quantum key distribution (QKD) offers physics-based security guarantees for key exchange through quantum mechanical principles. While QKD systems face practical deployment challenges including distance limitations and trusted node requirements, commercial implementations demonstrate value for high-security environments. Several telecommunications and data centre providers now offer QKD services for sensitive applications.

Threat detection capabilities may benefit from quantum machine learning through improved pattern recognition and anomaly detection in security telemetry data. Quantum approaches may identify subtle correlations that indicate emerging threats or sophisticated attack patterns that evade classical detection methods. These applications remain largely exploratory but represent potential future advantages as quantum hardware capabilities mature.

Security simulation and testing applications leverage quantum computing to model complex attack scenarios and vulnerability explorations more comprehensively than classical approaches. These capabilities may enhance red team exercises, penetration testing, and security validation processes.

Implementation strategies for cybersecurity organisations should include developing quantum risk assessment methodologies, establishing post-quantum migration frameworks, tracking standardisation efforts, building quantum security expertise, and creating test environments for quantum security technologies. Organisations should pursue both defensive measures against quantum threats and strategic exploration of quantum-enhanced security capabilities.', true, '2025-07-23 03:37:04.135587+00', NULL, false, '{"Risk Management","Post-Quantum Cryptography","Incident Response","Threat Detection","Security Simulation","Penetration Testing",Encryption,"Quantum Key Distribution"}'),
	('8a38ecbe-666d-474a-8865-4fe78f0bc8ef', 'education', 'Education', 'Applications of quantum computing in educational systems, quantum literacy, and workforce development.', '2025-04-28 01:29:17.811119+00', 'The education sector faces both the challenge of preparing students for a quantum-enabled future and the opportunity to leverage quantum computing for educational optimization. Quantum computing intersects with education through several distinct pathways that impact learning, teaching, and institutional operations.

Quantum literacy development represents the most immediate priority, where educational institutions must integrate quantum concepts into curricula across disciplines. This extends beyond physics programs to include computer science, engineering, mathematics, chemistry, and business programs. Several universities and educational organisations have established quantum education initiatives that develop age-appropriate learning materials, teacher training programs, and interdisciplinary quantum curricula. These efforts aim to address the significant workforce development challenge facing quantum technology industries.

Educational resource optimization applications leverage quantum computing to address complex scheduling, staffing, and resource allocation challenges that educational institutions face. These problems involve numerous constraints and competing objectives that quantum algorithms can potentially address more effectively than classical approaches. Applications include course scheduling, classroom allocation, and transportation routing to maximise educational outcomes while minimizing costs.

Personalised learning systems may benefit from quantum machine learning approaches that can identify subtle patterns in student performance data and optimise individualised learning pathways. These capabilities could enhance adaptive learning platforms by better matching educational content and approaches to individual learning styles, knowledge states, and educational goals.

Quantum simulation applications provide educational tools that visualise and explain quantum phenomena through interactive experiences. These simulations make abstract quantum concepts more accessible to students at various educational levels and provide valuable training environments for quantum programming and algorithm development.

Implementation strategies for educational institutions should include developing quantum literacy programs appropriate to their student populations, identifying specific organisational optimization problems suitable for quantum approaches, establishing partnerships with quantum technology providers and research institutions, and creating educational resources that bridge theoretical quantum concepts with practical applications across disciplines.', true, '2025-07-23 03:52:29.667812+00', NULL, false, '{"Personalised Learning","Resource Optimisation","Quantum Literacy","Workforce Retention","Industry Partnerships","Quantum Simulation","Quantum Research","Academic Collaboration"}');


--
-- Data for Name: algorithm_industry_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."algorithm_industry_relations" ("id", "algorithm_id", "industry_id", "created_at") VALUES
	('4e41dddc-6f05-4e5b-be0a-75e5222738f4', 'edd5722d-9749-4ec9-b4a1-46f0d855814e', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-10 09:23:46.916529+00'),
	('a9107a2e-1cae-42db-bf7c-0520106ae5c8', '15f5c62d-1f8e-4986-93f0-ad7fdcf90527', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 11:18:33.88296+00'),
	('068e3be9-8769-4818-b1fb-1bdc8667c112', '15f5c62d-1f8e-4986-93f0-ad7fdcf90527', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-23 11:18:34.17209+00'),
	('ad8b04df-d8dd-434b-8508-6e15ffc24d01', '758dbf16-2b51-4c12-8351-1512a7f5ae03', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-23 11:20:48.337401+00'),
	('e0e699e9-b060-4db5-b857-db9c866eb32d', '80b08898-22b2-4d69-bf0b-9398dd0f2409', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-23 11:26:29.057656+00'),
	('d6de4b3a-08de-4391-8802-cabbb08a991d', '70021542-f2b3-4293-9fc7-60d237ed5548', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 11:32:39.082631+00'),
	('0a72fcfe-dade-4ca6-b8ea-9ec5fa416eff', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 11:39:33.436488+00'),
	('e2257ada-8d52-4c68-990c-9ee7f517435a', '462de4e7-2a6d-4a7f-8792-39141fadfb15', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 11:42:37.289358+00'),
	('7e064bfe-dd47-4828-bcb7-2940e1c5f987', '7527f1bb-5d8e-4f43-b5d9-5c41f7bb086e', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:15:55.669936+00'),
	('e1ea819e-b624-4e22-b3e6-be2c59dec01b', '5b008285-b825-4763-aab1-58b1aaf97e96', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:21:22.765498+00'),
	('d7584d21-8bf9-4a7c-bb02-27b3be1f83ad', 'ae90e8c4-4431-4b28-8e5d-10c18ff512d4', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:28:30.53542+00'),
	('f422db86-2e79-49ff-ab8a-7b0f01211dc4', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-23 13:45:01.114881+00'),
	('8e396767-22c0-4f51-b9d4-f1b40d993389', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-23 13:45:01.928602+00'),
	('64a240b1-0bd5-4965-9986-9e70e7e6b24a', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:45:02.722442+00'),
	('cf3a18b2-6e96-459d-a1b7-658c4c731372', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-23 13:45:03.024035+00'),
	('5c5d4fe1-3214-48f4-a364-0274e33eeabd', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-23 13:45:03.822276+00'),
	('2a8beb89-80ea-4d3a-8a84-c95bcbdde0bf', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-23 13:45:04.129222+00'),
	('03b2e5d1-c476-4612-9dfe-0ae60a0571ac', '95d262a3-8d0f-4c84-9c16-f1fc343ae212', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:47:25.521241+00'),
	('e5a7dc96-8156-4388-8865-52a795e6ea87', '79662c8a-14fd-4943-bed4-0d22bd47fbe0', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:49:55.158825+00'),
	('f67afb1e-b745-4815-9c19-5b3e7e9c2d2a', 'c6910ac8-71cd-4065-b7f8-1de36d4bbb8b', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:52:13.793286+00'),
	('a22172e8-8a02-4174-a71f-2c05da5466d3', '6d7e573c-1834-4bdf-847a-e598c8c5f506', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 13:59:26.954531+00'),
	('6e45b35e-1cf4-49b3-a0ae-3dda487e23e2', 'f4d3ea16-2aae-4a17-8280-08b769db955c', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 14:02:10.156474+00'),
	('be997c7d-ef39-4dc5-9c26-af75a4f9f8de', '9eaba195-477b-4658-9263-6a7d158c1269', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 14:04:21.22223+00'),
	('2a6ae70c-af74-4db9-85c6-6fd2fbb4f1aa', 'f02557be-ca5c-4b43-94c1-c37484cd6343', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-23 14:17:24.305392+00'),
	('c266634a-802f-4f20-a2b4-b99bca29587e', '3ea62960-1bdf-4429-bd2e-a42338120883', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-23 14:19:12.901926+00');


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."blog_posts" ("id", "slug", "title", "description", "content", "author", "featured_image", "category", "tags", "published", "featured", "published_at", "created_at", "updated_at", "ts_content") VALUES
	('e70aca9f-4191-4e54-8851-29a50da2be43', 'blog-title-here', 'Blog post title heres', 'This is a decription. ', 'This is the blog post. Fetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industries

## HEading

Fetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industriesFetching case studies for algorithm form...
Found 2 case studies
Found 4 industries', 'David Ryan', '', 'Anything', '{taghere}', false, false, '2025-05-08 00:00:00+00', '2025-04-25 03:19:41.790341+00', '2025-05-11 12:09:04.317347+00', '''2'':21C,33C,45C,57C,69C,81C,95C,107C,119C ''4'':25C,37C,49C,61C,73C,85C,99C,111C,123C ''algorithm'':18C,30C,42C,54C,66C,78C,92C,104C,116C ''blog'':1A,12C ''case'':15C,22C,27C,34C,39C,46C,51C,58C,63C,70C,75C,82C,89C,96C,101C,108C,113C,120C ''decript'':8B ''fetch'':14C,88C ''form'':19C,31C,43C,55C,67C,79C,93C,105C,117C ''found'':20C,24C,32C,36C,44C,48C,56C,60C,68C,72C,80C,84C,94C,98C,106C,110C,118C,122C ''head'':87C ''here'':4A ''industri'':86C,124C ''industriesfetch'':26C,38C,50C,62C,74C,100C,112C ''post'':2A,13C ''studi'':16C,23C,28C,35C,40C,47C,52C,59C,64C,71C,76C,83C,90C,97C,102C,109C,114C,121C ''titl'':3A'),
	('7da7e106-a962-4213-ae38-f652be44e9aa', 'getting-started-with-quantum-computing', 'fewrfewrfewrfng Started with Quantum Computing', 'An introduction to quantum computing concepts and applications', '# Getting Started with Quantum Computing

Quantum computing represents a paradigm shift in how we process information. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously.

## Key Concepts

### Superposition

Superposition allows qubits to exist in multiple states at once, enabling quantum computers to process a vast number of possibilities simultaneously.

### Entanglement

Quantum entanglement creates a special connection between qubits, where the state of one qubit is dependent on the state of another, regardless of the distance between them.

### Quantum Algorithms

Several quantum algorithms have been developed that demonstrate theoretical advantages over classical algorithms:

- **Shor''s Algorithm**: Efficiently factors large numbers, which could potentially break many encryption systems
- **Grover''s Algorithm**: Provides a quadratic speedup for searching unsorted databases
- **Quantum Fourier Transform**: The foundation for many quantum algorithms

## Applications

Quantum computing has potential applications in:

- **Cryptography**: Both breaking existing encryption and creating new, quantum-resistant methods
- **Drug Discovery**: Simulating molecular interactions at the quantum level
- **Optimization Problems**: Solving complex logistics and scheduling problems
- **Machine Learning**: Enhancing AI capabilities through quantum processing

## Getting Involved

Even without access to quantum hardware, you can start learning quantum computing:

1. Learn the mathematical foundations (linear algebra, complex numbers)
2. Explore quantum programming frameworks like Qiskit, Cirq, or Q#
3. Use quantum simulators to run simple algorithms
4. Join the quantum computing community through forums and open-source projects

The field is still in its early stages, making it an exciting time to get involved!', 'Quantum Expert', '', 'Education', '{"quantum computing",beginners,technology}', false, true, '2025-04-10 00:00:00+00', '2025-04-23 08:45:02.335412+00', '2025-05-11 12:08:53.213074+00', '''0s'':36C ''1'':212C ''1s'':38C ''2'':221C ''3'':231C ''4'':239C ''access'':202C ''advantag'':116C ''ai'':193C ''algebra'':218C ''algorithm'':106C,109C,119C,122C,136C,153C,238C ''allow'':57C ''anoth'':98C ''applic'':13B,154C,159C ''bit'':35C,43C ''break'':130C,163C ''capabl'':194C ''cirq'':228C ''classic'':31C,118C ''communiti'':244C ''complex'':185C,219C ''comput'':5A,10B,18C,20C,32C,40C,68C,156C,211C,243C ''concept'':11B,54C ''connect'':83C ''could'':128C ''creat'':80C,167C ''cryptographi'':161C ''databas'':144C ''demonstr'':114C ''depend'':93C ''develop'':112C ''discoveri'':174C ''distanc'':102C ''drug'':173C ''earli'':258C ''effici'':123C ''enabl'':66C ''encrypt'':132C,165C ''enhanc'':192C ''entangl'':77C,79C ''even'':200C ''excit'':263C ''exist'':48C,60C,164C ''explor'':222C ''factor'':124C ''fewrfewrfewrfng'':1A ''field'':253C ''forum'':246C ''foundat'':149C,216C ''fourier'':146C ''framework'':225C ''get'':14C,198C,266C ''grover'':134C ''hardwar'':205C ''inform'':29C ''interact'':177C ''introduct'':7B ''involv'':199C,267C ''join'':240C ''key'':53C ''larg'':125C ''learn'':191C,209C,213C ''level'':181C ''like'':226C ''linear'':217C ''logist'':186C ''machin'':190C ''make'':260C ''mani'':131C,151C ''mathemat'':215C ''method'':172C ''molecular'':176C ''multipl'':50C,62C ''new'':168C ''number'':73C,126C,220C ''one'':90C ''open'':249C ''open-sourc'':248C ''optim'':182C ''paradigm'':23C ''possibl'':75C ''potenti'':129C,158C ''problem'':183C,189C ''process'':28C,70C,197C ''program'':224C ''project'':251C ''provid'':137C ''q'':230C ''qiskit'':227C ''quadrat'':139C ''quantum'':4A,9B,17C,19C,39C,42C,67C,78C,105C,108C,145C,152C,155C,170C,180C,196C,204C,210C,223C,233C,242C ''quantum-resist'':169C ''qubit'':45C,58C,85C,91C ''regardless'':99C ''repres'':21C ''resist'':171C ''run'':236C ''schedul'':188C ''search'':142C ''sever'':107C ''shift'':24C ''shor'':120C ''simpl'':237C ''simul'':175C,234C ''simultan'':52C,76C ''solv'':184C ''sourc'':250C ''special'':82C ''speedup'':140C ''stage'':259C ''start'':2A,15C,208C ''state'':51C,63C,88C,96C ''still'':255C ''superposit'':55C,56C ''system'':133C ''theoret'':115C ''time'':264C ''transform'':147C ''unlik'':30C ''unsort'':143C ''use'':34C,41C,232C ''vast'':72C ''without'':201C'),
	('8cacf4fd-bfe7-4ded-8f1d-32fc8f2fd37b', 'ththththt', 'title here', 'description here', 'this is a text', 'david', NULL, 'generic', '{ehrher}', false, false, '2025-04-23 16:39:01.251286+00', '2025-04-23 16:38:31.246452+00', '2025-05-11 12:08:58.584726+00', '''descript'':2B ''text'':6C ''titl'':1A'),
	('ca270920-8235-4419-a3c7-78d0adb21644', 'blog-slug', 'this is a blog', 'short bit', 'longer bit goes here', 'davi', '', 'news', '{tag}', false, false, '2025-05-01 00:00:00+00', '2025-04-24 17:31:58.393836+00', '2025-05-11 06:12:54.740596+00', '''bit'':6B,8C ''blog'':4A ''goe'':9C ''longer'':7C ''short'':5B'),
	('6d2f015c-dc97-49e1-ad1b-d34f57e7cb77', 'openqase-quantum-industry-day-sydney', 'OpenQase updates and the Quantum Industry Day in Sydney', 'A quick stop in Sydney for the Quantum Industry Day at New South Wales parliament house.', 'I''m down Sydney this week for some meetings and the Quantum Industry Day being hosted at the (gorgeous) New South Wales parliament building. This is an industry event put on my my old team at Quantum Brilliance and QuEra. 

The event was genuionely interesting, and had a large attendance that seemed like a big chunk of the European and US cohort that had attended Quantum Australia, as well as government and trade representatives, consulting firms and associated implementation partners, and some general business operators. 

I parciulatly liked the presentation from [Dr Kathy Foley](https://www.chiefscientist.gov.au/about/dr-cathy-foley), the former chief scientist for Australia, as well as a leading talent in her career at CSIRO. I say this with neither malice normercy, but Dr Foley''s presentation was exponentially more valuable and insightful than those from the big consulting firms I''ve seen in the last few weeks of quantum and supercomputing events. 

I''m Australian, so I appreciate candour, and can say that Dr Foley''s talk highlighted how hand-waving and glossy the majority of the quantum computing industry talks we do are. I took that especially to heart myself, and consider that a challenge to raise the bar in what we communicate and the density at which we do it. This is unsurprisingly very relevant for OpenQase.

Speaking of which, the feedback on the day was very helpful, and a few partnerships have formed, which building upon those from the previous event at Quantum Australia, are putting some momentum behind the work. And as ever, more commits this week on the alpha: https://github.com/ddri/openqase', 'David Ryan', '', 'Blog', '{OpenQase}', true, false, '2025-03-27 00:00:00+00', '2025-05-11 06:14:36.366476+00', '2025-05-11 12:08:19.564153+00', '''/about/dr-cathy-foley),'':122C ''/ddri/openqase'':293C ''alpha'':290C ''appreci'':183C ''associ'':103C ''attend'':75C,90C ''australia'':92C,128C,273C ''australian'':180C ''bar'':226C ''behind'':278C ''big'':80C,162C ''brillianc'':63C ''build'':49C,264C ''busi'':109C ''candour'':184C ''career'':137C ''challeng'':222C ''chief'':125C ''chunk'':81C ''cohort'':87C ''commit'':285C ''communic'':230C ''comput'':205C ''consid'':219C ''consult'':100C,163C ''csiro'':139C ''day'':7A,19B,39C,253C ''densiti'':233C ''dr'':117C,148C,189C ''especi'':214C ''european'':84C ''event'':54C,67C,177C,270C ''ever'':283C ''exponenti'':153C ''feedback'':250C ''firm'':101C,164C ''foley'':119C,149C,190C ''form'':262C ''former'':124C ''general'':108C ''genuion'':69C ''github.com'':292C ''github.com/ddri/openqase'':291C ''glossi'':199C ''gorgeous'':44C ''govern'':96C ''hand'':196C ''hand-wav'':195C ''heart'':216C ''help'':256C ''highlight'':193C ''host'':41C ''hous'':25B ''implement'':104C ''industri'':6A,18B,38C,53C,206C ''insight'':157C ''interest'':70C ''kathi'':118C ''larg'':74C ''last'':170C ''lead'':133C ''like'':78C,113C ''m'':27C,179C ''major'':201C ''malic'':145C ''meet'':34C ''momentum'':277C ''neither'':144C ''new'':21B,45C ''normerci'':146C ''old'':59C ''openqas'':1A,245C ''oper'':110C ''parciulat'':112C ''parliament'':24B,48C ''partner'':105C ''partnership'':260C ''present'':115C,151C ''previous'':269C ''put'':55C,275C ''quantum'':5A,17B,37C,62C,91C,174C,204C,272C ''quera'':65C ''quick'':11B ''rais'':224C ''relev'':243C ''repres'':99C ''say'':141C,187C ''scientist'':126C ''seem'':77C ''seen'':167C ''south'':22B,46C ''speak'':246C ''stop'':12B ''supercomput'':176C ''sydney'':9A,14B,29C ''talent'':134C ''talk'':192C,207C ''team'':60C ''took'':212C ''trade'':98C ''unsurpris'':241C ''updat'':2A ''upon'':265C ''us'':86C ''valuabl'':155C ''ve'':166C ''wale'':23B,47C ''wave'':197C ''week'':31C,172C,287C ''well'':94C,130C ''work'':280C ''www.chiefscientist.gov.au'':121C ''www.chiefscientist.gov.au/about/dr-cathy-foley),'':120C'),
	('69c0bc3d-7bf1-4661-9a04-256e816f3ddf', 'shipping-alpha-version-openqase', 'Shipping the first alpha version of OpenQase', 'Let''s explore ways to showcase quantum computing business case studies (and their associated personas, industries, and algorithms).', 'About those quantum computing business cases. I wrote on LinkedIn about my frustration with lacking an open source repository for this kind of information, and mentioned an idea to explore solving this. The feedback was anecdotally in agreement. While that is nothing special in and of itself, it did echo private conversations with peers across the quantum computing industry. Enough that I put a few hours to prototype an approach to tackle this. Here''s the alpha release for OpenQase, a community resource for quantum computing use cases.

- [OpenQase 0.1.0 (Alpha)](https://github.com/ddri/openqase/releases)

This is a simple framework that has two key things. One is a repository of quantum computing business cases as published by the various quantum hardware and software vendors. The other is a "learning path" that aims to cross-relate these business cases with the personas, the algorithms, and the industries involved. 

This is very much scratching my own itch from my early days at Quantum Brilliance right up to now with OSRG. And not just for myself. Having a resource to point my various (and cross-discipline) team members to is incredibly useful. And moreso if that applies for a public audience in a way that they might choose to navigate.

As chance would have it, I recently drafted up a set of user personas on the side of some work I did for IonQ''s developer experience and API product team. And I have a selection of quantum algorithms written up from my "Pocket Guide to Quantum Algorithms" book that I originally wrote for myself (another experience of creating the "missing onboarding guide" I wish I had). 

As for the industries content, those I pulled from a quick literature review, a glance though some press releases, and maybe most of all, some time having a good think over a cup of Yokrshire tea.

The result is this alpha version. Here''s a couple of technical notes for anyone who might follow along this project.

- OpenQase is a simple NextJS application that statically renders Markdown source files.
- Storage and deployment are both (and only) local for now.
- The point of the stack is to let me explore how to inter-relate content and curate some educational user journeys.

Check it out and drop me a line with any thoughts or feedback (either via email or on my [post over on LinkedIn](https://www.linkedin.com/posts/hellodavidryan_quantumcomputing-activity-7301054976745746432-xVbi/)).

', 'David Ryan', '', 'Blog', '{Release}', true, false, '2025-03-06 00:00:00+00', '2025-05-10 08:53:22.137082+00', '2025-05-11 11:58:08.237828+00', '''/ddri/openqase/releases)'':119C ''/posts/hellodavidryan_quantumcomputing-activity-7301054976745746432-xvbi/)).'':427C ''0.1.0'':115C ''across'':80C ''agreement'':63C ''aim'':156C ''algorithm'':25B,168C,272C,281C ''along'':355C ''alpha'':4A,102C,116C,341C ''anecdot'':61C ''anoth'':289C ''anyon'':351C ''api'':262C ''appli'':220C ''applic'':363C ''approach'':95C ''associ'':21B ''audienc'':224C ''book'':282C ''brillianc'':187C ''busi'':16B,30C,137C,162C ''case'':17B,31C,113C,138C,163C ''chanc'':235C ''check'':402C ''choos'':231C ''communiti'':107C ''comput'':15B,29C,83C,111C,136C ''content'':305C,395C ''convers'':77C ''coupl'':346C ''creat'':292C ''cross'':159C,208C ''cross-disciplin'':207C ''cross-rel'':158C ''cup'':333C ''curat'':397C ''day'':184C ''deploy'':372C ''develop'':259C ''disciplin'':209C ''draft'':241C ''drop'':406C ''earli'':183C ''echo'':75C ''educ'':399C ''either'':415C ''email'':417C ''enough'':85C ''experi'':260C,290C ''explor'':10B,55C,389C ''feedback'':59C,414C ''file'':369C ''first'':3A ''follow'':354C ''framework'':124C ''frustrat'':38C ''github.com'':118C ''github.com/ddri/openqase/releases)'':117C ''glanc'':315C ''good'':329C ''guid'':278C,296C ''hardwar'':145C ''hour'':91C ''idea'':53C ''incred'':214C ''industri'':23B,84C,171C,304C ''inform'':49C ''inter'':393C ''inter-rel'':392C ''involv'':172C ''ionq'':257C ''itch'':180C ''journey'':401C ''key'':128C ''kind'':47C ''lack'':40C ''learn'':153C ''let'':8B,387C ''line'':409C ''linkedin'':35C,424C ''literatur'':312C ''local'':377C ''markdown'':367C ''mayb'':321C ''member'':211C ''mention'':51C ''might'':230C,353C ''miss'':294C ''moreso'':217C ''much'':176C ''navig'':233C ''nextj'':362C ''note'':349C ''noth'':67C ''onboard'':295C ''one'':130C ''open'':42C ''openqas'':7A,105C,114C,358C ''origin'':285C ''osrg'':193C ''path'':154C ''peer'':79C ''persona'':22B,166C,247C ''pocket'':277C ''point'':203C,381C ''post'':421C ''press'':318C ''privat'':76C ''product'':263C ''project'':357C ''prototyp'':93C ''public'':223C ''publish'':140C ''pull'':308C ''put'':88C ''quantum'':14B,28C,82C,110C,135C,144C,186C,271C,280C ''quick'':311C ''recent'':240C ''relat'':160C,394C ''releas'':103C,319C ''render'':366C ''repositori'':44C,133C ''resourc'':108C,201C ''result'':338C ''review'':313C ''right'':188C ''scratch'':177C ''select'':269C ''set'':244C ''ship'':1A ''showcas'':13B ''side'':250C ''simpl'':123C,361C ''softwar'':147C ''solv'':56C ''sourc'':43C,368C ''special'':68C ''stack'':384C ''static'':365C ''storag'':370C ''studi'':18B ''tackl'':97C ''tea'':336C ''team'':210C,264C ''technic'':348C ''thing'':129C ''think'':330C ''though'':316C ''thought'':412C ''time'':326C ''two'':127C ''use'':112C,215C ''user'':246C,400C ''various'':143C,205C ''vendor'':148C ''version'':5A,342C ''via'':416C ''way'':11B,227C ''wish'':298C ''work'':253C ''would'':236C ''written'':273C ''wrote'':33C,286C ''www.linkedin.com'':426C ''www.linkedin.com/posts/hellodavidryan_quantumcomputing-activity-7301054976745746432-xvbi/)).'':425C ''yokrshir'':335C'),
	('97b4f968-fb42-498c-a5b0-ab9678885e27', 'introducing-openqase-beta-release', 'Introducing the OPenQase Beta release ', '', '', '', '', '', '{}', false, false, '2025-05-15 00:00:00+00', '2025-05-10 16:50:02.131901+00', '2025-05-11 06:12:13.150215+00', '''beta'':4A ''introduc'':1A ''openqas'':3A ''releas'':5A'),
	('1856ef76-0248-4faa-8678-12be850d80ac', 'werfewrfewrf', 'ewrfewrferf', '', '', 'ewrfewrfewrf', '', '', '{}', false, false, '2025-04-17 00:00:00+00', '2025-05-11 06:13:37.707789+00', '2025-05-11 06:13:37.707789+00', '''ewrfewrferf'':1A'),
	('0318570f-a181-434c-8939-3140992522fe', 'hello-world-openqase-open-repository-quantum-computing-business-cases', 'Hello World! Let''s talk quantum computing business cases.', 'What is a quantum computer useful for? It''s a question that even the quantum industry isn''t always sure about.', 'Hello (quantum) world, let''s talk about being useful. 

One of the challenges I had when I joined Quantum Brilliance as the first product manager was something that anyone on the business side of the industry will relate to. And that was being able to answer "what could a quantum computer be useful for?".

It sounds so simple, doesn''t it? The very reason that commercial risk capital is invested into quantum computing is the chance of a commercially viable outcome. We should be able to answer this question with confidence and in step with the progress being made from the R&D side of the industry.

In reality we can''t. And we don''t. 

## Thinking about quantum utility

Have you ever seen that [Bell Curve meme](https://imgflip.com/i/9thttc)? I can picture our version of it, with a title of "what is a quantum computer good for?", and either extreme simply saying "I don''t know". 

Whats in the middle? A whole lot of increasingly AI-written chatter about the power of quantum computing to revolutionise this or that. By the time this narrative filters through scientific papers, texts, technology media coverage and hits the social consciousness (via social media), it''s all just a bit... too much.

Like most AI slop on the topic of Deep Tech in practical terms, these definitions and descriptions are directionally correct, but are substantively empty. And we don''t really, truly, know if the various systems we are developing, across the various modalities and via various methods, are practically useful when it comes to the actual performance of our chosen algorithms in the intended problem spaces.

The work of finding this out is hard and rewarding and engaging and what many of us do week to week. And I can only speak for myself here, but it''s not always easy to keep up with what''s happening and changing across the various quantum fronts. The reason for that is often a result of the actual work veering towards a hyper-specialised exploration, even for those of us pulled in via relatively generalist roles. Diving deep and then coming up for air sounds poetic, but can be an exhausting context switch for various roles straddling both the business and technology of quantum computing. 

And spare a thought for the newcomers, be they business decision makers or domain experts, looking to understand where things are at right now, without having to sit through the same stories about cats, slits, or spooky this-or-that. "What can a QPU do for me", is a valid question. We need to be able to better answer that in ways that shorten the distance between question and contextual answer.

## Working the problem

So let''s experiment with that idea. There ARE some great business intelligence services catering to quantum computing, such as data platform from [The Quantum Insider and Resonance](https://thequantuminsider.com/data/?utm_source=openqase&utm_medium=blog&utm_campaign=openqaseblog), research groups like [Futurum](https://futurumgroup.com/) and Hyperion Research, and individuals like [Dr Bob Sutor](https://sutorgroupintelligenceandadvisory.com). 

I like these and the people working on them a great deal. But coming from a major open source company, and being influenced directly by my time with the founding CEO, I keep thinking that the kind of information I wish I had access to when I joined Quantum Brilliance wasn''t nuanced business analysis, collated and synthesised by domain experts. 

All I really wanted was a general overview of the market at the moment, what led to this point in time, and how everything related. I just needed the "wikipedia level" of quantum business landscape. And if that resource could THEN help point to the experts in various areas of interest, then this wouldn''t be a hurdle to the other specialised industry observers, but a resource. To educate the wider market more easily doesn''t detract from the analysts with deep insights. It brings more people with more specific questions (and ideally budgets) to work on more specific things. 

## Turning theory into action

So that''s the theory. Now what might that look like? I''m not sure, but I''m going to experiment with this problem space, and see what we come up with. I don''t just want to make "yet another directory". Nor step on the toes of the experts on the analyst side of things. But I do know this is a real problem I''ve felt, my various teams have felt, and has enough commonality in the community around me that it''s worth exploring. Ideally as an open source project. Let''s see how we go.', 'David Ryan', '', 'Blog', '{Opensource}', true, false, '2025-02-28 00:00:00+00', '2025-05-10 09:40:33.627021+00', '2025-05-11 11:59:17.399636+00', '''/)'':526C ''/data/?utm_source=openqase&utm_medium=blog&utm_campaign=openqaseblog),'':519C ''/i/9thttc)?'':160C ''abl'':73C,114C,470C ''access'':580C ''across'':279C,350C ''action'':701C ''actual'':295C,365C ''ai'':198C,243C ''ai-written'':197C ''air'':392C ''algorithm'':300C ''alway'':28B,339C ''analysi'':591C ''analyst'':677C,754C ''anoth'':742C ''answer'':75C,116C,473C,485C ''anyon'':58C ''area'':646C ''around'':782C ''bell'':155C ''better'':472C ''bit'':238C ''bob'':534C ''brillianc'':49C,586C ''bring'':682C ''budget'':691C ''busi'':8A,61C,408C,423C,500C,590C,631C ''capit'':97C ''case'':9A ''cat'':447C ''cater'':503C ''ceo'':567C ''challeng'':42C ''chanc'':105C ''chang'':349C ''chatter'':200C ''chosen'':299C ''collat'':592C ''come'':292C,389C,550C,731C ''commerci'':95C,108C ''common'':778C ''communiti'':781C ''compani'':556C ''comput'':7A,14B,80C,102C,176C,206C,413C,506C ''confid'':120C ''conscious'':229C ''context'':400C ''contextu'':484C ''correct'':260C ''could'':77C,637C ''coverag'':224C ''curv'':156C ''d'':132C ''data'':509C ''deal'':548C ''decis'':424C ''deep'':249C,386C,679C ''definit'':255C ''descript'':257C ''detract'':674C ''develop'':278C ''direct'':259C,560C ''directori'':743C ''distanc'':480C ''dive'':385C ''doesn'':88C,672C ''domain'':427C,596C ''dr'':533C ''easi'':340C ''easili'':671C ''educ'':666C ''either'':180C ''empti'':264C ''engag'':317C ''enough'':777C ''even'':22B,374C ''ever'':152C ''everyth'':621C ''exhaust'':399C ''experi'':492C,722C ''expert'':428C,597C,643C,751C ''explor'':373C,788C ''extrem'':181C ''felt'':769C,774C ''filter'':217C ''find'':309C ''first'':52C ''found'':566C ''front'':354C ''futurum'':523C ''futurumgroup.com'':525C ''futurumgroup.com/)'':524C ''general'':604C ''generalist'':383C ''go'':720C,800C ''good'':177C ''great'':499C,547C ''group'':521C ''happen'':347C ''hard'':313C ''hello'':1A,30C ''help'':639C ''hit'':226C ''hurdl'':655C ''hyper'':371C ''hyper-specialis'':370C ''hyperion'':528C ''idea'':495C ''ideal'':690C,789C ''imgflip.com'':159C ''imgflip.com/i/9thttc)?'':158C ''increas'':196C ''individu'':531C ''industri'':25B,65C,136C,660C ''influenc'':559C ''inform'':575C ''insid'':514C ''insight'':680C ''intellig'':501C ''intend'':303C ''interest'':648C ''invest'':99C ''isn'':26B ''join'':47C,584C ''keep'':342C,569C ''kind'':573C ''know'':187C,271C,761C ''landscap'':632C ''led'':613C ''let'':3A,33C,490C,795C ''level'':628C ''like'':241C,522C,532C,538C,712C ''look'':429C,711C ''lot'':194C ''m'':714C,719C ''made'':128C ''major'':553C ''make'':740C ''maker'':425C ''manag'':54C ''mani'':320C ''market'':608C,669C ''media'':223C,232C ''meme'':157C ''method'':286C ''middl'':191C ''might'':709C ''modal'':282C ''moment'':611C ''much'':240C ''narrat'':216C ''need'':467C,625C ''newcom'':420C ''nuanc'':589C ''observ'':661C ''often'':360C ''one'':39C ''open'':554C,792C ''outcom'':110C ''overview'':605C ''paper'':220C ''peopl'':542C,684C ''perform'':296C ''pictur'':163C ''platform'':510C ''poetic'':394C ''point'':616C,640C ''power'':203C ''practic'':252C,288C ''problem'':304C,488C,725C,766C ''product'':53C ''progress'':126C ''project'':794C ''pull'':379C ''qpu'':458C ''quantum'':6A,13B,24B,31C,48C,79C,101C,148C,175C,205C,353C,412C,505C,513C,585C,630C ''question'':20B,118C,465C,482C,688C ''r'':131C ''real'':765C ''realiti'':138C ''realli'':269C,600C ''reason'':93C,356C ''relat'':67C,382C,622C ''research'':520C,529C ''reson'':516C ''resourc'':636C,664C ''result'':362C ''revolutionis'':208C ''reward'':315C ''right'':436C ''risk'':96C ''role'':384C,404C ''say'':183C ''scientif'':219C ''see'':728C,797C ''seen'':153C ''servic'':502C ''shorten'':478C ''side'':62C,133C,755C ''simpl'':87C ''simpli'':182C ''sit'':441C ''slit'':448C ''slop'':244C ''social'':228C,231C ''someth'':56C ''sound'':85C,393C ''sourc'':555C,793C ''space'':305C,726C ''spare'':415C ''speak'':331C ''specialis'':372C,659C ''specif'':687C,696C ''spooki'':450C ''step'':123C,745C ''stori'':445C ''straddl'':405C ''substant'':263C ''sure'':29B,716C ''sutor'':535C ''sutorgroupintelligenceandadvisory.com'':536C ''switch'':401C ''synthesis'':594C ''system'':275C ''talk'':5A,35C ''team'':772C ''tech'':250C ''technolog'':222C,410C ''term'':253C ''text'':221C ''theori'':699C,706C ''thequantuminsider.com'':518C ''thequantuminsider.com/data/?utm_source=openqase&utm_medium=blog&utm_campaign=openqaseblog),'':517C ''thing'':433C,697C,757C ''think'':146C,570C ''this-or-that'':451C ''thought'':417C ''time'':214C,563C,618C ''titl'':170C ''toe'':748C ''topic'':247C ''toward'':368C ''truli'':270C ''turn'':698C ''understand'':431C ''us'':322C,378C ''use'':15B,38C,82C,289C ''util'':149C ''valid'':464C ''various'':274C,281C,285C,352C,403C,645C,771C ''ve'':768C ''veer'':367C ''version'':165C ''via'':230C,284C,381C ''viabl'':109C ''want'':601C,738C ''wasn'':587C ''way'':476C ''week'':324C,326C ''what'':188C ''whole'':193C ''wider'':668C ''wikipedia'':627C ''wish'':577C ''without'':438C ''work'':307C,366C,486C,543C,693C ''world'':2A,32C ''worth'':787C ''wouldn'':651C ''written'':199C ''yet'':741C'),
	('3d818fd5-4507-4bf4-b48e-a020a26f8627', 'openqase-aps-march-meeting-2025-nvidia-gtc-conference', 'A busy week in the business and science of physics (with APS and GTC)', 'A busy week for our little team attending the APS Meeting and Nvidia''s GTC 2025.', 'Much like last week''s post being cut short due to the Supercomputing Asia 2025 conference, tis week myself and some collaborators (including the brilliant Anastasia Marchenkova) are caught up with some other major events. The major of which are the [American Physical Society](https://www.aps.org/events/2025/joint-meeting) (care of the infamous and incredible APS Meeting) being held in Anaheim, and [Nvidia''s GTC](https://www.nvidia.com/gtc/) being held in Silicon Valley. 

APS will be interesting for the discussion around Microsoft''s current media cycle for the Majorana project. I expect there will be standing room only for the talk there. And as for GTC, I''m living vicariously through Anastasia for that one, who is invited to one of the private Q&A sessions with Jensen Huang. There''s a few other things, but the cadence is pretty much the same, above and beyond meetings related to work, and our various alumni groups (be it industry or vocation), it''s a good chance to keep digging into the lived experiences of the people we''re hoping to serve here with OpenQase.

And speaking of which, I''ve been finding time in what I call "the Qantas WeWork", aka the airport lounge that''s a strangely productive place to work between flights, to apply the feedback from everyone checking out the alpha and getting involved. Thank you. Here''s the latest build on GitHub: https://github.com/ddri/openqase', 'David Ryan', '', 'Blog', '{APS}', true, false, '2025-03-20 00:00:00+00', '2025-05-11 06:43:59.33126+00', '2025-05-11 12:01:28.900885+00', '''/ddri/openqase'':266C ''/events/2025/joint-meeting)'':77C ''/gtc/)'':96C ''2025'':30B,45C ''airport'':230C ''aka'':228C ''alpha'':251C ''alumni'':182C ''american'':72C ''anaheim'':89C ''anastasia'':56C,140C ''ap'':12A,24B,84C,102C ''appli'':243C ''around'':109C ''asia'':44C ''attend'':22B ''beyond'':174C ''brilliant'':55C ''build'':261C ''busi'':2A,6A,16B ''cadenc'':166C ''call'':224C ''care'':78C ''caught'':59C ''chanc'':193C ''check'':248C ''collabor'':52C ''confer'':46C ''current'':112C ''cut'':38C ''cycl'':114C ''dig'':196C ''discuss'':108C ''due'':40C ''event'':65C ''everyon'':247C ''expect'':120C ''experi'':200C ''feedback'':245C ''find'':219C ''flight'':241C ''get'':253C ''github'':263C ''github.com'':265C ''github.com/ddri/openqase'':264C ''good'':192C ''group'':183C ''gtc'':14A,29B,93C,134C ''held'':87C,98C ''hope'':206C ''huang'':157C ''includ'':53C ''incred'':83C ''industri'':186C ''infam'':81C ''interest'':105C ''invit'':146C ''involv'':254C ''jensen'':156C ''keep'':195C ''last'':33C ''latest'':260C ''like'':32C ''littl'':20B ''live'':137C,199C ''loung'':231C ''m'':136C ''major'':64C,67C ''majorana'':117C ''marchenkova'':57C ''media'':113C ''meet'':25B,85C,175C ''microsoft'':110C ''much'':31C,169C ''nvidia'':27B,91C ''one'':143C,148C ''openqas'':211C ''peopl'':203C ''physic'':10A,73C ''place'':237C ''post'':36C ''pretti'':168C ''privat'':151C ''product'':236C ''project'':118C ''q'':152C ''qanta'':226C ''re'':205C ''relat'':176C ''room'':125C ''scienc'':8A ''serv'':208C ''session'':154C ''short'':39C ''silicon'':100C ''societi'':74C ''speak'':213C ''stand'':124C ''strang'':235C ''supercomput'':43C ''talk'':129C ''team'':21B ''thank'':255C ''thing'':163C ''time'':220C ''tis'':47C ''valley'':101C ''various'':181C ''ve'':217C ''vicari'':138C ''vocat'':188C ''week'':3A,17B,34C,48C ''wework'':227C ''work'':178C,239C ''www.aps.org'':76C ''www.aps.org/events/2025/joint-meeting)'':75C ''www.nvidia.com'':95C ''www.nvidia.com/gtc/)'':94C'),
	('b4ce9acb-38d0-4066-8fe0-2d8609fed60c', 'supercomputing-asia-2025-pawsey-supercomputing', 'Supercomputing Asia 2025 (with Pawsey Supercomputing et al).', 'A week in Singapore for Supercomputing Asia 2025, and some additional user interviews and alpha version feedback sessions.', 'Only a quick post this week as I''m at Supercomputing Asia 2025 in Singapore for the week. While it might be accurate to think of this as the southern hemisphere version of the Supercomputing USA event, there''s a lot more value and purpose for the conference beyond that. 

The APAC region is a fascinating and unique area with its own set of challenges and requirements. Coming from Australia originally, but working across Asia, I find the specificity of the use cases in high-context cultures to be immensely rewarding (and challenging) to work on.

While the major focus on my time this week is related to my work with OSRG, I will be taking meetings to discuss OpenQase, or more accurately, to discuss the problem space and gather more insights. I''m also going to spend time with the wonderful team from Pawsey Supercomputing Research Centre, who are an incredible supercomputing centre over in Perth, Australia, and were the first partners of Quantum Brilliance in my time working at the latter.

I included the case study of Quantum Brilliance and Pawsey in the OpenQase Cast Studies section although it does prompt the question of where to draw the line between "commercial business case" and "commercial or vendor partnerships". It''s too early in the project to draw some hard lines around the semantics just yet, but this will prove to be one of the interest challenges, above and beyond just acquiring and sorting and maintaining an appropriate amount of data. As I said earlier, I don''t want to make a directory, I want to make a curation that moves a user through the learning journey at a faster rate than being left on their own, so that might be a north star to help work out where to draw those lines.

In the meantime, SCA2025 continues, and there''s an incredible cast of speakers and attendees even above and beyond the day job meetings and milestones. Would that we all never take the community events for granted. ', 'David Ryan', '', 'Blog', '{SCA2025}', true, false, '2025-03-13 00:00:00+00', '2025-05-11 06:34:56.99767+00', '2025-05-11 12:02:13.544595+00', '''2025'':3A,16B,39C ''accur'':49C,150C ''acquir'':270C ''across'':100C ''addit'':19B ''al'':8A ''alpha'':23B ''also'':162C ''although'':217C ''amount'':277C ''apac'':78C ''appropri'':276C ''area'':85C ''around'':250C ''asia'':2A,15B,38C,101C ''attende'':346C ''australia'':96C,185C ''beyond'':75C,268C,350C ''brillianc'':193C,208C ''busi'':231C ''case'':109C,204C,232C ''cast'':214C,342C ''centr'':175C,181C ''challeng'':91C,120C,265C ''come'':94C ''commerci'':230C,234C ''communiti'':364C ''confer'':74C ''context'':113C ''continu'':336C ''cultur'':114C ''curat'':297C ''data'':279C ''day'':352C ''directori'':291C ''discuss'':146C,152C ''draw'':226C,246C,329C ''earli'':241C ''earlier'':283C ''et'':7A ''even'':347C ''event'':63C,365C ''fascin'':82C ''faster'':308C ''feedback'':25B ''find'':103C ''first'':189C ''focus'':127C ''gather'':157C ''go'':163C ''grant'':367C ''hard'':248C ''help'':324C ''hemispher'':57C ''high'':112C ''high-context'':111C ''immens'':117C ''includ'':202C ''incred'':179C,341C ''insight'':159C ''interest'':264C ''interview'':21B ''job'':353C ''journey'':305C ''latter'':200C ''learn'':304C ''left'':312C ''line'':228C,249C,331C ''lot'':67C ''m'':35C,161C ''maintain'':274C ''major'':126C ''make'':289C,295C ''meantim'':334C ''meet'':144C,354C ''might'':47C,318C ''mileston'':356C ''move'':299C ''never'':361C ''north'':321C ''one'':261C ''openqas'':147C,213C ''origin'':97C ''osrg'':139C ''partner'':190C ''partnership'':237C ''pawsey'':5A,172C,210C ''perth'':184C ''post'':30C ''problem'':154C ''project'':244C ''prompt'':220C ''prove'':258C ''purpos'':71C ''quantum'':192C,207C ''question'':222C ''quick'':29C ''rate'':309C ''region'':79C ''relat'':134C ''requir'':93C ''research'':174C ''reward'':118C ''said'':282C ''sca2025'':335C ''section'':216C ''semant'':252C ''session'':26B ''set'':89C ''singapor'':12B,41C ''sort'':272C ''southern'':56C ''space'':155C ''speaker'':344C ''specif'':105C ''spend'':165C ''star'':322C ''studi'':205C,215C ''supercomput'':1A,6A,14B,37C,61C,173C,180C ''take'':143C,362C ''team'':170C ''think'':51C ''time'':130C,166C,196C ''uniqu'':84C ''usa'':62C ''use'':108C ''user'':20B,301C ''valu'':69C ''vendor'':236C ''version'':24B,58C ''want'':287C,293C ''week'':10B,32C,44C,132C ''wonder'':169C ''work'':99C,122C,137C,197C,325C ''would'':357C ''yet'':254C');


--
-- Data for Name: blog_post_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."blog_post_relations" ("id", "blog_post_id", "related_blog_post_id", "relation_type", "created_at") VALUES
	('cff7ebe2-9c6f-4041-b759-92c1d921dc94', 'e70aca9f-4191-4e54-8851-29a50da2be43', '7da7e106-a962-4213-ae38-f652be44e9aa', 'related', '2025-05-11 06:12:42.311619+00'),
	('5466a4f7-e895-44e7-839c-03354a836706', 'e70aca9f-4191-4e54-8851-29a50da2be43', 'ca270920-8235-4419-a3c7-78d0adb21644', 'related', '2025-05-11 06:12:42.321975+00'),
	('fecd6e1f-08ca-48f0-bff7-7dbefeaf451f', '69c0bc3d-7bf1-4661-9a04-256e816f3ddf', 'ca270920-8235-4419-a3c7-78d0adb21644', 'related', '2025-05-11 11:58:08.274973+00'),
	('046e7b47-69fd-4c95-94de-798b1aa9aaba', 'b4ce9acb-38d0-4066-8fe0-2d8609fed60c', '0318570f-a181-434c-8939-3140992522fe', 'related', '2025-05-11 12:02:13.594883+00');


--
-- Data for Name: case_study_industry_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."case_study_industry_relations" ("id", "case_study_id", "industry_id", "created_at") VALUES
	('2e458865-308c-46f5-9cc1-55c90ed0bfe1', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 07:50:04.644946+00'),
	('547bf4c3-e48b-4bf6-bc0f-673a2de0f9c2', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-22 07:50:04.644946+00'),
	('8e4f4331-df9d-4c18-bc9e-ca91b37d6899', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-22 07:50:04.644946+00'),
	('c9c2d2e9-7ca4-497d-9b15-619256cd2cfd', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-22 07:50:04.644946+00'),
	('e1684039-a8bc-49cb-bdfa-c2faaca35151', '1725a92a-e804-4fb6-af66-5b7bc875834f', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 06:12:24.160103+00'),
	('fd69fa4e-b8d0-4131-ba6c-78116923d3e6', 'f2b23a03-f51f-488f-aaba-13c3610c6385', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 15:25:29.841668+00'),
	('f87ea007-a281-4dac-b0e6-dc87c6e74dc3', 'f2b23a03-f51f-488f-aaba-13c3610c6385', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-22 15:25:29.841668+00'),
	('3eae8b2a-cd4e-4b1c-b2f7-d7a38a57f0a3', '99916798-d04e-46af-b496-970de5b2d2f5', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 13:31:21.690341+00'),
	('a7da3792-1971-4547-bf44-7b5943064ee5', '99916798-d04e-46af-b496-970de5b2d2f5', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-22 13:31:21.690341+00'),
	('ea2b1ce0-a2fb-4817-aa64-49b6f149f383', 'bdc1d580-4643-4156-a148-45e63cb44342', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-10 11:21:11.007932+00'),
	('e6e8d618-3ffc-49c7-8ab7-c36866c08d6c', 'bdc1d580-4643-4156-a148-45e63cb44342', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-10 11:21:11.007932+00'),
	('fcc37958-2bfb-40a8-b4f7-2c39f5b0d82a', 'bdc1d580-4643-4156-a148-45e63cb44342', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-10 11:21:11.007932+00'),
	('30352a37-8635-47de-acf3-4e85fd0547ac', 'bdc1d580-4643-4156-a148-45e63cb44342', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-10 11:21:11.007932+00'),
	('79871ae3-0241-4d47-904d-eccd724b3d16', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-22 06:26:48.263882+00'),
	('aff081d4-2ec9-4504-86bd-69599accc44e', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 06:26:48.263882+00'),
	('035278f7-e913-40be-aeda-5b987d077253', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-22 06:26:48.263882+00'),
	('d2ff2a8a-fe3e-48d3-a936-84120f372bd3', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 06:26:48.263882+00'),
	('f19b154d-eb69-4698-b3a0-037cadf08299', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-22 06:26:48.263882+00'),
	('cefd3919-5b61-4d66-974b-6647acc8a531', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-22 06:26:48.263882+00'),
	('797174e4-83aa-4188-bb2b-b0aff3cbcc80', '833b4b11-7998-464d-96b5-c1c09376d81a', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-22 10:22:52.662167+00'),
	('0cd59c9e-0322-4aed-807b-ad4f957214f3', '833b4b11-7998-464d-96b5-c1c09376d81a', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 10:22:52.662167+00'),
	('20553677-d384-426d-b174-209f3aabe406', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 06:29:00.252981+00'),
	('99144ede-5424-49ab-93c4-b1f2753725de', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 06:29:00.252981+00'),
	('38d3c2d3-42d1-4aeb-8076-47358728d535', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-22 06:29:00.252981+00'),
	('97e32fa8-6804-4513-b710-2956ce4b2520', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 06:29:00.252981+00'),
	('715ed8f1-034f-4b0a-8ea3-da8cc65ea0bb', '9e039b07-ad28-4612-abf8-718d89bb4cc2', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-22 06:31:04.458035+00'),
	('0b2a6697-b11c-480d-ac4f-7dcd1bb73178', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 06:42:07.199601+00'),
	('17e33f2f-8381-4846-aa93-c3590ce88912', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 06:42:07.199601+00'),
	('dfb5090a-4980-478f-bfe5-e630ec6ead5d', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-22 06:42:07.199601+00'),
	('02bdceb9-0c33-4ca4-816e-9149af1ea398', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', 'ff71cc57-063f-495c-bc23-931218e8c043', '2025-07-22 06:42:07.199601+00'),
	('e56654dc-8da1-4915-a4c1-a2aacd8492fc', '99224120-7ece-4b81-9eac-e04716eee201', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 06:44:05.115586+00'),
	('124660c6-9e58-4255-92ab-7e6efcbb50cd', 'b0a580db-244f-4360-8190-3f8b39457edd', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-05-07 07:42:44.583874+00'),
	('f5b2f8c5-d451-45dc-bc79-d33f1107ea42', 'b0a580db-244f-4360-8190-3f8b39457edd', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-05-07 07:42:44.588647+00'),
	('5a4d35b0-024d-41ab-839f-d1f1c976048e', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-22 10:33:10.6728+00'),
	('2d1601f3-93db-4ac0-b46b-fd74f8b0d26f', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 10:33:10.6728+00'),
	('14e53cc6-9d1b-4e19-9c79-5bc5f914c60e', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 10:33:10.6728+00'),
	('0a2a0791-0639-412e-98ac-3a4bb6d53234', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-05-07 10:33:08.74519+00'),
	('71268c5a-e28d-4e88-ae05-54e644ba98be', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '2987e482-87ed-42da-9013-6d19358350eb', '2025-05-07 10:33:08.749405+00'),
	('f768fb05-a388-4742-ada6-1c3d6815b204', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 06:58:44.017072+00'),
	('dd216b8d-5069-400f-835d-660b9b7ea589', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-22 06:58:44.017072+00'),
	('ef5cb60f-744f-4346-bda9-8717f4770511', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 06:58:44.017072+00'),
	('32261e88-e4b1-4f05-b6f3-7e3f2a6c0cff', '5bc389e7-9689-4409-aaea-4562dea188da', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 07:21:31.044504+00'),
	('071521a7-7b3f-4ee0-a15e-5c8a5eb9a5f3', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-22 13:07:58.800862+00'),
	('4422f805-77d9-4f59-8573-949d8f98b925', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 13:07:58.800862+00'),
	('3cd93d7d-e7ff-4dd1-8e95-87c779069a5c', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 13:07:58.800862+00'),
	('dd9410f2-c166-4b29-a0bb-49db9eddbd12', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-22 13:14:23.633423+00'),
	('9ce89052-984d-4cd6-b013-67221cfa831b', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-22 13:14:23.633423+00'),
	('42e930ed-6c16-4f94-bfd3-282c61d538bd', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 13:14:23.633423+00'),
	('d71a7fe2-bd81-474c-9ff9-d00036f66de1', '6560ef0b-87f5-4203-8826-23202351903e', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 14:54:11.302916+00'),
	('59b63dcf-4d66-4b3f-8be7-ae2c9c25204e', '6560ef0b-87f5-4203-8826-23202351903e', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-22 14:54:11.302916+00'),
	('ecab19e6-cda5-4ecc-a650-c38874008e2d', '6560ef0b-87f5-4203-8826-23202351903e', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 14:54:11.302916+00'),
	('b2f75899-57bd-4561-9b30-b216d2c5a707', '6560ef0b-87f5-4203-8826-23202351903e', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 14:54:11.302916+00'),
	('bfc829b1-f0e5-4902-a04d-208b4aa5d253', '6560ef0b-87f5-4203-8826-23202351903e', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-22 14:54:11.302916+00'),
	('ba92ad91-5f6a-4270-b5b5-e140e4b5bc11', 'af449569-c8e6-4ff5-8e04-bb75645465e5', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-22 15:11:45.450789+00'),
	('0894a4b8-e724-4918-9dea-df0a364dac17', 'af449569-c8e6-4ff5-8e04-bb75645465e5', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-22 15:11:45.450789+00'),
	('aff84eec-6094-438e-b535-b9479d5a409f', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-22 15:22:30.922543+00'),
	('ac421849-6f18-4194-a01a-17e429b976f3', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-22 13:24:05.629597+00'),
	('e5978584-ae23-4433-b217-01bf993381ac', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-22 13:24:05.629597+00'),
	('3827a153-4781-4027-808b-c62c882ad42c', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-22 13:24:05.629597+00'),
	('af08dac9-8219-47fc-817a-081918d0ba15', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-22 13:24:05.629597+00'),
	('f44e8f73-65c6-4d5f-8054-301c0c26b321', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-22 13:24:05.629597+00'),
	('d398da65-1610-47d8-9daa-867e67562929', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-22 13:24:05.629597+00'),
	('52fd84be-cc35-4d5a-bece-3c1d2b7a3380', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-22 13:24:05.629597+00'),
	('e8a1c40b-be85-4af2-a2ad-82c46c3128e5', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-22 13:24:05.629597+00'),
	('5623bb1c-7113-4d5d-85d0-df9f9036d7b4', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-22 15:22:30.922543+00');


--
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."personas" ("id", "slug", "name", "description", "expertise", "created_at", "main_content", "published", "updated_at", "published_at", "recommended_reading", "is_system_record") VALUES
	('fd66f479-4e78-4b6b-94fd-5d1eba412827', 'quantum-hardware-engineer', 'Quantum Hardware Engineer', 'Develop the physical components and systems of quantum computation, from qubits and control electronics to system integration.', '{"Design and Fabrication","Quantum Control Systems","System Integration","Performance Characterisation","Quantum Hardware","Error Correction","Cryogenic Cooling",Photonics}', '2025-04-28 02:13:54.669768+00', 'Quantum Hardware Engineers design and develop the physical systems that enable quantum computation. These specialists combine expertise in quantum physics, materials science, electrical engineering, and cryogenic systems to create functional quantum processing units and their supporting infrastructure.

These engineers work across multiple quantum hardware implementations, including superconducting circuits, trapped ions, photonic systems, quantum dots, neutral atoms, and topological approaches. Each platform presents distinct engineering challenges requiring specialised knowledge of the relevant physical systems and their operational parameters.

A primary function involves designing and fabricating quantum bits (qubits) with sufficient coherence times, gate fidelities, and scalability potential. This requires precise material selection, nano-fabrication techniques, and extensive characterisation processes. Engineers must optimise qubit designs to balance competing requirements including coherence time, operation speed, coupling strength, and readout fidelity.

Quantum Hardware Engineers develop the control and measurement systems necessary for quantum processor operation. This includes designing microwave electronics, optical systems, or other platform-specific control mechanisms capable of precise quantum state manipulation. These systems must operate with extremely low noise levels, precise timing, and appropriate bandwidths for the specific quantum implementation.

These specialists implement error mitigation and correction techniques at the hardware level, working to reduce environmental noise, cross-talk between qubits, and other sources of decoherence. They develop the hardware architecture necessary to support error correction codes, including appropriate qubit connectivity, measurement capabilities, and feedback systems.

A significant challenge in quantum hardware engineering involves scaling systems beyond current limitations. Engineers must address interconnect bottlenecks, control system complexity, thermal management, and fabrication yield issues to increase qubit counts while maintaining or improving performance metrics.

The work of Quantum Hardware Engineers directly determines the capabilities and limitations of quantum computers. As quantum hardware continues to advance, these engineers focus on improving qubit performance parameters, reducing error rates, increasing system size, and developing the infrastructure necessary for practical quantum computation implementation.', true, '2025-07-20 15:47:09.036833+00', '2025-04-28 02:13:55.929976+00', 'The following are a hand-picked selection of articles and resources relating to the Quantum Hardware Engineer''s role and relevant input in the creation of effective quantum computing systems. These include experts in the field, active practitioners, and notable perspectives.

Holt, M.V., et al. (March 22, 2021). "Materials for quantum technologies: Computing, information, and sensing." Nature Reviews Materials, 6. https://www.nature.com/articles/s41578-021-00293-9

The University of New South Wales. (Accessed July 20, 2025). "Centre for Quantum Computation & Communication Technology." cqc2t.org. https://www.cqc2t.org/

Quantum Machines. (Accessed July 20, 2025). "The Quantum Orchestration Platform." quantum-machines.co. https://www.quantum-machines.co/

Zurich Instruments AG. (Accessed July 20, 2025). "Quantum Technologies." zhinst.com. https://www.zhinst.com/quantum

Keysight Technologies. (Accessed July 20, 2025). "Quantum Solutions." keysight.com. https://www.keysight.com/au/en/solutions/emerging-technologies/quantum-solutions.html

Magesan, E., Gambetta, J. M., & Emerson, J. (May 5, 2011). "Scalable and Robust Randomized Benchmarking of Quantum Processes." Physical Review Letters, 106(18). https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.106.180504', false),
	('4a0c0404-879a-43ef-8980-f8539add284a', 'quantum-solutions-provider', 'Quantum Solutions Provider', 'Develop and deliver quantum computing solutions, services, and products to implement quantum technologies.
', '{"Quantum Consulting","Use Case Development","Value Demonstration","Technical Sales",Implementation,"Technology Integration","Project Management","Business Development"}', '2025-04-28 02:14:52.768842+00', 'Quantum Solutions Providers deliver professional services that enable organisations to evaluate and implement quantum computing approaches for specific use cases. These specialists combine quantum computing expertise with business and industry knowledge to identify, develop, and implement practical quantum applications.

The typical Quantum Solutions Provider conducts systematic assessments of client operations to identify computational challenges potentially suitable for quantum approaches. This requires analysing problem characteristics including mathematical structure, dimensionality, and current computational limitations to determine quantum suitability. They develop prioritisation frameworks that rank potential applications based on implementation feasibility, potential value, and alignment with quantum capabilities.

Solution Providers develop client-specific quantum implementations, translating identified use cases into functional quantum or hybrid quantum-classical implementations. This includes algorithm selection or development, problem reformulation, circuit implementation, integration with existing systems, and results validation. These implementations must balance quantum approach sophistication with practical usability within client operational contexts.

These professionals establish appropriate implementation methodologies for quantum projects, adapting software development approaches to accommodate quantum computing''s experimental nature and evolving capabilities. They develop testing frameworks, validation approaches, and performance benchmarks tailored to quantum implementations and client requirements.

Solution Providers deliver client education and capability development services, establishing appropriate quantum literacy within client organisations. This includes technical training, strategic guidance, and implementation support designed to develop client capabilities for continued quantum application development and assessment.

These specialists develop and maintain relationships with multiple quantum hardware and software providers, enabling them to select appropriate technical approaches for specific client requirements. They establish implementation architectures that accommodate current technology limitations while providing migration paths to more advanced quantum capabilities as they become available.

The services provided by Quantum Solution Providers enable organisations to explore quantum computing applications without developing comprehensive internal capabilities, thereby expanding practical quantum computing adoption across various industry sectors.', true, '2025-07-20 15:56:42.740464+00', '2025-04-28 02:14:53.662385+00', 'The following are a hand-picked selection of articles and resources relating to the Quantum Algorithm Developer''s role and relevant input in the creation of effective quantum computing workloads. These include experts in the field, active practitioners, and notable perspectives.

Microsoft. (Accessed July 20, 2025). "Solve a real-world optimization problem by creating a quantum-inspired solution." Microsoft Learn. https://learn.microsoft.com/en-us/training/modules/solve-optimization-problem-quantum-inspired-solution/

Lekitsch, B., et al. (Dec. 8, 2021). "Quantum computing use cases are getting real—what’s your plan?" McKinsey & Company. https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/quantum-computing-use-cases-are-getting-real-whats-your-plan

Goyal, S., et al. (Oct. 26, 2021). "A Strategic Approach to the Quantum Revolution." Boston Consulting Group. https://www.bcg.com/publications/2021/strategic-approach-to-quantum-revolution

QC Ware. "Delivering on the Promise of Quantum Computing." qcware.com. https://www.qcware.com/

Capgemini. "Quantum Technologies." capgemini.com. https://www.capgemini.com/au-en/insights/research-library/quantum-technologies/

Deloitte. (Accessed July 20, 2025). "Quantum Computing." deloitte.com. https://www.deloitte.com/global/en/our-thinking/quantum-computing.html', false),
	('7ab75c66-ac98-4796-8d72-83e7a5bde6e3', 'quantum-algorithm-developer', 'Quantum Algorithm Developer', 'Design quantum algorithms to solve computational problems that are inefficient or intractable in classical computing.', '{"Algorithm Design","Quantum Complexity Theory","Optimization Techniques","Mathematical Modeling","Performance Analysis","Mathematical Optimisation","Quantum Gate Operations","Quantum Circuit Design"}', '2025-04-28 02:11:37.22799+00', '## Quantum Algorithm Developer

Quantum Algorithm Developers specialise in designing computational approaches that use quantum mechanical properties to solve specific problems. These professionals possess expertise in quantum computation theory, linear algebra, and computational complexity, enabling them to identify problems where quantum approaches may provide computational advantages over classical methods.

Their primary function involves analysing computational problems to determine quantum-compatible formulations. This requires decomposing complex problems into operations that can be implemented using quantum gates and circuits. They develop algorithms that leverage quantum phenomena such as superposition, entanglement, and interference to achieve computational efficiencies that would be theoretically unattainable using classical methods.

In practice, these developers work within significant constraints imposed by current quantum hardware limitations, including restricted qubit counts, limited coherence times, and substantial error rates. They must optimise algorithms to function within these parameters while still demonstrating potential advantages. This often involves developing hybrid quantum-classical approaches that delegate appropriate computational tasks to each system.

Quantum Algorithm Developers typically work with established quantum computational approaches, including quantum Fourier transforms, amplitude amplification, phase estimation, variational methods, and quantum walks. They adapt and extend these foundational techniques to address specific computational challenges in fields such as cryptography, simulation, optimization, and machine learning.

Their responsibilities include analyzing algorithmic complexity, developing formal proofs of correctness, and establishing theoretical performance boundaries. Beyond theoretical work, they implement algorithms using quantum programming frameworks, test performance on simulators and actual quantum hardware, and refine implementations based on experimental results.

As quantum hardware evolves, these developers must continually adapt their approaches to use new capabilities while maintaining awareness of hardware-specific limitations. Their work provides the essential algorithmic foundation necessary for quantum computing to achieve practical utility across various domains.', true, '2025-07-20 16:08:29.53376+00', '2025-04-28 02:11:38.595659+00', 'The following are a hand-picked selection of articles and resources relating to the Quantum Algorithm Developer''s role and relevant input in the creation of effective quantum computing workloads. These include experts in the field, active practitioners, and notable perspectives.

Johnston, E., Harrigan, N., & Gimeno-Segovia, M. (2019). "Programming Quantum Computers: Essential Algorithms and Code Samples." O''Reilly Media. https://www.oreilly.com/library/view/programming-quantum-computers/9781492039679/

Vazirani, U., et al. (Accessed July 20, 2025). "The Quantum Algorithm Zoo." quantumalgorithmzoo.org. https://quantumalgorithmzoo.org/

Nielsen, M. A., & Chuang, I. L. (2010). "Quantum Computation and Quantum Information: 10th Anniversary Edition." Cambridge University Press. https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AE44E5105C062365



', false),
	('0c6651e5-8465-43ee-9fef-77ce7275dab5', 'systems-integration-engineer', 'Systems Integration Engineer', 'Connect quantum computing systems with classical infrastructure, developing workflows and architectures for practical quantum applications.', '{"Hybrid Architecture","API Development","Cloud Integration","Data Pipeline Design","Enterprise Architecture","Data Integration","Quantum-Classical Compute","System Interoperability"}', '2025-04-28 02:16:30.789837+00', 'Systems Integration Engineers in quantum computing design and implement technical infrastructures that incorporate quantum computing resources into broader computational environments. These engineers develop the architectures, interfaces, and workflows necessary for operational quantum computing systems within organisational computing ecosystems.

These specialists design hybrid quantum-classical architectures that effectively distribute computational workloads between quantum and classical resources. This requires analysing computational problems to determine appropriate processing allocation, developing data flow patterns between system components, and establishing effective orchestration mechanisms. They implement these architectures using appropriate cloud services, on-premises systems, or hybrid approaches based on specific requirements.

Systems Integration Engineers develop the interface layers necessary for quantum-classical integration, including APIs, data transformation services, authentication systems, and management interfaces. These interfaces must accommodate the specific characteristics of quantum computation, including job preparation, submission patterns, and probabilistic results processing, while maintaining compatibility with existing systems and workflows.

These engineers implement operational support systems for quantum computing infrastructure, including monitoring tools, logging systems, resource management interfaces, and performance analysis capabilities. Such systems must accommodate quantum computation''s distinctive characteristics while providing necessary operational visibility and control.

A significant responsibility involves implementing appropriate security controls for quantum computing systems, including access management, data protection, secure job execution, and audit capabilities. Security implementations must protect both the quantum resources themselves and the potentially sensitive data processed through quantum applications.

Systems Integration Engineers develop testing and validation methodologies appropriate for integrated quantum-classical systems. This includes creating test frameworks, verification approaches, and quality assurance methodologies that can validate system behaviour despite the probabilistic nature of quantum computation.

As organisational quantum computing adoption progresses from experimental to operational systems, these engineers develop implementation patterns that ensure reliability, scalability, and maintainability of quantum computing infrastructure. Their work enables quantum computing to function as an integrated component within broader computational environments rather than an isolated experimental capability.', true, '2025-07-20 15:24:37.948929+00', '2025-04-28 02:16:31.838371+00', 'The following are a hand-picked selection of articles and resources relating to the Systems Integration Engineer''s role in ensuring a successful installation and utility of quantum computing systems. These include experts in the field, active practitioners, and notable perspectives.

Kubica, A., et al. (June 2023). "Architecture for a quantum datacenter." Proceedings of the ACM on Measurement and Analysis of Computing Systems, 7(2). https://dl.acm.org/doi/10.1145/3579371.3589333

PennyLane Development Team. (Nov. 13, 2023). "PennyLane and Slurm join forces for quantum and HPC workloads." PennyLane Blog. https://pennylane.ai/blog/2023/11/pennylane-and-slurm-join-forces-for-quantum-and-hpc-workloads/

Amazon Web Services. (May 2023). "Amazon Braket: A Secure Path from Proof of Concept to Enterprise Integration." AWS Whitepapers. https://d1.awsstatic.com/whitepapers/Amazon_Braket_A_Secure_Path_from_Proof_of_Concept_to_Enterprise_Integration.pdf

Microsoft. (Dec. 12, 2023). "Azure Quantum architecture." Microsoft Learn. https://learn.microsoft.com/en-us/azure/quantum/architecture-overview

Google Quantum AI. (March 22, 2023). "Announcing the Quantum Virtual Machine and new features with Quantinuum." Google Quantum AI Blog. https://quantumai.google/blog/quantinuum-features

Amazon Web Services. (Dec. 7, 2021). "Access Amazon Braket through a secure, private network using AWS PrivateLink." AWS Quantum Computing Blog. https://aws.amazon.com/blogs/quantum-computing/access-amazon-braket-through-a-secure-private-network-using-aws-privatelink/

Amazon Web Services. (June 10, 2021). "Monitor Amazon Braket jobs using Amazon CloudWatch." AWS Quantum Computing Blog. https://aws.amazon.com/blogs/quantum-computing/monitor-amazon-braket-jobs-using-amazon-cloudwatch/













', false),
	('0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', 'software-engineer', 'Software Engineer', 'An evolving role from classical to quantum computing, developing applications, tools, and interfaces that use quantum hardware and algorithms.', '{"Software Development","Quantum Frameworks","Quantum SDKs","Quantum-Classical Integration","QA Testing","API Development","Hybrid Stack Design",DevOps}', '2025-04-28 02:15:39.290577+00', 'Software Engineers in quantum computing develop the programming infrastructure, tools, and applications that enable practical implementation of quantum algorithms. These engineers create the essential software layers that connect theoretical quantum approaches with functional computing systems, both quantum and classical.

A typical Software Engineer in this sector may work primarily with specialised quantum programming frameworks and software development kits (SDKs) such as Qiskit, Cirq, Q#, PennyLane, and Amazon Braket. They develop software that addresses the particular requirements of quantum computation, including circuit construction, gate operations, measurement processes, and the probabilistic nature of quantum results.

A central challenge in quantum software engineering involves developing appropriate abstractions that manage quantum complexity while providing necessary control for algorithm implementation. This includes creating programming interfaces, compilers, optimizers, and simulators that support quantum algorithm development and testing. Engineers must consider both current NISQ (Noisy Intermediate-Scale Quantum) limitations and future requirements of fault-tolerant systems.

Software Engineers in this field design and implement hybrid quantum-classical systems that integrate quantum processing units with classical computing resources. This requires developing effective interfaces between these fundamentally different computational paradigms, including data preparation pipelines, job scheduling systems, and result processing workflows.

These engineers implement testing methodologies adapted to quantum computation''s probabilistic nature. This includes developing simulation environments, verification techniques, and benchmarking approaches that can validate quantum software despite the challenges of working with inherently probabilistic systems and hardware limitations.

Performance optimization constitutes a significant aspect of quantum software engineering. This includes circuit optimization, implementing error mitigation techniques, and developing transpilation methods that map abstract quantum algorithms to specific hardware configurations with their particular connectivity constraints and gate sets.

As quantum hardware evolves, Software Engineers in this field continuously adapt software systems to leverage new capabilities while maintaining compatibility with existing code bases. Their work provides the essential software infrastructure required for quantum computing to transition from theoretical concepts to practical applications.', true, '2025-07-20 15:39:22.722389+00', '2025-04-28 02:15:40.873424+00', 'The following are a hand-picked selection of articles and resources relating to the Software Engineer''s role the creation of effective quantum computing applications. These include experts in the field, active practitioners, and notable perspectives.

Beverland, M. E., et al. (March 14, 2022). "The software stack for fault-tolerant quantum computers." arXiv.org. https://arxiv.org/abs/2203.07629

Ushijima-Mwesigwa, H., et al. (March 22, 2023). "An Overview of the Quantum Software Stack." ACM Transactions on Quantum Computing, 4(1). https://dl.acm.org/doi/10.1145/3578335

Yuan, X., et al. (Sept. 5, 2023). "Testing, verification, and debugging of quantum software." arXiv.org. https://arxiv.org/abs/2309.02079

The Linux Foundation. (Accessed July 20, 2025). "QIR Alliance." qir-alliance.org. https://qir-alliance.org/

Sivarajah, S., et al. (March 23, 2020). "TKET: A Retargetable Compiler for NISQ Devices." arXiv.org. https://arxiv.org/abs/2003.10611

Amazon Web Services. (June 29, 2022). "Run hybrid quantum-classical algorithms faster with Amazon Braket Hybrid Jobs." AWS Quantum Computing Blog. https://aws.amazon.com/blogs/quantum-computing/run-hybrid-quantum-classical-algorithms-faster-with-amazon-braket-hybrid-jobs/', false),
	('461fd87e-a8b2-4060-b333-14b0839aa563', 'quantum-educator', 'Quantum Educator', 'Develop and deliver quantum computing education programs, training materials, and research initiatives to build quantum literacy.', '{"Curriculum Development","Quantum Research","Educational Assessment","Interdisciplinary Collaboration","Academic Publishing","Public Outreach","Teaching Methodologies","Academic Research"}', '2025-04-28 02:13:00.520288+00', 'The following are a hand-picked selection of articles and resources relating to the Quantum Educator''s role and relevant input in the practice of effective quantum computing teaching. These include experts in the field, active practitioners, and notable perspectives.

Quantum Educators develop and deliver educational programs, curricula, and research initiatives focused on quantum computing and its applications. These professionals work in academic institutions, research organisations, corporate training departments, and educational technology companies to build quantum literacy and workforce capabilities.

These educators create structured learning pathways that build the multidisciplinary knowledge required for quantum computing proficiency. This includes developing curricula that integrate quantum mechanics, computer science, mathematics, and application-specific knowledge appropriate for various educational levels and professional contexts.

A central challenge in quantum education involves developing effective pedagogical approaches for quantum concepts. Educators create conceptual frameworks, visualisations, analogies, and progressive learning sequences that make quantum principles accessible without sacrificing accuracy or depth. They develop appropriate abstraction levels for different learner audiences, from basic quantum literacy to advanced technical specialisation.

Quantum Educators conduct research in both quantum computing itself and in effective methods for quantum education. This includes investigating quantum algorithms and applications while also studying pedagogical approaches, assessment methodologies, and learning progression in quantum topics. They disseminate findings through academic publications, conference presentations, and educational resources.

As teaching professionals they develop and implement assessment methodologies to evaluate quantum learning. This includes creating appropriate problem sets, laboratory exercises, projects, and evaluation instruments that accurately measure conceptual understanding and practical skills in quantum computing.

Quantum Educators typically work at the intersection of multiple disciplines, collaborating with physics, computer science, mathematics, and engineering departments to create integrated approaches to quantum education. They build connections between academic institutions and industry partners to ensure educational programs align with workforce needs and provide appropriate practical experiences.

As quantum technologies continue to advance, these educators continuously update curricula, resources, and teaching approaches to reflect current capabilities, applications, and best practices. Their work directly impacts workforce development in the quantum sector, creating the human capabilities necessary for continued progress in quantum computing research and applications.', true, '2025-07-20 13:04:56.453987+00', '2025-04-28 02:13:01.6691+00', 'Qiskit Development Team. (Accessed July 20, 2025). "The Qiskit Textbook." Qiskit.org. https://qiskit.org/textbook/content/ch-ex/introduction.html

Nielsen, M. A., & Chuang, I. L. (2010). "Quantum Computation and Quantum Information: 10th Anniversary Edition." Cambridge University Press. https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AE44E5105C062365

The Coding School. (Accessed July 20, 2025). "Qubit by Qubit." qubitbyqubit.org. https://www.qubitbyqubit.org/

Gidney, C. (Accessed July 20, 2025). "Quirk." algassert.com. https://algassert.com/quirk

The National Q-12 Education Partnership. (Accessed July 20, 2025). "About." q12education.org. https://q12education.org/

Quantum Economic Development Consortium. (Accessed July 20, 2025). "Workforce Technical Advisory Committee." quantumconsortium.org. https://quantumconsortium.org/tac/workforce/

Sydney Quantum Academy. (Accessed July 20, 2025). "About SQA." sydneyquantum.org. https://www.sydneyquantum.org/

The University of Chicago and partners. (Accessed July 20, 2025). "Chicago Quantum Exchange." chicagoquantum.org. https://chicagoquantum.org/', false),
	('a25b8a76-3755-4733-90d5-a16ff49de467', 'investment-professional', 'Investment Professional', 'Identify and evaluate quantum computing investment opportunities, understand technology milestones and market dynamics.', '{"Technology Assessment","Market Analysis","Due Diligence","Investment Strategy","Portfolio Management","Risk Evaluation","Financial Modeling","Exit Strategies"}', '2025-04-28 02:10:20.098023+00', 'Investment Professionals specialising in quantum computing evaluate potential investments across the quantum technology sector, including hardware, software, applications, and services. These specialists analyse technological approaches, market opportunities, development timelines, and financial requirements to make investment decisions in this emerging field.

These professionals conduct detailed technical due diligence on quantum computing investment opportunities, assessing technological approaches against established scientific principles, engineering feasibility, development timelines, and competitive alternatives. This requires developing specialised knowledge of quantum technologies or working with scientific advisors who can evaluate technical claims and approaches.

Investment analysis in this sector demands particular attention to development timelines and milestone assessment. Investors must establish realistic expectations regarding technology maturation, distinguishing between near-term commercially viable applications and longer-term developments that may require significant hardware advancements. They structure investments with appropriate capital efficiency and runway considerations given these extended development horizons.

These investors analyze quantum computing market segments, including core hardware (quantum processing units), enabling technologies (control systems, cryogenics), software layers (compilers, libraries), and application development (industry-specific solutions). Each segment presents distinct investment characteristics regarding capital requirements, development timelines, competitive dynamics, and risk profiles.

Investment Professionals develop appropriate portfolio construction approaches for quantum technology investments, potentially combining foundation hardware investments with shorter-term opportunities in quantum-adjacent technologies, software, or services. They establish appropriate metrics for evaluating investment performance given the extended timelines typical in deep technology development.

These specialists continuously monitor developments across the quantum ecosystem, including research breakthroughs, hardware advances, emerging applications, competitive dynamics, and evolving market structures. Their investment decisions significantly influence which quantum computing approaches receive necessary capital for continued development, thereby shaping the emerging quantum computing industry structure.', true, '2025-07-20 13:19:47.709533+00', '2025-04-28 02:10:21.99223+00', 'The following are a hand-picked selection of articles and resources relating to the Investment Professional''s role and relevant input quantum computing finance and investment. These include experts in the field, active practitioners, and notable perspectives.

The Quantum Insider. (Accessed July 20, 2025). "Quantum Computing Market Map." thequantuminsider.com. https://thequantuminsider.com/quantum-computing-market-map/

Grumbling, D. (Accessed July 20, 2025). "Quantum Computing Report." quantumcomputingreport.com. https://quantumcomputingreport.com/

PitchBook. (March 2024). "Q1 2024 Emerging Tech Outlook." PitchBook News & Analysis. https://pitchbook.com/news/reports/q1-2024-emerging-tech-outlook-analyst-note

CB Insights. (July 20, 2023). "State of Quantum Tech Q2’23 Report." CBInsights.com. https://www.cbinsights.com/research/report/state-of-quantum-tech-q2-2023/

McKinsey & Company. (April 2024). "Quantum Technology Monitor." McKinsey & Company. https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/steady%20progress%20in%20approaching%20the%20quantum%20advantage/quantum-technology-monitor-april-2024.pdf

Quantum Economic Development Consortium. (Accessed July 20, 2025). "Reports and Studies." quantumconsortium.org. https://quantumconsortium.org/reports-and-studies/

Hyperion Research. (Accessed July 20, 2025). "Quantum Computing." hyperionresearch.com. https://www.hyperionresearch.com/research-and-services/quantum-computing/

International Data Corporation. (Jan. 25, 2023). "Worldwide Quantum Computing Market Forecast to Grow to $8.6 Billion in 2027, According to IDC." IDC.com. https://www.idc.com/getdoc.jsp?containerId=prUS50136623

Gartner. (Aug. 1, 2023). "What’s New in the 2023 Gartner Hype Cycle for Compute." Gartner.com. https://www.gartner.com/smarterwithgartner/what-s-new-in-the-2023-gartner-hype-cycle-for-compute

3DR Holdings. (Accessed July 20, 2025). "Inside Quantum Technology." iqtevent.com. https://iqtevent.com/', false),
	('1ded3f85-23ec-4a89-b5c9-d579ed9b681e', 'quantum-cloud-platform-provider', 'Quantum Cloud and Platform Provider', 'Deliver quantum computing resources as accessible cloud services without managing complex hardware infrastructure.', '{"API Development","Performance Optimization","User Experience","Platform Development","Cloud Computing","Quantum Infrastructure","Quantum Networking",Scalability}', '2025-04-29 07:14:33.36338+00', '## Quantum Cloud and Platform Provider

Quantum Cloud and Platform Providers develop and operate services that make quantum computing resources accessible to organisations without requiring direct hardware ownership or management. These specialists create the infrastructure, interfaces, and management systems that mediate between physical quantum processors and end users, enabling cloud-based quantum computing utilisation.

These providers design and implement multi-layered service architectures that integrate quantum processing units with classical computing infrastructure. This includes developing resource abstraction models, virtualisation approaches where applicable, and appropriate service interfaces that present quantum capabilities in accessible formats. They establish the operational infrastructure necessary for reliable quantum service delivery, including monitoring systems, resource management tools, and service continuity approaches.

A central responsibility involves creating effective resource management systems for quantum processors. This includes developing scheduling algorithms that optimize limited quantum resource allocation across multiple users, implementing fair-share systems or priority mechanisms, and maximizing quantum hardware utilization while maintaining service quality. These systems must address the unique characteristics of quantum processing, including calibration requirements, variability in processor performance, and appropriate workload distribution.

Quantum Cloud Providers develop programming interfaces and software development kits that enable users to access quantum resources through standardized methods. This includes creating APIs, client libraries, and development tools that abstract hardware-specific details while providing necessary control for effective quantum algorithm implementation. They build integration mechanisms that connect quantum services with existing classical computing environments, enabling hybrid quantum-classical applications.

These specialists implement the security infrastructure necessary for multi-tenant quantum computing services. This includes authentication and authorisation systems, data protection mechanisms, secure job execution environments, and appropriate isolation between users. Security implementations must address both classical and quantum-specific concerns while maintaining usability.

Operational management constitutes a significant portion of their work, including monitoring quantum system performance, managing hardware calibration schedules, implementing service level agreements, and developing incident response procedures. They create appropriate metrics and analytics to assess service performance, resource utilisation, and user experience.

As quantum hardware capabilities evolve, Quantum Cloud Providers continuously adapt their service architectures and interfaces to leverage new capabilities while maintaining compatibility with existing user code and applications. Their work makes quantum computing accessible to a broader range of organisations and developers, accelerating practical quantum computing adoption across various sectors.', true, '2025-07-20 15:55:54.069535+00', '2025-04-29 07:14:40.910304+00', 'The following are a hand-picked selection of articles and resources relating to the Quantum Cloud and Platform Provider''s role in building and managing effective quantum computing networks. These include experts in the field, active practitioners, and notable perspectives.

Amazon Web Services. (Accessed July 20, 2025). "Amazon Braket." AWS. https://aws.amazon.com/braket/

Microsoft. (Accessed July 20, 2025). "Azure Quantum." Microsoft Azure. https://azure.microsoft.com/en-au/products/quantum

IBM. (Accessed July 20, 2025). "IBM Quantum Platform." quantum.ibm.com. https://quantum.ibm.com/

Google. (Accessed July 20, 2025). "Google Quantum AI." quantumai.google. https://quantumai.google/

Cloud Security Alliance. (Accessed July 20, 2025). "Quantum-Safe Security Working Group." cloudsecurityalliance.org. https://cloudsecurityalliance.org/research/working-groups/quantum-safe-security/

Egan, L. (March 22, 2023). "Benchmarking and performance of quantum computers: A primer for end users and investors." Quantinuum. https://www.quantinuum.com/news/benchmarking-and-performance-of-quantum-computers-a-primer-for-end-users-and-investors

Nannicini, G. (Sept. 15, 2023). "Executing quantum algorithms on the cloud with Qiskit and IBM Quantum serverless." Medium. https://medium.com/ibm-quantum/executing-quantum-algorithms-on-the-cloud-with-qiskit-and-ibm-quantum-serverless-a-use-case-7d9a0d8e484f

', false),
	('0803f9d7-7438-422a-b316-e8f76fcd04d1', 'government-representative', 'Government Representative', 'Develop policy and national strategies to advance research, secure critical infrastructure, and maintain international competitiveness.', '{"Policy Development","Research Funding","National Security","International Cooperation","Regulatory Frameworks","Strategic Planning","Stakeholder Engagement","Compliance Oversight"}', '2025-04-28 02:09:24.144255+00', 'Government Representatives in quantum computing contexts develop and implement policies, programs, and regulatory frameworks related to this emerging technology area. These officials address national priorities including research advancement, security considerations, economic development, and international cooperation in quantum technologies.

These representatives develop comprehensive national quantum strategies that coordinate efforts across government agencies, research institutions, academic organisations, and industry partners. Such strategies typically address multiple policy dimensions including research funding, infrastructure development, workforce preparation, technology adoption, and security considerations.

A central responsibility involves establishing and administering research funding programs that advance quantum computing capabilities. This includes determining priority research areas, establishing appropriate funding mechanisms, developing evaluation criteria, and monitoring research progress. Program design must balance fundamental science, technological development, and application-specific research across appropriate timeframes.

Government Representatives must address significant security implications of quantum computing advances, particularly regarding cryptographic systems. They establish transition frameworks for cryptographic infrastructure, develop appropriate standards through agencies such as NIST, and create implementation timelines for quantum-resistant security approaches across government and critical infrastructure systems.

These officials develop policies regarding international collaboration and competition in quantum technologies. This requires balancing beneficial research cooperation with appropriate controls on strategically significant technologies. Representatives participate in establishing international norms, standards, and agreements regarding quantum technology development and deployment.

Government Representatives also address workforce development requirements for the quantum sector, establishing educational initiatives, training programs, and research opportunities that develop necessary talent across academic, government, and private sectors. They create regulatory frameworks that appropriately govern quantum technology development and application while supporting continued innovation.

The policies and programs established by these representatives significantly influence the pace, direction, and security of quantum computing development. Their decisions establish national positioning in quantum technologies and determine preparedness for both the opportunities and challenges presented by quantum computing advances.', true, '2025-07-20 13:26:14.616802+00', '2025-04-28 02:09:25.193639+00', 'The following are a hand-picked selection of articles and resources relating to the Government Representative''s role and relevant input quantum computing industry. These include experts in the field, active practitioners, and notable perspectives.

National Science and Technology Council. (Accessed July 20, 2025). "National Quantum Initiative." Quantum.gov. https://www.quantum.gov/

U.K. Department for Science, Innovation and Technology. (March 2023). "National Quantum Strategy." GOV.UK. https://www.gov.uk/government/publications/national-quantum-strategy

European Commission. (Accessed July 20, 2025). "Quantum Flagship." European Union. https://digital-strategy.ec.europa.eu/en/policies/quantum-flagship

Australian Department of Industry, Science and Resources. (May 2023). "Australia''s National Quantum Strategy." industry.gov.au. https://www.industry.gov.au/publications/australias-national-quantum-strategy

The White House. (May 4, 2022). "Fact Sheet: White House Announces Initiatives to Support Quantum Technologies and Mitigate Risks to Cybersecurity." The White House Briefing Room. https://www.whitehouse.gov/briefing-room/statements-releases/2022/05/04/fact-sheet-white-house-announces-initiatives-to-support-quantum-technologies-and-mitigate-risks-to-cybersecurity/

National Institute of Standards and Technology. (Accessed July 20, 2025). "Post-Quantum Cryptography." NIST Computer Security Resource Center. https://csrc.nist.gov/projects/post-quantum-cryptography

Cybersecurity and Infrastructure Security Agency. (Accessed July 20, 2025). "Post-Quantum Cryptography Initiative." CISA.gov. https://www.cisa.gov/post-quantum-cryptography-initiative

Quantum Economic Development Consortium. (Accessed July 20, 2025). "About QED-C." quantumconsortium.org. https://quantumconsortium.org/

Stohl, R. & Williams, C. (Sept. 19, 2023). "AUKUS Pillar II: The Technological and Industrial Cooperation Track." Center for Strategic and International Studies. https://www.csis.org/analysis/aukus-pillar-ii-technological-and-industrial-cooperation-track

World Economic Forum. (Accessed July 20, 2025). "Quantum Computing." weforum.org. https://www.weforum.org/topics/quantum-computing/

National Q-12 Education Partnership. (Accessed July 20, 2025). "About." q12education.org. https://q12education.org/

National Science and Technology Council. (Oct. 2021). "A Strategic Vision for America''s QIST Workforce." Quantum.gov. https://www.quantum.gov/wp-content/uploads/2021/10/QIST-Workforce-Strategic-Plan.pdf', false),
	('f8d9dfee-ee44-497c-888e-9a81f4359b62', 'financial-services-specialist', 'Financial Services Specialist', 'Apply quantum computing to financial modeling, risk assessment, portfolio optimization, and trading strategies to gain competitive advantage.', '{"Risk Modeling","Portfolio Optimization","Derivative Pricing","Algorithmic Trading","Financial Forecasting","Fraud Detection","Quantitative Analysis","Trading Systems"}', '2025-04-28 02:08:37.746572+00', 'Financial Services Specialists apply quantum computing approaches to address computational challenges in finance, banking, and investment management. These professionals combine domain expertise in quantitative finance with knowledge of quantum algorithms to develop enhanced approaches for financial modeling, risk assessment, and trading strategies.

These specialists analyse financial problems to identify those with mathematical structures potentially amenable to quantum computational approaches. They focus particularly on optimization problems, Monte Carlo simulations, and machine learning applications where quantum methods may provide advantages over classical approaches in terms of speed, accuracy, or capability.

A primary application area involves portfolio optimization, where quantum algorithms such as the Quantum Approximate Optimization Algorithm (QAOA) can potentially address complex multi-constraint problems more effectively than classical methods. Financial specialists formulate portfolio construction problems for quantum implementation, including appropriate objective functions, constraints, and parameter mappings.

These professionals develop enhanced risk assessment methodologies using quantum computing. This includes quantum implementations of Monte Carlo simulations for Value-at-Risk calculations, credit risk assessment, and derivative pricing models. They apply quantum amplitude estimation and related techniques to potentially achieve quadratic speedups in convergence for certain simulation approaches.

Financial Services Specialists also investigate quantum applications in algorithmic trading, where they develop methodologies to identify market inefficiencies and optimal trading strategies. This involves creating appropriate problem formulations, data encoding approaches, and result interpretation methodologies suitable for trading decision systems.

Implementation of quantum finance applications requires addressing significant practical challenges. These include developing problem formulations suitable for near-term quantum hardware with its inherent limitations, creating appropriate data encoding strategies, and integrating quantum components with existing classical financial systems and workflows.

As quantum hardware capabilities evolve, these specialists continuously assess the practical financial applications that become feasible, adjusting implementation strategies to leverage emerging capabilities. Their work aims to establish quantum advantage in specific financial applications, creating enhanced computational capabilities that translate to business value in financial services operations.', true, '2025-07-20 13:38:47.716127+00', '2025-04-28 02:08:38.643541+00', 'The following are a hand-picked selection of articles and resources relating to the Financial Services Specialist''s role in applying quantum computing to their finance activities. These include experts in the field, active practitioners, and notable perspectives.

Deloitte. (Accessed July 20, 2025). "Quantum Computing for Financial Services: A review of applications and their readiness." Deloitte Switzerland. https://www.deloitte.com/ch/en/pages/financial-services/articles/quantum-computing-financial-services.html

Heine, C., et al. (Oct. 26, 2021). "How Quantum Computing Could Remake Financial Services." Boston Consulting Group. https://www.bcg.com/publications/2021/how-quantum-computing-can-change-financial-services

Ernst & Young. (Aug. 31, 2023). "Quantum computing in finance: A new era of calculations." EY.com. https://www.ey.com/en_gl/financial-services/quantum-computing-in-finance-a-new-era-of-calculations

Herman, F. (Dec. 7, 2023). "The Quantum Advantage in Portfolio Optimization: A Financial Perspective." Social Science Research Network. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4655589

Amazon Web Services. (May 23, 2023). "Quantum computing for portfolio optimization." AWS Quantum Computing Blog. https://aws.amazon.com/blogs/quantum-computing/quantum-computing-for-portfolio-optimization/

Qiskit. (Accessed July 20, 2025). "Portfolio Optimization." Qiskit Finance Documentation. https://qiskit.org/documentation/finance/tutorials/01_portfolio_optimization.html

PwC. (Accessed July 20, 2025). "The impact of quantum computing on the financial services industry for risk management." PwC. https://www.pwc.com/us/en/tech-effect/ai-analytics/quantum-computing-financial-services-risk-management.html

Qiskit. (Accessed July 20, 2025). "Option Pricing using Quantum Computers." Qiskit Finance Documentation. https://qiskit.org/documentation/finance/tutorials/04_option_pricing.html

Quantinuum. (Accessed July 20, 2025). "Quantum computing for financial mathematics and simulation." Quantinuum. https://www.quantinuum.com/application/quantum-computing-for-financial-mathematics-and-simulation

Pistoia, M., et al. (Feb. 1, 2023). "Quantum Machine Learning in Finance." Mathematics, 11(3). https://www.mdpi.com/2227-7390/11/3/714

BBVA. (May 26, 2021). "Applications and Challenges of Quantum Machine Learning for Finance." BBVA.com. https://www.bbva.com/en/applications-and-challenges-of-quantum-machine-learning-for-finance/

Gidney, C., et al. (Dec. 1, 2023). "Quantum computing for finance." JPMorgan Chase & Co. https://www.jpmorganchase.com/institute/research/fintech-regtech/quantum-computing-for-finance

Goldman Sachs. (Aug. 10, 2021). "Quantum Is a New Computing Paradigm." Goldman Sachs. https://www.goldmansachs.com/intelligence/pages/quantum-computing-is-a-new-paradigm.html', false),
	('c75bbdd2-6e27-4b91-a4fa-254459a1ad62', 'quantum-chemist', 'Quantum Chemist', 'Simulating quantum systems for drug discovery, material design, molecular modeling and chemical reaction optimization.', '{"Quantum Chemistry","Electronic Structure Calculation","Reaction Mechanism Modeling","Drug Discovery","Material Science","Chemical Simulations","Molecular Modeling","Computational Chemistry"}', '2025-04-28 02:12:18.488858+00', 'Quantum Chemists apply quantum computing approaches to address complex molecular and chemical problems that are computationally intractable with classical methods. These specialists combine expertise in chemistry, quantum physics, and computational methods to develop and implement quantum algorithms for chemical simulations and materials science applications.

These professionals focus primarily on simulating quantum mechanical behaviour of molecular and material systems. This includes electronic structure calculation, molecular energy determination, reaction pathway modeling, and property prediction for various chemical systems. Their work aims to achieve higher accuracy than classical approximation methods or address larger molecular systems than feasible with conventional approaches.

A fundamental aspect of quantum chemistry on quantum computers involves mapping molecular systems to quantum computational models. This requires developing appropriate Hamiltonian representations of chemical systems, selecting suitable basis sets, determining active spaces for computation, and implementing appropriate encodings for quantum processors. These specialists must balance computational requirements against accuracy needs while working within current quantum hardware constraints.

Quantum Chemists implement various quantum algorithms for chemical applications, including Variational Quantum Eigensolver (VQE), Quantum Phase Estimation (QPE), and quantum machine learning approaches. They develop problem-specific circuit designs, parameter optimization strategies, and error mitigation techniques suited to chemical accuracy requirements. This often involves creating hybrid quantum-classical computational approaches that leverage the strengths of both computing paradigms.

These specialists validate quantum computational results against experimental data and classical computational chemistry methods. They establish appropriate benchmark systems, error metrics, and validation methodologies to assess quantum approach accuracy and performance. This evaluation process informs further refinement of quantum computational methods for chemical applications.

Application areas for quantum chemistry include pharmaceutical compound simulation for drug discovery, catalyst design for industrial processes, novel material development with targeted properties, and protein structure analysis. Each application domain presents specific requirements regarding computational accuracy, system size, and property determination that influence algorithm selection and implementation.

As quantum hardware capabilities evolve, Quantum Chemists continuously adapt their approaches to leverage increasing qubit counts, improved coherence times, and enhanced gate fidelities. Their work represents one of the most promising near-term applications of quantum computing, potentially delivering significant advances in molecular simulation capabilities that impact pharmaceutical development, materials science, and chemical manufacturing.', true, '2025-07-20 16:04:00.956599+00', '2025-04-28 02:12:19.43383+00', 'The following are a hand-picked selection of articles and resources relating to the Quantum Algorithm Developer''s role and relevant input in the creation of effective quantum computing workloads. These include experts in the field, active practitioners, and notable perspectives.

Pistoia, M. (July 13, 2023). "What is quantum chemistry and why is it a perfect use case for quantum computing?" IBM Research Blog. https://research.ibm.com/blog/what-is-quantum-chemistry

McArdle, S., et al. (March 28, 2019). "Quantum Chemistry in the Age of Quantum Computing." Chemical Reviews, 120(8). https://pubs.acs.org/doi/10.1021/acs.chemrev.8b00803

Cao, Y., et al. (July 1, 2021). "Quantum computational chemistry." Nature Reviews Chemistry, 5. https://www.nature.com/articles/s41570-021-00287-z

Google Quantum AI. (Accessed July 20, 2025). "Simulating Molecules with a Quantum Computer." Google AI. https://ai.google/discover/quantum-research/simulating-molecules-with-a-quantum-computer/

Sun, Q., et al. (Accessed July 20, 2025). "PySCF: Python-based Simulations of Chemistry Framework." pyscf.org. https://pyscf.org/

Google Quantum AI and Collaborators. (June 14, 2023). "Evidence for the utility of quantum computing before fault tolerance." Nature, 618. https://www.nature.com/articles/s41586-023-06096-3', false),
	('8c4a6f57-b6a2-4585-9690-4a19d14b54c4', 'domain-expert', 'Domain Expert', 'Bridging the gap between quantum capabilities and domain-specific problems for breakthroughs in science and industry.', '{"Impact Assessment","Research Collaboration","Subject Matter Expertise","Industry Knowledge","Requirements Analysis","Solution Design","Business Processes","Problem Definition"}', '2025-04-28 02:07:19.874943+00', 'Domain Experts in quantum computing possess specialised knowledge in particular fields combined with sufficient understanding of quantum computational approaches to identify valuable application opportunities. These professionals bridge the gap between quantum computing capabilities and domain-specific problems that might benefit from quantum approaches.

These specialists maintain primary expertise in fields such as chemistry, materials science, finance, logistics, or machine learning, while developing secondary competence in quantum computing principles and limitations. Their function involves analysing domain-specific computational challenges to identify those with characteristics potentially amenable to quantum methods, such as high-dimensional problems, specific mathematical structures, or particular computational patterns.

Domain Experts translate field-specific problems into formulations that quantum computing specialists can implement. This translation process requires detailed understanding of the problem''s computational structure, data requirements, accuracy needs, and performance constraints. It also necessitates realistic assessment of quantum computing''s capabilities and limitations to identify genuinely promising applications rather than speculative possibilities.

These professionals develop evaluation frameworks that assess quantum solutions against relevant domain-specific metrics rather than purely technical benchmarks. They establish validation methods to verify that quantum approaches produce correct results and meaningful advantages compared to classical alternatives.

In multidisciplinary teams, Domain Experts function as intermediaries between quantum computing specialists and stakeholders in their fields. They interpret quantum capabilities in domain-relevant terms and communicate domain requirements to quantum specialists in computationally precise specifications.

Research conducted by Domain Experts often focuses on identifying mathematical similarities between established quantum algorithms and domain-specific computational challenges, creating novel problem mappings, and developing domain-specific benchmarks for quantum approaches. Their work provides essential direction for quantum computing applications, ensuring development efforts focus on problems where quantum methods offer genuine potential for significant improvements.', true, '2025-07-20 14:08:44.904455+00', '2025-04-28 02:07:50.255269+00', 'The following are a hand-picked selection of articles and resources relating to the Domain Expert role and their relevant input in the effective adoption of quantum computing. The readings that follow include experts in the field, active practitioners, and notable perspectives.

D-Wave Systems. (Accessed July 20, 2025). "Problem Formulation Guide." D-Wave Ocean software documentation. [https://docs.ocean.dwavesys.com/en/stable/overview/formulation.html](https://www.google.com/search?q=https://docs.ocean.dwavesys.com/en/stable/overview/formulation.html)

D-Wave. (Nov. 1, 2023). "From business problem to quantum solution on a D-Wave quantum computer." Medium. [https://medium.com/d-wave/from-business-problem-to-quantum-solution-on-a-d-wave-quantum-computer-4a1d41829377](https://www.google.com/search?q=https://medium.com/d-wave/from-business-problem-to-quantum-solution-on-a-d-wave-quantum-computer-4a1d41829377)

Quantum Algorithm Zoo. (Accessed July 20, 2025). "The Quantum Algorithm Zoo." quantumalgorithmzoo.org. [https://quantumalgorithmzoo.org/](https://quantumalgorithmzoo.org/)', false),
	('1bf021aa-6bc0-455c-9d57-5e40805e1564', 'cybersecurity-specialist', 'Cybersecurity Specialist', 'Prepare for the implications of quantum computing, developing post-quantum security and quantum-resistant cryptographic systems.', '{"Post-Quantum Cryptography","Quantum Key Distribution","Cryptographic Implementation","Risk Management","Security Auditing","Encryption Protocols","Network Security","Security Transition"}', '2025-04-28 02:06:43.242128+00', 'Cybersecurity Specialists focusing on quantum computing analyse and address the security implications of quantum computational capabilities, particularly regarding cryptographic systems. These professionals develop transition strategies and implement new security approaches to maintain data protection in the quantum computing era.

These specialists conduct comprehensive cryptographic vulnerability assessments to identify systems susceptible to quantum attacks. They analyse existing security infrastructure to identify cryptographic algorithms vulnerable to quantum methods such as Shor''s algorithm, which threatens widely-deployed public key crypto systems including RSA and elliptic curve cryptography.

A primary responsibility involves developing and implementing post-quantum cryptography transition strategies. This includes selecting appropriate quantum-resistant algorithms from candidates being standardised by organisations such as NIST, creating migration pathways for existing systems, and establishing cryptographic agility to accommodate evolving standards and threats.

Cybersecurity Specialists in this domain establish appropriate timelines and priorities for cryptographic transitions based on threat models, data sensitivity, and system lifespans. They identify systems requiring immediate attention versus those that can transition on normal replacement cycles, balancing security requirements against operational and financial constraints.

These professionals may also evaluate quantum cryptographic approaches, including Quantum Key Distribution (QKD) systems that use quantum mechanical properties for secure key exchange. They assess the security properties, implementation requirements, and appropriate use cases for these technologies within specific organizational contexts.

A significant challenge involves maintaining interoperability during cryptographic transitions. Security specialists must implement hybrid approaches that maintain compatibility with external systems while progressively enhancing security against quantum threats. They develop testing methodologies to verify that post-quantum implementations maintain required security properties without compromising system functionality.

As quantum computing advances, these specialists continuously monitor technological developments to adjust security strategies appropriately. Their work ensures that organisational data remains protected against both current threats and future quantum capabilities, maintaining security continuity through the cryptographic transition period.', true, '2025-07-20 14:37:06.690656+00', '2025-04-28 02:06:44.047453+00', 'The following are a hand-picked selection of articles and resources relating to the Cybersecurity Specialist role and relevant input in the safe adoption of quantum computing. The readings that follow include experts in the field, active practitioners, and notable perspectives.

**Foundational Concepts: The Quantum Threat to Cryptography**

Caltech Science Exchange. (Accessed July 20, 2025). "How Will Quantum Technologies Change Cryptography?" Caltech Science Exchange. https://scienceexchange.caltech.edu/topics/quantum-science-explained/quantum-cryptography

Su, R., Zhang, J., & Zhu, J. (May 2022). "Quantum Computing and its Impact on Cryptography." MIT Computer Science and Artificial Intelligence Laboratory. https://courses.csail.mit.edu/6.857/2022/projects/Su-Zhang-Zhu.pdf

RocketMeUpCybersecurity. (Oct. 26, 2023). "Quantum Computing''s Impact on Cryptography — The Future of Encryption." Medium. https://medium.com/@RocketMeUpCybersecurity/quantum-computings-impact-on-cryptography-the-future-of-encryption-1f8804205d86

ByteBridge. (Jan. 15, 2024). "Quantum Computing and Cryptography: An Analysis of Shor’s Algorithm." Medium. https://bytebridge.medium.com/quantum-computing-and-cryptography-an-analysis-of-shors-algorithm-66980e3c8d10

**Post-Quantum Cryptography (PQC) Transition and Strategy**

Wikipedia. (Accessed July 20, 2025). "NIST Post-Quantum Cryptography Standardization." Wikipedia, the Free Encyclopedia. https://en.wikipedia.org/wiki/NIST_Post-Quantum_Cryptography_Standardization

National Institute of Standards and Technology. (Aug. 2024). "NIST Releases First 3 Finalized Post-Quantum Encryption Standards." NIST.gov. https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards

National Institute of Standards and Technology. (March 2025). "NIST Selects HQC as Fifth Algorithm for Post-Quantum Encryption." NIST.gov. https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption

Industrial Cyber. (June 5, 2024). "New PQC Migration Roadmap offers actionable guidance for transitioning to quantum-safe cryptography." Industrial Cyber. https://industrialcyber.co/threats-attacks/new-pqc-migration-roadmap-offers-actionable-guidance-for-transitioning-to-quantum-safe-cryptography/

Encryption Consulting. (March 12, 2024). "10 Enterprise Must-Haves for a Successful Post-Quantum Cryptography (PQC) Migration." EncryptionConsulting.com. https://www.encryptionconsulting.com/must-haves-for-a-successful-pqc-migration/

epicbytecraft. (Jan. 22, 2024). "Post-Quantum Cryptography Transition: An Analysis of Challenges and Efficiency." Medium. https://medium.com/@epicbytecraft/post-quantum-cryptography-transition-an-analysis-of-challenges-and-efficiency-6f983db24fe5

Bosch Global. (May 8, 2024). "Quantum computing threat: How to prepare for a smooth transition to post-quantum cryptography." Bosch.com. https://www.bosch.com/stories/quantum-computing-threat-how-to-prepare-for-a-smooth-transition-to-post-quantum-cryptography/

**Quantum Key Distribution (QKD)**

National Security Agency. (Sept. 20, 2022). "Quantum Key Distribution (QKD) and Quantum Cryptography (QC)." NSA.gov. https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/

Wikipedia. (Accessed July 20, 2025). "Quantum key distribution." Wikipedia, the Free Encyclopedia. https://en.wikipedia.org/wiki/Quantum_key_distribution

RocketMeUpCybersecurity. (Nov. 13, 2023). "Quantum Key Distribution — An Overview of Secure Communication." Medium. https://medium.com/@RocketMeUpCybersecurity/quantum-key-distribution-an-overview-of-secure-communication-ebbe720d0925

Toshiba Europe. (Accessed July 20, 2025). "Quantum Key Distribution - What Is QKD? How Does It Work?" Toshiba.eu. https://www.toshiba.eu/quantum/products/quantum-key-distribution/', false),
	('db916b14-24d2-45e3-bd22-de5face8472f', 'business-decision-maker', 'Business Decision-Maker', 'Evaluating quantum computing opportunities, developing strategic adoption plans, and guiding investment in emerging technology.', '{"Strategic Planning","Technology Assessment","Risk Management","Budget Allocation","Innovation Roadmapping","ROI Analysis","Stakeholder Management","Market Analysis"}', '2025-04-28 02:04:26.180474+00', 'Business Decision-Makers assessing quantum computing face a complex landscape of technological promise, market uncertainty, and strategic implications. These executives must evaluate when and how to engage with quantum computing to secure competitive advantages while managing the risks of early technology adoption.

Unlike many established technologies, quantum computing requires business leaders to plan for capabilities that are still evolving. Decision-makers must distinguish between near-term applications possible on today''s noisy intermediate-scale quantum (NISQ) devices and longer-term transformative applications that may require fault-tolerant quantum computers. This timing assessment directly impacts investment strategies and competitive positioning.

These executives focus on identifying specific use cases within their organizations where quantum computing might provide material advantages—whether in optimization, simulation, machine learning, or cryptography. They work with technical teams to evaluate quantum readiness, potential ROI, and implementation requirements for these applications.

Strategic decisions about quantum computing extend beyond technology to talent strategy, partnership approaches, and intellectual property considerations. Business leaders must determine whether to build internal quantum capabilities, partner with quantum vendors, or utilize quantum services through cloud providers. They must also consider how quantum advances might affect their industry''s landscape, potentially disrupting established players or creating new opportunities.

Effective decision-makers in this space develop staged approaches to quantum adoption with clear milestones and decision points. They create balanced portfolios of quantum initiatives spanning different time horizons, from near-term pilot projects to longer-term research collaborations. They also establish frameworks for measuring quantum success that account for both technical progress and business impact.

As quantum computing matures, business decision-makers play a critical role in guiding organizations through the quantum adoption journey—balancing enthusiasm for quantum''s potential against practical business considerations and creating strategic roadmaps that position their companies to capture value as quantum capabilities evolve.', true, '2025-07-20 14:38:51.465206+00', '2025-04-30 11:11:51.820419+00', 'The following are a hand-picked selection of articles and resources relating to the Business Decision-Maker''s role and relevant input in the adoption of quantum computing. These include experts in the field, active practitioners, and notable perspectives.

**Executive Overviews & Strategic Guidance**

- McKinsey & Company. (July 26, 2023). "[What Is Quantum Computing?](https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-quantum-computing)" McKinsey & Company. 

- McKinsey & Company. (Feb. 16, 2024). "[The Rise of Quantum Computing.](https://www.mckinsey.com/featured-insights/the-rise-of-quantum-computing)" McKinsey & Company. 

- McKinsey & Company. (April 2024). "Quantum Technology Monitor." McKinsey & Company. https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/steady%20progress%20in%20approaching%20the%20quantum%20advantage/quantum-technology-monitor-april-2024.pdf

- Hidary, J. D. (Jan.–Feb. 2022). "Quantum Computing for Business Leaders." Harvard Business Review. https://www.hbsp.harvard.edu/product/R2201H-PDF-ENG

- Biercuk, M. J. (March 15, 2023). "The Business Case for Quantum Computing." MIT Sloan Management Review. https://sloanreview.mit.edu/article/the-business-case-for-quantum-computing/

- Hurley, W. (March 2024). "Practical Quantum Computing is About More Than Just Hardware." California Management Review. https://cmr.berkeley.edu/2024/03/practical-quantum-computing-is-about-more-than-just-hardware/

**Evaluating Quantum Readiness & ROI**

Bhoolsuwan, P. (April 10, 2024). "How to Evaluate Quantum Readiness in Your Organization." Built In. https://builtin.com/articles/evaluate-quantum-readiness

Singh, S. (May 30, 2024). "Exploring the Readiness of Quantum Computing for Business." EnterpriseTalk. https://enterprisetalk.com/featured/exploring-the-readiness-of-quantum-computing-for-business/

D-Wave. (Nov. 14, 2023). "Quantum Means Business: New Study Finds Organizations Expect Up to 20x ROI from Quantum Optimization Investments." D-Wave Press Release. https://www.dwavequantum.com/company/newsroom/press-release/quantum-means-business-new-study-finds-organizations-expect-up-to-20x-roi-from-quantum-optimization-investments

Byrum, J. (June 1, 2025). "Quantum Computing in Finance 2025: Industry Analysis & Investment Guide." https://www.google.com/search?q=JosephByrum.com. https://josephbyrum.com/quantum-computing-in-finance-2025-industry-analysis/', false);


--
-- Data for Name: case_study_persona_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."case_study_persona_relations" ("id", "case_study_id", "persona_id", "created_at") VALUES
	('618a14ae-2470-4b38-943a-4948aaf97970', 'b0a580db-244f-4360-8190-3f8b39457edd', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-05-07 07:42:44.600338+00'),
	('23be3e2d-4076-467e-8181-cce6f4ba0c43', 'b0a580db-244f-4360-8190-3f8b39457edd', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-05-07 07:42:44.603214+00'),
	('2676baab-bc25-493f-b66a-6114ad7c269c', 'b0a580db-244f-4360-8190-3f8b39457edd', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2025-05-07 07:42:44.606102+00'),
	('3a80e4aa-5a7f-42cd-af2b-f8ce673e56cb', 'fa955b24-adce-45b9-a004-0131a38e4d9f', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 10:33:10.144708+00'),
	('e96c9d2e-fd6e-482f-ae5e-2ed2173b615a', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 10:33:10.144708+00'),
	('8d3f0389-6938-4f6c-b570-0ec75729571e', 'bdc1d580-4643-4156-a148-45e63cb44342', '0803f9d7-7438-422a-b316-e8f76fcd04d1', '2025-07-10 11:21:10.949041+00'),
	('78163ca3-4763-4e09-8927-895278c5c2fc', 'bdc1d580-4643-4156-a148-45e63cb44342', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2025-07-10 11:21:10.949041+00'),
	('65ad16a5-039d-4124-b6f3-786140a1ff0b', 'bdc1d580-4643-4156-a148-45e63cb44342', '1bf021aa-6bc0-455c-9d57-5e40805e1564', '2025-07-10 11:21:10.949041+00'),
	('63095d15-d25a-4bc7-9c3b-5b49e72995c9', 'b0a580db-244f-4360-8190-3f8b39457edd', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2025-05-07 07:42:44.609761+00'),
	('9a68692f-fb2c-49aa-88bf-ed1d8658087c', 'bdc1d580-4643-4156-a148-45e63cb44342', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-10 11:21:10.949041+00'),
	('b4e2efe2-c09d-4448-a9b6-106b38686340', 'b0a580db-244f-4360-8190-3f8b39457edd', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '2025-05-07 07:42:44.612416+00'),
	('2c5bb062-9d55-4c60-96d1-a35c06058c23', 'bdc1d580-4643-4156-a148-45e63cb44342', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-10 11:21:10.949041+00'),
	('f266223e-ca84-4fc5-b807-3cc37f57cf35', 'bdc1d580-4643-4156-a148-45e63cb44342', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-10 11:21:10.949041+00'),
	('29671c72-b855-4af3-8003-2cd7b2a248e2', 'b0a580db-244f-4360-8190-3f8b39457edd', '0803f9d7-7438-422a-b316-e8f76fcd04d1', '2025-05-07 07:42:44.615683+00'),
	('6a8b3fa5-0e04-43e3-8493-8dfd8f955ecc', 'bdc1d580-4643-4156-a148-45e63cb44342', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-10 11:21:10.949041+00'),
	('66419985-24c7-4086-bc20-5c5816359dea', 'bdc1d580-4643-4156-a148-45e63cb44342', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-10 11:21:10.949041+00'),
	('93cf29f3-356d-4a28-a479-25559aeddc0a', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 10:33:10.144708+00'),
	('73edc20b-9598-4f15-bed0-7ea9691cf565', 'b0a580db-244f-4360-8190-3f8b39457edd', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-05-07 07:42:44.619011+00'),
	('74f4575a-761b-4297-b88a-76f09ba2aa27', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 10:33:10.144708+00'),
	('1517a759-6434-428a-9a69-07be574c2719', 'fa955b24-adce-45b9-a004-0131a38e4d9f', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 10:33:10.144708+00'),
	('d8ba5dee-02a9-4d12-9e56-19b926caef5f', '1725a92a-e804-4fb6-af66-5b7bc875834f', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 06:12:23.651802+00'),
	('f362dcc2-f84f-446d-8b3e-efe270b95eae', '93d3d19f-b60a-4714-a6a5-57fc8a6464bf', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 06:26:48.28297+00'),
	('d23abd9c-3eba-4d4a-bff4-4897df80423c', '5bc389e7-9689-4409-aaea-4562dea188da', '1bf021aa-6bc0-455c-9d57-5e40805e1564', '2025-07-22 07:21:31.020515+00'),
	('b8e01b80-d9a6-4f4d-8ad3-bd6aae394164', '5bc389e7-9689-4409-aaea-4562dea188da', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 07:21:31.020515+00'),
	('b50f147a-03d3-4ef3-bf0f-4f2e523870df', '5bc389e7-9689-4409-aaea-4562dea188da', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', '2025-07-22 07:21:31.020515+00'),
	('b21f98d8-652c-4a74-88fb-2ff9b589527b', '5bc389e7-9689-4409-aaea-4562dea188da', '0803f9d7-7438-422a-b316-e8f76fcd04d1', '2025-07-22 07:21:31.020515+00'),
	('f6992c8b-3965-4917-82c8-a725f1e6a613', '5bc389e7-9689-4409-aaea-4562dea188da', 'a25b8a76-3755-4733-90d5-a16ff49de467', '2025-07-22 07:21:31.020515+00'),
	('ef780289-5418-4492-9614-30e04a41d7f4', '5bc389e7-9689-4409-aaea-4562dea188da', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 07:21:31.020515+00'),
	('bb2e7929-b20b-4248-95e6-cee804c16fb7', '5bc389e7-9689-4409-aaea-4562dea188da', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2025-07-22 07:21:31.020515+00'),
	('55ef98cd-8197-4e1e-ab6d-119888d5068f', '5bc389e7-9689-4409-aaea-4562dea188da', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 07:21:31.020515+00'),
	('7514a34b-85a4-4466-8957-198d24704da1', '5bc389e7-9689-4409-aaea-4562dea188da', '461fd87e-a8b2-4060-b333-14b0839aa563', '2025-07-22 07:21:31.020515+00'),
	('d035c49f-4a8f-461d-8a99-6bcac8ef673f', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2025-07-22 06:29:00.229259+00'),
	('cb068075-dd15-4d6b-968c-c0d7fd9d86a6', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 06:29:00.229259+00'),
	('e8cf09a4-5ef5-4960-a1e7-2d06ad34cdee', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 06:29:00.229259+00'),
	('42706eff-6efd-473d-943f-a5e3b8a6776b', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 06:29:00.229259+00'),
	('ed56262d-ba00-4fea-bd7b-7316ab3b7d31', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 06:29:00.229259+00'),
	('3dca89c3-4930-477c-a6cc-fe5dadcdfe73', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2025-07-22 06:29:00.229259+00'),
	('c379a3eb-de28-44a4-8512-7b83e2e46dac', 'ac58e756-1dee-4c5c-ab89-ef14c9f3f5ac', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 06:29:00.229259+00'),
	('07ee90de-dc5c-477f-b864-81ec51f526c4', '9e039b07-ad28-4612-abf8-718d89bb4cc2', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 06:31:04.440358+00'),
	('50b4d6a7-9aa1-4845-881e-b1efcc5be1d0', '9e039b07-ad28-4612-abf8-718d89bb4cc2', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 06:31:04.440358+00'),
	('be65c797-6a52-4cff-b0d0-4aba48a4f6ec', '9e039b07-ad28-4612-abf8-718d89bb4cc2', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 06:31:04.440358+00'),
	('2be606e5-9a39-4a4e-8689-a993837f7941', '9e039b07-ad28-4612-abf8-718d89bb4cc2', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 06:31:04.440358+00'),
	('5ac07288-178b-4393-aba4-754b95e299d1', '5bc389e7-9689-4409-aaea-4562dea188da', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '2025-07-22 07:21:31.020515+00'),
	('ad1f586c-f709-47d7-a8a3-8b2ce1f7739a', '5bc389e7-9689-4409-aaea-4562dea188da', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 07:21:31.020515+00'),
	('0c1c5c46-53f0-4d03-8e01-a6c2072684af', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-05-07 10:33:08.767041+00'),
	('40499d5d-e853-46d5-8043-a8b6a2039004', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2025-05-07 10:33:08.770406+00'),
	('f3b5789c-d9ce-4681-a036-01ff01f33520', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2025-05-07 10:33:08.773145+00'),
	('5728d4db-cceb-4f82-a04a-dba4f53c5dfa', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-05-07 10:33:08.775625+00'),
	('65194d86-0a02-48a9-9f18-9ca396389d41', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '2025-05-07 10:33:08.778204+00'),
	('9a09f805-5472-4f7f-be8c-9a53c5df0eee', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-05-07 10:33:08.781545+00'),
	('489c56bb-224b-433d-9aa6-9d643835d79b', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-05-07 10:33:08.784497+00'),
	('672322ad-9e61-422f-827b-7a5eab58da74', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-05-07 10:33:08.786857+00'),
	('7ef72f12-d3ca-412c-9830-5d691f457083', '5bc389e7-9689-4409-aaea-4562dea188da', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2025-07-22 07:21:31.020515+00'),
	('c9e25574-4644-4ff3-8d00-a53bbc8952c3', '5bc389e7-9689-4409-aaea-4562dea188da', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2025-07-22 07:21:31.020515+00'),
	('b4656fef-d166-40e2-9981-c4310c540836', '315cc55f-e58f-4d1e-8a64-f765bfd37ba2', '0803f9d7-7438-422a-b316-e8f76fcd04d1', '2025-05-07 10:33:08.789098+00'),
	('ae9cc723-9e11-4613-a77a-bfd65a371956', '5bc389e7-9689-4409-aaea-4562dea188da', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 07:21:31.020515+00'),
	('366acfd8-c3bc-4d37-beb1-9e8c7daa8d76', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2025-07-22 06:42:07.161172+00'),
	('559cb76e-87bb-4bb4-8e3c-4b67d36735ee', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 06:42:07.161172+00'),
	('5758fed3-6fb4-49f9-ad3e-c6c4cde3053d', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 06:42:07.161172+00'),
	('2ecc8566-15e7-4fb2-b01b-8cdc25813d79', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 06:42:07.161172+00'),
	('aebe6e74-5eba-4a80-8c90-7237ba14d1d8', 'd775c6d9-0887-409c-a2b1-ff6052ca84ec', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 06:42:07.161172+00'),
	('4c487858-453f-4b45-b4b4-ce312b3799b7', '6560ef0b-87f5-4203-8826-23202351903e', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 14:54:11.276607+00'),
	('5d3e2042-77d2-4917-8691-eda62f1695bd', '6560ef0b-87f5-4203-8826-23202351903e', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 14:54:11.276607+00'),
	('ebb5d402-3734-4873-bb51-cde630ea7d5a', '6560ef0b-87f5-4203-8826-23202351903e', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 14:54:11.276607+00'),
	('4a18c43c-41bf-4d27-a3cd-eb23e28d2320', '6560ef0b-87f5-4203-8826-23202351903e', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 14:54:11.276607+00'),
	('e99d4622-141d-41fb-af76-1ad5c83e1528', '6560ef0b-87f5-4203-8826-23202351903e', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 14:54:11.276607+00'),
	('74afd8ed-8a81-4de8-9b66-d1f36208d659', '99224120-7ece-4b81-9eac-e04716eee201', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 06:44:04.629588+00'),
	('7a1d3a8a-77d6-49b8-bb38-0193ea6fd4cf', 'af449569-c8e6-4ff5-8e04-bb75645465e5', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', '2025-07-22 15:11:45.443914+00'),
	('d9339f8c-916a-4f51-b27f-f2d1fd87695f', 'af449569-c8e6-4ff5-8e04-bb75645465e5', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 15:11:45.443914+00'),
	('a78d9cb2-0c75-4ed8-b22c-6e466cbfb97a', 'af449569-c8e6-4ff5-8e04-bb75645465e5', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 15:11:45.443914+00'),
	('ff184c90-d4f7-4ef2-859f-c6160d1de242', 'af449569-c8e6-4ff5-8e04-bb75645465e5', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 15:11:45.443914+00'),
	('3b720f73-80e3-4287-85ed-4589c1a45620', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 06:58:43.473685+00'),
	('eba8e4a1-1b8b-41e4-b621-a4399fb65f41', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2025-07-22 06:58:43.473685+00'),
	('8cb6f365-7586-4250-b48a-5f25b751396b', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 06:58:43.473685+00'),
	('a5c19d0b-37ec-4a69-98c5-f013fe750a57', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 07:50:05.153785+00'),
	('a85e60a6-d1ad-4ec5-ae5b-9bffce946948', 'b64fccb1-1d09-4445-abd6-6a7bae7bfe11', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 06:58:43.473685+00'),
	('0e77a04b-ff3e-4d6f-9b4d-9920c8fed813', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 07:50:05.153785+00'),
	('3800136f-c1c6-453b-9f42-6cbec6a71094', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2025-07-22 07:50:05.153785+00'),
	('8d1b0904-42d5-42b1-9ff9-864750801aa4', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 07:50:05.153785+00'),
	('b1df1f77-1cf6-4190-ad6d-2ffe7ace1c6d', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '2025-07-22 07:50:05.153785+00'),
	('9b666297-0747-4687-9294-01fc441f87ee', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 07:50:05.153785+00'),
	('0c13bdde-51fe-4eaf-a434-085bb03e127a', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2025-07-22 07:50:05.153785+00'),
	('64122935-649c-48ca-9131-f2df48be3b60', '7df3f9c1-423a-4fea-96d7-d371fde7a0d4', '461fd87e-a8b2-4060-b333-14b0839aa563', '2025-07-22 07:50:05.153785+00'),
	('5c2dae0e-774e-4c82-a4a4-cc0f0b1fc367', '833b4b11-7998-464d-96b5-c1c09376d81a', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 10:22:52.64245+00'),
	('c6d2cbf4-9ec0-4e44-aa1d-13bbd0974474', '833b4b11-7998-464d-96b5-c1c09376d81a', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 10:22:52.64245+00'),
	('ad2cf107-7822-4497-9e69-fccde985a967', '833b4b11-7998-464d-96b5-c1c09376d81a', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 10:22:52.64245+00'),
	('7d44ca5c-44b1-4e46-adae-b7dfc4a6537c', '833b4b11-7998-464d-96b5-c1c09376d81a', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 10:22:52.64245+00'),
	('0035b824-e77e-453a-b140-b3c39502a87b', '2c4b75d8-285a-4f84-acce-69d65d37aa68', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 13:07:58.788455+00'),
	('cc14adc4-d6fc-4575-a464-6af68a34d05e', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 13:07:58.788455+00'),
	('0c50a2aa-30e1-4068-8fd6-b5b7c1a881a7', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 13:07:58.788455+00'),
	('3cbe907b-54ad-488b-a055-cd6aed1de5fc', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2025-07-22 13:07:58.788455+00'),
	('718e4909-40e0-42ba-b53d-5ae2ad7bef0c', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 13:07:58.788455+00'),
	('c517e6b4-f91c-423e-acc1-944961cd7e32', '2c4b75d8-285a-4f84-acce-69d65d37aa68', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 13:07:58.788455+00'),
	('1e29fe10-1e7a-4d98-8246-d3d64214abe9', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 13:14:23.634416+00'),
	('046709a5-b985-4b70-bec5-7de849f17361', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 13:14:23.634416+00'),
	('56e34e00-ec03-4162-b39c-e11b2390474d', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 13:14:23.634416+00'),
	('bba051b2-b55c-409c-b646-1aab2c39f70f', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2025-07-22 13:14:23.634416+00'),
	('ded45575-b404-4e88-a506-ba7fe00eeb30', 'b6e8d697-38b5-4bad-9b52-fe3aea53a8cd', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2025-07-22 13:14:23.634416+00'),
	('e30c28b5-26db-498b-a064-70ccbdbbaf66', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 13:24:05.601525+00'),
	('a5729fe9-9664-4247-aa66-650aed764f41', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', '2025-07-22 13:24:05.601525+00'),
	('1b8dff58-9f1e-4eb0-8e0b-e5accd79084e', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2025-07-22 13:24:05.601525+00'),
	('eaa3aacb-a2d9-482c-bdee-36b3ba52ede7', '2ee41a9d-b30a-4799-b28e-4dd230c9b09a', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 13:24:05.601525+00'),
	('14a167ac-f22b-48a7-8191-594b13cc8fea', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 15:22:31.428837+00'),
	('5ce15c2f-1a87-4ae4-ada1-9f30be9e0d64', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2025-07-22 15:22:31.428837+00'),
	('a5bd9f02-d300-488e-9eac-f1a990ee7870', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 15:22:31.428837+00'),
	('3cc94497-9416-4e8e-980c-e9bb545a7b1e', '5f38c06a-dafe-45b7-98d6-b2539c02d0a2', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 15:22:31.428837+00'),
	('e1b15bd5-8b2e-4bf6-9049-92d6a5c72d44', 'f2b23a03-f51f-488f-aaba-13c3610c6385', 'db916b14-24d2-45e3-bd22-de5face8472f', '2025-07-22 15:25:29.258127+00'),
	('d5fc8d2e-f3df-46f2-a3f8-768e713cdba8', 'f2b23a03-f51f-488f-aaba-13c3610c6385', '4a0c0404-879a-43ef-8980-f8539add284a', '2025-07-22 15:25:29.258127+00'),
	('85cfa04c-ed17-4381-9675-8f7beecc39c3', 'f2b23a03-f51f-488f-aaba-13c3610c6385', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2025-07-22 15:25:29.258127+00'),
	('5b6f26dd-09c8-42e9-93ac-757cc1137ebf', 'f2b23a03-f51f-488f-aaba-13c3610c6385', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', '2025-07-22 15:25:29.258127+00');


--
-- Data for Name: case_study_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: persona_algorithm_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."persona_algorithm_relations" ("persona_id", "algorithm_id", "created_at") VALUES
	('f8d9dfee-ee44-497c-888e-9a81f4359b62', '80b08898-22b2-4d69-bf0b-9398dd0f2409', '2025-07-23 11:26:30.102812+00'),
	('c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '80b08898-22b2-4d69-bf0b-9398dd0f2409', '2025-07-23 11:26:30.924307+00'),
	('7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '80b08898-22b2-4d69-bf0b-9398dd0f2409', '2025-07-23 11:26:31.76201+00'),
	('7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '70021542-f2b3-4293-9fc7-60d237ed5548', '2025-07-23 11:32:40.62809+00'),
	('8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '3c26b0e6-9613-4272-b3d1-58be873c0f3f', '2025-07-23 11:39:34.566785+00'),
	('7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '462de4e7-2a6d-4a7f-8792-39141fadfb15', '2025-07-23 11:42:38.42613+00'),
	('4a0c0404-879a-43ef-8980-f8539add284a', '462de4e7-2a6d-4a7f-8792-39141fadfb15', '2025-07-23 11:42:38.727614+00'),
	('1bf021aa-6bc0-455c-9d57-5e40805e1564', 'fc004b90-0a4a-4c57-88da-50fbf4e00d36', '2025-07-23 13:45:05.268711+00'),
	('7ab75c66-ac98-4796-8d72-83e7a5bde6e3', 'f02557be-ca5c-4b43-94c1-c37484cd6343', '2025-07-23 14:17:24.911175+00'),
	('a25b8a76-3755-4733-90d5-a16ff49de467', 'edd5722d-9749-4ec9-b4a1-46f0d855814e', '2025-07-10 09:23:47.984357+00'),
	('4a0c0404-879a-43ef-8980-f8539add284a', '15f5c62d-1f8e-4986-93f0-ad7fdcf90527', '2025-07-23 11:18:35.251929+00'),
	('7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '15f5c62d-1f8e-4986-93f0-ad7fdcf90527', '2025-07-23 11:18:36.039424+00'),
	('4a0c0404-879a-43ef-8980-f8539add284a', '758dbf16-2b51-4c12-8351-1512a7f5ae03', '2025-07-23 11:20:49.946132+00');


--
-- Data for Name: persona_industry_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."persona_industry_relations" ("id", "persona_id", "industry_id", "created_at") VALUES
	('27d5864e-5a8b-45e1-9620-03db8511dd80', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 15:55:55.215446+00'),
	('689b2922-b62c-4035-af25-cf522081372e', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 15:55:55.799816+00'),
	('7659f17b-c687-401a-b417-e060b80e7b3c', '1bf021aa-6bc0-455c-9d57-5e40805e1564', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 14:37:07.254409+00'),
	('b9e249b2-a9ae-45cc-966a-b0602ce31e4e', '1bf021aa-6bc0-455c-9d57-5e40805e1564', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 14:37:07.847781+00'),
	('a3572146-81e4-42f6-91bd-0e0ede3de011', '1bf021aa-6bc0-455c-9d57-5e40805e1564', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 14:37:08.429343+00'),
	('ca6bf68e-a291-4477-a628-23182c592664', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 15:55:56.358773+00'),
	('be3fa50e-a39a-426f-8ba2-d80fe73334bb', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 15:39:23.636519+00'),
	('f418df5a-624f-45cd-86ba-051b354820e9', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 15:39:24.225019+00'),
	('3499514f-084a-4cf9-9d5b-9a5abedb52fb', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 15:39:24.800982+00'),
	('4f4eb7f5-b270-4c75-8b27-e7529126b7c9', 'db916b14-24d2-45e3-bd22-de5face8472f', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 14:38:52.837689+00'),
	('dbe39730-0e32-412b-aa72-3d2bc74192f0', 'db916b14-24d2-45e3-bd22-de5face8472f', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 14:38:53.11049+00'),
	('4b35e4b7-513f-4405-be1f-c0c4cf445201', 'db916b14-24d2-45e3-bd22-de5face8472f', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 14:38:53.7113+00'),
	('60647104-a61a-4488-865b-fed9729b58fb', 'db916b14-24d2-45e3-bd22-de5face8472f', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 14:38:54.284919+00'),
	('e445c7ce-71ba-4377-b10d-71bb10911f8b', 'db916b14-24d2-45e3-bd22-de5face8472f', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 14:38:54.827204+00'),
	('1500c7da-b968-4426-86e7-f016b326fc7a', 'db916b14-24d2-45e3-bd22-de5face8472f', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 14:38:55.38182+00'),
	('0b30a4cd-389d-48fd-b612-386d1f3e2ade', 'db916b14-24d2-45e3-bd22-de5face8472f', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 14:38:55.942672+00'),
	('29d6a70a-db6d-44d3-8cb6-7919de55876a', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 15:39:25.392587+00'),
	('ceefcd01-1f71-4bf4-9858-e53b1899bf68', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 15:39:25.973008+00'),
	('37583f11-a11d-4622-a9a2-adf65a1211ec', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 15:39:26.538008+00'),
	('d3999cf3-2247-49a8-a869-d399462a140a', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 15:39:27.107728+00'),
	('c8b43b2c-8a8e-4827-94b2-4537a8f4bbe4', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 16:08:30.959397+00'),
	('1d48b0d9-cdcd-4f23-a52f-fe274bb7fc89', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 16:08:31.549823+00'),
	('2de45692-b67a-4692-ba9e-ccb315cf254e', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 16:08:32.12729+00'),
	('a72597bb-ad93-4d64-bea3-330e0a98725f', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 16:08:33.202104+00'),
	('32f7f660-9ec9-4838-bfef-06ec2d453968', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 15:39:27.679173+00'),
	('9de6c7a8-f48e-4641-9ec1-364e08e809aa', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 15:24:39.378894+00'),
	('dae67b58-cd98-49ff-a322-209172b51775', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 15:24:39.947643+00'),
	('c11ef76e-e279-4753-b463-9d68844d9f36', '0c6651e5-8465-43ee-9fef-77ce7275dab5', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 15:24:40.795433+00'),
	('04891a00-52c1-4baa-a400-0ed608462488', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 15:24:41.417057+00'),
	('eb33d0f8-6922-4218-ba1b-7467f2c8c33c', '0c6651e5-8465-43ee-9fef-77ce7275dab5', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 15:24:41.997842+00'),
	('ce34e2b8-a316-48f5-94f3-2a8b8fda8795', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 15:24:42.564299+00'),
	('9b74fca2-0c02-4a10-b9c9-ff76c1386bb2', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 15:24:43.12016+00'),
	('b080c702-cc18-4eb7-b329-3aa047053e91', '0c6651e5-8465-43ee-9fef-77ce7275dab5', 'ff71cc57-063f-495c-bc23-931218e8c043', '2025-07-20 15:24:43.683516+00'),
	('02128665-3dd9-4c5b-9bb3-8e63335b35f9', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 15:39:28.232461+00'),
	('9658d4c1-6e72-4696-b966-7af16e3ceb33', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 15:55:56.931101+00'),
	('9c69923d-f25f-4ac1-8b8d-181f133d0810', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 15:55:57.502485+00'),
	('eed5d931-fe29-46a2-b8ee-143e4c5a1a96', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 15:55:58.06859+00'),
	('177745ac-c2ac-4737-9eb1-416771e522ee', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 15:47:11.430519+00'),
	('ec28f61f-bf44-4a4a-95a2-a115f3f44537', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 15:47:12.515399+00'),
	('deeb6d59-969b-478c-95ca-5f796e0c9625', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 16:08:34.851437+00'),
	('d65ee8df-34b4-4b31-a092-fb43d1e713d7', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 15:47:14.036955+00'),
	('ca07d757-1af5-4702-afac-b33b3b8f7fdd', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 15:47:15.151178+00'),
	('6efe9fcc-bad3-4b0f-9539-ab87a847d921', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 15:55:58.696992+00'),
	('0841a89a-acaf-4355-aec2-5f1b238e00b4', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 16:08:35.422932+00'),
	('f692c254-b3f5-490c-b3b8-efa9d945196d', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 16:08:36.014966+00'),
	('58c24265-6440-419c-ae61-57b6619cd5dc', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 16:08:36.597786+00'),
	('4599a126-b3a1-4530-a123-47cbbaeaa90a', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 15:55:59.289084+00'),
	('7cf960c8-41e3-45e6-b99b-52defbe97e1c', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', 'ff71cc57-063f-495c-bc23-931218e8c043', '2025-07-20 15:55:59.842843+00'),
	('8cfde295-8f86-4a4d-9c53-e50d3a8374bf', '4a0c0404-879a-43ef-8980-f8539add284a', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 15:56:43.611423+00'),
	('65e0b84f-45b1-40e4-9afe-1b928b7c99a9', '4a0c0404-879a-43ef-8980-f8539add284a', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 15:56:44.149636+00'),
	('beeb80af-0f75-441d-b808-d58260bb4c71', '4a0c0404-879a-43ef-8980-f8539add284a', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 15:56:44.698548+00'),
	('b5e98d3d-2369-4001-8b17-aeb5e74b5639', '4a0c0404-879a-43ef-8980-f8539add284a', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 15:56:45.254825+00'),
	('25d8eeef-4bf2-4853-a382-43754a48a8b7', '4a0c0404-879a-43ef-8980-f8539add284a', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 15:56:45.81125+00'),
	('bcee3cf8-0112-43b1-a808-fa7dbccd9e37', '4a0c0404-879a-43ef-8980-f8539add284a', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 15:56:46.35936+00'),
	('5c24b90e-5532-4a7b-828d-e3826d665203', '4a0c0404-879a-43ef-8980-f8539add284a', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 15:56:46.905557+00'),
	('32a9b04e-7579-4ca4-a7ef-d0670adfc468', '4a0c0404-879a-43ef-8980-f8539add284a', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 15:56:47.463306+00'),
	('6f663696-0435-4c0d-857a-9fd6dda9b1f2', '4a0c0404-879a-43ef-8980-f8539add284a', 'ff71cc57-063f-495c-bc23-931218e8c043', '2025-07-20 15:56:48.030044+00'),
	('9822c723-20e3-486d-ada1-7275a565e5f4', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 16:08:37.17122+00'),
	('b07e973f-dcd0-4fef-ba9e-51e5dd0bc397', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 16:04:02.144563+00'),
	('5bfeed08-1fd6-4a2c-ae26-efbc6f553ec5', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 16:04:03.260415+00'),
	('239a2a15-74ea-40fc-8784-c29632a4bab9', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 16:04:03.842807+00'),
	('5b86077f-9253-43c6-8eec-0dfeb927bd69', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 16:04:04.407622+00'),
	('4ef82acd-e880-4ca5-aa53-d416055fe71d', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 15:55:55.508055+00'),
	('311ccf7c-5c70-4fcc-b381-ec4d5bfb9d01', '1bf021aa-6bc0-455c-9d57-5e40805e1564', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 14:37:07.546856+00'),
	('6a27c876-6e97-41ad-bac6-c3206e6f9790', '1bf021aa-6bc0-455c-9d57-5e40805e1564', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 14:37:08.145315+00'),
	('45d528ca-d7ba-4ffe-bc34-accd01f1bac1', '1bf021aa-6bc0-455c-9d57-5e40805e1564', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 14:37:08.702202+00'),
	('8149e71a-5022-4bf6-83eb-59d214c1ff26', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 15:55:56.080908+00'),
	('18a53df3-88f1-4400-8b12-7eeadf700c83', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 15:55:56.646528+00'),
	('6407d472-deb6-4e50-bc69-5d9b2d8bb1d4', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 15:55:57.215955+00'),
	('f1ff3416-e5f5-41f3-a47c-d3418dc725c0', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 15:55:57.785098+00'),
	('7e39ed72-21c6-442d-8008-5195913cd332', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 15:55:58.408211+00'),
	('1817dd79-e3be-49ea-9c8c-12a5bea78874', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 15:55:58.990797+00'),
	('0c71d5ce-ccf1-4bbc-9fdf-ab988c8d0b57', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 15:55:59.570191+00'),
	('3850ac96-7677-4424-ae6b-2b3bbb5f046a', '1ded3f85-23ec-4a89-b5c9-d579ed9b681e', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 15:56:00.127561+00'),
	('e12ff475-344a-47f9-a0c0-393a43a28db1', '4a0c0404-879a-43ef-8980-f8539add284a', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 15:56:43.306237+00'),
	('902fabaa-da33-45be-9c5e-70cafbf08745', '4a0c0404-879a-43ef-8980-f8539add284a', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 15:56:43.882973+00'),
	('84b00a32-2880-46d2-a19b-869cc16b8b1f', '4a0c0404-879a-43ef-8980-f8539add284a', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 15:56:44.42109+00'),
	('a5e180cd-8c92-46d8-afab-529db2d522ae', '4a0c0404-879a-43ef-8980-f8539add284a', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 15:56:44.977316+00'),
	('b328ab02-b1f4-40aa-8b24-0ce26695f98d', '4a0c0404-879a-43ef-8980-f8539add284a', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 15:56:45.534732+00'),
	('71fded7d-408e-4ae3-b645-2c1ae63aedd7', '4a0c0404-879a-43ef-8980-f8539add284a', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 15:56:46.09197+00'),
	('4782f60b-2514-4ba4-99d0-559c0f5fd428', '4a0c0404-879a-43ef-8980-f8539add284a', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 15:56:46.633485+00'),
	('89167414-241d-4f1f-bcdf-f60757f1538f', '4a0c0404-879a-43ef-8980-f8539add284a', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 15:56:47.179849+00'),
	('589f3f63-7cab-47d6-9d64-abf6abf97edc', '4a0c0404-879a-43ef-8980-f8539add284a', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 15:56:47.742566+00'),
	('3efb4974-1503-46e6-bdf1-cae6ef18a285', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 16:08:30.646544+00'),
	('8ab7eb6e-7940-4086-8c32-765fc6d8ea15', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 16:08:31.259984+00'),
	('d130f6d9-12a9-4fca-a081-f384aa5a6900', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 16:08:31.834723+00'),
	('887053e3-293e-4290-a720-46eb81464556', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 16:08:32.407657+00'),
	('987d03da-6c55-4e6e-8568-a0f80a7b5434', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 16:08:34.020738+00'),
	('83fa9c3f-2642-45bb-8203-09d6ea237a78', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 16:08:35.132849+00'),
	('68484b97-f37f-494e-8611-97e18dd6ecab', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 16:08:35.725873+00'),
	('4fdd58f6-f03c-47ab-809f-db4ab77d76c1', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 16:08:36.301157+00'),
	('9f690841-759b-4d32-a3ea-1b0d353cbefd', '7ab75c66-ac98-4796-8d72-83e7a5bde6e3', 'ff71cc57-063f-495c-bc23-931218e8c043', '2025-07-20 16:08:36.883777+00'),
	('912b01b4-fbeb-498b-93c6-cbe5a036bb5c', 'db916b14-24d2-45e3-bd22-de5face8472f', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 14:38:52.553771+00'),
	('d087ef11-7456-493c-ac7e-050fb120c41f', 'db916b14-24d2-45e3-bd22-de5face8472f', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 14:38:53.40912+00'),
	('ac25d501-415a-454d-9a4f-4e9d7bbd5041', 'db916b14-24d2-45e3-bd22-de5face8472f', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 14:38:54.009284+00'),
	('76f493f6-a2c8-46c2-9b9f-5b461d27aa22', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 15:39:23.345536+00'),
	('d0861869-9c8a-40e4-a49c-1afb685e35bf', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 15:39:23.933833+00'),
	('859e0f8c-3d58-4d9f-acb5-24360b2790f8', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 15:39:24.518909+00'),
	('74cac538-69fc-4a0c-9793-16184dbabaa3', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 15:39:25.09265+00'),
	('f8b76743-8a2a-4195-bf8a-c55bb23c7619', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 15:39:25.68276+00'),
	('60799f96-fcad-4e4f-a028-d3ef848d279d', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 15:39:26.257887+00'),
	('970a7aa4-0608-47e7-aa7b-c13638a1e315', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 15:39:26.828911+00'),
	('992fd1e4-3640-4ddd-afb1-d558562ea341', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 15:39:27.389467+00'),
	('881281f5-577f-4ef7-b4a4-1b6c70289197', '0b8c79e2-7bac-4dd5-965d-70e8ae8ff39d', 'ff71cc57-063f-495c-bc23-931218e8c043', '2025-07-20 15:39:27.954919+00'),
	('978f879f-2411-4f4a-99cd-c7f2c08aa7fe', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 15:47:10.630723+00'),
	('b5c1cfd4-03a5-487d-81d5-8888750e77a9', 'db916b14-24d2-45e3-bd22-de5face8472f', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 14:38:54.551391+00'),
	('02407432-816f-48a8-adcc-4a8944891a46', 'db916b14-24d2-45e3-bd22-de5face8472f', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 14:38:55.101349+00'),
	('2028a73a-ed6f-4a16-b2a1-3c89e84a3457', 'db916b14-24d2-45e3-bd22-de5face8472f', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 14:38:55.664922+00'),
	('466ab7d7-c9e7-484d-acd4-e1ea18b2afad', 'db916b14-24d2-45e3-bd22-de5face8472f', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 14:38:56.209317+00'),
	('84b846cc-e565-42fc-999b-6fe381401f5b', '461fd87e-a8b2-4060-b333-14b0839aa563', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 13:04:57.066065+00'),
	('55c439ff-15ea-4105-a777-b53b3406a736', '461fd87e-a8b2-4060-b333-14b0839aa563', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 13:04:57.354176+00'),
	('6d59abb8-a18c-4279-a510-d3ae5d7607f3', '461fd87e-a8b2-4060-b333-14b0839aa563', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 13:04:57.640686+00'),
	('cd5df2a5-ab70-4253-b9c1-a0b7dbcbcf88', '461fd87e-a8b2-4060-b333-14b0839aa563', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 13:04:57.927159+00'),
	('555ed4f2-02aa-4f3b-9012-9ea40d71a32c', 'a25b8a76-3755-4733-90d5-a16ff49de467', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 13:19:49.395018+00'),
	('4238f133-e224-44a4-95aa-abe19af350cd', 'a25b8a76-3755-4733-90d5-a16ff49de467', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 13:19:50.167128+00'),
	('f96752dc-e662-4cfe-b150-d6b6ba586095', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 15:24:39.094889+00'),
	('183f40c9-6225-4079-867a-3c70656ad59d', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 15:24:39.65866+00'),
	('68243c30-cf93-47ac-9e93-38532a922eeb', '0c6651e5-8465-43ee-9fef-77ce7275dab5', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 15:24:40.237176+00'),
	('5144b7bf-09fb-4b2b-97c2-ef843c575423', '0803f9d7-7438-422a-b316-e8f76fcd04d1', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 13:26:15.702003+00'),
	('567f22ca-5af1-4087-b282-aea9ea3a8755', '0803f9d7-7438-422a-b316-e8f76fcd04d1', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 13:26:15.978751+00'),
	('9f2735e7-6422-4076-abad-78c6e9ecc28c', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 13:38:48.869694+00'),
	('72cd0815-6dc2-4641-bec9-b4c2929952a9', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 13:38:49.166983+00'),
	('60aad588-f5d7-42d3-8fe9-e360b6cbf85e', 'f8d9dfee-ee44-497c-888e-9a81f4359b62', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 13:38:49.458407+00'),
	('2450883d-c8f2-44de-9e20-e7995a286128', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 15:24:40.518153+00'),
	('413e40c8-c266-4f04-82dc-2d1e70ce7292', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 15:24:41.077049+00'),
	('06621e0e-c4ae-403d-a7fc-fdd5e2b7c361', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 15:24:41.707676+00'),
	('c7771c90-52f1-4ca3-bafb-a70cfe23c1d7', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 15:24:42.280809+00'),
	('bfbad4ee-1d81-49f3-ae0d-544f32bf1058', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 15:24:42.838542+00'),
	('c3b1ef2a-170a-4154-8511-2fa2ed0f34db', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 15:24:43.400464+00'),
	('42579516-bee1-42c8-8c01-ff32a8b3d511', '0c6651e5-8465-43ee-9fef-77ce7275dab5', '5cd02227-5ee6-4ebe-b18f-e9632d12ba00', '2025-07-20 15:24:43.95887+00'),
	('7579436a-3638-4953-8291-8f5069588c9d', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 15:47:12.23446+00'),
	('d55dfe4c-77c0-4f7e-a354-f080eb68e6d8', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 15:47:13.268622+00'),
	('68fac164-7c7b-4cc4-a8ea-abf16e41b837', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 15:47:14.311092+00'),
	('d8cebd82-af0d-4842-9e7b-b748f873dde5', 'fd66f479-4e78-4b6b-94fd-5d1eba412827', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 15:47:15.439463+00'),
	('64ccab16-34ce-4739-a3b2-a1165a57c484', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '189dffed-0f2f-48c8-b854-4b85cb3c2552', '2025-07-20 14:08:46.028643+00'),
	('013f467e-97a4-4268-ae5a-4eca0cd565f9', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 14:08:46.305003+00'),
	('804aefd7-b57b-4872-ab81-a091f0684564', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 14:08:47.118332+00'),
	('1d5555dd-549e-4d12-acdc-386f72895811', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2fda6bc9-b1af-45bf-bd74-feb977f7b5ba', '2025-07-20 14:08:47.936287+00'),
	('9ab1bbab-6898-43cf-b6df-1054980a8a47', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 14:08:48.76754+00'),
	('c9d6e855-b968-4003-8eab-a6854c455aa5', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '90129900-eff4-40ab-a1b3-afa1076913b4', '2025-07-20 14:08:49.050656+00'),
	('02a4a93e-daab-4b26-a2b1-d4add0f0abed', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', 'dfd50ac9-7178-4bf9-82ea-dd26029c8531', '2025-07-20 14:08:49.819849+00'),
	('51511b09-60d3-4ae9-b4c2-f574b63e5dbd', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '51d18938-6be2-4159-ba3f-5de625ef89a2', '2025-07-20 14:08:50.095702+00'),
	('31277cfa-478a-4edb-9a58-9452b2ad2e2e', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '8a38ecbe-666d-474a-8865-4fe78f0bc8ef', '2025-07-20 14:08:50.370115+00'),
	('239c2e54-268a-49d4-836d-570cd1f3ab54', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 14:08:50.646436+00'),
	('6369aaa0-bf42-4caf-bfce-239ea7899537', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', 'd72833ae-f810-46a3-8706-d9f72caf6d6b', '2025-07-20 14:08:51.457433+00'),
	('4c96f498-4117-404f-af2c-9c0f6d0b758b', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '5503546c-2a11-40cb-a337-ef48c8a8ffc1', '2025-07-20 14:08:51.741468+00'),
	('7ed0a834-d03f-4118-9140-cd75425cc302', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 14:08:52.021248+00'),
	('7a7fce20-f688-4387-a0c9-eb7e47d81f57', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '03442b90-0b94-4d13-a381-04a217fcff80', '2025-07-20 14:08:52.865856+00'),
	('7a88b920-0653-40fa-9a6e-d9b9658bd8e1', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '80d3140c-9091-482a-982c-70163fed8bcf', '2025-07-20 14:08:53.157194+00'),
	('30c7fb22-beef-43dc-89f8-32f5e9139fdb', '8c4a6f57-b6a2-4585-9690-4a19d14b54c4', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 14:08:53.994369+00'),
	('f97a7ef0-2e7e-4043-a7e8-ae281fe38281', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '3fbac019-2c76-4b8c-a956-31d3e9e3c60c', '2025-07-20 16:04:01.557531+00'),
	('e3226859-95ce-4d93-9938-e96acba84a5d', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '188500c1-6295-41ef-b5ae-6f8b03055eae', '2025-07-20 16:04:01.856323+00'),
	('6aba557c-2ca4-4773-b3b3-eec53f6f5e3f', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2987e482-87ed-42da-9013-6d19358350eb', '2025-07-20 16:04:02.437394+00'),
	('056fa19b-d464-41fe-96a3-6bc083fd8aad', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', 'ed04bf1e-6279-4f81-982d-a2429e9abffb', '2025-07-20 16:04:03.551667+00'),
	('771f817d-02bd-4ac2-b973-da624b5724ff', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '2cf5077d-9e9d-467f-a850-b32a7b1a7afe', '2025-07-20 16:04:04.118187+00'),
	('67c88365-287c-44db-84f3-9b1728eca3bc', 'c75bbdd2-6e27-4b91-a4fa-254459a1ad62', '961829fa-278f-4e04-9c5f-89e5a5ad9d8a', '2025-07-20 16:04:04.697478+00');


--
-- Data for Name: stack_layers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_preferences" ("id", "theme_preference", "ui_preferences", "email_preferences", "created_at", "updated_at", "role") VALUES
	('2c956050-3a2b-4de4-9e39-942b9ee9f402', 'system', '{"code_font_size": "medium", "sidebar_collapsed": false}', '{"newsletter": false, "product_updates": false, "case_study_alerts": false}', '2025-04-18 07:25:06.074695+00', '2025-04-18 07:25:06.074695+00', 'admin');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 370, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
