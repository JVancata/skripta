Čísla jsou:
- **Celá čísla** - `0`, `69` nebo `9_007_199_254_740_991`
- **Desetinná čísla** - `0.1`, `0.2` - oddělujeme je desetinnou tečkou
- **Not a Number** - [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) - pozor na něj!
- [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity) - vznikne dělením nulou

Při zápisu můžeš použít **tríček s podtržítkem** `_`. Nedělá to vůbec nic, jenom tím **zlepšíš čitelnost** - hezky oddělíš řády. 

```javascript playground
100000 === 100_000 // true
9_007_199_254_740_991 === 9007199254740991 // true
```
# Operace s čísly
## Sčítání, odčítání, násobení, dělení
```javascript playground
const number1 = 33;
const number2 = 77;

console.log(number1 + number2); // Sčítání
// Výstup: 110
console.log(number1 - number2); // Odčítání
// Výstup: -44
console.log(number1 * number2); // Násobení
// Výstup: 2541
console.log(number1 / number2); // Dělení
// Výstup: 0.42857142857142855
```

Pozor na **dělení nulou**!
```javascript playground
console.log(100 / 0);
// Výstup: Infinity
```
## Zbytek po dělení - modulo `%`
```javascript playground
const durationSeconds = 125;
// Minuta má 60 sekund
console.log(durationSeconds % 60);
// Výstup: 5
```
## Umocnění - `**`
```javascript playground
console.log(2 ** 2); // Dva na druhou
// Výstup: 4
console.log(2 ** 3); // Dva na třetí
// Výstup: 8
console.log(2 ** 4); // Dva na čtvrtou
// Výstup: 16
console.log(2 ** 5); // Dva na pátou
// Výstup: 32
console.log(2 ** 6); // Dva na šestou
// Výstup: 64
```
## Nutné vědět
Dej si **pozor** na hodnotu [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) (not a number).  Jednou nebo později na to narazíš, tak se připrav.

```javascript playground
const parsedNumber = parseInt("asdf");

console.log(parsedNumber); 
// Výstup: NaN
console.log(typeof parsedNumber);
// Výstup: number

console.log(parsedNumber === NaN) 
// Výstup: false
console.log(Number.isNaN(parsedNumber)) 
// Výstup: true
```

>[!tip]- `NaN !== NaN`
>NaN se nerovná sám sobě. Musíme ho vždy kontrolovat přes funkci [`Number.isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN#testing_against_nan).
>
>![[gustavo.jpg]]
>
>[Zdroj obrázku](https://adamjedlicka.notion.site/Meme-ka-3458e0f7a1c3431bbf231e3a52550552#7e963e73ba1e48438c503440f69aee70)- vysokoškolská skripta.
>
>

Do proměnné typu `number` **nelze uložit** číslo větší než [`9_007_199_254_740_991`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) (devět biliard). Sice ho tam narveš, ale **ztrácíš přesnost** a nemůžeš se na výsledek [spolehnout](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger). 

Pokud chceš pracovat s většími čísly, použij **[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)**.

> [!danger]+ Pozor na přesnost desetinných čísel (**floating point arithmetic**)!
> Vlož do konzole tento kód:
> ```javascript playground
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
> 	- To neplatí vždy, například peníze (halíře) v bance takhle počítat **nemůžeme**. 
> 	- Pokud nám jde o to, kolik mají kámoši poslat za objednanou pizzu, tak je to fuk.
> 1. Pokud přesnost **nepotřebujeme**, postačí nám
> 	- [Zaokrouhlení nahoru](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
> 	- [Zaokrouhlení dolu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
> 	- [Zaokrouhlení](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
> 	- [Zaokrouhlení desetinných čísel](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround)
# Úloha 1 - Spotřeba benzínu 🚗
Vyrazíš s chábrama a chrábryněma na festival Rock For People tvým žihadlem Ford Fiesta z roku 2005.

Dohromady do Hradce a zpátky ujedeš **225 km** a spotřebuješ **15 litrů benzínu**.
Benzín Tě vyšel na **36.90 Kč** za litr.

1. Cenu benzínu dělíte mezi 4 lidi, **kolik peněz** Ti každý z nich pošle?
2. Jaká byla **průměrná spotřeba** benzínu na 100 km?

> [!question]- Nápověda - vzoreček průměrné spotřeby
> `Průměrná spotřeba = (spotřebováno litrů / uražená vzdálenost) * 100`

> [!todo]- Řešení
> V tomto případě nás přesnost **nezajímá**.
> 
> Jinak bychom **šli do pekla** za použití desetinných čísel při počítání peněz.
> 
> ```javascript playground
> const gasPrice = 36.90;
> const distanceTraveledKilometers = 225;
> const gasConsumedLiters = 15;
> const peopleOnBoardCount = 4;
> 
> const averageConsumption = (gasConsumedLiters / distanceTraveledKilometers) * 100;
> const totalGasPrice = gasConsumedLiters * gasPrice;
> const gasPriceShare = totalGasPrice / peopleOnBoardCount;
> 
> // Desetinné číslo
> console.log("Průměrná spotřeba: ", averageConsumption);
> // Pozor, zde se z výsledku stává `string`
> console.log("Průměrná spotřeba (dvě desetinná): ", 
> averageConsumption.toFixed(2));
> 
> // Můžeme v klidu zaokrouhlit, jednu korunu nikdo řešit nebude.
> console.log("Cena benzínu na hlavu: ", Math.round(gasPriceShare));
> ```
# Úloha 2 - FE!N 🔥
Ve Spotify wrapped 2024 máš nejposlouchanější skladbu FE!N od Travise Scotta, hrála Ti dohromady **112krát**.

1. Kolikrát se z Tvých sluchátek **ozvalo** "FE!N"?
2. Kolik sekund, minut a hodin si **strávil\*a poslechem**?
	- **formát**: Celkový čas poslechu je 5 hodin, 56 minut a 32 sekund

**Detaily:**
- Skladba trvá **3 minuty a 11 sekund**
- FE!N se v jednom přehrání skladby objeví **69krát**
- Vždy posloucháš až do konce.

> [!question]- Nápověda - výpočet
> Použiješ `modulo` - zbytek po dělení.
> 
> Nejdřív si spočítej celkový počet **sekund**.
> 
> Potom spočítej **celkový počet** **minut** `Celkem minut = celkem sekund / 60` a zaokrouhli ho dolů.
> 
> Potom z toho udělej celkový počet **hodin**  `Celkem hodin = celkem minut / 60` a zaokrouhli ho dolů.
> 
> Teď už to jenom naformátovat na výstup 😊 Tady už ti pomůže operátor modulo `%`.
> 
> Vypíšeš:
> 	1. `Hodiny`
> 	2. `Minuty % 60` - zajímají tě jen minuty, co nejsou obsaženy v hodinách.
> 	3. `Sekundy % 60` - zajímají tě jen sekundy, co nejsou obsaženy v minutách.
> 

> [!todo]- Řešení
> 
> Tady na to jdu složitějším způsobem, než píšu v nápovědě.
> 
> Když budu mít čas, upravím to. Nebo mi pošli Tvůj hezčí kód a já ho sem dám, dík :-)
> 
> ```javascript playground
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
# Úloha 3 - Paušální výdaje OSVČ 💰
Začínáš programovat na vlastní živnost (OSVČ) a přišel čas vyplnění daňového přiznání.

Za rok 2024 se ti povedlo vydělat **1 milion Kč**, gratuluju!
Potřebuješ vypočítat, kolik zaplatíš státu na **dani z příjmu**.

Účetní ti doporučila využití [paušálních výdajů](https://www.fakturoid.cz/almanach/dane/pausalni-vydaje) ve výši 60 %.

**Tvoje situace vypadá takto:**

| **Příjem**        | 1 000 000 Kč |                                                                                                       |
| ----------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| **Paušál výdajů** | 60 %         | [Dáno zákonem](https://financnisprava.gov.cz/cs/dane/dane/dan-z-prijmu/fyzicke-osoby/podnikatel-osvc) |
| **Výdaje**        | 600 000 Kč   | `příjem * Paušál výdajů`                                                                              |
| **Základ daně**   | 400 000 Kč   | `Příjem - Výdaje`                                                                                     |
| **Sazba daně**    | 15 %         | [Dáno zákonem](https://portal.gov.cz/informace/dane-z-prijmu-fyzickych-osob-INF-293)                  |
| **Daň**           | 60 000 Kč    | `Základ daně * Sazba daně`                                                                            |
Kolik by si na **dani zaplatil\*a**, kdyby tvůj příjem byl:
- 100 000 Kč
- 895 432 Kč
- 108 920 Kč

Neuvažuj slevy na dani.

>[!todo]- Řešení
>TODO :-)

> [!hint]- Jak zaplatit na daních 0 Kč?
> 
> [§ 240](https://www.zakonyprolidi.cz/cs/2009-40)
> 
> (1) Kdo ve větším rozsahu zkrátí daň, clo, pojistné na sociální zabezpečení, příspěvek na státní politiku zaměstnanosti, pojistné na úrazové pojištění, pojistné na zdravotní pojištění, poplatek nebo jinou podobnou povinnou platbu anebo vyláká výhodu na některé z těchto povinných plateb, bude potrestán **odnětím svobody na šest měsíců až tři léta** nebo zákazem činnosti.
> 
> ![[secret-ingredient.png]]