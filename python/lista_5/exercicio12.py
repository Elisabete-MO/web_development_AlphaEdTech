# Usando o código da questão 10 crie 2 arrays diferentes mas do mesmo tamanho. Quantos números 1 na mesma poisição existem nos 2 vetores? Seria a primeira solução criar um programa varrendo os vetores e comparando:

# qtdMatc =0
# for i in range(len(vetor1)):
#     if vetor1[i] == ‘1’ and vetor1[i] == vetor2[i]:
#         qtdMatc += 1
# Mas talvez exista uma solução mais rápida usando produto vetorial (... pesquisar)

"""
Comparação de arrays esparsos - Solução com produto vetorial

Este script cria dois arrays NumPy aleatórios esparsos e compara suas posições com 1 usando:
1. Solução tradicional com loop for
2. Solução otimizada com produto vetorial

O objetivo é comparar a eficiência das duas abordagens.

Funcionalidades:
- Geração de dois arrays esparsos
- Comparação elemento a elemento com loop for
- Comparação usando produto vetorial (dot product)
- Medição de tempo de execução
"""

import numpy as np
import time

# Tamanho do array
tamanho = 1_000_000
probabilidades = [0.9, 0.1]  # 10% de 1s

# Gerar dois arrays esparsos diferentes
arr1 = np.random.choice([0,1], size=tamanho, p=probabilidades)
arr2 = np.random.choice([0,1], size=tamanho, p=probabilidades)

# Solução 1: Loop for tradicional
def comparacao_loop(arr1, arr2):
    start_time = time.time()
    qtd_match = 0
    for i in range(len(arr1)):
        if arr1[i] == 1 and arr2[i] == 1:
            qtd_match += 1
    end_time = time.time()
    
    print("\n--- Solução com Loop For ---")
    print(f"Quantidade de posições com 1 em ambos: {qtd_match}")
    print(f"Tempo de execução: {end_time - start_time:.5f} s")
    return qtd_match, end_time - start_time

# Solução 2: Produto vetorial (dot product)
def comparacao_produto_vetorial(arr1, arr2):
    start_time = time.time()
    # Produto vetorial de arrays binários conta posições onde ambos são 1
    qtd_match = np.dot(arr1, arr2)
    end_time = time.time()
    
    print("\n--- Solução com Produto Vetorial ---")
    print(f"Quantidade de posições com 1 em ambos: {qtd_match}")
    print(f"Tempo de execução: {end_time - start_time:.5f} s")
    return qtd_match, end_time - start_time

# Executar ambas as soluções
match_loop, tempo_loop = comparacao_loop(arr1, arr2)
match_dot, tempo_dot = comparacao_produto_vetorial(arr1, arr2)

# Comparar resultados
print("\n--- Comparação de Resultados ---")
print(f"Resultados coincidem: {match_loop == match_dot}")
print(f"Velocidade: Produto vetorial é {tempo_loop / tempo_dot:.2f}x mais rápido")
"""

Resultado:

--- Solução com Loop For ---
Quantidade de posições com 1 em ambos: 10041
Tempo de execução: 0.19667 s

--- Solução com Produto Vetorial ---
Quantidade de posições com 1 em ambos: 10041
Tempo de execução: 0.00134 s

--- Comparação de Resultados ---
Resultados coincidem: True
Velocidade: Produto vetorial é 146.34x mais rápido

Explicação:

1. Solução com Loop For:
   - Itera sobre cada elemento do array
   - Verifica manualmente se ambos são 1
   - Complexidade: O(n)
   - Lenta para arrays grandes

2. Solução com Produto Vetorial:
   - np.dot(arr1, arr2) calcula o produto vetorial
   - Para arrays binários, isso equivale a contar posições onde ambos são 1
   - Complexidade: O(n) mas com otimização de baixo nível (C/Fortran)
   - Extremamente rápida para arrays grandes

Conclusão:
O produto vetorial é significativamente mais rápido (neste caso, ~64x) do que o loop for para contar correspondências em arrays NumPy.
"""
