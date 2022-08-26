import 'package:flutter/material.dart';
import 'package:flutter_mobile_vision_2/flutter_mobile_vision_2.dart';
import 'package:translator/translator.dart';

class ImageCameraTranslation extends StatefulWidget {
  const ImageCameraTranslation({Key? key}) : super(key: key);

  @override
  State<ImageCameraTranslation> createState() => _ImageCameraTranslationState();
}

class _ImageCameraTranslationState extends State<ImageCameraTranslation> {
  bool isInitialized = false;
  String text_recognised = '';
  var output = '';

  @override
  void initState() {
    FlutterMobileVision.start().then((value) {
      isInitialized = true;
    });
    super.initState();
  }

  _startScan() async {
    List<OcrText> list = [];

    try {
      list = await FlutterMobileVision.read(
        waitTap: true,
        fps: 5.0,
        multiple: true,
      );

      String t = '';
      List<String> lt = [];
      print('Text in Image are:');
      for (OcrText text in list) {
        lt.add(text.value);
        print(text.value);
      }

      t = lt.join('\n');
      print('Full text: $t');

      setState(() {
        text_recognised = t;
      });
    } catch (e) {}
  }

  void translator() async {
    if (text_recognised != '') {
      var text = await text_recognised.translate(from: 'en', to: 'hi');
      setState(() {
        output = text.toString();
        print(output);
      });
    }
    else {
      setState(() {
        output = 'Please Capture an image';
        print(output);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(image: AssetImage('assets/imageHome.png'), fit: BoxFit.cover),
        ),
        child : Scaffold(
          backgroundColor: Colors.transparent,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.home_outlined),
        ),
        backgroundColor: Color.fromRGBO(	85, 170, 17, 1),
        title: Text(
          'Bhashantar',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            letterSpacing: 2.0,
          ),
        ),
        centerTitle: true,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  height: 100,
                  decoration: BoxDecoration(
                      border: Border.all(
                    width: 1,
                  )),
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Center(
                        child: Text(
                          text_recognised != ''
                              ? text_recognised
                              : 'Scan an Image!',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              if (output != '')
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    height: 100,
                    decoration: BoxDecoration(
                        border: Border.all(
                      width: 1,
                    )),
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Center(
                          child: Text(
                            output,
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ElevatedButton(
                onPressed: text_recognised != '' ? translator : null,
                child: Text('Translate'),
                style: ElevatedButton.styleFrom(
                  primary: Color.fromRGBO(	248,113,107, 1),
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: Colors.blueGrey,
                  ),
                  child: Text('Capture Image'),
                  onPressed: _startScan,
                ),
              ),
              SizedBox(
                width: 10,
              ),
              Container(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: Color.fromRGBO(	248,113,107, 1),
                  ),
                  child: Text('Choose Image From Gallery'),
                  onPressed: () {},
                ),
              ),
            ],
          ),
        ],
      ),
        )
    );
  }
}