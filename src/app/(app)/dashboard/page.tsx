import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock, MapPin, QrCode, UserCheck } from "lucide-react";
import Image from "next/image";

const scheduleItems = [
  { time: "04:30", event: "Fajr Prayer", location: "Masjid al-Haram" },
  { time: "07:00", event: "Breakfast", location: "Hotel" },
  { time: "09:00", event: "Tawaf", location: "Kaaba" },
  { time: "12:30", event: "Dhuhr Prayer", location: "Masjid al-Haram" },
  { time: "14:00", event: "Rest", location: "Hotel" },
];

const notifications = [
    { text: "Reminder: Group meeting at 8 PM in the lobby.", time: "1h ago", icon: <Bell className="h-4 w-4 text-primary" /> },
    { text: "Your flight to Jeddah is confirmed and on time.", time: "1d ago", icon: <UserCheck className="h-4 w-4 text-green-500" /> },
    { text: "Prayer time for Asr is in 30 minutes.", time: "2d ago", icon: <Clock className="h-4 w-4 text-amber-500" /> },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Siti! Here's your overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Today's Schedule
            </CardTitle>
            <CardDescription>Your plan for today, 12th of Dhul Hijjah.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {scheduleItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                    {item.time}
                  </div>
                  <div>
                    <p className="font-medium">{item.event}</p>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
                {notifications.map((notification, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="mt-1">{notification.icon}</div>
                        <div>
                            <p className="text-sm">{notification.text}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <UserCheck className="h-5 w-5" /> Tracked Pilgrim
            </CardTitle>
            <CardDescription>Status of your registered family member.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4 border-2 border-primary">
              <AvatarImage src="https://placehold.co/100x100.png" alt="Ahmad" data-ai-hint="muslim man" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg">Ahmad Husain</p>
            <p className="text-muted-foreground">Pilgrim ID: 12345</p>
            <Badge variant="secondary" className="mt-4">
              <MapPin className="h-3 w-3 mr-1.5"/>
              Currently at: Masjid al-Haram
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Quick Check-in</CardTitle>
            <CardDescription>Scan to mark your attendance for the next event.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-white rounded-lg">
                <Image
                    src="https://placehold.co/200x200.png"
                    width={200}
                    height={200}
                    alt="QR Code"
                    data-ai-hint="qr code"
                />
            </div>
            <Button>
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
