JavaScript je programovací jazyk, který dnes běží **prakticky všude**. Můžeme v něm psát webové, mobilní a desktopové aplikace a i aplikace, které běží na serveru.

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
	- [ ] Zredukuj populaci na polovinu (`/`)

# Primitivní datové typy
Proměnná může obsahovat různé typy dat, zatím jsme si ukázali `string` a `number`.

| Typ         | Vysvětlení                                       | Příklady                                   |
| ----------- | ------------------------------------------------ | ------------------------------------------ |
| `number`    | [[Čísla - number\|číslo nebo desetinné číslo]] | `0`, `0.5`, `69`, `NaN`, `-Infinity`, `-0` |
| `string`    | jakýkoli text a nebo prázdný string              | `"a"`, `"Hello world!"`, `""`              |
| `boolean`   | hodnota ano/ne                                   | `true`, `false`                            |
| `null`      | [[JavaScript - Pokračování\|prázdná hodnota]]    | `null`                                     |
| `undefined` | [[JavaScript - Pokračování\|prázdná hodnota]]    | `undefined`                                |
Projdi si jednotlivé kapitoly 
# Komplexní datové typy

| Typ      | Vysvětlení                                                | Příklady                                        |
| -------- | --------------------------------------------------------- | ----------------------------------------------- |
| `object` | libovolná datová struktura                                | `{title: "FE!N", isBanger: true}`               |
| `array`  | více hodnot s určitým pořadím (**pole**)                  | `[1, 2, 13, 1337, 69, 420]`                     |
| `BigInt` | libovolně velké celé číslo                                | `100n`, `BigInt(200000)`                        |
| `Date`   | datum a čas                                               | `new Date()`, `new Date("2025-01-01 04:20:00")` |
| `Set`    | array, ale bez pořadí a prvky jsou unikátní (**množina**) | `new Set([1, 2, 3, 4])`                         |

Výklad je rozveden v [[Komplexní datové typy|následující kapitole]].
### Template na otázku :-D

> [!todo] Co se stane, když pořadí prohodíš?
> Spusť si následující kód.
> ```javascript
> console.log(personName);
> const personName = "František Palacký";
> ```

