# Calcule as medidas estatísticas básicas, criando visualizações para entender a distribuição das vendas e interpretação dos resultados para auxiliar o processo de tomada de decisão operacional e estratégica de uma loja.
# Calcule as Medidas Estatísticas
# Crie um Histograma
# Analise e Interprete os resultados

"""
Análise Estatística de Vendas

Este script realiza o cálculo de medidas estatísticas descritivas e gera visualizações
para entender a distribuição das vendas, auxiliando no processo de tomada de
decisão operacional e estratégica.

Funcionalidades:
- Cálculo de medidas de tendência central (média, mediana, moda).
- Cálculo de medidas de dispersão (desvio padrão, variância, amplitude).
- Identificação de quartis e distribuição dos dados.
- Geração de histograma para análise de frequência.
- Geração de boxplot para análise de distribuição.
- Impressão de interpretação inicial dos resultados

Objetivo:
Apoiar a tomada de decisão operacional e estratégica a partir
da análise do comportamento das vendas.

Requisitos:
- O arquivo 'vendas.csv' deve conter uma coluna numérica chamada 'vendas'.

"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Carregar os dados
df = pd.read_csv('vendas.csv')

# Conferir dados
print(df.head())
print(df.info())
print(df.describe())

# Agrupar por Promoção
vendas_promocao = df.groupby('Promoção')['Vendas Diárias ($)'].agg(['mean','median','std','min','max'])
print("Resumo das vendas por Promoção:\n", vendas_promocao, "\n")

# Agrupar por Dia da Semana
vendas_dia = df.groupby('Dia da Semana')['Vendas Diárias ($)'].agg(['mean','median','std','min','max'])
print("Resumo das vendas por Dia da Semana:\n", vendas_dia)

# Medidas estatísticas
vendas = df['Vendas Diárias ($)']

media = vendas.mean()
mediana = vendas.median()
moda = vendas.mode()[0]
desvio = vendas.std()
variancia = vendas.var()
minimo = vendas.min()
maximo = vendas.max()
quartis = vendas.quantile([0.25, 0.5, 0.75])

print('Média:', media)
print('Mediana:', mediana)
print('Moda:', moda)
print('Desvio padrão:', desvio)
print('Variância:', variancia)
print('Mínimo:', minimo)
print('Máximo:', maximo)
print('Quartis:', quartis)

# Visualizações

# Histograma com Seaborn e KDE
plt.figure(figsize=(10,6))
sns.histplot(vendas, kde=True, bins=10, color='skyblue')
plt.title('Distribuição das Vendas Diárias')
plt.xlabel('Vendas ($)')
plt.ylabel('Frequência')
plt.savefig('distribuicao_vendas.png')
# plt.show()

# Boxplot
plt.figure(figsize=(10,4))
sns.boxplot(x=vendas, color='lightgreen')
plt.title('Boxplot das Vendas Diárias')
plt.xlabel('Vendas ($)')
plt.savefig('boxplot_vendas.png')
# plt.show()

# Boxplot por Promoção
plt.figure(figsize=(8,6))
sns.boxplot(x='Promoção', y='Vendas Diárias ($)', data=df, palette='pastel')
plt.title('Vendas Diárias: Promoção vs Sem Promoção')
plt.xlabel('Promoção')
plt.ylabel('Vendas ($)')
plt.savefig('boxplot_promocao.png')
# plt.show()

# Boxplot por Dia da Semana
plt.figure(figsize=(8,6))
dias_ordenados = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
sns.barplot(x='Dia da Semana', y='Vendas Diárias ($)', data=df, ci=None, palette='viridis', order=dias_ordenados)
plt.title('Média de Vendas por Dia da Semana')
plt.xlabel('Dia da Semana')
plt.ylabel('Vendas Médias ($)')
plt.savefig('barplot_dia.png')
# plt.show()

# Interpretação inicial
print('\nInterpretação:')
print(f'- A média de vendas é {media:.2f} com desvio padrão de {desvio:.2f}')
print(f'- A mediana é {mediana:.2f}, indicando que 50% das vendas estão abaixo deste valor')
print(f'- A moda é {moda}, mostrando o valor mais frequente de vendas')
print(f'- Quartis: 25% das vendas ≤ {quartis[0.25]}, 50% ≤ {quartis[0.5]}, 75% ≤ {quartis[0.75]}')
print(f'- O valor mínimo de vendas é {minimo} e o máximo é {maximo}')
print('- O boxplot mostra possíveis outliers e a simetria da distribuição das vendas')
