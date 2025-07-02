
Uvažujme následující kód:
```javascript
const shoeSize = 42;
console.log(typeof shoeSize);
// "number"
const shoeSizeString = shoeSize.toString();
console.log(typeof shoeSizeString)
// "string"
```

Jakto, že jsme mohli na **primitivním** obyčejném číslu volat metodu `toString`? 
Přece když na kalkulačce naťukám `42`, tak to neznamená nic jiného, než číslo `42`. Neumí nic speciálního a už vůbec ne se na něco proměnit..

Stejně tak můžeme na **primitivním** typu `string` volat metodu `toUpperCase`.
```javascript
const greeting = "Ahoj!";
console.log(greeting.toUpperCase())
// AHOJ!
```

Funguje to, protože v JavaScriptu existují **wrapper objekty** [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), atd...

Za běhu JavaScript **primitivní hodnotu** obalí do **wrapperu**, zavolá na něm požadovanou metodu a celý wrapper zase zahodí.

Příklad toho, jak se wrapper zahazuje, z knihy Effective Typescript - bod 10.

```javascript
const x = "Ahoj";
x.kohoZdravim = "Marcelu";
console.log(x);
console.log(x.kohoZdravim);
```

Wrapper objekty primitivních typů by se **nikdy neměly používat** napřímo. Wrappery jsou typu `object` a rovnají se jenom samy sobě.

Navíc je ještě rozdíl, když použiješ globální wrapper objekt a když použiješ jeho konstruktor.

```javascript
// Vrací primitivní hodnotu
const primitive = Number(123);
console.log(typeof primitive);

// Vrací celý wrapper object
const obj = new Number(123);
console.log(typeof obj);

console.log(primitive === obj);
```

Je to otázka na kterou by se Tě mohli **ptát při technickém pohovoru**.