Implemente um sistema de biblioteca com as seguintes classes e funcionalidades:

### Classe Livro:

● Atributos privados: título, autor, ISBN, emprestado (True ou False)
● Método construtor recebendo os 3 primeiros atributos (emprestado começa False)
● Métodos get para acessar os atributos
● Método para exibir informações do livro numa string formatada
● Métodos para emprestar e devolver o livro (alteram o atributo emprestado)

### Classe Usuario:

● Atributos privados: nome, ID, lista de livros emprestados
● Método construtor recebendo nome e ID
● Métodos para:
    ○ Emprestar um livro (adicionar à sua lista), recebe um livro como parâmetro
    ○ Devolver um livro (remover da sua lista), recebe um livro como parâmetro
    ○ Listar livros emprestados
    ○ Ver quantidade de livros emprestados

### Classe Biblioteca:

● Atributos privados: lista de livros do acervo, lista de usuários cadastrados
● Métodos para:
    ○ Cadastrar novo livro no acervo, recebe um livro como parâmetro
    ○ Cadastrar novo usuário, recebe um usuário como parâmetro
    ○ Emprestar livro (verificar se livro existe e está disponível)
    ○ Receber livro devolvido
    ○ Pesquisar livro por título ou autor (dado o termo de busca, pesquisa livro onde o autor ou o título contenham o termo de busca)
    ○ Listar todos os livros
    ○ Listar livros emprestados e disponíveis

### Interface com Usuário:

Crie um menu interativo no terminal com as seguintes opções:

1. Cadastrar Livro
2. Cadastrar Usuário
3. Emprestar Livro (pergunta o ID do usuário e o ISBN do livro)
4. Devolver Livro (pergunta o ID do usuário e o ISBN do livro)
5. Pesquisar Livro (pergunta o termo de busca)
6. Listar Todos os Livros
7. Listar Livros Emprestados (pergunta o ID do usuário)
8. Listar Livros Disponíveis (i.e. que não estão emprestados a ninguém)
9. Sair

O programa deve continuar rodando até que a opção "Sair" seja escolhida.

### Regras de Negócio:

● Um usuário pode ter no máximo 3 livros emprestados simultaneamente
● Não pode emprestar um livro já emprestado
● O ISBN deve ser único para cada livro
● O ID deve ser único para cada usuário

### Obs:

● Para simplificar, nesta biblioteca não existe o conceito de “cópias” de um livro. Cada livro tem somente 1 cópia.
● Os detalhes do exercício ficam a seu critério, desde que o sistema funcione sensatamente.