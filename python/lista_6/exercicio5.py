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
    def __init__(self, nome, preco):
        self.__nome = nome
        self.__preco = preco

    def calcular_frete(self):
        if self.__preco > 1000:
            return self.__preco * 0.05
        return self.__preco * 0.1

    def get_nome(self):
        return self.__nome

    def get_preco(self):
        return self.__preco

class Eletronico(Produto):
    def __init__(self, nome, preco, voltagem):
        super().__init__(nome, preco)
        self.__voltagem = voltagem

class Movel(Produto):
    def __init__(self, nome, preco, material):
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