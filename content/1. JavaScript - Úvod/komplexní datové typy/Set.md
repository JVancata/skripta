[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) (česky **množina**) je vlastně `array` bez pořadí a opakování prvků.

V **množině**:
1. Každý prvek může být **jenom jednou**
2. Prvky nemají pořadí

```javascript playground
const grades = [
	{ student: "Božena Němcová", grade: 1 },
	{ student: "František Palacký", grade: 2 },
	{ student: "Sigmund Freud", grade: 2.5 },
	{ student: "František Palacký", grade: 1 },
	{ student: "František Palacký", grade: 3 },
	{ student: "Božena Němcová", grade: 5 },
	{ student: "Božena Němcová", grade: 1 },
];

const studentNames = grades.map((grade) => grade.student);
console.log(studentNames);

const studentsSet = new Set(studentNames);
console.log(studentsSet);

// Existuje prvek v množině?
console.log(studentsSet.has("Božena Němcová"));
console.log(studentsSet.has("Karel IV."));

// Přidání prvku
studentsSet.add("Karel IV.");
console.log(studentsSet.has("Karel IV."));
```

Nejčastěji se ti množina hodí, když Tě zajímají jenom **unikátní prvky** – třeba jména všech studentů, co mají známku.

Můžeš na nich provádět [množinové operace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#set_composition).