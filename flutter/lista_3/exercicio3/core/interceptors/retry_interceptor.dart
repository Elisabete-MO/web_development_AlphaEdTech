import 'dart:async';
import 'package:dio/dio.dart';

class RetryInterceptor extends Interceptor {
  final Dio dio;

  RetryInterceptor(this.dio);

  final int maxRetries = 3;

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    final requestOptions = err.requestOptions;

    int retryCount = requestOptions.extra['retryCount'] ?? 0;

    if (_shouldRetry(err) && retryCount < maxRetries) {
      retryCount++;
      requestOptions.extra['retryCount'] = retryCount;

      final delay = _getBackoffDelay(retryCount);
      print('🔁 Retry $retryCount em ${delay.inMilliseconds}ms');

      await Future.delayed(delay);

      try {
        final response = await dio.fetch(requestOptions);
        return handler.resolve(response);
      } catch (e) {
        return handler.next(err);
      }
    }

    handler.next(err);
  }

  bool _shouldRetry(DioException err) {
    return err.type == DioExceptionType.connectionError ||
        err.type == DioExceptionType.connectionTimeout;
  }

  Duration _getBackoffDelay(int retryCount) {
    return Duration(milliseconds: 500 * (1 << retryCount)); // exponential
  }
}