# Desafio ! Pesquise ! 

# Contexto: 

# Você é responsável pelo sistema de pedidos de um restaurante. Calcule o valor total com base no cardápio fornecido. 

# Entrada: 

# Um dicionário com o cardápio (fornecido no código). 
# Uma lista de pedidos digitada pelo usuário, separada por vírgulas.
# Saída: 

# O total da conta.
# Os pratos que não estão no cardápio.
# Exemplo de execução: 

# Dicionário fixo
# cardapio = {"batata frita": 5.50, "hambúrguer": 10.00, "suco": 4.00, "refrigerante": 3.50}
# Entrada pelo usuário
# pedidos = input("Digite os pedidos, separados por vírgulas: ")
# Exemplo de entrada: "batata frita, hambúrguer, pastel, suco"
# Exemplo de saída:
# Total: 19.50
# Pratos inválidos: pastel

# Cardápio fixo
cardapio = {
    "batata frita": 5.50,
    "hambúrguer": 10.00,
    "suco": 4.00,
    "refrigerante": 3.50
}

# Entrada do usuário
pedidos = input("Digite os pedidos, separados por vírgulas: ")

# Processar pedidos
lista_pedidos = pedidos.lower().split(",")
lista_pedidos = [p.strip() for p in lista_pedidos]

total = 0
invalidos = []

for item in lista_pedidos:
    if item in cardapio:
        total += cardapio[item]
    else:
        invalidos.append(item)

# Saída
print(f"Total: {total:.2f}")

if invalidos:
    print("Pratos inválidos:", ", ".join(invalidos))
else:
    print("Pratos inválidos: nenhum")


