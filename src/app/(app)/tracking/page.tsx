'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useMemo } from 'react';

const pilgrims = [
    { id: 1, name: 'Siti A.', position: [21.4235, 39.8255] as [number, number], image: 'https://placehold.co/40x40.png', hint: 'woman portrait' },
    { id: 2, name: 'Ahmad H.', position: [21.4220, 39.8268] as [number, number], image: 'https://placehold.co/40x40.png', hint: 'man portrait' },
    { id: 3, name: 'Fatima Z.', position: [21.4215, 39.8250] as [number, number], image: 'https://placehold.co/40x40.png', hint: 'woman portrait' },
    { id: 4, name: 'Yusuf I.', position: [21.4240, 39.8275] as [number, number], image: 'https://placehold.co/40x40.png', hint: 'man portrait' },
];

export default function TrackingPage() {
  const LiveMap = useMemo(() => dynamic(
    () => import('@/components/live-map'),
    { 
      loading: () => <Skeleton className="w-full aspect-video rounded-lg" />,
      ssr: false 
    }
  ), []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Pilgrim Live Tracking</h1>
        <p className="text-muted-foreground">Real-time location updates of your group.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Group 3B Location Map</CardTitle>
          <CardDescription>Last updated: just now. Click on an avatar for details.</CardDescription>
        </CardHeader>
        <CardContent>
          <LiveMap pilgrims={pilgrims} />
        </CardContent>
      </Card>
    </div>
  );
}
