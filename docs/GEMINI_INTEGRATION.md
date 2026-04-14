# Gemini Integration Blueprint

## 1. Core Model
The core reasoning engine is Gemini 3 Flash (Paid Tier) via the Google AI SDK.

## 2. Intent Parsing
Use Case: Converting user text (e.g., "I want to fly to Tokyo for under £600") into structured Convex queries.

## 3. Price Guarding
Use Case: Using Gemini to analyze historical price trends in Convex and predict the 'Optimal Booking Window'.

## 4. Security
Implementation of server-side Gemini calls within Convex Actions to keep API keys hidden.