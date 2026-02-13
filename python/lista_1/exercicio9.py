# Desafio ! Pesquise ! 

# Contexto: 

# Você é um aventureiro registrando itens coletados ou usados durante suas jornadas. 

# Entrada: 

# Uma sequência de ações no formato: "ação item" (digitada pelo usuário uma linha por vez). Onde ação é “coletar” ou “usar”. 
# Digite "fim" para encerrar a entrada. 
# Saída: 

# O diário atualizado com os itens e suas quantidades. 
# Exemplo de execução: 

# Entrada pelo usuário
# print("Digite as ações (ex: 'coletar espada', 'usar poção'). Digite 'fim' para encerrar:")
# Exemplo de entrada:
# coletar espada
# coletar poção
# usar espada
# coletar espada
# coletar poção
# fim
# # Exemplo de saída:
# # Diário final: {'espada': 1, 'poção': 2}

diario = {}

print("Digite as ações (ex: 'coletar espada', 'usar poção'). Digite 'fim' para encerrar:")

while True:
    entrada = input().lower().strip()
    
    if entrada == "fim":
        break

    partes = entrada.split(maxsplit=1)
    
    if len(partes) != 2:
        continue  # ignora entradas inválidas

    acao, item = partes

    if acao == "coletar":
        diario[item] = diario.get(item, 0) + 1

    elif acao == "usar":
        if item in diario and diario[item] > 0:
            diario[item] -= 1
            
            if diario[item] == 0:
                del diario[item]

print("Diário final:", diario)


