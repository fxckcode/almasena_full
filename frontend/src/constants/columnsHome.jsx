import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { desactiveToast } from "../customToasts/desactiveToast";
export const columnsHome = [
    { field: 'name', headerName: "NOMBRE", flex: 1},
    {
        field: 'categories', headerName: 'CATEGORIA', flex: 1, valueGetter: ({ row }) => {
            return `${row.categories.name}`
        },
    },
    {
        field: 'sizes', headerName: 'TALLA', flex: 1, valueGetter: ({ row }) => {
            return `${row.sizes.name}`
        }
    },
    { field: 'brand', headerName: 'MARCA', flex: 1 },
    { field: 'color', headerName: 'COLOR', flex: 1 },
    { field: 'stock', headerName: 'EXISTENCIAS', flex: 1 },
    { field: 'description', headerName: 'DESCRIPCION', flex: 1 },
    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: ({ row }) => [
          <GridActionsCellItem icon={<EditIcon />} label="Edit"/>,
          <GridActionsCellItem icon={(row.state == 'active') ? <CloseIcon /> : <CheckIcon /> } label="Desactive" title={`${row.state == 'active' ? 'Desactivar' : 'Activar'}`} onClick={() => desactiveToast(row.id, row.state == 'active' ? true : false)}  />,
        ],
      },

]