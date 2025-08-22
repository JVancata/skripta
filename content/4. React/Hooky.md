Hookama **rozšiřuješ komponenty**, aby byly "chytřejší" a můžeš jim přidávat funkce navíc.

Základních hooků je jen pár, často ale budeš používat hooky z různých knihoven.

Dej si na hooky bacha. Jsou potřeba a užitečný, potřebuješ je, ale snaž se je používat **co nejmíň**. Používej je hlavně v container komponentách. Hooky se totiž blbě testujou a přináší side effecty.
# useState
Díky `useState` si komponenta může uchovávat **state** (stav) mezi rendery.

Když se změní **state**, komponenta se **přerenderuje**.

```jsx
import { useState } from 'react'

const Counter = () => {
	const [counter, setCounter] = useState(0);

	return <>
		<p>{counter}</p>
		<button onClick={() => setCounter(counter + 1)}>
			Přidat
		</button>
	</>
}
```

Děje se tu víc věcí:

```jsx
const [counter, setCounter] = useState(0);
```

1. `counter` je aktuální hodnota statu, **nesmíš** jí měnit napřímo
2. `setCounter` je funkce, kterou můžeš **nastavit novou hodnotu**
3. hodnota v závorkách `useState` je defaultní hodnota, na který state začíná
	- nikdy neměň typ, s jedním začni a s jedním skonči

> [!tip] Zápis proměnných v [ ]
> Působí to divně a nikdy to moc nepoužiješ, ale je to úplně jednoduchý.
> ```js
> const array = [1, 2, 3];
> const [jednicka, dvojka, trojka] = array;
> 
> console.log(jednicka);
> console.log(dvojka);
> console.log(trojka);
> ```
> 
> Přes tuhle syntaxi může vytáhnout prvky z pole a pojmenovat si je. 
> 
> `useState` vrací pole, aby sis mohl\*a přejmenovat názvy statu, jak potřebuješ.
> 
# useEffect
`useEffect` se spustí kdykoli, když se změní nějaká hodnota v jeho **dependency array**

```jsx
import { useEffect, useState } from 'react'

const Messenger = () => {
	const [message, setMessage] = useState("");

	useEffect(() => {
		// Spustí se kdykoli, když něco napíšeš
		console.log("Current message:", message);
	}, [message])

	return <input onChange={(e) => setMessage(e.target.value)} />
}
```

`useEffect` v tomhle příkladu má dvě části:
1. `() => {}`funkci, která se volá
2. `[message]` – dependency array – pole, kde když se něco změní, tak se funkce spustí
	- vždycky tam chceš mít všechny hodnoty, které uvnitř funkce používáš
	- když narazíš na případ, kdy tam nechceš všechny, tak něco asi děláš blbě

Dá se použít i na odchycení dvou akcí – když se tvoje komponenta mounte (poprvé se vykreslí) a když se umnounte (zmizí ze stránky)

```js
useEffect(() => {
	console.log("Komponenta se právě mountnula!");

	// Tohle se pustí jenom v případě, když se komponenta unmounte
	return () => {
		// Můžeš tady zavolat třeba clearInterval nebo clearTimer...
		console.log("Komponenta se odmountla!");
	}

// Dependency array je prázdný – pustí se jen při mountu
}, [])
```

# useRef
Do `useRef` si dáš nějakou hodnotu, kterou **nepotřebuješ pro renderování**, ale potřebuješ si jí uchovat.

```jsx
const Timer = () => {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  // Při mountu komponenty nastavíme časovač na 3 vteřiny
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMessage("Doběhl časovač! 🤩")
    }, 3_000)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [setMessage])

  if (!message) return <p>Čekeeeej...</p>

  return <p>{message}</p>
}
```

Hodnota se vždycky nastavuje a čte z `ref.current`

Ref má ještě druhý využití – reference na HTML elementy.

```jsx
export const App = () => {
  const inputRef = useRef(null);

  return <>
    <button onClick={() => { inputRef.current?.focus() }}>
      Focus input
    </button>
    <input ref={inputRef} />
  </>
}
```

Tohle ti umožní si z Reactu šáhnout do reálnýho HTML. Hlavně třeba na `focus` elementu.
# Rules of hooks
Musíš dodržovat [dvě pravidla](https://react.dev/reference/rules/rules-of-hooks)
## 1. Hooky se volají vždycky na vrchu komponenty
Nikdy nesmíš dát volání hooku za `if`. Každej jeden render musí mít **stejný počet volání hooků**. Nesmíš jednou zavolat dva a jednou tři.

Když potřebuješ dát hook za podmínku, zkus to spíš **rozsekat na víc komponent**, který vyrenderuješ/nevyrenderuješ na základě podmínky.

## 2. Hooky se volají jenom v komponentách a hookách
Nikdy nesmíš volat hook mimo React, to nefunguje. 

Když napíšeš nějakej chytrej hook, nesmíš ho použít v nějaký normální funkci.
# Custom hooky
Můžeš si psát i vlastní hooky, jak jen potřebuješ. Většinou je skládáš z nějakých základních hooků a něco k nim přidáváš.

Název hooku vždycky začíná slovíčkem `use`.