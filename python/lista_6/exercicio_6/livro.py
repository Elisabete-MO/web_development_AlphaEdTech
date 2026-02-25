class Livro:
    def __init__(self, titulo: str, autor: str, isbn: str) -> None:
        self.__titulo = titulo
        self.__autor = autor
        self.__isbn = isbn
        self.__disponivel = True

    def to_dict(self) -> dict[str, str]:
        return {
            "titulo": self.__titulo,
            "autor": self.__autor,
            "isbn": self.__isbn,
            "disponivel": self.__disponivel
        }

    def get_titulo(self) -> str:
        return self.__titulo

    def get_autor(self) -> str:
        return self.__autor

    def get_isbn(self) -> str:
        return self.__isbn

    def esta_emprestado(self) -> bool:
        return self.__disponivel

    def emprestar(self) -> None:
        if not self.__disponivel:
            raise ValueError("Livro já está emprestado.")
        self.__disponivel = False

    def devolver(self) -> None:
        self.__disponivel = True

    def __str__(self) -> str:
        status = "Emprestado" if self.__disponivel else "Disponível"
        return f"{self.__titulo} - {self.__autor} (ISBN: {self.__isbn}) | {status}"