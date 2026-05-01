import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Truck, ShipmentItem, ShipmentState } from "@shared/api";

export function TrucksInTransit() {
  const [trucks, setTrucks] = useState<Truck[]>([
    {
      id: "1",
      truckNumber: "TRK-001",
      driverId: "DRV-001",
      driverName: "Juan Dela Cruz",
      driverContact: "09171234567",
      currentLocation: "Makati, Metro Manila",
      destination: "Cebu City",
      departureTime: "2026-04-28T08:00:00",
      expectedArrivalTime: "2026-04-29T14:00:00",
      status: "in_transit",
      shipments: [
        {
          id: "SHP-001-01",
          productId: "1",
          productSku: "7700165",
          productDescription: "FF Bossing Hatdogs KingSize",
          trackingId: "TRK001SHP00101",
          quantity: 20,
          state: "being_delivered",
          lastUpdated: "2026-04-28T10:30:00",
        },
        {
          id: "SHP-001-02",
          productId: "8",
          productSku: "770218",
          productDescription: "McCain Fries",
          trackingId: "TRK001SHP00102",
          quantity: 5,
          state: "in_storage",
          lastUpdated: "2026-04-28T08:00:00",
        },
      ],
      createdAt: "2026-04-28T08:00:00",
      lastUpdated: "2026-04-28T10:30:00",
    },
    {
      id: "2",
      truckNumber: "TRK-002",
      driverId: "DRV-002",
      driverName: "Maria Santos",
      driverContact: "09189876543",
      currentLocation: "Quezon City",
      destination: "Davao City",
      departureTime: "2026-04-27T18:00:00",
      expectedArrivalTime: "2026-04-29T06:00:00",
      status: "in_transit",
      shipments: [
        {
          id: "SHP-002-01",
          productId: "3",
          productSku: "7700160",
          productDescription: "FF Bossing Chicken Franks King",
          trackingId: "TRK002SHP00201",
          quantity: 50,
          state: "being_delivered",
          lastUpdated: "2026-04-28T14:20:00",
        },
      ],
      createdAt: "2026-04-27T18:00:00",
      lastUpdated: "2026-04-28T14:20:00",
    },
  ]);

  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(trucks[0]);
  const [scanMode, setScanMode] = useState(false);
  const [scannedTrackingId, setScannedTrackingId] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem | null>(null);
  const [newState, setNewState] = useState<ShipmentState>("being_delivered");
  const [cameraMode, setCameraMode] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const qrReaderRef = useRef<Html5Qrcode | null>(null);

  const handleScanQRCode = () => {
    if (!selectedTruck) return;

    // Find the shipment by tracking ID
    const shipment = selectedTruck.shipments.find(
      (s) => s.trackingId === scannedTrackingId
    );

    if (shipment) {
      setSelectedShipment(shipment);
      setNewState(shipment.state);
    } else {
      alert("Shipment not found on this truck!");
    }
    setScannedTrackingId("");
  };

  const handleUpdateShipmentState = () => {
    if (!selectedTruck || !selectedShipment) return;

    setTrucks(
      trucks.map((truck) => {
        if (truck.id === selectedTruck.id) {
          return {
            ...truck,
            shipments: truck.shipments.map((shipment) => {
              if (shipment.id === selectedShipment.id) {
                return {
                  ...shipment,
                  state: newState,
                  lastUpdated: new Date().toISOString(),
                };
              }
              return shipment;
            }),
            lastUpdated: new Date().toISOString(),
          };
        }
        return truck;
      })
    );

    setSelectedShipment(null);
    setScannedTrackingId("");
  };

  const startCameraScanner = async () => {
    try {
      setCameraError(null);
      const html5QrCode = new Html5Qrcode("qr-reader");
      qrReaderRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          // QR code detected
          setScannedTrackingId(decodedText);
          stopCameraScanner();
          // Auto-lookup the shipment
          setTimeout(() => {
            if (!selectedTruck) return;
            const shipment = selectedTruck.shipments.find(
              (s) => s.trackingId === decodedText
            );
            if (shipment) {
              setSelectedShipment(shipment);
              setNewState(shipment.state);
            } else {
              alert("Shipment not found on this truck!");
            }
          }, 100);
        },
        (errorMessage) => {
          console.error("QR Code scanning error:", errorMessage);
        }
      );
    } catch (err) {
      setCameraError(
        err instanceof Error ? err.message : "Failed to access camera"
      );
    }
  };

  const stopCameraScanner = async () => {
    if (qrReaderRef.current) {
      try {
        await qrReaderRef.current.stop();
        qrReaderRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setCameraMode(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      if (qrReaderRef.current) {
        qrReaderRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const getStateColor = (state: ShipmentState) => {
    switch (state) {
      case "in_storage":
        return "bg-blue text-white";
      case "being_delivered":
        return "bg-gold text-white";
      case "arrived":
        return "bg-green text-white";
    }
  };

  const getStateLabel = (state: ShipmentState) => {
    switch (state) {
      case "in_storage":
        return "In Storage";
      case "being_delivered":
        return "Being Delivered";
      case "arrived":
        return "Arrived";
    }
  };

  const getTruckStatusColor = (status: string) => {
    switch (status) {
      case "loading":
        return "bg-blue text-white";
      case "in_transit":
        return "bg-gold text-white";
      case "at_destination":
        return "bg-purple text-white";
      case "completed":
        return "bg-green text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-rajdhani text-3xl font-bold text-white letter-spacing-tight">
            Trucks in Transit
          </h1>
          <p className="text-xs text-muted mt-1">
            Monitor trucks and track shipment status in real-time
          </p>
        </div>
        <button
          onClick={() => setScanMode(!scanMode)}
          className={`px-4 py-3 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap border-2 ${
            scanMode
              ? "bg-red text-white hover:opacity-90 border-red"
              : "bg-accent-2 text-white hover:opacity-90 border-accent-2"
          }`}
        >
          {scanMode ? "🚫 Cancel Scan" : "📱 Scan QR"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trucks List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="bg-navy-mid px-4 py-3 border-b border-border">
              <h2 className="font-rajdhani text-lg font-bold text-white">
                Active Trucks
              </h2>
            </div>

            <div className="divide-y divide-border max-h-96 overflow-y-auto">
              {trucks.map((truck) => (
                <button
                  key={truck.id}
                  onClick={() => {
                    setSelectedTruck(truck);
                    setSelectedShipment(null);
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    selectedTruck?.id === truck.id
                      ? "bg-accent-2 bg-opacity-20 border-l-3 border-l-accent-2"
                      : "hover:bg-off-white/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-navy truncate">
                        {truck.truckNumber}
                      </div>
                      <div className="text-xs text-muted">
                        Driver: {truck.driverName}
                      </div>
                      <div className="text-xs text-muted truncate">
                        📍 {truck.currentLocation}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getTruckStatusColor(truck.status)}`}
                    >
                      {truck.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted mt-2">
                    Items: {truck.shipments.length}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTruck ? (
            <>
              {/* QR Scanner */}
              {scanMode && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-rajdhani text-lg font-bold text-navy mb-4">
                    Scan Shipment QR Code
                  </h3>

                  {!cameraMode ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-2">
                          Tracking ID / QR Code
                        </label>
                        <input
                          type="text"
                          autoFocus
                          placeholder="Scan QR code here..."
                          value={scannedTrackingId}
                          onChange={(e) => setScannedTrackingId(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleScanQRCode();
                            }
                          }}
                          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleScanQRCode}
                          className="flex-1 px-4 py-2 bg-accent-2 text-white rounded-lg font-semibold text-sm hover:opacity-90"
                        >
                          Lookup Shipment
                        </button>
                        <button
                          onClick={() => {
                            setCameraMode(true);
                            startCameraScanner();
                          }}
                          className="flex-1 px-4 py-2 bg-blue text-white rounded-lg font-semibold text-sm hover:opacity-90"
                        >
                          📷 Camera
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div
                        id="qr-reader"
                        className="w-full rounded-lg overflow-hidden"
                        style={{ minHeight: "300px" }}
                      />
                      {cameraError && (
                        <div className="p-3 bg-red bg-opacity-20 border border-red rounded text-red text-sm">
                          {cameraError}
                        </div>
                      )}
                      <button
                        onClick={stopCameraScanner}
                        className="w-full px-4 py-2 bg-red text-white rounded-lg font-semibold text-sm hover:opacity-90"
                      >
                        Close Camera
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Truck Details */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-rajdhani text-lg font-bold text-navy mb-4">
                  Truck Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted">Truck Number</div>
                    <div className="font-semibold text-navy">
                      {selectedTruck.truckNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Status</div>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-bold ${getTruckStatusColor(selectedTruck.status)}`}
                    >
                      {selectedTruck.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Driver</div>
                    <div className="font-semibold text-navy">
                      {selectedTruck.driverName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Contact</div>
                    <div className="font-semibold text-navy">
                      {selectedTruck.driverContact}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-muted">Current Location</div>
                    <div className="font-semibold text-navy">
                      📍 {selectedTruck.currentLocation}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-muted">Destination</div>
                    <div className="font-semibold text-navy">
                      📍 {selectedTruck.destination}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Departure</div>
                    <div className="font-semibold text-navy text-sm">
                      {new Date(selectedTruck.departureTime).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Expected Arrival</div>
                    <div className="font-semibold text-navy text-sm">
                      {new Date(selectedTruck.expectedArrivalTime).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipments */}
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="bg-navy-mid px-6 py-3 border-b border-border">
                  <h3 className="font-rajdhani text-lg font-bold text-white">
                    Shipments ({selectedTruck.shipments.length})
                  </h3>
                </div>

                <div className="divide-y divide-border">
                  {selectedTruck.shipments.length === 0 ? (
                    <div className="px-6 py-8 text-center text-muted">
                      No shipments on this truck
                    </div>
                  ) : (
                    selectedTruck.shipments.map((shipment) => (
                      <div
                        key={shipment.id}
                        className={`px-6 py-4 cursor-pointer transition-colors ${
                          selectedShipment?.id === shipment.id
                            ? "bg-accent-2 bg-opacity-10"
                            : "hover:bg-off-white/50"
                        }`}
                        onClick={() => {
                          setSelectedShipment(shipment);
                          setNewState(shipment.state);
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-navy">
                              {shipment.productSku} - {shipment.productDescription}
                            </div>
                            <div className="text-xs text-muted mt-1">
                              Tracking ID: {shipment.trackingId}
                            </div>
                            <div className="text-xs text-muted">
                              Qty: {shipment.quantity} units
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${getStateColor(shipment.state)}`}
                          >
                            {getStateLabel(shipment.state)}
                          </span>
                        </div>
                        <div className="text-xs text-muted mt-2">
                          Last updated: {new Date(shipment.lastUpdated).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* State Update Modal */}
              {selectedShipment && (
                <div className="bg-white rounded-2xl border border-accent-2 border-2 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-rajdhani text-lg font-bold text-navy">
                      Update Shipment State
                    </h3>
                    <button
                      onClick={() => setSelectedShipment(null)}
                      className="text-navy hover:opacity-70 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-navy mb-2">
                        {selectedShipment.productSku} - {selectedShipment.productDescription}
                      </div>
                      <div className="text-xs text-muted">
                        Tracking ID: {selectedShipment.trackingId}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy mb-3">
                        Select New State:
                      </label>
                      <div className="space-y-2">
                        {["in_storage", "being_delivered", "arrived"].map((state) => (
                          <label
                            key={state}
                            className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-off-white"
                          >
                            <input
                              type="radio"
                              name="state"
                              value={state}
                              checked={newState === state}
                              onChange={(e) => setNewState(e.target.value as ShipmentState)}
                              className="w-4 h-4"
                            />
                            <span
                              className={`px-3 py-1 rounded text-xs font-bold ${getStateColor(state as ShipmentState)}`}
                            >
                              {getStateLabel(state as ShipmentState)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setSelectedShipment(null)}
                        className="flex-1 px-4 py-2 border border-border rounded-lg font-semibold text-sm hover:bg-off-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateShipmentState}
                        className="flex-1 px-4 py-2 bg-accent-2 text-white rounded-lg font-semibold text-sm hover:opacity-90"
                      >
                        ✓ Update State
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-12 flex items-center justify-center min-h-96 text-center">
              <div>
                <div className="text-6xl mb-4">🚚</div>
                <h2 className="font-rajdhani text-2xl font-bold text-navy mb-2">
                  No Truck Selected
                </h2>
                <p className="text-muted">
                  Select a truck from the list to view shipments and update status
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
