# Crie uma função chamada criar_dict_pessoa que recebe nome e idade como argumentos obrigatórios e um número variável de informações adicionais como kwargs. A função deve retornar um dicionário com todos os dados. 

def criar_dict_pessoa(nome, idade, **informacoes_adicionais):
    pessoa = {
        "nome": nome,
        "idade": idade
    }

    pessoa.update(informacoes_adicionais)

    return pessoa

def testar_criar_dict_pessoa():
  assert criar_dict_pessoa('João', 30) == {'nome': 'João', 'idade': 30}
  assert criar_dict_pessoa('Maria', 25, cidade='São Paulo', profissao='Engenheira') == {'nome': 'Maria', 'idade': 25, 'cidade': 'São Paulo', 'profissao': 'Engenheira'}
  print("Todos os testes passaram com sucesso!") 

# Testes rápidos
print(f"Resultado: ('João', 30) -> {criar_dict_pessoa('João', 30)}")
print(f"Resultado: ('Maria', 25, cidade='São Paulo', profissao='Engenheira') -> {criar_dict_pessoa('Maria', 25, cidade='São Paulo', profissao='Engenheira')}")

if __name__ == "__main__":
  testar_criar_dict_pessoa()
