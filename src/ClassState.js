import React from 'react'


class ClassState extends React.Component {
    render(){
        return (
          <>
            <h2>Eliminar ClassState</h2>
            <p>Por favor, escribe el codigo de seguridad.</p>
            <input 
            placeholder="Codigo de seguridad"
            />
            <button>Comprobar</button>
          </>
        )
    }
}

export { ClassState }
