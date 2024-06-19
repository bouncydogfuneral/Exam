import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../utils/StateContext";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import { postTour } from "../services/post";
import { updateData } from "../services/update";
import dayjs from "dayjs";
function EditProjectForm({ tour }) {
  const { show, setShow, setUpdate, update } = useContext(StateContext);

  const [tourDates, setTourDates] = useState([]);
  const [tourEnd, setTourEnd] = useState([]);
  const [calculatedDuration, setCalculatedDuration] = useState(
    tour?.duration || 0
  );

  const addDate = () => {
    setTourDates((prevDates) => [...prevDates, dayjs().toDate()]);
  };
  const addEnd = () => {
    setTourEnd((prevDates) => [...prevDates, dayjs().toDate()]);
  };
  const removeDate = (index) => {
    setTourDates((prevDates) => prevDates.filter((_, i) => i !== index));
  };
  const removeEnd = (index) => {
    setTourEnd((prevDates) => prevDates.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const SumbitHandler = async (data) => {
    try {
      const formattedData = {
        ...data,
        dateStart: data.dateStart.filter(Boolean),
        dateEnd: data.dateEnd.filter(Boolean),
      };
      if (tour) {
        await updateData(tour._id, formattedData);
      } else {
        await postTour(formattedData);
      }
      setUpdate((update) => update + 1);
      reset();
      handleClose();
    } catch (err) {
      if (err.message == "Request failed with status code 403") {
        alert("only admins can create tours");
      } else {
        alert(err.message);
      }
    }
  };
  useEffect(() => {
    if (tour) {
      setValue("name", tour.name);
      setValue("price", tour.price);
      setValue("duration", tour.duration);
      setValue("Image", tour.Image);
      setValue("Category", tour.Category);
      setTourDates(tour.dateStart || []);
      setTourEnd(tour.dateEnd || []);

      if (tour.dateStart.length > 0 && tour.dateEnd.length > 0) {
        const firstStart = dayjs(tour.dateStart[0]);
        const lastEnd = dayjs(tour.dateEnd[tour.dateEnd.length - 1]);
        const durationInDays = lastEnd.diff(firstStart, "day") + 1;
        setCalculatedDuration(durationInDays);
      } else {
        setCalculatedDuration(0);
      }
    }
  }, [update, tour, setValue, setTourDates, setTourEnd, setCalculatedDuration]);

  return (
    <>
      <form onSubmit={handleSubmit(SumbitHandler)}>
        <div className="Thenthing1">
          <div>Edit Tour</div>
          <div>
            <div className="Thenthing">
              <InputGroup className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Tour Name:</Form.Label>
                  <Form.Control
                    placeholder="Tour name"
                    aria-label="Tour Name"
                    aria-describedby="basic-addon2"
                    type="text"
                    id="tourName"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Tour name is required",
                      },
                    })}
                    isInvalid={errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name && errors.name.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </InputGroup>
            </div>
          </div>
          <div className="Dates">
            <div className="Thenthing">
              <label htmlFor="Tour date">Tour Starts</label>
              {tourDates.map((date, index) => (
                <div key={index}>
                  <input
                    type="date"
                    {...register(`dateStart.${index}`, {
                      required: "Tour date is required",
                      onChange: (e) => {
                        const newDates = [...tourDates];
                        newDates[index] = e.target.valueAsDate;
                        setTourDates(newDates);
                      },
                    })}
                  />
                  <Button variant="danger" onClick={() => removeDate(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="secondary" onClick={addDate}>
                Add Date
              </Button>
            </div>
            <div className="Thenthing">
              <label htmlFor="Tour date end">Tour end</label>
              {tourEnd.map((date, index) => (
                <div key={index}>
                  <input
                    placeholder="Enter tour date end"
                    type="date"
                    id="dateEnd"
                    {...register(`dateEnd.${index}`, {
                      required: "Tour date end is required",
                      onChange: (e) => {
                        const newDates = [...tourEnd];
                        newDates[index] = e.target.valueAsDate;
                        setTourEnd(newDates);
                      },
                    })}
                  />
                  <Button variant="danger" onClick={() => removeEnd(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="secondary" onClick={addEnd}>
                Add Date
              </Button>
            </div>
          </div>
          <div className="Thenthing">
            <label htmlFor="Tour Price">Tour Price</label>
            <InputGroup className="mb-3">
              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Tour price"
                  aria-label="Tour Price"
                  aria-describedby="basic-addon2"
                  type="number"
                  id="tourPrice"
                  {...register("price", {
                    required: "Tour price is required",
                  })}
                  isInvalid={errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price && errors.price.message}
                </Form.Control.Feedback>
              </Form.Group>
            </InputGroup>
          </div>
          <div className="Thenthing">
            <label htmlFor="Tour Category">Tour Category</label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter tour category"
                aria-label="Tour Price"
                aria-describedby="basic-addon2"
                type="text"
                id="tourCategory"
                {...register("Category", {
                  required: "Tour category is required",
                })}
                isInvalid={errors.Category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Category && errors.Category.message}
              </Form.Control.Feedback>
            </InputGroup>
          </div>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditProjectForm;
