class Usuario:
    def __init__(self, nome, user_id):
        self.__nome = nome
        self.__id = user_id
        self.__livros = []

    def get_id(self):
        return self.__id

    def get_nome(self):
        return self.__nome

    def emprestar_livro(self, livro):
        if len(self.__livros) >= 3:
            raise ValueError("Usuário já possui 3 livros.")
        self.__livros.append(livro)

    def devolver_livro(self, livro):
        if livro not in self.__livros:
            raise ValueError("Livro não está com o usuário.")
        self.__livros.remove(livro)

    def listar_livros(self):
        return self.__livros