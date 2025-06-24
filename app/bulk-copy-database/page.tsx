"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, TestTube, Save, RotateCcw, Play, ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

type RunStatus = "idle" | "running" | "success" | "error"
type SaveStatus = "idle" | "saved"

export default function BulkCopyDatabasePage() {
  const [runStatus, setRunStatus] = useState<RunStatus>("idle")
  const [sourceSaveStatus, setSourceSaveStatus] = useState<SaveStatus>("idle")
  const [destinationSaveStatus, setDestinationSaveStatus] = useState<SaveStatus>("idle")
  const [sourceTestStatus, setSourceTestStatus] = useState<SaveStatus>("idle")
  const [destinationTestStatus, setDestinationTestStatus] = useState<SaveStatus>("idle")

  // Source form states
  const [sourceConnectionName, setSourceConnectionName] = useState("")
  const [sourceConnectionType, setSourceConnectionType] = useState("")
  const [sourceHost, setSourceHost] = useState("")
  const [sourcePort, setSourcePort] = useState("")
  const [sourceDatabase, setSourceDatabase] = useState("")
  const [sourceUsername, setSourceUsername] = useState("")
  const [sourcePassword, setSourcePassword] = useState("")
  const [userQuery, setUserQuery] = useState("")
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM your_table_name WHERE condition")

  // Destination form states
  const [destConnectionName, setDestConnectionName] = useState("")
  const [destConnectionType, setDestConnectionType] = useState("")
  const [destHost, setDestHost] = useState("")
  const [destPort, setDestPort] = useState("")
  const [destDatabase, setDestDatabase] = useState("")
  const [destUsername, setDestUsername] = useState("")
  const [destPassword, setDestPassword] = useState("")

  const handleRun = async () => {
    setRunStatus("running")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const success = Math.random() > 0.3
    setRunStatus(success ? "success" : "error")
  }

  const handleSave = async (type: "source" | "destination") => {
    if (type === "source") {
      setSourceSaveStatus("saved")
      setTimeout(() => setSourceSaveStatus("idle"), 3000)
    } else {
      setDestinationSaveStatus("saved")
      setTimeout(() => setDestinationSaveStatus("idle"), 3000)
    }
  }

  const handleTestConnection = async (type: "source" | "destination") => {
    if (type === "source") {
      setSourceTestStatus("saved")
      setTimeout(() => setSourceTestStatus("idle"), 3000)
    } else {
      setDestinationTestStatus("saved")
      setTimeout(() => setDestinationTestStatus("idle"), 3000)
    }
  }

  const getButtonColor = (status: RunStatus | SaveStatus) => {
    if (runStatus === "running") return "bg-orange-500 text-white"
    if (runStatus === "success") return "bg-green-500 text-white"
    if (runStatus === "error") return "bg-red-500 text-white"
    if (status === "saved") return "bg-green-500 text-white"
    return "bg-white text-black border-2 border-gray-300 hover:bg-gray-50"
  }

  const handleReset = () => {
    setRunStatus("idle")
    setSourceSaveStatus("idle")
    setDestinationSaveStatus("idle")
    setSourceTestStatus("idle")
    setDestinationTestStatus("idle")

    // Reset source fields
    setSourceConnectionName("")
    setSourceConnectionType("")
    setSourceHost("")
    setSourcePort("")
    setSourceDatabase("")
    setSourceUsername("")
    setSourcePassword("")
    setUserQuery("")
    setSqlQuery("SELECT * FROM your_table_name WHERE condition")

    // Reset destination fields
    setDestConnectionName("")
    setDestConnectionType("")
    setDestHost("")
    setDestPort("")
    setDestDatabase("")
    setDestUsername("")
    setDestPassword("")
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <Link href="/home" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Trial Run
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Copy from Database</h1>
          <p className="text-gray-600">Configure and execute database to database ETL operations</p>
        </div>

        {/* Pipeline Status */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  runStatus === "running"
                    ? "bg-orange-500"
                    : runStatus === "success"
                      ? "bg-green-500"
                      : runStatus === "error"
                        ? "bg-red-500"
                        : "bg-gray-400"
                }`}
              >
                1
              </div>
              <span
                className={`font-semibold ${
                  runStatus === "running"
                    ? "text-orange-500"
                    : runStatus === "success"
                      ? "text-green-500"
                      : runStatus === "error"
                        ? "text-red-500"
                        : "text-gray-600"
                }`}
              >
                Source
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-300 rounded"></div>

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  runStatus === "running"
                    ? "bg-orange-500"
                    : runStatus === "success"
                      ? "bg-green-500"
                      : runStatus === "error"
                        ? "bg-red-500"
                        : "bg-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`font-semibold ${
                  runStatus === "running"
                    ? "text-orange-500"
                    : runStatus === "success"
                      ? "text-green-500"
                      : runStatus === "error"
                        ? "text-red-500"
                        : "text-gray-600"
                }`}
              >
                Transform
              </span>
            </div>

            <div className="flex-1 h-1 bg-gray-300 rounded"></div>

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  runStatus === "running"
                    ? "bg-orange-500"
                    : runStatus === "success"
                      ? "bg-green-500"
                      : runStatus === "error"
                        ? "bg-red-500"
                        : "bg-gray-400"
                }`}
              >
                3
              </div>
              <span
                className={`font-semibold ${
                  runStatus === "running"
                    ? "text-orange-500"
                    : runStatus === "success"
                      ? "text-green-500"
                      : runStatus === "error"
                        ? "text-red-500"
                        : "text-gray-600"
                }`}
              >
                Target
              </span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">Red - Error, Orange - In progress, Green - Completed</div>
        </div>

        {/* Configuration Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Source Configuration */}
          <Card>
            <CardHeader>
              <Tabs defaultValue="source" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="source"
                    className="bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Source
                  </TabsTrigger>
                  <TabsTrigger value="destination" className="bg-gray-100">
                    Destination
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-connection-name">Connection Name</Label>
                <Input
                  id="source-connection-name"
                  value={sourceConnectionName}
                  onChange={(e) => setSourceConnectionName(e.target.value)}
                  placeholder="Enter connection name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-connection-type">Database Type</Label>
                <Select value={sourceConnectionType} onValueChange={setSourceConnectionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                    <SelectItem value="sqlserver">SQL Server</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source-host">Host</Label>
                  <Input
                    id="source-host"
                    value={sourceHost}
                    onChange={(e) => setSourceHost(e.target.value)}
                    placeholder="database.company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-port">Port</Label>
                  <Input
                    id="source-port"
                    value={sourcePort}
                    onChange={(e) => setSourcePort(e.target.value)}
                    placeholder="3306"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-database">Database Name</Label>
                <Input
                  id="source-database"
                  value={sourceDatabase}
                  onChange={(e) => setSourceDatabase(e.target.value)}
                  placeholder="production"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source-username">Username</Label>
                  <Input
                    id="source-username"
                    value={sourceUsername}
                    onChange={(e) => setSourceUsername(e.target.value)}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-password">Password</Label>
                  <Input
                    id="source-password"
                    type="password"
                    value={sourcePassword}
                    onChange={(e) => setSourcePassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-query">User Query (Optional)</Label>
                <Input
                  id="user-query"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Enter custom query name or description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sql-query">SQL Query</Label>
                <Textarea
                  id="sql-query"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="SELECT * FROM table_name WHERE condition"
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleTestConnection("source")}
                  className={getButtonColor(sourceTestStatus)}
                  disabled={runStatus === "running"}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                  {sourceTestStatus === "saved" && <CheckCircle className="h-4 w-4 ml-2" />}
                </Button>
                <Button
                  onClick={() => handleSave("source")}
                  className={getButtonColor(sourceSaveStatus)}
                  disabled={runStatus === "running"}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                  {sourceSaveStatus === "saved" && <CheckCircle className="h-4 w-4 ml-2" />}
                </Button>
              </div>

              {sourceSaveStatus === "saved" && (
                <div className="text-green-600 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Source configuration saved successfully
                </div>
              )}

              {sourceTestStatus === "saved" && (
                <div className="text-green-600 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Source connection tested successfully
                </div>
              )}
            </CardContent>
          </Card>

          {/* Destination Configuration */}
          <Card>
            <CardHeader>
              <Tabs defaultValue="destination" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="source" className="bg-gray-100">
                    Source
                  </TabsTrigger>
                  <TabsTrigger
                    value="destination"
                    className="bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Destination
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dest-connection-name">Connection Name</Label>
                <Input
                  id="dest-connection-name"
                  value={destConnectionName}
                  onChange={(e) => setDestConnectionName(e.target.value)}
                  placeholder="Enter connection name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dest-connection-type">Destination Type</Label>
                <Select value={destConnectionType} onValueChange={setDestConnectionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="snowflake">Snowflake</SelectItem>
                    <SelectItem value="bigquery">BigQuery</SelectItem>
                    <SelectItem value="redshift">Amazon Redshift</SelectItem>
                    <SelectItem value="databricks">Databricks</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dest-host">Host/URL</Label>
                  <Input
                    id="dest-host"
                    value={destHost}
                    onChange={(e) => setDestHost(e.target.value)}
                    placeholder="warehouse.company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-port">Port</Label>
                  <Input
                    id="dest-port"
                    value={destPort}
                    onChange={(e) => setDestPort(e.target.value)}
                    placeholder="443"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dest-database">Database/Schema</Label>
                <Input
                  id="dest-database"
                  value={destDatabase}
                  onChange={(e) => setDestDatabase(e.target.value)}
                  placeholder="analytics"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dest-username">Username</Label>
                  <Input
                    id="dest-username"
                    value={destUsername}
                    onChange={(e) => setDestUsername(e.target.value)}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-password">Password</Label>
                  <Input
                    id="dest-password"
                    type="password"
                    value={destPassword}
                    onChange={(e) => setDestPassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleTestConnection("destination")}
                  className={getButtonColor(destinationTestStatus)}
                  disabled={runStatus === "running"}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                  {destinationTestStatus === "saved" && <CheckCircle className="h-4 w-4 ml-2" />}
                </Button>
                <Button
                  onClick={() => handleSave("destination")}
                  className={getButtonColor(destinationSaveStatus)}
                  disabled={runStatus === "running"}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                  {destinationSaveStatus === "saved" && <CheckCircle className="h-4 w-4 ml-2" />}
                </Button>
              </div>

              {destinationSaveStatus === "saved" && (
                <div className="text-green-600 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Destination configuration saved successfully
                </div>
              )}

              {destinationTestStatus === "saved" && (
                <div className="text-green-600 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Destination connection tested successfully
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleRun}
              disabled={runStatus === "running"}
              className="px-12 py-3 text-lg font-semibold bg-white text-black border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              {runStatus === "running" ? (
                <>
                  <Clock className="h-5 w-5 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Run
                </>
              )}
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold"
              disabled={runStatus === "running"}
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>

          {runStatus !== "idle" && (
            <div className="mt-4">
              <Badge
                variant={runStatus === "success" ? "default" : runStatus === "error" ? "destructive" : "secondary"}
                className="text-sm"
              >
                {runStatus === "running" && "Process is ongoing..."}
                {runStatus === "success" && "Process completed successfully!"}
                {runStatus === "error" && "Process failed with errors"}
              </Badge>
            </div>
          )}

          <div className="mt-2 text-sm text-gray-500">
            On click, it triggers the execution process. Visual feedback is provided via color change: Orange indicates
            the process is ongoing, Green signifies successful completion, and Red denotes an error state.
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
