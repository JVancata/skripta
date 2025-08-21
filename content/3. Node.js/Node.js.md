JavaScript byl vymyšlenej pro to, aby běžel **v prohlížeči**. Pak přišel autor Node.js a řekl, že teď už poběží i v příkazový řádce a tím pádem **na serveru**.

Node.js vznikl tak, že vykostili JS jádro z **Chromia**[^2] a přepsali do C++ API, co jsou standardně v prohlížeči.
# Instalace
Máš několik způsobů, jak si [node nainstalovat](https://nodejs.org/en/download).

Buď si nainstaluješ **NVM** (node version manager) a můžeš si jednoduše mezi verzema přepínat, jak potřebuješ.

A nebo si nainstaluješ jednu **konkrétní binárku** a sviští to.

Sice bych to neměl úplně říkat, ale mezi verzema až takovej rozdíl není. Nainstaluj si vždycky tu nejnovětší (aktuálně v22 nebo v24) a budeš v pohodě.
# Spuštění skriptu
Vytvoř si soubor `main.js`

```javascript
// main.js

console.log("Zdarec 👋 Tady si můžeš programovat, co jen budeš chtít.");
```

A pak ho můžeš spustit přes `node main.js`

![[hello-world-node.png]]
A to je úplně všechno 😁 Můžeš začít programovat.
# NPM - Instalace knihoven
Některý knihovny si "nainstaluješ" tak, že si do stránky přidáš třeba tohle

```html
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
```

A to je úplně na 💩.

1. Spoléháš se, že někdo bude pořád ochotnej ten file hostovat
2. Spoléháš se, že ho nikdo nehackne a nepodstrčí tam malicious kód
3. Můžou Tvoje uživatele sledovat – s každým načtením tvojí stránky se pošle request někomu cizímu.

Řešení je [NPM](https://docs.npmjs.com/about-npm), je to takový "**centrální registr**" všech knihoven, co v JS světě existujou.

> [!tip] Nedělej si na NPM účet, nepotřebuješ ho.

Balíčky se instalují do **projektu**. Projekt si vytvoříš úplně jednoduše.

1. `mkdir muj-projekt`
2. `cd muj-projekt`
3. `npm init`
4. Odklikej/vyplň co chceš.

Tohle ti vytvoří `package.json`, to je **středobod všech JS projektů**. Máš tady všechny informace o projektu – jaký obsahuje knihovny, jak se jmenuje, jakou má verzi a jak se spouští.

`package.json` může vypadat třeba [takhle](https://github.com/JVancata/materialy/blob/main/apps/soundboard-client/package.json)

```json
{
  "name": "soundboard-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "docker:build": "docker build -t soundboard-client .",
    "docker:run": "docker run -d -p 3001:80 soundboard-client"
  },
  "dependencies": {
    "@picocss/pico": "^2.1.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "sass-embedded": "^1.89.2",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}
```

Vytvoří se ti ještě druhej soubor – `package-lock.json` a ten je taky důležitej. **Generuje se automaticky**, když přidáš/odebereš nějakou knihovnu. Jsou v něm informace o tom, jaký přesný **verze a závislosti knihoven** se nainstalovaly.

Knihovny si instaluješ pomocí příkazu `npm install`. A u každý knihovny na NPM máš rovnou příkaz, co si můžeš zkopírovat.

![[date-fns-npm.png]]

Tenhle příkaz Ti vytvoří složku `node_modules`, kde se nachází všechny knihovny, který máš nainstalovaný.

> [!warning] Bacha, nikdy necommituj `node_modules` do GITu!
> V kapitole [[Verzování - GIT]] je vysvětleno, co je to `.gitignore`.

A pak už si je můžeš normálně [[Moduly - Import a Export|importovat]].

```javascript
import { parse } from `date-fns`;
``` 

A jestli Ti můžu dát tip... Instaluj co nejmíň knihoven to jde. Spoustu věcí jde udělat přímo v čistým JavaScriptu. Čím míň knihoven, tím menší projekty a tím míň zranitelností.
# Alternativy
Node.js je de-facto standard, ale má svoje chyby a nemá některý věci vyřešený úplně dobře[^1].

Můžeš se podívat třeba na [Deno](https://deno.com/) a [Bun](https://bun.com/).

Ale doporučuju Ti se nejdřív pořádně naučit s JavaScriptem a Nodem, než začneš zkoumat alternativní runtimy.

Stejně tak i npm má svoje alternativy ([Yarn](https://yarnpkg.com/) nebo [pnpm](https://pnpm.io/)), ale zase – začni je používat, až když Ti npm přestane stačit.

[^1]: Třeba nativní podporu TypeScriptu. Lehce omezenou (ale docela fajn) podporu přidali až nedávno.

[^2]: Chromium je dneska úplně všude. Google Chrome, Edge, Opera, Brave jsou pod pokličkou jeden a ten samej engine. Běží to i na desktopu a mobilech.
