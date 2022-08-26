import 'dart:math';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:translator/translator.dart';
import 'package:syncfusion_flutter_pdf/pdf.dart';
import 'package:pdf_text/pdf_text.dart';
import 'package:sih_translator/others/mobile.dart';
import 'package:flutter/services.dart';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:azblob/azblob.dart';
import 'package:path/path.dart';


class PdfTranslator extends StatefulWidget {
  const PdfTranslator({Key? key}) : super(key: key);

  @override
  State<PdfTranslator> createState() => _PdfTranslatorState();
}

class _PdfTranslatorState extends State<PdfTranslator> {
  PDFDoc? _pdfDoc;
  String _text = "";
  var output = "";
  bool _buttonsEnabled = false;
  // File? file;

  // xyz() async {
  //   var storage = AzureStorage.parse('DefaultEndpointsProtocol=https;AccountName=hisourcecontainer;AccountKey=KlA1hV8yMXrPQ/kZba9l2TEerYodlo2CnnPoJBlTvumqGEw1aZS792MwhylAJ4+qw+bdlhmx8yAi+AStnjYicg==;EndpointSuffix=core.windows.net');
  //   await storage.putBlob(/source/$file);
  //   print(file);
  //   print("Uploaded on source");
  // }
  void translate(String src, String desc, String input) async {
    GoogleTranslator translator = new GoogleTranslator();
    var translation = await translator.translate(input, from: src, to: desc);

    PdfDocument document = PdfDocument();
    final page = document.pages.add();

    setState(() {
      output = translation.text.toString();
    });
    print(output);
    print('Translate done');

    final font = await rootBundle.load("assets/fonts/Hind-Regular.ttf");
    final dataint =
        font.buffer.asUint8List(font.offsetInBytes, font.lengthInBytes);
    final PdfFont font1 = PdfTrueTypeFont(dataint, 12);
    page.graphics.drawString(output, font1);

    List<int> bytes = await document.save();
    document.dispose();

    saveAndLaunchFile(bytes, 'Output.pdf');
    print('Translated pdf');

    if (src == '--' || desc == '--') {
      setState(() {
        output = 'Fail to translate';
      });
    }
  }

  _asyncFileUpload(String text, File? file) async {
    //create multipart request for POST or PATCH method
    var request = http.MultipartRequest("POST", Uri.parse("<url>"));
    //add text fields
    request.fields["text_field"] = text;
    //create multipart using filepath, string or bytes
    var pic = await http.MultipartFile.fromPath("file_field", file!.path);
    //add multipart to request
    request.files.add(pic);
    var response = await request.send();

    //Get the response from the server
    var responseData = await response.stream.toBytes();
    var responseString = String.fromCharCodes(responseData);
    print(responseString);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
            image: AssetImage('assets/pdfHome.png'), fit: BoxFit.cover),
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
            backgroundColor: Color.fromRGBO(85, 170, 17, 1),
            elevation: 0,
          ),
          body: SafeArea(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  //text Pdf Translation
                  // Text('Translate PDF', style: TextStyle(color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold)),
                  // SizedBox(height: 25),

                  //pdf Icon
                  // Icon(Icons.picture_as_pdf, size: 160, color: Colors.redAccent),
                  // SizedBox(height: 5),

                  //button Select PDF
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      primary: Color.fromRGBO(248, 113, 107, 1),
                      textStyle: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                      minimumSize: Size(270, 60),
                    ),
                    onPressed: _pickPDF,
                    icon: Icon(Icons.picture_as_pdf, size: 35),
                    label: Text('Upload PDF'),
                  ),

                  Padding(
                    child: Container(
                      child: Text(
                        _pdfDoc == null
                            // file == null
                            ? "Pick a new PDF document and wait for it to load..."
                            : "PDF document loaded, ${_pdfDoc!.length} pages\n",
                        style:
                            TextStyle(fontSize: 17, color: Colors.black), //18
                        textAlign: TextAlign.center,
                      ),
                    ),
                    padding: EdgeInsets.all(16),
                  ),

                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      onSurface: Color.fromRGBO(85, 170, 17, 1),
                      primary: Color.fromRGBO(85, 170, 17, 1),
                    ),
                    onPressed: _buttonsEnabled
                        ? (() {
                            showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                      title: Text('Extracted Text'),
                                      content: Text(
                                        _text,
                                        textAlign: TextAlign.center,
                                      ),
                                      actions: [
                                        TextButton(
                                            onPressed: () =>
                                                Navigator.pop(context),
                                            child: Text('OK')),
                                      ],
                                      scrollable: true,
                                    ));
                          })
                        : null,
                    child: Text('Text Preview'),
                  ),
                  // ElevatedButton(onPressed: xyz, child: Text("Press me")),

                  SizedBox(height: 5),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      onSurface: Color.fromRGBO(85, 170, 17, 1),
                      primary: Color.fromRGBO(85, 170, 17, 1),
                    ),
                    onPressed: _buttonsEnabled ? _createPDF : null,
                    child: Text('Create Translated PDF'),
                  ),
                ],
              ),
            ),
          )),
    );
  }

  Future _pickPDFText() async {
    var filePickerResult = await FilePicker.platform.pickFiles();
    print('Path: $filePickerResult.files.single.path!');
    if (filePickerResult != null) {
      _pdfDoc = await PDFDoc.fromPath(filePickerResult.files.single.path!);
      _buttonsEnabled = true;
      String text = await _pdfDoc!.text;
      setState(() {
        _text = text;
      });
    }
  }


  Future _pickPDF() async {
    var filePickerResult = await FilePicker.platform.pickFiles();
    print('Path:' + filePickerResult!.files.single.path!);
    PlatformFile file = filePickerResult.files.first;
    if (filePickerResult != null) {
      // file = File(filePickerResult.files.single.path!);
      // File file = await FilePicker.getFile();
      _pdfDoc = await PDFDoc.fromPath(filePickerResult.files.single.path!);
      _buttonsEnabled = true;
      print(_pdfDoc);
      // print(file);
      // _asyncFileUpload('hello', file);

      //below 2 lines------------------------
      String text = await _pdfDoc!.text;
      setState(() {
        _text = text;
      });

      Uri uri = Uri.parse('http://172.19.1.146:8000/');
      var request = http.MultipartRequest('POST', uri);
      request.headers["Content-type"] = "application/pdf";
      request.files.add(http.MultipartFile.fromBytes(
          'file', File(filePickerResult.files.single.path!).readAsBytesSync(),
          filename: file.name));
      // request.headers["application/pdf"] = "content";

      request.send();
    }
  }

  /// Reads the whole document
  Future _readWholeDoc() async {
    if (_pdfDoc == null) {
      return;
    }
    setState(() {
      _buttonsEnabled = false;
    });

    String text = await _pdfDoc!.text;

    setState(() {
      _text = text;
      _buttonsEnabled = true;
    });
  }

  // Create pdf
  Future<void> _createPDF() async {
    if (_pdfDoc == null) {
      return;
    }
    setState(() {
      _buttonsEnabled = false;
    });

    String text = await _pdfDoc!.text;

    PdfDocument document = PdfDocument();

    setState(() {
      _text = text;
      _buttonsEnabled = true;
    });

    translate('en', 'hi', _text);
    print('Translate done');
    final page = document.pages.add();
    print(output);

    final font = await rootBundle.load("assets/fonts/Hind-Regular.ttf");
    final dataint =
        font.buffer.asUint8List(font.offsetInBytes, font.lengthInBytes);
    final PdfFont font1 = PdfTrueTypeFont(dataint, 12);
    page.graphics.drawString(output, font1);

    List<int> bytes = await document.save();
    document.dispose();

    saveAndLaunchFile(bytes, 'Output.pdf');
    print('Translated pdf');
  }
}
