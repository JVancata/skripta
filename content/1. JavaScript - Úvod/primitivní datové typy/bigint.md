Do `bigint` můžeš uložit **libovolně velký číslo**[^1] a normálně s ním počítat bez toho, aby se Ti ztratila přesnost.

```javascript
// Když zapisuješ bigint, vždycky je za číslem písmeno n
const hugeNumber = 100_000_000_000_000_000_000_000_000_000_000_000_000n;
console.log(hugeNumber * hugeNumber);
console.log(hugeNumber ** hugeNumber);
```

K `bigintu` se můžeš chovat jako k číslu, fungují Ti tam prakticky všechny stejné operátory jako v [[number]].

[^1]: Samozřejmě to není tak úplně pravda. Musí se to vejít do paměti počítače. Můžeš si přečíst na [v8 blogu](https://v8.dev/blog/bigint), jak to funguje pod pokličkou.
