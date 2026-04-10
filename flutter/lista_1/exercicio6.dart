// Programação Orientada a Objetos
// Objetivo: Implementar conceitos de POO em Dart.
// Tarefa: Crie um sistema simples de gerenciamento de veículos usando os conceitos de POO:
//
// 1.Crie uma classe abstrata Veiculo com:
// o Propriedades: marca, modelo, ano
// o Método abstrato: buzinar()
// o Método concreto: informacoes()
//
// 2. Crie duas subclasses: Carro e Moto que herdem de Veiculo.
// 3. Implemente um mixin Corrida que adicione velocidade máxima.
// 4.Crie uma classe que use múltiplos mixins. Demonstre polimorfismo criando uma lista de veículos e iterando sobre ela.
// Entrega: Código completo com comentários explicando cada conceito usado

// Classe abstrata: não pode ser instanciada diretamente
abstract class Veiculo {
  String marca;
  String modelo;
  int ano;

  // Construtor
  Veiculo(this.marca, this.modelo, this.ano);

  // Método abstrato (sem implementação)
  void buzinar();

  // Método concreto (já tem implementação)
  void informacoes() {
    print("Marca: $marca, Modelo: $modelo, Ano: $ano");
  }
}

// Mixin: adiciona comportamento reutilizável
mixin Corrida {
  int velocidadeMaxima = 0;

  void mostrarVelocidade() {
    print("Velocidade máxima: $velocidadeMaxima km/h");
  }
}

// Outro mixin para demonstrar múltiplos mixins
mixin Eletrico {
  void tipoEnergia() {
    print("Este veículo é elétrico");
  }
}

// Subclasse Carro herdando de Veiculo e usando mixin
class Carro extends Veiculo with Corrida {
  Carro(String marca, String modelo, int ano, int velocidade)
      : super(marca, modelo, ano) {
    velocidadeMaxima = velocidade;
  }

  @override
  void buzinar() {
    print("Carro buzinando: Bii Bii!");
  }
}

// Subclasse Moto herdando de Veiculo e usando mixin
class Moto extends Veiculo with Corrida {
  Moto(String marca, String modelo, int ano, int velocidade)
      : super(marca, modelo, ano) {
    velocidadeMaxima = velocidade;
  }

  @override
  void buzinar() {
    print("Moto buzinando: Pii Pii!");
  }
}

// Classe usando múltiplos mixins
class CarroEletrico extends Veiculo with Corrida, Eletrico {
  CarroEletrico(String marca, String modelo, int ano, int velocidade)
      : super(marca, modelo, ano) {
    velocidadeMaxima = velocidade;
  }

  @override
  void buzinar() {
    print("Carro elétrico buzinando: Som suave...");
  }
}

void main() {
  // Polimorfismo: lista de Veiculo com objetos diferentes
  List<Veiculo> veiculos = [
    Carro("Toyota", "Corolla", 2020, 180),
    Moto("Honda", "CB500", 2021, 160),
    CarroEletrico("Tesla", "Model 3", 2022, 200),
  ];

  // Iterando sobre a lista
  for (var veiculo in veiculos) {
    veiculo.informacoes(); // método da classe base
    veiculo.buzinar();     // comportamento diferente (polimorfismo)

    // Verificando se tem mixin Corrida
    if (veiculo is Corrida) {
      veiculo.mostrarVelocidade();
    }

    // Verificando se tem mixin Eletrico
    if (veiculo is Eletrico) {
      veiculo.tipoEnergia();
    }

    print("----------------------");
  }
}