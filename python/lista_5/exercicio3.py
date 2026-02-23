# Crie uma função que recebe um array multidimensional e retorna outro array com a soma dos elementos de cada dimensão.

def soma_por_dimensao(array):
    """
    Recebe um array multidimensional (lista de listas) e retorna uma lista
    com a soma dos elementos de cada dimensão (linha).
    """
    return [sum(linha) for linha in array]

# Exemplo de uso
arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

resultado = soma_por_dimensao(arr)
print(f'array: {arr}')
print(f'soma cada linha: {resultado}')  # Saída: [6, 15, 24]


def soma_por_coluna(array):
    """
    Recebe um array multidimensional (lista de listas) e retorna uma lista
    com a soma dos elementos de cada coluna.
    """
    # Transpor o array e somar cada coluna
    return [sum(coluna) for coluna in zip(*array)]

resultado_colunas = soma_por_coluna(arr)
print(f'soma cada coluna: {resultado_colunas}')  # Saída: [12, 15, 18]
