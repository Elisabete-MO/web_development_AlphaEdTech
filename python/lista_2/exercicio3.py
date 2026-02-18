# Ler um nome completo, com vários nomes e sobrenomes. Extrair o último sobrenome (verificar o separador espaço entre os nomes). Colocar as iniciais dos nomes anteriores, exceto o último sobrenome, em que cada inicial em maiúscula e acompanhada com um ponto. Lembrar de colocar uma vírgula entre o último sobrenome e as iniciais. Isto é a formação de nomes de autores em citações no padrão ABNT. 
# Exemplo: Paulo Marcotti 🡺 Marcotti, P. 
# Exemplo: Joaquim DA SILVA xavier 🡺 Xavier, J. D. S. 
# Exemplo: Pedro Alvares CABRAL 🡺 Cabral, P. A. 
# Sugestão: comece com split() para quebrar em palavras

nome = input("Digite o nome completo: ")


nome = nome.split()
ultimo_sobrenome = nome[-1]

iniciais = ""
for i in range(len(nome) - 1):
    iniciais += nome[i][0].upper() + ". "

# for parte in nome[:-1]:
#     iniciais += parte[0].upper() + ". "

resultado = f"{ultimo_sobrenome.upper()}, {iniciais}"
print(resultado)