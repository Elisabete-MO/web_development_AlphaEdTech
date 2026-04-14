import 'package:flutter/material.dart';

class AuthService extends ChangeNotifier {
  bool isLoggedIn = false;
  String? role; // 'admin' ou 'user'

  void login(String email) {
    isLoggedIn = true;

    if (email.contains('admin')) {
      role = 'admin';
    } else {
      role = 'user';
    }

    notifyListeners();
  }

  void logout() {
    isLoggedIn = false;
    role = null;
    notifyListeners();
  }
}

final authService = AuthService();