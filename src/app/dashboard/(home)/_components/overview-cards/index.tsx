// src/components/overview-cards/index.tsx
import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  // (Assuming getOverviewData still returns views, profit, products, users,
  // but we are simply relabeling these four cards.)
  const { views, profit, products, users } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="This Months Active Shipments"
        data={{
          ...views,
          value: compactFormat(views.value),
        }}
        Icon={icons.Views}
        bgImage="/images/card-bg1.jpg"
      />

      <OverviewCard
        label="This Months pending Shipments"
        data={{
          ...profit,
          value: compactFormat(profit.value),
        }}
        Icon={icons.Profit}
        bgImage="/images/card-bg1.jpg"
      />

      <OverviewCard
        label="This Months delivered Shipments"
        data={{
          ...products,
          value: compactFormat(products.value),
        }}
        Icon={icons.Product}
        bgImage="/images/card-bg1.jpg"
      />

      <OverviewCard
        label="Current Number of Clients"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
        bgImage="/images/card-bg1.jpg"
      />
    </div>
  );
}
