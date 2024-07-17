import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../types";
import Input from "../communs/input/input";
import "./listUsers.scss";
// Création d'un helper de colonne typé pour l'entité User
const columnHelper = createColumnHelper<User>();

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      name={"lastName"}
      type={"text"}
      textInput={"Search..."}
      handleChange={(e: any) => setValue(e.target.value)}
    />
  );
}

// Définition des colonnes avec leurs accesseurs et configurations
const columns = [
  columnHelper.accessor("firstName", {
    header: () => "First Name",
    cell: (info) => info.row.original.firstName,
  }),
  columnHelper.accessor("lastName", {
    id: "lastName",
    header: () => "Last Name",
    cell: (info) => <i>{info.row.original.lastName}</i>,
  }),
  columnHelper.accessor("dateOfBirth", {
    header: () => "Date of Birth",
    cell: (info) => info.row.original.dateOfBirth,
  }),
  columnHelper.accessor("street", {
    header: () => "Street",
    cell: (info) => info.row.original.street,
  }),
  columnHelper.accessor("city", {
    header: () => "City",
    cell: (info) => info.row.original.city,
  }),
  columnHelper.accessor("state", {
    header: () => "State",
    cell: (info) => info.row.original.state,
  }),
  columnHelper.accessor("zipCode", {
    header: () => "ZIP Code",
    cell: (info) => info.row.original.zipCode,
  }),
  columnHelper.accessor("department", {
    header: () => "Department",
    cell: (info) => info.row.original.department,
  }),
];

// Composant ListUsers qui utilise useUsers pour obtenir les données des utilisateurs
const ListUsers: React.FC = () => {
  const { users } = useUsers(); // Assurez-vous que useUsers retourne un objet avec un champ users

  // Utilisation de useReactTable pour gérer les fonctionnalités de tableau
  const table = useReactTable({
    data: users, // Utilisation des données users
    columns, // Utilisation des colonnes définies ci-dessus
    getCoreRowModel: getCoreRowModel(), // Modèle de base des lignes
    getFilteredRowModel: getFilteredRowModel(), // Modèle de ligne filtrée
    getSortedRowModel: getSortedRowModel(), // Modèle de ligne triée
  });

  return (
    <table className="listUsers">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="searchColumn">
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListUsers;
