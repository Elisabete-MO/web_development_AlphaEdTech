// Exercício 10 - Prática Integrada
//
// Objetivo: Integrar todos os conceitos aprendidos.
//
// Tarefa: Crie um app completo chamado “Agenda de Contatos” com:
//
// 1. Tela Lista de Contatos (StatefulWidget):
//   o Lista de contatos com nome e telefone
//   o Botão flutuante para adicionar novo contato
//   o Search/filtragem de contatos
// 2. Tela Formulário de Contato (StatefulWidget):
//   o Campos: nome (obrigatório), telefone, e-mail (opcional)
//   o Validação completa
//   o Botão salvar que retorna para a lista
// 3. Sistema de Temas:
//   o Alternância light/dark no drawer lateral
//   o Tema se mantém durante uso
// 4. Responsividade:
//   o Layout diferente para celular vs tablet (use LayoutBuilder)
//
// Entrega: Código completo de todas as telas, com navegação, validação, temas e responsividade funcionando.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

// 🔥 Estado global do tema
final ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.light);

// 🔹 Modelo
class Contato {
  String nome;
  String telefone;
  String email;

  Contato({required this.nome, this.telefone = '', this.email = ''});
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: themeNotifier,
      builder: (context, ThemeMode mode, _) {
        return MaterialApp(
          title: 'Agenda de Contatos',

          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.blue,
              brightness: Brightness.light,
            ),
          ),

          darkTheme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.deepPurple,
              brightness: Brightness.dark,
            ),
          ),

          themeMode: mode,
          home: const ListaContatosPage(),
        );
      },
    );
  }
}

////////////////////////////////////////////////////////////
/// 🏠 LISTA DE CONTATOS
////////////////////////////////////////////////////////////

class ListaContatosPage extends StatefulWidget {
  const ListaContatosPage({super.key});

  @override
  State<ListaContatosPage> createState() => _ListaContatosPageState();
}

class _ListaContatosPageState extends State<ListaContatosPage> {
  final List<Contato> contatos = [];

  String busca = '';

  @override
  Widget build(BuildContext context) {
    final filtrados = contatos
        .where((c) => c.nome.toLowerCase().contains(busca.toLowerCase()))
        .toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Contatos')),

      drawer: Drawer(
        child: ListView(
          children: [
            const DrawerHeader(child: Text('Configurações')),

            SwitchListTile(
              title: const Text('Modo escuro'),
              value: themeNotifier.value == ThemeMode.dark,
              onChanged: (value) {
                themeNotifier.value = value ? ThemeMode.dark : ThemeMode.light;
              },
            ),
          ],
        ),
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final novo = await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const FormContatoPage()),
          );

          if (novo != null) {
            setState(() {
              contatos.add(novo);
            });
          }
        },
        child: const Icon(Icons.add),
      ),

      body: LayoutBuilder(
        builder: (context, constraints) {
          final isTablet = constraints.maxWidth > 600;

          return Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(8),
                child: TextField(
                  decoration: const InputDecoration(labelText: 'Buscar'),
                  onChanged: (value) {
                    setState(() {
                      busca = value;
                    });
                  },
                ),
              ),

              Expanded(
                child: isTablet
                    ? GridView.count(
                        crossAxisCount: 2,
                        children: filtrados.map((c) => _buildCard(c)).toList(),
                      )
                    : ListView(
                        children: filtrados
                            .map(
                              (c) => ListTile(
                                title: Text(c.nome),
                                subtitle: Text(c.telefone),
                              ),
                            )
                            .toList(),
                      ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildCard(Contato c) {
    return Card(
      margin: const EdgeInsets.all(8),
      child: ListTile(title: Text(c.nome), subtitle: Text(c.telefone)),
    );
  }
}

////////////////////////////////////////////////////////////
/// ✏️ FORMULÁRIO
////////////////////////////////////////////////////////////

class FormContatoPage extends StatefulWidget {
  const FormContatoPage({super.key});

  @override
  State<FormContatoPage> createState() => _FormContatoPageState();
}

class _FormContatoPageState extends State<FormContatoPage> {
  final _formKey = GlobalKey<FormState>();

  final nomeController = TextEditingController();
  final telefoneController = TextEditingController();
  final emailController = TextEditingController();

  void _salvar() {
    if (_formKey.currentState!.validate()) {
      final contato = Contato(
        nome: nomeController.text,
        telefone: telefoneController.text,
        email: emailController.text,
      );

      Navigator.pop(context, contato);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Novo Contato')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: nomeController,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Nome obrigatório';
                  }
                  return null;
                },
              ),

              const SizedBox(height: 10),

              TextFormField(
                controller: telefoneController,
                decoration: const InputDecoration(labelText: 'Telefone'),
              ),

              const SizedBox(height: 10),

              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'E-mail'),
                validator: (value) {
                  if (value == null || value.isEmpty) return null;

                  final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');

                  if (!emailRegex.hasMatch(value)) {
                    return 'E-mail inválido';
                  }
                  return null;
                },
              ),

              const SizedBox(height: 20),

              ElevatedButton(onPressed: _salvar, child: const Text('Salvar')),
            ],
          ),
        ),
      ),
    );
  }
}
