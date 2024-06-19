import { deleteProcedure } from "../services/delete";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../utils/StateContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditProcedure from "./EditProcedure";
function Procedure({ procedure }) {
  const { setUpdate } = useContext(StateContext);
  const [show, setShow] = useState(false);
  const { _id, name, description, price, category, time } = procedure;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = async (id) => {
    try {
      await deleteProcedure(id);
      setUpdate((update) => update + 1);
    } catch (err) {
      console.log(err.message);
      if (err.message == "Request failed with status code 401") {
        alert("only admins can delete tours");
      } else {
        console.log(err.message);
      }
    }
  };
  useEffect(() => {}, [setUpdate]);

  return (
    <>
      <div className="singleProcedure">
        <h1>{name}</h1>
        <p>About procedure: {description}</p>
        <p>Price:{price}</p>
        <p>Category:{category}</p>
        <p>Time:{time}</p>
        <Button variant="primary" onClick={() => deleteHandler(_id)}>
          Delete
        </Button>
        <Modal show={show} onHide={handleClose}>
          <EditProcedure procedure={procedure} setShow={setShow} />
        </Modal>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
      </div>
    </>
  );
}
export default Procedure;
