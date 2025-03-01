import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestionIcon } from "lucide-react";

const HelpPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      {/* FAQs Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>How do I book a session?</AccordionTrigger>
              <AccordionContent>
                Navigate to the <span className="font-bold">Sessions</span> tab,
                select an available time slot, and confirm your booking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>
                What happens if I miss a session?
              </AccordionTrigger>
              <AccordionContent>
                If you miss a session, it will be marked as{" "}
                <span className="font-bold">Missed</span>. Multiple missed
                sessions may impact your eligibility for future bookings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can I cancel or reschedule?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel or reschedule{" "}
                <span className="font-bold">24 hours before</span> the session
                starts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Expected Behavior */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expected Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              💬 <span className="font-bold">Respectful Communication</span> –
              Maintain professionalism in all interactions.
            </li>
            <li>
              ⏳ <span className="font-bold">Punctuality</span> – Arrive on time
              for your scheduled sessions.
            </li>
            <li>
              🚫 <span className="font-bold">No Harassment</span> – Any form of
              harassment or inappropriate behavior will result in immediate
              suspension.
            </li>
            <li>
              📢 <span className="font-bold">Feedback Encouraged</span> – Share
              your experience to improve the platform.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            By using this platform, you agree to the following terms:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              ✅{" "}
              <span className="font-bold">All sessions must be conducted</span>{" "}
              in a professional and ethical manner.
            </li>
            <li>
              ✅ <span className="font-bold">Any form of misconduct</span> can
              lead to a permanent ban.
            </li>
            <li>
              ✅{" "}
              <span className="font-bold">
                Payments (if applicable) are non-refundable
              </span>{" "}
              once a session is confirmed.
            </li>
            <li>
              ✅{" "}
              <span className="font-bold">The platform reserves the right</span>{" "}
              to modify terms without prior notice.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <div className="text-center">
        <Button className="px-6 py-3" variant={"secondary"}>
          Contact Support
          <MessageCircleQuestionIcon />
        </Button>
      </div>
    </div>
  );
};

export default HelpPage;
