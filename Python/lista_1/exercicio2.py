# Escreva um programa que: 

# Recebe uma frase do usuário. 
# Conta o número de caracteres na frase usando len(). 
# Verifica se uma palavra fornecida pelo usuário está na frase usando o operador in. 
# Imprime os três primeiros caracteres da frase e os três últimos. 
# Imprime uma mensagem formatada usando f-strings: “Olá, sua frase foi [frase aqui]”

frase = input("Digite uma frase: ")

quantidade = len(frase)
palavra = input("Digite uma palavra para verificar na frase: ")

existe = palavra in frase
tres_primeiros = frase[:3]
tres_ultimos = frase[-3:]

# Mostrar resultados
print(f"Número de caracteres: {quantidade}")
print(f"A palavra está na frase? {existe}")
print(f"Três primeiros caracteres: {tres_primeiros}")
print(f"Três últimos caracteres: {tres_ultimos}")
print(f"Olá, sua frase foi '{frase}'")
