import 'customer.dart';
import 'order_item.dart';

class Order {
  final int id;
  final Customer customer;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.customer,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      customer: Customer.fromJson(json['customer']),
      items: (json['items'] as List)
          .map((item) => OrderItem.fromJson(item))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'customer': customer.toJson(),
      'items': items.map((e) => e.toJson()).toList(),
    };
  }

  // 🔥 cálculo automático
  double get total {
    return items.fold(0, (sum, item) => sum + item.total);
  }
}