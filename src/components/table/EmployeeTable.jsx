import { EmployeesContext } from "../../context"
import { useContext, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel, 
} from "@tanstack/react-table";

import "./table.css";

const EmployeeTable = () => {

    const { employees } = useContext(EmployeesContext);


    // Vérifier si employees existe
    const isEmpty = !employees || employees.length === 0;

  //etat de pagination
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    //etat de la recherche
    const [globalFilter, setGlobalFilter] = useState("")

    const [sorting, setSorting] = useState([
        {
            id: 'firstName',
        },
        {
            id: 'lastName',
        }
    ])

    // Créer les colonnes
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("firstName", {
            header: "First Name",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
            enableSortingRemoval: false
        }),
        columnHelper.accessor("lastName", {
            header: "Last Name",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
            enableSortingRemoval: false
        }),
        columnHelper.accessor("dateOfBirth", {
            header: "Date of Birth",
            cell: (info) => {                
                return new Intl.DateTimeFormat('fr-FR').format(new Date(info.getValue()))
            },
            sortingFn: 'datetime',
        }),
        columnHelper.accessor("startDate", {
            header: "Start Date",
            cell: (info) => {
                return new Intl.DateTimeFormat('fr-FR').format(new Date(info.getValue()))
            },
            sortingFn: 'datetime',
        }),
        columnHelper.accessor("street", {
            header: "Street",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("city", {
            header: "City",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("state", {
            header: "State",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("zipCode", {
            header: "Zip Code",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("department", {
            header: "Department",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
    ];
    
    // Créer le tableau
    const table = useReactTable({
        data: employees || [],
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        globalFilterFn: "includesString", 
        state: {
            pagination,
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        enableSortingRemoval: false
    })
    
    const totalPages = table.getPageCount();


    return (
        <div className="p-2">
            {isEmpty && <div className="text-center">Aucun employé trouvé!</div>}
            <div>
                <input
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
            >
                {[10, 25, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => { 
                                return <th key={header.id}>
                                {header.isPlaceholder ? null : (
                                  <div
                                    className={
                                      header.column.getCanSort()
                                        ? 'cursor-pointer select-none'
                                        : ''
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                    title={
                                        <>
                                            {header.column.getNextSortingOrder()}
                                            {header.column.getNextSortingOrder() === 'asc' ? 'Sort ascending' : 'Sort descending'}
                                        </>                                      
                                    }
                                  >
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                    {{
                                      asc: ' 🔼',
                                      desc: ' 🔽',
                                    }[header.column.getIsSorted()] ?? ' 🔼'}
                                  </div>
                                )}
                              </th>                              
                            })}
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
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            {/* PAGINATION */}
            <div className="flex items-center gap-2">


                <span className="flex items-center gap-1">
                    <div>Showing <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                        entries</div>
                </span>
                <span className="flex items-center gap-1">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                         Previous
                    </button>

                    {/* Affichage dynamique des numéros de pages */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => table.setPageIndex(index)}
                            className={index === pagination.pageIndex ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next 
                    </button>

                </span>
            </div>

        </div>
    );

};

export default EmployeeTable;