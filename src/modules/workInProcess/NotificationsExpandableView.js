
import { FormatDateLocalWithoutTime } from "../components/Context/helpers";


const NotificationsExpandableView = (record) => {
    return (
      <div className="m-3 p-4 rounded-md grid grid-cols-6 gap-4" style={{background: "#f7f8fa"}}>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div className="" style={{color:"#383a65"}}>{FormatDateLocalWithoutTime(record.CreatedOn, "-")}</div>
            <div>Created on</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.CreatedBy ? record.CreatedBy : "-"}</div>
            <div>Entered by</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.UpdatedBy ? record.UpdatedBy: "-"}</div>
            <div>Changed by</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.ErcCode ? record.ErcCode: "-"}</div>
            <div>ERC Code</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.SystemCondition ? record.SystemCondition: "-"}</div>
            <div>System Condition</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div>
            <div style={{color:"#383a65"}}>{record.AdminNo ? record.AdminNo : "-"}</div>
            <div>Admin No</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.SerialNo ? record.SerialNo : "-"}</div>
            <div>Serial Number</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.CostCenter ? record.CostCenter : "-"}</div>
            <div>Cost Center</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.NotificationIds ? record.NotificationIds[0] :"-"}</div>
            <div>Notification</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.SystemConditionDesc ? record.SystemConditionDesc : "-"}</div>
            <div>System Cond. Desc.</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.TatDays ? record.TatDays : "-"}</div>
            <div>TAT Days</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div>
            <div style={{color:"#383a65"}}>{record.TatTarget ? record.TatTarget : "-"}</div>
            <div>TAT Target</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.MainWorkCtr ? record.MainWorkCtr : "-"}</div>
            <div>Main Work Ctr</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.OwnerFad ? record.OwnerFad : "-"}</div>
            <div>Owner FAD</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div className="border-r" style={{borderColor: "#DADAE0"}}>
            <div style={{color:"#383a65"}}>{record.TotalPinnedCost ? record.TotalPinnedCost : "-"}</div>
            <div>Total Pinned Costs</div>
          </div>
        </div>
        <div className="p-3 px-5">
          <div >
            <div style={{color:"#383a65"}}>{record.TotalActCost ? record.TotalActCost : "-"}</div>
            <div>Total act. costs</div>
          </div>
        </div>
      </div>
    );
  }

  export default NotificationsExpandableView