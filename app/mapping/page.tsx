"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
import { ArrowRight, Eye, Plus, Shuffle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function EntityDataMapping() {
  const [selectedSource, setSelectedSource] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const sources = [
    { id: "mysql-prod", name: "MySQL Production", tables: ["users", "orders", "products"] },
    { id: "postgres-analytics", name: "PostgreSQL Analytics", tables: ["customer_data", "sales_metrics"] },
  ]

  const destinations = [
    { id: "snowflake-warehouse", name: "Snowflake Warehouse", tables: ["dim_users", "fact_orders"] },
    { id: "bigquery-analytics", name: "BigQuery Analytics", tables: ["user_analytics", "order_analytics"] },
  ]

  const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", created_at: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2024-01-16" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2024-01-17" },
  ]

  const columnMappings = [
    { source: "id", destination: "user_id", type: "INTEGER", transformation: "None" },
    { source: "name", destination: "full_name", type: "VARCHAR(255)", transformation: "None" },
    { source: "email", destination: "email_address", type: "VARCHAR(255)", transformation: "Lowercase" },
    { source: "created_at", destination: "registration_date", type: "DATE", transformation: "Date Format" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Entity Data Mapping</h1>
          <p className="text-muted-foreground">Map data between source and destination tables</p>
        </div>

        {/* Source and Destination Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Source and Destination</CardTitle>
            <CardDescription>Choose the source and destination for your data mapping</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label>Source</Label>
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <Label>Destination</Label>
                <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination.id} value={destination.id}>
                        {destination.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Selection */}
        {selectedSource && selectedDestination && (
          <Card>
            <CardHeader>
              <CardTitle>Table Mapping</CardTitle>
              <CardDescription>Map tables between source and destination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <Label>Source Table</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source table" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">users</SelectItem>
                      <SelectItem value="orders">orders</SelectItem>
                      <SelectItem value="products">products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Shuffle className="h-6 w-6 text-blue-600" />
                </div>

                <div className="space-y-2">
                  <Label>Destination Table</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination table" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dim_users">dim_users</SelectItem>
                      <SelectItem value="fact_orders">fact_orders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Dialog open={showPreview} onOpenChange={setShowPreview}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Data
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Table Preview - users</DialogTitle>
                      <DialogDescription>Sample data from the source table</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-96 overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Created At</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleData.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>{row.created_at}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Mapping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Column Mapping */}
        <Card>
          <CardHeader>
            <CardTitle>Column Mapping</CardTitle>
            <CardDescription>Map columns between source and destination tables</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Column</TableHead>
                  <TableHead>Destination Column</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Transformation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {columnMappings.map((mapping, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{mapping.source}</TableCell>
                    <TableCell>{mapping.destination}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{mapping.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={mapping.transformation === "None" ? "secondary" : "default"}>
                        {mapping.transformation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
