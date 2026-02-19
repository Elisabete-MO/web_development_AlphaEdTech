# Crie uma função que tenta modificar uma variável global chamada contador. Demonstre a diferença entre usar e não usar a palavra global. 

contador = 0

def ler_contador():
    print("Lendo contador:", contador)

def modificar_contador():
    global contador
    contador += 1
    print("Modificando com global:", contador)

def modificar_contador_sem_global():
    try:
        contador += 1
    except UnboundLocalError as e:
        print("Erro ao modificar sem global:", e)


if __name__ == "__main__":
    ler_contador()
    modificar_contador()
    modificar_contador_sem_global()
    print("Contador final:", contador)