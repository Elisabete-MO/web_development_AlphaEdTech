import 'dart:async';
import 'package:dio/dio.dart';

class SearchService {
  final Dio dio;

  SearchService(this.dio);

  CancelToken? _cancelToken;
  Timer? _debounce;

  // 🔍 Método principal
  Future<List<dynamic>> search(String query) async {
    // Debounce
    _debounce?.cancel();

    final completer = Completer<List<dynamic>>();

    _debounce = Timer(const Duration(milliseconds: 500), () async {
      // Cancela requisição anterior
      _cancelToken?.cancel("Nova busca iniciada");

      _cancelToken = CancelToken();

      try {
        final response = await dio.get(
          '/posts',
          queryParameters: {'q': query},
          cancelToken: _cancelToken,
        );

        completer.complete(response.data);
      } catch (e) {
        // 🔥 Aqui está o ponto chave
        if (e is DioException && e.type == DioExceptionType.cancel) {
          print('🔁 Requisição cancelada');
          completer.complete([]); // retorna vazio (não erro)
        } else {
          completer.completeError(e);
        }
      }
    });

    return completer.future;
  }

  // Opcional: limpar recursos
  void dispose() {
    _debounce?.cancel();
    _cancelToken?.cancel();
  }
}