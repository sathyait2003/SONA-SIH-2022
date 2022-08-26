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
  File? file;

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

    final font = await rootBundle.load("asset/fonts/Hind-Regular.ttf");
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
            image: AssetImage('asset/pdfHome.png'), fit: BoxFit.cover),
      ),
      child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            title: Text(
              'Anuvadak!',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                letterSpacing: 2.0,
              ),
            ),
            centerTitle: true,
            backgroundColor: Colors.cyan,
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
                      primary: Colors.orange,
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
                      onSurface: Colors.cyan,
                      primary: Colors.cyan,
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

                  SizedBox(height: 5),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      onSurface: Colors.cyan,
                      primary: Colors.cyan,
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
    print('Path: $filePickerResult.files.single.path!');
    if (filePickerResult != null) {
      file = File(filePickerResult.files.single.path!);
      // _pdfDoc = await PDFDoc.fromPath(filePickerResult.files.single.path!);
      _buttonsEnabled = true;
      // _asyncFileUpload('hello', file);
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

    final font = await rootBundle.load("asset/fonts/Hind-Regular.ttf");
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