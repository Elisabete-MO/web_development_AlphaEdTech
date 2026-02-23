# Crie um teste com muitos valores em um numpy array de inteiros, mas ele deve ter apenas valores 0 ou 1. O array gerado deve ser aleatório mas deve ser “esparço”, ou seja, ter muitos mais zeros do que valores 1 (apenas uns 10 % de valores 1). Faça uma contagem de quantos valores não nulos foram gerados e imprima.

"""
Teste de array esparso com valores 0 e 1

Este script cria um array NumPy aleatório com muitos zeros e poucos uns (10% de uns),
ou seja, um array esparso. Após a geração, o código conta quantos valores não nulos
(ou seja, quantos 1s) foram gerados e imprime o resultado.

Funcionalidades:
- Geração de array aleatório com distribuição esparsa
- Contagem de valores não nulos
- Impressão de resultados

- np.random.choice([0,1], size=tamanho, p=[0.9,0.1]) → gera um array aleatório de 0 e 1, com 10% de chance de ser 1.
- np.count_nonzero(arr) → conta quantos elementos são diferentes de zero (ou seja, os uns).
- Mostramos tamanho, quantidade de uns e percentual para conferir que o array é realmente esparso.

Resultado:
Tamanho do array: 1000000
Quantidade de 1s gerados: 99768
Percentual de 1s: 9.98%

"""

import numpy as np

# Tamanho do array (ex: 1 milhão de elementos)
tamanho = 1_000_000

# Probabilidade de 1 = 10%, de 0 = 90%
probabilidades = [0.9, 0.1]

# Gerar array aleatório esparso
arr = np.random.choice([0, 1], size=tamanho, p=probabilidades)

# Contar valores não nulos (uns)
num_uns = np.count_nonzero(arr)

# Imprimir resultado
print(f"Tamanho do array: {tamanho}")
print(f"Quantidade de 1s gerados: {num_uns}")
print(f"Percentual de 1s: {num_uns / tamanho * 100:.2f}%")