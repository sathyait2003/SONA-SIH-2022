import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'student_input_form.dart';
import 'page2.dart';
import 'nopendingforms.dart';

class homepage extends StatefulWidget {
  const homepage({super.key});

  @override
  State<homepage> createState() => _homepageState();
}

class _homepageState extends State<homepage> {
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      () async {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: const Text('lol')));
      };
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Page'),
      ),
      body:
          // Padding(
          //   padding: const EdgeInsets.symmetric(horizontal: 180.0),
          //   child:
          Center(
              child: GridView.extent(
        primary: false,
        padding: const EdgeInsets.all(16),
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
        maxCrossAxisExtent: 200.0,
        children: <Widget>[
          Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(8),
            color: Colors.grey.shade300,
            child: TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const NoPendingForms(),
                  ),
                );
              },
              child: const Text(
                'Physics',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(8),
            color: Colors.blue.shade200,
            child: TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const page1(),
                  ),
                );
              },
              child: const Text(
                'Geography',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(8),
            color: Colors.blue.shade200,
            child: TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const NoPendingForms(),
                  ),
                );
              },
              child: const Text(
                'Maths',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(8),
            color: Colors.grey.shade300,
            child: TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const page1(),
                  ),
                );
              },
              child: const Text(
                'English',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ],
      )),
      // ),
    );
  }
}
