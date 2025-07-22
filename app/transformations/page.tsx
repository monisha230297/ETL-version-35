"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Code, Sparkles, Wand2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

export default function TransformationAgents() {
  const transformationTypes = [
    {
      id: "no-code",
      title: "No Code",
      description: "Visual drag-and-drop transformation builder",
      icon: Wand2,
      href: "/transformations/no-code",
      color: "text-purple-600",
    },
    {
      id: "sql",
      title: "SQL",
      description: "Write SQL queries for data transformation",
      icon: Database,
      href: "/transformations/sql",
      color: "text-blue-600",
    },
    {
      id: "python",
      title: "Python/PySpark",
      description: "Use Python or PySpark for complex transformations",
      icon: Code,
      href: "/transformations/python",
      color: "text-green-600",
    },
    {
      id: "cleaning",
      title: "Cleaning/Fuzzy Logic",
      description: "Data cleaning and fuzzy matching tools",
      icon: Sparkles,
      href: "/transformations/cleaning",
      color: "text-orange-600",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Transformation Agents</h1>
          <p className="text-muted-foreground mt-2">Choose your preferred transformation method</p>
        </div>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformationTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <Link key={type.id} href={type.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <IconComponent className={`h-8 w-8 ${type.color}`} />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{type.description}</p>
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
