---
title: JavaScript - Úvod
---
JavaScript je programovací jazyk, který dnes běží **prakticky všude**. Můžeme v něm psát webové, mobilní a desktopové aplikace a i aplikace, které běží na serveru.

>[!info]- Přesnější definice
>JavaScript:
>- je **interpretovaný** (nebo [JIT kompilovaný](https://developer.mozilla.org/en-US/docs/Glossary/Just_In_Time_Compilation)) programovací jazyk.
>- je **slabě typovaný** (loosly typed) - proměnné mohou za běhu měnit typ
>- **single threaded** - běží pouze na jednom jádře
>- **objektově orientovaný**, imperativní a zároveň i deklarativní
>  
 > Nejčastěji běží v **prohlížeči**, ale stejně funguje i na [serveru](https://nodejs.org/en). Dají se v něm psát i [mobilní](https://reactnative.dev/) a [desktopové](https://www.electronjs.org/) aplikace. 
> 
> Kromě názvu nemá s **Javou** nic společného.

Otevři **vývojářskou konzoli** v prohlížeči (F12) a klikni na záložku "console". **Zkopíruj** a **vlož** následující kód a stiskni enter.

Možná ti to nedovolí vkládat text, **bacha**. Přečti si tu chybovou hlášku, co to píše.

```javascript
const greet = () => {
	console.log("Ahoj, světe!");
}

greet();
```

Gratuluju, už jsi oficiálně **programátor\*ka**!
# Proměnné

Proměnná je **základ** programování, uchováváme v ní **data** a následně s nimi pracujeme. 

Hodnotu **vypíšeme** pomocí `console.log`

```javascript
const pageTitle = "JavaScript - Úvod";
console.log(pageTitle);

let viewCount = 100;
viewCount = viewCount + 1;
console.log(viewCount);
```

Proměnná se v JavaScriptu **deklaruje** pomocí **klíčových slov** `const` a `let`. V kódu nahoře **deklarujeme** dvě proměnné - název kurzu a počet shlédnutí.

| `const`                                   | `let`                                             |
| ----------------------------------------- | ------------------------------------------------- |
| Nikdy **nemůžeme** přiřadit novou hodnotu | Hodnotu **můžeme** změnit a můžeme přiřadit novou |
| Snažíme se použít **vždy**                | Snažíme se používat co **nejméně**                |
| Nikdy **nemůžeme** znovu deklarovat       | Nikdy **nemůžeme** znovu deklarovat               |
| Vždy drží **stejný** datový typ (logicky) | Datový typ se **může změnit**                     |
Vždy proměnnou nazvi anglicky tak, aby byl **z názvu jasný obsah**. Nic se nestane, ale líp se to čte.

```javascript
// ✅ Správně!
const accountBalance = 800;
const favouriteMovieLink = "https://www.csfd.cz/film/345767";

// ❌ Špatně!
const nevim = 12;
const variable = "2902736809/2010";
const háčkyČárkyToTakyUmíAlePůjdešDoPekla = 666;
```

**Gratuluju**, rozumíš prvnímu odbornému termínu - **deklarace proměnné**!

Do proměnných jdou ukládat různé typy dat - [[number|čísla]], [[string|stringy]], [[Date|datumy]]... Rozlišujeme mezi sebou [[JavaScript - Úvod/primitivní datové typy/index|primitivní]] a [[JavaScript - Úvod/komplexní datové typy/index|komplexní]] datové typy.

Kód, který využívá proměnnou, **musí následovat** až po její **deklaraci**. Počítač (interpreter) to čte stejně jako Ty - **odshora** a **zleva**.

> [!todo]- Proč to nefunguje?
> Spusť si následující kód:
> ```javascript
> console.log(personName);
> const personName = "František Palacký";
> ```
> 
>Víš, proč to nefunguje?

Jeden název proměnné **nemůžeme** použít dvakrát - musí být **unikátní** (později si vysvětlíme, že to není tak jednoduché).

> [!todo]- Proč to nefunguje?
> Spusť si následující kód:
> ```javascript
> const personAge = 68;
> const personAge = 82;
> ```
> Víš, proč to nefunguje?
> 
> Pozor, ani toto nebude fungovat:
> ```javascript
> let personShoeSize = 41;
> let personShoeSize = 42;
> ```
> 
> Ani `let` nemůžeme **založit** dvakrát se stejným názvem. Můžeme ale udělat toto:
> ```javascript
> let personShoeSize = 41;
> personShoeSize = 42;
> ```

> [!caution]- Co je to klíčové slovo `var`?
> Úplně jednoduše: **nepoužívat**!
> 
> Když budeš na internetu hledat JS kód (a nebo Ti ho bude generovat AI), určitě narazíš na klíčové slovo `var`. 
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

# Podmínky
Můžeme se v kódu **rozhodovat**, co se má stát, pokud nastala nějaká **podmínka**.

Stačí nám dvě **klíčová slovíčka** - `if` a `else`. Buď to, nebo to.

```javascript
const isRaining = true;

// Pokud je proměnná isRaining true, vykoná se následující kód
if (isRaining) {
	console.log("Prší 🌧");
	// Např. ti připomene v 7:00, že si máš vzít deštník.
}
// Pokud je proměnná isRaining false, vykoná se následující kód
else {
	console.log("Neprší 😁");
}
```

Kód v `if` bloku se vykoná vždy, když je hodnota `true`. Na vysvětlení vyhodnocení podmínek slouží celá kapitola [[boolean]].

```javascript
const age = 17;

if (age < 18) {
	console.log("Zákaz prodeje alkoholických nápojů, tabákových výrobků, kuřáckých pomůcek, elektronických cigaret, nikotinových sáčků bez obsahu tabáku a bylinných výrobků určených ke kouření osobám mladším 18 let");
}
```

Ukážeme si složitější situaci na následujícím **diagramu**:

```mermaid
flowchart TD
    A(["function getItemsByWeather()"]) --> B{"Prší venku?"}
    B -- true --> C["Vem si deštník"]
    B -- false --> D{"Je teplo?"}
    D -- true --> n1["Vem si kraťasy"]
    D -- false --> n5["Vem si mikinu"]
    n2["Svítí sluníčko?"] -- true --> n3["Vem si sluneční brýle a čepici"]
    n1 --> n2
    n5 --> n2
    C --> D
    n2@{ shape: diam}
```

Ten bychom v JavaScriptu zapsali takto:

```javascript
function getItemsByWeather(isRaining, isWarmWeather, isSunny) {
	if (isRaining) {
		console.log("Vem si deštník");
	}
	
	if (isWarmWeather) {
		console.log("Vem si kraťasy");
	}
	else {
		console.log("Vem si mikinu");
	}
	
	if (isSunny) {
		console.log("Vem si slunčení brýle a čepici");
	}
}

getItemsByWeather(false, true, true); // Spusť si to a schválně, co to vypíše.
```

# Funkce
Arrow function vs function

Data in -> data out

