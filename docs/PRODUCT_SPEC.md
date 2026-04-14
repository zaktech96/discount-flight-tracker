# Product Specification: Discount Flight Tracker

## Overview
Discount Flight Tracker is a standalone utility designed to track flight prices and alert users when they drop below a set threshold.

## Core Features

### 1. Real-time Flight Search
- Integrates with flight data providers (e.g., Amadeus) to retrieve the latest flight options and prices for a given route and date.
- Offers a seamless and fast UI to query routes instantly.

### 2. Convex-powered Price Alerts
- Users can set a target price for a specific route.
- Convex Cron Jobs poll the flight search APIs at scheduled intervals.
- Persistent alerts are saved and tracked within the Convex database, ensuring high reliability and zero manual state management.

### 3. Resend Email Notifications
- When a tracked flight's price falls below the user's target, an automated "Guardian Intercept" alert is triggered.
- Emails are reliably delivered via Resend with dynamic templates containing the route, current price, and airline details.
- Alerts are automatically deactivated upon successful notification to prevent spam.