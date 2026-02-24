# Analise as duas classes abaixo que representam produtos de uma loja virtual:

# class Eletronico:

#     def __init__(self, nome, preco, voltagem):
#         self.__nome = nome
#         self.__preco = preco
#         self.__voltagem = voltagem
#     def calcular_frete(self):
#         if self.__preco > 1000:
#             return self.__preco * 0.05
#         return self.__preco * 0.1

# class Movel:
#     def __init__(self, nome, preco, material):
#         self.__nome = nome
#         self.__preco = preco
#         self.__material = material

#     def calcular_frete(self):
#         if self.__preco > 1000:
#             return self.__preco * 0.05
#         return self.__preco * 0.1

# Observe que o método calcular_frete() é idêntico nas duas classes. Como você poderia melhorar este código para evitar a duplicação do método, mantendo o mesmo comportamento?

class Produto:
    """
    Classe base que representa um produto da loja.

    Atributos:
        __nome (str): Nome do produto.
        __preco (float): Preço do produto.
    """
    
    def __init__(self, nome, preco):
      """
      Inicializa um produto com nome e preço.

      Args:
          nome (str): Nome do produto.
          preco (float): Preço do produto.
      """
      self.__nome = nome
      self.__preco = preco

    def calcular_frete(self):
      """
      Calcula o frete do produto.

      Returns:
          float: Valor do frete.
      """
      if self.__preco > 1000:
          return self.__preco * 0.05
      return self.__preco * 0.1

    def get_nome(self):
      """
      Retorna o nome do produto.

      Returns:
          str: Nome do produto.
      """
      return self.__nome

    def get_preco(self):
      """
      Retorna o preço do produto.

      Returns:
          float: Preço do produto.
      """
      return self.__preco

class Eletronico(Produto):
    """
    Classe que representa um produto eletrônico.

    Atributos:
        __nome (str): Nome do produto.
        __preco (float): Preço do produto.
        __voltagem (int): Voltagem do produto.
    """
    def __init__(self, nome, preco, voltagem):
      """
      Inicializa um produto eletrônico com nome, preço e voltagem.

      Args:
          nome (str): Nome do produto.
          preco (float): Preço do produto.
          voltagem (int): Voltagem do produto.
      """
      super().__init__(nome, preco)
      self.__voltagem = voltagem

class Movel(Produto):
    """
    Classe que representa um produto móvel.

    Atributos:
        __nome (str): Nome do produto.
        __preco (float): Preço do produto.
        __material (str): Material do produto.
    """
    def __init__(self, nome, preco, material):
      """
      Inicializa um produto móvel com nome, preço e material.

      Args:
          nome (str): Nome do produto.
          preco (float): Preço do produto.
          material (str): Material do produto.
      """
      super().__init__(nome, preco)
      self.__material = material

def main():
    eletronico = Eletronico("Celular", 1200, 110)
    movel = Movel("Cadeira", 500, "Madeira")
    print(f"Nome: {eletronico.get_nome()}")
    print(f"Preço: R$ {eletronico.get_preco():.2f}")
    print(f"Frete do eletronico: R$ {eletronico.calcular_frete():.2f}")
    print("-" * 20)
    print(f"Nome: {movel.get_nome()}")
    print(f"Preço: R$ {movel.get_preco():.2f}")
    print(f"Frete do movel: R$ {movel.calcular_frete():.2f}")

if __name__ == "__main__":
    main()