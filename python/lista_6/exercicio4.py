# Crie classes para formas geométricas com:
# Classes `Retangulo`, `Circulo` e `Triangulo`
# Implemente o cálculo específico de área para cada forma, implementando em cada uma o método `calcular_area()`
# Crie uma função que recebe uma lista de formas e retorna a soma de suas áreas

import math

class FormaGeometrica:
    def calcular_area(self):
        raise NotImplementedError("Subclasse deve implementar este método")

class Retangulo(FormaGeometrica):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def calcular_area(self):
        return self.base * self.altura

class Circulo(FormaGeometrica):
    def __init__(self, raio):
        self.raio = raio

    def calcular_area(self):
        return math.pi * self.raio ** 2

class Triangulo(FormaGeometrica):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def calcular_area(self):
        return (self.base * self.altura) / 2

def soma_areas(formas):
    total = 0
    for forma in formas:
        total += forma.calcular_area()
    return total

# Teste
retangulo = Retangulo(10, 5)
cirulo = Circulo(3)
triangulo = Triangulo(4, 6)

formas = [retangulo, cirulo, triangulo]

print(f"Área do retângulo: {retangulo.calcular_area():.2f}")
print(f"Área do círculo: {cirulo.calcular_area():.2f}")
print(f"Área do triângulo: {triangulo.calcular_area():.2f}")
print(f"Soma das áreas: {soma_areas(formas):.2f}")