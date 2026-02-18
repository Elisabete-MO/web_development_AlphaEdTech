# Você foi contratado para desenvolver um sistema de registro e análise de dados para um censo demográfico de animais de estimação em um bairro. Os dados coletados incluem o nome do animal, a espécie (cachorro, gato, pássaro, etc.) e a idade em anos. Sua tarefa é criar um programa Python que faça o seguinte: 

# Coleta de Dados: 
# Permita que o usuário insira os dados de vários animais de estimação. 
# A entrada deve continuar até que o usuário digite “fim” no nome do animal. 
# Os dados de cada animal devem ser armazenados em um dicionário com as chaves nome, especie e idade. 
# Todos os dicionários devem ser armazenados em uma lista. 
# Análise de Dados: 
# Crie um trecho do programa para analisar os dados que usa a lista de dicionários como dados de entrada. 
# Calcule: 
# A quantidade total de animais registrados. 
# A quantidade de animais por espécie (ex: “cachorro”: 5, “gato”: 3 etc.) armazenando em um dicionário. 
# A idade média dos animais de cada espécie, também usando outro dicionário. 
# Todas as respostas devem estar organizadas em dicionários contendo: 
# A chave total com o número total de animais. 
# A chave especies com um dicionário onde cada chave é uma espécie e o valor é a contagem de animais daquela espécie. 
# A chave idades_medias com um dicionário onde cada chave é uma espécie e o valor é a idade média dos animais daquela espécie. 
# Exibição dos Resultados: 
# Após a coleta e análise dos dados, o programa deve exibir os resultados no seguinte formato: 
# Total de animais: [número total] 
# Contagem por espécie: 
# [especie 1]: [número] 
# [especie 2]: [número] 
# ... 
# Idade média por espécie: 
# [especie 1]: [idade média] 
# [especie 2]: [idade média] 
# ...


animais = []

# COLETA DE DADOS
while True:
    nome = input("Nome do animal (ou 'fim'): ").strip()

    if nome.lower() == "fim":
        break

    especie = input("Espécie: ").strip().lower()
    idade = int(input("Idade: "))

    pet = {
        "nome": nome,
        "especie": especie,
        "idade": idade
    }

    animais.append(pet)

# ANÁLISE
total = len(animais)

contagem_especies = {}
soma_idades = {}

for pet in animais:
    esp = pet["especie"]
    idade = pet["idade"]

    # contagem por espécie
    if esp not in contagem_especies:
        contagem_especies[esp] = 0
        soma_idades[esp] = 0

    contagem_especies[esp] += 1
    soma_idades[esp] += idade

# idade média por espécie
idades_medias = {}

for esp in contagem_especies:
    idades_medias[esp] = (
        soma_idades[esp] / contagem_especies[esp]
    )

# RESULTADO FINAL EM DICIONÁRIO
resultado = {
    "total": total,
    "especies": contagem_especies,
    "idades_medias": idades_medias
}

# EXIBIÇÃO
print("\nTotal de animais:", resultado["total"])

print("\nContagem por espécie:")
for esp, qtd in resultado["especies"].items():
    print(f"{esp}: {qtd}")

print("\nIdade média por espécie:")
for esp, media in resultado["idades_medias"].items():
    print(f"{esp}: {media:.2f}")
