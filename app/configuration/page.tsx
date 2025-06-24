"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, TestTube } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ConfigurationManager() {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Data Warehouse",
      connectionType: "Snowflake",
      serverType: "Cloud",
      host: "warehouse.company.com",
      status: "connected",
      lastEditedBy: "John Doe",
    },
    {
      id: 2,
      name: "Analytics DB",
      connectionType: "BigQuery",
      serverType: "Cloud",
      host: "bigquery.googleapis.com",
      status: "connected",
      lastEditedBy: "Jane Smith",
    },
  ])

  const [sources, setSources] = useState([
    {
      id: 1,
      name: "MySQL Production",
      connectionType: "MySQL",
      serverType: "On Premise",
      host: "prod-db.company.com",
      status: "connected",
      lastEditedBy: "Alice Brown",
    },
    {
      id: 2,
      name: "PostgreSQL Analytics",
      connectionType: "PostgreSQL",
      serverType: "Cloud",
      host: "analytics-db.company.com",
      status: "connected",
      lastEditedBy: "Bob Wilson",
    },
    {
      id: 3,
      name: "MongoDB Logs",
      connectionType: "MongoDB",
      serverType: "On Premise",
      host: "logs-db.company.com",
      status: "disconnected",
      lastEditedBy: "Carol Davis",
    },
  ])

  const [isAddingSource, setIsAddingSource] = useState(false)
  const [isAddingDestination, setIsAddingDestination] = useState(false)
  const [connectionType, setConnectionType] = useState("")
  const [destConnectionType, setDestConnectionType] = useState("")

  const [editingSource, setEditingSource] = useState(null)
  const [editingDestination, setEditingDestination] = useState(null)

  const handleEditSource = (source) => {
    setEditingSource(source)
    setConnectionType("sql") // Set default or based on source type
    setIsAddingSource(true)
  }

  const handleEditDestination = (destination) => {
    setEditingDestination(destination)
    setDestConnectionType("sql") // Set default or based on destination type
    setIsAddingDestination(true)
  }

  const handleTestConnection = (id: number, type: "source" | "destination") => {
    // Simulate connection test
    console.log(`Testing connection for ${type} ${id}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configuration Manager</h1>
          <p className="text-muted-foreground">Manage your data sources and destinations</p>
        </div>

        <Tabs defaultValue="sources" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Data Sources</h2>
              <Dialog open={isAddingSource} onOpenChange={setIsAddingSource}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingSource ? "Edit Data Source" : "Add Data Source"}</DialogTitle>
                    <DialogDescription>Configure a new data source connection</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="source-name">Connection Name</Label>
                      <Input id="source-name" placeholder="Enter connection name" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="server-type">Server Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select server type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on-premise">On Premise</SelectItem>
                            <SelectItem value="cloud">Cloud</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="connection-type">Connection Type</Label>
                        <Select value={connectionType} onValueChange={setConnectionType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select connection type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sql">SQL</SelectItem>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="flat">Flat File</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Dynamic fields based on connection type */}
                    {connectionType === "sql" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="host">Host Name / IP Address</Label>
                          <Input id="host" placeholder="database.company.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="port">Port</Label>
                            <Input id="port" placeholder="3306" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="database">Database</Label>
                            <Input id="database" placeholder="production" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="username" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="password" />
                          </div>
                        </div>
                      </>
                    )}

                    {connectionType === "api" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="relative-url">Relative URL</Label>
                          <Input id="relative-url" placeholder="https://api.example.com/v1" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="auth-type">Authentication Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select authentication type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="oauth">OAuth</SelectItem>
                              <SelectItem value="api-key">API Key</SelectItem>
                              <SelectItem value="bearer">Bearer Token</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="api-username">Username</Label>
                            <Input id="api-username" placeholder="API username" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="api-password">Password/Token</Label>
                            <Input id="api-password" type="password" placeholder="API password or token" />
                          </div>
                        </div>
                      </>
                    )}

                    {connectionType === "flat" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="file-path">File Path</Label>
                          <Input id="file-path" placeholder="/path/to/your/file.csv" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="file-type">File Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select file type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                              <SelectItem value="xml">XML</SelectItem>
                              <SelectItem value="txt">Text</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="delimiter">Delimiter</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select delimiter" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="comma">Comma (,)</SelectItem>
                                <SelectItem value="semicolon">Semicolon (;)</SelectItem>
                                <SelectItem value="tab">Tab</SelectItem>
                                <SelectItem value="pipe">Pipe (|)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="encoding">Encoding</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select encoding" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="utf8">UTF-8</SelectItem>
                                <SelectItem value="utf16">UTF-16</SelectItem>
                                <SelectItem value="ascii">ASCII</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingSource(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddingSource(false)}>Save Configuration</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S/No.</TableHead>
                      <TableHead>Connection Name</TableHead>
                      <TableHead>Connection Type</TableHead>
                      <TableHead>Server Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sources.map((source, index) => (
                      <TableRow key={source.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{source.name}</TableCell>
                        <TableCell>{source.connectionType}</TableCell>
                        <TableCell>{source.serverType}</TableCell>
                        <TableCell>
                          <Badge variant={source.status === "connected" ? "default" : "destructive"}>
                            {source.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{source.lastEditedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTestConnection(source.id, "source")}
                            >
                              <TestTube className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditSource(source)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="destinations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Destinations</h2>
              <Dialog open={isAddingDestination} onOpenChange={setIsAddingDestination}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Destination
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingDestination ? "Edit Destination" : "Add Destination"}</DialogTitle>
                    <DialogDescription>Configure a new destination connection</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dest-name">Connection Name</Label>
                      <Input id="dest-name" placeholder="Enter connection name" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dest-server-type">Server Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select server type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on-premise">On Premise</SelectItem>
                            <SelectItem value="cloud">Cloud</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dest-connection-type">Connection Type</Label>
                        <Select value={destConnectionType} onValueChange={setDestConnectionType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select connection type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clickhouse">ClickHouse</SelectItem>
                            <SelectItem value="bigquery">Google BigQuery</SelectItem>
                            <SelectItem value="snowflake">Snowflake</SelectItem>
                            <SelectItem value="redshift">Amazon Redshift</SelectItem>
                            <SelectItem value="databricks">Databricks</SelectItem>
                            <SelectItem value="starrocks">StarRocks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Dynamic fields for destination */}
                    {destConnectionType === "sql" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="dest-host">Host Name / IP Address</Label>
                          <Input id="dest-host" placeholder="warehouse.company.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="dest-port">Port</Label>
                            <Input id="dest-port" placeholder="443" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="dest-database">Database</Label>
                            <Input id="dest-database" placeholder="analytics" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="dest-username">Username</Label>
                            <Input id="dest-username" placeholder="username" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="dest-password">Password</Label>
                            <Input id="dest-password" type="password" placeholder="password" />
                          </div>
                        </div>
                      </>
                    )}

                    {destConnectionType === "api" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="dest-relative-url">Relative URL</Label>
                          <Input id="dest-relative-url" placeholder="https://api.destination.com/v1" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="dest-auth-type">Authentication Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select authentication type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="oauth">OAuth</SelectItem>
                              <SelectItem value="api-key">API Key</SelectItem>
                              <SelectItem value="bearer">Bearer Token</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {destConnectionType === "flat" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="dest-file-path">File Path</Label>
                          <Input id="dest-file-path" placeholder="/output/path/data.csv" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="dest-file-type">File Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select file type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                              <SelectItem value="xml">XML</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingDestination(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddingDestination(false)}>Save Configuration</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S/No.</TableHead>
                      <TableHead>Connection Name</TableHead>
                      <TableHead>Connection Type</TableHead>
                      <TableHead>Server Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {destinations.map((destination, index) => (
                      <TableRow key={destination.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{destination.name}</TableCell>
                        <TableCell>{destination.connectionType}</TableCell>
                        <TableCell>{destination.serverType}</TableCell>
                        <TableCell>
                          <Badge variant={destination.status === "connected" ? "default" : "destructive"}>
                            {destination.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{destination.lastEditedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTestConnection(destination.id, "destination")}
                            >
                              <TestTube className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditDestination(destination)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
