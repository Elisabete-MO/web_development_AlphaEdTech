import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeNotifier extends StateNotifier<ThemeMode> {
  ThemeNotifier() : super(ThemeMode.system) {
    _carregarTema();
  }

  static const _key = 'theme_mode';

  Future<void> _carregarTema() async {
    final prefs = await SharedPreferences.getInstance();
    final valor = prefs.getString(_key);

    if (valor != null) {
      state = ThemeMode.values.firstWhere(
            (e) => e.name == valor,
        orElse: () => ThemeMode.system,
      );
    }
  }

  Future<void> _salvarTema(ThemeMode mode) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, mode.name);
  }

  void alternarTema() {
    if (state == ThemeMode.system) {
      state = ThemeMode.light;
    } else if (state == ThemeMode.light) {
      state = ThemeMode.dark;
    } else {
      state = ThemeMode.system;
    }

    _salvarTema(state);
  }
}

final themeProvider =
StateNotifierProvider<ThemeNotifier, ThemeMode>(
      (ref) => ThemeNotifier(),
);