# leitura
valores = []
with open("dados.txt") as f:
    for linha in f:
        valores.append(int(linha.strip()))

# filtra válidos (>0)
validos = []
for v in valores:
    if v > 0:
        validos.append(v)

# média manual
soma = 0
for v in validos:
    soma += v
media = soma / len(validos)

# substitui inválidos pela média
corrigidos = []
for v in valores:
    if v <= 0:
        corrigidos.append(int(media))
    else:
        corrigidos.append(v)

# min e max manuais
minimo = validos[0]
maximo = validos[0]

for v in validos:
    if v < minimo:
        minimo = v
    if v > maximo:
        maximo = v

print("\n Média:", media)
print("\n Máximo:", maximo)
print("\n Mínimo:", minimo)
print("\n Primeiros 5:", corrigidos[:5])
print("\n Últimos 5:", corrigidos[-5:])

# salva novo arquivo
with open("dados_corrigidos.txt", "w") as f:
    for v in corrigidos:
        f.write(f"{v}\n")
