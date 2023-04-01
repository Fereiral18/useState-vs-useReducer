import React, { useEffect, useState } from 'react'
const SECURITY_CODE = 'paradigma'

const UseState = () => {
  const [state, setstate] = useState({
    value: "",
    error: false,
    loading: false,
    delete: false,
    confirm: false,
  })
  
  const [value, setvalue] = useState("")
  const [error, setError] = useState(false)
  const [loading, setloading] = useState(false)
  
  const onConfirm = () =>{
    setstate({
      ...state,
      error: false,
      loading: false,
      confirm: true,
  })
}
const onError = () =>{
  setstate({
    ...state,
    error: true,
    loading: false,
  })
  }
  const onWrite = (newValue) =>{
    setstate({
      ...state,
      value: newValue,
    })
  }
  const onCheck = () =>{
    setstate({
      ...state,
      loading: true,
    })
  }
  const onDelete = () =>{
    setstate({
      ...state,
      delete: true
    })
  }
  const onReset = () =>{
    setstate({
      ...state,
      delete: false,
      confirm: false,
      value: ""
    })
  }
  
  useEffect(() => {
    console.log('Empezando el efecto');
    
    setTimeout(()=>{
      if(!!state.loading){
        console.log('lo desactivo');

        if(state.value === SECURITY_CODE){
         onConfirm();
      }else {
         onError()
      }
    }
  }, 3000)
  console.log('Terminando el efecto');
},[state.loading])

if (!state.delete && !state.confirm){
  return (
    <>
    <h2>Eliminar UseState</h2>
    <p>Por favor, escribe el codigo de seguridad.</p>
    {
      (state.error && !state.loading) && (
        <p>Error: el nombre es incorrecto</p>
      )
    }
    {
      state.loading && (
        <p>Cargando...</p>
      )
    }
    <input 
    value={state.value}
    placeholder="Codigo de seguridad"
    onChange={(event)=>{
      onWrite(event.target.value)
    }}
    />
    <button
    onClick={()=>{
      onCheck()
    }}>Comprobar</button>
  </>
  )
  }else if(!!state.confirm && !state.delete){
    return (
      <>
      <p>Estado de confirmacion. ¿Estas seguro de eliminar?</p>
      <button
      onClick={()=>
       onDelete()
      }
      >
        Si, eliminar
      </button>

      <button
      onClick={()=>
       onReset()
      }
      >
        Cancelar
      </button>
      </>
    )
  }else {
    return (
      <>
      <p>Eliminado con exito</p>
      <button
      onClick={()=>
        onReset()
      }
      >Recuperar datos!</button>
      </>
    )
  }
}

export {UseState}
