"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function WaitingPage() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-slate-400 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card className="max-w-lg text-center p-6 shadow-2xl bg-white rounded-2xl border border-white/20">
          <CardContent>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Thank You for Applying, Mentor!
            </h2>
            <p className="text-md mb-6 text-gray-700">
              Our team is reviewing your application. You’re on your way to
              making a real impact! 🚀
            </p>

            <div className="flex items-center justify-center mb-6">
              <span className="ml-2 text-lg font-semibold text-yellow-300">
                Processing{dots}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-sm text-gray-400 italic">
                “A mentor empowers a person to see a possible future and believe
                it can be achieved.”
              </p>
            </motion.div>
            <Link href="/">
              <Button variant="outline" className="mt-6 transition">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
