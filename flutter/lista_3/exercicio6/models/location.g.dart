// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'location.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Location _$LocationFromJson(Map<String, dynamic> json) =>
    Location(city: json['city'] as String, zipCode: json['zipcode'] as String);

Map<String, dynamic> _$LocationToJson(Location instance) => <String, dynamic>{
  'city': instance.city,
  'zipcode': instance.zipCode,
};
