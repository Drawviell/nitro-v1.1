import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, FileText, Calendar } from "lucide-react";

interface Activity {
  dealer: string;
  type: "order" | "quote" | "meeting";
  date: string;
  status: string;
  value?: string;
}

interface DealerActivityProps {
  activities: readonly Activity[];
}

export function DealerActivity({ activities }: DealerActivityProps) {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      case "quote":
        return <FileText className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Dealer Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b last:border-0 pb-2"
            >
              <div className="flex items-center space-x-3">
                {getIcon(activity.type)}
                <div>
                  <p className="font-medium">{activity.dealer}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} - {activity.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activity.value && (
                  <span className="text-sm font-medium">${activity.value}</span>
                )}
                <Badge
                  variant="outline"
                  className={
                    activity.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
