import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-sm
              text-neutral-500
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-bold
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
            rounded-2xl
            bg-[#B88A44]/10
            p-4
          "
        >
          <Icon
            className="text-[#B88A44]"
            size={28}
          />
        </div>
      </div>
    </div>
  );
}