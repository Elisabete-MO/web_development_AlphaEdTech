# Combine o NumPy com bibliotecas como Matplotlib para criar visualizações de dados interativas e informativas.

"""
Exemplo de uso de NumPy + Matplotlib para visualizações de dados

- Gera dados sintéticos de vendas diárias para 7 dias da semana usando NumPy
- Cria gráficos interativos (interativo apenas no Jupyter) e informativos com Matplotlib
- Demonstra:
    - Gráficos de barras
    - Gráficos de linha
    - Scatter plot com cores e tamanhos variáveis
"""

import numpy as np
import matplotlib.pyplot as plt

# 1️⃣ Gerar dados sintéticos
dias = np.array(["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"])
vendas = np.random.randint(150, 300, size=7)  # vendas diárias em $
clientes = np.random.randint(50, 100, size=7) # número de clientes por dia

# 2️⃣ Gráfico de barras: vendas por dia
plt.figure(figsize=(10,6))
plt.bar(dias, vendas, color='skyblue')
plt.title("Vendas Diárias")
plt.xlabel("Dia da Semana")
plt.ylabel("Vendas ($)")
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.savefig("vendas_diarias.png")
# plt.show()

# 3️⃣ Gráfico de linha: evolução das vendas
plt.figure(figsize=(10,6))
plt.plot(dias, vendas, marker='o', color='orange', linewidth=2)
plt.title("Evolução das Vendas Semanais")
plt.xlabel("Dia da Semana")
plt.ylabel("Vendas ($)")
plt.grid(True)
plt.savefig("evolucao_vendas.png")
# plt.show()

# 4️⃣ Scatter plot: vendas vs clientes, com cores e tamanhos
plt.figure(figsize=(10,6))
plt.scatter(vendas, clientes, s=clientes*5, c=vendas, cmap='viridis', alpha=0.8)
plt.colorbar(label='Vendas ($)')
plt.title("Relação entre Vendas e Número de Clientes")
plt.xlabel("Vendas ($)")
plt.ylabel("Clientes")
plt.savefig("scatter_vendas_clientes.png")
# plt.show()