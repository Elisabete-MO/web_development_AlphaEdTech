import json
import os
from livro import Livro
from usuario import Usuario


class Biblioteca:
    def __init__(self):
        self.__arquivo_livros = "livros.json"
        self.__arquivo_usuarios = "usuarios.json"
        self.__livros = []
        self.__usuarios = []
        self.__carregar_dados()

    def __carregar_dados(self):
        # carregar livros
        if os.path.exists(self.__arquivo_livros):
            with open(self.__arquivo_livros, "r", encoding="utf-8") as f:
                dados_livros = json.load(f)

        for l in dados_livros:
            self.__livros.append(Livro(l["titulo"], l["autor"], l["isbn"]))
            if l["emprestado"]:
                self.__livros[-1].emprestar()

        # carregar usuários
        if os.path.exists(self.__arquivo_usuarios):
            with open(self.__arquivo_usuarios, "r", encoding="utf-8") as f:
                dados_usuarios = json.load(f)

        for u in dados_usuarios:
            self.__usuarios.append(Usuario(u["nome"], u["id"]))
            for l in u["livros"]:
                self.__usuarios[-1].emprestar_livro(self.buscar_livro(l))

    def __salvar_dados(self):
        # salvar livros
        with open(self.__arquivo_livros, "w", encoding="utf-8") as f:
            json.dump(
                [l.to_dict() for l in self.__livros],
                f,
                indent=4,
                ensure_ascii=False
            )

        # salvar usuários
        with open(self.__arquivo_usuarios, "w", encoding="utf-8") as f:
            json.dump(
                [u.to_dict() for u in self.__usuarios],
                f,
                indent=4,
                ensure_ascii=False
            )

    def cadastrar_livro(self, livro):
        if any(l.get_isbn() == livro.get_isbn() for l in self.__livros):
            raise ValueError("ISBN já cadastrado.")
        self.__livros.append(livro)
        self.__salvar_dados()

    def cadastrar_usuario(self, usuario):
        if any(u.get_id() == usuario.get_id() for u in self.__usuarios):
            raise ValueError("ID já cadastrado.")
        self.__usuarios.append(usuario)
        self.__salvar_dados()

    def buscar_usuario(self, user_id):
        return next((u for u in self.__usuarios if u.get_id() == user_id), None)

    def buscar_livro(self, isbn):
        return next((l for l in self.__livros if l.get_isbn() == isbn), None)

    def emprestar_livro(self, user_id, isbn):
        usuario = self.buscar_usuario(user_id)
        livro = self.buscar_livro(isbn)

        if not usuario or not livro:
            raise ValueError("Usuário ou livro não encontrado.")
        if livro.esta_emprestado():
            raise ValueError("Livro já emprestado.")

        usuario.emprestar_livro(livro)
        livro.emprestar()
        livro.salvar()

    def devolver_livro(self, user_id, isbn):
        usuario = self.buscar_usuario(user_id)
        livro = self.buscar_livro(isbn)

        if not usuario or not livro:
            raise ValueError("Usuário ou livro não encontrado.")

        usuario.devolver_livro(livro)
        livro.devolver()
        livro.salvar()

    def pesquisar_livro(self, termo):
        termo = termo.lower()
        return [l for l in self.__livros
                if termo in l.get_titulo().lower()
                or termo in l.get_autor().lower()]

    def listar_todos(self):
        return self.__livros

    def listar_disponiveis(self):
        return [l for l in self.__livros if not l.esta_emprestado()]