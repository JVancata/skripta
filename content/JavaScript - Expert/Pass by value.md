Tento výklad je zjednodušení [článku od Aleksandra Hovhannisyana](https://www.aleksandrhovhannisyan.com/blog/javascript-pass-by-reference/). Píšu ho hlavně pro sebe, až se k tomu budu někdy vracet a nebudu si moct vzpomenout, jak to vlastně funguje.

V JavaScript se **všechny** data předávají přes **hodnotu**. Nikdy přes referenci. 

Na internetu se různě píše, že [[JavaScript - Úvod#Primitivní datové typy|primitivní datové typy]] se předávají pomocí **hodnoty** (value) a objekty se předávají pomocí **reference**, ALE TECHNICKY TO NENÍ PRAVDA!

Nejlíp si to ukážeme na následujících dvou snippetech:
```javascript
const cislo = 42;
let druheCislo = cislo;

console.log(cislo); // 42
console.log(druheCislo); // 42

druheCislo = 1337;

console.log(cislo); // 42
console.log(druheCislo); // 1337
```

Tady je vše v pořádku a vidíme, že se do proměnné `druheCislo` **předala pouze hodnota**, nikoli reference. V opačném případě by se i v proměnné `cislo` nacházela hodnota `1337`.

Problém ale nastává u `object` a `array`, kde se milně tvrdí, že jsou předávány pomocí `reference`. Ale není tomu tak.

```javascript
const objekt = { jmeno: "Karel Smrádek" };
const druhyObjekt = objekt;

console.log(objekt.jmeno); // Karel Smrádek
console.log(druhyObjekt.jmeno); // Karel Smrádek

druhyObjekt.jmeno = "Martina Smrádková";

console.log(objekt.jmeno); // Martina Smrádková
console.log(druhyObjekt.jmeno); // Martina Smrádková
```

Když se v JavaScriptu nepředávají data přes referenci, jaktože se změnil klíč `jmeno` i v proměnné `objekt`?

>[!important] Hodnota proměnné typu `object` a `array` je jenom **pointer** na adresu v paměti.

Objekt (a array) vlastně neví nic o hodnotě, která v objektu reálně je. Pouze na ni ukazuje.

Představit se to dá na příkladu **poštovní adresy**. Pokud máme adresu Novoborská 602/10, můžeme se tam jít podívat a spočítat, kolik studentu se zde nachází. Ale bez toho, abychom **adresu navštívili**, se to nedozvíme.

To je ostatně i důvod, proč v JavaScriptu (ne)funguje následující kód:

```javascript
const osoba1 = { id: 3, jmeno: "Marie" };
const osoba2 = { id: 3, jmeno: "Marie" };

console.log(osoba1 === osoba2); // false
```

JavaScript udělá vlastně něco jako je toto:
```javascript
const osoba1 = "Data se dozvíš na adrese 0x4239FA"
const osoba2 = "Data se dozvíš na adrese 0x001AB2"
```

Vytvořili jsme dva různé objekty, které se nachází na odlišných adresách a `===` **porovnává adresy** (pointery). Objekt (a array) je vždy jenom pointer - adresa v paměti.

>[!tip] Pozor - v JavaScriptu je vlastně všechno `object`, ale ne tak úplně
> 
> V kapitole [[Rozdíl mezi null a undefined]] jsme si řekli, že v JavaScriptu je vše `object`, proč se teda příklad nahoře s dvěmi čísly nechová jako příklad s objekty?
> 
> Protože JavaScript předává všechna data podle **hodnoty**, ne reference. Hodnota čísla `42` je `42`, i když je na jeho prototypu funkce `.toString()`. Pokud tedy takto k sobě přiřadíme dvě proměnné, vždy se předá hodnota a číslo `42` se v paměti zkopíruje.
> 
> Pokud takto přiřazujeme `object`, v paměti zkopírujeme **pointer** - adresu.
> 
> **Objekty v JavaScriptu jsou jenom pointery**.

Pro důkaz toho, že hodnotou objektu je jenom pointer slouží následující kód převzatý z původního článku.

```js
const já = { name: 'Aneta' };
let mojePřezdívka = já;
mojePřezdívka = { name: 'Anča' };

console.log(já); // { name: 'Aneta' }
console.log(mojePřezdívka); // { name: 'Anča' }
```

V kódu se děje toto:
1. Do proměnné `já` přiřadíme pointer na paměť. 
	- V paměti na dané adrese máme objekt `{ name: 'Aneta' }`.
2. Do proměnné `mojePřezdívka` přiřadíme hodnotu proměnné `já` - pointer na paměť.
3. Do proměnné `mojePřezdívka` přiřadíme **nový pointer** na paměť
	- V paměti na dané adrese máme objekt `{ name: 'Anča' }`.

Vidíme, že hodnota proměnné `já` se nemění a proměnná stále ukazuje na původní místo v paměti. Změnili jsme pouze, kam ukazuje proměnná `mojePřezdívka`. Díky tomu, že JavaScript předává data "by value" (přes hodnotu), se původní proměnná `já` nijak nemění.
