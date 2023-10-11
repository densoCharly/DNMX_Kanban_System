export default {
    serviceURL: () => {
        var url=window.location;
        //return "http://172.20.10.3:8080/DNMX_Kanban_System_API/services/"
        if(url.host==="localhost:3000"){
            return "http://localhost:8080/DNMX_Kanban_System_API/services/"
        }else {
            return "http://"+url.host+"/DNMX_Kanban_System_API/services/"    
        }
        
    },
    imageURL: () => {
        var url=window.location;
        //return "http://172.20.10.3:8080/DNMX_Kanban_System_API/Public/img/users"
        if(url.host==="localhost:3000"){
            return "http://localhost:8080/DNMX_Kanban_System_API/Public/img/users"
        }else{
            return "http://"+url.host+"/DNMX_Kanban_System_API/Public/img/users"
        
        }
        //alert("Dispositivo no registrado");
    },
    componentURL: () => {
        var url=window.location;
        if(url.host==="localhost:3000"){
            return "http://localhost:8080/DNMX_Kanban_System_API/Public/img/components/"
        }else{
            return "http://"+url.host+"/DNMX_Kanban_System_API/Public/img/components/"
        
        }
    },
    //urlAPI : "http://localhost:8080/api_test/DNMX_Kanban_System_API/services/",
    //urlImage : "http://localhost:8080/api_test/DNMX_Kanban_System_API/Public/img/users",
    //urlImage : "http://nsmx366.nadenso.net/DNMX_Kanban_System_API/Public/img/users",
    //urlAPI : "http://nsmx366.nadenso.net/DNMX_Kanban_System_API/services/"
    //10.72.112.180
}