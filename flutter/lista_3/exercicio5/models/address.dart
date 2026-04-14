class Address {
  final String street;
  final String city;
  final String zipCode;

  Address({
    required this.street,
    required this.city,
    required this.zipCode,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      street: json['street'],
      city: json['city'],
      zipCode: json['zipCode'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'street': street,
      'city': city,
      'zipCode': zipCode,
    };
  }
}