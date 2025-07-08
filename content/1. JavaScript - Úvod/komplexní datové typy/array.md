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
# Metody na array

## .find()

## .includes()

## .map

## .join()

## .reverse()

## .some()

## .filter()

## .pop()

