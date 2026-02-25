import pytest
from livro import Livro

@pytest.fixture
def livro():
    return Livro("Teste", "Autor", "123")

@pytest.fixture
def livro_emprestado():
    livro = Livro("Teste", "Autor", "123")
    livro.emprestar()
    return livro

@pytest.fixture
def usuario():
    return Usuario("Ana", "1")


def test_livro_inicia_disponivel(livro):
    assert livro.esta_emprestado()


def test_emprestar_livro(livro):
    livro.emprestar()
    assert not livro.esta_emprestado()


def test_nao_emprestar_duas_vezes(livro):
    livro.emprestar()
    with pytest.raises(ValueError):
        livro.emprestar()


def test_devolver_livro(livro):
    livro.emprestar()
    livro.devolver()
    assert not livro.esta_emprestado()