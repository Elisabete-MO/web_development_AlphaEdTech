# Desafio ! Pesquise ! 

# Contexto: 

# Você está desenvolvendo um sistema de censura para mensagens contendo palavras proibidas. 

# Entrada: 

# Uma frase. 
# Uma lista de palavras proibidas, separadas por vírgulas. 
# Saída: 

# A frase censurada. 
# Exemplo de execução: 

# Entrada pelo usuário
# frase = input("Digite a frase: ")
# proibidas = input("Digite as palavras proibidas, separadas por vírgulas: ")
# Exemplo de entrada:
# Frase: "o ladrão roubou o ouro"
# Proibidas: "ladrão, ouro"
# Exemplo de saída: "o ****** roubou o ****"

# Entrada
frase = input("Digite a frase: ")
proibidas = input("Digite as palavras proibidas, separadas por vírgulas: ")

# Preparar lista de proibidas
lista_proibidas = [p.strip().lower() for p in proibidas.split(",")]

# Separar frase em palavras
palavras = frase.split()

# Censurar
resultado = []

for palavra in palavras:
    palavra_limpa = palavra.lower()
    
    if palavra_limpa in lista_proibidas:
        resultado.append("*" * len(palavra))
    else:
        resultado.append(palavra)

# Saída
frase_censurada = " ".join(resultado)
print(frase_censurada)
