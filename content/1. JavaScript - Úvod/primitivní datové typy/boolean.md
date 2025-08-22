Tato kapitola je **binární**, buď `true` nebo `false`. Nic mezitím, buď jedno nebo druhé.

Všechny **podmínky** `if` se **vyhodnocují**, jako booleany.

```javascript
// ✅ Výraz je true
if (true) {
	// ✅ Něco se stane
}

// ❌ Výraz je false
if (false) {
	// ❌ Tohle neproběhne
}
else {
	// ✅ Ale tohle proběhne, protože podmínka nebyla splněná
}
```

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
// Výstup: false
// Vždycky používej > a < jenom pro abecední řazení, nikdy porovnání čísel.
console.log(string3 > string2);
// Výstup: true
```
Vždycky mezi sebou porovnávej jen proměnné se **stejným typem**.

Pokud na `string` chceš použít `>` a `<`, tak jedině za účelem **abecedního řazení**. Sice to umí porovnávat čísla, ale nedává to smysl. Je to jako porovnávat 🍎 a 🍐.

# "Jakoby pravda" - truthy a falsy hodnoty
Ne vždycky se nám povede mít všechno `true` a `false`, v JavaScriptu jsou hodnoty, které jsou "jakoby pravda" a  "jakoby nepravda". Říkáme jim **truthy** a **falsy**[^4].

Zní to zmateně, ale není to vůbec složitý, neboj 😊

Máme například `string` s názvem školy (**má obsah**). Když ho dáme jako výraz do podmínky, tak se **provede**.

Ale pokud je `string` **prázdný**, podmínka se **neprovede**.

```javascript
let schoolName = "Střední škola přírodovědecká - katedra mravenců 🐜";

if (schoolName) {
	console.log(`Název školy 🎓 je: ${schoolName}`);
}
// Výstup: Název školy 🎓 je: Střední škola přírodovědecká - katedra mravenců 🐜

schoolName = "";

if (schoolName) {
	// Tenhle kód se nespustí
	console.log(`Název školy 🎓 je: ${schoolName}`);
	
}
else {
	console.log("Škola 🎓 nemá žádný název");	
}
// Výstup: Škola 🎓 nemá žádný název
```

To stejné platí i u **dalších hodnot** v tabulce dole, ale hlavně tě to zajímá ještě u **čísel**.

```javascript
let beanCounter = 13; // Počet fazolí 🫘

if (beanCounter) {
	console.log(`Máš ${beanCounter} 🫘`);
}
// Výstup: Máš 13 🫘

beanCounter = 0;

if (beanCounter) {
	// Tenhle kód se nespustí
	console.log(`Máš ${beanCounter} 🫘`);
}
else {
	console.log("Nemáš žádné 🫘");
}
// Výstup: Nemáš žádné 🫘
```

## ❌ Falsy hodnoty - převedou se na `false`
V JavaScriptu **jsou všechny hodnoty truthy** až na ty, které jsou v této tabulce:

| Hodnota        | `typeof`    | převedená hodnota |
| -------------- | ----------- | ----------------- |
| `null`         | `object`    | ❌ `false`         |
| `undefined`    | `undefined` | ❌ `false`         |
| `""`           | `string`    | ❌ `false`         |
| `NaN`          | `number`    | ❌ `false`         |
| `0`, `-0`      | `number`    | ❌ `false`         |
| `0n`           | `BigInt`    | ❌ `false`         |
| `false`        | `boolean`   | ❌ `false`         |
| `document.all` | `object`    | ❌ `false`         |

## ✅ Truthy hodnoty - převedou se na `true`
Naopak následující hodnoty fungují jako `true`.

| Hodnota                   | `typeof` | převedená hodnota |
| ------------------------- | -------- | ----------------- |
| `"asdf"`                  | `string` | ✅ `true`          |
| `-11`, `1337`, `Infinity` | `number` | ✅ `true`          |
| `[]`, `[1, 2, 3]`         | `object` | ✅ `true`          |
| `{}`, `{name: "Vašek"}`   | `object` | ✅ `true`          |
| `new Date()`              | `object` | ✅ `true`          |

# NOT - !
Občas potřebujeme **převrátit** `false` na `true` a naopak. Z nepravdy udělat pravdu. **Znegovat**.

> [!tip]- `!true`
> 
> ![[demagog.png]]

| X         | Výsledek ! | Výsledek !! |
| --------- | ---------- | ----------- |
| ✅ `true`  | ❌ `false`  | ✅ `true`    |
| ❌ `false` | ✅ `true`   | ❌ `false`   |

```javascript
const isOnSale = true;

console.log(!isOnSale);
// Výstup: false
console.log(isOnSale);
// Výstup: true
```

Negace má ještě jedno využití - převést **truthy** hodnotu na `true` a **falsy** hodnotu na `false`. Z "**jakoby pravdy**" udělat **pravdu**.

V tabulce nahoře jsme si ukázali hodnoty co jsou "jakoby pravda" a "jakoby nepravda". Když je chceme **převést na tvrdý `boolean`**, použijeme dva vykřičníky `!!`.

```javascript
const greetingText = "Čus bus autobus 🚌";
const hasGreeting = !!greetingText;

console.log(hasGreeting);
// Výstup: true

const emptyText = "";
const hasText = !!emptyText;

console.log(hasText);
// Výstup: false
```
# AND - &&
Když potřebuješ vyjádřit, že dvě věci jsou **najednou pravda**, použiješ logickou spojku **AND**.
Pokud je byť jen jedna z nich nepravda, tak je celý výraz nepravda.

| X         | Y         | Výsledek && |
| --------- | --------- | ----------- |
| ✅ `true`  | ✅ `true`  | ✅ `true`    |
| ❌ `false` | ❌ `false` | ❌ `false`   |
| ✅ `true`  | ❌ `false` | ❌ `false`   |
| ❌ `false` | ✅ `true`  | ❌ `false`   |

AND se čte jako "**a zároveň**". [^1]

Následující kód přečteš takto: "Pokud je výška větší nebo rovna 180 centimetrům a zároveň je věk větší nebo roven 18, můžeš na horskou dráhu."

```javascript
const heightCentimeters = 180;
const age = 18;

// Musíš splnit obě podmínky najednou
const isAllowedOnRollercoaster = heightCentimeters >= 180 && age >= 18;

if (isAllowedOnRollercoaster) {
	console.log("✅ Můžeš na tuhle horskou dráhu 🎢");
}
else {
	console.log("❌ Na tuhle horskou dráhu nesmíš 😭");
}
// Výstup: ✅ Můžeš na tuhle horskou dráhu 🎢
```

# OR - ||
Stačí, aby **jedna z hodnot** byla pravda a celý výraz je pravda.

| X         | Y         | Výsledek \|\| |
| --------- | --------- | ------------- |
| ✅ `true`  | ✅ `true`  | ✅ `true`      |
| ❌ `false` | ❌ `false` | ❌ `false`     |
| ✅ `true`  | ❌ `false` | ✅ `true`      |
| ❌ `false` | ✅ `true`  | ✅ `true`      |

OR se čte jako "**nebo**". [^2]

`||` se na české klávesnici píše pomocí AltGr + W.

```javascript
const isThirsty = true;
const isHungry = false;

// Jakmile splníš alespoň jednu podmínku, půjdeš si pro něco do ledničky
const shouldVisitFridge = isThirsty || isHungry;

if (shouldVisitFridge) {
	console.log("Něco potřebuješ zkonzumovat, dojdi si do ledničky");
}
else {
	console.log("Nikam nechoď, nic ti nechybí");
}
// Výstup: Něco potřebuješ zkonzumovat, dojdi si do ledničky
```


[^1]: Až budeš na FITu studovat matematickou logiku, tak tomu pan doktor Starý říkat "konjunkce". Tak se toho nelekni 😊 Je to prostě AND. Můžeš se třeba přivzdělat v jeho [skriptech](https://courses.fit.cvut.cz/BI-ALO/matematicka-logika.pdf)

[^2]: V matematické logice OR nazýváme **disjunkce**.

[^3]: Co mi to připomíná? :-)

[^4]: [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) a [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) hodnoty na MDN.
