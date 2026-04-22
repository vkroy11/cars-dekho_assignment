📄 PRD.md — Car Decision Assistant

1. 🧭 Product Overview

Product Name: Car Decision Assistant

Summary:
A web platform that helps everyday car buyers move from confusion to clarity by simplifying car specs, enabling structured comparison, and guiding them through a decision journey—from exploration to final shortlist.

Core Value Proposition:

Reduce 50 overwhelming car options into 3 clear, explainable choices tailored to user preferences.

2. 🎯 Target Audience

Primary Users:

First-time or occasional car buyers
Limited understanding of automotive specifications
Overwhelmed by too many choices

User Pain Points:

Cannot interpret technical specs (bhp, torque, etc.)
Struggle to compare multiple cars effectively
Fear of making a wrong purchase decision 3. 🔥 Problem Statement
Users do not understand car specifications
Users cannot compare cars efficiently
Users lack a structured buying journey 4. 💡 Product Goals
Simplify car specifications into understandable insights
Provide clear, ranked recommendations
Enable side-by-side comparison with trade-offs
Guide users through a structured decision journey 5. 🧩 Core Features
5.1 🧠 Preference Input (Questionnaire)

Inputs:

Budget (min–max)
Car Type (SUV, Sedan, Hatchback)
Priority Weights:
Mileage
Performance
Safety
Brand Value
Maintainance

Output:

{
budgetMin,
budgetMax,
type,
weights: {
mileage,
performance,
safety,
brand
}
}
5.2 ⚖️ Weighted Recommendation Engine

Each car is scored using weighted priorities.

Formula:

score =
(w1 _ mileage_score) +
(w2 _ performance_score) +
(w3 _ safety_score) +
(w4 _ brand_score)

Steps:

Normalize all attributes (0–1 scale)
Apply weights
Rank cars
Return top 3–5 cars
5.3 📊 Comparison Simplifier

UI:

Feature Car A Car B Winner
Mileage 20 17 A
Power 110 140 B
Safety 4★ 5★ B

Highlights:

Best in category
Trade-offs clearly visible
5.4 🧾 Explainable Recommendations

Each recommendation includes reasoning:

Example:

“Recommended because it offers the highest mileage and strong safety within your budget.”

5.5 📉 Trade-off Visualization
Bar comparison OR radar chart
Shows:
Mileage vs Performance
Safety vs Cost
5.6 📌 Shortlist + Decision Tracker

Stages:

Exploring
Comparing
Shortlisted
Test Drive
Final Decision
5.7 ▶️ YouTube Review Integration

On click:

https://www.youtube.com/results?search_query=<car_name>+review 6. 🧱 User Flow
Landing Page → “Find Your Car”
Preference Input
Recommendations Page
Comparison View
Shortlist Management
Car Detail Page (with review link) 7. 🧰 Tech Stack

Frontend + Backend:

Next.js (full-stack)

Database:

MongoDB

State Management:

Zustand / Context API

Scraping Tools:

Puppeteer / Playwright / Cheerio 8. 🗃️ Data Model
Car
{
name: string,
brand: string,
price: number,
mileage: number,
power: number,
safetyRating: number,
type: string,
pros: string[],
cons: string[]
}
User Preferences
{
budgetMin: number,
budgetMax: number,
type: string,
weights: {
mileage: number,
performance: number,
safety: number,
brand: number
}
}
Shortlist
{
userId: string,
carId: string,
stage: "exploring" | "shortlisted" | "test_drive" | "final"
} 9. 🧪 Data Collection Strategy (Scraping)
9.1 Sources

Primary:

CarDekho (cars, specs, pricing)

Secondary:

ZigWheels (pros/cons, insights)
9.2 Scraping Approach

Tools:

Puppeteer (for dynamic pages)
Cheerio (for parsing HTML)
9.3 Scraping Flow

1. Fetch car listing pages
2. Extract car URLs
3. Visit each car page
4. Extract:
   - Name
   - Price
   - Mileage
   - Power
   - Safety
   - Type
5. Save raw data
   9.4 Data Cleaning

Raw scraped data → structured format

Example:

"18 kmpl" → 18
"115 bhp" → 115
9.5 Normalization

Convert values to comparable scale:

normalized = (value - min) / (max - min)
9.6 Data Storage

Store in MongoDB:

cars collection
Precomputed normalized values (optional)
9.7 Data Volume (MVP)
20–50 cars
Focus on:
Popular Indian models
Different segments 10. ⚙️ Backend Logic
10.1 Scoring Pipeline
Fetch cars →
Filter by budget/type →
Normalize attributes →
Apply weights →
Sort →
Return top results
10.2 API Endpoints

POST /recommend

Input: user preferences
Output: ranked cars

GET /cars

List cars

POST /shortlist

Add/update car stage 11. 🎨 UI Requirements
Clean, minimal interface
Avoid technical jargon
Use:
Icons
Tooltips (for specs)
Highlight winners in comparisons 12. 🚀 MVP Scope
Must Have:
Preference input
Recommendation engine
Comparison table
Explainable insights
Shortlist tracker
YouTube review link
Nice to Have:
Charts (radar/bar)
Pros/cons display
Excluded:
Real authentication
Live test drive booking
Real-time data sync 13. 📈 Success Metrics
Time taken to shortlist
Number of cars reduced (e.g., 50 → 3)
User interactions with comparison feature
Shortlist completion rate 14. ⚠️ Risks & Mitigation
Risk Mitigation
Scraping breaks Cache data locally
Inconsistent data Normalize + validate
Too complex UI Keep minimal MVP 15. 🔮 Future Scope
AI-based recommendations
Real test drive booking
Price alerts
Personalized dashboards
