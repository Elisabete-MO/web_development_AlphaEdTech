// Exercício 4: Configuração de Localização
//
// Configure uma aplicação Flutter para suportar internacionalização com três idiomas: português (pt), inglês (en) e espanhol (es). Utilize o sistema de geração automática de localizações do Flutter.
//
// Requisitos mínimos: Arquivo l10n.yaml configurado corretamente; arquivos ARB para os três idiomas com no mínimo 10 strings cada; AppLocalizations gerado automaticamente; SupportedLocales e LocalizationsDelegates configurados no MaterialApp.
//
// Dica: Siga exatamente a configuração apresentada na seção 2.2 do material, certifique-se de que o pubspec.yaml tenha ‘generate: true’ e execute ‘flutter gen-l10n’ se necessário.

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/app_localizations.dart';
import '../screen/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Locale _locale = const Locale('en');

  void setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      locale: _locale,
      supportedLocales: const [
        Locale('en'),
        Locale('pt'),
        Locale('es'),
      ],
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: HomeScreen(onChangeLanguage: setLocale),
    );
  }
}