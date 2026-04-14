# Architect Guide

## Route Structure
- `/` - Main landing and search interface.
- `/track/:id` - Dynamic tracking route for specific flight alerts (e.g. `LHR-JFK`).

## Intelligence Layer
The intelligence layer acts as the bridge between Convex (data persistence) and Gemini (data reasoning).

## Standardization
Note: Gemini-generated UI copy must follow the "Flight Tracker Rule" (hyphen-minus dashes and terminal minimalist aesthetic).