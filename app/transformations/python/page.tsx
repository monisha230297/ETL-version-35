"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Code, CheckCircle, XCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

export default function PythonTransformation() {
  const [code, setCode] = useState(`# Example: Python/PySpark data transformation
import pandas as pd
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, avg, when

# Initialize Spark session
spark = SparkSession.builder.appName("DataTransformation").getOrCreate()

# Read data from Silver layer
df = spark.read.table("silver.customer_orders")

# Data transformation
transformed_df = df.select(
    col("customer_id"),
    col("product_id"),
    col("order_quantity"),
    col("unit_price"),
    (col("order_quantity") * col("unit_price")).alias("total_amount"),
    when(col("order_quantity") > 100, "High Volume")
    .when(col("order_quantity") > 50, "Medium Volume")
    .otherwise("Low Volume").alias("volume_category")
).groupBy("customer_id", "product_id", "volume_category").agg(
    sum("order_quantity").alias("total_quantity"),
    avg("unit_price").alias("avg_price"),
    sum("total_amount").alias("total_revenue")
)

# Write to Gold layer
transformed_df.write.mode("overwrite").saveAsTable("gold.customer_product_summary")

print("Transformation completed successfully!")`)

  const [selectedEnvironment, setSelectedEnvironment] = useState("")
  const [connectedEnvironment, setConnectedEnvironment] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)

  const handleConnect = async () => {
    if (!selectedEnvironment) return

    setIsConnecting(true)
    // Simulate connection process
    setTimeout(() => {
      setConnectedEnvironment({
        type: selectedEnvironment,
        version: selectedEnvironment === "Python" ? "3.9.7" : "3.4.0",
        status: "Connected",
      })
      setIsConnecting(false)
      setSelectedEnvironment("")
    }, 1500)
  }

  const handleRun = async () => {
    if (!connectedEnvironment) return

    setIsRunning(true)
    setExecutionResult(null)

    // Simulate code execution
    setTimeout(() => {
      const success = Math.random() > 0.2
      setExecutionResult({
        success,
        message: success
          ? "Code executed successfully! Data transformation completed."
          : "Code execution failed. Import error: module 'pyspark' not found.",
        executionTime: success ? "4.7s" : null,
      })
      setIsRunning(false)
    }, 3000)
  }

  const getCompilerTitle = () => {
    if (connectedEnvironment) {
      return `${connectedEnvironment.type} Compiler`
    }
    return "Python/PySpark Compiler"
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

        {/* Python/PySpark Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-500">Python/PySpark</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Code Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                {getCompilerTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your Python/PySpark code here..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Right Side - Environment Management */}
          <div className="space-y-4">
            {/* Connected Environment */}
            {connectedEnvironment && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{connectedEnvironment.type}</div>
                    <div className="text-xs text-muted-foreground">Version: {connectedEnvironment.version}</div>
                    <Badge variant="outline" className="text-xs text-green-600 mt-1">
                      {connectedEnvironment.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Environment Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Execution Environment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="PySpark">PySpark</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleConnect} disabled={!selectedEnvironment || isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Run Button */}
            <Button
              onClick={handleRun}
              disabled={!connectedEnvironment || isRunning || !code.trim()}
              className="w-full"
              size="lg"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Running...
                </>
              ) : (
                "Run"
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
