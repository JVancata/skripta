Express je [nejzákladnější framework](https://expressjs.com/), díky kterýmu můžeš psát backendy v JavaScriptu.

Backend v node.js se liší od toho v PHPčku, že **nefunguje na základě souborů** (skriptů), které se načítají na webovém serveru. Místo toho začne poslouchat na síti na nějakém portu[^1] a všechno se řeší v rámci "jednoho souboru"[^2].
# Demo backend aplikace
1. `mkdir example-express-be`
2. `npm init` a všechno odklikej
3. V `package.json` změň `type` na `"module"`
4. V `package.json` změň `main` na `"main.ts"`
5. `npm install express cors`
6. `npm install --save-dev @types/express @types/cors`
7. Vytvoř soubor `main.ts` a vlož do něj kód

```typescript
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

/*
 Attention, this allows all origins!
 Great for development, terrible for security
*/
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
    const { body } = req;
    console.log("Received body", body);
    
    res.send("This is a POST endpoint!");
});

app.get("/", (req, res) => {
	// If you want to send a JSON, use res.json(...) instead
    res.send("This is a GET endpoint!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```
8. `node --watch main.ts`

Teď můžeš například přes [Bruno](https://www.usebruno.com/) provolat adresu `http://localhost:3000` a měl\*a by si dostat odpověď `This is a GET endpoint!`.

# Nasazení backendu
Je to, bohužel, daleko složitější než nasadit appku v PHPčku.

Nestačí někam nahrát .js/.ts soubor, musíš ten skript na nějakém serveru reálně spustit, aby poslouchal na určitém portu. A potom použiješ reverse-proxy [NGINX](https://nginx.org/), aby requesty místo servování statických souborů předával na např. `http://localhost:3000`.

[^1]: Konvence je port 3000, ale pravidlo to určitě není.

[^2]: Samozřejmě můžeš mít souborů víc a různě je do sebe importovat, ale vždycky máš jeden hlavní skript, co spouštíš.
