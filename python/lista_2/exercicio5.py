#  Você trabalha para uma empresa de logística e precisa criar um programa em Python para gerenciar o controle de estoque de produtos. O programa deve ser capaz de lidar com diferentes armazéns e os produtos armazenados neles. 
# O desafio consiste em desenvolver um sistema utilizando frozensets para realizar o controle de estoque, permitindo as seguintes funcionalidades: 

# Armazenamento de Produtos por Armazém: 
# Crie um programa que permita ao usuário inserir informações sobre os produtos (somente o código do produto basta) presentes em diferentes armazéns. Cada armazém pode ter um conjunto de produtos únicos representados por frozensets, onde os produtos não podem ser alterados após a criação do conjunto. 

# Consulta de Produtos por Armazém: 
# Implemente a funcionalidade que permita ao usuário consultar quais produtos estão presentes em um determinado armazém, fornecendo o conjunto de produtos por meio de um frozenset. 

# Permita que o usuário adicione novos produtos a um determinado armazém. Utilizando frozensets, garanta que a imutabilidade dos conjuntos seja mantida após a adição de novos itens. Além disso, permita a remoção de produtos de um armazém, mantendo a integridade do conjunto utilizando frozensets.

armazens = {}

while True:
    print("\n1 - Criar/Atualizar armazém")
    print("2 - Consultar armazém")
    print("3 - Adicionar produto")
    print("4 - Remover produto")
    print("0 - Sair")

    op = input("Escolha: ")

    # 1) Criar armazém
    if op == "1":
        nome = input("Nome do armazém: ").lower()

        codigos = input(
            "Digite códigos dos produtos separados por espaço: "
        ).split()

        armazens[nome] = frozenset(codigos)
        print("Armazém salvo.")

    # 2) Consultar
    elif op == "2":
        nome = input("Nome do armazém: ").lower()

        if nome in armazens:
            print("Produtos:", armazens[nome])
        else:
            print("Armazém não encontrado.")

    # 3) Adicionar produto
    elif op == "3":
        nome = input("Armazém: ").lower()
        prod = input("Código do produto: ")

        if nome in armazens:
            atual = armazens[nome]

            armazens[nome] = atual.union([prod])

            print("Produto adicionado.")
        else:
            print("Armazém não existe.")

    # 4) Remover produto
    elif op == "4":
        nome = input("Armazém: ").lower()
        prod = input("Código do produto: ")

        if nome in armazens:
            atual = armazens[nome]

            if prod in atual:
                armazens[nome] = atual.difference([prod])
                print("Produto removido.")
            else:
                print("Produto não está no armazém.")
        else:
            print("Armazém não existe.")
    elif op == "0":
        break
