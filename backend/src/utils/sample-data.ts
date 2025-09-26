export const sampleBookings = [
  {
    id: "booking-001",
    customerName: "John Smith",
    companyName: "Smith Industries",
    appointmentDate: "2024-03-15T10:00:00Z",
    description: "Need to dispose of old computer monitors and some paint cans from office renovation",
    products: ["Computer/Laptop", "Monitor/Display", "Paint/Stain"],
    internalNotes: "Customer mentioned the paint might be lead-based from 1980s building"
  },
  {
    id: "booking-002",
    customerName: "Sarah Johnson",
    companyName: "Green Gardens LLC",
    appointmentDate: "2024-03-16T14:00:00Z",
    description: "Regular office cleanout - furniture, papers, some old printers",
    products: ["Furniture", "Books/Paper", "Printer/Scanner"],
    internalNotes: "Standard office items, nothing unusual"
  },
  {
    id: "booking-003",
    customerName: "Mike Wilson",
    companyName: null,
    appointmentDate: "2024-03-17T09:00:00Z",
    description: "Garage cleanout including old car batteries, motor oil, antifreeze, and some gardening chemicals",
    products: ["Car Battery", "Motor Oil", "Antifreeze", "Pesticides"],
    internalNotes: "Multiple automotive fluids and garden chemicals - definitely hazardous"
  },
  {
    id: "booking-004",
    customerName: "Lisa Chen",
    companyName: "Chen Medical Practice",
    appointmentDate: "2024-03-18T11:00:00Z",
    description: "Medical office closure - disposing of old medical equipment and expired medications",
    products: ["Medical Equipment", "Medications"],
    internalNotes: "Medical waste disposal required - special handling needed"
  },
  {
    id: "booking-005",
    customerName: "Robert Davis",
    companyName: "Davis Construction",
    appointmentDate: "2024-03-19T08:00:00Z",
    description: "Construction site cleanup - mostly wood debris, metal scraps, and regular construction waste",
    products: ["Construction Debris", "Metal Scrap"],
    internalNotes: "Standard construction debris from residential project"
  },
  {
    id: "booking-006",
    customerName: "Emma Thompson",
    companyName: null,
    appointmentDate: "2024-03-20T15:00:00Z",
    description: "Home renovation cleanup - removing old fluorescent light fixtures and some cleaning supplies",
    products: ["Light Fixtures", "Fluorescent Bulbs", "Cleaning Chemicals"],
    internalNotes: "Old fluorescent bulbs from 1990s kitchen renovation"
  },
  {
    id: "booking-007",
    customerName: "James Rodriguez",
    companyName: "Rodriguez Auto Shop",
    appointmentDate: "2024-03-21T13:00:00Z",
    description: "Auto shop cleanout - transmission fluid, brake fluid, used oil filters, and old tires",
    products: ["Transmission Fluid", "Brake Fluid", "Car Parts", "Tires"],
    internalNotes: "Automotive shop waste - all fluids need proper hazardous disposal"
  },
  {
    id: "booking-008",
    customerName: "Nancy White",
    companyName: "White Real Estate",
    appointmentDate: "2024-03-22T10:00:00Z",
    description: "Property cleanout for estate sale - clothing, furniture, books, and household items",
    products: ["Clothing/Textiles", "Furniture", "Books/Paper"],
    internalNotes: "Standard household items from estate cleanout"
  },
  {
    id: "booking-009",
    customerName: "David Kim",
    companyName: "Kim Electronics Repair",
    appointmentDate: "2024-03-23T12:00:00Z",
    description: "Electronics repair shop closure - old CRT monitors, circuit boards, and electronic components",
    products: ["Monitor/Display", "Electronic Components", "Computer/Laptop"],
    internalNotes: "Large quantity of old electronics including CRT monitors with lead"
  },
  {
    id: "booking-010",
    customerName: "Carol Martinez",
    companyName: null,
    appointmentDate: "2024-03-24T16:00:00Z",
    description: "Spring cleaning - donating clothes, disposing of old household items and garden waste",
    products: ["Clothing/Textiles", "Plastic Items", "Garden Waste"],
    internalNotes: "Mostly donations and compostable materials"
  }
];

export const largeSampleBookings = Array.from({ length: 100 }, (_, index) => {
  const baseBooking = sampleBookings[index % sampleBookings.length];
  return {
    ...baseBooking,
    id: `booking-${String(index + 1).padStart(3, '0')}`,
    customerName: `${baseBooking.customerName} ${index + 1}`,
    appointmentDate: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString()
  };
});