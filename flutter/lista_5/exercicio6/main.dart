// Exercício 6: Configuração do Firebase Cloud Messaging
//
// Configure uma aplicação Flutter para utilizar Firebase Cloud Messaging, incluindo: criação e configuração de projeto no Firebase Console; configuração do arquivo google-services.json no Android; configuração do build.gradle com plugin do Google Services; implementação básica do FirebaseMessaging para obter o token do dispositivo.
//
// Requisitos mínimos: O Firebase deve ser inicializado corretamente no main(); o token do dispositivo deve ser exibido na interface; o código deve compilar e executar em um dispositivo Android real ou emulador.
//
// Investigação: Quais são as diferenças entre AuthorizationStatus.authorized e AuthorizationStatus.provisional no iOS? Quando cada um é utilizado? Além disso, pesquise o que é necessário para configurar FCM em aplicativos iOS (certificado APNs, entitlements, etc.).

import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(); // obrigatório
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String token = "Carregando...";

  @override
  void initState() {
    super.initState();
    getToken();
  }

  void getToken() async {
    FirebaseMessaging messaging = FirebaseMessaging.instance;

    String? t = await messaging.getToken();

    setState(() {
      token = t ?? "Sem token";
    });

    print("TOKEN: $t");
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("FCM Test")),
        body: Center(
          child: Text(token),
        ),
      ),
    );
  }
}