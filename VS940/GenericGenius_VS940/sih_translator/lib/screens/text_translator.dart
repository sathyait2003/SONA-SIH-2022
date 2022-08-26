import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:sih_translator/others/translate.dart';
import 'package:sih_translator/screens/image_camera_translation.dart';
import 'package:sih_translator/screens/pdf_translator.dart';
import 'package:sih_translator/screens/speech.dart';
import 'package:translator/translator.dart';

class Text_Converter extends StatefulWidget {
  const Text_Converter({Key? key}) : super(key: key);

  @override
  State<Text_Converter> createState() => _Text_ConverterState();
}

class _Text_ConverterState extends State<Text_Converter> {
  bool circular = true;

  String url = '';
  var languages = ['Hindi', 'English', 'Marathi', 'Tamil'];
  var originLanguage = "From";
  var destinationLanguage = "To";
  var output = "";
  var failure = "";
  
  

  TextEditingController languageController = TextEditingController();
  // int _selectedIndex = 0;
  // final _pageOptions = [
  //   SpeechText(),
  //   ImageCameraTranslation(),
  //   PdfTranslator()
  // ];

  void translate(String src, String desc, String input) async {
    // GoogleTranslator translator = new GoogleTranslator();
    // var translation = await translator.translate(input, from: src, to: desc);
    // url = 'https://anuvadak.herokuapp.com/';
    // var data = await fetchData(url);
    // var data1 = json.decode(data);

    setState(() {
      circular = true;
    });

    if (src == '--' || desc == '--') {
      setState(() {
        failure = 'Fail to translate';
      });
    } else {
      var data = await sendText(src, desc, input);
      setState(() {
        // output = translation.text.toString();
        // model = Model.fromJson(data1);
        // output = model.output;
        output = data;
        circular = false;
      });
      setState(() {
        failure = '';
      });
    }
  }

  String getLanguageCode(String language) {
    if (language == 'English') {
      return "en";
    } else if (language == 'Hindi') {
      return "hi";
    } else if (language == 'Marathi') {
      return "mr";
    } else if (language == 'Tamil') {
      return "ta";
    }
    return "--";
  }


  @override
  void initState() {
    super.initState();
    languageController.addListener(() => setState(() {}));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(image: AssetImage('assets/textHome.png'), fit: BoxFit.cover),
        ),
      child: Scaffold(
          backgroundColor: Colors.transparent,
        appBar: AppBar(
          leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.home_outlined),
        ),
          title: Text(
            'Bhashantar',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              letterSpacing: 2.0,
            ),
          ),
          centerTitle: true,
          backgroundColor: Color.fromRGBO(	85, 170, 17, 1),
          elevation: 0,
        ),
        body: GestureDetector(
          onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.blueGrey,
                        width: 1,
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        'Type To Translate',
                        style: TextStyle(
                          color: Colors.blueGrey,
                          fontSize: 18.0,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 50,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Center(
                          child: DropdownButton(
                              focusColor: Colors.transparent,
                              iconDisabledColor: Colors.transparent,
                              iconEnabledColor: Colors.transparent,
                              hint: Text(
                                originLanguage,
                                style: TextStyle(
                                    color: Colors.black, fontSize: 20.0),
                              ),
                              dropdownColor: Color.fromRGBO(	248,113,107, 1),
                              icon: Icon(Icons.keyboard_arrow_down),
                              items: languages.map((String dropDownStringItem) {
                                return DropdownMenuItem(
                                  child: Text(dropDownStringItem),
                                  value: dropDownStringItem,
                                );
                              }).toList(),
                              onChanged: (String? value) {
                                setState(() {
                                  originLanguage = value!;
                                });
                              }),
                        ),
                      ),
                      SizedBox(
                        width: 40,
                      ),
                      Icon(
                        Icons.arrow_right_alt_outlined,
                        color: Colors.black,
                        size: 40,
                      ),
                      SizedBox(
                        width: 40,
                      ),
                      Expanded(
                        child: Center(
                          child: DropdownButton(
                              focusColor: Colors.transparent,
                              iconDisabledColor: Colors.transparent,
                              iconEnabledColor: Colors.transparent,
                              hint: Text(
                                destinationLanguage,
                                style: TextStyle(
                                    color: Colors.black, fontSize: 20.0),
                              ),
                              dropdownColor: Color.fromRGBO(	248,113,107, 1),
                              icon: Icon(Icons.keyboard_arrow_down),
                              items: languages.map((String dropDownStringItem) {
                                return DropdownMenuItem(
                                  child: Text(dropDownStringItem),
                                  value: dropDownStringItem,
                                );
                              }).toList(),
                              onChanged: (String? value) {
                                setState(() {
                                  destinationLanguage = value!;
                                });
                              }),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 40,
                  ),
                  Padding(
                    padding: EdgeInsets.fromLTRB(15.0, 0.0, 15.0, 0.0),
                    child: TextFormField(
                      textInputAction: TextInputAction.done,
                      cursorColor: Colors.black,
                      autofocus: false,
                      style: TextStyle(color: Colors.black, fontSize: 20.0),
                      decoration: InputDecoration(
                        prefixIcon: Icon(
                          Icons.text_snippet_outlined,
                          color: Colors.black,
                        ),
                        suffixIcon: languageController.text.isEmpty
                            ? Container(
                                width: 0,
                              )
                            : IconButton(
                                icon: Icon(Icons.close),
                                onPressed: () => languageController.clear(),
                              ),
                        hintText: 'Text to translate',
                        hintStyle: TextStyle(
                            fontSize: 15,
                            color: Color.fromARGB(255, 211, 208, 208)),
                        labelText: 'Please enter your Text',
                        labelStyle: TextStyle(
                            fontSize: 18,
                            color: Color.fromARGB(255, 211, 208, 208)),
                        border: OutlineInputBorder(
                            borderSide:
                                BorderSide(color: Colors.blueGrey, width: 1)),
                        enabledBorder: OutlineInputBorder(
                            borderSide:
                                BorderSide(color: Colors.blueGrey, width: 1)),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                                color: Color.fromARGB(255, 222, 222, 222),
                                width: 2)),
                        errorStyle: TextStyle(color: Colors.red, fontSize: 15),
                      ),
                      controller: languageController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter text to translate';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.all(8),
                    child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            primary: Color.fromRGBO(	248,113,107, 1),
                            minimumSize: Size(60.0, 40.0)),
                        onPressed: languageController.text.isEmpty ? null : () {
                          translate(
                              getLanguageCode(originLanguage),
                              getLanguageCode(destinationLanguage),
                              languageController.text.toString());
                        },
                        child: Text(
                          "Translate",
                          style: TextStyle(fontSize: 20.0),
                        )),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  // Text(
                  //   "\n$output",
                  //   style: TextStyle(
                  //     color: Colors.black,
                  //     fontWeight: FontWeight.bold,
                  //     fontSize: 20,
                  //   ),
                  // ),
                  Center(
                      child: output != ''
                          ? circular
                              ? CircularProgressIndicator()
                              : Column(
                                  children: <Widget>[
                                    Text(
                                      failure == '' ?
                                      "\n$output" : failure,
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                  ],
                                )
                          : Column(
                              children: <Widget>[
                                Text(
                                  failure == '' ?
                                  "\n$output" : failure,
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20,
                                  ),
                                ),
                              ],
                            )),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}