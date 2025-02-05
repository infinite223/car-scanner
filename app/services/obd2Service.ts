import TcpSocket from "react-native-tcp-socket";

const OBD_IP = "192.168.0.10"; // Domyślny adres IP OBD2
const OBD_PORT = 35000; // Domyślny port

export default class OBD2Service {
  socket: any = null;

  // 🔹 Połącz z OBD2 WiFi
  connectOBD2 = (onDataReceived: (data: string) => void) => {
    return new Promise((resolve, reject) => {
      this.socket = TcpSocket.createConnection(
        { host: OBD_IP, port: OBD_PORT },
        () => {
          console.log("✅ Połączono z OBD2 WiFi!");
          resolve(true);
        }
      );

      this.socket.on("data", (data: Buffer) => {
        const response = data.toString("utf-8");
        console.log("📩 Otrzymane dane:", response);
        onDataReceived(response);
      });

      this.socket.on("error", (error: any) => {
        console.error("❌ Błąd połączenia:", error);
        reject(error);
      });

      this.socket.on("close", () => {
        console.log("🔌 Połączenie zamknięte");
      });
    });
  };

  // 🔹 Wysyłanie komendy do OBD2
  sendCommand = (command: string) => {
    if (this.socket) {
      const formattedCommand = command.trim().toUpperCase() + "\r";
      this.socket.write(formattedCommand);
      console.log("📤 Wysłano:", formattedCommand);
    }
  };

  // 🔹 Zamknięcie połączenia
  disconnect = () => {
    if (this.socket) {
      this.socket.destroy();
      console.log("🔌 Rozłączono z OBD2 WiFi");
    }
  };
}
