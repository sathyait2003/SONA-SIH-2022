import 'package:flutter/material.dart';
import 'package:sih_translator/screens/input_selector.dart';
import 'package:sih_translator/screens/speech.dart';
import 'package:sih_translator/screens/text_translator.dart';
import 'package:sih_translator/screens/loading.dart';

void main() => runApp(MaterialApp(
      title: 'Anvadak',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => Loading(),
        '/input_selector' : (context) => InputSelector(),
        '/text_converter': (context) => Text_Converter(),
        '/speech_text': (context) => SpeechText(),
        // '/image_text' : (context) => ImageTranslator(),
      },
    ));
