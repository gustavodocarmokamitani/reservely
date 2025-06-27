import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";

import info from "../../assets/info.svg";
import edit from "../../assets/edit.svg";
import { useEffect, useRef, useState } from "react";

export const useEffectCustom = (
  handleShowAppointmentInfoModal: (status: boolean, id: number) => void,
  handleShowAppointmentStatusModal: (status: boolean, id: number) => void
) => {
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        setColumnWidth(Math.floor(totalWidth / 6));
      }
    };
    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);
    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const columns: GridColDef[] = [
    {
      field: "clientId",
      headerName: "Cliente",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "employeeFullName",
      headerName: "Funcionário",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "appointmentDate",
      headerName: "Data do Agendamento",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const formattedDate = moment(params.value).format("DD/MM/YYYY");
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "appointmentTime",
      headerName: "Horário do Agendamento",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "appointmentStatus",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "acoes",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => {
        const hasEmployee = params.row.employeeFullName;

        if (hasEmployee === "Removido") return null;

        return (
          <div
            style={{
              display: "flex",
              gap: "50px",
              justifyContent: "center",
              margin: "12.5px 0px 0px 5px",
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              src={info}
              width={22}
              onClick={() =>
                handleShowAppointmentInfoModal(true, params.row.serviceIds)
              }
              alt="Informações"
            />
            {params.row.appointmentStatusId !== 3 ? (
              <img
                style={{ cursor: "pointer" }}
                src={edit}
                width={22}
                onClick={() =>
                  handleShowAppointmentStatusModal(true, params.row.id)
                }
                alt="Alterar status"
              />
            ) : null}
          </div>
        );
      },
      width: columnWidth,
      align: "center",
      headerAlign: "center",
    },
  ];
  return { columnWidth, containerRef, columns };
};
