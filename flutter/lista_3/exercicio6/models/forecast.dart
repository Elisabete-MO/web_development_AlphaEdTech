import 'package:json_annotation/json_annotation.dart';
import 'converters/datetime_converter.dart';

part 'forecast.g.dart';

@JsonSerializable()
class Forecast {
  @DateTimeConverter()
  final DateTime date;

  final double temperature;

  Forecast({
    required this.date,
    required this.temperature,
  });

  factory Forecast.fromJson(Map<String, dynamic> json) =>
      _$ForecastFromJson(json);

  Map<String, dynamic> toJson() => _$ForecastToJson(this);
}