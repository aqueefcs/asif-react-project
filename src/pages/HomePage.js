import { React, useState } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
  const [customerId, setCustomerId] = useState("");
  const handleCustomerIdChange = (e) => {
    setCustomerId(e.target.value);
  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let fullTableUrl = "/records";
  let applicationIdRequestUrl = `/records/${customerId}`;
  let daterangeUrl = `/records/${startDate}/${endDate}`;
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <div className="card bg-dark bg-gradient">
          <div className="card-title text-center mt-3 text-white">
            <h4 className="text-white h4-responsive">ELECTRICITY BOARD</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 mb-2">
                <div className="card bg-light">
                  <div
                    className="card-title text-center"
                    style={{ paddingLeft: "20px", paddingTop: "20px" }}
                  >
                    <h5>USER CONNECTION REQUEST</h5>
                    <hr className="my-10" />
                  </div>
                  <div className="card-body">
                    <div className="d-inline" style={{ marginRight: "10px" }}>
                      Full Record of customer Application
                    </div>
                    <LinkContainer to={fullTableUrl}>
                      <Link className="nav-link d-inline">
                        <button className="btn btn-sm btn-primary">
                          GET RESULT
                        </button>
                      </Link>
                    </LinkContainer>
                    <hr className="my-10" />
                    <Form className="d-flex">
                      <Form.Control
                        type="text"
                        id="customerId"
                        value={customerId}
                        onChange={handleCustomerIdChange}
                        placeholder="Enter Application Id"
                        className="mr-2"
                        style={{ marginRight: "10px", width: "60%" }}
                      />
                      <LinkContainer to={applicationIdRequestUrl}>
                        <Link className="nav-link d-inline">
                          <button className="btn btn-sm btn-primary">
                            GET RESULT
                          </button>
                        </Link>
                      </LinkContainer>
                    </Form>
                    <hr className="my-10" />
                    <p>Choose Date range to filter aplication</p>
                    <p>Start Date</p>
                    <DatePicker
                      selectsStart
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      startDate={startDate}
                    />
                    <p>End Date</p>
                    <DatePicker
                      selectsEnd
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      endDate={endDate}
                      startDate={startDate}
                      minDate={startDate}
                    />
                    <LinkContainer to={daterangeUrl}>
                      <Link className="nav-link mt-2">
                        <button className="btn btn-sm btn-primary">
                          GET RESULT
                        </button>
                      </Link>
                    </LinkContainer>
                  </div>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
