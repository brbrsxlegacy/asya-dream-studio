# Asya Dream Studio

A Turkish creative playground for designing illustrated characters, decorating rooms, creating photo cards and playing six mini games.

## Run

Use the Sites dependency installer, then `npm run dev`. The frontend lives in `studio/index.html` and `public/assets/`; a Vinext Worker serves the frontend and the friend-room API. The app is published through Sites; online rooms require its Worker API.

## Features

- 10 hair models, 12 tops, 8 bottoms, 6 shoes, 12 accessories, 6 companions and 6 scenes. Clothing colors, patterns, skin and eye colors, expressions and poses are editable.
- Searchable wardrobe with named looks, favorites, editing and deletion.
- A room designer with 16 furniture types, pointer dragging, keyboard movement, wall/floor colors, item colors, layering and PNG export.
- A photo studio with poses, scenes, frames, an album and high-resolution PNG export.
- Six games: Star Rain, Memory Match, Cloud Runner, Reaction Rush, Dream Bounce and Color Master. Pointer and keyboard controls, local records, star rewards and daily goals.
- Six daily style challenges with visible, deterministic scoring rules.
- A star-only shop, levels, badges, daily rewards and device-local persistence.
- Responsive navigation, reduced motion, sound controls, backup export/import and input validation.
- Private friend rooms for up to four participants, live avatar updates and chat, using the site's own D1-backed API. Rooms expire after 8 hours; inactive participants release their place after 90 seconds. Membership checks and the 4-person limit are enforced by the server.

## Data and privacy

Designs, progress and records are saved in the current browser under `asya-dream-studio-v3`. Download a JSON backup from Settings to move to another device. Friend rooms send a nickname, validated avatar selections and chat to the site's server. The API uses a random HttpOnly session cookie, per-tab identities, same-origin checks and per-room membership checks. SVG received from other users is never inserted: avatars are rendered locally from validated selections. Original Firebase connectivity has been removed because the original database rejected room operations.

## Validation

```sh
npm test
npm run check
```

## Hosting

`.openai/hosting.json` binds the source to its Sites project and declares the D1 database as `DB`. Build through the Sites build helper. Database schemas live in `db/schema.ts` and generated schema-only migrations live in `drizzle/`. The original version is retained as `original-index.html` for reference.
