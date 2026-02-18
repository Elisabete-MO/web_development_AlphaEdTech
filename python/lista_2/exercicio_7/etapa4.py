valores = []
with open("dados_corrigidos.txt") as f:
    for linha in f:
        valores.append(int(linha.strip()))

# cálculo manual da média
soma = 0
for v in valores:
    soma += v
media = soma / len(valores)

# variância manual
soma_quad = 0
for v in valores:
    soma_quad += (v - media) ** 2

variancia = soma_quad / (len(valores) - 1)

# desvio padrão manual
desvio = variancia ** 0.5

# limites de outliers
limite_sup = media + 2 * desvio
limite_inf = media - 2 * desvio

# remove outliers
sem_outliers = []
for v in valores:
    if limite_inf <= v <= limite_sup:
        sem_outliers.append(v)

print("Sem outliers:", sem_outliers)

# salva
with open("dados_sem_outliers.txt", "w") as f:
    for v in sem_outliers:
        f.write(f"{v}\n")
