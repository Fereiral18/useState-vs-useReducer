import React, { useEffect, useReducer} from "react";
const SECURITY_CODE = "paradigma";

const UseReducer = ({name}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () =>{
   dispatch({type: actionTypes.confirm})
}
const onError = () =>{
    dispatch({type: actionTypes.error})
  }
  const onWrite = ({target: {value}}) =>{
    dispatch({type: actionTypes.write, payload: value})
  }
  const onCheck = () =>{
    dispatch({type: actionTypes.check})
  }
  const onDelete = () =>{
    dispatch({type: actionTypes.delete})
  }
  const onReset = () =>{
    dispatch({type: actionTypes.reset})
  }
  useEffect(() => {
    console.log("Empezando el efecto");

    setTimeout(() => {
      if (!!state.loading) {
        console.log("lo desactivo");

        if (state.value === SECURITY_CODE) {
         onConfirm();
        } else {
         onError();
        }
      }
    }, 3000);
    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.delete && !state.confirm) {
    return (
      <>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {state.error && !state.loading && <p>Error: el nombre es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          value={state.value}
          placeholder="Codigo de seguridad"
          onChange={(event) => {
            // dispatch({ type: actionTypes.write, payload: event.target.value});
            onWrite(event.target.value)
          }}
        />
        <button
          onClick={onCheck}
        >
          Comprobar
        </button>
      </>
    );
  } else if (!!state.confirm && !state.delete) {
    return (
      <>
        <p>Estado de confirmacion. ¿Estas seguro de eliminar?</p>
        <button
          onClick={onDelete}
        >
          Si, eliminar
        </button>

        <button
          onClick={onReset}
        >
          Cancelar
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con exito</p>
        <button
          onClick={onReset}
        >
          Recuperar datos!
        </button>
      </>
    );
  }
};

const initialState = {
  value: "",
  error: false,
  loading: false,
  delete: false,
  confirm: false,
};

const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    write: "WRITE",
    check: "CHECK",
    delete: "DELETE",
    reset: "RESET"
}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirm: true,
  },

  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    delete: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirm: false,
    delete: false,
    value: "",
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};
export { UseReducer };

// ejemplos del reducer:
// const reducer = (state, action) =>{
// }
// const reducer = (state, action) =>{
//     if(action.type === "ERROR"){
//         return {
//             ...state,
//             error: true,
//             loading: false,
//         }
//     } else if(action.type === "CHECK"){
//         return {
//             ...state,
//             loading: true
//         }
//     }else {
//         return {
//             ...state,
//         }
//     }
// }

// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case "ERROR":
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     case "CHECK":
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };
