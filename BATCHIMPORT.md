# Qookie Case Study Batch Import Research & Planning

**Date:** January 2025  
**Context:** Planning bulk import of 100+ AI-generated case studies from Qookie to OpenQase  
**Role:** CTO Strategic Analysis

---

## Executive Summary

We need to import 100+ high-quality case studies from Qookie (AI research tool) into OpenQase production. This represents a 3-5x content growth opportunity that would significantly expand our case study library.

---

## Qookie Data Analysis

### Repository Information
- **Source:** https://github.com/ddri/qookie
- **Purpose:** AI-assisted research tool for generating quantum computing case studies

### Data Structure & Storage
- **Primary Storage:** CSV-based partnership data
  - Fields: `id, quantum_company, commercial_partner, year, notes`
- **Generated Content:** Case studies created dynamically using Claude AI
- **Output Formats:**
  - Markdown (.md files)
  - JSON
  - Local cache storage

### Export Capabilities
1. **Manual Export:** "Export Markdown" button for individual case studies
2. **GitHub Backup:** Automatic push to `exports/` folder in repository
3. **Dual Format Support:** Both markdown and JSON versions

---

## Recommended Implementation Strategy

### Phase 1: Batch Import Tool (2-3 days)
- Admin CLI tool for one-time bulk import
- Data validation and preview capabilities
- Rollback functionality

### Expected Impact
- 75% reduction in manual data entry
- 3-5x content library growth
- Standardized import pipeline for future use

---

*This document serves as the foundation for creating a detailed PRD and implementation plan.*