# Modifique a classe `ContaBancaria` do exercício anterior para tornar o atributo saldo privado. Crie métodos get_saldo() e set_saldo(valor) com validações apropriadas. O saldo nunca pode ser negativo.

class ContaBancaria:
    """
    Classe que representa uma conta bancária.

    Atributos:
        titular (str): Nome do titular da conta.
        saldo (float): Saldo atual da conta.
    """

    def __init__(self, titular, saldo=0.0):
        """
        Inicializa a conta com titular e saldo inicial (padrão = 0.0).
        """
        self.titular = titular
        self.saldo = 0.0
        self.set_saldo(saldo)

    def get_saldo(self):
        """
        Retorna o saldo atual da conta.
        """
        return self.__saldo

    def set_saldo(self, valor):
        """
        Define o saldo da conta.
        """
        if valor < 0:
            raise ValueError(f"Saldo inválido. Não é possível definir um saldo negativo: R$ {valor:.2f}")
        self.__saldo = valor

    def depositar(self, valor):
        """
        Realiza um depósito na conta.
        """
        if valor <= 0:
            raise ValueError(f"Depósito no valor de R${valor:.2f} não realizado. Valor de depósito inválido.")
        self.__saldo += valor

    def sacar(self, valor):
        """
        Realiza um saque se houver saldo suficiente.
        """
        if valor <= 0:
            raise ValueError(f"Não foi possível realizar o saque no valor de R${valor:.2f}. Valor de saque inválido.")
        elif valor > self.__saldo:
            raise ValueError(f"Não foi possível realizar o saque no valor de R${valor:.2f}. Saldo insuficiente: R$ {self.__saldo}")
        self.__saldo -= valor


    def exibir_saldo(self):
        """
        Exibe o saldo atual da conta.
        """
        print(f"Titular: {self.titular} | Saldo: R${self.__saldo:.2f}")
        print("=" * 40)


conta1 = ContaBancaria("João", 1000)
conta2 = ContaBancaria("Maria", 500)

def testar_operacoes(conta):
    print(f"\n--- Testando conta de {conta.titular} ---")
    conta.exibir_saldo()

    try:
        conta.depositar(200)
        print(f"Depósito de 200 realizado com sucesso.")
    except ValueError as e:
        print("Erro no depósito:", e)

    try:
        conta.sacar(1500)
        print("Saque de 1500 realizado com sucesso.")
    except ValueError as e:
        print("Erro no saque:", e)

    try:
        conta.sacar(300)
        print("Saque de 300 realizado com sucesso.")
    except ValueError as e:
        print("Erro no saque:", e)

    conta.exibir_saldo()


testar_operacoes(conta1)

print("\n--- Testando segunda conta ---")
conta2.exibir_saldo()

try:
    conta2.depositar(-50)
    print("Depósito de -50 realizado com sucesso.")
except ValueError as e:
    print("Erro no depósito:", e)

try:
    conta2.sacar(200)
    print("Saque de 200 realizado com sucesso.")
except ValueError as e:
    print("Erro no saque:", e)

conta2.exibir_saldo()