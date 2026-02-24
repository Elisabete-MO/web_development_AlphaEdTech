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
        self.saldo = saldo

    def get_saldo(self):
        """
        Retorna o saldo atual da conta.
        """
        return self.saldo

    def set_saldo(self, valor):
        """
        Define o saldo da conta.
        """
        if valor >= 0:
            self.saldo = valor
        else:
            print(f"Saldo inválido. Não é possível definir um saldo negativo.")

    def depositar(self, valor):
        """
        Realiza um depósito na conta.
        """
        if valor > 0:
            self.set_saldo(self.get_saldo() + valor)
            print(f"Depósito de R${valor:.2f} realizado com sucesso.")
        else:
            print(f"Depósito no valor de R${valor:.2f} não realizado. Valor de depósito inválido.")

    def sacar(self, valor):
        """
        Realiza um saque se houver saldo suficiente.
        """
        if valor <= 0:
            print("Não foi possível realizar o saque. Valor de saque inválido.")
        elif valor <= self.get_saldo():
            self.set_saldo(self.get_saldo() - valor)
            print(f"Saque de R${valor:.2f} realizado com sucesso.")
        else:
            print(f"Não foi possível realizar o saque no valor de R${valor:.2f}. Saldo insuficiente: R${self.get_saldo():.2f}")

    def exibir_saldo(self):
        """
        Exibe o saldo atual da conta.
        """
        print(f"Titular: {self.titular} | Saldo: R${self.get_saldo():.2f}")
        print("=" * 40)


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