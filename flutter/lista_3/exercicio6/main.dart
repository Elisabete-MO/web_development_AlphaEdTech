// Exercício 6: Converter JsonSerializable para API Complexa
//
// Objetivo: Utilizar json_serializable para geração automática de código de parsing.
//
// Contexto: Você está trabalhando em um projeto Flutter profissional e precisa implementar parsing de JSON para uma estrutura de API de analise do tempo:
//
// Requisitos:
// 1. Configure o pubspec.yaml com as dependências corretas
// 2. Crie as classes com annotations @JsonSerializable()
// 3. Use @JsonKey() para renomear campos (ex: zipcode para zipCode)
// 4. Implemente um conversor personalizado para DateTime (string ISO 8601 para DateTime)
// 5. Execute o build_runner para gerar o código
// 6. Demonstre uso criando uma instância a partir do JSON e convertendo de volta
//
// Pesquisa necessária:
// ● Quais são as annotations mais úteis do json_serializable?
// ● Como criar um conversor personalizado com JsonConverter?
//
// Entregável: Upload de código (.dart), arquivos envolvidos (main.dart e arquivos criados que sao chamados)

import 'dart:convert';
import 'models/weather.dart';

void main() {
  final json = {
    "location": {
      "city": "São Paulo",
      "zipcode": "12345-000"
    },
    "forecast": [
      {
        "date": "2026-04-13T10:00:00Z",
        "temperature": 25.5
      },
      {
        "date": "2026-04-14T10:00:00Z",
        "temperature": 27.0
      }
    ]
  };

  final weather = Weather.fromJson(json);

  print('Cidade: ${weather.location.city}');
  print('Data: ${weather.forecast.first.date}');
  print('Temp: ${weather.forecast.first.temperature}');

  final backToJson = weather.toJson();
  print(jsonEncode(backToJson));
}