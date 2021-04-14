import { OrderItem } from "./OrderItem";

export class Order {
  constructor(
    public id = 0,
    public name = "",
    public total = 0,
    public email = "",
    public order_items: OrderItem[]
  ) {}
}
