import React, { Component } from 'react';
import ReactS3 from 'react-s3';
const BUCKET_NAME = "";
const IAM_USER_KEY = '';
const IAM_USER_SECRET = "";
const S3_BUCKET = BUCKET_NAME;


export default class awss3 extends Component {
    constructor(props){
        super(props);

        this.state ={
          c : []
                }
    }

 
    upload(e){
      
        console.log(e.target.files[0]);
        var file = e.target.files[0];
  
        var config = {
          bucketName: BUCKET_NAME,
          region: 'us-east-1',
          accessKeyId: IAM_USER_KEY,
          secretAccessKey: IAM_USER_SECRET,
      };
      
        ReactS3.uploadFile(file, config).then(d=>console.log(e)).catch(er=>console.log(er));

    }

    
    addcountry(){
      this.setState({
        c : [...this.state.c, ""]
      })
    }

    handleChange(e,i){

      this.state.c[i]=e.target.value;
      this.setState({c: this.state.c})
    }

    remove(i){
      this.state.c.splice(i,1);
      this.setState({c: this.state.c})

    }
    render() {

    return (
      <div>
              {/* Amazon s3 */}
            {/* <input type="file" onChange={this.upload}/> */}
      <form>
          {
            this.state.c.map((e,i)=>{
              return(
                <div key={i}>
                  <input 
                  onChange={(e)=>this.handleChange(e,i)}
                  value ={e}/>
                  <input 
                  onChange={(e)=>this.handleChange(e,i)}
                  value ={e}/>
                 <button onClick={(e)=>this.remove(i)}>Remove </button>

                </div>
              )
            })
          }
</form>


          <button onClick={(e)=>this.addcountry(e)}>Add </button>

      </div>
    )
  }
}
