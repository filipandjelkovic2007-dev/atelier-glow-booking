# Atelier Glow Booking Demo

Frontend demo projekat za pregled i rezervaciju termina u kozmetičkom salonu, napravljen u Angular-u.

## Namena projekta

Ovo je portfolio/demo projekat za prikazivanje frontend flow-a rezervacije i rasporeda termina. Projekat nije povezan sa backend-om, bazom podataka niti realnim sistemom za zakazivanje.

## Stack

- Angular
- TypeScript
- HTML/CSS
- localStorage za demo čuvanje podataka u pregledaču

## Pokretanje

Potrebni su Node.js i npm. U korenu projekta pokreni:

```sh
npm install
npm start
```

Otvori `http://localhost:4200/` za raspored rezervacija. Obrazac za rezervaciju nalazi se na `http://localhost:4200/rezervacija/index.html`.

Za otvaranje aplikacije sa drugog uređaja na istoj lokalnoj Wi-Fi mreži, pokreni:

```sh
npm start -- --host 0.0.0.0
```

Na računaru pronađi njegovu IPv4 adresu pomoću `ipconfig`, pa na drugom uređaju otvori `http://<IPv4-adresa-računara>:4200/`. Uređaji moraju biti na istoj lokalnoj mreži, a firewall mora dozvoliti pristup na portu `4200`. Zaustavi razvojni server sa `Ctrl+C`. Ovaj način pristupa je samo za pouzdanu lokalnu mrežu; nemoj izlagati razvojni server internetu.

Produkcioni build pokreće se komandom:

```sh
npm run build
```

Nema konfigurisanih test ili lint skripti.

## Važno

- Ovaj projekat je lokalni demo i nije produkcioni sistem.
- Rezervacije se čuvaju u `localStorage` pregledača pod ključem `atelierGlow.bookings`.
- Podaci se ne šalju serveru, ne dele se između korisnika i ne mogu se smatrati sinhronizovanim ili sigurnim za realnu upotrebu.
- Ne unosite stvarne lične podatke.
- Dev server nije namenjen javnoj mreži.

## Struktura

- `src/app/` - Angular raspored i prikaz rezervacija
- `index.html` - demo landing page i obrazac za rezervaciju
- `src/index.html` - Angular aplikacioni entry point

## Ograničenja

- nema backend-a
- nema autentifikacije
- nema realnog validacionog/servisnog sloja
- nema podrške za više korisnika i više uređaja
