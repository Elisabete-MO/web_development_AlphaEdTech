import 'product.dart';

class OrderItem {
  final int quantity;
  final Product product;

  OrderItem({
    required this.quantity,
    required this.product,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      quantity: json['quantity'],
      product: Product.fromJson(json['product']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'quantity': quantity,
      'product': product.toJson(),
    };
  }

  double get total => quantity * product.price;
}