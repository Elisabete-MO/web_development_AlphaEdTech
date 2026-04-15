import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'dart:convert';

class NotificationService {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  Future<String?> getToken() async {
    return await _messaging.getToken();
  }

  Future<void> init(Function(String route) onNavigate) async {
    // 🔔 Permissão
    await _messaging.requestPermission();
    
    // Configurar Local Notifications para Foreground
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
        
    const InitializationSettings initializationSettings =
        InitializationSettings(
      android: initializationSettingsAndroid,
    );

    await _localNotificationsPlugin.initialize(
      settings: initializationSettings,
      onDidReceiveNotificationResponse: (NotificationResponse response) {
        if (response.payload != null) {
          try {
            final Map<String, dynamic> data = json.decode(response.payload!);
            final route = data['route'];
            if (route != null) {
              onNavigate(route);
            }
          } catch (e) {
            print("Erro ao dar parse no payload: $e");
          }
        }
      },
    );

    // Canal Android High Importance
    const AndroidNotificationChannel channel = AndroidNotificationChannel(
      'high_importance_channel', // id
      'High Importance Notifications', // title
      description: 'Este canal é usado para notificações importantes.', // description
      importance: Importance.max,
    );

    await _localNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(channel);

    // 🔑 Token
    final token = await _messaging.getToken();
    print('TOKEN: $token');

    // 📩 Foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('Foreground message: ${message.notification?.title}');
      
      RemoteNotification? notification = message.notification;
      AndroidNotification? android = message.notification?.android;
      
      if (notification != null && android != null) {
        _localNotificationsPlugin.show(
          id: notification.hashCode,
          title: notification.title,
          body: notification.body,
          notificationDetails: NotificationDetails(
            android: AndroidNotificationDetails(
              channel.id,
              channel.name,
              channelDescription: channel.description,
              icon: '@mipmap/ic_launcher',
            ),
          ),
          payload: json.encode(message.data),
        );
      }
    });

    // 📲 Quando app está aberto em background e usuário clica
    FirebaseMessaging.onMessageOpenedApp.listen((message) {
      final route = message.data['route'];
      if (route != null) {
        onNavigate(route);
      }
    });

    // 📴 App fechado → usuário abriu pela notificação
    final initialMessage = await _messaging.getInitialMessage();
    if (initialMessage != null) {
      final route = initialMessage.data['route'];
      if (route != null) {
        onNavigate(route);
      }
    }
  }

  Future<void> subscribe(String topic) async {
    await _messaging.subscribeToTopic(topic);
  }

  Future<void> unsubscribe(String topic) async {
    await _messaging.unsubscribeFromTopic(topic);
  }
}