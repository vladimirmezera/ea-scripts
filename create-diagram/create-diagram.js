!INC Local Scripts.EAConstants-JScript

/*
 * Script Name: create-document.js
 * Author: Vladimir Mezera vladimir.mezera@gmail.com
 * Purpose: Create diagram with two classes and connect them by association together.
 * Date: 2017-02-05
 */

/*Configuration of script*/
const MODEL_NAME="nameOfEaModel"


function createOrUpdatePackageStructure(root, packageName ) {

    resultPackage = root.Packages.AddNew (packageName, "")
    resultPackage.Update ()

    return resultPackage
}


function main()
{
    root = Repository.Models.GetByName(MODEL_NAME)

    var package = createOrUpdatePackageStructure(root, "testClassDigramPackage")

    var resultDiagram = package.Diagrams.AddNew ("ClassDiagram", "Class")
    resultDiagram.Update()

    var diagramClass1 = package.Elements.AddNew ("Diagram1", "Class")
    diagramClass1.Update()

    //add attributes
    var diaClass1attr1 = diagramClass1.Attributes.AddNew("id", "integer")
    diaClass1attr1.Update()
    var diaClass1attr2 = diagramClass1.Attributes.AddNew("name", "string")
    diaClass1attr2.Update()


    var diagramClass2 = package.Elements.AddNew ("Diagram2", "Class")
    diagramClass2.Update()

    //add attributes
    var diaClass2attr1 = diagramClass2.Attributes.AddNew("id", "integer")
    diaClass2attr1.Update()

    var diaClass2attr2 = diagramClass2.Attributes.AddNew("name", "string")
    diaClass2attr2.Update()

    //add connector
    resultConnector = diagramClass1.Connectors.AddNew ("testAssociation between id", "Association")
    resultConnector.SupplierID = diagramClass2.ElementID;

    resultConnector.SupplierEnd.Cardinality="0..1"

    resultConnector.ClientEnd.Cardinality="0..1"

    resultConnector.ClientEnd.Role=diaClass1attr1.Name
    resultConnector.SupplierEnd.Role=diaClass2attr1.Name

    var style = ""
    style +="LFEP="+diaClass2attr1.AttributeGUID+"L;"
    style +="LFSP=" + diaClass1attr1.AttributeGUID + "R"

    resultConnector.StyleEx=style;
    resultConnector.Update ();


    var resultDiaAssign = resultDiagram.DiagramObjects.AddNew("","")
    resultDiaAssign.ElementID = diagramClass1.ElementID
    resultDiaAssign.Update()

    var resultDiaAssign2 = resultDiagram.DiagramObjects.AddNew("","")
    resultDiaAssign2.ElementID = diagramClass2.ElementID
    resultDiaAssign2.Update()

    //Auto layout
    Repository.GetProjectInterface().LayoutDiagramEx (resultDiagram.DiagramGUID, lsLayoutDirectionRight, 67, 40, 20, true)

}

main()
