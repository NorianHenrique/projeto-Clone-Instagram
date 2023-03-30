import Logo from './logoInstragam.png';
import React,{useEffect,useState} from 'react';
import firebase  from 'firebase';
import {auth,db,storage} from './firebase';
function Header(props){
     
 
    const [progress,setProgress] = useState(0);

    const [file,setFile] = useState(null);

    useEffect(() => {
         
    }, [])

    function criarContar(e){
      e.preventDefault();

      let email = document.getElementById('email-cadastro').value;
      let nome = document.getElementById('nome-cadastro').value;
      let senha = document.getElementById('senha-cadastro').value;

      auth.createUserWithEmailAndPassword(email,senha)
      .then((authUser)=>{
          authUser.user.updateProfile({
             displayName:nome
          })
          alert('Conta criado com sucesso');

          let modal = document.querySelector('.modalCriar');

          modal.style.display = 'block';

      }).catch((error)=>{
          alert(error.message);
      })
        ;
    }

    function logarConta(e){
      e.preventDefault();

      let email = document.getElementById('email-login').value;
      let senha = document.getElementById('senha-login').value;

      auth.signInWithEmailAndPassword(email,senha)
      .then((auth)=>{
          props.setUser(auth.user.displayName);
          alert('Logado com sucesso');
          window.location.href = "/";
      }).catch((error)=>{
        alert(error.message);
    })
      ;

    }

    function abrirModalConta(e){
      e.preventDefault();
      

      let modal = document.querySelector('.modalCriar');

      modal.style.display = 'block';
    }

    function abrirModalPostar(e){

      e.preventDefault();
      

      let modal = document.querySelector('.modalPostar');

      modal.style.display = 'block';

    }

    function postarPost(e){
       e.preventDefault()
       let postTitulo = document.getElementById('titulo-upload').value;
       let progressEl = document.getElementById('progress-postar');

       const uploadTask = storage.ref(`imagens/${file.name}`).put(file);

       uploadTask.on("state_changed",function(snaphost){
            const progress = Math.round(snaphost.bytesTransferred/snaphost.totalBytes) * 100;
            setProgress(progress);
       },function(error){

       }, function(){
          
         storage.ref("imagens").child(file.name).getDownloadURL()
         .then(function(url){
             db.collection('posts').add({
                titulo : postTitulo,
                imagem: url,
                userName: props.user,
                time: firebase.firestore.FieldValue.serverTimestamp(),
             });

             setProgress(0);
             setFile(null);

             alert('Upload realizado com sucesso!');

             document.getElementById('form-upload').reset();


         })
       })
    }

    function deslogar(e){
      e.preventDefault();
      auth.signOut().then(function(val){
          props.setUser(null);
          window.location.href = "/";
      })
    }

    function fecharModal(){

      let modal = document.querySelector('.modalCriar');

      modal.style.display = 'none';

    }

    function fecharModalPostar(){

      let modal = document.querySelector('.modalPostar');

      modal.style.display = 'none';

    }

    
    return(

       <div className='header'>

        <div className='modalCriar'>
          
           <div className='formCriar'>
              <div onClick={()=>fecharModal()} className='close-modal'>X</div>
              <h2>Crie sua conta</h2>
                <form onSubmit={(e)=>criarContar(e)}>

                <input id='email-cadastro' type='text' placeholder='Seu email..'/>
                <input id='nome-cadastro' type='text' placeholder='Seu nome..'/>
                <input id='senha-cadastro' type='password' placeholder='Sua senha..'/>
                <input type ='submit' value='Criar conta!'/>

                </form>
           </div>
        </div>

        <div className='modalPostar'>
          
           <div className='formPostar'>
              <div onClick={()=>fecharModalPostar()} className='close-modal'>X</div>
              <h2>Fazer upload</h2>
                <form id='form-upload' onSubmit={(e)=>postarPost(e)}>
                <progress id='progress-postar' value={progress}></progress>
                <input id='titulo-upload' type='text' placeholder='Seu upload..'/>
                <input onChange={(e)=>setFile(e.target.files[0])} type='file' name='file'/>
                <input type ='submit' value='Postar!'/>

                </form>
           </div>
        </div>
       

    <div className='logo'>
     <a href='#'><img src={Logo}/></a>
   </div>
    {
    (props.user)?
    <div className='logadoInfo'>
     <span>Bem vindo,{props.user}</span>
     <a onClick={(e)=>abrirModalPostar(e)} href='#'>Postar!</a>
     <a onClick={(e)=>deslogar(e)}>Deslogar</a>

    </div>
    :
     <div className='login'>
     <form onSubmit={(e)=>logarConta(e)}>
       <input id='email-login' type='text' placeholder='Login..'/>
       <input id='senha-login' type='password' placeholder='Senha..'/>
       <input type ='submit' name='acao' placeholder='Logar!'/>
     </form>

    <div className='btn_Criar'>
        <a onClick={(e)=>abrirModalConta(e)} href='#'>Criar conta!</a>
      </div>
   </div>
 }

 
</div>


    );
}

export default Header;
 