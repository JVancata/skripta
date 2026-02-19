Nikdy neukládej klíče a hesla přímo do kódu, to je bezpečnostní riziko.

Konvence je, že je uložíš do souboru `.env`, kterej nemáš v GITu, ale máš ho někde mimo.

```
# .env
API_KEY="secret-key-stored-in-dot-env"
```

Potom můžeš svojí aplikaci spustit s flagem `--env-file` a node ho načte.

`node --env-file=.env main.ts`

```typescript
// main.ts
console.log(process.env.API_KEY);
// Output: secret-key-stored-in-dot-env
```

