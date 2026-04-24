# GB Traveling Agency 🏔️

A comprehensive travel website for exploring Gilgit-Baltistan's most spectacular destinations and curated tour packages.

## Features

- **6 Premier Destinations**: Skardu, Hunza Valley, Fairy Meadows, Khaplu, Deosai Plains, Shigar Valley, Nubra Valley
- **14 Tour Packages**: From cultural heritage treks to high-altitude mountaineering expeditions
- **Content Customization**: VS Code prompts and guidelines for consistent travel content generation
- **Responsive Design**: Modern HTML/CSS with interactive JavaScript functionality
- **JSON Data Structure**: Easy-to-manage destinations and packages database

## Project Structure

```
gb-traveling-agency/
├── index.html                 # Homepage
├── destinations.html          # Destinations listing page
├── packages.html              # Tour packages page
├── about.html                 # About us page
├── contact.html               # Contact page
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   └── main.js           # JavaScript functionality
│   └── images/
│       └── destinations/     # Destination images
├── data/
│   ├── destinations.json     # Destination data (17 locations)
│   └── packages.json         # Tour packages data (14 packages)
└── .github/
    ├── prompts/
    │   ├── generate-gilgit-baltistan-destination.prompt.md
    │   ├── generate-gilgit-baltistan-package.prompt.md
    │   └── generate-destination-web-copy.prompt.md
    └── instructions/
        └── travel-content-guidelines.instructions.md
```

## Quick Start

### View the Website
1. Open `index.html` in a web browser
2. Navigate through destinations and packages
3. Explore regional information and adventure details

### Content Management

#### Destinations Data (`data/destinations.json`)
Each destination includes:
- `id` - Unique identifier
- `name` - Destination name
- `region` - Geographic region
- `description` - Compelling overview
- `highlights` - Key attractions (array)
- `bestSeason` - Optimal visit time with temperatures
- `activities` - Available experiences (array)
- `avgTemperature` - Temperature range
- `difficulty` - Experience level (Easy/Moderate/Challenging)
- `altitude` - Height above sea level

#### Packages Data (`data/packages.json`)
Each package includes:
- `id` - Package identifier
- `name` - Package name
- `description` - Experience summary
- `duration` - Days (integer)
- `price` - Price in USD

## VS Code Customization

This project includes three ready-to-use prompts for generating travel content:

### 1. GB Destination Generator
Generate JSON destination objects with attractions, seasonal info, and activities.
```
/GB Destination Generator Skardu
```

### 2. GB Package Generator
Create tour package itineraries in JSON format.
```
/GB Package Generator Nanga Parbat Summit
```

### 3. GB Destination Web Copy
Generate HTML sections for destination landing pages.
```
/GB Destination Web Copy Hunza Valley
```

### Content Guidelines
Reference `.github/instructions/travel-content-guidelines.instructions.md` for:
- Voice and tone standards
- Writing conventions
- Regional consistency
- Data quality requirements

## Destinations Overview

| Destination | Region | Difficulty | Altitude | Best Season |
|---|---|---|---|---|
| Skardu | Central | Moderate | 2,228m | May-Oct |
| Hunza Valley | Northern | Easy-Moderate | 2,400m | Apr-Oct |
| Fairy Meadows | Western | Challenging | 3,300m | Jun-Sep |
| Khaplu | Southern | Easy-Moderate | 3,600m | May-Sep |
| Deosai Plains | Central-East | Moderate-Challenging | 4,272m | Jun-Sep |
| Shigar Valley | Central | Challenging | 2,800m | May-Sep |
| Nubra Valley | Northern | Moderate | 3,100m | May-Sep |

## Tour Packages

**Cultural & Heritage**
- Hunza Valley Explorer (7 days, $1,950)
- Khaplu Cultural Heritage Trek (6 days, $1,650)
- Siachen Gateway Adventure (9 days, $2,300)

**High-Altitude Expeditions**
- Nanga Parbat Mountaineer (14 days, $4,200)
- Karakoram Gateway Expedition (12 days, $3,500)
- Deosai Wilderness Expedition (8 days, $2,100)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling
- **JavaScript** - Interactive functionality
- **JSON** - Data storage and management

## Development

### Adding New Destinations
1. Use the **GB Destination Generator** prompt
2. Generate JSON following the template
3. Add to `data/destinations.json`
4. Commit and push changes

### Adding New Packages
1. Use the **GB Package Generator** prompt
2. Create JSON package object
3. Append to `data/packages.json`
4. Update website and commit

### Creating Web Pages
1. Use the **GB Destination Web Copy** prompt
2. Generate semantic HTML
3. Integrate into destination pages
4. Apply CSS styling

## Content Standards

All travel content follows the guidelines in `.github/instructions/travel-content-guidelines.instructions.md`:

- **Adventurous yet professional** tone
- **Specific, sensory details** in descriptions
- **Active voice** for engagement
- **Regional consistency** across all content
- **Accurate information** about altitude, seasons, and activities

## File Sizes

- `destinations.json` - 17 locations with rich metadata
- `packages.json` - 14 curated tour experiences
- Static pages - Optimized for fast loading

## License

This project is created for the GB Traveling Agency brand.

## Contact

For questions or updates about destinations and packages, refer to the contact information in `contact.html`.

---

**Created**: April 25, 2026  
**Author**: Shahzad Rksher  
**GitHub**: shahzadrksher
