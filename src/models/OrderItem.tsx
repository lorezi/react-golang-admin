export class OrderItem {
  constructor(
    public id: number,
    public orderId: number,
    public productTitle: string,
    public price: number,
    public quantity: number
  ) {}
}
