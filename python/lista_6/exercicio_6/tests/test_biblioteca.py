import pytest
from biblioteca import Biblioteca
from livro import Livro
from usuario import Usuario

@pytest.fixture
def biblioteca():
    return Biblioteca(carregar_dados=False)

@pytest.fixture
def livro():
    return Livro("Teste", "Autor", "123")

@pytest.fixture
def usuario():
    return Usuario("Ana", "1")


def test_cadastrar_livro(biblioteca, livro):
    biblioteca.cadastrar_livro(livro)
    assert len(biblioteca.listar_todos()) == 1


def test_cadastrar_livro_duplicado(biblioteca, livro):
    biblioteca.cadastrar_livro(livro)
    biblioteca.cadastrar_livro(livro)
    assert len(biblioteca.listar_todos()) == 1


def test_cadastrar_usuario(biblioteca, usuario):
    biblioteca.cadastrar_usuario(usuario)
    assert len(biblioteca._Biblioteca__usuarios) == 1


def test_buscar_usuario_por_id(biblioteca, usuario):
    biblioteca.cadastrar_usuario(usuario)
    assert biblioteca.buscar_usuario_por_id("1") == usuario


def test_buscar_usuario_por_id_inexistente(biblioteca, usuario):
    biblioteca.cadastrar_usuario(usuario)
    assert biblioteca.buscar_usuario_por_id("2") is None


def test_buscar_livro_por_isbn(biblioteca, livro):
    biblioteca.cadastrar_livro(livro)
    assert biblioteca.buscar_livro_por_isbn("123") == livro


def test_buscar_livro_por_isbn_inexistente(biblioteca, livro):
    biblioteca.cadastrar_livro(livro)
    assert biblioteca.buscar_livro_por_isbn("124") is None


def test_emprestar_livro(biblioteca, livro, usuario):
    biblioteca.cadastrar_livro(livro)
    biblioteca.cadastrar_usuario(usuario)

    biblioteca.emprestar_livro("1", "123")

    assert livro.esta_emprestado()
    assert len(usuario.listar_livros()) == 1


def test_emprestar_livro_inexistente(biblioteca, livro, usuario):
    biblioteca.cadastrar_livro(livro)
    biblioteca.cadastrar_usuario(usuario)

    biblioteca.emprestar_livro("1", "124")

    assert not livro.esta_emprestado()
    assert len(usuario.listar_livros()) == 0


def test_emprestar_livro_para_usuario_inexistente(biblioteca, livro, usuario):
    biblioteca.cadastrar_livro(livro)

    with pytest.raises(ValueError):
        biblioteca.emprestar_livro("999", "123")


def test_emprestar_livro_ja_emprestado(biblioteca, livro, usuario):
    biblioteca.cadastrar_livro(livro)
    biblioteca.cadastrar_usuario(usuario)

    biblioteca.emprestar_livro("1", "123")

    with pytest.raises(ValueError):
        biblioteca.emprestar_livro("1", "123")


def test_devolver_livro(biblioteca, livro, usuario):
    biblioteca.cadastrar_livro(livro)
    biblioteca.cadastrar_usuario(usuario)

    biblioteca.emprestar_livro("1", "123")
    biblioteca.devolver_livro("1", "123")

    assert not livro.esta_emprestado()
    assert len(usuario.listar_livros()) == 0


def test_listar_todos(biblioteca, livro):
    biblioteca.cadastrar_livro(livro)
    assert len(biblioteca.listar_todos()) == 1


def test_listar_emprestados(biblioteca, livro, usuario):
    biblioteca.cadastrar_livro(livro)
    biblioteca.cadastrar_usuario(usuario)
    biblioteca.emprestar_livro("1", "123")

    assert len(biblioteca.listar_emprestados()) == 1


def test_listar_disponiveis(biblioteca, livro):
    biblioteca.cadastrar_livro(livro)
    assert len(biblioteca.listar_disponiveis()) == 1