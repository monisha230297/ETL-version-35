"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Calendar,
  Edit,
  Eye,
  Play,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from "lucide-react"

export default function NoCodeTransformation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [tableNameFilter, setTableNameFilter] = useState("")
  const [objectTypeFilter, setObjectTypeFilter] = useState("")
  const [selectedTables, setSelectedTables] = useState([])
  const [droppedTables, setDroppedTables] = useState([])
  const [draggedTable, setDraggedTable] = useState(null)
  const [showRunDialog, setShowRunDialog] = useState(false)
  const [showTableNameDialog, setShowTableNameDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [newTableName, setNewTableName] = useState("")
  const [editingTable, setEditingTable] = useState(null)
  const [goldLayerTables, setGoldLayerTables] = useState([])
  const [runResult, setRunResult] = useState(null)

  // Scheduling dialog state
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduleType, setScheduleType] = useState("")
  const [layer, setLayer] = useState("")
  const [domain, setDomain] = useState("")
  const [scheduleName, setScheduleName] = useState("")
  const [loadType, setLoadType] = useState("Full")
  const [interval, setInterval] = useState(30)
  const [repeatType, setRepeatType] = useState("Daily")
  const [timeZone, setTimeZone] = useState("UTC")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [scheduledRun, setScheduledRun] = useState("on")
  const [hourlyInterval, setHourlyInterval] = useState(1)
  const [hourlyStartTime, setHourlyStartTime] = useState("09:00")
  const [dailyTime, setDailyTime] = useState("09:00")
  const [weeklyDays, setWeeklyDays] = useState<string[]>([])
  const [weeklyTime, setWeeklyTime] = useState("09:00")
  const [monthlyInterval, setMonthlyInterval] = useState(1)
  const [monthlyDayType, setMonthlyDayType] = useState("day")
  const [monthlyDay, setMonthlyDay] = useState("")
  const [monthlyRelativeWeek, setMonthlyRelativeWeek] = useState("First")
  const [monthlyRelativeDay, setMonthlyRelativeDay] = useState("Sunday")
  const [monthlyTime, setMonthlyTime] = useState("09:00")

  // Enhanced sample silver layer tables with more fact and dimension tables
  const silverLayerTables = [
    {
      id: 1,
      tableName: "Sale order",
      definition: "Sales transaction data",
      objectType: "Fact",
      waterMark: ["Ship Time", "Ship Date", "Order Date"],
      columns: [
        { name: "Order Quantity", selected: true, aggregations: ["Total", "Average", "Count", "Min", "Max"] },
        { name: "Order Number", selected: false, aggregations: [] },
        { name: "Unit Price", selected: false, aggregations: ["Total", "Average", "Min", "Max"] },
        { name: "Discount Amount", selected: false, aggregations: ["Total", "Average"] },
        { name: "Tax Amount", selected: false, aggregations: ["Total", "Average"] },
      ],
    },
    {
      id: 2,
      tableName: "Regions",
      definition: "Geographic regions data",
      objectType: "Dimension",
      waterMark: [],
      columns: [
        { name: "Region ID", selected: false, aggregations: [] },
        { name: "Region Name", selected: true, aggregations: [] },
        { name: "Country", selected: false, aggregations: [] },
        { name: "Continent", selected: false, aggregations: [] },
      ],
    },
    {
      id: 3,
      tableName: "Products",
      definition: "Product catalog data",
      objectType: "Dimension",
      waterMark: [],
      columns: [
        { name: "Product ID", selected: false, aggregations: [] },
        { name: "Product Name", selected: true, aggregations: [] },
        { name: "Category", selected: false, aggregations: [] },
        { name: "Price", selected: false, aggregations: ["Average", "Min", "Max"] },
        { name: "Stock Quantity", selected: false, aggregations: ["Total", "Average"] },
      ],
    },
    {
      id: 4,
      tableName: "Customers",
      definition: "Customer information",
      objectType: "Dimension",
      waterMark: [],
      columns: [
        { name: "Customer ID", selected: false, aggregations: [] },
        { name: "Customer Name", selected: true, aggregations: [] },
        { name: "Email", selected: false, aggregations: [] },
        { name: "Phone", selected: false, aggregations: [] },
        { name: "Registration Date", selected: false, aggregations: [] },
      ],
    },
    {
      id: 5,
      tableName: "Inventory",
      definition: "Inventory tracking data",
      objectType: "Fact",
      waterMark: ["Last Updated"],
      columns: [
        { name: "Stock Level", selected: false, aggregations: ["Total", "Average", "Min", "Max"] },
        { name: "Reorder Point", selected: false, aggregations: ["Average"] },
        { name: "Cost Per Unit", selected: false, aggregations: ["Average", "Min", "Max"] },
      ],
    },
    {
      id: 6,
      tableName: "Suppliers",
      definition: "Supplier information",
      objectType: "Dimension",
      waterMark: [],
      columns: [
        { name: "Supplier ID", selected: false, aggregations: [] },
        { name: "Supplier Name", selected: true, aggregations: [] },
        { name: "Contact Person", selected: false, aggregations: [] },
        { name: "Country", selected: false, aggregations: [] },
      ],
    },
    {
      id: 7,
      tableName: "Financial Transactions",
      definition: "Financial transaction records",
      objectType: "Fact",
      waterMark: ["Transaction Date", "Posted Date"],
      columns: [
        { name: "Transaction Amount", selected: false, aggregations: ["Total", "Average", "Min", "Max"] },
        { name: "Transaction Type", selected: false, aggregations: [] },
        { name: "Currency Code", selected: false, aggregations: [] },
        { name: "Exchange Rate", selected: false, aggregations: ["Average"] },
      ],
    },
    {
      id: 8,
      tableName: "Employee",
      definition: "Employee master data",
      objectType: "Dimension",
      waterMark: [],
      columns: [
        { name: "Employee ID", selected: false, aggregations: [] },
        { name: "Employee Name", selected: true, aggregations: [] },
        { name: "Department", selected: false, aggregations: [] },
        { name: "Salary", selected: false, aggregations: ["Average", "Min", "Max"] },
        { name: "Hire Date", selected: false, aggregations: [] },
      ],
    },
  ]

  // Sample data for preview
  const getSampleData = (columnName) => {
    const sampleDataMap = {
      "Order Quantity": [150, 200, 75, 300, 125],
      "Order Number": ["ORD-001", "ORD-002", "ORD-003", "ORD-004", "ORD-005"],
      "Unit Price": [25.99, 45.5, 12.75, 89.99, 33.25],
      "Total of Order Quantity": [825, 1200, 450, 1800, 750],
      "Average of Order Quantity": [165, 180, 95, 250, 140],
      "Customer Name": ["John Smith", "Alice Johnson", "Bob Wilson", "Sarah Davis", "Mike Brown"],
      "Product Name": ["Laptop", "Mouse", "Keyboard", "Monitor", "Headphones"],
      "Region Name": ["North", "South", "East", "West", "Central"],
      "Stock Level": [500, 250, 1000, 75, 300],
      "Transaction Amount": [1250.5, 899.99, 2100.0, 450.25, 750.75],
      "Employee Name": ["David Lee", "Emma Wilson", "James Taylor", "Lisa Anderson", "Tom Garcia"],
    }

    return sampleDataMap[columnName] || ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"]
  }

  const generateScheduleName = () => {
    return `Schedule_${Date.now().toString().slice(-3)}`
  }

  const handleCreateSchedule = () => {
    // Handle schedule creation logic here
    console.log("Schedule created:", {
      scheduleName: scheduleName || generateScheduleName(),
      scheduleType,
      layer,
      domain,
      loadType,
      repeatType,
    })
    setShowScheduleDialog(false)
    resetScheduleForm()
  }

  const resetScheduleForm = () => {
    setScheduleType("")
    setLayer("")
    setDomain("")
    setScheduleName("")
    setLoadType("Full")
    setInterval(30)
    setRepeatType("Daily")
    setTimeZone("UTC")
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

  const handleManageSchedule = () => {
    setScheduleName(generateScheduleName())
    setShowScheduleDialog(true)
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

  // AI suggestion logic
  useEffect(() => {
    if (searchQuery.trim()) {
      const suggestions = []
      if (searchQuery.toLowerCase().includes("sales")) {
        suggestions.push("Sale order", "Customer Behavior", "Products", "Customers")
      } else if (searchQuery.toLowerCase().includes("customer")) {
        suggestions.push("Customers", "Customer Behavior", "Sale order")
      } else if (searchQuery.toLowerCase().includes("product")) {
        suggestions.push("Products", "Sale order", "Regions")
      } else if (searchQuery.toLowerCase().includes("inventory")) {
        suggestions.push("Inventory", "Products", "Suppliers")
      } else if (searchQuery.toLowerCase().includes("financial")) {
        suggestions.push("Financial Transactions", "Sale order", "Customers")
      } else {
        suggestions.push("Sale order", "Customer Behavior", "Products", "Customers")
      }
      setAiSuggestions(suggestions)
    } else {
      setAiSuggestions([])
    }
  }, [searchQuery])

  // Filter tables based on search criteria
  const filteredTables = silverLayerTables.filter((table) => {
    const matchesTableName = !tableNameFilter || table.tableName.toLowerCase().includes(tableNameFilter.toLowerCase())
    const matchesObjectType =
      !objectTypeFilter || table.objectType.toLowerCase().includes(objectTypeFilter.toLowerCase())
    return matchesTableName && matchesObjectType
  })

  // Handle table selection
  const handleTableSelect = (tableId, checked) => {
    if (checked) {
      setSelectedTables([...selectedTables, tableId])
    } else {
      setSelectedTables(selectedTables.filter((id) => id !== tableId))
    }
  }

  // Handle drag start
  const handleDragStart = (e, table) => {
    setDraggedTable(table)
    e.dataTransfer.effectAllowed = "move"
  }

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault()
    if (draggedTable && !droppedTables.find((t) => t.id === draggedTable.id)) {
      setDroppedTables([...droppedTables, { ...draggedTable, expanded: false }])
    }
    setDraggedTable(null)
  }

  // Handle AI suggestion click
  const handleSuggestionClick = (suggestion) => {
    const table = silverLayerTables.find((t) => t.tableName === suggestion)
    if (table && !droppedTables.find((t) => t.id === table.id)) {
      setDroppedTables([...droppedTables, { ...table, expanded: false }])
    }
  }

  // Toggle table expansion in dropped area
  const toggleTableExpansion = (tableId) => {
    setDroppedTables(
      droppedTables.map((table) => (table.id === tableId ? { ...table, expanded: !table.expanded } : table)),
    )
  }

  // Update column selection
  const updateColumnSelection = (tableId, columnName, selected) => {
    setDroppedTables(
      droppedTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              columns: table.columns.map((col) => (col.name === columnName ? { ...col, selected } : col)),
            }
          : table,
      ),
    )
  }

  // Update column aggregation
  const updateColumnAggregation = (tableId, columnName, aggregation, selected) => {
    setDroppedTables(
      droppedTables.map((table) => {
        if (table.id === tableId) {
          const updatedColumns = [...table.columns]
          if (selected) {
            // Add aggregated column
            const aggregatedColumnName = `${aggregation} of ${columnName}`
            if (!updatedColumns.find((col) => col.name === aggregatedColumnName)) {
              updatedColumns.push({
                name: aggregatedColumnName,
                selected: true,
                aggregations: [],
                isAggregated: true,
              })
            }
          } else {
            // Remove aggregated column
            const aggregatedColumnName = `${aggregation} of ${columnName}`
            const index = updatedColumns.findIndex((col) => col.name === aggregatedColumnName)
            if (index > -1) {
              updatedColumns.splice(index, 1)
            }
          }
          return { ...table, columns: updatedColumns }
        }
        return table
      }),
    )
  }

  // Remove table from dropped area
  const removeDroppedTable = (tableId) => {
    setDroppedTables(droppedTables.filter((table) => table.id !== tableId))
  }

  // Handle Run button click
  const handleRun = () => {
    setShowRunDialog(true)
  }

  // Get all selected columns from all tables
  const getAllSelectedColumns = () => {
    const allColumns = []
    droppedTables.forEach((table) => {
      table.columns.forEach((column) => {
        if (column.selected) {
          allColumns.push({
            tableName: table.tableName,
            columnName: column.name,
            isAggregated: column.isAggregated || false,
          })
        }
      })
    })
    return allColumns
  }

  // Handle Create button click
  const handleCreate = () => {
    setNewTableName(searchQuery || "Business Requirement")
    setShowRunDialog(false)
    setShowTableNameDialog(true)
  }

  // Handle Save table
  const handleSaveTable = () => {
    const newGoldTable = {
      id: goldLayerTables.length + 1,
      sourceId: newTableName.replace(/\s+/g, "_").toLowerCase(),
      tableName: `F_${newTableName.replace(/\s+/g, "_")}`,
      sourceQuery: "SELECT * FROM transformed_data...",
      dataFlowFlag: "SLV-GLD",
    }
    setGoldLayerTables([...goldLayerTables, newGoldTable])
    setShowTableNameDialog(false)
    setNewTableName("")
    // Reset the transformation
    setDroppedTables([])
  }

  // Handle Edit button click
  const handleEdit = (table) => {
    setEditingTable({ ...table })
    setShowEditDialog(true)
  }

  // Handle View button click
  const handleView = (table) => {
    setEditingTable(table)
    setShowViewDialog(true)
  }

  // Handle Run table button click
  const handleRunTable = async (table) => {
    setRunResult({ tableId: table.id, status: "running" })

    // Simulate table run
    setTimeout(() => {
      const success = Math.random() > 0.2
      setRunResult({
        tableId: table.id,
        status: success ? "success" : "error",
        message: success
          ? `Table ${table.tableName} executed successfully! Data transferred from Silver to Gold layer.`
          : `Table ${table.tableName} execution failed. Connection timeout to Silver layer.`,
      })

      // Clear result after 5 seconds
      setTimeout(() => setRunResult(null), 5000)
    }, 2000)
  }

  // Handle Save Edit
  const handleSaveEdit = () => {
    setGoldLayerTables(goldLayerTables.map((table) => (table.id === editingTable.id ? editingTable : table)))
    setShowEditDialog(false)
    setEditingTable(null)
  }

  return (
    <TooltipProvider>
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

          {/* No Code Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-orange-500">No Code</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side */}
            <div className="space-y-6">
              {/* Get AI Suggestion */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-orange-500">Get AI Suggestion</span>
                  </div>

                  <div className="relative mb-4">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter business requirement..."
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>

                  {/* AI Suggestions */}
                  {aiSuggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-sm cursor-pointer"
                          draggable
                          onDragStart={(e) => {
                            const table = silverLayerTables.find((t) => t.tableName === suggestion)
                            if (table) handleDragStart(e, table)
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Silver Layer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-500">Silver Layer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Filters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Table Name</label>
                      <div className="relative">
                        <Input
                          value={tableNameFilter}
                          onChange={(e) => setTableNameFilter(e.target.value)}
                          placeholder="Filter by table name"
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Object Type</label>
                      <div className="relative">
                        <Input
                          value={objectTypeFilter}
                          onChange={(e) => setObjectTypeFilter(e.target.value)}
                          placeholder="Filter by object type"
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="p-2 text-left text-sm font-medium">S/No</th>
                          <th className="p-2 text-left text-sm font-medium">Table Name</th>
                          <th className="p-2 text-left text-sm font-medium">Definition</th>
                          <th className="p-2 text-left text-sm font-medium">Object Type</th>
                          <th className="p-2 text-left text-sm font-medium">Water Mark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTables.map((table, index) => (
                          <tr
                            key={table.id}
                            className="border-t hover:bg-gray-50 cursor-move"
                            draggable
                            onDragStart={(e) => handleDragStart(e, table)}
                          >
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selectedTables.includes(table.id)}
                                  onCheckedChange={(checked) => handleTableSelect(table.id, checked)}
                                />
                                <span className="text-sm">{index + 1}</span>
                              </div>
                            </td>
                            <td className="p-2 text-sm font-medium">{table.tableName}</td>
                            <td className="p-2 text-sm">{table.definition}</td>
                            <td className="p-2 text-sm">{table.objectType}</td>
                            <td className="p-2">
                              <div className="space-y-1">
                                {table.waterMark.map((mark, idx) => (
                                  <div key={idx} className="text-xs">
                                    <span className={idx < 2 ? "text-red-500" : ""}>{mark}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Drag instruction */}
                  <div className="text-center text-sm text-muted-foreground">
                    Drag tables to the right panel or click AI suggestions →
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Dropped Tables */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Tables</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 min-h-[400px]" onDragOver={handleDragOver} onDrop={handleDrop}>
                  {droppedTables.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg">
                      <p>Drop tables here or click AI suggestions</p>
                      <p className="text-sm mt-2">Drag tables from the left panel</p>
                    </div>
                  ) : (
                    droppedTables.map((table) => (
                      <Card key={table.id} className="border">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <CardTitle className="text-sm cursor-help">{table.tableName}</CardTitle>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs space-y-1">
                                  <div>No. of Columns: 5 | Record Count: 5 | Last Refresh Date: 21/04/2025</div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => toggleTableExpansion(table.id)}>
                                {table.expanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => removeDroppedTable(table.id)}>
                                ×
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            No. of Columns: {table.columns.length} | Record Count: 5 | Last Refresh Date: 21/04/2025
                          </div>
                        </CardHeader>

                        {table.expanded && (
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                                <span>S/No</span>
                                <span>Column Name</span>
                                <span>If Aggregation</span>
                              </div>
                              {table.columns.map((column, idx) => (
                                <div key={idx} className="grid grid-cols-3 gap-2 items-center text-sm">
                                  <div className="flex items-center gap-1">
                                    <Checkbox
                                      checked={column.selected}
                                      onCheckedChange={(checked) =>
                                        updateColumnSelection(table.id, column.name, checked)
                                      }
                                    />
                                    <span>{idx + 1}</span>
                                  </div>
                                  <span className={column.name.includes("Order Quantity") ? "text-red-500" : ""}>
                                    {column.name}
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    {column.aggregations?.map((agg) => (
                                      <div key={agg} className="flex items-center gap-1">
                                        <Checkbox
                                          checked={table.columns.some((col) => col.name === `${agg} of ${column.name}`)}
                                          onCheckedChange={(checked) =>
                                            updateColumnAggregation(table.id, column.name, agg, checked)
                                          }
                                        />
                                        <span className="text-xs">{agg}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))
                  )}

                  {/* Run Button */}
                  {droppedTables.length > 0 && (
                    <Button onClick={handleRun} className="w-full" size="lg">
                      Run
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gold Layer */}
          {goldLayerTables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Gold Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border p-2 text-left text-sm font-medium">S/No</th>
                        <th className="border p-2 text-left text-sm font-medium">Source Id</th>
                        <th className="border p-2 text-left text-sm font-medium">Table Name</th>
                        <th className="border p-2 text-left text-sm font-medium">Source Query</th>
                        <th className="border p-2 text-left text-sm font-medium">Data flow flag</th>
                        <th className="border p-2 text-left text-sm font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {goldLayerTables.map((table, index) => (
                        <tr key={table.id} className="hover:bg-gray-50">
                          <td className="border p-2 text-sm">{index + 1}</td>
                          <td className="border p-2 text-sm">{table.sourceId}</td>
                          <td className="border p-2 text-sm font-medium">{table.tableName}</td>
                          <td
                            className="border p-2 text-sm cursor-pointer hover:bg-blue-50"
                            onDoubleClick={() => handleView(table)}
                            title="Double-click to view"
                          >
                            {table.sourceQuery}
                          </td>
                          <td className="border p-2 text-sm">{table.dataFlowFlag}</td>
                          <td className="border p-2">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(table)} title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleView(table)} title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRunTable(table)}
                                disabled={runResult?.tableId === table.id && runResult?.status === "running"}
                                title="Run"
                              >
                                {runResult?.tableId === table.id && runResult?.status === "running" ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Run Result */}
                {runResult && runResult.status !== "running" && (
                  <div
                    className={`mt-4 p-3 rounded-lg border ${
                      runResult.status === "success"
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {runResult.status === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span className="font-medium">{runResult.status === "success" ? "Success" : "Error"}</span>
                    </div>
                    <p className="text-sm mt-1">{runResult.message}</p>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleManageSchedule}
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 bg-transparent"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Run Dialog */}
          <Dialog open={showRunDialog} onOpenChange={setShowRunDialog}>
            <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Preview Selected Columns</DialogTitle>
              </DialogHeader>
              <div className="flex-1 flex flex-col space-y-4 min-h-0">
                <div className="flex-1 overflow-auto border rounded-lg min-h-0">
                  <table className="w-full border-collapse table-fixed min-w-max">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="border p-3 text-left text-sm font-medium w-16 min-w-[60px]">S/No</th>
                        {getAllSelectedColumns().map((col, index) => (
                          <th key={index} className="border p-3 text-left text-sm font-medium min-w-[150px] w-40">
                            <div className="truncate" title={col.columnName}>
                              {col.columnName}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          <td className="border p-3 text-sm font-medium w-16">{rowIndex}</td>
                          {getAllSelectedColumns().map((col, colIndex) => (
                            <td key={colIndex} className="border p-3 text-sm w-40">
                              <div className="truncate" title={getSampleData(col.columnName)[rowIndex - 1]}>
                                {getSampleData(col.columnName)[rowIndex - 1]}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center pt-4 flex-shrink-0">
                  <Button onClick={handleCreate} className="bg-red-500 hover:bg-red-600">
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Table Name Dialog */}
          <Dialog open={showTableNameDialog} onOpenChange={setShowTableNameDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Define Table Name</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Table Name</label>
                  <Input
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="Enter table name"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveTable}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Table</DialogTitle>
              </DialogHeader>
              {editingTable && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Table Name</label>
                    <Input
                      value={editingTable.tableName}
                      onChange={(e) => setEditingTable({ ...editingTable, tableName: e.target.value })}
                      placeholder="Enter table name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Source Query</label>
                    <Textarea
                      value={editingTable.sourceQuery}
                      onChange={(e) => setEditingTable({ ...editingTable, sourceQuery: e.target.value })}
                      placeholder="Enter source query"
                      className="min-h-[100px] font-mono text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>Save</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* View Dialog */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>View Source Query</DialogTitle>
              </DialogHeader>
              {editingTable && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Table Name</label>
                    <div className="p-2 bg-gray-50 rounded border text-sm">{editingTable.tableName}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Source Query</label>
                    <div className="p-3 bg-gray-50 rounded border font-mono text-sm whitespace-pre-wrap">
                      {editingTable.sourceQuery}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setShowViewDialog(false)}>Close</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Schedule Dialog */}
          <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
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
                          Create
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
                          Apply
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowScheduleDialog(false)
                            resetScheduleForm()
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
      </DashboardLayout>
    </TooltipProvider>
  )
}
