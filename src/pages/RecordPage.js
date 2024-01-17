import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { EyeFill, PencilSquare } from "react-bootstrap-icons";

const RecordPage = () => {
  const { customerId } = useParams();
  const { startDate } = useParams();
  const { endDate } = useParams();
  const [data, setData] = useState([]);
  const [rangeData, setRangeData] = useState([]);

  const url = "http://localhost:3500/data";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate !== undefined && endDate !== undefined) {
      const startDateString = new Date(`${startDate}`);
      const endDateString = new Date(`${endDate}`);

      const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const formattedStartDate = formatDate(startDateString);
      const formattedEndDate = formatDate(endDateString);

      // Function to check if a date is within the range
      const isDateInRange = (date, startDate, endDate) => {
        return date >= startDate && date <= endDate;
      };

      // Filter the array based on the date range
      const filteredData = data.filter((item) => {
        const dateOfApplication = new Date(item.Date_of_Application);
        const formattedDateOfApplication = formatDate(dateOfApplication);
        console.log("dap: ", formattedDateOfApplication);
        return isDateInRange(
          formattedDateOfApplication,
          formattedStartDate,
          formattedEndDate
        );
      });

      setRangeData(filteredData);
    }
  }, [data, startDate, endDate]);

  console.log(rangeData);

  const tableHeadData = data[0];

  const customerData = data.find(
    (item) => item.ID === parseInt(customerId, 10)
  );

  if (data.length === 0) {
    return (
      <>
        <div
          className="container"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          Loading...
        </div>
      </>
    );
  }

  if (customerId !== undefined) {
    if (!customerData) {
      return (
        <>
          <div
            className="container"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            No Data Found for this application Id: {customerId}
          </div>
        </>
      );
    }
    return (
      <>
        <div
          className="container"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          <div className="card">
            <div className="card-title">
              <h5 className="text-center mt-2">
                Details for Application Id - {customerId}
              </h5>
              <hr className="my-10" />
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th className="bg-warning" scope="col">
                        Field
                      </th>
                      <th className="bg-warning" scope="col">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(customerData).map(([key, value]) => (
                      <tr key={key}>
                        <td className="bg-light text-dark">{key}</td>
                        <td className="bg-light text-dark">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <LinkContainer to="/">
                  <Link className="nav-link d-inline">
                    <button className="btn btn-sm btn-primary">
                      Home Page
                    </button>
                  </Link>
                </LinkContainer>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    if (startDate !== undefined && endDate !== undefined) {
      return (
        <>
          <div
            className="container"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            start date: - end date:
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="container"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            <div className="card">
              <div className="card-title text-center">
                <h5 className="mt-2">Full table Display</h5>
                <hr className="my-10" />
              </div>
              <div className="card-body">
                <div
                  className="table-responsive-md"
                  style={{ overflowX: "auto" }}
                >
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        {Object.keys(tableHeadData).map((i) => (
                          <th
                            className="bg-dark text-white"
                            scope="col"
                            key={i}
                          >
                            {i}
                          </th>
                        ))}
                        <th
                          className="bg-dark text-white"
                          scope="col"
                          key="view"
                        >
                          View
                        </th>
                        <th
                          className="bg-dark text-white"
                          scope="col"
                          key="edit"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item.ID}>
                          {Object.values(item).map((value) => (
                            <td className="bg-light text-dark" key={value}>
                              {value}
                            </td>
                          ))}
                          <td
                            className="bg-light text-primary text-center"
                            key="view"
                          >
                            <LinkContainer to={`${item.ID}`}>
                              <Link className="nav-link d-inline">
                                <EyeFill />
                              </Link>
                            </LinkContainer>
                          </td>
                          <td
                            className="bg-light text-primary text-center"
                            key="edit"
                          >
                            <LinkContainer to={`edit/${item.ID}`}>
                              <Link className="nav-link d-inline">
                                <PencilSquare />
                              </Link>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
};

export default RecordPage;
