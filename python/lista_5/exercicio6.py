# Crie uma função para identificar outliers em um conjunto de dados multivariáveis utilizando métodos robustos como IQR ou DBSCAN.

"""
Detecção de Outliers em Dados Multivariáveis

Este script define funções para identificar outliers em conjuntos de dados
multivariáveis utilizando dois métodos robustos:

1. IQR (Interquartile Range):
   - Detecta pontos que estão fora do intervalo [Q1 - 1.5*IQR, Q3 + 1.5*IQR]
   - Funciona bem para distribuições aproximadamente lineares e univariadas(uma coluna por vez), 
     mas pode ser estendido a múltiplas dimensões analisando cada feature separadamente.
   - Pode gerar falso positivo se a distribuição for assimétrica.

2. DBSCAN (Density-Based Spatial Clustering of Applications with Noise):
   - Algoritmo de clustering baseado em densidade
   - Considera a densidade dos pontos em múltiplas dimensões.
   - Pontos isolados ou distantes dos clusters são considerados outliers (ruído)
   - Robusto para dados multivariáveis e distribuições não lineares

Exemplo

 - Foram criados 100 pontos normalmente distribuídos e adicionamos 2 outliers explícitos.
- IQR identifica outliers por coluna.
- DBSCAN identifica outliers considerando x e y juntos.

Dependências:
- pandas
- numpy
- scikit-learn

Resultados:
Outliers por IQR (x):
            x         y
74  -2.619745  0.276691
100  8.000000  8.000000
101 -7.000000  6.000000
Outliers por IQR (y):
       x    y
100  8.0  8.0
101 -7.0  6.0

Outliers por DBSCAN:
       x    y
100  8.0  8.0
101 -7.0  6.0

"""

import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN

# ==========================
# Função: Outliers por IQR
# ==========================
def detectar_outliers_iqr(df, coluna, fator=1.5):
    """
    Identifica outliers em uma coluna de um DataFrame usando o método IQR.

    Parâmetros:
        df (pd.DataFrame): DataFrame contendo os dados.
        coluna (str): Nome da coluna a ser analisada.
        fator (float): Multiplicador do IQR para definir limites (default=1.5).

    Retorna:
        outliers (pd.Series): Série booleana indicando True para outliers.
    """
    Q1 = df[coluna].quantile(0.25)
    Q3 = df[coluna].quantile(0.75)
    IQR = Q3 - Q1
    limite_inferior = Q1 - fator * IQR
    limite_superior = Q3 + fator * IQR
    outliers = (df[coluna] < limite_inferior) | (df[coluna] > limite_superior)
    return outliers

# ==========================
# Função: Outliers por DBSCAN
# ==========================
def detectar_outliers_dbscan(df, colunas, eps=0.5, min_samples=5):
    """
    Identifica outliers em múltiplas colunas usando DBSCAN.

    Parâmetros:
        df (pd.DataFrame): DataFrame contendo os dados.
        colunas (list): Lista de colunas numéricas a serem usadas.
        eps (float): Distância máxima entre pontos para formar cluster.
        min_samples (int): Número mínimo de pontos para formar cluster.

    Retorna:
        outliers (pd.Series): Série booleana indicando True para outliers.
    """
    db = DBSCAN(eps=eps, min_samples=min_samples)
    X = df[colunas].values
    clusters = db.fit_predict(X)
    # DBSCAN rotula outliers como -1
    outliers = clusters == -1
    return pd.Series(outliers, index=df.index)

# ==========================
# Exemplo de uso
# ==========================
if __name__ == "__main__":
    # Criar DataFrame de exemplo
    np.random.seed(42)
    dados = pd.DataFrame({
        "x": np.random.normal(0, 1, 100),
        "y": np.random.normal(0, 1, 100)
    })
    # Adicionar alguns outliers artificiais
    dados.loc[100] = [8, 8]
    dados.loc[101] = [-7, 6]

    # Detectar outliers usando IQR
    outliers_x = detectar_outliers_iqr(dados, "x")
    outliers_y = detectar_outliers_iqr(dados, "y")
    print("Outliers por IQR (x):")
    print(dados[outliers_x])
    print("Outliers por IQR (y):")
    print(dados[outliers_y])

    # Detectar outliers usando DBSCAN
    outliers_db = detectar_outliers_dbscan(dados, ["x","y"], eps=1.5, min_samples=5)
    print("\nOutliers por DBSCAN:")
    print(dados[outliers_db])