// app/dashboard/shipments/types.ts
export interface Shipment {
  _id: string;
  trackingId: string;
  sender:   { name: string; address: string; phone:string; email:string };
  recipient:{ name: string; address: string; phone:string; email:string };
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  weightKg: number;
  priceUsd: number;
  createdAt:string;
}
