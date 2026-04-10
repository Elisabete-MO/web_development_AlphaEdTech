void main() {
  // Record com campos posicionais e nomeados
  var pessoa = ("Pessoa", 25, cidade: "São Paulo");

  // Desconstrução de Record
  var (nome, idade, :cidade) = pessoa;

  print("Nome: $nome, Idade: $idade, Cidade: $cidade");

  // Pattern Matching com switch
  switch (pessoa) {
    case ("Pessoa", int idade, cidade: "São Paulo"):
      print("É a Pessoa de SP com $idade anos");
      break;

    case (_, _, cidade: "Rio de Janeiro"):
      print("Pessoa do Rio");
      break;

    default:
      print("Outra pessoa");
  }

  // Pattern Matching com if-case
  if (pessoa case (String nome, int idade, cidade: String cidade)) {
    print("Validado via if-case: $nome tem $idade anos e mora em $cidade");
  }
}