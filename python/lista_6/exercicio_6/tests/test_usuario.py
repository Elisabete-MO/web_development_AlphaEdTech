import pytest
from usuario import Usuario
from livro import Livro

@pytest.fixture
def usuario():
    return Usuario("Ana", "1", [])

@pytest.fixture
def livro():
    return Livro("Teste", "Autor", "123")

def test_usuario_inicia_com_nome_e_id(usuario):
    assert usuario.nome == "Ana"
    assert usuario.id == "1"

def test_usuario_inicia_sem_livros(usuario):
    assert len(usuario.livros) == 0

def test_emprestar_livro(usuario, livro):
    usuario.emprestar_livro(livro)
    assert livro.esta_emprestado()

def test_devolver_livro(usuario, livro):
    usuario.emprestar_livro(livro)
    usuario.devolver_livro(livro)
    assert not livro.esta_emprestado()

def test_limite_tres_livros(usuario):
    l1 = Livro("L1", "A", "1")
    l2 = Livro("L2", "A", "2")
    l3 = Livro("L3", "A", "3")
    l4 = Livro("L4", "A", "4")

    usuario.emprestar_livro(l1)
    usuario.emprestar_livro(l2)
    usuario.emprestar_livro(l3)

    with pytest.raises(ValueError):
        usuario.emprestar_livro(l4)

def test_listar_livros(usuario):
    l1 = Livro("L1", "A", "1")
    l2 = Livro("L2", "A", "2")

    usuario.emprestar_livro(l1)
    usuario.emprestar_livro(l2)

    assert len(usuario.listar_livros()) == 2