# Crie uma classe `ContaBancaria` com atributo saldo e titular (nome da pessoa). Implemente os métodos `depositar(valor)` e `sacar(valor)`. O saque só deve ser realizado se houver saldo suficiente. Instancie 2 contas, teste os métodos com diferentes valores

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
        self.saldo = saldo

    def depositar(self, valor):
        """
        Realiza um depósito na conta.
        """
        if valor > 0:
            self.saldo += valor
            print(f"Depósito de R${valor:.2f} realizado com sucesso.")
        else:
            print("Valor de depósito inválido.")

    def sacar(self, valor):
        """
        Realiza um saque se houver saldo suficiente.
        """
        if valor <= 0:
            print("Valor de saque inválido.")
        elif valor <= self.saldo:
            self.saldo -= valor
            print(f"Saque de R${valor:.2f} realizado com sucesso.")
        else:
            print("Saldo insuficiente.")

    def exibir_saldo(self):
        """
        Exibe o saldo atual da conta.
        """
        print(f"Titular: {self.titular} | Saldo: R${self.saldo:.2f}")
        print("-" * 40)


# Criando duas contas
conta1 = ContaBancaria("Elisabeth", 1000)
conta2 = ContaBancaria("Carlos", 500)

# Testando operações
conta1.exibir_saldo()
conta1.depositar(200)
conta1.sacar(1500)  # tentativa de saque maior que saldo
conta1.sacar(300)
conta1.exibir_saldo()

conta2.exibir_saldo()
conta2.depositar(-50)  # valor inválido
conta2.sacar(200)
conta2.exibir_saldo()