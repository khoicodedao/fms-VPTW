import { AutoComplete, Input } from "antd";
import { useState } from "react";
import { getListUnit } from "../apis/Unit.api";
import { useSelector, useDispatch } from "react-redux";
const searchResult = async (query) => {
  let listUnit = await getListUnit();
  listUnit = listUnit?.data.filter((data) => data.name.includes(query)) || [];
  return listUnit.map((item, idx) => {
    return {
      value: item.unit_code,
      label: item.name,
    };
  });
};
const SearchBar = () => {
  const dispatch = useDispatch(); //
  const [options, setOptions] = useState([]);
  const [inputShow, setInputShow] = useState("");
  const handleSearch = async (value) => {
    setOptions(value ? await searchResult(value) : []);
  };
  const onSelect = (value, option) => {
    setInputShow(option.label);
    dispatch({
      type: "CHANGE",
      payload: option?.value || "",
    });
    console.log("onSelect", option);
  };
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
        opacity: "0", //! hide Search component
      }}
      onChange={function (value) {
        setInputShow(value);
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      notFoundContent="Không có kết quả"
      value={inputShow}
    >
      <Input.Search size="large" placeholder="Tìm kiếm đơn vị" enterButton />
    </AutoComplete>
  );
};
export default SearchBar;
