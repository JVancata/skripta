[Document object model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) je vlastně celá webová stránka ve formě jednoho **velkýho objektu** v JavaScriptu.

```javascript
// Pusť to kdekoli v konzoli v prohlížeči
console.log(document);
```

Přes DOM můžeš **číst a manipulovat**, co se na stránce vykresluje pomocí HTML.
# querySelector
[Query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) umí na stránce **hledat elementy**, který si můžeš uložit do proměnný.

```html
<!-- index.html -->
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Default nadpis</h1>
</body>
<script src="./index.js"></script>
</html>
```

```javascript
// index.js
const heading = document.querySelector("h1");

heading.textContent = "Tohle je upravený text 🤩";
heading.style = "color: rebeccapurple;"
```

`querySelector` Ti otvírá nekonečně možností, jak šahat do webovek a upravovat je.

Vrací buď **první nalezený** `Element`, nebo `null`.

`querySelector` používá stejnou syntaxi, jako [CSS pravidla](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors). Pár základních je:

| **Typ hledání**     | **Ukázka**                              |
| ------------------- | --------------------------------------- |
| Podle typu elementu | `document.querySelector("button")`      |
| Podle classy        | `document.querySelector(".bold")`       |
| Podle ID            | `document.querySelector("#main-title")` |
Můžeš je na sebe libovolně **řetězit**.
# document.querySelectorAll
Místo prvního Elementu Ti [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) vrátí všechny výsledky.

Pozor, nevrací `array`, ale vrací [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) (nebo `null`).

Buď si ho musíš na `array` převést přes `Array.from(nodeList)`, nebo se smířit s pár omezeníma (nechová se to úplně jako array.

```html
<!-- index.html -->
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Hlavní nadpis</h1>
    <p>Odstavec textu 🐸</p>
    <p>Odstavec textu 🐔</p>
    <p>Odstavec textu 🐷</p>
</body>
<script src="./index.js"></script>
</html>
```

```js
// index.js
const paragraphs = document.querySelectorAll("p");

// Musíš zkontrolovat, jestli ti nevrátil null
if (paragraphs) {
    paragraphs.forEach((paragraph) => {
        paragraph.style = "color: cornflowerblue; font-weight: bold;"
    })
}
```



Přidat prvky, měnit prvky, ovládat prvky přes javascript

Eventy - eventListener a onClick, onMouseMove

[[13. Historie objednávek]]