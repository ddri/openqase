'use client';

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from 'lucide-react';
import { submitAccessRequest } from '@/app/actions/betaActions'; // We will create this action next
import { toast } from '@/components/ui/use-toast';

export function PrivateBetaLanding() {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || isPending) return;

    startTransition(async () => {
      try {
        const result = await submitAccessRequest({ name, email, reason });

        if (result.success) {
          setSubmitted(true);
          toast({
            title: "Request Submitted",
            description: "Thank you! We'll review your request and get back to you.",
          });
          // Optionally clear the form
          // setName('');
          // setEmail('');
          // setReason('');
        } else {
          throw new Error(result.error || 'Failed to submit request.');
        }
      } catch (error) {
        console.error("Access request error:", error);
        toast({
          variant: 'destructive',
          title: "Submission Error",
          description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
        });
      }
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Request Received</CardTitle>
            <CardDescription>
              Thank you for your interest in OpenQASE! We have received your request for beta access and will notify you via email once it's reviewed.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>OpenQASE Private Beta</CardTitle>
          <CardDescription>
            We're currently in private beta. Enter your details below to request access.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly explain why you're interested..."
                required
                rows={3}
                disabled={isPending}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending || !name || !email || !reason}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isPending ? 'Submitting...' : 'Request Access'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 