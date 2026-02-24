from biblioteca import Biblioteca
from livro import Livro
from usuario import Usuario


def menu():
    biblioteca = Biblioteca()

    while True:
        print("\n1. Cadastrar Livro")
        print("2. Cadastrar Usuário")
        print("3. Emprestar Livro")
        print("4. Devolver Livro")
        print("5. Pesquisar Livro")
        print("6. Listar Todos os Livros")
        print("7. Listar Livros Emprestados")
        print("8. Listar Livros Disponíveis")
        print("9. Sair")

        opcao = input("Escolha: ")

        try:
            if opcao == "1":
                titulo = input("Título: ")
                autor = input("Autor: ")
                isbn = input("ISBN: ")
                biblioteca.cadastrar_livro(Livro(titulo, autor, isbn))
                print("Livro cadastrado.")

            elif opcao == "2":
                nome = input("Nome: ")
                user_id = input("ID: ")
                biblioteca.cadastrar_usuario(Usuario(nome, user_id))
                print("Usuário cadastrado.")

            elif opcao == "3":
                user_id = input("ID do usuário: ")
                isbn = input("ISBN do livro: ")
                biblioteca.emprestar_livro(user_id, isbn)
                print("Livro emprestado.")
            
            elif opcao == "4":
                user_id = input("ID do usuário: ")
                isbn = input("ISBN do livro: ")
                biblioteca.devolver_livro(user_id, isbn)
                print("Livro devolvido.")
            
            elif opcao == "5":
                termo = input("Termo de busca: ")
                livros = biblioteca.pesquisar_livro(termo)
                for livro in livros:
                    print(livro)
            
            elif opcao == "6":
                livros = biblioteca.listar_todos()
                for livro in livros:
                    print(livro)
            
            elif opcao == "7":
                user_id = input("ID do usuário: ")
                livros = biblioteca.listar_emprestados(user_id)
                for livro in livros:
                    print(livro)
            
            elif opcao == "8":
                livros = biblioteca.listar_disponiveis()
                for livro in livros:
                    print(livro)
            
            elif opcao == "9":
                break

        except ValueError as e:
            print("Erro:", e)


if __name__ == "__main__":
    menu()