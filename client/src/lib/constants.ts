import { CheckCircle, AlertCircle, XCircle, Clock, BarChart3, Zap, AlertTriangle } from "lucide-react";
import React from "react";

export type APIStatus = "operational" | "issues" | "down";

export interface APIEndpoint {
  name: string;
  status: APIStatus;
  latency: number;
}

export interface SystemMetric {
  name: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

export const apiEndpoints: APIEndpoint[] = [
  { name: "User Authentication", status: "operational", latency: 120 },
  { name: "Data Processing", status: "issues", latency: 350 },
  { name: "Payment Gateway", status: "operational", latency: 200 },
  { name: "Notification Service", status: "down", latency: 0 },
  { name: "Analytics API", status: "operational", latency: 180 },
];

export const systemMetrics: SystemMetric[] = [
  { name: "Uptime", value: "99.99%", icon: React.createElement(Clock, { className: "h-4 w-4" }), description: "Last 30 days" },
  { name: "Total Requests", value: "1.5M", icon: React.createElement(BarChart3, { className: "h-4 w-4" }), description: "Last 24 hours" },
  { name: "Avg Response Time", value: "250ms", icon: React.createElement(Zap, { className: "h-4 w-4" }), description: "Last hour" },
  { name: "Error Rate", value: "0.01%", icon: React.createElement(AlertTriangle, { className: "h-4 w-4" }), description: "Last 24 hours" },
];

export const statusConfig: Record<APIStatus, { label: string; color: string; icon: React.ReactNode }> = {
  operational: { label: "Operational", color: "bg-green-500", icon: React.createElement(CheckCircle, { className: "h-4 w-4" }) },
  issues: { label: "Issues Detected", color: "bg-yellow-500", icon: React.createElement(AlertCircle, { className: "h-4 w-4" }) },
  down: { label: "Service Down", color: "bg-red-500", icon: React.createElement(XCircle, { className: "h-4 w-4" }) },
};
