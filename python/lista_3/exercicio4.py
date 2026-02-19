# Crie uma função chamada somar_numeros que recebe um número variável de argumentos e retorna o maior de todos eles. 
# Exemplos: 
# somar_numeros(10) # retorna 10 
# somar_numeros(10, 30, 20) # retorna 30 
# somar_numeros(5, 10, 50, 40) # retorna 50 
# somar_numeros() # retorna None 

def somar_numeros(*numeros):
  if not numeros:  # se não vier nenhum argumento
    return None
  return max(numeros)

def testar_somar_numeros():
  assert somar_numeros(10) == 10
  assert somar_numeros(10, 30, 20) == 30
  assert somar_numeros(5, 10, 50, 40) == 50
  assert somar_numeros() == None
  print("Todos os testes passaram com sucesso!") 

# Testes rápidos
print(f"Resultado soma(10): {somar_numeros(10)}")
print(f"Resultado soma(10, 30, 20): {somar_numeros(10, 30, 20)}")
print(f"Resultado soma(5, 10, 50, 40): {somar_numeros(5, 10, 50, 40)}")
print(f"Resultado soma(): {somar_numeros()}")

if __name__ == "__main__":
  testar_somar_numeros()