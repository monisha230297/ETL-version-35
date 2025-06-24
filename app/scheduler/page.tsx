"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, Plus, Play, Pause, Edit, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function Scheduler() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: "Daily User Sync",
      pipeline: "User Data Pipeline",
      frequency: "Daily",
      time: "02:00 AM",
      status: "active",
      nextRun: "2024-01-24 02:00:00",
      lastRun: "2024-01-23 02:00:00",
    },
    {
      id: 2,
      name: "Weekly Sales Report",
      pipeline: "Sales Analytics Pipeline",
      frequency: "Weekly",
      time: "Monday 06:00 AM",
      status: "active",
      nextRun: "2024-01-29 06:00:00",
      lastRun: "2024-01-22 06:00:00",
    },
    {
      id: 3,
      name: "Monthly Inventory Update",
      pipeline: "Inventory Pipeline",
      frequency: "Monthly",
      time: "1st day 01:00 AM",
      status: "paused",
      nextRun: "2024-02-01 01:00:00",
      lastRun: "2024-01-01 01:00:00",
    },
  ])

  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false)

  const toggleScheduleStatus = (id: number) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, status: schedule.status === "active" ? "paused" : "active" } : schedule,
      ),
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Scheduler</h1>
          <p className="text-muted-foreground">Manage automated pipeline executions</p>
        </div>

        {/* Create New Schedule */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Scheduled Jobs</h2>
            <p className="text-sm text-muted-foreground">Configure when your pipelines should run</p>
          </div>
          <Dialog open={isCreatingSchedule} onOpenChange={setIsCreatingSchedule}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Schedule</DialogTitle>
                <DialogDescription>Set up automated execution for your pipeline</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="schedule-name">Schedule Name</Label>
                  <Input id="schedule-name" placeholder="Enter schedule name" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="pipeline">Pipeline</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pipeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user-pipeline">User Data Pipeline</SelectItem>
                      <SelectItem value="sales-pipeline">Sales Analytics Pipeline</SelectItem>
                      <SelectItem value="inventory-pipeline">Inventory Pipeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom (Cron)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" defaultValue="02:00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="pst">PST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingSchedule(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreatingSchedule(false)}>Create Schedule</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Schedules List */}
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{schedule.name}</CardTitle>
                      <CardDescription>{schedule.pipeline}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={schedule.status === "active" ? "default" : "secondary"}>{schedule.status}</Badge>
                    <Button variant="outline" size="sm" onClick={() => toggleScheduleStatus(schedule.id)}>
                      {schedule.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Frequency:</span>
                    <span>
                      {schedule.frequency} at {schedule.time}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Next Run:</span>
                    <span className="ml-2 text-muted-foreground">{schedule.nextRun}</span>
                  </div>
                  <div>
                    <span className="font-medium">Last Run:</span>
                    <span className="ml-2 text-muted-foreground">{schedule.lastRun}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common scheduling operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Run All Active
              </Button>
              <Button variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause All
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
