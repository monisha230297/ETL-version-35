"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Database, Code, Sparkles, Wand2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

export default function TransformationsPage() {
  const transformationTypes = [
    {
      id: "no-code",
      title: "No Code",
      description: "Visual drag-and-drop transformation builder",
      icon: Wand2,
      href: "/transformations/no-code",
    },
    {
      id: "sql",
      title: "SQL",
      description: "SQL-based data transformation queries",
      icon: Database,
      href: "/transformations/sql",
    },
    {
      id: "python",
      title: "Python/PySpark",
      description: "Python and PySpark code for data transformation",
      icon: Code,
      href: "/transformations/python",
    },
    {
      id: "cleaning",
      title: "Cleaning/Fuzzy Logic",
      description: "Data cleaning and fuzzy matching tools",
      icon: Sparkles,
      href: "/transformations/cleaning",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Transformation Agents</h1>
            <p className="text-muted-foreground">Choose your data transformation method</p>
          </div>
        </div>

        {/* Transformation Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformationTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <Link key={type.id} href={type.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
