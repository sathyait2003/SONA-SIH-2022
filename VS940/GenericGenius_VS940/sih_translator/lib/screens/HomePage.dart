import 'package:flutter/material.dart';
import 'package:sih_translator/screens/image_camera_translation.dart';
import 'package:sih_translator/screens/pdf_translator.dart';
import 'package:sih_translator/screens/speech.dart';
import 'package:sih_translator/screens/text_translator.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int selectedPage = 0;

  final _pageOptions = [
    Text_Converter(),
    SpeechText(),
    ImageCameraTranslation(),
    PdfTranslator()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromARGB(255, 223, 248, 211),
        body: _pageOptions[selectedPage],
        bottomNavigationBar: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(icon: Icon(Icons.text_fields_rounded, size: 30),label: 'Text'),
            BottomNavigationBarItem(icon: Icon(Icons.mic, size: 30), label: 'Speech'),
            BottomNavigationBarItem(icon: Icon(Icons.image, size: 30), label: 'Image'),
            BottomNavigationBarItem(icon: Icon(Icons.text_snippet_outlined, size: 30), label: 'Pdf'),
          ],
          selectedItemColor: Color.fromRGBO(	248,113,107, 1),
          elevation: 5.0,
          unselectedItemColor: Color.fromRGBO(	85, 170, 17, 1),
          currentIndex: selectedPage,
          backgroundColor: Color.fromRGBO(	208, 240, 192, 1),
          onTap: (index){
            setState(() {
              selectedPage = index;
            });
          },
        )
    );
  }
}