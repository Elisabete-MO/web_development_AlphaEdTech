// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'forecast.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Forecast _$ForecastFromJson(Map<String, dynamic> json) => Forecast(
  date: const DateTimeConverter().fromJson(json['date'] as String),
  temperature: (json['temperature'] as num).toDouble(),
);

Map<String, dynamic> _$ForecastToJson(Forecast instance) => <String, dynamic>{
  'date': const DateTimeConverter().toJson(instance.date),
  'temperature': instance.temperature,
};
