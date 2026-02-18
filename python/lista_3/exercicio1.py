# Crie uma função para calcular o fatorial de um número fornecido pelo usuário. Deve testar a função com alguns valores na programação. 

def fatorial(n):
    if n < 0:
        raise ValueError("Fatorial não existe para números negativos")
    resultado = 1
    for i in range(2, n + 1):
        resultado *= i
    return resultado


# Testes da função
valores_teste = [0, 1, 5, 7]

for v in valores_teste:
    print(f"fatorial({v}) = {fatorial(v)}")


# Opcional: lendo do usuário
num = int(input("Digite um número para calcular o fatorial: "))
print(f"Fatorial de {num} = {fatorial(num)}")


def testar_fatorial():
    assert fatorial(5) == 120
    assert fatorial(4) == 24
    assert fatorial(0) == 1
    print("Testes OK!")

testar_fatorial()