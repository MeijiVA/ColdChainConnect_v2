import { useState, useRef } from "react";
// QR Code scanning will use browser's camera API and manual entry

// Truck in transit interface
interface TruckDelivery {
  id: string;
  truckPlate: string;
  driver: string;
  driverId: string;
  origin: string;
  destination: string;
  departureTime: string;
  estimatedArrival: string;
  status: "in_storage" | "being_delivered" | "arrived";
  progress: number; // 0-100
  items: DeliveryItem[];
  currentLocation?: string;
  lastUpdate: string;
}

interface DeliveryItem {
  id: string;
  sku: string;
  description: string;
  qrCode: string;
  quantity: number;
  status: "in_storage" | "being_delivered" | "arrived";
}

export function TrucksInTransit() {
  const [trucks, setTrucks] = useState<TruckDelivery[]>([
    {
      id: "TRK-001",
      truckPlate: "ABC 1234",
      driver: "Juan dela Cruz",
      driverId: "SLS-0001",
      origin: "ACDP Warehouse, Pampanga",
      destination: "Various Retail Stores",
      departureTime: "08:00 AM",
      estimatedArrival: "02:30 PM",
      status: "being_delivered",
      progress: 65,
      currentLocation: "San Fernando, Pampanga",
      lastUpdate: "2026-04-30 11:45 AM",
      items: [
        {
          id: "1",
          sku: "7700165",
          description: "FF Bossing Hatdogs KingSize",
          qrCode: "QR-20260430-001",
          quantity: 20,
          status: "being_delivered",
        },
        {
          id: "2",
          sku: "7700169",
          description: "FF Bossing Cheesedog KingSize",
          qrCode: "QR-20260430-002",
          quantity: 10,
          status: "being_delivered",
        },
      ],
    },
    {
      id: "TRK-002",
      truckPlate: "XYZ 5678",
      driver: "Maria Santos",
      driverId: "SLS-0002",
      origin: "ACDP Warehouse, Pampanga",
      destination: "Makati Retail Partners",
      departureTime: "08:15 AM",
      estimatedArrival: "04:00 PM",
      status: "being_delivered",
      progress: 45,
      currentLocation: "Makati, Metro Manila",
      lastUpdate: "2026-04-30 11:50 AM",
      items: [
        {
          id: "3",
          sku: "770218",
          description: "McCain Fries",
          qrCode: "QR-20260430-003",
          quantity: 6,
          status: "being_delivered",
        },
      ],
    },
    {
      id: "TRK-003",
      truckPlate: "DEF 9012",
      driver: "Pedro Reyes",
      driverId: "INV-0001",
      origin: "ACDP Warehouse, Pampanga",
      destination: "Cavite Distribution Center",
      departureTime: "09:00 AM",
      estimatedArrival: "01:00 PM",
      status: "being_delivered",
      progress: 80,
      currentLocation: "Kawit, Cavite",
      lastUpdate: "2026-04-30 11:55 AM",
      items: [
        {
          id: "4",
          sku: "7702039",
          description: "FF Bossing Cheesedogs",
          qrCode: "QR-20260430-004",
          quantity: 15,
          status: "being_delivered",
        },
      ],
    },
  ]);

  const [selectedTruck, setSelectedTruck] = useState<TruckDelivery | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedQR, setScannedQR] = useState<string>("");
  const [cameraActive, setCameraActive] = useState(false);

  // Open camera for QR scanning
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert("Unable to access camera: " + (err as Error).message);
    }
  };

  // Close camera
  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  // Handle QR scan (simplified - in production use a QR library)
  const handleQRScan = (qrValue: string) => {
    setScannedQR(qrValue);

    if (selectedTruck) {
      const updatedTrucks = trucks.map((truck) => {
        if (truck.id === selectedTruck.id) {
          const updatedItems = truck.items.map((item) => {
            if (item.qrCode === qrValue) {
              // Cycle through statuses
              const statusCycle = [
                "in_storage",
                "being_delivered",
                "arrived",
              ] as const;
              const currentIndex = statusCycle.indexOf(item.status);
              const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

              return { ...item, status: nextStatus };
            }
            return item;
          });

          return { ...truck, items: updatedItems };
        }
        return truck;
      });

      setTrucks(updatedTrucks);
      setSelectedTruck(
        updatedTrucks.find((t) => t.id === selectedTruck.id) || null
      );
      closeCamera();
      setShowQRScanner(false);
    }
  };

  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-rajdhani text-3xl font-bold text-navy letter-spacing-tight">
            Trucks in Transit
          </h1>
          <p className="text-xs text-muted mt-1">
            Monitor active deliveries and track shipments in real-time
          </p>
        </div>
        <div className="text-xs text-muted">
          Active Deliveries: {trucks.filter((t) => t.status === "being_delivered").length}
        </div>
      </div>

      {/* Trucks Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trucks.map((truck) => (
          <div
            key={truck.id}
            onClick={() => setSelectedTruck(truck)}
            className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-lg ${
              selectedTruck?.id === truck.id
                ? "border-accent-2 shadow-lg"
                : "border-border"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-rajdhani text-lg font-bold text-navy">
                  {truck.truckPlate}
                </h3>
                <p className="text-xs text-muted mt-1">{truck.driver}</p>
              </div>
              <StatusBadge status={truck.status} />
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-semibold text-navy">Progress</span>
                <span className="text-xs text-muted">{truck.progress}%</span>
              </div>
              <div className="w-full h-2 bg-off-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-2 transition-all"
                  style={{ width: `${truck.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Route Info */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <div>
                  <p className="text-muted">From:</p>
                  <p className="text-navy font-semibold">{truck.origin}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <div>
                  <p className="text-muted">To:</p>
                  <p className="text-navy font-semibold">{truck.destination}</p>
                </div>
              </div>
              {truck.currentLocation && (
                <div className="flex items-center gap-2">
                  <span>📌</span>
                  <div>
                    <p className="text-muted">Current:</p>
                    <p className="text-navy font-semibold">{truck.currentLocation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Items Count */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-semibold text-navy">
                {truck.items.length} Item{truck.items.length !== 1 ? "s" : ""} ·{" "}
                {truck.items.reduce((sum, item) => sum + item.quantity, 0)} Units
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Truck Details */}
      {selectedTruck && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-2xl font-bold text-navy">
                {selectedTruck.truckPlate}
              </h2>
              <p className="text-sm text-muted mt-1">
                Driver: {selectedTruck.driver} ({selectedTruck.driverId})
              </p>
            </div>
            <div className="text-right">
              <StatusBadge status={selectedTruck.status} size="lg" />
              <p className="text-xs text-muted mt-2">
                Last updated: {selectedTruck.lastUpdate}
              </p>
            </div>
          </div>

          {/* Route Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailBox
              label="Departure"
              value={selectedTruck.departureTime}
              icon="🚀"
            />
            <DetailBox
              label="Est. Arrival"
              value={selectedTruck.estimatedArrival}
              icon="🎯"
            />
            <DetailBox label="Current Location" value={selectedTruck.currentLocation || "In transit"} icon="📍" />
            <DetailBox
              label="Progress"
              value={`${selectedTruck.progress}%`}
              icon="📊"
            />
          </div>

          {/* Delivery Items Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-rajdhani text-lg font-bold text-navy">
                Items in Transit
              </h3>
              <button
                onClick={() => setShowQRScanner(true)}
                className="px-4 py-2 bg-accent-2 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                📱 Scan QR Code
              </button>
            </div>

            <div className="overflow-x-auto text-xs md:text-sm">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      SKU
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap hidden sm:table-cell">
                      Description
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      QR Code
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      Qty
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTruck.items.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-off-white/50">
                      <td className="px-3 py-3 text-navy font-semibold">
                        {item.sku}
                      </td>
                      <td className="px-3 py-3 text-navy hidden sm:table-cell">
                        {item.description}
                      </td>
                      <td className="px-3 py-3 text-navy font-mono text-xs">
                        {item.qrCode}
                      </td>
                      <td className="px-3 py-3 text-navy font-semibold">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-3">
                        <ItemStatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScannerModal
          onClose={() => {
            setShowQRScanner(false);
            closeCamera();
          }}
          onScan={handleQRScan}
          videoRef={videoRef}
          cameraActive={cameraActive}
          openCamera={openCamera}
          closeCamera={closeCamera}
          scannedQR={scannedQR}
          availableQRs={selectedTruck?.items.map((item) => item.qrCode) || []}
        />
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({
  status,
  size = "sm",
}: {
  status: "in_storage" | "being_delivered" | "arrived";
  size?: "sm" | "lg";
}) {
  const statusMap = {
    in_storage: { label: "In Storage", color: "blue", icon: "📦" },
    being_delivered: { label: "Being Delivered", color: "gold", icon: "🚚" },
    arrived: { label: "Arrived", color: "green", icon: "✅" },
  };

  const config = statusMap[status];
  const sizeClass = size === "lg" ? "px-4 py-2 text-sm" : "px-2.5 py-0.5 text-xs";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg font-semibold badge-${config.color} ${sizeClass}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </div>
  );
}

// Item Status Badge
function ItemStatusBadge({
  status,
}: {
  status: "in_storage" | "being_delivered" | "arrived";
}) {
  const colors = {
    in_storage: "badge-blue",
    being_delivered: "badge-gold",
    arrived: "badge-green",
  };

  const labels = {
    in_storage: "In Storage",
    being_delivered: "Delivering",
    arrived: "Arrived",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

// Detail Box Component
function DetailBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-off-white rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <p className="text-xs text-muted font-semibold uppercase">{label}</p>
      </div>
      <p className="font-rajdhani text-lg font-bold text-navy">{value}</p>
    </div>
  );
}

// QR Scanner Modal
function QRScannerModal({
  onClose,
  onScan,
  videoRef,
  cameraActive,
  openCamera,
  closeCamera,
  scannedQR,
  availableQRs,
}: {
  onClose: () => void;
  onScan: (qr: string) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  cameraActive: boolean;
  openCamera: () => void;
  closeCamera: () => void;
  scannedQR: string;
  availableQRs: string[];
}) {
  const [manualQR, setManualQR] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-border max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-rajdhani text-lg font-bold text-navy">
            Scan QR Code
          </h2>
          <button
            onClick={onClose}
            className="text-navy hover:opacity-70 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Camera Section */}
        <div className="space-y-2">
          <p className="text-sm text-muted">Point your camera at the QR code</p>
          {!cameraActive ? (
            <button
              onClick={openCamera}
              className="w-full px-4 py-3 bg-accent-2 text-white rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2"
            >
              📱 Open Camera
            </button>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
                style={{ height: "300px" }}
              />
              <button
                onClick={closeCamera}
                className="w-full px-4 py-2 bg-red text-white rounded-lg font-semibold hover:opacity-90"
              >
                Close Camera
              </button>
            </>
          )}
        </div>

        {/* Manual Entry */}
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-sm text-muted">Or enter QR code manually</p>
          <input
            type="text"
            value={manualQR}
            onChange={(e) => setManualQR(e.target.value)}
            placeholder="e.g., QR-20260430-001"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
          />
          <button
            onClick={() => {
              if (availableQRs.includes(manualQR)) {
                onScan(manualQR);
                setManualQR("");
              } else {
                alert("QR code not found in this truck's items");
              }
            }}
            className="w-full px-4 py-2 bg-green text-white rounded-lg font-semibold hover:opacity-90"
          >
            Confirm Scan
          </button>
        </div>

        {/* Last Scan */}
        {scannedQR && (
          <div className="bg-green/10 border border-green/30 rounded-lg p-3">
            <p className="text-xs text-muted">Last scanned:</p>
            <p className="font-semibold text-green text-sm">{scannedQR}</p>
            <p className="text-xs text-muted mt-1">✅ Status updated successfully</p>
          </div>
        )}

        {/* Available QRs List */}
        <div className="space-y-2 pt-4 border-t border-border max-h-32 overflow-y-auto">
          <p className="text-xs text-muted font-semibold">Available QR Codes:</p>
          <div className="space-y-1">
            {availableQRs.map((qr) => (
              <button
                key={qr}
                onClick={() => {
                  onScan(qr);
                  setManualQR("");
                }}
                className="w-full text-left px-3 py-2 rounded bg-off-white hover:bg-navy/10 text-xs font-mono text-navy transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 border border-border rounded-lg font-semibold text-sm hover:bg-off-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
