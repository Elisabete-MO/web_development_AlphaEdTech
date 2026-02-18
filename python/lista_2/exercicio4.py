# Manipulação de Dados de Vendas 
# Você trabalha em uma empresa de varejo e precisa analisar os dados de vendas do último mês. Os dados brutos estão armazenados em uma lista de tuplas, onde cada tupla representa uma venda e contém o nome do produto, o preço unitário e a quantidade vendida. 
# Sua tarefa é usar list comprehensions para realizar as seguintes operações e gerar os resultados esperados: 
# Dados Brutos:
# A lista de tuplas com os dados de vendas é fornecida. 
# Cálculo do Valor Total por Venda:
# Crie uma list comprehension para gerar uma nova lista, onde cada elemento seja o valor total de cada venda (preço unitário * quantidade). 
# Produtos com Preço Acima de X:
# Crie uma list comprehension para gerar uma nova lista contendo apenas os nomes dos produtos cujo preço unitário seja maior que um valor X (fornecido pelo usuário). 
# Vendas com Quantidade Superior a Y:
# Crie uma list comprehension para gerar uma nova lista contendo tuplas (produto, valor_total) apenas das vendas cuja quantidade seja superior a um valor Y (fornecido pelo usuário). 
# Exibição dos Resultados:
# Exiba os resultados de cada list comprehension (valor total das vendas, produtos com preço acima de X, vendas com quantidade acima de Y) de forma clara e organizada. 
# Exemplo de Dados Brutos: 

# dados_vendas = [ (“Camiseta”, 25.00, 3), (“Calça Jeans”, 80.00, 1), (“Tênis”, 150.00, 2), (“Meias”, 10.00, 5), (“Casaco”, 120.00, 1) ]

dados_vendas = [
    ("Camiseta", 25.00, 3),
    ("Calça Jeans", 80.00, 1),
    ("Tênis", 150.00, 2),
    ("Meias", 10.00, 5),
    ("Casaco", 120.00, 1)
]

X = float(input("Valor X (preço mínimo): "))
Y = int(input("Valor Y (quantidade mínima): "))

# 1) valor total por venda
valores_totais = [preco * qtd for _, preco, qtd in dados_vendas]

# 2) produtos com preço acima de X
produtos_caros = [prod for prod, preco, _ in dados_vendas if preco > X]

# 3) vendas com quantidade superior a Y
vendas_grandes = [
    (prod, preco * qtd)
    for prod, preco, qtd in dados_vendas
    if qtd > Y
]

# exibição
print("\n--- DADOS BRUTOS ---\n")
for v in dados_vendas:
    print(f"{v[0]} - R$ {v[1]:.2f} - quantidade {v[2]}")


print("\n--- RESULTADOS ---")

print("\nValores totais por venda:")
for v in valores_totais:
    print(f"R$ {v:.2f}")

print("\nProdutos com preço acima de X:")
for p in produtos_caros:
    print(p)

print("\nVendas com quantidade acima de Y:")
for prod, total in vendas_grandes:
    print(f"{prod} → R$ {total:.2f}")
