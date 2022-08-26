import 'package:flutter/cupertino.dart';
import 'package:speech_to_text/speech_to_text.dart';

class SpeechApi{
  static SpeechToText _speechToText = SpeechToText();
  static bool _speechEnabled = false;
  static Future<bool> toggleRecording({
    required Function(String text) onResult,
    required ValueChanged<bool> onListening,
  }) async{
    if(_speechToText.isListening){
      _speechToText.stop();
      return true;
    }

    _speechEnabled = await _speechToText.initialize(
      onStatus: (status) => onListening(_speechToText.isListening),
      onError: (e) => print('Error: $e'),
    );

    if(_speechEnabled){
      _speechToText.listen(onResult: (value) => onResult(value.recognizedWords));
    }

    return _speechEnabled;
  }
}