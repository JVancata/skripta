---
title: 4. React - Úvod - komponenty
---
React je JavaScriptový **frontendový framework**[^1], dneska je jeden z nejpoužívanějších[^2].

Je to vlastně "nadstavba" nad klasickým HTML + JS. Děláš v tom **celou logiku** toho, co **renderuješ** na stránce, jaký data se **načítají** a jak na sebe všechno **reaguje**. Když uživatel klikne na tlačítko nebo něco napíše do vstupu, tak na to **Re**act ihned **re**aguje.

Základem Reactu jsou **komponenty** a kolem těch se všechno točí. Komponenta je například nastylovaný tlačítko, vstup na text, nebo patička stránky. Komponenty do sebe můžeš různě **vkládat a zanořovat**.

```jsx
const Logo = () => {
	return <img src="company-logo.png" />;
}

const Header = () => {
	return <nav>
		<Logo />		
		<span>Hlavička stránky</span>
	</nav>;
}
```

Představ si to jako HTML – taky můžeš do jednoho DIVu strčit tlačítko a odstavec textu. Tím si vytvoříš například komponentu `<ButtonWithDescription />`, kterou dál používáš.

A co jsou vlastně komponenty? Jsou to jenom **funkce, co vrací HTML** (říká se tomu JSX). Vůbec nic jinýho na tom není.

Když se podíváš na hlavní stránku Googlu, tak tam vidíš **komponenty**:

![[google-search-screenshot.png]]

- `<Logo />`
- `<SearchBar />`
	- Ten obsahuje `<TextInput />` a `<Icon />` komponenty
- `<ButtonGroup />`
	- Ta obsahuje dvakrát `<Button />`
- `<LanguageSelect />`
	- Ten obsahuje `<Text />` a `<Link />`.
# Výhody
- Používá se to všude, easy najít si práci
- Neřešíš překreslování obsahu – změníš data a všechno se překreslí za Tebe
- Jsou to jenom funkce – je uživatel admin? Jednoduše mu vykreslíš speciální meníčko. Píšeš čistej kód.
- Můžeš psát i [mobilní appky](https://reactnative.dev/), ale je to dost jiný od webových appek.
# Instalace
Potřebuješ mít nainstalovaný aktuální node.js a příkazovou řádku.

Pak stačí [postupovat podle instrukcí](https://vite.dev/guide/#scaffolding-your-first-vite-project)

1. `cd projects` (nebo jakákoli jiná složka)
2. `npm create vite@latest`
3. Napiš název projektu, třeba `reflex-game` (podle toho se vytvoří složka)
   ![[vite-init-react-project-name.png]]
4. Vyber React
   ![[vite-init-react-project-react-framework.png]]
5. Jestli se na to cejtíš, vyber TypeScript. Jestli se necejtíš, tak vyber JavaScript a TS se potom naučíme.
   ![[vite-init-react-project-javascript.png]]
6. `cd reflex-game` (podle třetího kroku)
7. `npm install`
8. `npm run dev`
9. Hotovo, sample projekt ti běží a můžeš se na něj podívat v prohlížeči
   ![[vite-init-react-completed.png]]

Teď si můžeš otevřít celou složku ve VS Code a začít programovat 🥳
# Nevýhody
V Reactu se píšou hlavně **SPA** – single page applications[^3]. Celá aplikace se vykreslí a načítá data až potom, co se načte jeden hlavní .js soubor, kterej řídí logiku celý aplikace.

| **Normální web**                                                                               | **SPA**                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| klikneš na odkaz a ze serveru se načte celý nový dokument (HTML) a pak se Ti načte i JS a CSS. | klikneš na odkaz a v URL se něco změní, ale překreslení obsahu dělá klient – neposílají se žádný requesty kromě těch, který řídíš logikou aplikace. |

SPA mají daleko delší **první načtení** – musí se ti načíst HTML, pak až JS a pak až data, ze kterých reálně něco vykreslíš.

Potom to už ale frčí jak drak, nemusíš natahovat celý dlouhý HTML, ale jenom si natáhneš data z API.

Pro menší projekty to může být **docela overkill**. Není to tak jednoduchý, jako udělat index.html a index.js a mít hotovo. Musíš instalovat balíčky a aplikaci buildit. Navíc se v JS světě furt něco mění a musíš se furt učit znovu a znovu, jak se věci dělaj.

React není **kompletní framework**, kde je **jeden způsob**, jak všechno dělat. Na každou věc je spoustu různých knihoven, takže žádný projekt není vlastně stejný.
# Komponenty
Jsou to jenom funkce, co vrací **JSX**. Nic jinýho. Vrácený JSX se **vyrenderuje** na stránce.

```jsx
const person = {
	name: "Jack Sparrow",
	isPirate: true,
}

const Greeting = () => {
	const {isPirate, name} = person;
	
	if (isPirate) {
		return <p>🏴‍☠️ Vítej, {name}! 🏴‍☠️</p>;
	}
	
	return <p>Vítej, {name}</p>;
}
```

Tohle není správně naprogramované, protože 
- data čteme z proměnné "okolo"
- mícháme logiku a render (děláme z toho špagetu)
- jedna komponenta implementuje dvě různá vykreslení
	- když budeme chtít vyměnit emoji, musíme hrábnout do celé komponenty

> [!tip] Design pattern - container and pure components
> Správně máme **dva druhy** komponent – jedny úplně hloupé (**pure**) a druhé chytré (**containery**).
>
> **Hloupé komponenty** přebírají data z **props** a vykreslují je. Nedělají žádnou logiku.
>
> **Chytré komponenty** načítají data, řeší podmínky, routování, ukládání dat, vstupy uživatele...

Tady na příkladu je to trochu **overkill**, naší jednoduchou "appku" jsme rozsekali do tří komponent. Ale když to nebudeš dělat, přeroste ti to přes hlavu a budeš psát **spaghetti code**. Na druhou stranu, **všeho moc škodí**. Na ten správný poměr rozsekávání přijdeš až s praxí, tak se toho neboj 😊

```jsx
// Úplně hloupá komponenta, jenom něco vykresluje (presentational)
const Greeting = ({ name }) => {
	return <p>Vítej, {name}</p>;
}

// Úplně hloupá komponenta, jenom něco vykresluje (presentational)
const PirateGreeting = ({ name }) => {
	return <p>🏴‍☠️ Ahoj, {name}! 🏴‍☠️</p>;
}

// Chytrá komponenta, načítá data a rozhoduje se, co dělat (container)
const GreetingContainer => {
	// Tyhle data jsme mohli třeba načíst z API, nebo z LocalStorage, nebo z ...
	// Všechnu tuhle načítací logiku řeší container komponenta
	const person = {
		name: "Davy Jones",
		isPirate: true,
	}

	if (person.isPirate) {
		return <PirateGreeting name={person.name} />
	}

	return <Greeting name={person.name} />
}
```

# Vyzkoušej si
- [ ] Navrhni a naprogramuj komponenty pro chatovací aplikaci

[^1]: Najdeš informaci, že to je knihovna. Sice je to rozdíl, ale jde jenom o slovíčkaření.

[^2]: Source: I made it up

[^3]: S nějakým frameworkem můžeš klidně dělat **server side rendering**.
