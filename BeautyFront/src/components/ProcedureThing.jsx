import Procedure from "./Procedure";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
function ProcedureThing() {
  const { procedures } = useContext(StateContext);
  return (
    <>
      {procedures.map((procedure) => (
        <Procedure key={procedure._id} procedure={procedure} />
      ))}
    </>
  );
}
export default ProcedureThing;
