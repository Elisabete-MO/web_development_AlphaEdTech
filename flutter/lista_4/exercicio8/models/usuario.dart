class Usuario {
  final int id;
  final String name;
  final String username;
  final String email;

  Usuario({
    required this.id,
    required this.name,
    required this.username,
    required this.email,
  });

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      id: json['id'],
      name: json['name'],
      username: json['username'],
      email: json['email'],
    );
  }

  Usuario copyWith({
    String? name,
    String? username,
    String? email,
  }) {
    return Usuario(
      id: id,
      name: name ?? this.name,
      username: username ?? this.username,
      email: email ?? this.email,
    );
  }
}