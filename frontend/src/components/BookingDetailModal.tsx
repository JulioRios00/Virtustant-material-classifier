import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  X,
  Calendar,
  User,
  Building,
  FileText,
  Package,
} from "lucide-react";
import { Booking } from "../types/booking";
import { format } from "date-fns";

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !booking) return null;

  const formatDate = (date: string | Date) => {
    return format(new Date(date), "EEEE, MMMM dd, yyyy 'at' h:mm a");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div
            className={`p-4 rounded-lg border-l-4 ${
              booking.isHazardous === true
                ? "bg-danger-50 border-danger-400"
                : booking.isHazardous === false
                ? "bg-success-50 border-success-400"
                : "bg-gray-50 border-gray-400"
            }`}
          >
            <div className="flex items-center">
              {booking.isHazardous === true && (
                <>
                  <AlertTriangle className="w-6 h-6 text-danger-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-danger-800">
                      Hazardous Materials Detected
                    </h3>
                    {booking.confidence && (
                      <p className="text-danger-600">
                        Confidence: {Math.round(booking.confidence * 100)}%
                      </p>
                    )}
                  </div>
                </>
              )}
              {booking.isHazardous === false && (
                <>
                  <CheckCircle className="w-6 h-6 text-success-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-success-800">
                      Non-Hazardous Materials
                    </h3>
                    {booking.confidence && (
                      <p className="text-success-600">
                        Confidence: {Math.round(booking.confidence * 100)}%
                      </p>
                    )}
                  </div>
                </>
              )}
              {booking.isHazardous === undefined && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Classification Pending
                  </h3>
                  <p className="text-gray-600">
                    This booking has not been classified yet
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Customer Information
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Customer Name
                  </label>
                  <p className="text-gray-900">{booking.customerName}</p>
                </div>
                {booking.companyName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Company
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {booking.companyName}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Booking ID
                  </label>
                  <p className="text-gray-900 font-mono">{booking.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Appointment Details
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Appointment Date & Time
                </label>
                <p className="text-gray-900">
                  {formatDate(booking.appointmentDate)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <Package className="w-5 h-5 mr-2" />
              Products ({booking.products.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {booking.products.map((product, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <FileText className="w-5 h-5 mr-2" />
              Description
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {booking.description}
              </p>
            </div>
          </div>

          {booking.internalNotes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2" />
                Internal Notes
              </h3>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {booking.internalNotes}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
