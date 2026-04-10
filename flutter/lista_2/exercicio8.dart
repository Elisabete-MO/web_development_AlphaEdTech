// Exercício 8 - Formulário de Cadastro
//
// Objetivo: Implementar validação de formulário completa.
//
// Tarefa: Baseado no código da seção 6.1 do material, crie um formulário de cadastro com os seguintes campos:
//
// ● Nome: obrigatório, mínimo 2 caracteres
// ● E-mail: obrigatório, formato válido (use RegExp)
// ● Senha: obrigatória, mínimo 8 caracteres, deve conter pelo menos 1 número
// ● Confirmar Senha: deve ser igual à senha
// ● Telefone: opcional, formato masks (XX) XXXXX-XXXX
//
// O formulário deve: - Mostrar erros inline abaixo de cada campo inválido - Exibir um Dialog de sucesso ao validar todos os campos - Limpar os campos após sucesso
//
// Entrega: Código completo do formulário com toda a validação.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: CadastroPage());
  }
}

class CadastroPage extends StatefulWidget {
  const CadastroPage({super.key});

  @override
  State<CadastroPage> createState() => _CadastroPageState();
}

class _CadastroPageState extends State<CadastroPage> {
  final _formKey = GlobalKey<FormState>();

  final nomeController = TextEditingController();
  final emailController = TextEditingController();
  final senhaController = TextEditingController();
  final confirmarSenhaController = TextEditingController();
  final telefoneController = TextEditingController();

  void _submit() {
    if (_formKey.currentState!.validate()) {
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Sucesso'),
          content: const Text('Cadastro realizado com sucesso!'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('OK'),
            ),
          ],
        ),
      );

      // limpar campos
      nomeController.clear();
      emailController.clear();
      senhaController.clear();
      confirmarSenhaController.clear();
      telefoneController.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cadastro')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              children: [
                // NOME
                TextFormField(
                  controller: nomeController,
                  decoration: const InputDecoration(labelText: 'Nome'),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Nome é obrigatório';
                    }
                    if (value.length < 2) {
                      return 'Mínimo 2 caracteres';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 12),

                // EMAIL
                TextFormField(
                  controller: emailController,
                  decoration: const InputDecoration(labelText: 'E-mail'),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'E-mail é obrigatório';
                    }
                    final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
                    if (!emailRegex.hasMatch(value)) {
                      return 'E-mail inválido';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 12),

                // SENHA
                TextFormField(
                  controller: senhaController,
                  obscureText: true,
                  decoration: const InputDecoration(labelText: 'Senha'),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Senha obrigatória';
                    }
                    if (value.length < 8) {
                      return 'Mínimo 8 caracteres';
                    }
                    if (!RegExp(r'\d').hasMatch(value)) {
                      return 'Deve conter ao menos 1 número';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 12),

                // CONFIRMAR SENHA
                TextFormField(
                  controller: confirmarSenhaController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Confirmar Senha',
                  ),
                  validator: (value) {
                    if (value != senhaController.text) {
                      return 'Senhas não coincidem';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 12),

                // TELEFONE
                TextFormField(
                  controller: telefoneController,
                  decoration: const InputDecoration(
                    labelText: 'Telefone (opcional)',
                    hintText: '(11) 99999-9999',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) return null;

                    final telefoneRegex = RegExp(r'^\(\d{2}\)\s\d{5}-\d{4}$');

                    if (!telefoneRegex.hasMatch(value)) {
                      return 'Formato inválido';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 20),

                ElevatedButton(
                  onPressed: _submit,
                  child: const Text('Cadastrar'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
