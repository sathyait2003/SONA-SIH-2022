import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';

class TeacherDashboard extends StatefulWidget {
  const TeacherDashboard({Key? key}) : super(key: key);

  @override
  State<TeacherDashboard> createState() => _TeacherDashboardState();
}

class _TeacherDashboardState extends State<TeacherDashboard> {
  final List<Widget> achievementWidgetList = [];

  @override
  void initState() {
    super.initState();

    achievementWidgetList.add(const AchievementWidget());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          setState(() {
            achievementWidgetList.add(const AchievementWidget());
          });
        },
        icon: const Icon(Icons.add),
        label: const Text('Add another achievement'),
      ),
      appBar: AppBar(
        title: const Text('Teacher Dashboard'),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: MediaQuery.of(context).size.width * 0.2,
        ),
        child: ListView(
          padding: EdgeInsets.symmetric(
            vertical: 20.0,
            horizontal: MediaQuery.of(context).size.width * 0.05,
          ),
          children: [
            ...achievementWidgetList,
            ElevatedButton(
              onPressed: () {},
              child: Text('SUBMIT'),
            ),
          ],
        ),
      ),
    );
  }
}

class AchievementWidget extends StatelessWidget {
  const AchievementWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text(
          'Enter your achievement details',
          style: TextStyle(
            fontSize: 20.0,
          ),
        ),
        const SizedBox(height: 20.0),
        const TextField(
          decoration: InputDecoration(
            label: Text('Title'),
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 20.0),
        const TextField(
          decoration: InputDecoration(
            label: Text('Date'),
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 20.0),
        const TextField(
          maxLines: 3,
          decoration: InputDecoration(
            label: Text('Add relevant links or text proof'),
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 20.0),
        ElevatedButton.icon(
          onPressed: () async {
            FilePickerResult? result = await FilePicker.platform.pickFiles();

            if (result != null) {
              Uint8List fileBytes = result.files.first.bytes!;
              String fileName = result.files.first.name;

              print("File picked: " + fileName);
            }
          },
          icon: const Icon(Icons.upload),
          label: const Text('Attach proof'),
        ),
        const SizedBox(height: 20.0),
      ],
    );
  }
}
