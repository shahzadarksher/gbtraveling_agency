# GB Traveling Agency - Booking System Guide

## Overview
The GB Traveling Agency website now includes a comprehensive booking management system that allows customers to:
- Submit travel package bookings
- View all their bookings
- Track booking status
- Export bookings to CSV format for personal records

## Features

### 1. **Booking Form** (`booking.html`)
- Fill in customer information and travel details
- Select from various travel packages and destinations
- Automatic price calculation based on number of travelers
- Date range selection for travel
- Special requests and accommodation preferences
- Real-time price summary

**How to Use:**
1. Visit the "Book Now" page
2. Fill in your personal details
3. Select a travel package or destination
4. Choose travel dates and number of travelers
5. Add any special requests
6. Accept terms and submit
7. Receive a unique Booking ID

### 2. **My Bookings Page** (`my-bookings.html`)
- View all your bookings in an organized card layout
- Track booking status (Pending, Confirmed, Cancelled)
- Search bookings by ID, package name, or customer name
- Filter bookings by status
- Download individual bookings as CSV
- Export all bookings as CSV
- Delete bookings if needed

**How to Use:**
1. Navigate to "My Bookings" from any page menu
2. View your bookings displayed as cards
3. Use search box to find specific bookings
4. Use filter buttons to view bookings by status
5. Click "Download" on any booking for a CSV file
6. Click "Export to CSV" to download all bookings

### 3. **Bookings Database** (`data/bookings.json`)
- Central storage for all booking records
- Contains sample bookings for demonstration
- Structured format with all booking details

### 4. **Local Storage Backup**
- New bookings are automatically saved to browser's local storage
- If the JSON file is not accessible, the system falls back to local storage
- Allows bookings to persist across page refreshes

## Booking Status

Each booking has one of the following statuses:

| Status | Description |
|--------|-------------|
| **Confirmed** | Booking has been verified and confirmed by the agency |
| **Pending** | Booking received, awaiting confirmation from the agency |
| **Cancelled** | Booking has been cancelled |

## CSV Export Format

When you export a booking to CSV, it includes:
- Booking ID
- Package Name
- Customer Name
- Email
- Phone
- Travel Date
- Duration
- Number of People
- Total Price
- Status
- Booking Date

## Sample Bookings

The system comes with three sample bookings:
1. **BK001** - Ahmed Khan - Hunza Valley Explorer (Confirmed)
2. **BK002** - Fatima Ali - Skardu Adventure Complete (Pending)
3. **BK003** - Hassan Malik - High Altitude Expedition (Confirmed)

## Technical Details

### Files Involved:
- `booking.html` - Booking form page
- `my-bookings.html` - Bookings management page
- `data/bookings.json` - Bookings database
- `data/packages.json` - Package information
- `assets/js/main.js` - JavaScript functionality

### Data Storage:
- Primary: `data/bookings.json` (server-side)
- Secondary: Browser localStorage (client-side backup)
- Key: `bookings` (for localStorage)

## How Booking IDs are Generated

- Format: `BK` + Last 6 digits of timestamp
- Example: `BK123456`
- Ensures unique ID for each booking
- Can be used to track bookings

## Mobile Responsiveness

All pages are fully responsive and work on:
- Desktop computers
- Tablets
- Mobile phones

## Price Calculation

```
Total Price = Package Price × Number of Travelers
```

For example:
- Hunza Valley Explorer: $1,950 per person
- 2 travelers: $1,950 × 2 = $3,900

## Support & Contact

For booking inquiries or issues:
- Email: info@gbtraveling.com
- Phone: +92 (0) 1234-567890
- Visit: Contact page

## Future Enhancements

Planned features for future releases:
- Email confirmation with booking details
- Payment gateway integration
- Booking modification capabilities
- Multi-language support
- SMS notifications
- Booking history archive
- Advanced analytics for travel patterns

## Tips for Users

1. **Keep your Booking ID safe** - You'll need it to reference your booking
2. **Export to CSV regularly** - Keep a copy on your phone or computer
3. **Update contact information** - Ensure we can reach you with updates
4. **Book in advance** - Some packages have limited availability
5. **Check status frequently** - Get notified when your booking is confirmed

---

**Last Updated:** April 2026
**Version:** 1.0
