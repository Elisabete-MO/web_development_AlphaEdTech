# Compare o tempo de execução de diferentes métodos para calcular a soma dos elementos de um array grande.

"""
Comparação de Tempo de Execução de Diferentes Métodos de Soma

Este script gera um array grande de números aleatórios e compara o tempo de execução
de diferentes métodos para calcular a soma dos elementos:

Métodos incluídos:
1. soma_for(array)   - soma usando um loop `for` em Python puro
2. soma_sum(array)   - soma usando a função built-in `sum()`
3. soma_numpy(array) - soma usando a função `np.sum()` do NumPy

O objetivo é demonstrar a diferença de desempenho entre métodos de Python puro
e métodos otimizados do NumPy, especialmente para arrays grandes.

Requisitos:
- Python 3.x
- Biblioteca NumPy (`pip install numpy`)

Exemplo de uso:
    python comparacao_soma.py

Resultado:
    Tempo usando for: 0.37227964401245117 segundos
    Tempo usando sum(): 0.057970285415649414 segundos
    Tempo usando NumPy: 0.005479097366333008 segundos

Conclusão:
    O método do NumPy é significativamente mais rápido do que os métodos de Python puro.
    
    for → geralmente é mais lento, porque cada iteração é feita no Python puro.
    sum() → é mais rápido que for, ainda em Python puro.
    np.sum() → é muito rápido, pois o NumPy é otimizado em C.
"""


import random
import numpy as np

# Array grande com 10 milhões de elementos
array_py = [random.randint(1, 100) for _ in range(10_000_000)]
array_np = np.array(array_py)

# Métodos de soma
# Método 1: for
def soma_for(array):
    total = 0
    for x in array:
        total += x
    return total

# Método 2: sum()
def soma_sum(array):
    return sum(array)

# Método 3: NumPy
def soma_numpy(array):
    return np.sum(array)

# Medindo o tempo de execução
import time

# Método 1: for
start = time.time()
soma_for(array_py)
end = time.time()
print("Tempo usando for:", end - start, "segundos")

# Método 2: sum()
start = time.time()
soma_sum(array_py)
end = time.time()
print("Tempo usando sum():", end - start, "segundos")

# Método 3: NumPy
start = time.time()
soma_numpy(array_np)
end = time.time()
print("Tempo usando NumPy:", end - start, "segundos")
