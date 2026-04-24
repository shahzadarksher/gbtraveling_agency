---
description: "Generate Gilgit-Baltistan tour package details in JSON format with itinerary, duration, and pricing"
name: "GB Package Generator"
argument-hint: "package name and duration"
agent: "agent"
---

Generate a JSON-formatted tour package object for a Gilgit-Baltistan experience with the following structure:

```json
{
  "id": <auto-increment>,
  "name": "Package Name",
  "description": "Compelling 1-2 sentence summary of the experience",
  "duration": <number_of_days>,
  "price": <price_in_usd>
}
```

Requirements:
- Use a compelling name that reflects the adventure or region (e.g., "High Altitude Explorer", "Hunza Valley Experience")
- Write descriptions that capture the essence of the experience and appeal to adventure travelers
- Duration should be realistic for Gilgit-Baltistan tours (typically 5-14 days)
- Prices should be competitive but reflect quality accommodations and expert guides in the region
- Match the style and tone of existing packages in `data/packages.json`
- Focus on authentic experiences: trekking, mountaineering, cultural immersion, scenic landscapes
