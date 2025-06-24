"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, Activity, Users, Settings, Database, ArrowUp, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function Dashboard() {
  const stats = [
    { title: "Active Pipelines", value: "12", icon: Activity, color: "text-blue-600", change: "+2" },
    { title: "Data Sources", value: "8", icon: Database, color: "text-green-600", change: "+1" },
    { title: "Users", value: "24", icon: Users, color: "text-purple-600", change: "+3" },
    { title: "Configurations", value: "16", icon: Settings, color: "text-orange-600", change: "0" },
  ]

  const recentRuns = [
    { id: 1, name: "Customer Data Sync", status: "completed", time: "2 hours ago", duration: "5m 32s" },
    { id: 2, name: "Sales Report ETL", status: "running", time: "Now", duration: "2m 15s" },
    { id: 3, name: "Inventory Update", status: "failed", time: "4 hours ago", duration: "1m 45s" },
    { id: 4, name: "User Analytics", status: "completed", time: "6 hours ago", duration: "8m 12s" },
    { id: 5, name: "Product Catalog Sync", status: "completed", time: "8 hours ago", duration: "3m 22s" },
  ]

  const systemHealth = [
    { component: "Database Connections", status: "healthy", message: "All connections active" },
    { component: "Transformation Engine", status: "healthy", message: "Processing normally" },
    { component: "Scheduler Service", status: "warning", message: "High memory usage" },
    { component: "Data Warehouse", status: "healthy", message: "Optimal performance" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your ETL processes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUp className="h-3 w-3" />
                  <span>{stat.change} from last week</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current status of ETL system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === "healthy" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {item.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                    {item.status === "error" && <XCircle className="h-5 w-5 text-red-600" />}
                    <div>
                      <p className="font-medium">{item.component}</p>
                      <p className="text-sm text-muted-foreground">{item.message}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.status === "healthy" ? "default" : item.status === "warning" ? "secondary" : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Runs</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Jobs</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Pipeline Runs</CardTitle>
                <CardDescription>Latest ETL pipeline executions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRuns.map((run) => (
                    <div key={run.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {run.status === "completed" && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {run.status === "running" && <Clock className="h-5 w-5 text-blue-600 animate-spin" />}
                        {run.status === "failed" && <XCircle className="h-5 w-5 text-red-600" />}
                        <div>
                          <p className="font-medium">{run.name}</p>
                          <p className="text-sm text-muted-foreground">{run.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            run.status === "completed"
                              ? "default"
                              : run.status === "running"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {run.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{run.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Scheduled Jobs</CardTitle>
                <CardDescription>Next scheduled pipeline runs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Daily User Sync</p>
                        <p className="text-sm text-muted-foreground">Tomorrow at 2:00 AM</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Weekly Sales Report</p>
                        <p className="text-sm text-muted-foreground">Monday at 6:00 AM</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent system notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">High Memory Usage</p>
                      <p className="text-sm text-muted-foreground">Scheduler service using 85% memory</p>
                    </div>
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No other alerts at the moment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
