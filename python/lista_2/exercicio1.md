## 📌 Correspondência com a matemática

Em matemática temos:
```
A ⊆ B
```

Lê-se:

> A está contido em B
> ou
> A é subconjunto de B

Isso significa:

👉 Todo elemento de A está em B
👉 A pode ser igual a B

---
## ✅ Em Python
```
A <= B
```

Significa:

> A é subconjunto de B (A ⊆ B)

Ou seja, é o **⊆ matemático**.

----
## 📌 Subconjunto próprio (estritamente contido)

Na matemática:
```
A ⊂ B
```

Significa:

* A está contido em B
* A é diferente de B

Em Python isso é:
```
A < B
```

Isso verifica subconjunto **próprio**.

---
## 📌 Superset (o “contém”)

Matemática:

```
B ⊇ A
```

B contém A.

Python:

```
B >= A
```

### 🎯 Resumo rápido

| Matemática | Python | Significado                 |
| ---------- | ------ | --------------------------- |
| A ⊆ B      | `A <= B` | A está contido em B         |
| A ⊂ B      | `A < B`  | A está estritamente contido |
| B ⊇ A      | `B >= A` | B contém A                  |
| B ⊃ A      | `B > A`  | B contém estritamente       |