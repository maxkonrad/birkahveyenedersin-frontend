import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Coffee, MapPin, Clock } from "lucide-react";
import Loading from "@/components/Loading";

interface Invite {
  sender: string;
  message: string;
  place: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
}

export default function InviteResponse() {
  const { inviteId } = useParams<{ inviteId: string }>();
  const [invite, setInvite] = useState<Invite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invites/${inviteId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch invite');
        }
        const data = await response.json();
        setInvite(data);
      } catch (error) {
        setError('Failed to load invite. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [inviteId]);

  const handleResponse = async (response: 'accept' | 'decline') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invites/${inviteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: response === 'accept' ? 'accepted' : 'declined' }),
      });

      if (!res.ok) {
        throw new Error('Failed to update invite status');
      }

      setInvite(prev => prev ? { ...prev, status: response === 'accept' ? 'accepted' : 'declined' } : null);
    } catch (error) {
      setError('Failed to respond to invite. Please try again.');
    }
  };

  if (loading) {
    return <Loading />; // Show loading component while fetching
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!invite) {
    return <div className="text-center mt-8">Invite not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="bg-amber-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-pacifico">Coffee Invite</CardTitle>
          <CardDescription className="text-amber-100">You&apos;ve been invited for coffee!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 bg-amber-200 text-amber-800">
              <AvatarFallback>{invite.sender.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-lg text-amber-800">{invite.sender}</p>
              <p className="text-sm text-amber-600">wants to have coffee with you</p>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="font-medium text-amber-800">Message:</p>
            <p className="text-amber-700">{invite.message}</p>
          </div>
          <div className="flex items-center space-x-2 text-amber-700">
            <MapPin className="h-5 w-5" />
            <p><span className="font-medium">Suggested Place:</span> {invite.place}</p>
          </div>
          <div className="flex items-center space-x-2 text-amber-700">
            <Clock className="h-5 w-5" />
            <p><span className="font-medium">Suggested Time:</span> {invite.time}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between bg-amber-50 rounded-b-lg">
          {invite.status === 'pending' ? (
            <>
              <Button onClick={() => handleResponse('accept')} className="bg-green-600 hover:bg-green-700 text-white">
                Accept
              </Button>
              <Button onClick={() => handleResponse('decline')} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Decline
              </Button>
            </>
          ) : (
            <p className="text-center w-full text-amber-800">
              You&apos;ve {invite.status === 'accepted' ? 'accepted' : 'declined'} this invite.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}