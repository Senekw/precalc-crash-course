# BC Bridge

A local, one-day (about 13.5 hours) precalculus sprint for a student moving
directly into Calculus BC.

The course is intentionally limited to what BC assumes in its first weeks:

- radians, the unit circle, trig graphs, identities, and trig equations
- algebra, factoring, equations, restrictions, and function fluency
- exponential and logarithmic functions
- graph transformations, rational behavior, and the difference quotient
- limit-ready algebra and continuity language

Parametric/vector motion, polar coordinates, and sequences/series are excluded
on purpose: BC Units 9 and 10 teach them from scratch.

Traditional precalculus survey material that does not pay off immediately in BC
is deliberately excluded.

## Run locally

Requires Node.js 22.13 or newer.

    npm install
    npm run dev

Open http://localhost:3000.

Progress, drill results, notes, theme, and lesson completion are stored in the
browser on the current device. No account or internet connection is needed
after dependencies are installed.

## Verify

    npm run lint
    npm test

npm test builds the app and verifies that the curriculum contains exactly 14
lessons totaling 810 minutes.
