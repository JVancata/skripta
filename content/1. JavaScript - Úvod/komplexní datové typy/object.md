# Objekty - `object`

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
// Výstup: "FE!N (feat. Playboi Carti)"
console.log(song.author)
// Výstup: "Travis Scott"
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
// Výstup: "value"
console.log(indentifier["key1"])
// Výstup: "value1"
console.log(indentifier.key33)
// Výstup: undefined
```

Pozor! Syntaxe JavaScript objektu a JSONu **není stejná**, v detailech se liší!
## Objekty se nerovnají
Tohle je trochu techničtější, ale v [[Pass by value]] je vysvětleno, že hodnota `object` je jenom **pointer na paměť**.

V praxi to znamená toto:
```javascript
const product1 = { id: 1, name: "Káva" };
const product2 = { id: 1, name: "Káva" };

console.log(product1 === product2);
// Výstup: false
```

I když jsou objekty stejný, tak pro JavaScript nejsou. JavaScript u objektu kontroluje, jestli míří na stejné místo v paměti a to se tady neděje.

Když chceš mezi sebou porovnávat objekty, musíš to nějak vymyslet. Třeba je porovnávat na základě jednoho stejného klíče (např. id). Nebo porovnat všechny klíče.
## Spread syntaxe
TODO: `{ ...object }`