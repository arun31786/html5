/**
 * Created by Puneet on 28-01-2014.
 */


// since worker is external script, it can not access window, document and parent

// in worker only, you can import other scripts as well
importScripts("employees.js","helper.js");


function displayEmployeeData() {
    for(i=0;i<data.length;i++) {
        postMessage({emp : data[i]});
        sleep(1000);
    }
}

while(true){
    displayEmployeeData();
}