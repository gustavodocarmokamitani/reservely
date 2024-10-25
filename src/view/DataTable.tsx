import React, { useEffect, useRef, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const rows = [
  { id: 1, nome: "Nome do serviço", valor: 'R$: 100,00', duracao: '60', ativo: true },
  { id: 2, nome: "Nome do serviço", valor: 'R$: 100,00', duracao: '60', ativo: true },
  { id: 3, nome: "Nome do serviço", valor: 'R$: 100,00', duracao: '60', ativo: true },
  { id: 4, nome: "Nome do serviço", valor: 'R$: 100,00', duracao: '60', ativo: true },
  { id: 5, nome: "Nome do serviço", valor: 'R$: 100,00', duracao: '60', ativo: true },
];

const DataTable = () => {
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        const numberOfColumns = 5; 
        const newColumnWidth = Math.floor(totalWidth / numberOfColumns); 
        setColumnWidth(newColumnWidth);
      }
    };

    updateColumnWidth();

    window.addEventListener('resize', updateColumnWidth);
    
    return () => {
      window.removeEventListener('resize', updateColumnWidth);
    };
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: columnWidth },
    { field: 'nome', headerName: 'Nome', width: columnWidth },
    { field: 'valor', headerName: 'Valor', width: columnWidth },
    { field: 'duracao', headerName: 'Duração', width: columnWidth },
    { field: 'ativo', headerName: 'Ativo', type: 'boolean', width: columnWidth },
  ];

  return (
    <div ref={containerRef} style={{marginTop: "3rem"}}>
      <Paper sx={{ height: 400, width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default DataTable;
