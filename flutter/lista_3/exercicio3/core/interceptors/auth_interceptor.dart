import 'package:dio/dio.dart';

class AuthInterceptor extends Interceptor {
  String? _token;

  // Simula storage de token
  void setToken(String token) {
    _token = token;
  }

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (_token != null) {
      options.headers['Authorization'] = 'Bearer $_token';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      print('⚠️ Token expirado!');

      // Aqui você poderia:
      // - tentar refresh token
      // - redirecionar para login
    }

    handler.next(err);
  }
}