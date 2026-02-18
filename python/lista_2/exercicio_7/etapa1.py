# coleta dos dados
valores = []

while True:
    entrada = input("Digite um número inteiro (ou 'fim'): ")
    if entrada.lower() == "fim":
        break
    
    valores.append(int(entrada))

# salva no arquivo
with open("dados.txt", "w") as f:
    for v in valores:
        f.write(f"{v}\n")

print("Arquivo dados.txt salvo.")
