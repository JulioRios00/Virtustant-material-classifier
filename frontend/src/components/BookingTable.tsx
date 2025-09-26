import React from "react";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Booking } from "../types/booking";
import { format } from "date-fns";

interface BookingTableProps {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onSelectBooking,
}) => {
  const getHazardousBadge = (booking: Booking) => {
    if (booking.isHazardous === undefined) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      );
    }

    if (booking.isHazardous) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-50 text-danger-700">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Hazardous
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700">
        <CheckCircle className="w-3 h-3 mr-1" />
        Non-Hazardous
      </span>
    );
  };

  const getConfidenceBadge = (confidence?: number) => {
    if (confidence === undefined) return null;

    const percentage = Math.round(confidence * 100);
    let colorClass = "bg-gray-100 text-gray-800";

    if (percentage >= 80) {
      colorClass = "bg-success-100 text-success-800";
    } else if (percentage >= 60) {
      colorClass = "bg-warning-100 text-warning-800";
    } else {
      colorClass = "bg-danger-100 text-danger-800";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
      >
        <TrendingUp className="w-3 h-3 mr-1" />
        {percentage}%
      </span>
    );
  };

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Bookings Overview</h3>
        <p className="text-sm text-gray-500">
          Total: {bookings.length} | Hazardous:{" "}
          {bookings.filter((b) => b.isHazardous).length} | Non-Hazardous:{" "}
          {bookings.filter((b) => b.isHazardous === false).length} | Pending:{" "}
          {bookings.filter((b) => b.isHazardous === undefined).length}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appointment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.customerName}
                  </div>
                  <div className="text-sm text-gray-500">ID: {booking.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.companyName || "-"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(booking.appointmentDate), "MMM dd, yyyy")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(booking.appointmentDate), "h:mm a")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getHazardousBadge(booking)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getConfidenceBadge(booking.confidence)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onSelectBooking?.(booking)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No bookings available
        </div>
      )}
    </div>
  );
};

export default BookingTable;
