// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'weather.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Weather _$WeatherFromJson(Map<String, dynamic> json) => Weather(
  location: Location.fromJson(json['location'] as Map<String, dynamic>),
  forecast: (json['forecast'] as List<dynamic>)
      .map((e) => Forecast.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$WeatherToJson(Weather instance) => <String, dynamic>{
  'location': instance.location,
  'forecast': instance.forecast,
};
