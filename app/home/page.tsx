"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Database, FileText } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleBulkCopyFromDatabase = () => {
    router.push("/bulk-copy-database")
  }

  const handleBulkCopyFromFiles = () => {
    router.push("/bulk-copy-files")
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trial Run</h1>
        </div>

        {/* Main Action Cards */}
        <div className="flex justify-center gap-8 mb-16">
          {/* Bulk Copy from Database Card */}
          <Card
            className="w-80 h-48 cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray-300 bg-gray-100"
            onClick={handleBulkCopyFromDatabase}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <Database className="h-16 w-16 text-gray-600 mb-4" />
              <h2 className="text-xl font-semibold text-red-500 text-center">Bulk copy from Database</h2>
            </CardContent>
          </Card>

          {/* Bulk Copy from Files Card */}
          <Card
            className="w-80 h-48 cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray-300 bg-gray-100"
            onClick={handleBulkCopyFromFiles}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <FileText className="h-16 w-16 text-gray-600 mb-4" />
              <h2 className="text-xl font-semibold text-red-500 text-center">Bulk copy from Files to Database</h2>
            </CardContent>
          </Card>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-auto">Home &gt; Trial Run</div>
      </div>
    </DashboardLayout>
  )
}
