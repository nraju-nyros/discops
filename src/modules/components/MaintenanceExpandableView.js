export const MaintenanceExpandableView = (record) => {
  return (
    <div
      className="rounded-md flex flex-row py-10 h-20 my-4 items-center pl-4"
      style={{ background: "#f7f8fa" }}
    >
      <div className="flex flex-col justify-center w-3/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.EquipmentCategory || "-"}
        </div>
        <div>Equip. Category</div>
      </div>
      <div className="border-r my-4 mx-2 border-mischka h-12" />
      <div className="flex flex-col justify-center  text-left w-2/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.SerialNo || "-"}
        </div>
        <div>Serial No.</div>
      </div>
      <div className="border-r my-4 mx-2 border-mischka h-12" />
      <div className="flex flex-col justify-center text-left w-3/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.RegisterNo || "-"}
        </div>
        <div>Registration No.</div>
      </div>
      <div className="border-r my-4 mx-2 border-mischka h-12" />
      <div className="flex flex-col justify-center text-left w-1/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.Material || "-"}
        </div>
        <div>Material</div>
      </div>
      <div className="border-r m-4 border-mischka h-12" />
      <div className="flex flex-col justify-center text-left w-2/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.FunctionalLoc || "-"}
        </div>
        <div>Funct. Loc.</div>
      </div>
      <div className="border-r m-4 border-mischka h-12" />
      <div className="flex flex-col justify-center text-left w-2/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.StorageLoc || "-"}
        </div>
        <div>SLOC</div>
      </div>
      <div className="border-r m-4 border-mischka h-12" />
      <div className="flex flex-col justify-center text-left w-2/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.WorkCenter || "-"}
        </div>
        <div>Work Center</div>
      </div>
      <div className="border-r m-4 border-mischka h-12" />
      <div className="flex flex-col justify-center text-left w-2/12">
        <div className="font-semibold text-pickled-bluewood">
          {record.UserStatus || "-"}
        </div>
        <div>User Status</div>
      </div>
    </div>
  );
};
