import 'package:json_annotation/json_annotation.dart';
import 'location.dart';
import 'forecast.dart';

part 'weather.g.dart';

@JsonSerializable()
class Weather {
  final Location location;
  final List<Forecast> forecast;

  Weather({
    required this.location,
    required this.forecast,
  });

  factory Weather.fromJson(Map<String, dynamic> json) =>
      _$WeatherFromJson(json);

  Map<String, dynamic> toJson() => _$WeatherToJson(this);
}