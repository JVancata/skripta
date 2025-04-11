Čísla jsou:
- Celá čísla - `0`, `69` nebo `9_007_199_254_740_991`
- Desetinná čísla - `0.1`, `0.2`
- Not a number - [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) - pozor na něj!
- [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity) - vznikne dělením nulou

Při zápisu můžeš použít **tríček s podtržítkem** `_`. Nedělá to vůbec nic, jenom tím **zlepšíš čitelnost** - hezky oddělíš řády. 

```javascript
100000 === 100_000 // true
9_007_199_254_740_991 === 9007199254740991 // true
9_007_199_254_740_991 === Number.MAX_SAFE_INTEGER // true
```

Do proměnné typu `number` **nelze uložit** číslo větší než [`9_007_199_254_740_991`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) (devět kvadriliónů). Sice ho tam narveš, ale **ztrácíš přesnost** a nemůžeš se na výsledek [spolehnout](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger). 

Pokud chceš pracovat s většími čísly, použij **[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)**.

Dej si **pozor** na hodnotu [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) (not a number).  Jednou nebo později na to narazíš, tak se připrav.

```javascript
const parsedNumber = parseInt("asdf");
console.log(parsedNumber); // NaN
console.log(typeof parsedNumber); // number - hodnota "not a number" je number
console.log(parsedNumber === NaN) // false - NaN se nerovná NaN
console.log(Number.isNaN(parsedNumber)) // true - NaN musíme zjistit takto
```

> [!danger] Pozor na přesnost desetinných čísel (**floating point arithmetic**)!
> Vlož do konzole tento kód:
> ```javascript
> const fractionSum = 0.2+0.1;
> console.log(fractionSum);
> console.log(fractionSum === 0.3); // Je to true, nebo false?
> ```
> 
> **Co se to děje?!** Bohužel to není bug 🐞, ale **feature**. Začínáme zabrušovat do **teoretické informatiky**.
> 
> Na vysvětlení problému je perfektní video od [Computerphile](https://www.youtube.com/@Computerphile).
> 
> ![Computerphile vysvětlení desetinných čísel](https://www.youtube.com/watch?v=PZRI1IfStY0)
> 
> Nemusíš to umět kompletně vysvětlit z paměti, ale **musíš o tomto problému vědět**!
> 
> Pro nás je **klíčové**:
> 1. Desetinná čísla **NEJSOU** přesná.
> 2. Pokud chceme "přesně" počítat s desetinnými čísly, potřebujeme [`Number.EPSILON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)
> 	- To neplatí vždy, například peníze (halíře) takhle počítat **nemůžeme**. 
> 3. Pokud přesnost **nepotřebujeme**, postačí nám
> 	- [Zaokrouhlení nahoru](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
> 	- [Zaokrouhlení dolu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
> 	- [Zaokrouhlení](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
> 	- [Zaokrouhlení desetinných čísel](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround)

# Operace s čísly
## Sčítání, odčítání, násobení, dělení
```javascript
const number1 = 33;
const number2 = 77;

const summed = number1 + number2;
console.log(summed); // 110

const difference = number1 - number2;
console.log(difference); // -44

const multiple = number1 * number2;
console.log(multiple); // 2541

const fraction = number1 / number2;
console.log(fraction); // -0.42857142857142855
```

Pozor na **dělení nulou**!
```javascript
console.log(100 / 0); // Infinity
```

## Zbytek po dělení - modulo `%`
```javascript
const durationSeconds = 125;
// Minuta má 60 sekund
console.log(durationSeconds % 60); // 5
```
## Umocnění - `**`
```javascript
// Dva na druhou
console.log(2 ** 2); // 4
// Dva na třetí
console.log(2 ** 3); // 8
// Dva na čtvrtou
console.log(2 ** 4); // 16
// Dva na pátou
console.log(2 ** 5); // 32
// Dva na šestou
console.log(2 ** 6); // 64
```
## Porovnávání čísel
Používáme výhradně trojité rovná se `===` ([strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)). 
Použití pouze dvou rovná se `==` sice funguje, ale **nekontroluje datový** typ a to vede k chybám.
```javascript
const number3 = 666;
const number4 = 665;
const numberString = "666";

// Čísla se rovnají
console.log(number3 === number4); // false
// Čísla se nerovnají
console.log(number3 !== number4); // true
console.log(number3 !== (number4 + 1)); // false
// Kontrola typu
console.log(number3 == numberString); // true - ďáblovo dílo, nepoužívat!
console.log(number3 === numberString); // false - zde je svět v pořádku

// Pozor, zde se už typ nekontroluje. Vždy ošetři, že počítáš s čísly.
// Číslo je větší než
console.log(number3 > number4); // true
console.log(number3 > (number4 + 1)); // false
// Číslo je větší nebo rovno než
console.log(number3 >= number4); // true
console.log(number3 >= (number4 + 1)); // true

// Číslo je menší než
console.log(number3 < number4); // false
console.log(number3 < (number4 + 1)); // false
// Číslo je menší nebo rovno než
console.log(number3 <= number4); // false
console.log(number3 <= (number4 + 1)); // true
```

# Úloha 1 - FE!N
Ve Spotify wrapped 2024 máš nejposlouchanější skladbu FE!N od Travise Scotta.

Kolik sekund, minut a hodin si strávil\*a poslechem?
Kolikrát se z Tvých sluchátek ozvalo "FE!N"?

**Detaily:**
- Skladba má **3 minuty a 11 sekund**
- Hrála ti za rok 2024 dohromady **112krát**
- FE!N se v jednom přehrání skladby objeví **69krát**
- Vždy posloucháš až do konce.

> [!todo]- Řešení
> ```javascript
> // 3 minuty a 11 sekund
> const songDuration = 3 * 60 + 11;
> // 112x přehrání
> const playCount = 112;
> // 69x FE!N v textu
> const phrasesPerSong = 69;
> 
> // Celkový čas strávený posloucháním v sekundách
> const totalDurationSeconds = songDuration * playCount;
> 
> console.log("Celkový čas přehrávání v sekundách: ", totalDurationSeconds);
> 
> // Zaokrouhlíme na celé hodiny dolů
> const hoursListened = Math.floor(totalDurationSeconds / 60 / 60);
> // Zaokrouhlíme na celé minuty dolů a použijeme operátor modulo, abychom získali zbytek minut, co není obsažený v hodinách (%)
> const minutesListened = Math.floor(totalDurationSeconds / 60) % 60;
> // Zbytek vteřin, co není obsažený v hodinách
> const secondsListened = totalDurationSeconds % 60;
> 
> console.log("Celkový čas poslechu je:");
> console.log("Hodin:", hoursListened);
> console.log("Minut:", minutesListened);
> console.log("Sekund:", secondsListened);
> 
> console.log("Celkem ti zahrálo FE!N:", playCount * phrasesPerSong);
> ```
# Úloha 2 - Paušální výdaje OSVČ 💰
Začínáš programovat na vlastní živnost (OSVČ) a přišel čas vyplnění daňového přiznání.

Za rok 2024 se ti povedlo vydělat 1 milion Kč, gratuluju!
Potřebuješ vypočítat, kolik zaplatíš státu na dani z příjmů.

Účetní ti doporučila využití [paušálních výdajů](https://www.fakturoid.cz/almanach/dane/pausalni-vydaje) ve výši 60 %.

`Výdaje = příjem * paušál výdajů`
`Základ daně = příjmy - výdaje`
`Daň z příjmů = základ daně * sazba daně z příjmů`

Tvoje situace vypadá takto:

| **Příjem**        | 1 000 000 Kč |
| ----------------- | ------------ |
| **Paušál výdajů** | 60 %         |
| **Výdaje**        | 600 000 Kč   |
| **Základ daně**   | 400 000 Kč   |
| **Daň**           | 60 000 Kč    |
Kolik by si na dani zaplatil\*a, kdyby tvůj příjem byl:
- 100 000 Kč
- 895 432 Kč
- 108 920 Kč

Neuvažuj slevy na dani.