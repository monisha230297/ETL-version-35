"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Plus, Edit, Trash2, Minus } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useRouter } from "next/navigation"

interface Schedule {
  id: number
  scheduleName: string
  status: string
  layer: string
  loadType: string
  interval: string
  startTime: string
  endTime: string
}

export default function Scheduler() {
  const router = useRouter()

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      scheduleName: "Auto generated",
      status: "Active",
      layer: "All",
      loadType: "Full",
      interval: "30",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
    },
  ])

  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false)
  const [isEditingSchedule, setIsEditingSchedule] = useState(false)
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null)
  const [scheduleType, setScheduleType] = useState("")
  const [layer, setLayer] = useState("")
  const [domain, setDomain] = useState("")
  const [scheduleName, setScheduleName] = useState("")
  const [loadType, setLoadType] = useState("Full")
  const [interval, setInterval] = useState(30)
  const [repeatType, setRepeatType] = useState("Daily")
  const [timeZone, setTimeZone] = useState("UTC")
  const [specificTimes, setSpecificTimes] = useState<string[]>([""])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Scheduled run toggle
  const [scheduledRun, setScheduledRun] = useState("on")

  // Hourly specific fields
  const [hourlyInterval, setHourlyInterval] = useState(1)
  const [hourlyStartTime, setHourlyStartTime] = useState("09:00")

  // Daily specific fields
  const [dailyTime, setDailyTime] = useState("09:00")

  // Weekly specific fields
  const [weeklyDays, setWeeklyDays] = useState<string[]>([])
  const [weeklyTime, setWeeklyTime] = useState("09:00")

  // Monthly specific fields
  const [monthlyInterval, setMonthlyInterval] = useState(1)
  const [monthlyDayType, setMonthlyDayType] = useState("day") // "day" or "relative"
  const [monthlyDay, setMonthlyDay] = useState("")
  const [monthlyRelativeWeek, setMonthlyRelativeWeek] = useState("First")
  const [monthlyRelativeDay, setMonthlyRelativeDay] = useState("Sunday")
  const [monthlyTime, setMonthlyTime] = useState("09:00")

  const generateScheduleName = () => {
    const nextId = schedules.length + 1
    return `Schedule_${nextId.toString().padStart(3, "0")}`
  }

  const handleCreateSchedule = () => {
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      scheduleName: scheduleName || generateScheduleName(),
      status: "Active",
      layer: layer || "All",
      loadType: loadType,
      interval: scheduleType === "generic" ? interval.toString() : getIntervalFromRepeat(),
      startTime: getStartTimeFromRepeat(),
      endTime: "05:00 PM",
    }

    if (isEditingSchedule && editingScheduleId) {
      setSchedules(schedules.map((s) => (s.id === editingScheduleId ? { ...newSchedule, id: editingScheduleId } : s)))
      setIsEditingSchedule(false)
      setEditingScheduleId(null)
    } else {
      setSchedules([...schedules, newSchedule])
    }

    setIsCreatingSchedule(false)
    resetForm()
  }

  const getIntervalFromRepeat = () => {
    switch (repeatType) {
      case "Hourly":
        return `Every ${hourlyInterval} hour(s)`
      case "Daily":
        return "Daily"
      case "Weekly":
        return `Weekly (${weeklyDays.join(", ")})`
      case "Monthly":
        return `Every ${monthlyInterval} month(s) ${monthlyDayType === "day" ? `on day ${monthlyDay}` : `on ${monthlyRelativeWeek} ${monthlyRelativeDay}`}`
      default:
        return "Daily"
    }
  }

  const getStartTimeFromRepeat = () => {
    switch (repeatType) {
      case "Hourly":
        return hourlyStartTime
      case "Daily":
        return dailyTime
      case "Weekly":
        return weeklyTime
      case "Monthly":
        return monthlyTime
      default:
        return "09:00 AM"
    }
  }

  const resetForm = () => {
    setScheduleType("")
    setLayer("")
    setDomain("")
    setScheduleName("")
    setLoadType("Full")
    setInterval(30)
    setRepeatType("Daily")
    setTimeZone("UTC")
    setSpecificTimes([""])
    setStartDate("")
    setEndDate("")
    setScheduledRun("on")
    setHourlyInterval(1)
    setHourlyStartTime("09:00")
    setDailyTime("09:00")
    setWeeklyDays([])
    setWeeklyTime("09:00")
    setMonthlyInterval(1)
    setMonthlyDayType("day")
    setMonthlyDay("")
    setMonthlyRelativeWeek("First")
    setMonthlyRelativeDay("Sunday")
    setMonthlyTime("09:00")
  }

  const handleOpenDialog = () => {
    setScheduleName(generateScheduleName())
    setIsCreatingSchedule(true)
  }

  const handleEditSchedule = (schedule: Schedule) => {
    setScheduleName(schedule.scheduleName)
    setLayer(schedule.layer)
    setLoadType(schedule.loadType)
    setIsEditingSchedule(true)
    setEditingScheduleId(schedule.id)
    setIsCreatingSchedule(true)
  }

  const handleDeleteSchedule = (id: number) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((s) => s.id !== id))
    }
  }

  const handleScheduleLog = () => {
    router.push("/logs")
  }

  const addSpecificTime = () => {
    setSpecificTimes([...specificTimes, ""])
  }

  const updateSpecificTime = (index: number, value: string) => {
    const newTimes = [...specificTimes]
    newTimes[index] = value
    setSpecificTimes(newTimes)
  }

  const renderRepeatFields = () => {
    switch (repeatType) {
      case "Hourly":
        return (
          <div className="space-y-2">
            <div className="grid gap-1">
              <Label className="text-xs">Every</Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={hourlyInterval}
                  onChange={(e) => setHourlyInterval(Number(e.target.value) || 1)}
                  className="w-12 h-7 text-xs"
                  min="1"
                />
                <span className="text-xs">hour(s)</span>
              </div>
            </div>
            <div className="grid gap-1">
              <Label className="text-xs">Starting at</Label>
              <Input
                type="time"
                value={hourlyStartTime}
                onChange={(e) => setHourlyStartTime(e.target.value)}
                className="w-24 h-7 text-xs"
              />
            </div>
          </div>
        )

      case "Daily":
        return (
          <div className="grid gap-1">
            <Label className="text-xs">Time</Label>
            <Input
              type="time"
              value={dailyTime}
              onChange={(e) => setDailyTime(e.target.value)}
              className="w-24 h-7 text-xs"
            />
          </div>
        )

      case "Weekly":
        return (
          <div className="space-y-2">
            <div className="grid gap-1">
              <Label className="text-xs">Days of week</Label>
              <div className="space-y-1">
                <div className="grid grid-cols-4 gap-1">
                  {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                    <label key={day} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={weeklyDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setWeeklyDays([...weeklyDays, day])
                          } else {
                            setWeeklyDays(weeklyDays.filter((d) => d !== day))
                          }
                        }}
                        className="w-3 h-3"
                      />
                      <span className="text-xs">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {["Friday", "Saturday", "Sunday"].map((day) => (
                    <label key={day} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={weeklyDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setWeeklyDays([...weeklyDays, day])
                          } else {
                            setWeeklyDays(weeklyDays.filter((d) => d !== day))
                          }
                        }}
                        className="w-3 h-3"
                      />
                      <span className="text-xs">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-1">
              <Label className="text-xs">Time</Label>
              <Input
                type="time"
                value={weeklyTime}
                onChange={(e) => setWeeklyTime(e.target.value)}
                className="w-24 h-7 text-xs"
              />
            </div>
          </div>
        )

      case "Monthly":
        return (
          <div className="space-y-2">
            <div className="grid gap-1">
              <Label className="text-xs">Every</Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={monthlyInterval}
                  onChange={(e) => setMonthlyInterval(Number(e.target.value) || 1)}
                  className="w-12 h-7 text-xs"
                  min="1"
                />
                <span className="text-xs">Month(s)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="monthly-day"
                  name="monthly-type"
                  checked={monthlyDayType === "day"}
                  onChange={() => setMonthlyDayType("day")}
                  className="w-3 h-3 text-blue-600"
                />
                <Label htmlFor="monthly-day" className="text-xs flex items-center gap-1">
                  On day
                  <Input
                    type="text"
                    value={monthlyDay}
                    onChange={(e) => setMonthlyDay(e.target.value)}
                    className="w-12 h-6 text-xs"
                    placeholder=""
                    disabled={monthlyDayType !== "day"}
                  />
                </Label>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="monthly-relative"
                  name="monthly-type"
                  checked={monthlyDayType === "relative"}
                  onChange={() => setMonthlyDayType("relative")}
                  className="w-3 h-3 text-blue-600"
                />
                <Label htmlFor="monthly-relative" className="text-xs flex items-center gap-1">
                  On the
                  <Select
                    value={monthlyRelativeWeek}
                    onValueChange={setMonthlyRelativeWeek}
                    disabled={monthlyDayType !== "relative"}
                  >
                    <SelectTrigger className="w-20 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First">First</SelectItem>
                      <SelectItem value="Second">Second</SelectItem>
                      <SelectItem value="Third">Third</SelectItem>
                      <SelectItem value="Fourth">Fourth</SelectItem>
                      <SelectItem value="Last">Last</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={monthlyRelativeDay}
                    onValueChange={setMonthlyRelativeDay}
                    disabled={monthlyDayType !== "relative"}
                  >
                    <SelectTrigger className="w-24 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
              </div>
            </div>

            <div className="grid gap-1">
              <Label className="text-xs">Time</Label>
              <Input
                type="time"
                value={monthlyTime}
                onChange={(e) => setMonthlyTime(e.target.value)}
                className="w-24 h-7 text-xs"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Manage schedule</h1>
        </div>

        {/* New Schedule Button */}
        <div className="flex justify-start">
          <Dialog open={isCreatingSchedule} onOpenChange={setIsCreatingSchedule}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog} className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Manage schedule</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-3">
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="grid gap-1">
                      <Label htmlFor="layer" className="text-xs">
                        Layer
                      </Label>
                      <Select value={layer} onValueChange={setLayer}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="All/Source - Silver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Source - Silver">Source - Silver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-1">
                      <Label htmlFor="domain" className="text-xs">
                        Domain
                      </Label>
                      <Select value={domain} onValueChange={setDomain}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-1">
                      <Label htmlFor="schedule-name" className="text-xs">
                        Schedule name
                      </Label>
                      <Input
                        id="schedule-name"
                        value={scheduleName}
                        onChange={(e) => setScheduleName(e.target.value)}
                        placeholder="Auto generate"
                        className="h-8 text-xs"
                      />
                    </div>

                    <div className="grid gap-1">
                      <Label htmlFor="schedule-type" className="text-xs">
                        Schedule type
                      </Label>
                      <Select value={scheduleType} onValueChange={setScheduleType}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Generic / Specific" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="generic">Generic</SelectItem>
                          <SelectItem value="specific">Specific</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column - Generic */}
                  {scheduleType === "generic" && (
                    <div className="space-y-3">
                      <div className="grid gap-1">
                        <Label htmlFor="schedule-type-right" className="text-xs">
                          Schedule type
                        </Label>
                        <Input value="Generic" disabled className="bg-gray-50 h-8 text-xs" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-1">
                          <Label htmlFor="load-type" className="text-xs">
                            Load type
                          </Label>
                          <Select value={loadType} onValueChange={setLoadType}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full">Full</SelectItem>
                              <SelectItem value="Increment">Increment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-1">
                          <Label className="text-xs">Scheduled run</Label>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="scheduled-run-generic"
                                value="on"
                                checked={scheduledRun === "on"}
                                onChange={(e) => setScheduledRun(e.target.value)}
                                className="w-3 h-3 text-blue-600"
                              />
                              <span className="text-xs">On</span>
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="scheduled-run-generic"
                                value="off"
                                checked={scheduledRun === "off"}
                                onChange={(e) => setScheduledRun(e.target.value)}
                                className="w-3 h-3 text-blue-600"
                              />
                              <span className="text-xs">Off</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-1">
                        <Label htmlFor="interval" className="text-xs">
                          Interval
                        </Label>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setInterval(Math.max(1, interval - 1))}
                            className="h-7 w-7 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={interval}
                            onChange={(e) => setInterval(Number.parseInt(e.target.value) || 1)}
                            className="text-center w-12 h-7 text-xs"
                            min="1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setInterval(interval + 1)}
                            className="h-7 w-7 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          onClick={handleCreateSchedule}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 h-8 text-xs"
                        >
                          {isEditingSchedule ? "Update" : "Create"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Right Column - Specific */}
                  {scheduleType === "specific" && (
                    <div className="space-y-2 overflow-y-auto max-h-[60vh]">
                      <div className="grid gap-1">
                        <Label htmlFor="schedule-type-right" className="text-xs">
                          Schedule type
                        </Label>
                        <Input value="Specific" disabled className="bg-gray-50 h-8 text-xs" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-1">
                          <Label htmlFor="load-type" className="text-xs">
                            Load type
                          </Label>
                          <Select value={loadType} onValueChange={setLoadType}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full">Full</SelectItem>
                              <SelectItem value="Increment">Increment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-1">
                          <Label className="text-xs">Scheduled run</Label>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="scheduled-run-specific"
                                value="on"
                                checked={scheduledRun === "on"}
                                onChange={(e) => setScheduledRun(e.target.value)}
                                className="w-3 h-3 text-blue-600"
                              />
                              <span className="text-xs">On</span>
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="scheduled-run-specific"
                                value="off"
                                checked={scheduledRun === "off"}
                                onChange={(e) => setScheduledRun(e.target.value)}
                                className="w-3 h-3 text-blue-600"
                              />
                              <span className="text-xs">Off</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-1">
                        <Label htmlFor="repeat" className="text-xs">
                          Repeat
                        </Label>
                        <Select value={repeatType} onValueChange={setRepeatType}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {renderRepeatFields()}

                      <div className="grid gap-1">
                        <Label className="text-xs">Start date and time</Label>
                        <div className="grid grid-cols-2 gap-1">
                          <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Specific"
                            className="h-7 text-xs"
                          />
                          <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Specific"
                            className="h-7 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid gap-1">
                        <Label htmlFor="timezone" className="text-xs">
                          Time zone
                        </Label>
                        <Select value={timeZone} onValueChange={setTimeZone}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">(UTC-0) Coordinated Universal Time</SelectItem>
                            <SelectItem value="EST">(UTC-5) Eastern Standard Time</SelectItem>
                            <SelectItem value="CST">(UTC-6) Central Standard Time</SelectItem>
                            <SelectItem value="MST">(UTC-7) Mountain Standard Time</SelectItem>
                            <SelectItem value="PST">(UTC-8) Pacific Standard Time</SelectItem>
                            <SelectItem value="GMT">(UTC+0) Greenwich Mean Time</SelectItem>
                            <SelectItem value="CET">(UTC+1) Central European Time</SelectItem>
                            <SelectItem value="JST">(UTC+9) Japan Standard Time</SelectItem>
                            <SelectItem value="IST">(UTC+5:30) India Standard Time</SelectItem>
                            <SelectItem value="AEST">(UTC+10) Australian Eastern Standard Time</SelectItem>
                            <SelectItem value="NZST">(UTC+12) New Zealand Standard Time</SelectItem>
                            <SelectItem value="HST">(UTC-10) Hawaii Standard Time</SelectItem>
                            <SelectItem value="AKST">(UTC-9) Alaska Standard Time</SelectItem>
                            <SelectItem value="BRT">(UTC-3) Brazil Time</SelectItem>
                            <SelectItem value="CAT">(UTC+2) Central Africa Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-1 pt-1">
                        <Button
                          onClick={handleCreateSchedule}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-8 text-xs"
                        >
                          {isEditingSchedule ? "Apply" : "Apply"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsCreatingSchedule(false)
                            resetForm()
                          }}
                          className="flex-1 h-8 text-xs"
                        >
                          Discard
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Schedules Header */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Schedules</h2>
        </div>

        {/* Schedules Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">S/NO.</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Schedule name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Layer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Load Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Interval</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Start time</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">End time</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule, index) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2">{index + 1}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.scheduleName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.status}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.layer}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.loadType}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.interval}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.startTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{schedule.endTime}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditSchedule(schedule)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteSchedule(schedule.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Schedule Log Button */}
        <div className="flex justify-center pt-4">
          <Button onClick={handleScheduleLog} className="bg-indigo-600 hover:bg-indigo-700 px-8">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule log
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
