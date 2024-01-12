import React from 'react'

export const AddMoviesFormInput = ({inpId,pHolder,text,fieldValue,handleChange}) => {
  return (
    <div className="mb-3">
      <label htmlFor={inpId} className="form-label h4">
        {text}:{" "}
      </label>
      <input
        type="text"
        className="form-control w-50 m-auto"
        id={inpId}
        name={inpId}
        value={fieldValue}
        placeholder={pHolder}
        onChange={handleChange}
        required
      />
    </div>
  );
}
