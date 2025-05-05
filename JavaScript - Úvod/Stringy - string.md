String (česky řetězec) je vlastně **libovolný text**. Technicky správně, je to **sekvence znaků**.

```javascript
const message = "Čau 👋 Můžeš sem napsat úplně cokoli budeš chtít.";
```

>[!tip]- Kódování pro `string` je UTF-16 a umí vyjádřit vše v Unicode
>Asi to nemá moc cenu rozvádět pro obsah těchto skript, kdyžtak si to můžeš přečíst v [dokumentaci](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters)
>
>Sám tomu moc nerozumím, ale aby se ti povedlo nacpat do `string` vše z Unicode, tak na zakódování nějakých Unicode znaků musíš použít 2 UTF-16 znaky.
# Zápis stringu

Existuje **více způsobů** pro zápis stringu
```javascript
const simpleQuotes = 'Buď v jednoduchých uvozovkách';
const doubleQUotes = "Nebo v dvojitých uvozovkách";

const backTicks = `Nebo v tzv. back-tickách. Neboli obrácených (zpětných) apostrofech 🤓`;
```

Backtick na **české klávesnici** napíšeš pomocí `AltGr` + `7`. 

Zápis pomocí **backticků** má dvě výhody
 1. můžeš zápis **roztáhnout na více řádků** a zachová se tím odřádkování
 2. můžeš použít **template literály** (zní to strašidelně, ale neboj)

Pomocí **template literálů** (template stringů) můžeš mezi svůj text **vkládat proměnné**. Zkus si spustit následující kód.
```javascript
// ✅ Správné skládání stringů
const favouriteAnimal = "Šnek 🐌";
const animalMessage = `Čau!

Tvoje oblíbený zvíře je prej ${favouriteAnimal}!

Dobrá volba!
`;
console.log(animalMessage);
```

Nic na tom není, ne? Nemusíš potom dělat toto:
```javascript
// ❌ Krkolomné skládání stringů, tohle spíš nedělej
const favouriteFood = "Cibule 🧅";
const foodMessage = "Jo, " + favouriteFood + " mi taky moc chutná!\n\nSnídaně bez " + favouriteFood + " není pořádná snídaně."
console.log(foodMessage);
```

# Porovnání stringů
Stringy mezi sebou porovnáš **úplně stejně, jako čísla**.

```javascript
const string1 = "12";
const string2 = "24";
const string3 = "🥔";

// Tohle dává smysl
console.log(string1 === string2);
// Vždycky používej > a < jenom pro abecední řazení, nikdy porovnání čísel.
console.log(string3 > string2);
```
Vždycky mezi sebou porovnávej jen proměnný se **stejným typem**.

Pokud na `string` chceš použít `>` a `<`, tak jedině za účelem **abecedního řazení**. Sice to umí porovnávat čísla, ale nedává to smysl.
# Procházení stringu
[0], [1]...
# Metody na stringu
.length
.toLowerCase
.toUpperCase
.trim
.split
.replace
.includes
# String coercion
Ukázat na příkladu

- Strings are returned as-is.
- [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) turns into `"undefined"`.
- [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) turns into `"null"`.
- `true` turns into `"true"`; `false` turns into `"false"`.
- Numbers are converted with the same algorithm as [`toString(10)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString).
- [BigInts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) are converted with the same algorithm as [`toString(10)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString).
- [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) throw a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError).
- Objects are first [converted to a primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) by calling its [`[Symbol.toPrimitive]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) (with `"string"` as hint), `toString()`, and `valueOf()` methods, in that order. The resulting primitive is then converted to a string.