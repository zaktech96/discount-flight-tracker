import { useState } from "react";
import { useAction } from "convex/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

export function JoinWaitlistForm() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendTestEmail = useAction(api.sendEmails.sendTestEmailToAddress);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toEmail) {
      toast.error("Please enter your email address to join the waitlist.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await console.log({ toEmail });
      toast.success("You've been added to the Flight Guardian waitlist!");
      setToEmail(""); // Clear form
    } catch (error) {
      console.error("Failed to send waitlist email:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to join waitlist. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Join the Flight Guardian Waitlist
        </CardTitle>
        <CardDescription>
          Be the first to know when Flight Guardian launches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full min-w-[160px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining Waitlist
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Join Waitlist
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
