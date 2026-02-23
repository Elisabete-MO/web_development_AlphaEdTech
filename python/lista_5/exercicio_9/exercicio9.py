# Faça testes de slice de um numpy array de inteiros de 3 dimensões.

"""
Exemplo de slice em um array NumPy 3D

Este script demonstra como criar um array tridimensional (3D) de inteiros
e acessar seus elementos usando slicing (fatias). Mostra como extrair:
- Sub-arrays
- Planos específicos
- Linhas ou colunas de uma dimensão
- Valores individuais

Explicação visual:
- Azul: plano inteiro arr3d[0,:,:]
- Verde: linha em todas as camadas arr3d[:,1,:]
- Roxo: coluna em todas as camadas arr3d[:,:,2]
- Laranja: sub-array arr3d[0:2,1:3,0:3]
- Vermelho: valor individual arr3d[2,3,3]
- Cinza claro: demais elementos

Cada ponto do array 3D é plotado como um scatter point no cubo (x → coluna, y → linha, z → plano).
"""

import numpy as np

def criar_array_3d(dim1=3, dim2=4, dim3=5, seed=42):
    """
    Cria um array 3D com números inteiros aleatórios entre 0 e 99.

    Parâmetros:
        dim1 (int): tamanho da primeira dimensão (profundidade).
        dim2 (int): tamanho da segunda dimensão (linhas).
        dim3 (int): tamanho da terceira dimensão (colunas).
        seed (int): semente para reproducibilidade.
    
    Retorna:
        np.ndarray: array tridimensional.
    """
    np.random.seed(seed)
    return np.random.randint(0, 100, size=(dim1, dim2, dim3))

if __name__ == "__main__":
    # Criar array 3D de exemplo
    arr3d = criar_array_3d()
    print("Array 3D completo (shape={}):\n".format(arr3d.shape), arr3d, "\n")

    # 1. Acessar um plano inteiro (primeira dimensão)
    plano0 = arr3d[0, :, :]
    print("Plano 0 (primeira 'camada'):\n", plano0, "\n")

    # 2. Acessar uma linha específica de todas as camadas
    linha1 = arr3d[:, 1, :]
    print("Linha 1 de todas as camadas:\n", linha1, "\n")

    # 3. Acessar uma coluna específica de todas as camadas e linhas
    coluna2 = arr3d[:, :, 2]
    print("Coluna 2 de todas as camadas e linhas:\n", coluna2, "\n")

    # 4. Fatia de sub-array: camadas 0 a 1, linhas 1 a 2, colunas 0 a 3
    sub_array = arr3d[0:2, 1:3, 0:4]
    print("Sub-array (0:2, 1:3, 0:4):\n", sub_array, "\n")

    # 5. Acessar valor individual
    valor = arr3d[2, 3, 4]
    print("Valor arr3d[2,3,4]:", valor)

    """
Visualização de Slicing em Array 3D

Este script cria um array 3D e mostra visualmente diferentes tipos de slicing:
- Plano inteiro
- Linha em todas as camadas
- Coluna em todas as camadas e linhas
- Sub-array
- Valor individual
"""

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Criar array 3D 4x4x4 (para visualização clara)
arr3d = np.arange(4*4*4).reshape(4,4,4)

# Definir slices
plano = (0, slice(None), slice(None))      # arr3d[0, :, :]
linha = (slice(None), 1, slice(None))      # arr3d[:, 1, :]
coluna = (slice(None), slice(None), 2)     # arr3d[:, :, 2]
sub_array = (slice(0,2), slice(1,3), slice(0,3))  # arr3d[0:2, 1:3, 0:3]
valor = (2,3,3)                             # arr3d[2,3,3]

# Criar figura 3D
fig = plt.figure(figsize=(10,8))
ax = fig.add_subplot(111, projection='3d')
ax.set_xlabel('Coluna')
ax.set_ylabel('Linha')
ax.set_zlabel('Plano')

# Plotar todos os pontos do array
dims = arr3d.shape
for z in range(dims[0]):
    for y in range(dims[1]):
        for x in range(dims[2]):
            # Definir cor para cada tipo de slice
            if (z,y,x) == valor:
                color='red'          # valor individual
            elif plano[0]==z:
                color='blue'         # plano inteiro
            elif linha[1]==y:
                color='green'        # linha em todas as camadas
            elif coluna[2]==x:
                color='purple'       # coluna em todas as camadas
            elif (0<=z<2 and 1<=y<3 and 0<=x<3):
                color='orange'       # sub-array
            else:
                color='lightgray'    # restante
            ax.scatter(x, y, z, color=color, s=200)

# Criar legenda manual
from matplotlib.patches import Patch
legend_elements = [Patch(facecolor='blue', label='Plano 0'),
                   Patch(facecolor='green', label='Linha 1'),
                   Patch(facecolor='purple', label='Coluna 2'),
                   Patch(facecolor='orange', label='Sub-array'),
                   Patch(facecolor='red', label='Valor único'),
                   Patch(facecolor='lightgray', label='Outros')]
ax.legend(handles=legend_elements)

plt.title("Visualização de Slicing em Array 3D")
plt.savefig("visualizacao_slicing_3d.png")

