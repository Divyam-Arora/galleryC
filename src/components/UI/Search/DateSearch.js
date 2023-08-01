import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { MdArrowBack, MdOutlineImageSearch, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/http-hook";
import {
  ApiGetAllDate,
  ApiGetAllMonth,
  ApiGetAllYear,
} from "../../../util/apis";
import ButtonPrimary from "../ButtonPrimary";
import classes from "./DateSearch.module.css";
import EmptyButton from "./EmptyButton";

const DateSearch = function ({
  action,
  initialDate,
  responsive = true,
  disabled = false,
  padding = false,
}) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [dates, setDates] = useState([]);
  const formRef = useRef();
  const yearRequest = useHttp();
  const monthRequest = useHttp();
  const dateRequest = useHttp();
  const { isLoading } = useSelector((state) => state.httpState);
  const [input, setInput] = useState({ date: null, month: null, year: null });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialDate) {
      setInput({ ...initialDate });
    }
    yearRequest.sendRequest(ApiGetAllYear());
  }, []);

  useEffect(() => {
    input.year && monthRequest.sendRequest(ApiGetAllMonth(input.year));
  }, [input.year]);

  useEffect(() => {
    input.year &&
      input.month &&
      dateRequest.sendRequest(ApiGetAllDate(input.year, input.month));
  }, [input.month, input.year]);

  useEffect(() => {
    if (yearRequest.data) {
      setYears(yearRequest.data.years);
    }
  }, [yearRequest.data]);

  useEffect(() => {
    if (monthRequest.data) {
      setMonths(monthRequest.data.months);
    }
  }, [monthRequest.data]);

  useEffect(() => {
    if (dateRequest.data) {
      setDates(dateRequest.data.dates);
    }
  }, [dateRequest.data]);

  const onChangeHandler = (e) => {
    const name = e.target.dataset.name;
    // console.log(name, input, e.target.value);
    setInput((state) => {
      const newState = { ...state };
      if (name == "year") {
        newState.month = null;
        newState.date = null;
        setMonths([]);
        setDates([]);
      }
      if (name == "month") {
        newState.date = null;
        setDates([]);
      }
      newState[name] = e.target.value.trim().length > 0 ? e.target.value : null;
      return { ...newState };
    });
  };

  const emptyInput = () => {
    setInput({ date: null, month: null, year: null });
    if (action) action({ date: null, month: null, year: null });
  };

  const onSubmitHandler = (e) => {
    console.log("date search");
    e.preventDefault();
    if (action) action(input);
  };
  return (
    <div
      className={`${classes.search} ${responsive ? classes.responsive : ""}`}
    >
      <div className={classes.button} onClick={() => setIsOpen(true)}>
        <IconContext.Provider value={{ size: padding ? "2.75rem" : "2.5rem" }}>
          <span className={padding ? "icon-sm" : ""}>
            <MdOutlineImageSearch />
          </span>
        </IconContext.Provider>
      </div>
      <IconContext.Provider value={{ size: "2rem" }}>
        <form
          ref={formRef}
          className={`flex-row ${classes.form} ${isOpen ? classes.open : ""}`}
          onSubmit={onSubmitHandler}
          id="date-search"
        >
          <div
            className={`${classes.back} icon`}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <MdArrowBack />
          </div>
          <div className={classes.inputs}>
            <div className={classes.select}>
              <label>Date</label>
              <select
                className="input"
                data-name="date"
                onChange={onChangeHandler}
                value={input.date || ""}
                disabled={disabled}
              >
                <option value={""} label={""} disabled hidden />
                {dates.map((date) => (
                  <option key={date} value={date} label={date} />
                ))}
                {dates.length == 0 && <option label="- -" disabled />}
              </select>
            </div>
            <div className={classes.select}>
              <label>Month</label>

              <select
                className="input"
                data-name="month"
                onChange={onChangeHandler}
                required={input.date}
                value={input.month || ""}
                disabled={disabled}
              >
                <option value={""} label={""} disabled hidden />
                {months.map((month) => (
                  <option
                    key={month}
                    label={month.substring(0, 3)}
                    value={month}
                  />
                ))}
                {months.length == 0 && <option label="- - -" disabled />}
              </select>
            </div>
            <div className={classes.select}>
              <label>Year</label>
              <select
                className="input"
                data-name="year"
                onChange={onChangeHandler}
                required={input.date || input.month}
                value={input.year || ""}
                disabled={disabled}
              >
                <option value={""} label={""} disabled hidden />
                {years.map((year) => (
                  <option key={year} label={year} value={year} />
                ))}
                {years.length == 0 && <option label="- - - -" disabled />}
              </select>
            </div>
          </div>
          <EmptyButton
            show={!disabled && (input.date || input.month || input.year)}
            action={emptyInput}
          />
          <ButtonPrimary disabled={disabled}>
            <MdSearch />
          </ButtonPrimary>
        </form>
      </IconContext.Provider>
    </div>
  );
};

export default DateSearch;
