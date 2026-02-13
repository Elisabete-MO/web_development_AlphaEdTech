# Crie um programa que: 

# Define uma lista com 5 números. 
# Adiciona um novo número ao final da lista. 
# Remove o terceiro número. 
# Exibe a lista antes e depois das alterações. 
# Compare a sintaxe dessas operações em Python com o que você já viu em JavaScript, o que é diferente no python ? 

# 🐍 Python
# append() adiciona no final
# pop(indice) remove pelo índice
# Lista é bem direta e legível
# Índices começam em 0

# Lista com 5 números
numeros = [10, 20, 30, 40, 50]

print("Lista original:", numeros)

# Adicionar número no final
numeros.append(60)

# Remover o terceiro número (índice 2)
numeros.pop(2)

print("Lista depois das alterações:", numeros)


# 💻 JavaScript
# push() adiciona no final
# splice(indice, 1) remove pelo índice
# Array é bem direto e legível
# Índices começam em 0

# Lista com 5 números
let numeros = [10, 20, 30, 40, 50];

# Adicionar número no final
numeros.push(60);    

# Remover o terceiro número (índice 2)
numeros.splice(1, 1); 

console.log("Lista original:", numeros);
console.log("Lista depois das alterações:", numeros);
