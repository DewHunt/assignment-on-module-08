import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExpenceList = ({
  expenceList,
  deleteExpence,
  allExpenceDelete,
  isForm,
}) => {
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <h3>Expence List</h3>
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
                      onClick={allExpenceDelete}
                    />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {expenceList.length === 0 ? (
                <tr>
                  <td colSpan={isForm ? "5" : "4"}>Add Your Income</td>
                </tr>
              ) : (
                expenceList.map((expence, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{expence.date}</td>
                        <td>{expence.title}</td>
                        <td className="text-end">{expence.amount}</td>
                        {isForm === false ? (
                          ""
                        ) : (
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-danger"
                              onClick={() => deleteExpence(expence.id)}
                            />
                          </td>
                        )}
                      </tr>
                    </>
                  );
                })
              )}
            </tbody>
            {expenceList.length === 0 ? (
              ""
            ) : (
              <tfoot>
                <tr>
                  <th colSpan="3" className="text-end">
                    Total Expence
                  </th>
                  <th className="text-end">
                    {expenceList
                      .map((expence) => parseInt(expence.amount))
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

export default ExpenceList;
