# Crie uma função chamada analisar_numero que recebe um número e retorna três valores: se é par ou ímpar, se é positivo ou negativo, e se é inteiro ou decimal. 

def analisar_numero(n):
  # Par ou ímpar (só faz sentido para inteiro)
  if isinstance(n, int):
    paridade = "par" if n % 2 == 0 else "ímpar"
  else:
    paridade = "não se aplica (não é inteiro)"

  # Positivo ou negativo (zero é neutro)
  if n > 0:
    sinal = "positivo"
  elif n < 0:
    sinal = "negativo"
  else:
    sinal = "zero (neutro)"

  # Inteiro ou decimal
  tipo = "inteiro" if isinstance(n, int) else "decimal"

  return paridade, sinal, tipo
    
def testar_analisar_numero():
  assert analisar_numero(5) == ("ímpar", "positivo", "inteiro")
  assert analisar_numero(-2) == ("par", "negativo", "inteiro")
  assert analisar_numero(3.5) == ("não se aplica (não é inteiro)", "positivo", "decimal")
  assert analisar_numero(0) == ("par", "zero (neutro)", "inteiro")
  print("Todos os testes passaram com sucesso!")

def main():
  print(f"analisar_numero(5): {analisar_numero(5)}")
  print(f"analisar_numero(-2): {analisar_numero(-2)}")
  print(f"analisar_numero(3.5): {analisar_numero(3.5)}")
  print(f"analisar_numero(0): {analisar_numero(0)}")
  testar_analisar_numero()

if __name__ == "__main__":
  main()