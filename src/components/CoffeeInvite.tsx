import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Copy, Coffee } from "lucide-react";
import { getToken } from "@/utils/authUtils";
import { getCookies } from "typescript-cookie";
import { useEffect } from "react";

interface Profile {
  sender: string;
  recipient: string;
  message: string;
  place: string;
  day: string; // Will hold the selected day
  time: string; // This will store time in 'HH:MM' format
  username: string;
}

const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cma", "Cts", "Pzr"];
const timeOptions = ["00", "15", "30", "45"];

export default function CoffeeInvite() {
  const [profile, setProfile] = useState<Profile>({
    sender: "",
    recipient: "",
    message: "",
    place: "",
    day: "",
    time: "12:00",
    username: "",
  });
  const [recipient, setRecipient] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const cookies = getCookies();
    setProfile((prevProfile) => ({ ...prevProfile, username: cookies.username }));
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when starting the request
    setIsClicked(false); // Set isClicked to true to prevent further clicks
    const profileWithRecipient = { ...profile, recipient };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/invites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(profileWithRecipient),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to create invite");
      }

      const data = await response.json();
      setInviteLink(`${window.location.origin}/invite/${data.inviteId}`);
      console.log("Invite created:", data);
    } catch (error: any) {
      console.error("Error creating invite:", error);
      setError(error.message || "Failed to create invite. Please try again.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
      setIsClicked(true); // Reset isClicked back to false
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="bg-amber-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-pacifico">
            Bir Kahve Daveti Oluştur
          </CardTitle>
          <CardDescription className="text-amber-100">
            Detayları doldur ve arkadaşını kahveye davet et!
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-amber-800">
                İsmin
              </Label>
              <Input
                id="name"
                value={profile.sender}
                onChange={(e) =>
                  setProfile({ ...profile, sender: e.target.value })
                }
                required
                className="border-amber-300 focus:border-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-amber-800">
                Arkadaşının ismi
              </Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="border-amber-300 focus:border-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-amber-800">
                Davet mesajın
              </Label>
              <Textarea
                id="message"
                value={profile.message}
                onChange={(e) =>
                  setProfile({ ...profile, message: e.target.value })
                }
                placeholder="Seninle kahve içmek istiyorum!"
                required
                className="border-amber-300 focus:border-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="place" className="text-amber-800">
                Önerdiğin Yer
              </Label>
              <Input
                id="place"
                value={profile.place}
                onChange={(e) =>
                  setProfile({ ...profile, place: e.target.value })
                }
                placeholder="Bamboo AVM Starbucks"
                required
                className="border-amber-300 focus:border-amber-500"
              />
            </div>
            <Label className="text-amber-800">Gün Seçimi</Label>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    onClick={() => setProfile({ ...profile, day })}
                    className={`w-full border-2 border-amber-300 transition-all duration-200 ${
                      profile.day === day
                        ? "bg-amber-600 text-white"
                        : "bg-white text-amber-800 hover:bg-amber-100"
                    }`}
                    type="button"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-amber-800">Saat Seçimi</Label>
              <div className="flex items-center">
                <select
                  value={profile.time.split(":")[0]} // Hour selection
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      time: `${e.target.value}:${profile.time.split(":")[1]}`,
                    })
                  }
                  className="border-amber-300 focus:border-amber-500 mr-2"
                >
                  {Array.from({ length: 24 }, (_, index) => (
                    <option
                      key={index}
                      value={index.toString().padStart(2, "0")}
                    >
                      {index.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  value={profile.time.split(":")[1]} // Minute selection
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      time: `${profile.time.split(":")[0]}:${e.target.value}`,
                    })
                  }
                  className="border-amber-300 focus:border-amber-500"
                >
                  {timeOptions.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>

                {/* Displaying the selected time */}
                <span className="ml-2 text-amber-800">{profile.time}</span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={loading || isClicked}
            >
              {loading ? "Yükleniyor..." : "Davet Bağlantısını Oluştur"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {inviteLink && (
        <Card className="mt-6 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-pacifico">
              Davet oluşturuldu!
            </CardTitle>
            <CardDescription>Bu linki arkadaşınla paylaş!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-grow"
              />
              <Button onClick={handleCopyLink} variant="outline">
                {copied ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <Alert>
                <AlertDescription>Bağlantı kopyalandı!</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <footer className="mt-8 text-center text-sm text-amber-800">
        <p>
          Kahve eşliğinde bir davet <Coffee className="inline-block w-4 h-4" />
        </p>
      </footer>
    </div>
  );
}
