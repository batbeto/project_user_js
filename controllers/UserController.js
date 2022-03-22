class UserController{
  constructor(formId, tableId){
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
  }

  onSubmit(){
    
    this.formEl.addEventListener('submit', (e)=>{
      e.preventDefault();

      let values = this.getValues();

      this.getPhoto().then((content)=>{
        values.photo = content;
        this.addLine(values);
      },(e)=>{
        console.error(e);
      });

    });
  }

  getPhoto(){
    return new Promise((resolve, reject)=>{
      let fileReader = new FileReader();
    let elements = [...this.formEl.elements].filter(i =>{
      if (i.name === 'photo') {
        return i;
      }
    })
    let file = elements[0].file[0];
    
    fileReader.onload = ()=>{
      
      resolve(fileReader.result);
    };
    fileReader.onerror = (e)=>{
      reject(e);
    }
    if(file){
      fileReader.readAsDataURL(file);
    } else {
      resolve();
    }
    
    })

    
  }

  getValues(){
    let user = {};
    
    [...this.formEl.elements].forEach((f, index) => {
      if(f.name == 'gender'){
        if(f.checked){
          user[f.name] = f.value;
        }} else {
          user[f.name] = f.value;
        }
    });
  
    return new User(
      user.name, 
      user.gender, 
      user.birth, 
      user.country, 
      user.email, 
      user.password, 
      user.photo, 
      user.admin
      );
  }
  addLine(dataUser){
 
    this.tableEl.innerHTML = `
          <tr>
              <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
              <td>${dataUser.name}</td>
              <td>${dataUser.email}</td>
              <td>${dataUser.admin}</td>
              <td>${dataUser.birth}</td>
              <td>
                  <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                  <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
              </td>
          </tr>
      `;
    
  
  }
}