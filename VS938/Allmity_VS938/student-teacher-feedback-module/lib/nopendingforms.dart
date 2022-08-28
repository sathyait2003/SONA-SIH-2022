import 'package:flutter/material.dart';

class NoPendingForms extends StatelessWidget {
  const NoPendingForms({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Page'),
      ),
      body: const Center(
        child: Text(
          'You have no pending forms.',
          style: TextStyle(
            fontSize: 20,
          ),
        ),
      ),
    );
  }
}
