import 'package:flutter/material.dart';
import 'ddbutton.dart';
import 'student_input_form.dart';
import 'homepage.dart';
import 'nopendingforms.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      themeMode: ThemeMode.dark,
      title: 'Flutter Demo',
      darkTheme: ThemeData.dark().copyWith(),
      // home: const page1(),
      home: const homepage(),
      // home: const NoPendingForms(),
    );
  }
}
