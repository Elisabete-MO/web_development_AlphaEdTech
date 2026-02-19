# Crie uma função chamada somar_numeros que recebe um número variável de argumentos e retorna o maior de todos eles. 
# Exemplos: 
# somar_numeros(10) # retorna 10 
# somar_numeros(10, 30, 20) # retorna 30 
# somar_numeros(5, 10, 50, 40) # retorna 50 
# somar_numeros() # retorna None 

def maior_numero(*numeros):
  if not numeros:
    return None
  return max(numeros)

def testar_maior_numero():
  assert maior_numero(10) == 10
  assert maior_numero(10, 30, 20) == 30
  assert maior_numero(5, 10, 50, 40) == 50
  assert maior_numero() == None
  print("Todos os testes passaram com sucesso!") 

# Testes rápidos
print(f"Resultado maior_numero(10): {maior_numero(10)}")
print(f"Resultado maior_numero(10, 30, 20): {maior_numero(10, 30, 20)}")
print(f"Resultado maior_numero(5, 10, 50, 40): {maior_numero(5, 10, 50, 40)}")
print(f"Resultado maior_numero(): {maior_numero()}")

if __name__ == "__main__":
  testar_maior_numero()