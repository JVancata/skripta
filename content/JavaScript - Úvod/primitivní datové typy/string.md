String (česky **řetězec**) je vlastně **libovolný text**. Technicky správně je to **sekvence znaků**.

```javascript
const message = "Čau 👋 Můžeš sem napsat úplně cokoli budeš chtít.";
console.log(message);
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

Zkus si spustit následující kód:
```javascript
// ✅ Správné skládání stringů
const favouriteAnimal = "Šnek 🐌";
const animalMessage = `Čau!

Tvoje oblíbený zvíře je prej ${favouriteAnimal}!

Dobrá volba!
`;
console.log(animalMessage);
```
Pomocí **template literálů** (template stringů) můžeš mezi svůj text **vkládat proměnné**. 

Nic na tom není, ne? Nemusíš potom dělat toto:
```javascript
// ❌ Krkolomné skládání stringů, tohle spíš nedělej
const favouriteFood = "Cibule 🧅";
const foodMessage = "Jo, " + favouriteFood + " mi taky moc chutná!\n\nSnídaně bez " + favouriteFood + " není pořádná snídaně."
console.log(foodMessage);
```
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

```javascript
const person = {};
console.log(`Dobrá ráno, ${person.name}!
Dnes Ti je ${parseInt(person.age)} let!`);
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
> ```javascript
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