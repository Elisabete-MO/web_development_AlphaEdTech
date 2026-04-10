//Sintaxe Básica e Recursos Fundamentais 
//Objetivo: Praticar a sintaxe básica do Dart. 
//Tarefa: Escreva um programa Dart que: 
//1. Declare variáveis usando var, const, final e tipos explícitos. 
//2. Use operadores aritméticos, lógicos e ternários. 
//3. Implemente uma estrutura de controle if-else e switch-case. 
//4. Crie uma lista e um map, e itere sobre eles usando diferentes métodos.
//5. Use interpolação de strings e o operador de coalescência nula (??)
//Entrega: Arquivo .dart completo e funcional. 

void main() {
  // 1. Variáveis
  var nome = "Elisabeth"; // tipo inferido
  final idade = 25; // valor definido em runtime (não muda)
  const pi = 3.14; // valor constante em compile-time
  String cidade = "São Paulo"; // tipo explícito

  print("Nome: $nome, Idade: $idade, Cidade: $cidade");

  // 2. Operadores
  int a = 10;
  int b = 5;

  // Aritméticos
  print("Soma: ${a + b}");
  print("Multiplicação: ${a * b}");

  // Lógicos
  bool maiorDeIdade = idade >= 18 && idade < 60;
  print("Maior de idade: $maiorDeIdade");

  // Ternário
  String status = idade >= 18 ? "Adulto" : "Menor";
  print("Status: $status");

  // 3. if-else
  if (idade < 18) {
    print("Menor de idade");
  } else if (idade < 60) {
    print("Adulto");
  } else {
    print("Idoso");
  }

  // switch-case
  String dia = "segunda";

  switch (dia) {
    case "segunda":
      print("Início da semana");
      break;
    case "sexta":
      print("Quase fim de semana");
      break;
    default:
      print("Outro dia");
  }

  // 4. Lista
  List<String> frutas = ["Maçã", "Banana", "Laranja"];

  print("Lista de frutas:");
  for (var fruta in frutas) {
    print(fruta);
  }

  // Map
  Map<String, int> estoque = {"Maçã": 10, "Banana": 5, "Laranja": 8};

  print("Estoque:");
  estoque.forEach((fruta, quantidade) {
    print("$fruta: $quantidade");
  });

  // 5. Interpolação + coalescência nula
  String? apelido; // pode ser nulo

  String nomeExibicao = apelido ?? nome;

  print("Nome de exibição: $nomeExibicao");
}
