import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'notification_service.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({super.key});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  final NotificationService _service = NotificationService();
  String _token = "Carregando...";
  
  // Em uma app real, leríamos do cache/shared_prefs para iniciar:
  bool _promotions = false;
  bool _news = false;
  bool _updates = false;

  @override
  void initState() {
    super.initState();
    _fetchToken();
  }

  Future<void> _fetchToken() async {
    final t = await _service.getToken();
    setState(() {
      _token = t ?? 'Token não gerado';
    });
  }

  void _toggleTopic(String topic, bool value) {
    if (value) {
      _service.subscribe(topic);
    } else {
      _service.unsubscribe(topic);
    }
  }

  void _copyToken() {
    Clipboard.setData(ClipboardData(text: _token));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Token copiado!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Configurações de Notificação'),
      ),
      body: ListView(
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('Tópicos de Interesse', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ),
          SwitchListTile(
            title: const Text('Promoções'),
            value: _promotions,
            onChanged: (value) {
              setState(() => _promotions = value);
              _toggleTopic('promotions', value);
            },
          ),
          SwitchListTile(
            title: const Text('Novidades (News)'),
            value: _news,
            onChanged: (value) {
              setState(() => _news = value);
              _toggleTopic('news', value);
            },
          ),
          SwitchListTile(
            title: const Text('Atualizações (Updates)'),
            value: _updates,
            onChanged: (value) {
              setState(() => _updates = value);
              _toggleTopic('updates', value);
            },
          ),
          const Divider(),
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('Token do Dispositivo (FCM)', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ),
          ListTile(
            title: Text(_token, style: const TextStyle(fontSize: 12, color: Colors.grey)),
            trailing: IconButton(
              icon: const Icon(Icons.copy),
              onPressed: _copyToken,
            ),
          ),
        ],
      ),
    );
  }
}