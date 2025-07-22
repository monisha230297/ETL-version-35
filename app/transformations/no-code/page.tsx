"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Wand2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

export default function NoCodeTransformation() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/transformations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Data Transformation</h1>
          </div>
        </div>

        {/* No Code Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-500">No Code</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Visual Transformation Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Wand2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Drag-and-drop visual transformation builder is under development.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
