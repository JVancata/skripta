
> [!quote] 
> What you learn after dealing with timezones, is what you do is you put away your code, you don't try to write anything dealing with this. You look at the people who have been there before you and you go to them and you thank them very much for making it open source.
> 
> \- Tom Scott

![Tom Scott - Timezones](https://www.youtube.com/watch?v=-5wpm-gesOY)

[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) v JavaScriptu není nic jiného, než počet milisekund od [Unixové Epochy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date) (1. 1. 1970).

```javascript playground
// Právě teď
const now = new Date();
console.log(now);
```
# Bordel
Přestupné dny, přestupné sekundy, jiný kalendáře, jiný časové pásma...

Na tohle všechno je potřeba myslet, když pracuješ s časem. Když v práci dostaneš zadání, že máš k datu přičíst "dva měsíce", pořádně si se šéfovou **vyjasni**, co tím vlastně myslí...[^2]

A ideálně si na všechen kód napiš **unit testy**.

# Dva různé typy datumů
Jeden typ je pro **počítače**, druhý typ je pro **uživatele**. Nemíchej je mezi sebou.

Když posíláš data na API, ukládáš timestampy nebo mezi daty něco počítáš, tak použij **standardizovaný formát** -  UNIX Timestamp (`1753791226321`) nebo [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) (`2025-07-29T12:11:55.833Z`).

```javascript playground
const now = new Date();

// Tohle klidně pošli na API, ale blbě se to čte
console.log("Unix time", now.valueOf());

// Tohle je ideální
console.log("ISO time", now.toISOString());
```

Když zobrazuješ datum uživateli, vypiš mu ho podle jeho **nastavení systému**[^1].

```javascript playground
const now = new Date();

console.log("Čas dle prohlížeče: ", now.toLocaleString());
console.log("Korejský čas: ", now.toLocaleString("ko-KR"));

console.log("Lokálně je hodin: ", now.getHours());
```
# Parsování datumů
Nikdy neparsuj nic, co není **standardizovaný formát**. Je to [hroznej bordel](https://jsdate.wtf/).

ISO string formát je vždycky UTC - [koordinovaný světový čas](https://cs.wikipedia.org/wiki/Koordinovan%C3%BD_sv%C4%9Btov%C3%BD_%C4%8Das). To znamená to "Z" na konci.

```javascript playground
// Večeře v Praze ve 20:00
const stedrovecerniVecere2025 = new Date("2005-12-24T19:00:00Z");
console.log(stedrovecerniVecere2025.toLocaleString("cs-CZ"));

// Vydání The Elders Scrolls: Skyrim o půlnoci 11. 11. 2011 UTC
console.log(new Date(1320969600000).toLocaleString("cs-CZ"));
```
# Temporal

Temporal bude nástupce `Date` v JavaScriptu, ale zatím nemá podporu v prohlížečích a netuším, jak funguje :-)

[^1]: Takhle by se to mělo dělat. Když si v prohlížeči nastavím korejský locale, tak by ho měly všechny weby respektovat. V praxi se Ti ale dost možná stane, že celý český korporát má nastavené prohlížeče na angličtinu, ale chtěli by datumy vypisovat podle českého formátu...

[^2]: Znamená to přičíst 60 dní? A co měsíce, co jsou kratší a co jsou delší? Co je výsledek pro 31. prosinec? Je to 29. únor? A co je výsledek pro 29. únor?
