import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class FormatScreen extends StatelessWidget {
  final Locale locale;

  const FormatScreen({
    super.key,
    required this.locale,
  });

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();

    // 🔥 DATE (dia, mês por extenso, ano)
    final dateFormat = DateFormat.yMMMMd(locale.toString());
    final formattedDate = dateFormat.format(now);

    // 🔥 TIME (24h)
    final timeFormat = DateFormat.Hm(locale.toString());
    final formattedTime = timeFormat.format(now);

    // 🔥 MOEDA BRL
    final brlFormat = NumberFormat.currency(
      locale: locale.toString(),
      symbol: 'R\$',
    );

    // 🔥 MOEDA USD
    final usdFormat = NumberFormat.currency(
      locale: locale.toString(),
      symbol: 'US\$',
    );

    // 🔥 NÚMERO com milhar e decimal
    final numberFormat = NumberFormat('#,##0.00', locale.toString());

    // 🔥 PERCENTUAL
    final percentFormat = NumberFormat.percentPattern(locale.toString());

    return Scaffold(
      appBar: AppBar(title: const Text('Formatação Localizada')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Data: $formattedDate'),
            const SizedBox(height: 8),

            Text('Hora: $formattedTime'),
            const SizedBox(height: 8),

            Text('BRL: ${brlFormat.format(1234.56)}'),
            const SizedBox(height: 8),

            Text('USD: ${usdFormat.format(1234.56)}'),
            const SizedBox(height: 8),

            Text('Número: ${numberFormat.format(1234567.89)}'),
            const SizedBox(height: 8),

            Text('Percentual: ${percentFormat.format(0.85)}'),
          ],
        ),
      ),
    );
  }
}
