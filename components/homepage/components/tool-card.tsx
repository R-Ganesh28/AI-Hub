import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

export function ToolCard({
  icon,
  title,
  description,
  href,
  comingSoon = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow border border-border/30 rounded-2xl relative">
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs py-1 px-2 rounded-full">
          Coming Soon
        </div>
      )}

      <CardContent className="p-6 flex flex-col gap-4 text-left">
        <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-xl">
          {icon}
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>

        {comingSoon ? (
          <Button
            disabled
            className="mt-auto w-fit bg-gray-400 cursor-not-allowed"
          >
            Coming Soon
          </Button>
        ) : (
          <Button asChild className="mt-auto w-fit">
            <Link href={href}>Launch</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
