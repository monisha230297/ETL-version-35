"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
                <p className="text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <div className="text-sm text-gray-500">
                On clicking save, the user will receive an Email to the given Email id with the reset link to define the
                new password.
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsSubmitted(false)}>
                  Try Again
                </Button>
                <Link href="/login" className="flex-1">
                  <Button className="w-full">Back to Login</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Forgot Password</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700 min-w-[80px]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 border-2 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-12 py-3 text-lg font-semibold bg-white text-black border-2 border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Save"}
              </Button>
            </div>
