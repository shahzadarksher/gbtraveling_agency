---
description: "Generate Gilgit-Baltistan destination descriptions in JSON format with attractions, best season, and activities"
name: "GB Destination Generator"
argument-hint: "destination name"
agent: "agent"
---

Generate a JSON-formatted destination object for a Gilgit-Baltistan location with the following structure:

```json
{
  "id": "destination-slug",
  "name": "Destination Name",
  "region": "Region in Gilgit-Baltistan",
  "image": "image-filename.jpg",
  "description": "Brief 2-3 sentence overview highlighting unique features",
  "highlights": [
    "Major attraction 1",
    "Major attraction 2",
    "Major attraction 3",
    "Major attraction 4"
  ],
  "bestSeason": "Month - Month (reason: temperature range, weather conditions)",
  "activities": [
    "Activity 1",
    "Activity 2",
    "Activity 3",
    "Activity 4",
    "Activity 5"
  ],
  "avgTemperature": "X°C - Y°C",
  "difficulty": "Easy|Moderate|Challenging",
  "altitude": "X meters above sea level"
}
```

Requirements:
- Use authentic, accurate information about the destination
- Keep descriptions engaging and marketing-focused
- Include seasonal details relevant to tourism
- Activities should be specific and appealing to travelers
- Maintain consistency with existing destinations in `data/destinations.json`
