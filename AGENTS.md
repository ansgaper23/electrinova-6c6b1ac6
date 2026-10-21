# Project rules
- Keep the homepage H1 stable when the image carousel changes; changing search intent on a timer makes the page topic inconsistent.
- Mark the static canonical as Helmet-managed so route rendering replaces it rather than adding a conflicting second canonical.
- Reuse the existing local-zone data and route for coverage pages so their metadata and contact links remain consistent.
- Keep the business JSON-LD and route JSON-LD in separate Helmet-managed scripts so navigation replaces the business entity without duplicating static metadata.