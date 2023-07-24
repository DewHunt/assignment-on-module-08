import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ExpenceList from "../components/expence/ExpenceList";
import IncomeList from "../components/income/IncomeList";
import Layout from "../layouts/Layout";

const HomePage = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenceList, setExpenceList] = useState([]);

  useEffect(() => {
    (async () => {
      const incomeInfo = await localStorage.getItem("incomeList");
      setIncomeList(incomeInfo ? JSON.parse(incomeInfo) : []);

      const expenceInfo = await localStorage.getItem("expenceList");
      setExpenceList(expenceInfo ? JSON.parse(expenceInfo) : []);
    })();
  }, []);

  console.log("incomeList: ", incomeList);
  console.log("expenceList: ", expenceList);

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
            <IncomeList incomeList={incomeList} isForm={false} />
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
            <ExpenceList expenceList={expenceList} isForm={false} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
