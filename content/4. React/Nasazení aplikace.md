React není nic jinýho než JavaScript. Nasadit ho někam na server je úplně stejně jednoduchý, jako tam nasadit index.html.

1. Aplikaci zbuildi příkazem `npm run build`
2. Vytvoří se ti složka `dist`
3. Obsah složky (ne celou složku) přetáhni na webový server
4. ???
5. Profit!

Když se podíváš do `dist` složky, není tam nic jinýho, než jeden html soubor, jeden JS soubor a jeden CSS soubor.

Nasazování React aplikace má ale dva háčky:
## 1. Podsložky
Když chceš, aby aplikace běžela v nějaké podsložce (např. `https://materialy.jakub.dev/soundboard-client/`), musíš upravit `vite.config.ts`.

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tady-das-podslozku-kde-to-chces/"
})
```

Přečíst si o tom můžeš v [dokumentaci](https://vite.dev/guide/build#public-base-path) a nebo zkusit i relative base.

## 2. Routování vícestránkových aplikací
React aplikace jsou **SPA** - single page application.

To znamená, že přechod mezi URL se děje jenom na klientovi a neposílají se při tom requesty na server (nenačítá se další dokument). 

Když uživatel přejde z `/login` na `/dashboard`, pořád zůstává na `index.html`.

Tohle řešíš v případě, kdy používáš **client-side router** a děláš vícestránkovou React aplikaci.

Potřebuješ udělat změnu v configu webového serveru a všechny requesty co nevedou na assety (obrázky, js, css) přesměrovat na `index.html`.

Pro [apache](https://stackoverflow.com/a/59887425):
```
# Allow mod_dir to serve index.html when requesting the directory
DirectoryIndex index.html

RewriteEngine On

# Front-controller (exclude static resources)
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_URI} !^/(assets|css|img|js|modules|partials|vendor)/
RewriteRule . index.html [L]
```

Pro [nginx](https://www.digitalocean.com/community/tutorials/deploy-react-application-with-nginx-on-ubuntu):

```
server {
    listen 80;
    server_name your-domain.com;
    
    # Serve React app for all routes except API
    location / {
        root /var/www/your-domain/html;
        try_files $uri $uri/ /index.html;
    }
}
```

Tyhle configy si musíš upravit podle sebe a co přesně Tvoje aplikace potřebuje, ale tohle by mělo +- stačit.