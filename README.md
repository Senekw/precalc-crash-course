# BC Bridge

A local, three-day precalculus sprint for a student moving directly from
Algebra 2 into Calculus BC.

The course is intentionally limited to direct BC prerequisites:

- algebra, factoring, equations, restrictions, and function fluency
- graph transformations, rational behavior, and average rate of change
- radians, the unit circle, trig graphs, identities, and trig equations
- exponential and logarithmic functions
- parametric/vector-valued motion and polar coordinates
- sequences, sigma notation, geometric series, and limit-ready algebra

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

npm test builds the app and verifies that the curriculum contains exactly 19
lessons totaling 1,800 minutes.
