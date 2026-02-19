# Em um jogo de luta, crie uma função que analisa uma sequência de golpes e calcula o dano total do combo. A função deve receber os golpes como argumentos individuais (usando *args) e retornar uma tupla com o dano total e o nome do combo alcançado (se nenhum combo foi alcançado, None). 

# Regras de Combos: 

# Soco (S): 10 de dano 
# Chute (C): 20 de dano 
# Especial (E): 50 de dano 
# Combo Básico: S,S,C = +30% de dano 
# Combo Avançado: S,C,C,E = +50% de dano 
# Combo Secreto: E,E,S = +100% de dano

def calcular_combo(*golpes):
    """
    Analisa uma sequência de golpes e calcula o dano total, aplicando bônus de combo.

    Args:
        *golpes: Sequência de golpes como strings.
                 "S" = Soco (10 de dano)
                 "C" = Chute (20 de dano)
                 "E" = Especial (50 de dano)

    Returns:
        tuple: (dano_total, nome_combo)
               dano_total = int com o dano já aplicado o bônus do combo
               nome_combo = str com o nome do combo alcançado ou None

    Regras de Combos:
        Combo Básico: S,S,C  -> +30% de dano
        Combo Avançado: S,C,C,E -> +50% de dano
        Combo Secreto: E,E,S -> +100% de dano
    """

    # Dano base de cada golpe
    dano_golpe = {"S": 10, "C": 20, "E": 50}
    
    # Combos definidos
    combos = {
        "Combo Básico": ["S", "S", "C"],
        "Combo Avançado": ["S", "C", "C", "E"],
        "Combo Secreto": ["E", "E", "S"]
    }
    
    # Calcula dano base
    dano_total = sum(dano_golpe.get(g, 0) for g in golpes)

    # Inicializa combo encontrado
    combo_encontrado = None

    # Verifica se algum combo ocorre na sequência
    for nome, sequencia in combos.items():
        for i in range(len(golpes) - len(sequencia) + 1):
            if list(golpes[i:i+len(sequencia)]) == sequencia:
                combo_encontrado = nome
                # Aplica bônus
                if nome == "Combo Básico":
                    dano_total = int(dano_total * 1.3)
                elif nome == "Combo Avançado":
                    dano_total = int(dano_total * 1.5)
                elif nome == "Combo Secreto":
                    dano_total = int(dano_total * 2)
                break
        if combo_encontrado:
            break

    return dano_total, combo_encontrado


# Testes
if __name__ == "__main__":
    print(calcular_combo("S", "S", "C"))           # Combo Básico
    print(calcular_combo("S", "C", "C", "E"))     # Combo Avançado
    print(calcular_combo("E", "E", "S"))           # Combo Secreto
    print(calcular_combo("S", "C", "S"))           # Nenhum combo
    print(calcular_combo("C", "E", "S", "S", "C"))# Combo Básico dentro da sequência


