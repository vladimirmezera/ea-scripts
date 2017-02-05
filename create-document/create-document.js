!INC Local Scripts.EAConstants-JScript

/*
 * Script Name: create-document.js
 * Author: Vladimir Mezera vladimir.mezera@gmail.com
 * Purpose: Create file and linked it to element.
 * Date: 2017-02-05
 */

/*Configuration of script*/
const MODEL_NAME="nameOfEaModel"
const TEMP_DOC="pathToTemporatyFile"


function createOrUpdatePackageStructure(root, packageName ) {

    resultPackage = root.Packages.AddNew (packageName, "")
    resultPackage.Update ()

    return resultPackage
}


function main()
{
    root = Repository.Models.GetByName(MODEL_NAME)

    var package = createOrUpdatePackageStructure(root, "testDocumentPackage")
    var resultDiagram = package.Diagrams.AddNew ("ReportDiagram", "Class")
    resultDiagram.Update()

    var resultClass = package.Elements.AddNew ("ReportClass", "Document")
    resultClass.Update()

    var resultDiaAssign = resultDiagram.DiagramObjects.AddNew("","")
    resultDiaAssign.ElementID = resultClass.ElementID
    resultDiaAssign.Update ()

    var gendoc = Repository.CreateDocumentGenerator()
    gendoc.NewDocument("")
    gendoc.InsertText("Hello world!", "Text")

    gendoc.SaveDocument(TEMP_DOC, 0)
    resultClass.LoadLinkedDocument(TEMP_DOC)
    resultClass.Update()
}

main()
