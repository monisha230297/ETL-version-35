"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Trash2, CheckCircle, XCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

export default function SQLTransformation() {
  const [query, setQuery] = useState(`-- Example SQL Query for Data Transformation
SELECT 
    customer_id,
    product_id,
    SUM(quantity) as total_quantity,
    AVG(unit_price) as avg_price,
    COUNT(*) as order_count
FROM sales_orders 
WHERE order_date >= '2024-01-01'
GROUP BY customer_id, product_id
ORDER BY total_quantity DESC;`)

  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)
  const [connectedLayers, setConnectedLayers] = useState([
    { id: 1, name: "Customer Data", type: "Silver", status: "Connected" },
    { id: 2, name: "Order Data", type: "Gold", status: "Connected" },
  ])
  const [selectedLayer, setSelectedLayer] = useState("")

  const handleExecute = async () => {
    setIsExecuting(true)
    setExecutionResult(null)

    // Simulate query execution
    setTimeout(() => {
      const success = Math.random() > 0.3
      setExecutionResult({
        success,
        message: success
          ? "Query executed successfully! 1,247 rows processed."
          : "Query execution failed. Syntax error on line 12.",
        executionTime: success ? "2.3s" : null,
      })
      setIsExecuting(false)
    }, 2000)
  }

  const handleAddLayer = () => {
    if (selectedLayer && !connectedLayers.find((layer) => layer.type === selectedLayer)) {
      const newLayer = {
        id: connectedLayers.length + 1,
        name: `${selectedLayer} Layer`,
        type: selectedLayer,
        status: "Connected",
      }
      setConnectedLayers([...connectedLayers, newLayer])
      setSelectedLayer("")
    }
  }

  const handleRemoveLayer = (layerId) => {
    setConnectedLayers(connectedLayers.filter((layer) => layer.id !== layerId))
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
              <CardTitle>SQL Compiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write your SQL query here..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Right Side - Connected Layers */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Layer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Connected Layers Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {connectedLayers.map((layer) => (
                    <div key={layer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{layer.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {layer.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs text-green-600">
                            {layer.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveLayer(layer.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add Layer Section */}
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

                {/* Execute Button */}
                <Button onClick={handleExecute} disabled={isExecuting || !query.trim()} className="w-full" size="lg">
                  {isExecuting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Executing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Execute
                    </>
                  )}
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
                    <div className="flex items-center gap-2 mb-2">
                      {executionResult.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                      <span className="font-medium">{executionResult.success ? "Success" : "Error"}</span>
                    </div>
                    <p className="text-sm">{executionResult.message}</p>
                    {executionResult.executionTime && (
                      <p className="text-xs mt-2 opacity-75">Execution time: {executionResult.executionTime}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
