# Faça um programa que lê uma string e conta o número de vogais, consoantes, espaços e pontuações (caracteres “.”,“,”,“!”,“?”,"-").
# Observação: é proibido o uso de funções auxiliares, como o count(), por exemplo.
# A saída do programa deve ser a porcentagem de cada tipo de caractere na string, com 2 casas após a vírgula.
# Exemplo:
# Entrada: Mesmo que a realidade seja um pesadelo, nao podemos deixar de sonhar.
# Saída:
# Vogais: 40.58%
# Consoantes: 40.58%
# Espacos: 15.94%
# Pontuacoes: 2.90%
# Sugestão: use um Dict para armazenar a contagem de cada caractere. Depois itere pelas vogais “aeiou” para somar, depois pelas consoantes “bcdf….z”, etc.

frase = input("Digite uma frase: ")

vogais = "aeiou"
consoantes = "bcdfghjklmnpqrstvwxyz"
pontuacoes = ".,!?-"

contagem = {
    "vogais": 0,
    "consoantes": 0,
    "espacos": 0,
    "pontuacoes": 0
}

total = len(frase)

for ch in frase.lower():
    if ch in vogais:
        contagem["vogais"] += 1
    elif ch in consoantes:
        contagem["consoantes"] += 1
    elif ch == " ":
        contagem["espacos"] += 1
    elif ch in pontuacoes:
        contagem["pontuacoes"] += 1

# cálculo das porcentagens
pv = contagem["vogais"] / total * 100
pc = contagem["consoantes"] / total * 100
pe = contagem["espacos"] / total * 100
pp = contagem["pontuacoes"] / total * 100

print(f"Vogais: {pv:.2f}%")
print(f"Consoantes: {pc:.2f}%")
print(f"Espacos: {pe:.2f}%")
print(f"Pontuacoes: {pp:.2f}%")
