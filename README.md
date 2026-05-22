# Catering Search

Small full-stack app for browsing caterers. Express API on the backend, Next.js on the frontend.

## Stack
- Node.js + Express (REST API, JSON file storage)
- Next.js 16 / React 19, JSX pages
- Bootstrap 5 for styling

## Endpoints
| Method | Path | Notes |
| ------ | ---- | ----- |
| GET    | `/api/caterers` | Optional `search`, `minPrice`, `maxPrice` query params |
| GET    | `/api/caterers/:id` | Returns 404 if not found |
| POST   | `/api/caterers` | Validates name, location, pricePerPlate, cuisines, rating |

Caterer shape:
```json
{
  "id": "1",
  "name": "Spice Affair Caterers",
  "location": "Bengaluru, KA",
  "pricePerPlate": 850,
  "cuisines": ["North Indian", "Mughlai"],
  "rating": 4.6
}
```

## Run locally
```
npm install
npm run dev
```
This boots the API on `http://localhost:4000` and the Next.js app on `http://localhost:3000`. Open the `/caterers` page to browse.

If you only want one side:
- `npm run server` — Express only
- `npm run next` — Next.js only

## Example POST
```
curl -X POST http://localhost:4000/api/caterers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Kitchen",
    "location": "Mumbai, MH",
    "pricePerPlate": 600,
    "cuisines": ["Indian"],
    "rating": 4.2
  }'
```
