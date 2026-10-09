# Copilot instructions

## Project overview

Atelier Glow is a frontend-only Angular demo for booking salon appointments. There is no server or shared booking database; the booking flow stores data in the current browser's `localStorage`. Do not treat this demo as a production booking system or enter real personal data.

The application has two connected surfaces:

- `src/main.ts` bootstraps the standalone Angular `AppComponent`. `src/app/app.component.ts` reads and validates saved bookings, sorts them by date and time, refreshes on browser storage/page-show events, and provides selection state for the schedule and details in the paired template and component stylesheet.
- The root `index.html` is a separate, static HTML/CSS/JavaScript booking form. `angular.json` copies it to `/rezervacija/index.html` as a build asset; `src/index.html` is the Angular application's shell. The booking form writes reservations and the Angular dashboard reads them, so changes to their shared storage contract must stay in sync.

## Build and run

Run these commands from the project root:

```sh
npm install
npm start
npm run build
```

`npm start` serves the demo at `http://localhost:4200/`; the booking form is available at `/rezervacija/index.html`. `npm run build` runs the Angular production build.

For access from another device on the same trusted local network, run `npm start -- --host 0.0.0.0` and open `http://<host-computer-ip>:4200/` from that device. The development server is not for public internet exposure.

`package.json` currently defines no test or lint script, and the repository has no test runner configured. There is no supported single-test command.

## Project-specific conventions

- Keep the booking data contract consistent in both `index.html` and `src/app/app.component.ts`: storage key `atelierGlow.bookings`; a JSON array of objects with `date` (`YYYY-MM-DD`), `time` (`HH:mm`), `service`, `clientName`, and `phone`, plus optional `therapist`. Both surfaces validate stored values; preserve those checks when changing the format.
- Booking availability is calculated in the static form using each service's duration and interval-overlap checks, and is rechecked when saving. Changes to time slots, service durations, or conflict rules belong with that flow in `index.html`.
- Service choices in the booking form are native radio inputs styled as cards. Preserve keyboard selection and the selected-card styling when changing that UI.
- Keep the Angular dashboard as a standalone component: imports used by its template are declared in the component metadata, with structural directives and date formatting supplied by `CommonModule`. Its template and component-specific styles live in `src/app/app.component.html` and `src/app/app.component.css`; site-wide defaults live in `src/styles.css`.
- Angular compiler options enable strict TypeScript and strict template checking. Keep component and template types compatible with those settings.
- User-facing copy is in Serbian. Preserve that language and the existing browser-visible storage error states when editing either UI.
