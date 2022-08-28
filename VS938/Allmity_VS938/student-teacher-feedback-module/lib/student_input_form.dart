import 'package:flutter/material.dart';
// import 'homepage.dart';

class page1 extends StatelessWidget {
  const page1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: ,
      appBar: AppBar(
        title: const Text('Student Input Form'),
      ),
      body: ListView(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Padding(
              //   padding: const EdgeInsets.only(
              //       top: 10, left: 180, right: 180, bottom: 20),
              // child:
              Container(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 10),
                    const Text(
                      '⚠️ Please use the slider to choose a suitable number. 1 being that you "Strongly Disagree" and 5 being that you "Strongly Agree".',
                      style: TextStyle(
                        color: Colors.red,
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      'Q. Teacher is prepared for class?',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    // const SizedBox(height: 20),
                    const Text(
                      'Q. Teacher knows his/her subject.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher is organized and neat.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher plans class time and assignments that help students to problem solve and think critically. Teacher provides activities that make subiect matter meaningful.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher is flexible in accommodating for individual student needs.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher is clear in giving directions and on explaining what is expected on assignments and tests.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher allows you to be active in the classroom learning environment.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher manages the time well.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      "Q. Teacher has clear classroom procedures so students don't waste time.",
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const Divider(
                      height: 20,
                      thickness: 2,
                    ),
                    const Text(
                      'Q. Teacher encourages students to speak up and be active in the class.',
                      style: TextStyle(fontSize: 20),
                    ),
                    const DDButton(),
                    const SizedBox(height: 30),
                    Center(
                      child: SizedBox(
                        height: 50,
                        width: 100,
                        child: FloatingActionButton.extended(
                          backgroundColor: Colors.blue,
                          foregroundColor: Colors.white,
                          onPressed: () {
                            // TO DO : Make this shiz
                            // Navigator.push(
                            //   context,
                            //   MaterialPageRoute(
                            //       // builder: (context) => const homepage()),
                            // );
                          },
                          label: const Text('Submit'),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              // ),
            ],
          ),
        ],
      ),
    );
  }
}

class DDButton extends StatefulWidget {
  const DDButton({super.key});

  @override
  State<DDButton> createState() => _DDButtonState();
}

class _DDButtonState extends State<DDButton> {
  String dropdownValue = 'One';
  double rating = 1.0;

  @override
  Widget build(BuildContext context) {
    return Slider(
      min: 1.0,
      max: 5.0,
      value: rating,
      divisions: 4,
      label: rating.toStringAsFixed(0),
      onChanged: (value) {
        setState(() {
          rating = value;
          print(rating);
        });
      },
    );
  }
}
