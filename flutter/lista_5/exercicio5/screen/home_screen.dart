import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  final void Function(Locale locale) onChangeLanguage;

  const HomeScreen({
    super.key,
    required this.onChangeLanguage,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(loc.home)),
      body: Column(
        children: [
          Text(loc.welcome),

          const SizedBox(height: 20),

          ElevatedButton(
            onPressed: () => onChangeLanguage(const Locale('pt')),
            child: const Text('Português'),
          ),

          ElevatedButton(
            onPressed: () => onChangeLanguage(const Locale('en')),
            child: const Text('English'),
          ),

          ElevatedButton(
            onPressed: () => onChangeLanguage(const Locale('es')),
            child: const Text('Español'),
          ),

          ElevatedButton(
            onPressed: () {
              context.go('/format');
            },
            child: const Text('Ver formatação'),
          ),
        ],
      ),
    );
  }
}