import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final iniciarProvider = StateProvider<int>((ref) => 0);

final timerProvider = StreamProvider<int>((ref) async* {
  // escuta mudanças no botão "iniciar"
  ref.watch(iniciarProvider);

  for (int i = 60; i >= 0; i--) {
    yield i;
    await Future.delayed(const Duration(seconds: 1));
  }
});