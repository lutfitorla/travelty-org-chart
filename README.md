# Agensi Pelancongan Umrah - Organization Chart

## Project Structure

This project has been reorganized to separate documentation from GitHub Pages content:

```
org-chart/
├── docs/                           # Documentation folder
│   ├── jobscope/                   # Detailed job descriptions
│   │   ├── 01_ceo_general_manager.md
│   │   ├── 02_finance_assistant.md
│   │   ├── 03_operations_manager_coo.md
│   │   ├── 04_tour_logistics_coordinator.md
│   │   ├── 05_umrah_tour_leader.md
│   │   ├── 06_sales_marketing_manager_cbo.md
│   │   ├── 07_sales_executive_agent.md
│   │   ├── 08_marketing_specialist.md
│   │   ├── 09_customer_service_manager_cro.md
│   │   └── 10_customer_service_representative.md
│   └── umrah_travel_agency_org_chart.md  # Original markdown org chart
├── assets/                         # GitHub Pages assets
│   ├── css/
│   │   └── style.css               # Styling for the web version
│   └── js/
│       └── script.js               # Interactive features
├── index.html                      # Main GitHub Pages file
└── README.md                       # This file
```

## GitHub Pages Setup

The GitHub Pages will serve the content from the root directory, specifically:
- `index.html` - Main organization chart page
- `assets/` - CSS and JavaScript files

### To deploy to GitHub Pages:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with org chart"
   git remote add origin https://github.com/[username]/[repo-name].git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`

3. **Access your site:**
   - URL: `https://[username].github.io/[repo-name]`

## Content Overview

### Public GitHub Pages Content (`index.html`)
- Beautiful, responsive organization chart
- All team positions and responsibilities
- Salary structure and reporting hierarchy
- Professional styling with Malaysian Malay language
- Mobile-friendly design

### Documentation (`docs/` folder)
- Detailed job descriptions for each position
- Original markdown files for reference
- Internal documentation for team use

## Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Malaysian Malay Language:** Content in Bahasa Malaysia mixed with English
- **Interactive Elements:** Smooth scrolling and animations
- **Print Friendly:** Includes print button for physical copies
- **Professional Styling:** Modern, clean design suitable for business use

## Team Structure

**Total Team Size:** 44 people
- **Executive:** 1 person
- **Finance:** 1 person  
- **Operations:** 7 people
- **Sales & Marketing:** 32 people
- **Customer Service:** 3 people

## Technology Used

- **HTML5:** Semantic structure
- **CSS3:** Modern styling with gradients and animations
- **JavaScript:** Interactive features and smooth scrolling
- **Google Fonts:** Inter font family for professional appearance

## Maintenance

To update the organization chart:
1. Edit `index.html` for the main display
2. Update individual job descriptions in `docs/jobscope/`
3. Push changes to GitHub for automatic deployment

---

*This organization chart is designed for an Umrah travel agency startup in Malaysia.*
