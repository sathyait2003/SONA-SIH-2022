import 'package:flutter/foundation.dart';
import 'package:json_annotation/json_annotation.dart';

part 'model.g.dart';

@JsonSerializable()
class Model {
  dynamic src;
  dynamic to;
  dynamic text;
  // dynamic output;

  Model({this.src, this.to, this.text});
  factory Model.fromJson(Map<String, dynamic> json) => _$ModelFromJson(json);
  Map<String, dynamic> toJson() => _$ModelToJson(this);
}