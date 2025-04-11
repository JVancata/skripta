JavaScript je programovací jazyk, který dnes běží prakticky všude. Můžeme v něm psát webové, mobilní a desktopové aplikace a i aplikace, které běží na serveru.

>[!info]- Přesnější definice
>JavaScript:
>- je interpretovaný (nebo [JIT kompilovaný](https://developer.mozilla.org/en-US/docs/Glossary/Just_In_Time_Compilation)) programovací jazyk.
>- je slabě typovaný (loosly typed) - proměnné mohou za běhu měnit typ
>- single threaded - běží pouze na jednom jádře
>- objektově orientovaný, imperativní a zároveň i deklarativní
>  
 Nejčastěji běží v **prohlížeči**, ale stejně funguje i na [serveru](https://nodejs.org/en). Dají se v něm psát i [mobilní](https://reactnative.dev/) a [desktopové](https://www.electronjs.org/) aplikace. 
> 
> Kromě názvu nemá s **Javou** nic společného.

Otevři **vývojářskou konzoli** v prohlížeči (F12) a klikni na záložku "console". Zkopíruj a vlož následující kód a stiskni enter.

```javascript
const greet = () => {
	console.log("Ahoj, světe!");
}

greet();
// Ahoj světe!
```

Gratuluju, už jsi oficiálně programátor\*ka!
# Proměnné

Proměnná je **základ** programování, uchováváme v ní **data** a následně s nimi pracujeme.

Proměnná se v JavaScriptu **deklaruje** pomocí **klíčových slov** `const` a `let`. V kódu níže **deklarujeme** dvě proměnné - název kurzu a počet shlédnutí - a rovnou do nich přiřazujeme hodnotu.

```javascript
const pageTitle = "JavaScript - Úvod";
console.log(pageTitle);
// JavaScript - Úvod

let viewCount = 100;
viewCount = viewCount + 1;
console.log(viewCount);
// 101
```

| `const`                               | `let`                                         |
| ------------------------------------- | --------------------------------------------- |
| Nikdy nemůžeme přiřadit novou hodnotu | Hodnotu můžeme změnit a můžeme přiřadit novou |
| Snažíme se použít vždy                | Snažíme se používat co nejméně                |
| Nikdy nemůžeme znovu deklarovat       | Nikdy nemůžeme znovu deklarovat               |
| Vždy drží stejný datový typ (logicky) | Datový typ se může změnit                     |

Kód, který využívá proměnnou, musí následovat až po její **deklaraci**. Počítač (interpreter) to čte stejně jako Ty - **odshora** a **zleva**. 

Název proměnné musí být **unikátní**, nemůžeme ho znovu použít (později si vysvětlíme, že to není tak jednoduché). 

Vždy proměnnou nazvi tak, aby byl **z názvu jasný obsah**.

**Gratuluju**, rozumíš prvnímu odbornému termínu - **deklarace proměnné**!

> [!caution]- Co je to klíčové slovo `var`?
> Když budeš na internetu hledat JS kód (a nebo Ti ho bude generovat AI), určitě narazíš na klíčové slovo `var`.
> 
> Úplně jednoduše: **nepoužívat**!
> 
> Pokud Tě zajímá důvod, najdeš ho v sekci [[JavaScript - Expert]] - **"variable hoisting"**.
> 
> Jak jsme si řekli, že nejdřív musíš proměnnou nadefinovat a pak až jí použít, tak to pro `var` **neplatí**. Není to výhoda, kód to dělá **nepřehledným** a způsobuje to **neočekáváné** chování.

**Vyzkoušej**:
- [ ] Nadefinovat proměnnou, která obsahuje název tvého oblíbeného filmu.
- [ ] Nadefinovat proměnnou, která obsahuje počet lidí na planetě zemi.
	- [ ] Přičti jednoho člověka (`+`)
	- [ ] Odečti 100 lidí (`-`)
	- [ ] Vynásob počet lidí dvěma (`*`)
	- [ ] Zredukuj populaci na polovinu

## Primitivní datové typy
Proměnná může obsahovat různé typy dat, zatím jsme si ukázali `string` a `number`.

| Typ         | Vysvětlení                                    | Příklady                                   |
| ----------- | --------------------------------------------- | ------------------------------------------ |
| `number`    | číslo nebo desetinné číslo                    | `0`, `0.5`, `69`, `NaN`, `-Infinity`, `-0` |
| `string`    | jakýkoli text a nebo prázdný string           | `"a"`, `"Hello world!"`, `""`              |
| `boolean`   | hodnota ano/ne                                | `true`, `false`                            |
| `null`      | [[JavaScript - Pokračování\|prázdná hodnota]] | `null`                                     |
| `undefined` | [[JavaScript - Pokračování\|prázdná hodnota]] | `undefined`                                |
### `number`
- Celá čísla - `0`, `69` nebo `9_007_199_254_740_991`
- Desetinná čísla - `0.1`, `0.2`
- Not a number - [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) - pozor na něj!
- [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

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
> const sum = 0.2+0.1;
> console.log(sum);
> console.log(sum === 0.3); // Je to true, nebo false?
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


## Objekty - `object`

Díky objektům můžeme v JavaScriptu tvořit **komplexní datové struktury** (další odborný pojem, gratuluji!)

Uděláme si proměnnou, která obsahuje data o písni ze Spotify

```javascript
const song = {
	title: "FE!N (feat. Playboi Carti)",
	author: "Travis Scott",
	playCount: 1_234_379_698,
	lengthSeconds: 191,
	isExplicit: true,
	url: "https://open.spotify.com/track/42VsgItocQwOQC3XWZ8JNA",
}

console.log(song.title)
// "FE!N (feat. Playboi Carti)"
console.log(song.author)
// "Travis Scott"
```

Máme **komplexní datovou strukturu** a ani to nebolelo.

Vytvořili jsme objekt `song`, který obsahuje **klíče** `title`, `author`, `playCount`, `lengthSeconds`, `isExplicit` a `url`.

Ke každému **klíči** je v objektu přiřazena **hodnota** - `key` a `value`.

- **Klíč** je název **vlastnosti** (např. barva očí)
- **Hodnota** klíče je hodnota jeho vlastnosti (např. hnědá)
- Objekt definujeme pomocí **chlupatých závorek** - `{ }`
- **Klíč** je vždy typu `string` (nebo `Symbol`)
- Klíče od sebe oddělujeme čárkou `,`
- Pro přehlednost je oddělujeme i **novým řádkem**, ale není to nutné
- Hodnota může být **jakýkoli typ** v JavaScriptu, například i funkce

**Syntaxe objektu**:
```javascript
const indentifier = {
	key: "value",
	key1: "value1",
	// ...
	key32: "value32",
}

// Přístup ke klíčům objektu
console.log(indentifier.key)
// "value"
console.log(indentifier["key1"])
// "value1"
console.log(indentifier.key33)
// undefined
```

Pozor! Syntaxe JavaScript objektu a JSONu **není stejná**, v detailech se liší!

>[!info]- **V JavaScriptu je všechno `object`**
> Pro potřeby našeho kurzu není **potřeba jít do detailu**, ale musíme si toho být vědomi.
>
>Uvažujme následující kód:
>```javascript
>const shoeSize = 42;
>console.log(typeof shoeSize);
>// "number"
>const shoeSizeString = shoeSize.toString();
>console.log(typeof shoeSizeString)
>// "string"
>```
>
>Jaktože jsme mohli na **primitivním** obyčejném číslu volat metodu `toString`? 
>Přece když na kalkulačce naťukám `42`, tak to neznamená nic jiného, než číslo `42`. Neumí nic speciálního a už vůbec ne se na něco proměnit..
>
>Funguje to protože i obyčejné číslo je v JS `object` a má svoje **metody**.
>
>**![[its-all-objekt.jpg]]**
>
>Stejně tak můžeme na **primitivním** typu `string` volat metodu `toUpperCase`.
>```javascript
>const greeting = "Ahoj!";
>console.log(greeting.toUpperCase())
>// AHOJ!
>```
>
>Děje se to kvůli [prototype chainingu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain). V JS každý typ **dědí** (inheritance) z `object`. 
>
>Je to otázka na kterou by se Tě mohli **ptát při pohovoru**. Zároveň, pokud tento koncept neznáš, můžeš si do kódu jednoduše zanést bezpečnostní díry.

### Template na otázku :-D

> [!todo] Co se stane, když pořadí prohodíš?
> Spusť si následující kód.
> ```javascript
> console.log(personName);
> const personName = "František Palacký";
> ```
