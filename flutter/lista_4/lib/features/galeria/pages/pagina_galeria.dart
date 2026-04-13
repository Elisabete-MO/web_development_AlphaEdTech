import 'package:flutter/material.dart';

class PaginaGaleria extends StatelessWidget {
  const PaginaGaleria({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Galeria Responsiva')),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return LayoutBuilder(
            builder: (context, constraints) {
              final width = constraints.maxWidth;

              int crossAxisCount;

              if (width < 600) {
                crossAxisCount = 1;
              } else if (width < 900) {
                crossAxisCount = 2;
              } else {
                crossAxisCount = 4;
              }

              // 🔥 aumenta colunas no modo paisagem
              if (orientation == Orientation.landscape) {
                crossAxisCount += 1;
              }

              return GridView.builder(
                padding: const EdgeInsets.all(8),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                ),
                itemCount: 20,
                itemBuilder: (context, index) {
                  return Card(
                    child: Column(
                      children: [
                        Expanded(
                          child: Image.network(
                            'https://via.placeholder.com/300',
                            fit: BoxFit.cover,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8),
                          child: Text('Imagem ${index + 1}'),
                        ),
                      ],
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}