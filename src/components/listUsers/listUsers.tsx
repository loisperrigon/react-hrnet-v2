import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 100, // Augmenter le délai pour éviter les appels fréquents
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
    // eslint-disable-next-line
  }, [value]);

  return (
    <Input
      name={"search"}
      type={"text"}
      textInput={"Search..."}
      handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      {...props}
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

const ListUsers: React.FC = () => {
  const { users } = useUsers(); // Assurez-vous que useUsers retourne un objet avec un champ users

  const [globalFilter, setGlobalFilter] = React.useState("");

  // Utilisation de useReactTable pour gérer les fonctionnalités de tableau
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 }, globalFilter: globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <div className="listUsersContainer">
        <div className="listUsersHeader">
          {table.getHeaderGroups().map((headerGroup) => (
            <div className="listUsersHeaderRow" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className={`listUsersHeaderCell ${
                    header.column.getCanSort() ? "sortable" : ""
                  }`}
                >
                  <div
                    className="listUsersHeaderRowTitle"
                    onClick={header.column.getToggleSortingHandler()}
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
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="listUsersBody">
          {table.getRowModel().rows.map((row) => (
            <div className="listUsersRow" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <div className="listUsersCell" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <div className="pagination_button">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <span>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        <Input
          name={"Go to page"}
          type={"text"}
          textInput={"Go to page"}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
      </div>
    </>
  );
};

export default ListUsers;
