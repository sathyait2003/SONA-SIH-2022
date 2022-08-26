import 'package:flutter/material.dart';
import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:sih_translator/screens/input_selector.dart';

class Loading extends StatefulWidget {
  const Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  @override
  void initState() {
    super.initState();
    _navigateHome();
  }

  _navigateHome() async {
    await Future.delayed(const Duration(milliseconds: 3000), () {});
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => const InputSelector()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: AnimatedSplashScreen(
            duration: 3000,
            // ignore: unnecessary_const
            splash: 'assets/SIH_Logo1.png',
            splashIconSize: double.infinity,
            nextScreen: const InputSelector(),
            splashTransition: SplashTransition.fadeTransition,
            backgroundColor: Colors.white,
      ),
    );
  }
}
