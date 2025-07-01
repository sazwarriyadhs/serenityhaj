import { ItineraryAdjuster } from "@/components/itinerary-adjuster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sampleItinerary = `
**Day 1: Arrival in Mecca**
- 14:00: Arrive at King Abdulaziz International Airport (JED).
- 15:30: Transfer to hotel in Mecca.
- 18:30: Maghrib Prayer at Masjid al-Haram.
- 20:00: Perform Umrah (Tawaf and Sa'i).
- 22:00: Dinner and rest.

**Day 2: Prayers and Ziyarat**
- 04:30: Fajr Prayer at Masjid al-Haram.
- 09:00: Ziyarat (visit) to historical sites: Jabal al-Nour, Jabal Thawr.
- 12:30: Dhuhr Prayer.
- 14:00: Lunch and rest.
- 18:00: Personal worship and reflection.

**Day 3: Departure Preparations**
- 04:30: Fajr Prayer.
- 10:00: Farewell Tawaf (Tawaf al-Wada).
- 12:00: Check out from hotel.
- 13:00: Transfer to airport for departure.
`;

export default function ItineraryPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Itinerary Management</h1>
        <p className="text-muted-foreground">View and adjust the pilgrimage schedule.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Current Umrah Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: sampleItinerary.replace(/\n/g, '<br />') }} />
            </CardContent>
        </Card>
        
        <ItineraryAdjuster currentItinerary={sampleItinerary} />
      </div>
    </div>
  );
}
