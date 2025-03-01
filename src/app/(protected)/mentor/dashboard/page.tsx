import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MentorDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Session Management */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Mentee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>March 3, 2025</TableCell>
                <TableCell>3:00 PM</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>
                  <Button className="mr-2" variant={"outline"}>Reschedule</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Earnings & Payouts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Total Earnings: ₹15,000</p>
          <Button className="mt-4" variant={"secondary"}>Check Billings</Button>
        </CardContent>
      </Card>

      {/* Feedback & Ratings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Feedback & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>⭐ 4.8 / 5 (Based on 50 reviews)</p>
          <p className="text-gray-600">"Great mentor! Very insightful sessions." - Jane Doe</p>
        </CardContent>
      </Card>

      {/* Profile & Availability */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile & Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Expertise: Frontend Development, React, UX Design</p>
          <div className="flex justify-start items-center gap-4">
          <Button className="mt-4" variant={"secondary"}>Edit Availability</Button>
          <Button className="mt-4" variant={"secondary"}>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorDashboard;