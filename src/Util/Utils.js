export const uploadToCloudinary=async(file,fileType)=>{
    if(file){
        const data=new FormData();
        data.append("file",file);
        data.append('cloud_name',"dj2wdfbxm");
        data.append('upload_preset',"whatsapp");
        data.append('resource_type',fileType);

        const res=await fetch(`https://api.cloudinary.com/v1_1/dj2wdfbxm/${fileType}/upload`,
            {
                method:"post",
                body:data
            }
        )

        const fileData=await res.json();
        return fileData.url?.toString();        
        
    }else{
        console.log("error from upload function");
    }
}



export const timeOfference=(timeStamp)=>{
    const date=new Date(timeStamp);
    const difference=Date.now()-date.getTime();

    const seconds=Math.floor(difference/1000);
    const minute=Math.floor(seconds/60);
    const hours=Math.floor(minute/60);
    const day=Math.floor(hours/24);
    const week=Math.floor(day/7);

    if(week>0){
        return week+" week"+(week===1?"":"s")+" ago";
    }else if(day>0){
        return day+" day"+(day===1?"":"s")+" ago";
    }else if(hours>0){
        return hours+" hour"+(hours===1?"":"s")+" ago";
    }else if(minute>0){
        return minute+" minute"+(minute===1?"":"s")+" ago";
    }else if(seconds>0){
        return seconds+" second"+(seconds===1?"":"s")+" ago";
    }else{
        return "just now";
    }
}