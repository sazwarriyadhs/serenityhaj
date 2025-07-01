"use client"

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adjustItinerary, AdjustItineraryOutput } from "@/ai/flows/adjust-itinerary";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Bot, ThumbsUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ItineraryAdjusterProps {
    currentItinerary: string;
}

const formSchema = z.object({
  externalEvent: z.string().min(10, {
    message: "Please describe the event in at least 10 characters.",
  }),
});

export function ItineraryAdjuster({ currentItinerary }: ItineraryAdjusterProps) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<AdjustItineraryOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            externalEvent: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);
        setResult(null);

        startTransition(async () => {
            try {
                const res = await adjustItinerary({
                    currentItinerary,
                    externalEvent: values.externalEvent,
                });
                setResult(res);
            } catch (e) {
                setError("Failed to adjust itinerary. Please try again.");
                console.error(e);
            }
        });
    }


    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Smart Adjustment
                </CardTitle>
                <CardDescription>
                    AI will adjust the schedule based on unexpected events.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="externalEvent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Describe the External Event</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g., Flight from JED to CGK is delayed by 4 hours."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Adjusting..." : "Adjust Itinerary"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>

            {isPending && (
                <CardContent className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-16 w-full" />
                </CardContent>
            )}

            {error && (
                <CardContent>
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardContent>
            )}

            {result && (
                 <CardContent className="space-y-4">
                    <Alert>
                        <Bot className="h-4 w-4" />
                        <AlertTitle className="font-headline">Adjusted Itinerary</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap font-mono text-xs">
                            {result.adjustedItinerary}
                        </AlertDescription>
                    </Alert>
                    <Alert>
                        <ThumbsUp className="h-4 w-4" />
                        <AlertTitle className="font-headline">Reasoning</AlertTitle>
                        <AlertDescription>
                            {result.reasoning}
                        </AlertDescription>
                    </Alert>
                </CardContent>
            )}

        </Card>
    );
}
