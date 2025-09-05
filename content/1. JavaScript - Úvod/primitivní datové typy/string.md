String (česky **řetězec**) je vlastně **libovolný text**. Technicky správně je to **sekvence znaků**.

```javascript playground
const message = "Čau 👋 Můžeš sem napsat úplně cokoli budeš chtít.";
console.log(message);
// Výstup: Čau 👋 Můžeš sem napsat úplně cokoli budeš chtít.
```

>[!tip] Kódování pro `string` je UTF-16 a umí vyjádřit vše v Unicode
>Aby se ti povedlo nacpat do `string` vše z **Unicode**, tak na zakódování nějakých znaků musíš **použít 2 UTF-16 znaky**.
>
>⚠ Pozor třeba na **emoji** - to jsou skoro vždy 2 UTF-16 znaky
>
>Asi to nemá moc cenu rozvádět, kdyžtak si to můžeš přečíst v [dokumentaci](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters)
# Zápis stringu

Existuje **více způsobů** pro zápis stringu
```javascript playground
const simpleQuotes = 'Buď v jednoduchých uvozovkách';
const doubleQUotes = "Nebo v dvojitých uvozovkách";

const backTicks = `Nebo v tzv. back-tickách. Neboli obrácených (zpětných) apostrofech 🤓`;
```

Backtick na **české klávesnici** napíšeš pomocí `AltGr` + `7`. 

Zápis pomocí **backticků** má dvě výhody
 1. můžeš zápis **roztáhnout na více řádků** a zachová se tím odřádkování
 2. můžeš použít **template literály** (zní to strašidelně, ale neboj)

Zkus si spustit následující kód:
```javascript playground
// ✅ Správné skládání stringů
const favouriteAnimal = "Šnek 🐌";
const animalMessage = `Čau!

Tvoje oblíbený zvíře je prej ${favouriteAnimal}!

Dobrá volba!`;

console.log(animalMessage);
// Výstup:
// Čau!
// Tvoje oblíbený zvíře je prej Šnek 🐌!
// Dobrá volba!
```
Pomocí **template literálů** (template stringů) můžeš mezi svůj text **vkládat proměnné**. 

Nic na tom není, ne? Nemusíš potom dělat toto:
```javascript playground
// ❌ Krkolomné skládání stringů, tohle spíš nedělej
const favouriteFood = "Cibule 🧅";
const foodMessage = "Jo, " + favouriteFood + " mi taky moc chutná!\n\nSnídaně bez " + favouriteFood + " není pořádná snídaně."

console.log(foodMessage);
// Výstup:
// Jo, Cibule 🧅 mi taky moc chutná!
// Snídaně bez Cibule 🧅 není pořádná snídaně.
```
# Procházení stringu
Někdy potřebuješ **projít** `string` po jednotlivých **znacích** (písmenkách).

Stringy jsou v JavaScriptu [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), funguje tedy úplně to stejné, co u [[array|arraye]].

```javascript playground
const animals = "Zvířátka: 🦓🐴🦄🐔🐹🐗🐶🐒🦍🦧";

// ✅ Můžeš je proloopovat přes for const of
for (const animal of animals) {
	console.log(`Zvíře: ${animal}`);
}

// ✅ Můžeš je převést na array a pak si s nima dělat, co chceš
let animalsArray = Array.from(animals);
console.log(animalsArray);

// ✅ Nebo můžeš použít spread syntax
animalsArray = [...animals];
console.log(animalsArray);

// ⚠ Dej si ale opět pozor na speciální emoji (spojené z více různých emoji)
console.log(Array.from("👩‍👩‍👧‍👧"));
```

⚠ Dej si ale **pozor** na procházení `string` přes indexy, pokud si ho předtím nepřevedeš na `array`.

```javascript playground
// ⚠ BACHA!!!
// Emoji (a i jiné Unicode znaky) jsou napozadí 2 a více různých UTF-16 znaků
const emojis = "🎈🎆🎇🧨✨🎉🎊🎃";
console.log(emojis[0]);
// Výstup: �
console.log(emojis[1]);
// Výstup: �
console.log(emojis[emojis.length - 1]);
// Výstup: �

// ⚠ To stejné platí, když uděláš .split("")
console.log(emojis.split(""));
// Výstup: ['\uD83C', '\uDF88', '\uD83C', '\uDF86', '\uD83C', '\uDF87', '\uD83E', '\uDDE8', '✨', '\uD83C', '\uDF89', '\uD83C', '\uDF8A', '\uD83C', '\uDF83']
```

> [!info]- Jak správně procházet string s emoji
> 
> Jak jsme si popsali nahoře, emoji jsou **dva různé UTF-16 znaky**. Některé emoji jsou dokonce složeny z ještě více znaků.
> 
> Na speciální emoji potřebuješ použít [Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter).
> 
> ```javascript playground
> const segmenter = new Intl.Segmenter();
> 
> const getStringSegments = (input) => {
> 	const segments = Array.from(segmenter.segment(input));
> 	return segments.map((segment) => segment.segment);
> }
> 
> console.log(getStringSegments("Tohle jsou spešl emoji: 👩‍👩‍👧‍👧👧🏻🧒🏾👶🏿👨🏼‍🦰"))
> ```
> 
# Metody na stringu

## .length

```js playground
// Délka stringu, bacha na emoji!!!
console.log("Čau".length);
// Výstup: 3
console.log("😁".length);
// Výstup: 2
console.log("👩‍👩‍👧‍👧".length);
// Výstup: 11
```
## .toLowerCase
```javascript playground
console.log("Ahoj, PŘEVEDU TO MALÝ, OK?".toLowerCase());
// Výstup: ahoj, převedu to malý, ok?
```
## .toUpperCase
```javascript playground
console.log("ČAU, převedu to velký, ok?".toUpperCase());
// Výstup: ČAU, PŘEVEDU TO VELKÝ, OK?
```
## .trim
```javascript playground
console.log("    Vyhodím mezery ze začátku a z konce, jo?     ".trim());
// Výstup: "Vyhodím mezery ze začátku a z konce, jo?"
```
## .split

```javascript playground
// todo
console.log("Udělám ze stringu array podle rozdělovače, třeba ho rozdělám na mezery".split(" "));
```

.replace
.includes
# String coercion

Když převádíme jiné **datové typy** na `string`, musíme si **dávat pozor**, co se nám reálně vypíše.

| hodnota                | typeof      | .toString()         |
| ---------------------- | ----------- | ------------------- |
| `"Čus 👋"`             | `string`    | `"Čus 👋"`          |
| `10`                   | `number`    | `"10"`              |
| `NaN`                  | `number`    | `"NaN"`             |
| `true`                 | `boolean`   | `"true"`            |
| `null`                 | `object`    | `"null"`            |
| `undefined`            | `undefined` | `"undefined"`       |
| `NaN`                  | `number`    | `"NaN"`             |
| `{website: "alza.cz"}` | `object`    | `"[object Object]"` |

Můžou se pak stát vtipný situace, když to správně neošetříš.

> [!tip]- Mandarinky
> ![[mandarinky.png]]
> 
> [Opět propůjčeno](https://adamjedlicka.notion.site/Meme-ka-3458e0f7a1c3431bbf231e3a52550552#7e963e73ba1e48438c503440f69aee70)

```javascript playground
const person = {};
console.log(`Dobrá ráno, ${person.name}!
Dnes Ti je ${parseInt(person.age)} let!`);
// Výstup:
// Dobrá ráno, undefined!
// Dnes Ti je NaN let!
```

# Úloha 1 - Plivání faktů 🗣️ 
Chceš zdůraznit, že věta, kterou někdo řekl, je **fakt důležitá** a měla by se tesat do kamene - tzv. je "fire" 🔥.

Udělej funkci, která pořádně **opepří obyčejnou větu**, ať to nemusíš dělat ručně.

| Původní věta                                                                                                                                                                                                                                                                                                                                                   | Nová věta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tung Tung Tung Sahur je největší GOAT                                                                                                                                                                                                                                                                                                                          | 🔥 TUNG 🗣 TUNG 🗣 TUNG 🗣 SAHUR🗣 JE 🗣 NEJVĚTŠÍ 🗣 GOAT 🔥                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Segedínský guláš, lidově někdy zkracováno na segedín, je jeden ze známých druhů gulášů. Vaří se z vepřového masa (libového vykostěného bůčku nebo plecka). Další důležitou surovinou je kysané bílé zelí. Dále se používá cibule, olej nebo sádlo, mletá sladká červená paprika, sůl, černý pepř, bobkový list (údajně proti nadýmání) a pro zjemnění smetana. | 🔥 SEGEDÍNSKÝ 🗣 GULÁŠ, 🗣 LIDOVĚ 🗣 NĚKDY 🗣 ZKRACOVÁNO 🗣 NA 🗣 SEGEDÍN, 🗣 JE 🗣 JEDEN 🗣 ZE 🗣 ZNÁMÝCH 🗣 DRUHŮ 🗣 GULÁŠŮ. 🗣 VAŘÍ 🗣 SE 🗣 Z 🗣 VEPŘOVÉHO 🗣 MASA 🗣 (LIBOVÉHO 🗣 VYKOSTĚNÉHO 🗣 BŮČKU 🗣 NEBO 🗣 PLECKA). 🗣 DALŠÍ 🗣 DŮLEŽITOU 🗣 SUROVINOU 🗣 JE 🗣 KYSANÉ 🗣 BÍLÉ 🗣 ZELÍ. 🗣 DÁLE 🗣 SE 🗣 POUŽÍVÁ 🗣 CIBULE, 🗣 OLEJ 🗣 NEBO 🗣 SÁDLO, 🗣 MLETÁ 🗣 SLADKÁ 🗣 ČERVENÁ 🗣 PAPRIKA, 🗣 SŮL, 🗣 ČERNÝ 🗣 PEPŘ, 🗣 BOBKOVÝ 🗣 LIST 🗣 (ÚDAJNĚ 🗣 PROTI 🗣 NADÝMÁNÍ) 🗣 A 🗣 PRO 🗣 ZJEMNĚNÍ 🗣 SMETANA. 🔥 |
1. Vždycky dej na **začátek a konec** jeden emoji
2. Mezi **každé slovo** vlož další emoji
3. Všechny malá písmena **převeď na velká**

> [!todo]- Řešení
> ```javascript playground
> const makeSentenceFire = (input) => {
>     const trimmed = input.trim();
>     
>     // Kdyby tam náhodou dal někdo prázdný string, nebo string s mezerami
>     if(!trimmed) return "🔥";
>     
>     const upperCase = trimmed.toUpperCase();
>     const shouted = upperCase.replaceAll(" ", " 🗣 ");
>     const fire = `🔥 ${shouted} 🔥`;
>     
>     return fire;
> }
> ```