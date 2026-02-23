# Para economia de espaço, tente mudar o exercício da questão anterior de int32 para int8 e talvez para boolean. Verifique se faz diferença com o tempo de processamento.

"""
Teste de array esparso com diferentes tipos de dados

Este script cria um array NumPy aleatório esparso (0s e 1s), utilizando três tipos de dados diferentes:
- int32 (padrão)
- int8
- bool

O objetivo é comparar:
- Uso de memória
- Tempo de processamento (contagem de valores não nulos)

Funcionalidades:
- Geração de array esparso
- Contagem de valores não nulos
- Comparação de tipos de dados
- Medição de memória e tempo

Resultado:
Tipo de dados: <class 'numpy.int32'>
Tamanho do array: 1000000
Memória usada: 3906.25 KB
Quantidade de 1s: 99887
Tempo de processamento: 0.07935 s

Tipo de dados: <class 'numpy.int8'>
Tamanho do array: 1000000
Memória usada: 976.56 KB
Quantidade de 1s: 100113
Tempo de processamento: 0.04385 s

Tipo de dados: <class 'numpy.bool'>
Tamanho do array: 1000000
Memória usada: 976.56 KB
Quantidade de 1s: 99580
Tempo de processamento: 0.04719 s

- int32 → cada elemento ocupa 4 bytes
- int8 → cada elemento ocupa 1 byte
- bool → cada elemento ocupa 1 byte internamente, mas pode ter otimizações de bit (algumas funções do NumPy podem ser ainda mais rápidas)

Em arrays muito grandes, mudar de int32 para int8/boolean reduz drasticamente o uso de memória, e o tempo de contagem np.count_nonzero tende a ser igual ou levemente mais rápido.
"""

import numpy as np
import time

# Tamanho do array (1 milhão de elementos)
tamanho = 1_000_000
probabilidades = [0.9, 0.1]  # 10% de 1s

# Função auxiliar para gerar array, contar valores não nulos e medir tempo
def teste_array(dtype, tamanho=tamanho):
    start_time = time.time()
    arr = np.random.choice([0,1], size=tamanho, p=probabilidades).astype(dtype)
    num_uns = np.count_nonzero(arr)
    end_time = time.time()
    
    print(f"\nTipo de dados: {dtype}")
    print(f"Tamanho do array: {tamanho}")
    print(f"Memória usada: {arr.nbytes / 1024:.2f} KB")
    print(f"Quantidade de 1s: {num_uns}")
    print(f"Tempo de processamento: {end_time - start_time:.5f} s")
    
# Teste com int32 (padrão)
teste_array(np.int32)

# Teste com int8
teste_array(np.int8)

# Teste com bool
teste_array(np.bool_)
