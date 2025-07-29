Array (česky **pole**) je **více hodnot za sebou**. Zapisuje se pomocí hranatých závorek `[]` a hodnoty jsou odděleny čárkou.

Příklad **známek** z předmětu Programování v JavaScriptu:

```javascript
const grades = [1, 3, 2, 1, 5];
console.log(grades);
console.log("Celkový počet známek:", grades.length);
```

Nebo už naprogramované projekty:
```javascript
const completedProjects = ["Soundboard", "Reader bar", "Countdown timer"];
console.log(`Počet hotový projektů: ${completedProjects.length}`);

// Přidání nového projektu
completedProjects.push("Spin the wheel");

console.log(`Počet hotový projektů: ${completedProjects.length}`);
console.log(completedProjects);
```

V `array` můžou být **jakékoli datové typy** – čísla, stringy, objekty, datumy, další arraye... Vždycky se ale drž pravidla, že jeden array = jeden datový typ.

Nový prvek do pole vložíš přes `.push()`
# Procházení array - indexování od nuly
První prvek v `array` má vždy **index `0`**. Druhý prvek má index `1`, atd...

```javascript
const completedProjects = ["Soundboard", "Reader bar", "Countdown timer"];
console.log("První hotový projekt:");
console.log(completedProjects[0]);

console.log("Poslední hotový projekt:");
console.log(completedProjects[completedProjects.length - 1]);
```

Pokud máš v poli 15 prvků, první je na indexu 0 a poslední na indexu 14 (délka pole - 1).

Když chceš projít všechny prvky v poli a vypsat je, použiješ `.forEach()`.

```javascript
const completedProjects = ["Soundboard", "Reader bar", "Countdown timer"];

completedProjects.forEach((project) => {
	console.log(`Název projektu: ${project}.`);
})
```

### Vyzkoušej
- [ ] udělej si pole známek z libovolného předmětu (obyčejná čísla) a vypiš všechny známky
	- [ ] před známky lepší než 3 dej ✅
	- [ ] před známky horší než 3 den ❌
	- [ ] před trojky dej ⚠
- [ ] udělej si pole s objekty - recenze restaurace
	- [ ] každá recenze má jméno zákazníka, text recenze a počet hvězdiček (1-5)
	- [ ] vypiš všechny recenze a počet hvězdiček vypiš pomocí emoji ⭐️
# Metody na array

## .find()
Najde a vrátí první první prvek v poli, který splňuje nějakou podmínku. Vždy vrací jenom jeden.

[Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

```javascript
const products = [
	{ id: 1, name: "Yeezy" },
	{ id: 2, name: "Air Jordan" },
	{ id: 3, name: "Nike Dunk" },
	{ id: 4, name: "Adidas Samba" },
	{ id: 3, name: "Jiná bota co má stejný ID jako Nike Dunk" },
];

const found = products.find((product) => product.id === 3);
console.log(found);
```
## .includes()
Vrátí `true`/`false`, jestli se daný prvek nachází v poli.

[Array.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

```javascript
const cities = ["Prague", "Berlin", "Tokyo", "Budapest"];

console.log(cities.includes("Munich"));
console.log(cities.includes("Tokyo"));
```
Tady si dej pozor – na objekty to [[object#Objekty se nerovnají|nebude fungovat]].[^1]
## .map
Vrátí nový `array`, který obsahuje pozměněná (pře**map**ovaná) data.

[Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript
const plants = [
	{id: 1, name: "Ficus Robusta", price: 199},
	{id: 2, name: "Rhaphidophora tetrasperma", price: 479},
	{id: 3, name: "Řasokoule", price: 79},
	{id: 4, name: "Monstera Adansonii", price: 429},
];

const outputArray = plants.map((plant) => {
	return `${plant.name} - ${plant.price} Kč`;
})

// Z arraye uděláme string - všechny prvky spojíme pomocí \n (nový řádek)
const outputText = outputArray.join("\n");

console.log("Nabídka našeho květinářství 🪴");
console.log(outputText);
```

Nový array je vždycky stejně dlouhý jako ten původní.

## .join()
Spojí všechny prvky do jednoho `string` a mezi jednotlivé prvky dá **oddělovač**.

[Array.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)


```javascript
const food = ["🌭", "🥖", "🍔", "🥓"];

// Jako oddělovač dáváme emoji
console.log(food.join(" 😋 "));

// Jako oddělovač nedáváme nic
console.log(food.join());
```
## .reverse() a .toReversed()
Obrátí celé pole - prvek na konci bude na začátku a prvek na začátku bude na konci.

[Array.reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

```javascript
const animals = ["Křeček 🐹", "Kočka 🐱", "Pes 🐶", "Velryba 🐳"];
console.log(animals);

animals.reverse();

// Původní pole se změnilo
console.log(animals);
```

Pozor, `.reverse()` změní pole in-place. To znamená, že tím šáhne na původní hodnotu a nevytváří nové pole.

Pokud chceš pracovat s novým polem a původní neměnit, použij `.toReversed()`

[Array.toReversed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)


```javascript
const animals = ["Křeček 🐹", "Kočka 🐱", "Pes 🐶", "Velryba 🐳"];
console.log(animals);

const reversedAnimals = animals.toReversed();

console.log("Původní zvířata: ", animals);
console.log("Obrácená zvířata: ", reversedAnimals);
```
## .sort() a .toSorted()
Pomocí porovnávací funkce **seřadí** pole.[^2]

[Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) a [Array.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)

Porovnávací funkce přijímá dva parametry - `a` a `b` a vrací hodnotu podle jejich pořadí.

| Podmínka               | Návratová hodnota                   |
| ---------------------- | ----------------------------------- |
| `a` je řazeno před `b` | -1 (nebo klidně jiné záporné číslo) |
| `a` je řazeno za `b`   | 1 (nebo klidně jiné kladné číslo)   |
| `a` je stejné jako `b` | 0                                   |
`(a, b) => a - b` seřadí čísla ve vzestupném pořadí.

```javascript
const countries = [
	{ name: "SK", population: 5_473_631 },
	{ name: "CZ", population: 10_604_294 },
	{ name: "HU", population: 9_584_627 },
];

// Vzestupně
const ascending = countries.toSorted((a, b) => {
	return a.population - b.population;
});
console.log(ascending);

// Sestupně 
const descending = countries.toSorted((a, b) => {
	return b.population - a.population;
});
console.log(descending);
```

`.sort()` změní pole in-place (změní původní hodnotu). Když to nechceš, použij `.toSorted()`. 
## .some()
Vrací `true` nebo `false`, pokud alespoň jeden prvek v poli splňuje podmínku.

[Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

```javascript
const AMOUNT_THRESHOLD = 10_000;

const transactions = [
	{ name: "McDonalds Praha 10", amount: 149 },
	{ name: "Albert Hradecká 13", amount: 49 },
	{ name: "Spotify", amount: 99 },
	{ name: "INVESTIČNÍ PLATFORMA GARANTOVANÉ ZISKY", amount: 150_000 },
];

const shouldLockAccount = transactions.some((transaction) => {
	return transaction.amount > AMOUNT_THRESHOLD
});

if (shouldLockAccount) {
	console.log("🚨 DETEKOVÁNY PODEZŘELÉ TRANSAKCE 🚨");
}
```

## .filter()
Vyfiltruje prvky, který splňují podmínku. Vrací `array`.

[Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```javascript
const companies = [
	{ name: "Agrofert", field: "AGRICULTURE" },
	{ name: "Fortuna", field: "GAMBLING" },
	{ name: "Lidl", field: "GROCERIES" },
	{ name: "Pražská plynárenská", field: "UTILITIES" },
	{ name: "Sazka", field: "GAMBLING" },
];

const gamblingCompanies = companies.filter((company) => company.field === "GAMBLING");

console.log(gamblingCompanies);
```

## .pop()
Vrátí poslední prvek v poli a odebere ho. Použiješ to, když potřebuješ datovou strukturu **zásobník**.

[Array.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

```javascript
const vegetables = ["Brokolice 🥦", "Paprika 🫑", "Okurka 🥒", "Rajče 🍅"];
const last = vegetables.pop();

console.log(last);
console.log(vegetables);
```


[^1]: Objekty jsou pointery na paměť. Když míří jinam, tak je jedno, jestli je tam stejná hodnota. Když dostanu dvě adresy – jednu v Praze, druhou v Brně – tak je jedno, že tam bydlí stejný počet lidí. Je to jiná adresa, jiný místo.

[^2]: Nepotřebuješ znát žádný řadící algoritmy. Všechno je vyřešený za Tebe pod pokličkou.
