"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Database, CheckCircle, XCircle, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

export default function SQLTransformation() {
  const [sqlQuery, setSqlQuery] = useState(`-- Example: SQL data transformation query
SELECT 
    user_id,
    UPPER(TRIM(first_name)) AS first_name,
    UPPER(TRIM(last_name)) AS last_name,
    LOWER(TRIM(email_address)) AS email_address,
    CASE 
        WHEN age < 18 THEN 'Minor'
        WHEN age BETWEEN 18 AND 65 THEN 'Adult'
        ELSE 'Senior'
    END AS age_group,
    DATE_FORMAT(created_at, '%Y-%m-%d') AS registration_date,
    DATEDIFF(CURDATE(), created_at) AS days_since_registration
FROM source_table 
WHERE email_address IS NOT NULL 
    AND email_address LIKE '%@%'
    AND created_at >= '2024-01-01'
ORDER BY created_at DESC
LIMIT 1000;`)

  const [connectedLayers, setConnectedLayers] = useState([
    { id: 1, name: "Customer Data", type: "Silver", status: "Connected" },
    { id: 2, name: "Transaction Records", type: "Gold", status: "Connected" },
  ])

  const [selectedLayer, setSelectedLayer] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)

  const handleAddLayer = () => {
    if (!selectedLayer) return

    const newLayer = {
      id: Date.now(),
      name: `${selectedLayer} Layer ${connectedLayers.length + 1}`,
      type: selectedLayer,
      status: "Connected",
    }

    setConnectedLayers([...connectedLayers, newLayer])
    setSelectedLayer("")
  }

  const handleDeleteLayer = (layerId) => {
    setConnectedLayers(connectedLayers.filter((layer) => layer.id !== layerId))
  }

  const handleExecute = async () => {
    setIsExecuting(true)
    setExecutionResult(null)

    // Simulate query execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success/failure
    const success = Math.random() > 0.2
    setExecutionResult({
      success,
      message: success
        ? "Query executed successfully! Processed 1,247 rows in 0.8 seconds."
        : "Query execution failed. Syntax error near 'SELCT' at line 2.",
    })
    setIsExecuting(false)
  }

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

        {/* SQL Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-500">SQL</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - SQL Compiler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                SQL Compiler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                placeholder="Write your SQL query here..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Right Side - Connected Layer */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Layer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {connectedLayers.map((layer) => (
                    <div key={layer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium text-sm">{layer.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={layer.type === "Gold" ? "default" : "secondary"} className="text-xs">
                              {layer.type}
                            </Badge>
                            <span className="text-xs text-green-600">{layer.status}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLayer(layer.id)}
                        className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select layer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddLayer} disabled={!selectedLayer}>
                    Add Layer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Execute Button */}
            <Button className="w-full" size="lg" onClick={handleExecute} disabled={isExecuting}>
              {isExecuting ? "Executing..." : "Execute"}
            </Button>

            {/* Execution Result */}
            {executionResult && (
              <div
                className={`p-4 rounded-lg border ${
                  executionResult.success
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {executionResult.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <p className="font-medium">{executionResult.success ? "Success" : "Error"}</p>
                </div>
                <p className="mt-1 text-sm">{executionResult.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
