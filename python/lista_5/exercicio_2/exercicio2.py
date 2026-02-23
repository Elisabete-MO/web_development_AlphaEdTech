# Planejamento de Rotas de Entrega

# Uma empresa de logística precisa otimizar suas rotas de entrega para maximizar a eficiência e reduzir custos. Eles operam em uma cidade onde têm que fazer entregas em cinco locais diferentes diariamente. O gerente de logística quer saber de quantas maneiras diferentes o motorista pode planejar sua rota, partindo do depósito, passando por todos os cinco locais uma única vez e retornando ao depósito. Este problema é um exemplo clássico do "Problema do Caixeiro Viajante" simplificado, onde o objetivo é encontrar a menor rota que visita uma série de locais exatamente uma vez e retorna ao ponto de partida.

# Calcule o número total de permutações possíveis para as rotas de entrega, considerando que a ordem em que os locais são visitados afeta a rota. Assumam que qualquer sequência de visitas é possível e que todas são igualmente prováveis.

# Para simplificar, consideramos que o motorista sempre começa e termina o trajeto no mesmo depósito, e os cinco locais precisam ser visitados uma vez cada.

# import math

# # Número de locais a visitar (excluindo o depósito)
# num_locais = 5

# # Calculando permutações circulares
# num_permutacoes = math.factorial(num_locais)

# print(f"O número total de permutações possíveis para as rotas é: {num_permutacoes}")

# A empresa de logística que deseja otimizar suas rotas de entrega agora enfrenta desafios adicionais. Devido a restrições operacionais, eles precisam escolher entre vários conjuntos de locais de entrega em dias diferentes da semana. Além de planejar rotas, eles precisam decidir quais locais visitar com base na probabilidade de demanda e restrições de tempo.
# Considere agora a identificação de combinações para decidir quais locais incluir em diferentes dias da semana. Utilize também a probabilidade para priorizar os locais com base na demanda esperada.
# Utilize a seguinte amostra de dados para o exercício:

# ID do Local,Nome do Local,Probabilidade de Alta Demanda (%),Distância do Depósito (km),Dias de Entrega Disponíveis
# 1,Centro Comercial,70,15,"Segunda, Quarta, Sexta"
# 2,Zona Industrial,65,20,"Terça, Quinta"
# 3,Parque Tecnológico,60,18,"Segunda, Quarta, Sexta"
# 4,Universidade,45,10,Segunda a Sexta
# 5,Condomínio Residencial,50,8,"Terça, Quinta"
# 6,Área Hospitalar,55,12,Todos os dias
# 7,Shopping Norte,40,22,"Segunda, Quarta, Sexta"
# 8,Bairro Comercial,50,5,Segunda a Sexta
# 9,Mercado Municipal,30,16,"Terça, Quinta, Sábado"
# 10,Estação Rodoviária,25,14,Todos os dias

# DESAFIO ADICIONAL:

# Como desafio adicional, você pode utilizar a biblioteca networkx para representar a sequência de entregas a ser realizada classificando os pontos do diagrama gerado pelo dia da semana. 

"""
Planejamento e Visualização de Rotas de Entrega

Este script realiza o planejamento de rotas de entrega para uma empresa de logística, 
considerando disponibilidade de locais por dia da semana, probabilidade de alta demanda 
e distância do depósito. Ele também gera visualizações das rotas utilizando um grafo.

Funcionalidades:
1. Criação de DataFrame com informações dos locais:
   - Nome do local
   - Probabilidade de alta demanda (%)
   - Distância do depósito (km)
   - Dias da semana disponíveis para entrega

2. Seleção de locais por dia da semana:
   - Filtra os locais disponíveis para cada dia
   - Permite calcular combinações de entregas (ex.: 3 locais por dia)
   - Prioriza combinações pela probabilidade média de alta demanda

3. Análise de combinações:
   - Calcula todas as combinações possíveis de locais a visitar
   - Ordena as combinações com base na probabilidade média de demanda
   - Mostra as top combinações para cada dia

4. Construção e visualização de grafo das rotas:
   - Cria um grafo direcionado (DiGraph) com os locais e o depósito
   - Desenha nós representando os locais
   - Desenha arestas representando possíveis rotas de entrega
   - Adiciona labels com nomes dos locais
   - Permite visualização do mapa geral de entregas

Objetivo:
- Auxiliar no planejamento estratégico e operacional de entregas
- Priorizar locais com maior demanda
- Visualizar graficamente a rede de entregas para cada dia da semana

Requisitos:
- Bibliotecas: pandas, networkx, matplotlib
- Python 3.x
"""


import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import itertools

# 1. Preparação dos Dados
# Criando o DataFrame com os dados fornecidos

# Exemplo de top combinação Segunda-feira
top_comb_segunda = ('Centro Comercial', 'Parque Tecnológico', 'Área Hospitalar')

data = {
    "ID": range(1,11),
    "Nome_Local": ['Centro Comercial', 'Zona Industrial', 'Parque Tecnológico', 'Universidade', 
             'Condomínio Residencial', 'Área Hospitalar', 'Shopping Norte', 'Bairro Comercial', 
             'Mercado Municipal', 'Estação Rodoviária'],
    "Probabilidade_Alta_Demanda": [70,65,60,45,50,55,40,50,30,25],
    "Distancia_Deposito": [15,20,18,10,8,12,22,5,16,14],
    "Dias_Disponiveis": [
        "Segunda,Quarta,Sexta","Terça,Quinta","Segunda,Quarta,Sexta",
        "Segunda,Terça,Quarta,Quinta,Sexta","Terça,Quinta",
        "Segunda,Terça,Quarta,Quinta,Sexta,Sábado,Domingo",
        "Segunda,Quarta,Sexta","Segunda,Terça,Quarta,Quinta,Sexta",
        "Terça,Quinta,Sábado","Segunda,Terça,Quarta,Quinta,Sexta,Sábado,Domingo"
    ]
}

df = pd.DataFrame(data)

# 2. Análise e Seleção de Locais por Dia
# Função para selecionar locais com base no dia da semana
def selecionar_locais_por_dia(dia):
    # Filtra linhas onde o dia está presente na coluna 'Dias'
    # O método .str.contains() é case-sensitive, mas os dados estão em maiúsculo/minúsculo consistente
    return df[df['Dias_Disponiveis'].str.contains(dia, case=False, na=False)]

# Função para calcular combinações (simples, sem restrição de quantidade)
def calcular_combinacoes(locais, k):
    from itertools import combinations
    # Retorna todas as combinações de k locais
    return list(combinations(locais, k))

# 3. Construção do Grafo
# Criando um grafo direcionado (Digraph) para representar as rotas
G = nx.DiGraph()

# Adicionando nós (locais)
for index, row in df.iterrows():
    G.add_node(row['Nome_Local'], prob=row['Probabilidade_Alta_Demanda'], dist=row['Distancia_Deposito'])

# 4. Geração de Rotas por Dia 
dias_semana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

print("--- Análise de Rotas por Dia ---")

for dia in dias_semana:
    # Seleciona locais disponíveis no dia
    locais_dia = selecionar_locais_por_dia(dia)
    
    if not locais_dia.empty:
        print(f"\n{dia}:")
        print(f"  Locais disponíveis: {len(locais_dia)}")
        
        # Exemplo: Gerar combinações de 3 locais para entrega
        k = 3 
        if len(locais_dia) >= k:
            combinacoes = calcular_combinacoes(locais_dia['Nome_Local'].tolist(), k)
            print(f"  Combinações possíveis de {k} locais: {len(combinacoes)}")
            
            # Exemplo: Ordenar combinações por probabilidade média
            def prob_media(comb): return sum(df.loc[df['Nome_Local'] == n, 'Probabilidade_Alta_Demanda'].values[0] for n in comb) / k
            combinacoes_ordenadas = sorted(combinacoes, key=prob_media, reverse=True)
            
            print(f"  Top 3 combinações por probabilidade:")
            for i, comb in enumerate(combinacoes_ordenadas[:3], 1):
                print(f"    {i}. {comb} (Prob. Média: {prob_media(comb):.2f})")
        else:
            print(f"  Não há combinações suficientes de {k} locais.")
    else:
        print(f"\n{dia}: Sem locais disponíveis.")

# 5. Visualização do Grafo (Desafio Adicional)

G = nx.DiGraph()
G.add_node("Depósito")

# Adicionar nós
for local in df['Nome_Local']:
    G.add_node(local)

# Adicionar arestas de todas as combinações de 3 locais
k = 3
combinacoes = list(itertools.combinations(df['Nome_Local'], k))
for comb in combinacoes:
    sequencia = ["Depósito"] + list(comb) + ["Depósito"]
    for i in range(len(sequencia)-1):
        G.add_edge(sequencia[i], sequencia[i+1])

# Layout
pos = nx.spring_layout(G, seed=42)  # espalha os nós
plt.figure(figsize=(12,8))
nx.draw_networkx_nodes(G, pos, node_size=2000, node_color='skyblue')
nx.draw_networkx_edges(G, pos, width=1.0, alpha=0.5, arrowsize=15)
nx.draw_networkx_labels(G, pos, font_size=8, font_weight='bold')
plt.title("Todas as combinações de rotas (3 locais)", fontsize=15)
plt.axis('off')
plt.savefig('mapa_locais.png')
# plt.show()

# Criar grafo direcionado
G = nx.DiGraph()

# Adicionar nós (Depósito + locais)
G.add_node("Depósito")
for local in top_comb_segunda:
    G.add_node(local)

# Adicionar arestas seguindo a sequência: Depósito -> Local1 -> Local2 -> Local3 -> Depósito
sequencia = ["Depósito"] + list(top_comb_segunda) + ["Depósito"]
for i in range(len(sequencia)-1):
    G.add_edge(sequencia[i], sequencia[i+1])

# Plotar grafo
plt.figure(figsize=(8,6))
pos = nx.circular_layout(G)  # ou use nx.circular_layout(G) para circular
nx.draw_networkx_nodes(G, pos, node_size=2000, node_color='skyblue', alpha=0.9)
nx.draw_networkx_edges(G, pos, arrowstyle='->', arrowsize=20, width=2, edge_color='gray')
nx.draw_networkx_labels(G, pos, font_size=10, font_weight='bold')
plt.title("Rota de Entrega - Segunda-feira")
plt.axis('off')
plt.savefig('rota_entrega.png')
# plt.show()


