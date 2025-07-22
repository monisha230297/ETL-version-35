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
  const [pythonCode, setPythonCode] = useState(`# Example: Data transformation with Python/PySpark
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
import pandas as pd

# Initialize Spark Session
spark = SparkSession.builder.appName("DataTransformation").getOrCreate()

# Load data
df = spark.read.table("source_table")

# Data transformation operations
transformed_df = df.select(
    col("user_id"),
    upper(trim(col("first_name"))).alias("first_name"),
    upper(trim(col("last_name"))).alias("last_name"),
    lower(trim(col("email_address"))).alias("email_address"),
    when(col("age") < 18, "Minor")
    .when((col("age") >= 18) & (col("age") <= 65), "Adult")
    .otherwise("Senior").alias("age_group"),
    date_format(col("created_at"), "yyyy-MM-dd").alias("registration_date"),
    datediff(current_date(), col("created_at")).alias("days_since_registration")
).filter(
    col("email_address").isNotNull() & 
    col("email_address").contains("@") &
    col("created_at") >= "2024-01-01"
).orderBy(col("created_at").desc())

# Show results
transformed_df.show(20)
print(f"Total records processed: {transformed_df.count()}")

# Save results
transformed_df.write.mode("overwrite").saveAsTable("transformed_data")`)

  const [selectedEnvironment, setSelectedEnvironment] = useState("")
  const [connectedEnvironment, setConnectedEnvironment] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)

  const handleConnect = async () => {
    if (!selectedEnvironment) return

    setIsConnecting(true)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setConnectedEnvironment({
      type: selectedEnvironment,
      name: `${selectedEnvironment} Environment`,
      status: "Connected",
      version: selectedEnvironment === "Python" ? "3.9.0" : "3.4.0",
    })
    setIsConnecting(false)
  }

  const handleRun = async () => {
    if (!connectedEnvironment) {
      setExecutionResult({
        success: false,
        message: "Please connect to an execution environment first.",
      })
      return
    }

    setIsRunning(true)
    setExecutionResult(null)

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulate success/failure
    const success = Math.random() > 0.2
    setExecutionResult({
      success,
      message: success
        ? `Code executed successfully in ${connectedEnvironment.type} environment! Processed 2,847 records in 12.3 seconds.`
        : `Execution failed in ${connectedEnvironment.type} environment. ImportError: No module named 'pyspark.sql'`,
    })
    setIsRunning(false)
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
          {/* Left Side - Code Compiler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                {getCompilerTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="Write your Python/PySpark code here..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Right Side - Environment Management */}
          <div className="space-y-4">
            {/* Connected Environment Display */}
            {connectedEnvironment && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{connectedEnvironment.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={connectedEnvironment.type === "PySpark" ? "default" : "secondary"}>
                            {connectedEnvironment.type} {connectedEnvironment.version}
                          </Badge>
                          <span className="text-sm text-green-600">{connectedEnvironment.status}</span>
                        </div>
                      </div>
                    </div>
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
                      <SelectValue placeholder="Select execution environment" />
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
            <Button className="w-full" size="lg" onClick={handleRun} disabled={isRunning || !connectedEnvironment}>
              {isRunning ? "Running..." : "Run"}
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
