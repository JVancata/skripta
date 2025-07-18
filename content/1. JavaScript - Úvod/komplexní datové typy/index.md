---
title: Komplexní datové typy
---
# Komplexní datové typy
V JavaScriptu jsou všechny komplexní datové typy pod pokličkou `object`.

```javascript
console.log(typeof [1, 2, 3]);
console.log(typeof new Set());
console.log(typeof new Date());
```

| Typ      | Vysvětlení                                                      | Příklady                                        |
| -------- | --------------------------------------------------------------- | ----------------------------------------------- |
| `object` | [[object#Objekty - `object`\|libovolná datová struktura]]       | `{title: "FE!N", isBanger: true}`               |
| `array`  | [[array\|více hodnot s určitým pořadím (**pole**)]]             | `[1, 2, 13, 1337, 69, 420]`                     |
| `Date`   | [[Date\|datum a čas]]                                           | `new Date()`, `new Date("2025-01-01 04:20:00")` |
| `Set`    | [[Set\|množina - array, ale bez pořadí a prvky jsou unikátní ]] | `new Set([1, 2, 3, 4])`                         |
