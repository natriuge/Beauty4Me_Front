function FormControlSearch(props) {
    return (
      <input
        id="discover"
        name="keyword"
        onChange={props.onChange}
        value={props.value}
      />
    );
  }
  
  export default FormControlSearch;