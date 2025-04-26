# Supabase Schema Documentation

## Table: algorithms

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | |
| slug | string | |
| name | string | |
| description | string | |
| use_cases | object | |
| quantum_advantage | string | |
| published | boolean | |
| created_at | string | |
| updated_at | string | |
| main_content | string | |
| ts_content | string | |

## Table: case_studies

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | |
| slug | string | |
| title | string | |
| description | string | |
| main_content | string | |
| partner_companies | object | |
| quantum_companies | object | |
| url | object | |
| algorithms | object | |
| industries | object | |
| personas | object | |
| quantum_hardware | object | |
| published | boolean | |
| published_at | string | |
| created_at | string | |
| updated_at | string | |

## Table: industries

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | |
| slug | string | |
| name | string | |
| description | string | |
| icon | string | |
| created_at | string | |
| main_content | string | |
| ts_content | string | |

## Table: personas

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | |
| slug | string | |
| name | string | |
| description | string | |
| role | string | |
| industry | object | |
| created_at | string | |
| main_content | string | |
| persona_type | object | |
| related_case_studies | object | |
| ts_content | string | |

## Table: user_preferences

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| id | string | |
| theme_preference | string | |
| ui_preferences | object | |
| email_preferences | object | |
| created_at | string | |
| updated_at | string | |
| role | string | |

