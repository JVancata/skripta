Tato kapitola je binární, buď `true` nebo `false`.

Tak tohle bude asi nejlehčí kapitola :-)

Falsy a truthy hodnoty ukázat

Udělat tabulku na falsy a truthy hodnoty

and, or, not



# Porovnávání čísel
Používáme jedině **trojité rovná se** `===` ([strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)). 

| **název**    | operátor | **příklad**    | **výsledek** |
| ------------ | -------- | -------------- | ------------ |
| Rovná se (✅) | `===`    | `666 === 555`  | `false`      |
| Rovná se (❌) | `==`     | `"777" == 777` | `true`       |
| Nerovná se   | `!==`    | `111 !== 222`  | `true`       |

Použití pouze **dvou rovná se** `==` sice funguje, ale **nekontroluje datový typ** a to vede k chybám. Můžeme porovnávat `number` se `string`, což vůbec **nedává** smysl.

```javascript
console.log(666 == "666"); // true - Ďáblovo dílo, nepoužívat 👿
console.log(666 === "666"); // false - Zde je svět v pořádku 🤗
```

>[!tip]- Menší než
> ![[less-than.png]]

| **název**        | operátor | **příklad**  | **výsledek** |
| ---------------- | -------- | ------------ | ------------ |
| Větší než        | `>`      | `15 > 14`    | `true`       |
| Větší než        | `>`      | `15 > 15`    | `false`      |
| Menší než        | `<`      | `101 < 102`  | `true`       |
| Větší nebo rovno | `>=`     | `200 >= 200` | `true`       |
| Menší nebo rovno | `<=`     | `500 <= 500` | `true`       |
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
Vždycky mezi sebou porovnávej jen proměnné se **stejným typem**.

Pokud na `string` chceš použít `>` a `<`, tak jedině za účelem **abecedního řazení**. Sice to umí porovnávat čísla, ale nedává to smysl. Je to jako porovnávat 🍎 a 🍐.