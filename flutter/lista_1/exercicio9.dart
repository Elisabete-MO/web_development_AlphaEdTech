import 'dart:isolate';

// Função que será executada no isolate
void tarefaPesada(SendPort sendPort) {
  int soma = 0;

  for (int i = 0; i < 100000000; i++) {
    soma += i;
  }

  // Envia o resultado de volta para o isolate principal
  sendPort.send(soma);
}

void main() async {
  // Canal de comunicação
  final receivePort = ReceivePort();

  print("Iniciando tarefa em paralelo...");

  // Cria um novo isolate
  await Isolate.spawn(tarefaPesada, receivePort.sendPort);

  // Escuta o resultado
  receivePort.listen((mensagem) {
    print("Resultado recebido: $mensagem");
    receivePort.close();
  });

  print("Main continua executando sem travar!");
}