import 'dart:ffi';

import 'package:flutter/material.dart';

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
    // return DropdownButton<String>(
    //   value: dropdownValue,
    //   // icon: const Icon(Icons.arrow_downward),
    //   elevation: 16,
    //   style: const TextStyle(color: Colors.deepPurple),
    //   underline: Container(
    //     height: 1,
    //     color: Colors.deepPurpleAccent,
    //   ),
    //   onChanged: (String? newValue) {
    //     setState(() {
    //       dropdownValue = newValue!;
    //       print(dropdownValue);
    //     });
    //   },
    //   items: <String>['One', 'Two', 'Three', 'Four', 'Five']
    //       .map<DropdownMenuItem<String>>((String value) {
    //     return DropdownMenuItem<String>(
    //       value: value,
    //       child: Text(value),
    //     );
    //   }).toList(),
    // );

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
