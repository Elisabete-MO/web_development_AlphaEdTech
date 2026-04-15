import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:go_router/go_router.dart';

void setupNotificationNavigation(GoRouter router) {
  FirebaseMessaging.onMessageOpenedApp.listen((message) {
    final route = message.data['route'];

    if (route != null) {
      router.go(route);
    }
  });
}