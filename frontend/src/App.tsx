import React, { useState, useEffect } from "react";
import { AlertTriangle, FileText, Database, BarChart3 } from "lucide-react";
import BookingTable from "./components/BookingTable";
import BookingDetailModal from "./components/BookingDetailModal";
import ClassificationForm from "./components/ClassificationForm";
import { useClassification } from "./hooks/useClassification";
import { Booking } from "./types/booking";

const sampleBookings: Booking[] = [
  {
    id: "booking-001",
    customerName: "John Smith",
    companyName: "Smith Industries",
    appointmentDate: "2024-03-15T10:00:00Z",
    description:
      "Need to dispose of old computer monitors and some paint cans from office renovation",
    products: ["Computer/Laptop", "Monitor/Display", "Paint/Stain"],
    internalNotes:
      "Customer mentioned the paint might be lead-based from 1980s building",
    isHazardous: true,
    confidence: 0.87,
  },
  {
    id: "booking-002",
    customerName: "Sarah Johnson",
    companyName: "Green Gardens LLC",
    appointmentDate: "2024-03-16T14:00:00Z",
    description:
      "Regular office cleanout - furniture, papers, some old printers",
    products: ["Furniture", "Books/Paper", "Printer/Scanner"],
    internalNotes: "Standard office items, nothing unusual",
    isHazardous: false,
    confidence: 0.73,
  },
  {
    id: "booking-003",
    customerName: "Mike Wilson",
    appointmentDate: "2024-03-17T09:00:00Z",
    description:
      "Garage cleanout including old car batteries, motor oil, antifreeze, and some gardening chemicals",
    products: ["Car Battery", "Motor Oil", "Antifreeze", "Pesticides"],
    internalNotes:
      "Multiple automotive fluids and garden chemicals - definitely hazardous",
    isHazardous: true,
    confidence: 0.95,
  },
  {
    id: "booking-004",
    customerName: "Lisa Chen",
    companyName: "Chen Medical Practice",
    appointmentDate: "2024-03-18T11:00:00Z",
    description:
      "Medical office closure - disposing of old medical equipment and expired medications",
    products: ["Medical Equipment", "Medications"],
    internalNotes: "Medical waste disposal required - special handling needed",
    isHazardous: true,
    confidence: 0.91,
  },
  {
    id: "booking-005",
    customerName: "Robert Davis",
    companyName: "Davis Construction",
    appointmentDate: "2024-03-19T08:00:00Z",
    description:
      "Construction site cleanup - mostly wood debris, metal scraps, and regular construction waste",
    products: ["Construction Debris", "Metal Scrap"],
    internalNotes: "Standard construction debris from residential project",
    isHazardous: false,
    confidence: 0.68,
  },
];

function App() {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"table" | "classify" | "backfill">(
    "table"
  );

  const { loading, backfillData } = useClassification();

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleBackfill = async () => {
    const unclassifiedBookings = bookings.filter(
      (b) => b.isHazardous === undefined
    );
    if (unclassifiedBookings.length === 0) {
      alert("No unclassified bookings to process");
      return;
    }

    const result = await backfillData(unclassifiedBookings);
    if (result) {
      alert(
        `Backfill completed! Processed: ${result.processed}, Hazardous: ${result.hazardous}, Non-Hazardous: ${result.nonHazardous}`
      );
    }
  };

  const stats = {
    total: bookings.length,
    hazardous: bookings.filter((b) => b.isHazardous === true).length,
    nonHazardous: bookings.filter((b) => b.isHazardous === false).length,
    pending: bookings.filter((b) => b.isHazardous === undefined).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-danger-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Hazardous Material Classifier
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Junk Disposal Compliance System
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("table")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "table"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Bookings Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab("classify")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "classify"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Classify New Booking
              </div>
            </button>
            <button
              onClick={() => setActiveTab("backfill")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "backfill"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Batch Processing
              </div>
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Database className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-danger-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-danger-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Hazardous</p>
                <p className="text-2xl font-bold text-danger-600">
                  {stats.hazardous}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <div className="w-6 h-6 bg-success-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Non-Hazardous
                </p>
                <p className="text-2xl font-bold text-success-600">
                  {stats.nonHazardous}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <div className="w-6 h-6 bg-warning-600 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-warning-600">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
        </div>

        {activeTab === "table" && (
          <BookingTable
            bookings={bookings}
            onSelectBooking={handleSelectBooking}
          />
        )}

        {activeTab === "classify" && (
          <ClassificationForm
            onClassificationComplete={handleClassificationComplete}
          />
        )}

        {activeTab === "backfill" && (
          <div className="card p-6">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-6 h-6 text-primary-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Batch Processing
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Process existing bookings to classify them for hazardous
                materials. This will analyze all unclassified bookings and
                update them with hazardous/non-hazardous status.
              </p>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This process respects the 100 API calls
                  per second limit and will process bookings in batches
                  accordingly.
                </p>
              </div>

              <button
                onClick={handleBackfill}
                disabled={loading}
                className="btn btn-primary flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Process Unclassified Bookings ({stats.pending})
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      <BookingDetailModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
