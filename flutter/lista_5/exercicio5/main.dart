// Exercício 5: Formatação de Dados Localizados
//
// Crie uma tela que exiba informações formatadas de acordo com o locale selecionado, incluindo: data completa formatada (dia, mês por extenso, ano); horário no formato 24h; moeda em Real brasileiro (R);moedaemDólaramericano(); número decimal com separador de milhares; percentual.
//
// Requisitos mínimos: Todos os formatadores devem utilizar o locale correto (use NumberFormat e DateFormat com locale explícito); o código deve funcionar corretamente para os três locales configurados no exercício anterior.
//
// Investigação: Investigue como o Flutter determina automaticamente o locale do dispositivo. É possível personalizar este comportamento? Como você faria para forçar um locale específico apenas para formatação de números enquanto mantêm o resto da interface em outro idioma?

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/app_localizations.dart';
import 'router/app_router.dart';

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
    final router = createRouter(setLocale);

    return MaterialApp.router(
      routerConfig: router,
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
    );
  }
}