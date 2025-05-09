const PacienteForm = () => {
  return (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
    <div className="basic-container p-4 rounded">
        <form onSubmit={handleSubmit(enviar)}>
            <div className="mb-5">
                <label>Usuario</label>
                <input type="text" className="form-control w-100" autoComplete="off" placeholder="Usuario" {...register("usuario")}/>
            </div>
            <div className="mb-5">
                <label>Contraseña</label>
                <input type="password" className="form-control w-100" placeholder="Contraseña" {...register("contraseña")}/>
            </div>
            <button type="submit" className="btn btn-secondary w-100 mt-5">Continuar</button>
        </form>
    </div>
  </div>
    
  )
}

export default PacienteForm