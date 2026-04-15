// Exercício 7: Sistema Completo de Notificações
//
// Implemente um sistema completo de notificações push com as seguintes funcionalidades: tela de configurações de notificação onde o usuário pode gerenciar inscrições em tópicos; tratamento de mensagens em foreground com exibição de notificação local; tratamento de mensagens em background; subscriptions a tópicos como ‘promotions’, ‘news’ e ‘updates’; interface para copiar o token do dispositivo.
//
// Requisitos mínimos: O sistema deve solicitar permissões corretamente; os tópicos devem ser gerenciados via FirebaseMessaging; as notificações devem funcionar tanto em foreground quanto em background; o payload da notificação deve ser utilizado para navegação.
//
// Investigação avançada: Investigue como implementar notificações-rich com imagens grandes (BigPictureStyleInformation) e botões de ação (AndroidNotificationAction). Como você lidaria com o caso de o usuário clicar em uma notificação enquanto o aplicativo está fechado? Qual é o fluxo completo desde o recebimento da notificação até a navegação para a tela correta?

import 'package:flutter/material.dart';
import 'notifications/firebase_setup.dart';
import 'notifications/notification_service.dart';
import 'router/router_app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    // 1. Inicializa o Firebase e registra o Background Handler top-level
    await initFirebase();
    
    // 2. Inicializa o serviço de Local Notifications e configura os Listeners Foreground/Click
    final notificationService = NotificationService();
    await notificationService.init((route) {
      // 3. Callback invocado para navegar baseado no payload usando o GoRouter instanciado globalmente
      appRouter.push(route);
    });
  } catch (e) {
    debugPrint('Falha ao iniciar Firebase (provavelmente ausência de config Web): $e');
  }

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Notificações App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      routerConfig: appRouter,
    );
  }
}