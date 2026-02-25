from livro import Livro

class Usuario:
    def __init__(self, nome: str, user_id: int, livros=None) -> None:
        self.__nome = nome
        self.__id = user_id
        self.__livros = livros if livros is not None else []

    def to_dict(self) -> dict[str, str]:
        return {
            "nome": self.__nome,
            "id": self.__id,
            "livros": [l.to_dict() for l in self.__livros]
        }

    def get_id(self) -> int:
        return self.__id

    def get_nome(self) -> str:
        return self.__nome

    def emprestar_livro(self, livro: Livro) -> None:
        if len(self.__livros) >= 3:
            raise ValueError("Usuário já possui 3 livros.")
        self.__livros.append(livro)

    def devolver_livro(self, livro: Livro) -> None:
        if livro not in self.__livros:
            raise ValueError("Livro não está com o usuário.")
        self.__livros.remove(livro)

    def listar_livros(self) -> list[Livro]:
        return self.__livros