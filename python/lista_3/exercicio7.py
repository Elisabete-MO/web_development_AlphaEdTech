# Crie uma função para validar os dígitos verificadores de um CNPJ (pesquisar como é este cálculo). Deve testar a função com alguns valores na programação. A função deve estar bem documentada com docstring, incluindo descrição, argumentos, retorno e exemplos.

import re


def validar_cnpj(cnpj: str) -> bool:
    """
    Valida os dígitos verificadores de um CNPJ.

    O CNPJ (Cadastro Nacional da Pessoa Jurídica) possui 14 dígitos,
    sendo os dois últimos dígitos verificadores calculados a partir
    dos 12 primeiros.

    O cálculo consiste em:
    1. Multiplicar cada dígito por uma sequência específica de pesos.
    2. Somar os resultados.
    3. Calcular o resto da divisão por 11.
    4. Se o resto for menor que 2, o dígito verificador é 0.
       Caso contrário, é 11 - resto.

    Args:
        cnpj (str): CNPJ contendo 14 dígitos, podendo incluir
                    pontos, barras ou hífen.

    Returns:
        bool: True se o CNPJ for válido, False caso contrário.

    Examples:
        >>> validar_cnpj("04.252.011/0001-10")
        True
        >>> validar_cnpj("04252011000110")
        True
        >>> validar_cnpj("11.111.111/1111-11")
        False
    """

    # Remove qualquer caractere que não seja número
    cnpj = re.sub(r"\D", "", cnpj)

    if len(cnpj) != 14:
        return False

    # Elimina casos de repetição (ex: 00000000000000)
    if cnpj == cnpj[0] * 14:
        return False

    def calcular_digito(cnpj_parcial, pesos):
        soma = sum(int(digito) * peso for digito, peso in zip(cnpj_parcial, pesos))
        resto = soma % 11
        return "0" if resto < 2 else str(11 - resto)

    # Pesos para os dois cálculos
    pesos_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    pesos_2 = [6] + pesos_1

    # Calcula primeiro dígito
    digito_1 = calcular_digito(cnpj[:12], pesos_1)

    # Calcula segundo dígito
    digito_2 = calcular_digito(cnpj[:12] + digito_1, pesos_2)

    return cnpj[-2:] == digito_1 + digito_2


if __name__ == "__main__":
    # Testes
    cnpjs_teste = [
        "04.252.011/0001-10",  # válido
        "04252011000110",      # válido
        "11.111.111/1111-11",  # inválido
        "00000000000000",      # inválido
        "12345678000195"       # inválido
    ]

    for c in cnpjs_teste:
        print(f"{c} -> {validar_cnpj(c)}")
