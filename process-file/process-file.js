!INC Local Scripts.EAConstants-JScript
!INC EAScriptLib.JScript-Logging

/*
 * Script Name: process-file.js
 * Author: Vladimir Mezera vladimir.mezera@gmail.com
 * Purpose: Test processing file with javascript.
 * Date: 2017-02-05
 */

//DEBUG LEVEL
var LOGLEVEL = LOGLEVEL_DEBUG

//Setup file name
const FILE_NAME = "/home/vlada/Develop/ea/classes.csv"
const FILE_READ = 1

function main()
{

    LOGInfo( "Javascript process FILE example" )
    LOGInfo( "-------------------------------" )

    var fs = new COMObject("Scripting.FileSystemObject")
    var f = fs.GetFile(FILE_NAME)
    var ts = f.OpenAsTextStream(FILE_READ)
    var strline = null
    var lineNumber = 0

    while (!ts.AtEndOfStream) {
        strLine = ts.ReadLine()
        LOGDebug(strLine);
        lineNumber++;
    }

    LOGInfo("The file " +FILE_NAME +" has " +lineNumber+" lines")

}

main()
