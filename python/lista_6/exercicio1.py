# Crie uma classe `Carro` com os atributos marca, modelo e ano. Adicione um método
# `exibir_informacoes()` que mostra todos os dados do carro. Crie duas instâncias diferentes
# e mostre suas informações.

class Carro:
    """
    Classe que representa um carro.

    Atributos:
        marca (str): Marca do carro.
        modelo (str): Modelo do carro.
        ano (int): Ano de fabricação.
    """

    def __init__(self, marca, modelo, ano):
        """
        Inicializa um objeto Carro com marca, modelo e ano.
        """
        self.marca = marca
        self.modelo = modelo
        self.ano = ano

    def exibir_informacoes(self):
        """
        Exibe todas as informações do carro.
        """
        print(f"Marca: {self.marca}")
        print(f"Modelo: {self.modelo}")
        print(f"Ano: {self.ano}")
        print("-" * 30)


# Criando duas instâncias diferentes
carro1 = Carro("Toyota", "Corolla", 2022)
carro2 = Carro("Honda", "Civic", 2021)

# Exibindo informações
carro1.exibir_informacoes()
carro2.exibir_informacoes()