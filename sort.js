const path = require('path');
const fs   = require('fs').promises ;

const VIDEO = "video";
const CAPTURED = "captured";
const DUPLICATED = "duplicated";
const target   = process.argv[2];
const dir = path.join(__dirname, ); 
console.log(target) ;

//  fs.mkdir(path.join(__dirname,target,VIDEO));
//  fs.mkdir(path.join(__dirname,target,CAPTURED));
//  fs.mkdir(path.join(__dirname,target,DUPLICATED));
main();
async function main(){
    try{
        const files = await readDir(target);
        await sortDir(files);
        
        
    }catch(err){
        console.log(err);
    }
}




async function readDir(dir){
    const files = await fs.readdir(dir);
    return files;
}

async function sortDir(files){
    video_path = path.join(target,VIDEO);
    captured_path = path.join(target,CAPTURED);
    duplicated_path = path.join(target,DUPLICATED);    

    for (const file of files){
        const ext = path.extname(file);
        const current_path = path.join(target,file);
        if(ext === ".mp4" || ext === ".mov") fs.rename(current_path, path.join(video_path,file));
        else if(ext === ".png" || ext ===".aae") fs.rename(current_path, path.join(captured_path, file));
        else{
            const file_name = path.parse(file).name;
            const splited_name = file_name.split("_");
            const date = String(splited_name[0]+"_E"+splited_name[1]+ext);
            if(files.find((element)=>{return element===date})){
                fs.rename(current_path,path.join(duplicated_path,file));
            } 
        }
    }
}

