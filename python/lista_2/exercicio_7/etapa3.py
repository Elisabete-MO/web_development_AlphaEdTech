import statistics

valores = []
with open("dados_corrigidos.txt") as f:
    for linha in f:
        valores.append(int(linha.strip()))

# Média: soma/quantidade (valor central)
media = statistics.mean(valores)

# Mediana: valor central ordenado
mediana = statistics.median(valores)

# Máximo: maior valor
maximo = max(valores)

# Mínimo: menor valor
minimo = min(valores)

# Amplitude: diferença entre max e min
amplitude = maximo - minimo

# Variância: dispersão dos dados
variancia = statistics.variance(valores)

# Desvio padrão: raiz da variância
desvio = statistics.stdev(valores)

print("\n Média (soma/quantidade): ", media)
print("\n Mediana (valor central ordenado): ", mediana)
print("\n Máximo (maior valor): ", maximo)
print("\n Mínimo (menor valor): ", minimo)
print("\n Amplitude (diferença entre max e min): ", amplitude)
print("\n Desvio padrão (em média, o quanto os valores se afastam do valor central): ", desvio)
print("\n Variância (quanto os valores estão espalhados ou próximos entre si): ", variancia)
print("\n Primeiros 5: ", valores[:5])
print("\n Últimos 5: ", valores[-5:])
