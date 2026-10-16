#!/usr/bin/env python3
import http.server
import json
import os
from datetime import datetime

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/api/capture.php":
            length = int(self.headers.get("Content-Length", 0))
            data = self.rfile.read(length).decode("utf-8")
            try:
                payload = json.loads(data)
            except:
                payload = {"raw": data}

            payload["ip"] = self.client_address[0]
            payload["time"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            log_path = "logs/captured.json"
            os.makedirs("logs", exist_ok=True)
            entries = []
            if os.path.exists(log_path):
                with open(log_path) as f:
                    try:
                        entries = json.load(f)
                    except:
                        entries = []
            entries.append(payload)
            with open(log_path, "w") as f:
                json.dump(entries, f, indent=2, ensure_ascii=False)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
        else:
            self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))
http.server.HTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
