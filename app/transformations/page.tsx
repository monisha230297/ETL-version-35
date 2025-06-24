"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Database, Play, Plus, Wand2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TransformationAgents() {
  const [activeTab, setActiveTab] = useState("no-code")
  const [sqlQuery, setSqlQuery] = useState(`SELECT 
  user_id,
  UPPER(full_name) as full_name,
  LOWER(email_address) as email_address,
  DATE_FORMAT(registration_date, '%Y-%m-%d') as registration_date
FROM source_table
WHERE registration_date >= '2024-01-01'`)

  const [pythonCode, setPythonCode] = useState(`import pandas as pd
import numpy as np

def transform_data(df):
    # Clean and transform the data
    df['full_name'] = df['full_name'].str.title()
    df['email_address'] = df['email_address'].str.lower()
    
    # Add calculated columns
    df['days_since_registration'] = (pd.Timestamp.now() - pd.to_datetime(df['registration_date'])).dt.days
    
    # Filter out invalid records
    df = df.dropna(subset=['email_address'])
    
    return df`)

  const transformations = [
    { id: 1, name: "User Data Cleanup", type: "No-Code", status: "active", description: "Clean user names and emails" },
    { id: 2, name: "Sales Aggregation", type: "SQL", status: "active", description: "Aggregate daily sales data" },
    {
      id: 3,
      name: "Customer Segmentation",
      type: "Python",
      status: "draft",
      description: "ML-based customer segmentation",
    },
  ]

  const noCodeRules = [
    { field: "full_name", operation: "Title Case", value: "" },
    { field: "email_address", operation: "Lowercase", value: "" },
    { field: "phone", operation: "Format", value: "(XXX) XXX-XXXX" },
    { field: "registration_date", operation: "Date Format", value: "YYYY-MM-DD" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transformation Agents</h1>
          <p className="text-muted-foreground">Create and manage data transformations</p>
        </div>

        {/* Existing Transformations */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Active Transformations</CardTitle>
                <CardDescription>Manage your existing transformation rules</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Transformation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transformations.map((transformation) => (
                <div key={transformation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {transformation.type === "No-Code" && <Wand2 className="h-5 w-5 text-purple-600" />}
                    {transformation.type === "SQL" && <Database className="h-5 w-5 text-blue-600" />}
                    {transformation.type === "Python" && <Code className="h-5 w-5 text-green-600" />}
                    <div>
                      <p className="font-medium">{transformation.name}</p>
                      <p className="text-sm text-muted-foreground">{transformation.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={transformation.status === "active" ? "default" : "secondary"}>
                      {transformation.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transformation Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Transformation Builder</CardTitle>
            <CardDescription>Create new data transformations using different methods</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="no-code" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  No-Code
                </TabsTrigger>
                <TabsTrigger value="sql" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  SQL
                </TabsTrigger>
                <TabsTrigger value="python" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Python
                </TabsTrigger>
              </TabsList>

              <TabsContent value="no-code" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Transformation Name</Label>
                    <Input placeholder="Enter transformation name" />
                  </div>

                  <div>
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

                  <div className="space-y-3">
                    <Label>Transformation Rules</Label>
                    {noCodeRules.map((rule, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div>
                          <Label className="text-xs">Field</Label>
                          <Input value={rule.field} readOnly />
                        </div>
                        <div>
                          <Label className="text-xs">Operation</Label>
                          <Select value={rule.operation}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Title Case">Title Case</SelectItem>
                              <SelectItem value="Lowercase">Lowercase</SelectItem>
                              <SelectItem value="Uppercase">Uppercase</SelectItem>
                              <SelectItem value="Format">Format</SelectItem>
                              <SelectItem value="Date Format">Date Format</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Value/Pattern</Label>
                          <Input value={rule.value} placeholder="Optional" />
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Rule
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sql" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Transformation Name</Label>
                    <Input placeholder="Enter transformation name" />
                  </div>

                  <div>
                    <Label>SQL Query</Label>
                    <Textarea
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className="font-mono text-sm min-h-[200px]"
                      placeholder="Enter your SQL transformation query..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Test Query
                    </Button>
                    <Button>Save Transformation</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="python" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Transformation Name</Label>
                    <Input placeholder="Enter transformation name" />
                  </div>

                  <div>
                    <Label>Python Code</Label>
                    <Textarea
                      value={pythonCode}
                      onChange={(e) => setPythonCode(e.target.value)}
                      className="font-mono text-sm min-h-[300px]"
                      placeholder="Enter your Python transformation code..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Test Code
                    </Button>
                    <Button>Save Transformation</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
