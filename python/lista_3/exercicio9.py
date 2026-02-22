# Você está desenvolvendo um sistema de gestão de inventário para um jogo de RPG. Crie uma função principal chamada gerenciar_inventario que utiliza funções auxiliares para adicionar, remover e listar itens no inventário. 

# Funções Auxiliares: 

# 1. adicionar_item(inventario, item, quantidade=1) 
#   * Adiciona uma quantidade específica de um item ao inventário. 
#   * Se o item já existir, aumenta a quantidade. 
# 2. remover_item(inventario, item, quantidade=1) 
#   * Remove uma quantidade específica de um item do inventário. 
#   * Se a quantidade do item for menor ou igual a zero após a remoção, o item deve ser removido do inventário. 
# 3. listar_inventario(inventario) 
#   * Lista todos os itens e suas quantidades no inventário.

# Função Principal: 

# gerenciar_inventario() 

#   * Inicializa um inventário vazio. (dicionário vazio) 
#   * Adiciona 3 "Poções de Cura", 2 "Espadas" e 1 “Escudo”. 
#   * Remove 2 "Espadas". 
#   * Lista o inventário final.

lista = []

def adicionar_item(inventario, item, quantidade=1):
    if item in inventario:
        inventario[item] += quantidade
    else:
        inventario[item] = quantidade


def remover_item(inventario, item, quantidade=1):
    if item in inventario:
        inventario[item] -= quantidade
        if inventario[item] <= 0:
            del inventario[item]
    else:
        print(f"Item '{item}' não encontrado no inventário.")


def listar_inventario(inventario):
    if not inventario:
        print("O inventário está vazio.")
        return

    print("Inventário atual:")
    for item, quantidade in inventario.items():
        print(f"- {item}: {quantidade}")


def gerenciar_inventario():
    inventario = {}

    adicionar_item(inventario, "Poção de Cura", 3)
    adicionar_item(inventario, "Espada", 2)
    adicionar_item(inventario, "Escudo", 1)

    remover_item(inventario, "Espada", 2)

    listar_inventario(inventario)


if __name__ == "__main__":
    gerenciar_inventario()
