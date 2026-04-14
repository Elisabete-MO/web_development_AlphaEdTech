import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../screen/home_screen.dart';
import '../screen/format_screen.dart';

GoRouter createRouter(void Function(Locale) setLocale) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) {
          return HomeScreen(onChangeLanguage: setLocale);
        },
      ),
      GoRoute(
        path: '/format',
        builder: (context, state) {
          final locale = Localizations.localeOf(context);
          return FormatScreen(locale: locale);
        },
      ),
    ],
  );
}