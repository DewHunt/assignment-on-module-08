import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IncomeList from "./IncomeList";

const IncomeForm = () => {
  const MySwal = withReactContent(Swal);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [newIncome, setNewIncome] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  const [incomeId, setIncomeId] = useState(0);
  const [isAllDelete, setIsAllDelete] = useState(false);

  useEffect(() => {
    (async () => {
      let incomeInfo = await localStorage.getItem("incomeList");
      incomeInfo = incomeInfo ? await JSON.parse(incomeInfo) : [];
      setIncomeList(incomeInfo);
      if (newIncome) {
        await incomeInfo.push(newIncome);
        // await setIncomeList((prevList) => [...prevList, newIncome]);
        localStorage.setItem("incomeList", JSON.stringify(incomeInfo));
        MySwal.fire("Success", "Information Saved", "success");
      }

      if (incomeId > 0) {
        incomeInfo = await incomeInfo.filter(
          (income) => income.id !== incomeId
        );
        localStorage.setItem("incomeList", JSON.stringify(incomeInfo));
        setIncomeList(incomeInfo);
        setIncomeId(0);
        MySwal.fire("Success", "Information Deleted", "success");
      }

      if (isAllDelete) {
        await localStorage.removeItem("incomeList");
        setIncomeList([]);
        setIsAllDelete(false);
        MySwal.fire("Success", "All Information Deleted", "success");
      }
    })();
  }, [newIncome, incomeId, isAllDelete]);

  const formatDate = (date) => {
    return date
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      MySwal.fire("Error", "Enter Income Title", "error");
      return;
    }
    const data = { id: Date.now(), date: formatDate(date), title, amount };
    setNewIncome(data);
  };

  const deleteIncome = (id) => {
    MySwal.fire({
      title: <p>Are you sure you want to delete information?</p>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log("result: ", result);
      if (result.isConfirmed) {
        setIncomeId(id);
        MySwal.fire(
          "Deleted!",
          "Your all incomes has been deleted.",
          "success"
        );
      } else {
        MySwal.fire("Cancelled", "Your all information is safe :)", "error");
      }
    });
  };

  const allIncomeDelete = () => {
    if (incomeList.length > 0) {
      MySwal.fire({
        title: <p>Are you sure you want to delete all information?</p>,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        console.log("result: ", result);
        if (result.isConfirmed) {
          setIsAllDelete(true);
          MySwal.fire(
            "Deleted!",
            "Your all incomes has been deleted.",
            "success"
          );
        } else {
          MySwal.fire("Cancelled", "Your all information is safe :)", "error");
        }
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
          <div className="card">
            <div className="card-header text-center">
              <h3>Add Your Income</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
                    <label htmlFor="date">Date</label>
                    <div className="form-group mt-2">
                      <ReactDatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
                    <label htmlFor="amount">Amount</label>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col">
                    <label htmlFor="title">Title</label>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col text-end">
                    <label htmlFor=""></label>
                    <div className="form-group mt-2">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
          <IncomeList
            incomeList={incomeList}
            deleteIncome={deleteIncome}
            allIncomeDelete={allIncomeDelete}
            isForm={true}
          />
        </div>
      </div>
    </>
  );
};

export default IncomeForm;
