import 'dart:math';
import 'dart:convert';
import 'package:avatar_glow/avatar_glow.dart';
import 'package:clipboard/clipboard.dart';
import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:translator/translator.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:sih_translator/others/translate.dart';
import '../api/speech_api.dart';

class SpeechText extends StatefulWidget {
  const SpeechText({Key? key}) : super(key: key);

  @override
  State<SpeechText> createState() => _SpeechTextState();
}

class _SpeechTextState extends State<SpeechText> {
  var languages = ['Hindi', 'English', 'Marathi', 'Tamil'];
  var originLanguage = "From";
  var destinationLanguage = "To";
  var output = "";

  _SpeechTextState() {
    _flutterTts.setLanguage("en");
    _flutterTts.setSpeechRate(0.4);
  }
  String _lastWords = '';
  bool isListening = false;
  final TextEditingController _controller = TextEditingController();
  final _flutterTts = FlutterTts();

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

  // @override
  // void initState() {
  //   super.initState();
  //   _initSpeech();
  // }

  /// This has to happen only once per app
  // void _initSpeech() async {
  //   _speechEnabled = await _speechToText.initialize();
  //   setState(() {});
  // }

  /// Each time to start a speech recognition session
  // void _startListening() async {
  //   await _speechToText.listen(onResult: _onSpeechResult);
  //   setState(() {});
  // }

  /// Manually stop the active speech recognition session
  /// Note that there are also timeouts that each platform enforces
  /// and the SpeechToText plugin supports setting timeouts on the
  /// listen method.
  // void _stopListening() async {
  //   await _speechToText.stop();
  //   setState(() {});
  // }

  void translate(String src, String desc, String input) async {
    // GoogleTranslator translator = new GoogleTranslator();
    // var translation = await translator.translate(input, from: src, to: desc);
    // setState(() {
    //   output = translation.text.toString();

    //   // print(output);
    // });

    if (src == '--' || desc == '--') {
      setState(() {
        output = 'Fail to translate';
      });
    } else {
      var data = await sendText(src, desc, input);
      setState(() {
        output = data;
        print(output);
      });
    }
  }

  /// This is the callback that the SpeechToText plugin calls when
  /// the platform returns recognized words.
  // void _onSpeechResult(SpeechRecognitionResult result) {
  //   setState(() {
  //     _lastWords = result.recognizedWords;
  //     print(_lastWords);
  //     translate('en', 'hi', _lastWords);
  //   });
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/speechHome.png"), fit: BoxFit.cover),
        ),
        alignment: Alignment.center,
        margin: EdgeInsets.all(8),
        child: Stack(
          children: <Widget>[
            Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  padding: EdgeInsets.all(16),
                  child:
                      Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                    // Text('Recognized words:', style: TextStyle(fontSize: 20.0, color: Colors.black),),
                    Builder(
                      builder: (context) => IconButton(
                          onPressed: () async {
                            await output != null
                                ? FlutterClipboard.copy(output)
                                : () {};

                            Scaffold.of(context).showSnackBar(
                                SnackBar(content: Text('Copied')));
                          },
                          icon: Icon(Icons.content_copy)),
                    ),
                  ]),
                ),
                SizedBox(
                  height: 18,
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
                      Icons.arrow_right_alt_rounded,
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
                Card(
                  elevation: 15,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                      side: BorderSide(
                        color: Color.fromRGBO(	248,113,107, 1),
                      )),
                  color: Color.fromRGBO(	248,113,107, 0.7),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10.0, 8.0, 8.0, 0.0),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        Row(
                          children: [Text('Input')],
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            children: [
                              Expanded(
                                child: Container(
                                  height: 110,
                                  child: SingleChildScrollView(
                                    child: Text(
                                      "$_lastWords",
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Card(
                  elevation: 15,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                      side:
                          BorderSide(color: Color.fromARGB(255, 237, 150, 3))),
                  color: Color.fromRGBO(	248,113,107, 0.7),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10.0, 8.0, 8.0, 0.0),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        Row(
                          children: [Text('Output')],
                        ),
                        Padding(
                          padding:
                              const EdgeInsets.fromLTRB(8.0, 8.0, 0.0, 0.0),
                          child: Row(
                            children: [
                              Expanded(
                                child: Container(
                                  height: 70,
                                  child: SingleChildScrollView(
                                    child: Text(
                                      "$output",
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            IconButton(
                              onPressed: () {
                                _flutterTts.speak(output);
                              },
                              icon: Icon(Icons.volume_up),
                            )
                          ],
                        )
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    padding: EdgeInsets.all(16),
                    child: SingleChildScrollView(
                      reverse: true,
                      child: Column(children: [
                        Text(
                          // If listening is active show the recognized words
                          isListening
                              ? "Listening..."
                              : 'Tap the microphone to start listening...',
                          // : 'Speech not available',
                          style: TextStyle(fontSize: 15.0, color: Colors.black),
                        ),
                      ]),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: AvatarGlow(
        animate: isListening,
        endRadius: 80,
        glowColor: Color.fromRGBO(	85, 170, 17, 1),
        child: FloatingActionButton(
          onPressed: toggleRecording,
          child: Icon(isListening ? Icons.mic : Icons.mic_none),
          backgroundColor: Color.fromRGBO(	85, 170, 17, 1),
        ),
      ),
    );
  }

  Future toggleRecording() => SpeechApi.toggleRecording(
      onResult: (_lastWords) => setState(() => this._lastWords = _lastWords),
      onListening: (isListening) {
        setState(() => this.isListening = isListening);

        if (!isListening) {
          Future.delayed(Duration(seconds: 1), (() {
            translate(
                getLanguageCode(originLanguage),
                getLanguageCode(destinationLanguage),
                _lastWords != ''
                    ? _lastWords
                    : 'hello, Tap the microphone to start listening...');
          }));
        }
      });
}