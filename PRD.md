# YoloCalc Product Requirements Document

## Overview

**Product:** YoloCalc - Experience-First Retirement Calculator
**Tagline:** Retire with memories, not just money.
**Version:** 1.0

YoloCalc is a web-based retirement planning tool that prioritizes life experiences over raw financial numbers. Unlike traditional calculators that answer "how much do I need?", YoloCalc answers "what life can I live?" by mapping experiences to optimal life stages and showing users a visual timeline of both money and memories.

---

## Problem Statement

Traditional retirement calculators:
- Output a single intimidating number with no context
- Treat all spending as identical annual line items
- Ignore that some experiences are time-sensitive (hiking Everest at 35 vs 65)
- Don't account for children's ages and family experience windows
- Feel punitive ("you're behind") rather than aspirational

Users deserve a tool that shows them the life they can actually live — not just a balance sheet.

---

## Target Users

**Primary:** Adults ages 25-50 who:
- Have some retirement savings but feel disconnected from what it means
- Have or plan to have children
- Value experiences over accumulation
- Want to understand trade-offs between "save more" and "live now"

**Secondary:** Financial advisors who want a visual tool to discuss experience-based planning with clients.

---

## Core Concepts

### One-Way Doors
Experiences that are optimal at a specific life stage and diminish or close over time:
- Physically demanding adventures (trekking, diving, surfing)
- Family experiences while kids are specific ages (Disney at 6, backpacking at 16)
- Multi-generational travel while parents are healthy
- Sabbaticals before career anchors you
- Heritage trips with aging relatives

### Two-Way Doors
Experiences that are wonderful at any age — can be scheduled flexibly:
- Beach vacations and resorts
- City trips and cultural tourism
- Cruises (often better later in life)
- Food/wine tourism
- Domestic road trips

### Kids' Sweet Spots
Specific age ranges where family experiences hit peak magic:
- Ages 4-7: Disney, first beach, pure wonder
- Ages 8-12: National parks, camping, family Europe trip
- Ages 13-17: Backpacking, heritage trips, pre-college adventures
- Ages 18+: They're building their own adventures

### Memory Dividend
The concept that $5,000 spent on a trip at 35 generates 50 years of memories, while the same trip at 70 generates 15. Earlier experiences compound in value through decades of retelling, inside jokes, and family lore.

---

## Features

### Screen 1: Financial Inputs
**Route:** `/calculator`

Six core inputs with smart defaults:
1. **Current Age** (required) - Default: 35
2. **Target Retirement Age** (required) - Default: 65
3. **Current Savings** (required) - Default: $100,000
4. **Monthly Contribution** (required) - Default: $1,000
5. **Expected Annual Return** (optional) - Default: 7%
6. **Annual Income** (optional) - Used for lifestyle benchmarking

**Children Section:**
- Add children with their current ages
- System automatically calculates experience sweet spots

**Privacy:**
- All calculations happen client-side
- No data leaves the browser
- No login required
- No cookies or tracking

### Screen 2: Experience Selection
**Route:** `/experiences`

**Pre-built Experience Templates:**
Organized by category with one-way/two-way door indicators

| Category | Experience | Type | Default Cost | Optimal Age Range |
|----------|-----------|------|--------------|-------------------|
| Adventure | Everest Base Camp Trek | One-way | $8,000 | 25-50 |
| Adventure | Scuba Certification + Trip | One-way | $4,000 | 25-55 |
| Adventure | African Safari | Two-way | $12,000 | Any |
| Family | Disney World (per kid) | One-way | $6,000 | Kid 4-10 |
| Family | Europe Family Trip | One-way | $15,000 | Kid 8-14 |
| Family | National Parks Road Trip | One-way | $5,000 | Kid 6-14 |
| Family | Heritage/Ancestry Trip | One-way | $10,000 | Kid 10-18 |
| Multi-gen | 3-Generation Trip | One-way | $20,000 | Parents 60-75 |
| Culture | Japan Deep Dive | Two-way | $8,000 | Any |
| Culture | Italy Food Tour | Two-way | $7,000 | Any |
| Relaxation | Caribbean Cruise | Two-way | $5,000 | Any (better 55+) |
| Relaxation | Beach Resort Week | Two-way | $4,000 | Any |
| Milestone | Retirement Celebration Trip | Two-way | $10,000 | At retirement |
| Milestone | Anniversary Trip (decade) | Two-way | $6,000 | Any |

**Custom Experiences:**
Users can add their own with:
- Name
- Estimated cost
- One-way or two-way door
- Optimal age range (if one-way)
- Priority (must-do, want-to-do, nice-to-have)

### Screen 3: Life Map (Results)
**Route:** `/lifemap`

**Visual Timeline:**
- X-axis: Age (current to 85+)
- Y-axis: Portfolio value
- Overlay: Experience markers at optimal timing
- Color coding: One-way doors (orange), Two-way doors (green)

**Score Cards (top row):**
1. **Experiences Funded:** X of Y (percentage of dreams achievable)
2. **One-Way Doors Captured:** X of Y (time-sensitive covered)
3. **Kids' Windows Hit:** X of Y (family experiences in sweet spots)
4. **Balance at 85:** $XXX,XXX (security cushion)

**Life Phases (color bands on timeline):**
- Peak Years (current to 50): High energy, family experiences
- Active Retirement (50-70): Adventure still possible
- Comfort Years (70-80): Slower pace, cruises, family visits
- Home Base (80+): Local, low-travel

**Interactive Controls:**
- Slider: "Retire X years later" → see which experiences unlock
- Slider: "+$X/month contribution" → see which experiences unlock
- Drag experiences to re-prioritize
- Toggle experiences on/off

**Insights Panel:**
- "Your Everest Base Camp window closes in 12 years"
- "Disney sweet spot for Emma: 2 years remaining"
- "Consider: retiring 2 years later funds your heritage trip AND Everest"

---

## Technical Architecture

### Stack
- **Frontend:** Vanilla HTML/CSS/JS (no build step)
- **Backend:** Express.js static server (for Render)
- **Storage:** localStorage for saving plans (optional)
- **Hosting:** Render.com

### File Structure
```
/public
  /index.html        - Landing page
  /calculator.html   - Financial inputs
  /experiences.html  - Experience selection
  /lifemap.html      - Results visualization
  /css
    /styles.css      - Shared styles
  /js
    /calculator.js   - Financial logic
    /experiences.js  - Experience management
    /lifemap.js      - Visualization + calculations
    /data.js         - Experience templates + defaults
/server.js           - Express static server
/render.yaml         - Render deployment config
/package.json
```

### Calculation Engine

**Core Formula:**
```
Future Value = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]

Where:
- PV = Present Value (current savings)
- r = Monthly return rate (annual / 12)
- n = Months until retirement
- PMT = Monthly contribution
```

**Experience Scheduling Algorithm:**
1. Sort experiences by priority (must-do first)
2. For one-way doors: schedule at optimal age or earliest feasible
3. For two-way doors: fill gaps in timeline
4. Deduct experience costs from projected portfolio at scheduled year
5. Re-calculate remaining trajectory after each deduction
6. Flag experiences that can't be funded

**Kids' Experience Mapping:**
```
For each child:
  - Calculate age at each future year
  - Map experience sweet spots to calendar years
  - Flag when windows are closing (< 2 years remaining)
```

---

## Design System

### Colors (from landing page)
- Primary text: #2c2824
- Muted text: #746b60
- Background: #faf7f2 (cream)
- White: #ffffff
- Sunset (one-way): #e07c3e
- Teal (accent): #0097b2
- Green (two-way): #4caf72
- Borders: #e8e0d4

### Typography
- Headlines: Instrument Serif (400, italic)
- Body: Outfit (300, 400, 500, 600, 700)

### Components
- Cards with 16px border-radius, subtle borders
- Pill buttons with 100px border-radius
- Subtle shadows: 0 4px 20px rgba(44,40,36,0.05)
- Smooth transitions: 0.3s ease

---

## Success Metrics

1. **Completion Rate:** % of users who complete all 3 screens
2. **Return Rate:** % who come back to adjust their plan
3. **Share Rate:** % who share their Life Map (future feature)
4. **Insight Engagement:** % who interact with "what if" sliders

---

## Future Roadmap

**v1.1:**
- Export Life Map as image/PDF
- Save/load plans via shareable URL (encoded in hash)

**v1.2:**
- Social Security integration
- Inflation adjustment toggle
- Partner/spouse joint planning

**v1.3:**
- Experience cost database by destination
- Flight deal alerts for planned experiences
- Integration with travel booking

---

## Privacy Commitment

YoloCalc will never:
- Require an account or login
- Send user data to any server
- Use cookies or tracking
- Sell or share any information

All calculations happen entirely in the browser. The server only delivers static files.

---

## Launch Checklist

- [x] Landing page live
- [ ] Calculator screen functional
- [ ] Experience selection functional
- [ ] Life Map visualization functional
- [ ] Mobile responsive
- [ ] Tested in Chrome, Safari, Firefox
- [ ] Performance: < 2s load time
- [ ] Deploy to production
