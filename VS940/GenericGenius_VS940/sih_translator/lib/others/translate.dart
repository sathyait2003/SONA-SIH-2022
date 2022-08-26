import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:sih_translator/others/model.dart';

fetchData(String url) async {
  http.Response response = await http.get(Uri.parse(url));
  return response.body;
}

Model model = Model();

sendText(String src, String desc, String input) async {
  model = Model(src: src, to: desc, text: input);
  var response = await http.post(Uri.parse("https://anuvadak.herokuapp.com/"),
      headers: {"Content-type": "application/json"},
      body: json.encode(model.toJson()));
  dynamic data = jsonDecode(response.body);
  print(data["output"]);
  return data["output"];
}

