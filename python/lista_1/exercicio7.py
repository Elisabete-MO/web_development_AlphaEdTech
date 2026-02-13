# 🕵️‍♀️💻 Desafio ! Pesquise ! 

# Contexto: 

# Você é um detetive digital investigando mensagens codificadas. Sua tarefa é contar quantas vezes cada palavra aparece em uma mensagem. 

# Entrada: 

# Uma única linha de texto digitada pelo usuário. 
# Saída: 

# Cada palavra e sua contagem, exibidas em ordem alfabética. 
# Exemplo de execução: 

# Entrada pelo usuário
# mensagem = input("Digite a mensagem suspeita: ")
# Saída esperada
# Exemplo de entrada: "o ladrão roubou o ouro e sumiu com o ouro"
# Exemplo de saída:
# e: 1
# ladrão: 1
# o: 3
# ouro: 2
# roubou: 1
# sumiu: 1

# Entrada
mensagem = input("Digite a mensagem suspeita: ")

# Normalizar texto
mensagem = mensagem.lower()

# Separar palavras
palavras = mensagem.split()

# Contagem
contagem = {}

for palavra in palavras:
    contagem[palavra] = contagem.get(palavra, 0) + 1

# Saída em ordem alfabética
for palavra in sorted(contagem):
    print(f"{palavra}: {contagem[palavra]}")
