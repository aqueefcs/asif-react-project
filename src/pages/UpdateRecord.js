import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateRecord = () => {
  const { customerId } = useParams();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});

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

  const customerData = data.find(
    (item) => item.ID === parseInt(customerId, 10)
  );

  useEffect(() => {
    setFormData({
      ...customerData,
    });
  }, [customerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure Load_Applied is not more than 200
    if (name === "Load_Applied") {
      setFormData({
        ...formData,
        [name]: Math.min(value, 200),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateUrl = `http://localhost:3500/data?ID=${customerId}`;
      const response = await axios.put(updateUrl, formData);
      console.log("Record updated successfully:", response.data);
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

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

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <div className="card">
          <div className="card-title text-center mt-2">
            <h5 className="">Edit the Record of id - {customerId} </h5>
            <hr className="my-10" />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {Object.keys(customerData).map((field) => (
                <div key={field} className="mb-3">
                  <label className="form-label">
                    {field.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    // Disable specified fields
                    disabled={[
                      "ID",
                      "GovtID_Type",
                      "ID_Number",
                      "Date_of_Application",
                    ].includes(field)}
                    // Ensure Load_Applied is not more than 200
                    max={field === "Load_Applied" ? 200 : undefined}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-md btn-primary">
                Update Record
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRecord;
