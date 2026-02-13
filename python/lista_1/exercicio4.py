# Escreva um programa que: 
# Imprime os números de 1 a 10 usando um for com range(). 

print("De 1 a 10:")
for i in range(1, 11):
    print(i)


# Imprime os números de 10 a 1 usando range() com passo negativo. 

print("\nDe 10 a 1:")
for i in range(10, 0, -1):
    print(i)

# Cria uma lista de nomes e usa um loop for para exibir cada nome junto com seu índice. 

nomes = ["Ana", "Bruno", "Carlos", "Diana"]

print("\nNomes com índice:")
for indice, nome in enumerate(nomes):
    print(indice, nome)
