---
title: Primitivní datové typy
---
# Primitivní datové typy
Proměnná může obsahovat různé **typy** dat, zatím jsme si ukázali `string` a `number`.

| Typ         | Vysvětlení                                        | Příklady                                   |
| ----------- | ------------------------------------------------- | ------------------------------------------ |
| `number`    | [[number\|číslo nebo desetinné číslo]]            | `0`, `0.5`, `69`, `NaN`, `-Infinity`, `-0` |
| `string`    | [[string\|jakýkoli text a nebo prázdný string]]   | `"a"`, `"Hello world!"`, `""`              |
| `boolean`   | [[boolean\|hodnota ano nebo ne]]                  | `true`, `false`                            |
| `null`      | [[Rozdíl mezi null, undefined a nullish\|prázdná hodnota]] | `null`                                     |
| `undefined` | [[Rozdíl mezi null, undefined a nullish\|prázdná hodnota]] | `undefined`                                |
Typ proměnné si můžeme v kódu **ověřit** pomocí klíčového slovíčka [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

```javascript
const exampleString = "👁👅👁";
const exampleNumber = 0.5;
const exampleBoolean = true;

console.log(typeof exampleString);
console.log(typeof exampleNumber);
console.log(typeof exampleBoolean);
```