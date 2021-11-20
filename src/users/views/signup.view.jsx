import React from "react";

const SignUp = () => {
  return (
    <div className="grid">
      <div className="g-col-4 g-start-4">
        <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label">Correo</label>
          <input type="email" class="form-control" id="exampleInputEmail1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Nombre</label>
          <input type="email" class="form-control" id="exampleInputName" />
        </div>
        <div class="mb-3">
          <label for="exampleSelectRole" class="form-label">Rol</label>
          <select class="form-select">
            <option selected>Selecciona el rol</option>
            <option value="1">Administrador</option>
            <option value="2">Líder</option>
            <option value="3">Estudiante</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default SignUp;