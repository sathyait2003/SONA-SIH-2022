import 'package:flutter/material.dart';
import 'student_input_form.dart';

class page2 extends StatelessWidget {
  const page2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Input Form'),
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
                  'Academic Resources',
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
                  'Feedback',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.black,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        ),
      ),
      // ),
    );
  }
}
