const Select = ({options, placeholder, onChange}) => {
    return <select onChange={(e) => onChange(e.target.value)}>
       <option value=''>{placeholder}</option>
       {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
   
    </select>   
   }
   
   export default Select;