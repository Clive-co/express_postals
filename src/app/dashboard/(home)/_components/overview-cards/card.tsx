// src/components/overview-cards/card.tsx
import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import type { JSX, SVGProps } from "react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate: number;
  };
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  /** Pass a public‐URL (e.g. "/images/your‐bg.png") for this card’s background */
  bgImage: string;
};

export function OverviewCard({ label, data, Icon, bgImage }: PropsType) {
  const isDecreasing = data.growthRate < 0;

  return (
    <div
      className="relative rounded-[10px] bg-cover bg-center p-6 shadow-1"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 
        If you want a semi‐transparent overlay for better text contrast,
        you could insert a div absolutely‐positioned here, e.g.:
        <div className="absolute inset-0 bg-black opacity-20 rounded-[10px]" />
        and then put the rest of your content in a container with `relative z-10` below.
      */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon at the top, unchanged */}
        <Icon
          className="h-6 w-6 text-white" 
          aria-hidden="true"
        />

        <div className="mt-6 flex items-end justify-between">
          <dl>
            <dt className="mb-1.5 text-heading-6 font-bold text-white">
              {data.value}
            </dt>
            <dd className="text-sm font-medium text-white/80">
              {label}
            </dd>
          </dl>

          <dl
            className={cn(
              "text-sm font-medium flex items-center gap-1.5",
              isDecreasing ? "text-red-500" : "text-green-400"
            )}
          >
            <dt className="flex items-center gap-1.5">
              {Math.abs(data.growthRate)}%
              {isDecreasing ? (
                <ArrowDownIcon aria-hidden />
              ) : (
                <ArrowUpIcon aria-hidden />
              )}
            </dt>
            <dd className="sr-only">
              {label} {isDecreasing ? "Decreased" : "Increased"} by{" "}
              {Math.abs(data.growthRate)}%
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
