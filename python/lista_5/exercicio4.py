def media_movel(array, janela):
    """
    Calcula a média móvel de um array de valores.
    
    Parâmetros:
        array (list ou tuple): lista de números.
        janela (int): tamanho da janela para a média móvel.
        
    Retorna:
        list: lista com a média móvel.
    """
    if janela < 1:
        raise ValueError("O tamanho da janela deve ser pelo menos 1.")
    
    medias = []
    for i in range(len(array) - janela + 1):
        sub_janela = array[i:i+janela]
        medias.append(sum(sub_janela) / janela)
    
    return medias

# Exemplo de uso
valores = [10, 20, 30, 40, 50, 60]
window_size = 3
resultado = media_movel(valores, window_size)
print(f'Dados de entrada: {valores}')
print(f'Janela: {window_size}')
print(f'Média móvel: {resultado}')  # Saída: [20.0, 30.0, 40.0, 50.0]
