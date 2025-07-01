import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const pilgrims = [
    { id: 1, name: 'Siti A.', position: { top: '30%', left: '45%' }, image: 'https://placehold.co/40x40.png', hint: 'woman portrait' },
    { id: 2, name: 'Ahmad H.', position: { top: '55%', left: '50%' }, image: 'https://placehold.co/40x40.png', hint: 'man portrait' },
    { id: 3, name: 'Fatima Z.', position: { top: '60%', left: '35%' }, image: 'https://placehold.co/40x40.png', hint: 'woman portrait' },
    { id: 4, name: 'Yusuf I.', position: { top: '45%', left: '65%' }, image: 'https://placehold.co/40x40.png', hint: 'man portrait' },
];

export default function TrackingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Pilgrim Live Tracking</h1>
        <p className="text-muted-foreground">Real-time location updates of your group.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Group 3B Location Map</CardTitle>
          <CardDescription>Last updated: 2 minutes ago. Hover over an avatar for details.</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <Image
                src="https://placehold.co/1200x800.png"
                alt="Map of Mecca"
                layout="fill"
                objectFit="cover"
                data-ai-hint="mecca map"
              />
              {pilgrims.map(pilgrim => (
                <Tooltip key={pilgrim.id}>
                  <TooltipTrigger asChild>
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
                      style={{ top: pilgrim.position.top, left: pilgrim.position.left }}
                    >
                      <Avatar className="h-10 w-10 border-2 border-white shadow-lg transition-transform hover:scale-110">
                        <AvatarImage src={pilgrim.image} alt={pilgrim.name} data-ai-hint={pilgrim.hint} />
                        <AvatarFallback>{pilgrim.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{pilgrim.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
