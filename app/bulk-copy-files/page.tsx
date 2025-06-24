"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, TestTube, Save, RotateCcw, Play, ArrowLeft, Upload, FileText, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

type RunStatus = "idle" | "running" | "success" | "error"
type SaveStatus = "idle" | "saved"

interface UploadedFile {
  file: File
  columns: string[]
  sampleData: any[]
}

export default function BulkCopyFilesPage() {
  const [runStatus, setRunStatus] = useState<RunStatus>("idle")
  const [destinationSaveStatus, setDestinationSaveStatus] = useState<SaveStatus>("idle")
  const [destinationTestStatus, setDestinationTestStatus] = useState<SaveStatus>("idle")

  // File upload states
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  // Destination form states
  const [destConnectionName, setDestConnectionName] = useState("")
  const [destConnectionType, setDestConnectionType] = useState("")
  const [destHost, setDestHost] = useState("")
  const [destPort, setDestPort] = useState("")
  const [destDatabase, setDestDatabase] = useState("")
  const [destSchema, setDestSchema] = useState("")
  const [destTableName, setDestTableName] = useState("")
  const [destUsername, setDestUsername] = useState("")
  const [destPassword, setDestPassword] = useState("")
  const [destApiKey, setDestApiKey] = useState("")

  const handleRun = async () => {
    setRunStatus("running")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const success = Math.random() > 0.3
    setRunStatus(success ? "success" : "error")
  }

  const handleSave = async () => {
    setDestinationSaveStatus("saved")
    setTimeout(() => setDestinationSaveStatus("idle"), 3000)
  }

  const handleTestConnection = async () => {
    setDestinationTestStatus("saved")
    setTimeout(() => setDestinationTestStatus("idle"), 3000)
  }

  const getButtonColor = (status: RunStatus | SaveStatus) => {
    if (runStatus === "running") return "bg-orange-500 text-white"
    if (runStatus === "success") return "bg-green-500 text-white"
    if (runStatus === "error") return "bg-red-500 text-white"
    if (status === "saved") return "bg-green-500 text-white"
    return "bg-white text-black border-2 border-gray-300 hover:bg-gray-50"
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      // Simulate file processing and column detection
      const mockColumns = ["id", "name", "email", "created_at", "status"]
      const mockSampleData = [
        { id: 1, name: "John Doe", email: "john@example.com", created_at: "2024-01-15", status: "active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2024-01-16", status: "active" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2024-01-17", status: "inactive" },
      ]

      const uploadedFile: UploadedFile = {
        file,
        columns: mockColumns,
        sampleData: mockSampleData,
      }

      setUploadedFiles((prev) => [...prev, uploadedFile])
    })
  }

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleReset = () => {
    setRunStatus("idle")
    setDestinationSaveStatus("idle")
    setDestinationTestStatus("idle")
    setUploadedFiles([])

    // Reset destination fields
    setDestConnectionName("")
    setDestConnectionType("")
    setDestHost("")
    setDestPort("")
    setDestDatabase("")
    setDestSchema("")
    setDestTableName("")
    setDestUsername("")
    setDestPassword("")
    setDestApiKey("")
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <Link href="/home" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Trial Run
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Copy from Files to Database</h1>
          <p className="text-gray-600">Configure and execute file to database ETL operations</p>
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
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:underline">Click to upload</span> or drag and drop
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleInputFileChange}
                    accept=".csv,.xlsx,.xls,.json,.txt"
                    multiple
                  />
                  <p className="text-sm text-gray-500">CSV, Excel, JSON, or TXT files (multiple files supported)</p>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Uploaded Files</Label>
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-700">{uploadedFile.file.name}</p>
                          <p className="text-xs text-green-600">
                            {uploadedFile.columns.length} columns detected • {uploadedFile.file.size} bytes
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dest-database">Database</Label>
                  <Input
                    id="dest-database"
                    value={destDatabase}
                    onChange={(e) => setDestDatabase(e.target.value)}
                    placeholder="analytics"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-schema">Schema</Label>
                  <Input
                    id="dest-schema"
                    value={destSchema}
                    onChange={(e) => setDestSchema(e.target.value)}
                    placeholder="public"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dest-table-name">Target Table Name</Label>
                <Input
                  id="dest-table-name"
                  value={destTableName}
                  onChange={(e) => setDestTableName(e.target.value)}
                  placeholder="imported_data"
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

              {(destConnectionType === "bigquery" || destConnectionType === "databricks") && (
                <div className="space-y-2">
                  <Label htmlFor="dest-api-key">API Key / Service Account</Label>
                  <Input
                    id="dest-api-key"
                    type="password"
                    value={destApiKey}
                    onChange={(e) => setDestApiKey(e.target.value)}
                    placeholder="Enter API key or service account details"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleTestConnection}
                  className={getButtonColor(destinationTestStatus)}
                  disabled={runStatus === "running"}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                  {destinationTestStatus === "saved" && <CheckCircle className="h-4 w-4 ml-2" />}
                </Button>
                <Button
                  onClick={handleSave}
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

        {/* Data Preview */}
        {uploadedFiles.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedFiles.map((uploadedFile, fileIndex) => (
                <div key={fileIndex} className="mb-6">
                  <h4 className="font-medium mb-3">{uploadedFile.file.name}</h4>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {uploadedFile.columns.map((column, index) => (
                            <TableHead key={index}>{column}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploadedFile.sampleData.slice(0, 3).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {uploadedFile.columns.map((column, colIndex) => (
                              <TableCell key={colIndex}>{row[column]}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Showing first 3 rows of sample data</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleRun}
              disabled={runStatus === "running" || uploadedFiles.length === 0}
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
            Upload files and configure destination to begin. Visual feedback is provided via color change: Orange
            indicates the process is ongoing, Green signifies successful completion, and Red denotes an error state.
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
