# Crie um script que: 

# Recebe um número do usuário. 
# Imprime “Positivo” se o número for maior que 0, “Negativo” se for menor que 0, e “Zero” se for igual a 0. Compare a sintaxe do if else em Python com o if else em JavaScript, o que é diferente no python ?

# A principal diferença entre if else em Python e JavaScript é a sintaxe.
# Em Python, usa-se indentação para definir blocos de código, enquanto em JavaScript usa-se chaves {}.
# Além disso, em Python usa-se "elif" em vez de "else if" em JavaScript.

# 🐍 Python
# Não usa chaves {}
# Usa indentação obrigatória para definir blocos
# Usa elif em vez de else if
# Não precisa de parênteses na condição

num = float(input("Digite um número: "))

if num > 0:
    print("Positivo")
elif num < 0:
    print("Negativo")
else:
    print("Zero")

# 💻 JavaScript
# Usa {} para blocos
# Indentação é recomendada, mas não obrigatória
# Usa else if (duas palavras)
# Condição normalmente entre ()

let num = parseFloat(prompt("Digite um número: "));

if (num > 0) {
    console.log("Positivo");
} else if (num < 0) {
    console.log("Negativo");
} else {
    console.log("Zero");
}
