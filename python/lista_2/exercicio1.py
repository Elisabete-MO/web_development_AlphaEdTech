# Um pantograma ou pangrama (do grego, pan ou pantós = todos, + grama = letra) é uma frase em que são usadas todas as letras do alfabeto de determinada língua. Crie um programa que permita verificar se uma frase é ou não um pantograma. Considere que o usuário digitará apenas uma frase. A entrada contém uma frase sem acentos que pode ter letras maiúsculas ou minúsculas, ou sinais de pontuação.
# Sugestão: guarde cada letra encontrada num Set. Depois itere pela string do alfabeto (“abcde…………z”) para verificar se cada letra está presente no Set.

import string

frase = input("Digite uma frase: ")

frase = frase.lower()

letras_encontradas = set()

for ch in frase:
    # string.ascii_lowercase já traz "abcdefghijklmnopqrstuvwxyz"
    if ch in string.ascii_lowercase:
        letras_encontradas.add(ch)

alfabeto = set(string.ascii_lowercase)

# issubset verifica se todas as letras do alfabeto estão no conjunto encontrado
if alfabeto.issubset(letras_encontradas):
    print("É um pangrama (pantograma).")
else:
    print("Não é um pangrama.")

# ______________________
# versão mais “pythonica”

import string

frase = input("Digite uma frase: ").lower()

# A <= B significa: "A é subconjunto de B"
eh_pangrama = set(string.ascii_lowercase) <= set(frase)

print("É um pangrama." if eh_pangrama else "Não é um pangrama.")