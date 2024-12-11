const fs = require("node:fs")

//Task 1: Create and Write Data to a File
try {
    const fd = fs.openSync("data.txt", "w")
    fs.writeSync(fd, "Hello, this is the first line.\n")
    fs.writeSync(fd, "This is the second line.\n")
    fs.closeSync(fd)
} catch(err){
    throw new Error("Error writing to file", err)
} 

//Task 2: Read File Content into a Buffer
try {
    const rd = fs.openSync("data.txt", "r")
    const buffer = Buffer.alloc(64)
    const bufferRead = fs.readSync(rd, buffer, 0, buffer.length, 0)
    console.log(bufferRead)
    fs.closeSync(rd)

} catch(err) {
    throw new Error("Error", err)
} 

//Task 3: Copy File Content Byte-by-Byte
try {
     const sourceFile = fs.openSync("data.txt", "r")
     const destFile = fs.openSync("copy.txt", "w")
     const buffer = Buffer.alloc(16)
     let bytes 
     while((bytes = fs.readSync(sourceFile, buffer, 0, buffer.length, null)) > 0){
        fs.writeSync(destFile, buffer, 0, bytes)
     }
     fs.closeSync(sourceFile)
     fs.closeSync(destFile)
 
} catch(err) {
    throw new Error("Error", err)
}

//Task 4: Implement a Simple File Cursor
try {
    const rd = fs.openSync("data.txt", "r+")
    fs.writeSync(rd, "0123456789")
    const newBuffer = Buffer.from("AB") 
    fs.writeSync(rd, newBuffer, 0, newBuffer.length, 5)
    fs.closeSync(rd)
  
} catch(err){
    throw new Error(err)
}

//Task 5: File Length and Seek
try {
    const file = "data.txt"
    const content = fs.readFileSync(file)
    const length = content.length
    console.log("file length ", length)
    const midPosition = Math.floor(length / 2)
    const fd = fs.openSync(file, "r")
    const buffer = Buffer.alloc(10)
    fs.readSync(fd, buffer, 0, 10, midPosition)
    console.log(buffer.toString())
    fs.closeSync(fd);
} catch (err) {
    throw new Error(err)
}

//Task 6: Merge Multiple Files
try{
    fs.writeFileSync("file1.txt", "Content of the first file.\n")
    fs.writeFileSync("file2.txt", "Content of the second file.\n")
    const fd = fs.openSync("merged.txt", "w")
    const buffer = Buffer.alloc(64)
    const contentf1 = fs.readFileSync("file1.txt", buffer, 0, buffer.length, 0)
    const contentf2 = fs.readFileSync("file2.txt", buffer, 0, buffer.length, 0)
    const mergedContent = Buffer.concat([contentf1, contentf2])
    fs.writeFileSync("merged.txt", mergedContent)
 
} catch(err) {
    console.log(err)
}

//Task 7: Insert Content into the Middle of a File
try {
    fs.writeFileSync("message.txt", "Hello world.\n", {flag: "w"})
    const buffer = Buffer.alloc(64)
    const content = fs.readFileSync("message.txt", "utf-8")
    const modified = content.replace("Hello", "Hello Awesome")
    fs.writeFileSync("message.txt", modified)
} catch(err){
    console.log(err)
}
   
