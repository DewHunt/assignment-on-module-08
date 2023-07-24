import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IncomeList = ({ incomeList, deleteIncome, allIncomeDelete, isForm }) => {
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <h3>Income List</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-center">SL</th>
                <th className="text-center">Date</th>
                <th className="text-center">Income</th>
                <th className="text-center">Amount</th>
                {isForm === false ? (
                  ""
                ) : (
                  <th className="text-center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger"
                      onClick={allIncomeDelete}
                    />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {incomeList.length === 0 ? (
                <tr>
                  <td colSpan={isForm ? "5" : "4"}>Add Your Income</td>
                </tr>
              ) : (
                incomeList.map((income, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{income.date}</td>
                        <td>{income.title}</td>
                        <td className="text-end">{income.amount}</td>
                        {isForm === false ? (
                          ""
                        ) : (
                          <th className="text-center">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-danger"
                              onClick={() => deleteIncome(income.id)}
                            />
                          </th>
                        )}
                      </tr>
                    </>
                  );
                })
              )}
            </tbody>
            {incomeList.length === 0 ? (
              ""
            ) : (
              <tfoot>
                <tr>
                  <th colSpan="3" className="text-end">
                    Total Income
                  </th>
                  <th className="text-end">
                    {incomeList.length === 0
                      ? 0
                      : incomeList
                          .map((income) => parseInt(income.amount))
                          .reduce((prev, next) => prev + next)}
                  </th>
                  {isForm === false ? "" : <th></th>}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default IncomeList;
