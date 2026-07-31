# Error Fixing Plan

## Error 1: `select.tsx` — Missing closing `</div>` tag
- **File**: `src/components/ui/select.tsx`
- **Fix**: Add `</div>` before the closing `)` of the return statement

## Error 2: `card.tsx` — `CardHeader` ignores `title`/`subtitle` props
- **File**: `src/components/ui/card.tsx`
- **Fix**: Add `title` and `subtitle` props rendering to `CardHeader` component

## Error 3: `vite.config.js` — Tailwind CSS version conflict
- **File**: `vite.config.js`
- **Fix**: Remove `@tailwindcss/vite` plugin since project uses Tailwind v3 (PostCSS plugin + config file)
