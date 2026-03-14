Local storage je jeden ze způsobů[^1] jak v prohlížeči **uchovat data**, i když zavřeš záložku.

V prohlížeči najdeš všechno uložený v developer toolech v záložce "Application".

![[devtools-localstorage.png]]

> [!WARNING] Hodnoty jsou vždycky `string`
> Ať už ukládáš, nebo načítáš data, musíš je vždycky převést na/ze `string`, i když se to tváří v devtoolech jinak.
# setItem() - ukládání dat
[Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

Na nějakej **klíč** ukládáš **hodnotu** (`string`). 

Když chceš uložit objekt, musíš ho nejdřív převést na `string`.

```javascript
localStorage.setItem("key", "value");

localStorage.setItem("user", JSON.stringify({
    username: "Jakub",
    password: "asd"
}));
```

Klidně si tam ulož i `array`, ale stejně ho musíš převést na `string`.
# getItem() - načítání dat
[Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)

Dej si bacha. `getItem` vrací data jako `string`, ale když tam ten klíč není, vrací `null`. Musíš si na to udělat `if`.

Když sis tam předtím uložil\*a `array` nebo `object`, musíš si ho ze `string`u převést.

```javascript
localStorage.setItem("user", JSON.stringify({
    username: "Jakub",
    password: "asd"
}));

const user = localStorage.getItem("user");
console.log(typeof user); // string
console.log(JSON.parse(user)); // {username: 'Jakub', password: 'asd'}
```
# removeItem() - smazání jednoho klíče
[Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem)

```javascript
localStorage.setItem("key", "value");
console.log(localStorage.getItem("key")); // value

localStorage.removeItem("key");
console.log(localStorage.getItem("key")); // null
```
# clear() - smazání všech klíčů
[Dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear)

```javascript
localStorage.setItem("key", "value");
localStorage.setItem("key2", "value2");

localStorage.clear();

console.log(localStorage.getItem("key")); // null
console.log(localStorage.getItem("key2")); // null
```

[^1]: Můžeš data ukládat i do [cookies](https://developer.mozilla.org/en-US/docs/Web/API/Window/cookieStore), [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) nebo [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
