'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TableReact } from "searchinput_dynamic-form";

import ReactPaginate from "react-paginate";

function page() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [tabledata, setTableData] = useState([]);
  const defaultColumns = [
    {
      header: "Name",
      columns: [
        {
          accessorKey: "firstName",
          id: "firstName",
          header: "First Name",
          meta: {
            filterVariant: "search",
          },
        },
        {
          accessorKey: "lastName",
          id: "lastName",
          header: () => <span>Last Name</span>,
          meta: {
            filterVariant: "search",
          },
        },
      ],
    },
    {
      accessorKey: "age",
      id: "age",
      header: "Age",
      meta: {
        filterVariant: "number",
      },
    },
    {
      accessorKey: "visits",
      id: "visits",
      header: "Visits",
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorKey: "status",
      id: "status",
      header: "Status",
      meta: {
        filterVariant: "select",
        options: ["single", "relationship", "complicated"],
        isMulti: false,
      },
    },
    {
      accessorKey: "progress",
      id: "progress",
      header: "Profile Progress",
      meta: {
        filterVariant: "search",
      },
    },
  ];
  const formValue = (data: object) => {
    console.log(data, 'data form');
  };
  const formvaluessubmit = (data: object) => {
    console.log(data, "form app");
  };
  const updatePageNo = (pageNo: number) => {
    console.log(pageNo, "pageNo");
    //   setCurrentPage(pageNo)
    //   setTableData(makeData(pageSize))
  };
  const updatePageSize = (pageCount: number) => {
    setPageSize(pageCount)
    setTableData([])
  };
  const sorted = (data: Object) => {
    console.log(data, 'sorted');
  };

  const filterd = (data: Object) => {
    console.log(data, 'filterd');
  };
  return (
    <div>
      <div className="row">
        <div className="col-8 col-md-10"></div>
        <div className="col-4 col-md-2 ">
          <button className="btn btn-primary " onClick={() => router.push('createLoan')}> Create Loan</button>
        </div>
      </div>
      <div className="row mt-2`">
        <TableReact columns={defaultColumns} data={tabledata} filter={true} sorting={true} updateFilter={filterd} updateSorting={sorted}
          currentPageSize={pageSize}
          totalPages={5}
          showSelectOptions={true}
          selectOptions={[5, 10, 15, 20, 25, 50]}
          updatePageClick={updatePageNo}
          updatePageSize={updatePageSize}
          position="between"
        />
        {/* <PaginationReact
          totalPages={5}
          showSelectOptions={true}
          selectOptions={[5, 10, 15, 20, 25, 50]}
          updatePageClick={updatePageNo}
          updatePageSize={updatePageSize}
          position="between"
        /> */}
        {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={updatePageNo}
        pageRangeDisplayed={5}
        pageCount={1500}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination justify-content-end"
        pageClassName="rounded page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeLinkClassName="active"
        disabledClassName="disabled"
        previousClassName="page-item rounded-start"
        nextClassName="page-item rounded-end"
      /> */}
      </div>
    </div>
  )
}

export default page