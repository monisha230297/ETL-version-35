"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, Eye, Download, Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ScheduleLogs() {
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const logs = [
    {
      id: 1,
      scheduleName: "Daily User Sync",
      status: "completed",
      startTime: "2024-01-23 02:00:00",
      endTime: "2024-01-23 02:05:32",
      duration: "5m 32s",
      recordsProcessed: 15420,
      recordsInserted: 15420,
      recordsUpdated: 0,
      recordsFailed: 0,
      message: "Job completed successfully",
    },
    {
      id: 2,
      scheduleName: "Weekly Sales Report",
      status: "completed",
      startTime: "2024-01-22 06:00:00",
      endTime: "2024-01-22 06:08:15",
      duration: "8m 15s",
      recordsProcessed: 45230,
      recordsInserted: 45230,
      recordsUpdated: 0,
      recordsFailed: 0,
      message: "Job completed successfully",
    },
    {
      id: 3,
      scheduleName: "Inventory Update",
      status: "failed",
      startTime: "2024-01-22 01:00:00",
      endTime: "2024-01-22 01:02:45",
      duration: "2m 45s",
      recordsProcessed: 1250,
      recordsInserted: 0,
      recordsUpdated: 0,
      recordsFailed: 1250,
      message: "Connection timeout to destination database",
    },
    {
      id: 4,
      scheduleName: "Customer Analytics",
      status: "running",
      startTime: "2024-01-23 08:00:00",
      endTime: null,
      duration: "15m 30s",
      recordsProcessed: 8500,
      recordsInserted: 8500,
      recordsUpdated: 0,
      recordsFailed: 0,
      message: "Processing customer data...",
    },
    {
      id: 5,
      scheduleName: "Daily User Sync",
      status: "completed",
      startTime: "2024-01-22 02:00:00",
      endTime: "2024-01-22 02:04:18",
      duration: "4m 18s",
      recordsProcessed: 14890,
      recordsInserted: 14890,
      recordsUpdated: 0,
      recordsFailed: 0,
      message: "Job completed successfully",
    },
  ]

  const filteredLogs = logs.filter((log) => {
    const matchesStatus = filterStatus === "all" || log.status === filterStatus
    const matchesSearch = log.scheduleName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Schedule Logs</h1>
          <p className="text-muted-foreground">Monitor pipeline execution history and performance</p>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Logs</CardTitle>
            <CardDescription>Search and filter execution logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by schedule name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Execution History</CardTitle>
            <CardDescription>Recent pipeline execution logs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Schedule Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        {log.scheduleName}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>{log.startTime}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Processed: {log.recordsProcessed.toLocaleString()}</div>
                        {log.recordsFailed > 0 && (
                          <div className="text-red-600">Failed: {log.recordsFailed.toLocaleString()}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLog(log)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Execution Details - {log.scheduleName}</DialogTitle>
                            <DialogDescription>Detailed information about this pipeline execution</DialogDescription>
                          </DialogHeader>
                          {selectedLog && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <div className="mt-1">{getStatusBadge(selectedLog.status)}</div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Duration</Label>
                                  <p className="mt-1">{selectedLog.duration}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Start Time</Label>
                                  <p className="mt-1">{selectedLog.startTime}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">End Time</Label>
                                  <p className="mt-1">{selectedLog.endTime || "Still running"}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Records Processed</Label>
                                  <p className="mt-1 text-lg font-semibold">
                                    {selectedLog.recordsProcessed.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Records Inserted</Label>
                                  <p className="mt-1 text-lg font-semibold text-green-600">
                                    {selectedLog.recordsInserted.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Records Updated</Label>
                                  <p className="mt-1 text-lg font-semibold text-blue-600">
                                    {selectedLog.recordsUpdated.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Records Failed</Label>
                                  <p className="mt-1 text-lg font-semibold text-red-600">
                                    {selectedLog.recordsFailed.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Message</Label>
                                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedLog.message}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {logs.filter((log) => log.status === "completed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {logs.filter((log) => log.status === "failed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Currently Running</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {logs.filter((log) => log.status === "running").length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
