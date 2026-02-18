# Crie uma função chamada criar_email que recebe nome, sobrenome e dominio (com valor padrão "empresa.com.br") e retorna um email no formato "nome.sobrenome@dominio".

def criar_email(nome, sobrenome, dominio="empresa.com.br"):
  email = f"{nome.lower()}.{sobrenome.lower()}@{dominio.lower()}"
  return email


# Testes rápidos
print(criar_email("Ana", "Silva"))
print(criar_email("Carlos", "Souza", "gmail.com"))
