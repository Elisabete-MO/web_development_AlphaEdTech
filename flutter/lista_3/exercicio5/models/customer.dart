import 'address.dart';

class Customer {
  final int id;
  final String name;
  final Address? address; // opcional

  Customer({
    required this.id,
    required this.name,
    this.address,
  });

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      id: json['id'],
      name: json['name'],
      address: json['address'] != null
          ? Address.fromJson(json['address'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'address': address?.toJson(),
    };
  }
}