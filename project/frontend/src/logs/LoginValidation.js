function Validation(values)

{

     let error = {}
    
     const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
     const password_pattern = /[a-zA-Z0-9]{8,}$/
    
    
     if(values.email === "")
      {  error.email = "Email should not be empty" }  

      else if(!email_pattern.test(values.email)) 
      {  error.email = "Email Didn't match" } 

      else {    error.email = ""  }
      
      if(values.password === "") 
      { error.password = "Password should not be empty"  } 
      
      else if(!password_pattern.test(values.password))
        {    error.password = "Password didn't match"  }  
      else {   error.password = ""  }
        
      return error;
        
}


function Reset(values){

  let error = {}
        
     const password_pattern = /[a-zA-Z0-9]{8,}$/
    
    
      if(values.password === "") 
      { error.password = "Password should not be empty"  } 
      
      else if(!password_pattern.test(values.password))
        {    error.password = "Password didn't match"  }  

      else {   error.password = ""  }

      if(values.repassword === "") 
      { error.repassword = "Password should not be empty"  } 

      else if(!password_pattern.test(values.repassword))
      {    error.repassword = "Password didn't match"  }  
      else if(values.repassword[0] !== values.password[0] ){
        error.repassword = "Password must be same"
      } 

      else {   error.repassword = ""  }

      
     

      return error;

}

module.exports={Reset,Validation} ;
