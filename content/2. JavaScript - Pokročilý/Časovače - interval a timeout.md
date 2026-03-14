Když potřebuješ nějakou funkci spustit až za nějakou dobu a nebo jí např. spouštět jednou za minutu, použiješ **časovače**.

> [!WARNING] Není to úplně přesný
> Časovače **negarantují**, že se kód spustí přesně v určitou dobu. 
> 
> Když nastavím `setTimeout` na pět sekund, tak mám jistotu, že se **dřív nespustí**.[^1]. Může se stát, že se spustí třeba až za 5.5 sekundy.
# setInterval - opakování
[Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval)

Jednou za x milisekund spustí funkci, kterou tomu předáš.

```javascript
const interval = setInterval(() => {
    console.log("Tohle se spustí jednou za 2 sekundy!")
}, 2_000);

// A takhle to potom z kódu zastavíš, ať to neběží do nekonečna
// clearInterval(interval)
```

`setInterval` vrací IDčko nastavenýho časovače. Nezapomeň ho clearnout (například v Reactu, když se Ti un-mountne komponenta).
# setTimeout - odložení spuštění
[Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)

Odloží spuštění funkce o x milisekund.

```javascript
const timeout = setTimeout(() => {
    console.log("Tohle se spustí až za 2 sekundy!")
}, 2_000);

// A takhle to potom z kódu zrušíš, aby se to nespustilo
// clearTimeout(interval)
```

`setTimeout` vrací IDčko nastavenýho časovače. Nezapomeň ho clearnout (například v Reactu, když se Ti un-mountne komponenta).

[^1]: Je to kvůli tomu, jak funguje [[Event loop]].