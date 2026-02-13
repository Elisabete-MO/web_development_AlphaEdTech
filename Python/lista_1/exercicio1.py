# Escreva um programa que: 

# Recebe dois números do usuário usando a função input(). 
# Realiza as seguintes operações: adição, subtração, multiplicação, divisão e módulo. 
# Mostra os resultados usando a função print().

num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))

adicao = num1 + num2
subtracao = num1 - num2
multiplicacao = num1 * num2

if num2 != 0:
    divisao = num1 / num2
    modulo = num1 % num2
else:
    divisao = "indefinida (divisão por zero)"
    modulo = "indefinido (módulo por zero)"

# Mostrar resultados
print("Adição:", adicao)
print("Subtração:", subtracao)
print("Multiplicação:", multiplicacao)
print("Divisão:", divisao)
print("Módulo:", modulo)
