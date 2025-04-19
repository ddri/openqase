# Supabase Schema Documentation

This document describes the database schema for the OpenQASE platform. The database is organized around several core entities that manage quantum algorithms, case studies, industries, and user data.

## Table: algorithms
Stores information about quantum algorithms and their applications.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the algorithm |
| slug | string | URL-friendly version of the algorithm name |
| name | string | Display name of the algorithm |
| description | string | Brief description of the algorithm |
| use_cases | object | Array of use cases where this algorithm is applicable |
| quantum_advantage | string | Description of the quantum advantage this algorithm provides |
| published | boolean | Whether the algorithm is publicly visible |
| created_at | string | Timestamp of when the record was created |
| updated_at | string | Timestamp of when the record was last updated |
| mdx_content | string | MDX format content describing the algorithm |
| key_applications | object | Array of key applications for this algorithm |
| ts_content | string | TypeScript content related to the algorithm |

## Table: case_studies
Contains detailed case studies of quantum computing applications.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the case study |
| slug | string | URL-friendly version of the case study title |
| title | string | Title of the case study |
| description | string | Brief description of the case study |
| content | string | Main content of the case study |
| partner_companies | object | Array of companies partnering in this case study |
| quantum_companies | object | Array of quantum computing companies involved |
| url | object | Related URLs and references |
| algorithms | object | Array of algorithms used in this case study |
| industries | object | Industries relevant to this case study |
| personas | object | Target personas for this case study |
| quantum_hardware | object | Quantum hardware used in this implementation |
| published | boolean | Whether the case study is publicly visible |
| published_at | string | Timestamp when the case study was published |
| created_at | string | Timestamp of when the record was created |
| updated_at | string | Timestamp of when the record was last updated |
| mdx_content | string | MDX format content of the case study |
| difficulty | object | Difficulty level indicators |
| tags | object | Array of tags categorizing the case study |
| metrics | object | Performance metrics and results |
| technologies | object | Technologies used in the implementation |
| ts_content | string | TypeScript content related to the case study |
| stack_layers | object | Quantum stack layers involved |

## Table: case_study_relations
Manages relationships between case studies and other entities (currently empty).

## Table: industries
Catalogs different industries and their quantum computing applications.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the industry |
| slug | string | URL-friendly version of the industry name |
| name | string | Name of the industry |
| description | string | Description of the industry |
| icon | string | Icon identifier for the industry |
| created_at | string | Timestamp of when the record was created |
| mdx_content | string | MDX format content about the industry |
| key_applications | object | Array of key quantum computing applications in this industry |
| ts_content | string | TypeScript content related to the industry |

## Table: personas
Defines user personas for targeting content and experiences.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the persona |
| slug | string | URL-friendly version of the persona name |
| name | string | Name of the persona |
| description | string | Description of the persona |
| role | string | Professional role of the persona |
| industry | object | Related industry information |
| key_interests | object | Array of key interests for this persona |
| technical_level | string | Technical expertise level |
| created_at | string | Timestamp of when the record was created |
| mdx_content | object | MDX format content about the persona |
| expertise | object | Areas of expertise |
| persona_type | object | Type classification of the persona |
| related_case_studies | object | Case studies relevant to this persona |
| ts_content | string | TypeScript content related to the persona |

## Table: stack_layers
Defines layers in the quantum computing stack (currently empty).

## Table: user_preferences
Stores user preferences and settings.

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | Unique identifier for the user preferences |
| theme_preference | string | User's preferred UI theme |
| ui_preferences | object | General UI preferences and settings |
| email_preferences | object | Email notification preferences |
| created_at | string | Timestamp of when the record was created |
| updated_at | string | Timestamp of when the record was last updated |
| role | string | User's role in the system |

