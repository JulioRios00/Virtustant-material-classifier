import React, { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useClassification } from "../hooks/useClassification";
import { Booking } from "../types/booking";

interface ClassificationFormProps {
  onClassificationComplete: (result: any) => void;
}

const ClassificationForm: React.FC<ClassificationFormProps> = ({
  onClassificationComplete,
}) => {
  const [formData, setFormData] = useState<Omit<Booking, "id">>({
    customerName: "",
    companyName: "",
    appointmentDate: "",
    description: "",
    products: [],
    internalNotes: "",
  });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [classificationResult, setClassificationResult] = useState<any>(null);

  const { loading, error, classifySingle } = useClassification();

  const availableProducts = [
    "Computer/Laptop",
    "Television",
    "Monitor/Display",
    "Printer/Scanner",
    "Phone/Mobile Device",
    "Gaming Console",
    "Electronic Components",
    "Refrigerator",
    "Air Conditioner",
    "Washing Machine",
    "Dryer",
    "Microwave",
    "Dishwasher",
    "Car Battery",
    "Motor Oil",
    "Antifreeze",
    "Brake Fluid",
    "Transmission Fluid",
    "Car Parts",
    "Tires",
    "Paint/Stain",
    "Paint Thinner",
    "Cleaning Chemicals",
    "Pesticides",
    "Fertilizer",
    "Pool Chemicals",
    "Fluorescent Bulbs",
    "CFL Bulbs",
    "LED Bulbs",
    "Light Fixtures",
    "Medical Equipment",
    "Medications",
    "Syringes/Needles",
    "Asbestos Materials",
    "Insulation",
    "Roofing Materials",
    "Construction Debris",
    "Furniture",
    "Clothing/Textiles",
    "Books/Paper",
    "Plastic Items",
    "Metal Scrap",
    "Garden Waste",
    "Food Waste",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const booking: Booking = {
      ...formData,
      id: `booking-${Date.now()}`,
      products: selectedProducts,
    };

    const result = await classifySingle(booking);
    if (result) {
      setClassificationResult(result);
      onClassificationComplete(result);
    }
  };

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card p-6">
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 text-primary-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">
          Classify New Booking
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              className="input"
              value={formData.customerName}
              onChange={(e) =>
                handleInputChange("customerName", e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              className="input"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Date & Time *
            </label>
            <input
              type="datetime-local"
              className="input"
              value={formData.appointmentDate}
              onChange={(e) =>
                handleInputChange("appointmentDate", e.target.value)
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            className="textarea"
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe the items to be disposed of..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Products ({selectedProducts.length} selected)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {availableProducts.map((product) => (
              <label
                key={product}
                className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                  selectedProducts.includes(product)
                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedProducts.includes(product)}
                  onChange={() => toggleProduct(product)}
                />
                <span className="text-sm">{product}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Internal Notes
          </label>
          <textarea
            className="textarea"
            rows={3}
            value={formData.internalNotes}
            onChange={(e) => handleInputChange("internalNotes", e.target.value)}
            placeholder="Additional internal notes..."
          />
        </div>

        {error && (
          <div className="flex items-center p-4 bg-danger-50 text-danger-700 rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {classificationResult && (
          <div
            className={`p-4 rounded-lg ${
              classificationResult.isHazardous
                ? "bg-danger-50 text-danger-700 border border-danger-200"
                : "bg-success-50 text-success-700 border border-success-200"
            }`}
          >
            <div className="flex items-center mb-2">
              {classificationResult.isHazardous ? (
                <AlertCircle className="w-5 h-5 mr-2" />
              ) : (
                <CheckCircle className="w-5 h-5 mr-2" />
              )}
              <span className="font-semibold">
                Classification:{" "}
                {classificationResult.isHazardous
                  ? "Hazardous"
                  : "Non-Hazardous"}
              </span>
            </div>
            <p className="text-sm mb-2">
              Confidence: {Math.round(classificationResult.confidence * 100)}%
            </p>
            {classificationResult.reasons.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Reasons:</p>
                <ul className="text-sm list-disc list-inside">
                  {classificationResult.reasons.map(
                    (reason: string, index: number) => (
                      <li key={index}>{reason}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Classifying...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Classify Booking
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassificationForm;
