# Gemini Integration Blueprint

## 1. Core Model
The core reasoning engine is Gemini 3 Flash (Paid Tier) via the Google AI SDK.

## 2. Intent Parsing
Use Case: Converting user text (e.g., "I want to fly to Tokyo for under £600") into structured Convex queries.

## 3. Price Guarding
Use Case: Using Gemini to analyze historical price trends in Convex and predict the 'Optimal Booking Window'.

## 5. UI & Interaction
### High-Performance Conveyor Belt
- **Dynamic Speed Scaling**: The 'Pick your next getaway' section uses a linear speed model (`visible.length * 3s`) to ensure a consistent, non-jittery experience regardless of filter selection.
- **Infinite Loop Architecture**: Implemented using a 20x item duplication with a precise `-5%` translation loop to maintain perfect visual continuity across all screen resolutions.
- **Region Filtering**: Deep integration with the `DESTINATIONS` dataset ensures instant reactivity and smooth transitions between global regions.