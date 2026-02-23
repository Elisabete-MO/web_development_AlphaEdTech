# Faça testes com um array muito extenso (tentar milhares de valores aleatórios), usando numpy, com funções estatísticas simples, como média, mediana e desvio padrão.

"""
Benchmark de cálculo de estatísticas em arrays grandes usando diferentes métodos

Este script realiza testes de performance e cálculo de medidas estatísticas básicas
(média, mediana e desvio padrão) em um array grande (milhares ou milhões de valores).

Funcionalidades:
- Gera array aleatório grande usando NumPy.
- Calcula média, mediana e desvio padrão usando:
    1. Loop for puro (Python)
    2. Funções built-in do Python (sum()/len())
    3. Funções do NumPy (np.mean, np.median, np.std)
- Mede o tempo de execução de cada método para comparação de performance.
- Imprime resultados e tempos de execução.

=== Teste de estatísticas em array grande (1 milhão de valores) ===

For loop → Média: 499.48, Mediana: 499.00, Desvio Padrão: 288.70, Tempo: 1.16991 s
Built-in → Média: 499.48, Mediana: 499.00, Desvio Padrão: 288.70, Tempo: 1.14079 s
NumPy → Média: 499.48, Mediana: 499.00, Desvio Padrão: 288.70, Tempo: 0.02418 s

Justificativa
1. For loop (Python puro)

- Cada operação acontece linha a linha em Python.
- Python é interpretado e não é otimizado para loops pesados em grandes arrays.
- Há overhead de interpretação: cada linha, cada operação, cada chamada de função adiciona tempo extra.

2. Funções built-in (sum()/sorted())

- Mais rápidas que o for porque sum() e sorted() são implementadas em C internamente, mas ainda precisam iterar sobre cada elemento.
- O ganho de performance vem do fato de que o loop está "embaixo do capô" em código compilado, não interpretado linha a linha.

3. NumPy (np.mean, np.median, np.std)

- Extremamente rápido porque toda a operação é vetorizada em C.
- Em vez de percorrer elemento por elemento em Python, NumPy manipula blocos inteiros de memória contínua usando código compilado.
- Por isso, mesmo com 1 milhão de valores, o cálculo leva apenas 0.024 s.

"""

import numpy as np
import time

def gerar_array(tamanho=1_000_000, seed=42):
    """
    Gera um array grande de inteiros aleatórios entre 0 e 999 usando NumPy.
    
    Parâmetros:
        tamanho (int): quantidade de elementos no array.
        seed (int): semente para reproducibilidade dos valores aleatórios.
        
    Retorna:
        np.ndarray: array de inteiros aleatórios.
    """
    np.random.seed(seed)
    return np.random.randint(0, 1000, size=tamanho)

def estatisticas_for(array):
    """
    Calcula média, mediana e desvio padrão usando loop for puro (Python).
    
    Parâmetros:
        array (list ou np.ndarray): array de números.
        
    Retorna:
        tuple: média, mediana, desvio padrão
    """
    inicio = time.time()
    
    # Média
    soma = 0
    for val in array:
        soma += val
    media = soma / len(array)
    
    # Mediana
    array_sorted = sorted(array)
    n = len(array_sorted)
    if n % 2 == 0:
        mediana = (array_sorted[n//2 - 1] + array_sorted[n//2]) / 2
    else:
        mediana = array_sorted[n//2]
    
    # Desvio padrão
    soma_quad = 0
    for val in array:
        soma_quad += (val - media)**2
    desvio = (soma_quad / len(array))**0.5
    
    fim = time.time()
    tempo = fim - inicio
    return media, mediana, desvio, tempo

def estatisticas_builtin(array):
    """
    Calcula média, mediana e desvio padrão usando funções built-in do Python.
    
    Parâmetros:
        array (list ou np.ndarray): array de números.
        
    Retorna:
        tuple: média, mediana, desvio padrão e tempo de execução
    """
    inicio = time.time()
    
    media = sum(array)/len(array)
    array_sorted = sorted(array)
    n = len(array_sorted)
    if n % 2 == 0:
        mediana = (array_sorted[n//2 -1] + array_sorted[n//2])/2
    else:
        mediana = array_sorted[n//2]
    media_quad = sum((x - media)**2 for x in array)
    desvio = (media_quad / len(array))**0.5
    
    fim = time.time()
    tempo = fim - inicio
    return media, mediana, desvio, tempo

def estatisticas_numpy(array):
    """
    Calcula média, mediana e desvio padrão usando funções do NumPy.
    
    Parâmetros:
        array (np.ndarray): array de números.
        
    Retorna:
        tuple: média, mediana, desvio padrão e tempo de execução
    """
    inicio = time.time()
    media = np.mean(array)
    mediana = np.median(array)
    desvio = np.std(array)
    fim = time.time()
    tempo = fim - inicio
    return media, mediana, desvio, tempo

if __name__ == "__main__":
    # Gerar array grande
    array_grande = gerar_array(tamanho=1_000_000)
    
    print("=== Teste de estatísticas em array grande (1 milhão de valores) ===\n")
    
    # Método 1: loop for puro
    media, mediana, desvio, tempo = estatisticas_for(array_grande)
    print(f"For loop → Média: {media:.2f}, Mediana: {mediana:.2f}, Desvio Padrão: {desvio:.2f}, Tempo: {tempo:.5f} s")
    
    # Método 2: funções built-in Python
    media, mediana, desvio, tempo = estatisticas_builtin(array_grande)
    print(f"Built-in → Média: {media:.2f}, Mediana: {mediana:.2f}, Desvio Padrão: {desvio:.2f}, Tempo: {tempo:.5f} s")
    
    # Método 3: funções NumPy
    media, mediana, desvio, tempo = estatisticas_numpy(array_grande)
    print(f"NumPy → Média: {media:.2f}, Mediana: {mediana:.2f}, Desvio Padrão: {desvio:.2f}, Tempo: {tempo:.5f} s")