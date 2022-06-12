export const FeatureTypes = {
    Tenants: "Admin-Tenant",
  
    Users: "Admin-User",
    Roles: "Admin-Role",
    Sessions: "Admin-Session",
    Notifications: "Api-Notification",
    ServiceRequests: "Api-ServiceRequest",
  
    Devices: "Admin-Device",
    Locations: "Admin-Location",
  
    Rules: "Admin-Rule",
    Distribution: "Admin-Distribution",
  
    Providers: "Admin-Provider",
    Sensors: "Admin-Sensor",
    Readers: "Admin-Reader",
    Gateways: "Admin-Gateway",
  
    SyncLogs: "Admin-SyncLog",
    AuditLogs: "Admin-AuditLog",
    ChangeLogs: "Admin-ChangeLog",
    HealthLogs: "Admin-HealthLog",
    SessionLogs: "Admin-SessionLog",
    MessageLogs: "Admin-MessageLog",
    ExceptionLogs: "Admin-ExceptionLog",
  
    Systems: "Admin-System",
    WorkOrder: "Api-WorkOrder",
    ServiceDashboard: "Api-Dashboard",
    Purchasing: "Api-Purchasing",
    WorkInProcess: "Api-WorkInProcess",
  };
  
  export const SetFeaturesUrl = (features) => {
    features.forEach((item) => {
      console.log("ITEM", item);
      switch (item.id) {
        case FeatureTypes.Tenants:
          item["url"] = "tenant";
          break;
  
        case FeatureTypes.Users:
          item["url"] = "user-list";
          break;
        case FeatureTypes.Roles:
          item["url"] = "role-list";
          break;
  
        case FeatureTypes.Sessions:
          item["url"] = "session-list";
          break;
  
        case FeatureTypes.Notifications:
          item["url"] = "notifications";
          break;
  
        case FeatureTypes.ServiceRequests:
          item["url"] = "servicerequests";
          item["icon"] = "checkouttools-icon";
          break;
  
        case FeatureTypes.Locations:
          item["url"] = "location";
          break;
  
        case FeatureTypes.Devices:
          item["url"] = "device";
          break;
  
        case FeatureTypes.Systems:
          item["url"] = "system";
          break;
  
        case FeatureTypes.Rules:
          item["url"] = "rule";
          break;
  
        case FeatureTypes.Distribution:
          item["url"] = "distribution";
          break;
  
        case FeatureTypes.Providers:
          item["url"] = "iot-provider";
          break;
        case FeatureTypes.Gateways:
          item["url"] = "iot-gateway";
          break;
        case FeatureTypes.Sensors:
          item["url"] = "iot-sensor";
          break;
        case FeatureTypes.Readers:
          item["url"] = "iot-reader";
          break;
  
        case FeatureTypes.SyncLogs:
          item["url"] = "logs-sync";
          break;
        case FeatureTypes.AuditLogs:
          item["url"] = "logs-audit";
          break;
        case FeatureTypes.ChangeLogs:
          item["url"] = "logs-change";
          break;
        case FeatureTypes.HealthLogs:
          item["url"] = "logs-health";
          break;
        case FeatureTypes.SessionLogs:
          item["url"] = "logs-session";
          break;
        case FeatureTypes.MessageLogs:
          item["url"] = "logs-message";
          break;
        case FeatureTypes.ExceptionLogs:
          item["url"] = "logs-exception";
          break;
        case FeatureTypes.WorkOrder:
          item["url"] = "workOrder";
          break;
        case FeatureTypes.ServiceDashboard:
          item["url"] = "home";
          break;
        case FeatureTypes.Purchasing:
          item["url"] = "purchasing";
          break;
        case FeatureTypes.WorkInProcess:
          item["url"] = "workinprocess";
          break;
        default:
          break;
      }
  
      if (item.submenu?.length) {
        SetFeaturesUrl(item.submenu);
      }
    });
  };
  