class Livro:
    def __init__(self, titulo, autor, isbn):
        self.__titulo = titulo
        self.__autor = autor
        self.__isbn = isbn
        self.__emprestado = False

    def get_titulo(self):
        return self.__titulo

    def get_autor(self):
        return self.__autor

    def get_isbn(self):
        return self.__isbn

    def esta_emprestado(self):
        return self.__emprestado

    def emprestar(self):
        if self.__emprestado:
            raise ValueError("Livro já está emprestado.")
        self.__emprestado = True

    def devolver(self):
        self.__emprestado = False

    def __str__(self):
        status = "Emprestado" if self.__emprestado else "Disponível"
        return f"{self.__titulo} - {self.__autor} (ISBN: {self.__isbn}) | {status}"